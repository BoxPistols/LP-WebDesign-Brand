/**
 * AI Service - マルチプロバイダAPI呼び出し層
 * OpenAI、Google Gemini、Ollama（ローカルLLM）に対応
 * BYOK（Bring Your Own Key）方式
 *
 * モデル/価格は変動するため実装時点(2026-07)の情報。公式価格ページで随時更新すること。
 * pricing は USD / 1M トークン（input / output）。
 * tier: 'draft'（最安・下書き向け） / 'quality'（高品質・プラン/レビュー向け）
 */
class AIService {
  static PROVIDERS = {
    openai: {
      name: 'OpenAI',
      models: [
        { id: 'gpt-5.4-nano', name: 'GPT-5.4 Nano（最安・ドラフト向け）', tier: 'draft', maxTokens: 16384, pricing: { input: 0.20, output: 1.25 } },
        { id: 'gpt-5.4-mini', name: 'GPT-5.4 Mini（高品質・プラン/レビュー向け）', tier: 'quality', maxTokens: 16384, pricing: { input: 0.75, output: 4.50 } },
      ],
      endpoint: 'https://api.openai.com/v1/chat/completions',
    },
    gemini: {
      name: 'Google Gemini',
      models: [
        { id: 'gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash-Lite（最安・ドラフト向け）', tier: 'draft', maxTokens: 8192, pricing: { input: 0.10, output: 0.40 } },
        { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite（高品質・プラン/レビュー向け）', tier: 'quality', maxTokens: 8192, pricing: { input: 0.25, output: 1.50 } },
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

  // タスク種別 → モデルティアのルーティング表（未定義タスクは 'draft' 扱い）
  static TASK_TIERS = {
    customize_section: 'draft',
    generate_section: 'draft',
    generate_page_section: 'draft',
    freeform: 'draft',
    plan_fullpage: 'quality',
    design_system: 'quality',
    review: 'quality',
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
    this._autoRouting = false;
    this._ollamaEndpoint = 'http://localhost:11434';
    this._abortController = null;
    this._loadConfig();
  }

  // --- 設定管理 ---
  _loadConfig() {
    // sessionStorage を優先し、なければ localStorage（旧保存形式との後方互換）
    let config = null;
    try {
      const raw = sessionStorage.getItem('ai-provider-config');
      if (raw) config = JSON.parse(raw);
    } catch (e) { /* 読み込み失敗は無視 */ }
    if (!config) {
      config = CommonEditor.loadFromStorage('ai-provider-config', null);
    }
    if (config) {
      this._provider = config.provider;
      this._apiKey = config.apiKey;
      this._model = config.model;
      this._autoRouting = config.autoRouting === true;
      if (config.ollamaEndpoint) this._ollamaEndpoint = config.ollamaEndpoint;
    }
  }

  /**
   * プロバイダ設定を適用・保存する
   * @param {string} provider - 'openai' | 'gemini' | 'ollama'
   * @param {string} apiKey - APIキー
   * @param {string} model - モデルID
   * @param {Object} options
   *   - persist: true の場合のみ localStorage に永続化（デフォルトは sessionStorage のみ）
   *   - autoRouting: タスク別モデル自動選択の有効化
   *   - ollamaEndpoint: Ollama エンドポイントURL
   *   - transient: true の場合はストレージへ一切保存しない（接続テスト等の一時利用）
   */
  configure(provider, apiKey, model, options = {}) {
    this._provider = provider;
    this._apiKey = apiKey;
    this._model = model;
    this._autoRouting = options.autoRouting === true;
    if (options.ollamaEndpoint) this._ollamaEndpoint = options.ollamaEndpoint;

    if (options.transient === true) return;

    const config = {
      provider,
      apiKey,
      model,
      autoRouting: this._autoRouting,
      ollamaEndpoint: this._ollamaEndpoint,
    };

    if (options.persist === true) {
      // 明示的に選択した場合のみブラウザに永続化
      CommonEditor.saveToStorage('ai-provider-config', config);
      try { sessionStorage.removeItem('ai-provider-config'); } catch (e) { /* 無視 */ }
    } else {
      // デフォルト: セッションのみ保存（セキュリティ優先）
      try { sessionStorage.setItem('ai-provider-config', JSON.stringify(config)); } catch (e) { /* 無視 */ }
      // 古い永続コピーが残ると次回セッションで復活してしまうため削除
      CommonEditor.removeFromStorage('ai-provider-config');
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

  get autoRouting() {
    return this._autoRouting;
  }

  clearConfig() {
    this._provider = null;
    this._apiKey = null;
    this._model = null;
    this._autoRouting = false;
    CommonEditor.removeFromStorage('ai-provider-config');
    try { sessionStorage.removeItem('ai-provider-config'); } catch (e) { /* 無視 */ }
  }

  // --- タスク別モデルルーティング ---

  /**
   * タスク種別に応じたモデルIDを返す
   * autoRouting が有効かつプロバイダにティア付きモデルがある場合のみルーティングし、
   * それ以外は手動選択された this._model を返す
   */
  modelForTask(taskType) {
    if (this._autoRouting) {
      const models = AIService.PROVIDERS[this._provider]?.models || [];
      if (models.length > 0) {
        const tier = AIService.TASK_TIERS[taskType] || 'draft';
        const match = models.find(m => m.tier === tier);
        return (match || models[0]).id;
      }
    }
    return this._model;
  }

  /** リクエスト単位のモデル解決: options.model > taskTypeルーティング > this._model */
  _resolveModel(options = {}) {
    if (options.model) return options.model;
    return this.modelForTask(options.taskType);
  }

  /**
   * 推定コスト（USD）を返す。価格情報がないモデルは null
   * @param {string} provider - プロバイダキー
   * @param {string} modelId - モデルID
   * @param {number} inputTokens - 入力トークン数
   * @param {number} outputTokens - 出力トークン数
   * @returns {number|null}
   */
  static estimateCost(provider, modelId, inputTokens, outputTokens) {
    const model = (AIService.PROVIDERS[provider]?.models || []).find(m => m.id === modelId);
    if (!model || !model.pricing) return null;
    const inputCost = ((inputTokens || 0) * model.pricing.input) / 1e6;
    const outputCost = ((outputTokens || 0) * model.pricing.output) / 1e6;
    return inputCost + outputCost;
  }

  // --- API検証 ---
  async validateConnection() {
    try {
      const messages = [{ role: 'user', content: 'Hi' }];
      await this.generate(messages, { maxTokens: 10, timeout: 10000 });
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
  // options.taskType / options.model でリクエスト単位のモデル指定が可能
  async generate(messages, options = {}) {
    try {
      return await this._generateOnce(messages, options);
    } catch (e) {
      // 400エラーで temperature / max_tokens 系パラメータが原因の場合は
      // 該当パラメータを調整して1回だけ再試行する
      const retryOptions = this._buildParamRetryOptions(e, options);
      if (retryOptions) {
        return await this._generateOnce(messages, retryOptions);
      }
      throw e;
    }
  }

  /** 400エラー本文からパラメータ起因を判定し、再試行用オプションを構築する */
  _buildParamRetryOptions(error, options) {
    if (!(error instanceof AIServiceError) || error.status !== 400 || options._paramRetry) return null;

    let bodyText = '';
    try {
      bodyText = JSON.stringify(error.data || {});
    } catch (e) {
      return null;
    }

    const retryOptions = { ...options, _paramRetry: true };
    let matched = false;
    if (bodyText.includes('temperature')) {
      retryOptions.dropTemperature = true;
      matched = true;
    }
    if (bodyText.includes('max_tokens') || bodyText.includes('max_completion_tokens')) {
      retryOptions.swapTokenParam = true;
      matched = true;
    }
    return matched ? retryOptions : null;
  }

  async _generateOnce(messages, options = {}) {
    const config = { ...AIService.DEFAULT_CONFIG, ...options };
    config.model = this._resolveModel(options);
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
  // options.taskType / options.model でリクエスト単位のモデル指定が可能
  async *generateStream(messages, options = {}) {
    this._abortController = new AbortController();
    const config = { ...AIService.DEFAULT_CONFIG, ...options };
    config.model = this._resolveModel(options);
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
    } else {
      headers['Authorization'] = `Bearer ${this._apiKey}`;
    }

    const body = {
      model: config.model || this._model,
      messages,
    };

    // 400再試行時に temperature が原因だった場合は送信しない
    if (!config.dropTemperature) {
      body.temperature = config.temperature;
    }

    // OpenAI の新モデルは max_tokens を拒否するため max_completion_tokens を使用
    // gemini / ollama（OpenAI互換）は従来どおり max_tokens
    let tokenParam = this._provider === 'openai' ? 'max_completion_tokens' : 'max_tokens';
    if (config.swapTokenParam) {
      tokenParam = tokenParam === 'max_completion_tokens' ? 'max_tokens' : 'max_completion_tokens';
    }
    body[tokenParam] = config.maxTokens;

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
