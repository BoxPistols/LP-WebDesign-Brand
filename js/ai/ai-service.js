/**
 * AI Service - マルチプロバイダAPI呼び出し層
 * OpenAI、Google Gemini、Ollama（ローカルLLM）に対応
 * BYOK（Bring Your Own Key）方式
 */
class AIService {
  static PROVIDERS = {
    openai: {
      name: 'OpenAI',
      models: [
        { id: 'gpt-4o-mini', name: 'GPT-4o Mini（高速・低コスト）', maxTokens: 16384 },
        { id: 'gpt-4o', name: 'GPT-4o（高品質）', maxTokens: 16384 },
      ],
      endpoint: 'https://api.openai.com/v1/chat/completions',
    },
    gemini: {
      name: 'Google Gemini',
      models: [
        { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash（高速）', maxTokens: 8192 },
      ],
      // Gemini は OpenAI互換エンドポイントを使用
      endpoint: 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
    },
    ollama: {
      name: 'Ollama（ローカル）',
      models: [], // 動的取得
      endpoint: 'http://localhost:11434/v1/chat/completions', // OpenAI互換
    },
  };

  static DEFAULT_CONFIG = {
    temperature: 0.2,
    maxTokens: 8000,
    timeout: 60000,
  };

  constructor() {
    this._provider = null;
    this._apiKey = null;
    this._model = null;
    this._ollamaEndpoint = 'http://localhost:11434';
    this._abortController = null;
    this._loadConfig();
  }

  // --- 設定管理 ---
  _loadConfig() {
    const config = CommonEditor.loadFromStorage('ai-provider-config', null);
    if (config) {
      this._provider = config.provider;
      this._apiKey = config.apiKey;
      this._model = config.model;
      if (config.ollamaEndpoint) this._ollamaEndpoint = config.ollamaEndpoint;
    }
  }

  configure(provider, apiKey, model, options = {}) {
    this._provider = provider;
    this._apiKey = apiKey;
    this._model = model;
    if (options.ollamaEndpoint) this._ollamaEndpoint = options.ollamaEndpoint;

    const storageMethod = options.sessionOnly ? 'sessionStorage' : 'localStorage';
    const config = { provider, apiKey, model, ollamaEndpoint: this._ollamaEndpoint };

    if (storageMethod === 'sessionStorage') {
      try { sessionStorage.setItem('ai-provider-config', JSON.stringify(config)); } catch(e) {}
    } else {
      CommonEditor.saveToStorage('ai-provider-config', config);
    }
  }

  get isConfigured() {
    if (this._provider === 'ollama') return true;
    return !!(this._provider && this._apiKey && this._model);
  }

  get providerName() {
    return AIService.PROVIDERS[this._provider]?.name || '未設定';
  }

  get modelName() {
    return this._model || '未選択';
  }

  clearConfig() {
    this._provider = null;
    this._apiKey = null;
    this._model = null;
    CommonEditor.removeFromStorage('ai-provider-config');
    try { sessionStorage.removeItem('ai-provider-config'); } catch(e) {}
  }

  // --- API検証 ---
  async validateConnection() {
    try {
      const messages = [{ role: 'user', content: 'Hi' }];
      const response = await this.generate(messages, { maxTokens: 10, timeout: 10000 });
      return { success: true, message: '接続成功' };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  // --- Ollama モデル一覧取得 ---
  async getOllamaModels() {
    try {
      const res = await fetch(`${this._ollamaEndpoint}/api/tags`, { signal: AbortSignal.timeout(5000) });
      if (!res.ok) throw new Error('Ollama接続エラー');
      const data = await res.json();
      return (data.models || []).map(m => ({ id: m.name, name: m.name, maxTokens: 8192 }));
    } catch (e) {
      return [];
    }
  }

  // --- 非ストリーミング生成 ---
  async generate(messages, options = {}) {
    const config = { ...AIService.DEFAULT_CONFIG, ...options };
    const { url, headers, body } = this._buildRequest(messages, config);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), config.timeout);

    try {
      const res = await fetch(url, {
        method: 'POST', headers, body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new AIServiceError(res.status, err, this._provider);
      }

      const data = await res.json();
      return this._extractContent(data);
    } catch (e) {
      clearTimeout(timeoutId);
      if (e instanceof AIServiceError) throw e;
      if (e.name === 'AbortError') throw new AIServiceError(0, {}, this._provider, 'リクエストがタイムアウトしました');
      throw new AIServiceError(0, {}, this._provider, e.message);
    }
  }

  // --- ストリーミング生成（AsyncGenerator）---
  async *generateStream(messages, options = {}) {
    this._abortController = new AbortController();
    const config = { ...AIService.DEFAULT_CONFIG, ...options };
    const { url, headers, body } = this._buildRequest(messages, config);
    body.stream = true;

    let response;
    try {
      response = await fetch(url, {
        method: 'POST', headers, body: JSON.stringify(body),
        signal: this._abortController.signal,
      });
    } catch (e) {
      if (e.name === 'AbortError') return;
      throw new AIServiceError(0, {}, this._provider, e.message);
    }

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new AIServiceError(response.status, err, this._provider);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;
          const data = trimmed.slice(6);
          if (data === '[DONE]') return;

          try {
            const json = JSON.parse(data);
            const content = json.choices?.[0]?.delta?.content;
            if (content) yield content;
          } catch (e) { /* JSON parse失敗は無視 */ }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }

  abort() {
    if (this._abortController) {
      this._abortController.abort();
      this._abortController = null;
    }
  }

  // --- リクエスト構築 ---
  _buildRequest(messages, config) {
    const provider = AIService.PROVIDERS[this._provider];
    if (!provider) throw new AIServiceError(0, {}, this._provider, 'プロバイダが未設定です');

    let url = provider.endpoint;
    const headers = { 'Content-Type': 'application/json' };

    if (this._provider === 'ollama') {
      url = `${this._ollamaEndpoint}/v1/chat/completions`;
    } else if (this._provider === 'gemini') {
      headers['Authorization'] = `Bearer ${this._apiKey}`;
    } else {
      headers['Authorization'] = `Bearer ${this._apiKey}`;
    }

    const body = {
      model: this._model,
      messages,
      temperature: config.temperature,
      max_tokens: config.maxTokens,
    };

    return { url, headers, body };
  }

  _extractContent(data) {
    return data.choices?.[0]?.message?.content || '';
  }
}

// --- カスタムエラークラス ---
class AIServiceError extends Error {
  constructor(status, data, provider, customMessage) {
    const msg = customMessage || AIServiceError._getMsg(status, provider);
    super(msg);
    this.name = 'AIServiceError';
    this.status = status;
    this.data = data;
    this.provider = provider;
  }

  static _getMsg(status, provider) {
    const p = AIService.PROVIDERS[provider]?.name || provider;
    const map = {
      401: 'APIキーが無効です。設定を確認してください',
      403: 'アクセス拒否。APIキーの権限を確認してください',
      429: 'レート制限に達しました。少し待ってから再試行してください',
      500: `${p}のサーバーエラーです。再試行してください`,
      503: `${p}が一時的に利用できません`,
    };
    return map[status] || `エラーが発生しました (${status})`;
  }

  get isRetryable() { return [429, 500, 503].includes(this.status); }
}

window.AIService = AIService;
window.AIServiceError = AIServiceError;
