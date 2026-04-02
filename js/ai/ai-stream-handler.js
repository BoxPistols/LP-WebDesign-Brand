/**
 * AI Stream Handler - ストリーミング処理ハンドラー
 * AIService.generateStream() の AsyncIterator を受け取り、
 * HTML抽出・サニタイズ・デバウンスプレビュー更新を行う
 */
class AIStreamHandler {
  static DEBOUNCE_MS = 150;

  /**
   * @param {Object} options
   * @param {Function} options.onUpdate - デバウンスされたHTML更新コールバック (html) => void
   * @param {Function} [options.onChunk] - チャンク受信ごとのコールバック (rawText) => void
   * @param {Function} [options.onComplete] - 完了時コールバック (finalHtml) => void
   * @param {Function} [options.onError] - エラー時コールバック (error) => void
   */
  constructor(options = {}) {
    this.onUpdate = options.onUpdate || (() => {});
    this.onChunk = options.onChunk || null;
    this.onComplete = options.onComplete || null;
    this.onError = options.onError || null;

    this._rawText = '';
    this._debounceTimer = null;
    this._isProcessing = false;
  }

  /**
   * ストリームを処理する
   * @param {AsyncGenerator} stream - AIService.generateStream() の戻り値
   * @returns {Promise<string>} 最終的に抽出・サニタイズされたHTML
   */
  async process(stream) {
    this._rawText = '';
    this._isProcessing = true;

    try {
      for await (const chunk of stream) {
        if (!this._isProcessing) break;

        this._rawText += chunk;

        if (this.onChunk) {
          this.onChunk(this._rawText);
        }

        // デバウンスしてプレビュー更新
        this._scheduleUpdate();
      }

      // 最終更新（デバウンスをキャンセルして即時反映）
      this._cancelDebounce();
      const finalHtml = this._extractAndSanitize(this._rawText);
      this.onUpdate(finalHtml);

      if (this.onComplete) {
        this.onComplete(finalHtml);
      }

      this._isProcessing = false;
      return finalHtml;
    } catch (e) {
      this._isProcessing = false;
      this._cancelDebounce();

      if (this.onError) {
        this.onError(e);
      }
      throw e;
    }
  }

  /**
   * 処理を中断する
   */
  abort() {
    this._isProcessing = false;
    this._cancelDebounce();
  }

  /**
   * 現在の蓄積テキストを取得
   */
  get rawText() {
    return this._rawText;
  }

  /**
   * 現在の蓄積テキストからHTMLを抽出して返す
   */
  get currentHtml() {
    return this._extractAndSanitize(this._rawText);
  }

  // --- デバウンス制御 ---
  _scheduleUpdate() {
    this._cancelDebounce();
    this._debounceTimer = setTimeout(() => {
      if (!this._isProcessing) return;
      const html = this._extractAndSanitize(this._rawText);
      this.onUpdate(html);
    }, AIStreamHandler.DEBOUNCE_MS);
  }

  _cancelDebounce() {
    if (this._debounceTimer) {
      clearTimeout(this._debounceTimer);
      this._debounceTimer = null;
    }
  }

  // --- HTML抽出・サニタイズ ---

  /**
   * AI出力テキストからHTMLを抽出しサニタイズする
   * 1. マークダウンコードブロック ```html ... ``` を優先的に抽出
   * 2. フォールバック: <section> タグを抽出
   * 3. CommonEditor.sanitizeHTML は XSS用の文字エスケープなので、
   *    ここでは構造的サニタイズ（危険タグ除去）を行う
   * @param {string} text - AI出力の生テキスト
   * @returns {string} サニタイズ済みHTML
   */
  _extractAndSanitize(text) {
    if (!text) return '';

    // 1. ```html ... ``` コードブロックから抽出
    let html = this._extractFromCodeBlock(text);

    // 2. フォールバック: <section> タグを抽出
    if (!html) {
      html = this._extractSectionTags(text);
    }

    // 3. さらにフォールバック: 生テキストが<タグで始まっていたらそのまま使用
    if (!html && text.trim().startsWith('<')) {
      html = text.trim();
    }

    if (!html) return '';

    // サニタイズ: 危険なタグと属性を除去
    return AIStreamHandler.sanitizeStructure(html);
  }

  /**
   * マークダウンコードブロックからHTMLを抽出する
   * 閉じ ``` がまだ来ていない（ストリーミング途中）場合も対応
   * @param {string} text
   * @returns {string|null}
   */
  _extractFromCodeBlock(text) {
    // 完了したコードブロック
    const completeMatch = text.match(/```html\s*\n([\s\S]*?)```/);
    if (completeMatch) return completeMatch[1].trim();

    // ストリーミング途中（閉じ ``` がまだ無い）
    const partialMatch = text.match(/```html\s*\n([\s\S]*?)$/);
    if (partialMatch) return partialMatch[1].trim();

    // 言語指定なしのコードブロック
    const genericMatch = text.match(/```\s*\n([\s\S]*?)```/);
    if (genericMatch) {
      const content = genericMatch[1].trim();
      if (content.startsWith('<')) return content;
    }

    // ストリーミング途中（言語指定なし）
    const genericPartial = text.match(/```\s*\n([\s\S]*?)$/);
    if (genericPartial) {
      const content = genericPartial[1].trim();
      if (content.startsWith('<')) return content;
    }

    return null;
  }

  /**
   * <section> タグを全て抽出して結合する
   * @param {string} text
   * @returns {string|null}
   */
  _extractSectionTags(text) {
    // 完全な <section>...</section> を全て抽出
    const sections = [];
    const regex = /<section[\s\S]*?<\/section>/gi;
    let match;
    while ((match = regex.exec(text)) !== null) {
      sections.push(match[0]);
    }

    if (sections.length > 0) {
      return sections.join('\n');
    }

    // ストリーミング途中: 開始 <section> はあるが閉じタグがまだない
    const partialMatch = text.match(/<section[\s\S]*$/i);
    if (partialMatch) return partialMatch[0];

    return null;
  }

  /**
   * 構造的サニタイズ: 危険なタグと属性を除去する
   * XSSベクターとなるscript, iframe, on*属性等を除去
   * @param {string} html
   * @returns {string}
   */
  static sanitizeStructure(html) {
    if (!html) return '';

    // 危険なタグを除去
    let sanitized = html;
    const dangerousTags = ['script', 'iframe', 'object', 'embed', 'applet', 'form', 'input'];
    for (const tag of dangerousTags) {
      // 開始タグ＋中身＋閉じタグ
      const regex = new RegExp(`<${tag}[\\s\\S]*?<\\/${tag}>`, 'gi');
      sanitized = sanitized.replace(regex, '');
      // 自己閉じ or 閉じタグのない開始タグ
      const selfClosing = new RegExp(`<${tag}[^>]*\\/?>`, 'gi');
      sanitized = sanitized.replace(selfClosing, '');
    }

    // on* イベントハンドラ属性を除去
    sanitized = sanitized.replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');

    // javascript: プロトコルを除去
    sanitized = sanitized.replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href="#"');

    return sanitized;
  }
}

window.AIStreamHandler = AIStreamHandler;
