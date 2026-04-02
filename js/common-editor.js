// ============================================================
// Common Editor Module
// LP Generator / Dashboard Generator 共通の編集機能を提供
// インラインテキスト編集、画像編集、CRUD制御、ユーティリティ
// ============================================================

class CommonEditor {
  // === 定数 ===
  static get CONFIG() {
    return {
      MAX_HISTORY_SIZE: 50,
      AUTOSAVE_INTERVAL: 30000,
      ZOOM_MIN: 25,
      ZOOM_MAX: 150,
      NOTIFICATION_DURATION: 3000,
      EDITABLE_SELECTORS:
        'h1, h2, h3, h4, h5, h6, p, span:not(.component-icon):not(.component-name), a, button:not(.component-control):not(.lp-control-btn), li, label, td, th',
      // 編集対象から除外するセレクタ
      EXCLUDE_SELECTORS: [
        '.component-control',
        '.lp-control-btn',
        '.component-controls',
        '.lp-section-controls',
      ],
    };
  }

  constructor(options = {}) {
    this.previewSelector = options.previewSelector || '#previewFrame';
    this.sectionWrapperClass = options.sectionWrapperClass || 'lp-section-wrapper';
    this.controlsClass = options.controlsClass || 'section-controls';
    // 編集対象セレクタ（オプションで上書き可能）
    this.editableSelectors = options.editableSelectors || CommonEditor.CONFIG.EDITABLE_SELECTORS;
    // 除外セレクタ（オプションで追加可能）
    this.excludeSelectors = [
      ...CommonEditor.CONFIG.EXCLUDE_SELECTORS,
      ...(options.excludeSelectors || []),
      `.${this.controlsClass}`,
    ];

    // コールバック（依存注入）
    this.onContentChange = options.onContentChange || null;
    this.onSaveState = options.onSaveState || null;
    this.onImageChange = options.onImageChange || null;
    this.notificationFn = options.notificationFn || null;

    // CSSクラスプレフィックス（名前衝突回避）
    this.cssPrefix = options.cssPrefix || 'common';

    // 内部状態
    this.isEditing = false;
    this._hintElement = null;

    this.init();
  }

  init() {
    this.addEditorStyles();
  }

  // ============================================================
  // インラインテキスト編集
  // ============================================================

  /**
   * 指定コンテナにインライン編集機能をセットアップする
   * @param {HTMLElement|string} container - DOM要素またはセレクタ文字列
   */
  setupInlineEditing(container) {
    const el = this._resolveElement(container || this.previewSelector);
    if (!el) return;

    // ダブルクリックでテキスト編集開始
    el.addEventListener('dblclick', (e) => {
      const target = e.target.closest(this.editableSelectors);
      if (target && !this._isExcluded(target)) {
        e.preventDefault();
        e.stopPropagation();
        this.makeTextEditable(target);
      }
    });

    // ホバー時に編集可能ヒント表示
    el.addEventListener('mouseover', (e) => {
      if (this.isEditing) return;
      const target = e.target.closest(this.editableSelectors);
      if (target && !this._isExcluded(target)) {
        target.classList.add(`${this.cssPrefix}-editable-hover`);
      }
    });

    el.addEventListener('mouseout', (e) => {
      const target = e.target.closest(this.editableSelectors);
      if (target) {
        target.classList.remove(`${this.cssPrefix}-editable-hover`);
      }
    });
  }

  /**
   * 要素をインライン編集可能にする
   * @param {HTMLElement} element - 編集対象の要素
   */
  makeTextEditable(element) {
    if (element.contentEditable === 'true') return;

    this.isEditing = true;
    const originalContent = element.textContent;
    const originalHTML = element.innerHTML;

    // 編集モード開始
    element.contentEditable = 'true';
    element.classList.add(`${this.cssPrefix}-inline-editing`);
    element.classList.remove(`${this.cssPrefix}-editable-hover`);
    element.focus();

    // テキスト全選択
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // 操作ヒント表示
    this._showEditingHint();

    // blur時の保存処理
    const handleBlur = () => {
      element.contentEditable = 'false';
      element.classList.remove(`${this.cssPrefix}-inline-editing`);
      this._hideEditingHint();
      this.isEditing = false;

      if (element.textContent !== originalContent) {
        this.saveTextChange(element, originalContent);
      }

      element.removeEventListener('blur', handleBlur);
      element.removeEventListener('keydown', handleKeydown);
    };

    // キーボード操作
    const handleKeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
      if (e.key === 'Escape') {
        // キャンセル: 元の内容に戻す
        element.innerHTML = originalHTML;
        element.blur();
      }
    };

    element.addEventListener('blur', handleBlur);
    element.addEventListener('keydown', handleKeydown);
  }

  /**
   * テキスト変更を保存しコールバックを呼び出す
   * @param {HTMLElement} element - 変更された要素
   * @param {string} originalContent - 変更前のテキスト
   */
  saveTextChange(element, originalContent) {
    if (this.onContentChange) {
      this.onContentChange(element, originalContent, element.textContent);
    }
    if (this.onSaveState) {
      this.onSaveState();
    }
    this.showNotification('テキストを更新しました');
  }

  // ============================================================
  // 画像編集
  // ============================================================

  /**
   * 指定コンテナに画像編集機能をセットアップする
   * @param {HTMLElement|string} container - DOM要素またはセレクタ文字列
   */
  setupImageEditing(container) {
    const el = this._resolveElement(container || this.previewSelector);
    if (!el) return;

    // 画像クリックで編集モーダル表示
    el.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (img && !img.dataset.editMode && !this._isExcluded(img)) {
        this.showImageEditor(img);
      }
    });

    // ホバー時の編集インジケーター
    el.addEventListener('mouseover', (e) => {
      const img = e.target.closest('img');
      if (img && !this.isEditing && !this._isExcluded(img)) {
        img.classList.add(`${this.cssPrefix}-image-editable`);
      }
    });

    el.addEventListener('mouseout', (e) => {
      const img = e.target.closest('img');
      if (img) {
        img.classList.remove(`${this.cssPrefix}-image-editable`);
      }
    });
  }

  /**
   * 画像編集モーダルを表示する
   * @param {HTMLImageElement} img - 編集対象の画像要素
   */
  showImageEditor(img) {
    // XSS対策: src/alt属性をサニタイズしてモーダルに埋め込む
    const safeSrc = CommonEditor.sanitizeAttribute(img.src);
    const safeAlt = CommonEditor.sanitizeAttribute(img.alt || '');

    const modal = document.createElement('div');
    modal.className = `${this.cssPrefix}-image-modal`;
    modal.innerHTML = `
      <div class="${this.cssPrefix}-image-modal-overlay"></div>
      <div class="${this.cssPrefix}-image-modal-content">
        <div class="${this.cssPrefix}-image-modal-header">
          <h3>画像を編集</h3>
          <button class="${this.cssPrefix}-image-modal-close" aria-label="閉じる">&times;</button>
        </div>
        <div class="${this.cssPrefix}-image-modal-body">
          <div class="${this.cssPrefix}-image-preview">
            <img src="${safeSrc}" alt="${safeAlt}" />
          </div>
          <div class="${this.cssPrefix}-image-form">
            <div class="${this.cssPrefix}-form-group">
              <label>画像URL</label>
              <input type="url" class="${this.cssPrefix}-input" data-role="image-url" value="${safeSrc}" placeholder="https://example.com/image.jpg" />
            </div>
            <div class="${this.cssPrefix}-form-group">
              <label>Alt テキスト</label>
              <input type="text" class="${this.cssPrefix}-input" data-role="image-alt" value="${safeAlt}" placeholder="画像の説明" />
            </div>
            <div class="${this.cssPrefix}-form-group">
              <label>または画像をアップロード</label>
              <input type="file" accept="image/*" data-role="image-file" class="${this.cssPrefix}-input-file" />
            </div>
          </div>
        </div>
        <div class="${this.cssPrefix}-image-modal-footer">
          <button class="${this.cssPrefix}-btn ${this.cssPrefix}-btn-secondary" data-role="cancel">キャンセル</button>
          <button class="${this.cssPrefix}-btn ${this.cssPrefix}-btn-primary" data-role="save">保存</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const previewImg = modal.querySelector(`.${this.cssPrefix}-image-preview img`);
    const urlInput = modal.querySelector('[data-role="image-url"]');
    const altInput = modal.querySelector('[data-role="image-alt"]');
    const fileInput = modal.querySelector('[data-role="image-file"]');

    // URL変更時にプレビュー更新
    urlInput.addEventListener('input', () => {
      const url = urlInput.value.trim();
      if (CommonEditor.isValidImageUrl(url)) {
        previewImg.src = url;
      }
    });

    // ファイルアップロード
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        this.showNotification('画像ファイルを選択してください', 'error');
        return;
      }

      const reader = new FileReader();
      reader.onload = (ev) => {
        urlInput.value = ev.target.result;
        previewImg.src = ev.target.result;
      };
      reader.onerror = () => {
        this.showNotification('ファイルの読み込みに失敗しました', 'error');
      };
      reader.readAsDataURL(file);
    });

    // モーダル閉じる
    const closeModal = () => {
      modal.remove();
      document.body.style.overflow = '';
    };

    modal.querySelector(`.${this.cssPrefix}-image-modal-close`).addEventListener('click', closeModal);
    modal.querySelector(`.${this.cssPrefix}-image-modal-overlay`).addEventListener('click', closeModal);
    modal.querySelector('[data-role="cancel"]').addEventListener('click', closeModal);

    // 保存
    modal.querySelector('[data-role="save"]').addEventListener('click', () => {
      const newUrl = urlInput.value.trim();
      const newAlt = altInput.value;

      // URL検証（data:URIまたは有効なURLのみ許可）
      if (newUrl && !CommonEditor.isValidImageUrl(newUrl)) {
        this.showNotification('無効な画像URLです', 'error');
        return;
      }

      const originalSrc = img.src;
      if (newUrl) img.src = newUrl;
      img.alt = newAlt;

      if (img.src !== originalSrc) {
        if (this.onImageChange) {
          this.onImageChange(img, originalSrc, newUrl);
        }
        if (this.onSaveState) {
          this.onSaveState();
        }
        this.showNotification('画像を更新しました');
      }
      closeModal();
    });

    // ESCで閉じる
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  }

  // ============================================================
  // CRUD制御ボタン生成
  // ============================================================

  /**
   * セクション/コンポーネント用の操作ボタンHTMLを生成する
   * @param {Object} options - 表示するボタンの設定
   * @returns {string} HTML文字列
   */
  generateControls(options = {}) {
    const {
      showDragHandle = true,
      showMoveUp = true,
      showMoveDown = true,
      showDuplicate = true,
      showEdit = false,
      showDelete = true,
      showSettings = false,
    } = options;

    const buttons = [];

    if (showDragHandle) {
      buttons.push(`
        <button class="${this.cssPrefix}-control-btn ${this.cssPrefix}-drag-handle" title="ドラッグして移動" aria-label="ドラッグして移動">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/>
            <circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
          </svg>
        </button>
      `);
    }

    if (showMoveUp) {
      buttons.push(`
        <button class="${this.cssPrefix}-control-btn ${this.cssPrefix}-move-up" title="上に移動" aria-label="上に移動" data-action="move-up">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      `);
    }

    if (showMoveDown) {
      buttons.push(`
        <button class="${this.cssPrefix}-control-btn ${this.cssPrefix}-move-down" title="下に移動" aria-label="下に移動" data-action="move-down">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      `);
    }

    if (showDuplicate) {
      buttons.push(`
        <button class="${this.cssPrefix}-control-btn ${this.cssPrefix}-duplicate" title="複製" aria-label="複製" data-action="duplicate">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      `);
    }

    if (showEdit) {
      buttons.push(`
        <button class="${this.cssPrefix}-control-btn ${this.cssPrefix}-edit" title="編集" aria-label="編集" data-action="edit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      `);
    }

    if (showSettings) {
      buttons.push(`
        <button class="${this.cssPrefix}-control-btn ${this.cssPrefix}-settings" title="設定" aria-label="設定" data-action="settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      `);
    }

    if (showDelete) {
      buttons.push(`
        <button class="${this.cssPrefix}-control-btn ${this.cssPrefix}-delete" title="削除" aria-label="削除" data-action="delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      `);
    }

    return `<div class="${this.cssPrefix}-component-controls">${buttons.join('')}</div>`;
  }

  // ============================================================
  // 通知
  // ============================================================

  /**
   * 通知メッセージを表示する
   * @param {string} message - 表示するメッセージ
   * @param {string} type - 'success' | 'error' | 'info'
   */
  showNotification(message, type = 'success') {
    // 外部通知関数が設定されていればそちらを使用
    if (this.notificationFn) {
      this.notificationFn(message, type);
      return;
    }
    CommonEditor.showDefaultNotification(message, type);
  }

  /**
   * デフォルトの通知表示（静的メソッド: インスタンスなしでも使用可能）
   * @param {string} message - 表示するメッセージ
   * @param {string} type - 'success' | 'error' | 'info'
   */
  static showDefaultNotification(message, type = 'success') {
    const existing = document.querySelector('.common-notification');
    if (existing) existing.remove();

    const safeMessage = CommonEditor.sanitizeHTML(message);

    const notification = document.createElement('div');
    notification.className = `common-notification common-notification-${type}`;
    notification.innerHTML = safeMessage;
    notification.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      padding: 12px 20px;
      max-width: 320px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      animation: notifySlideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    const duration = CommonEditor.CONFIG.NOTIFICATION_DURATION;
    setTimeout(() => {
      notification.style.animation = 'notifySlideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }

  // ============================================================
  // ストレージ（エラーハンドリング内蔵）
  // ============================================================

  /**
   * localStorageに値を保存する
   * @param {string} key - ストレージキー
   * @param {*} value - 保存する値（自動的にJSON.stringifyされる）
   * @returns {boolean} 保存成功ならtrue
   */
  static saveToStorage(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return true;
    } catch (e) {
      // QuotaExceededError等のハンドリング
      if (e.name === 'QuotaExceededError') {
        CommonEditor.showDefaultNotification('ストレージの容量が不足しています', 'error');
      }
      return false;
    }
  }

  /**
   * localStorageから値を読み込む
   * @param {string} key - ストレージキー
   * @param {*} defaultValue - キーが存在しない場合のデフォルト値
   * @returns {*} パースされた値、またはデフォルト値
   */
  static loadFromStorage(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      return defaultValue;
    }
  }

  /**
   * localStorageから指定キーを削除する
   * @param {string} key - 削除するキー
   */
  static removeFromStorage(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      // 無視
    }
  }

  // ============================================================
  // ユーティリティ（静的メソッド）
  // ============================================================

  /**
   * ユニークIDを生成する
   * @param {string} prefix - IDのプレフィックス
   * @returns {string} ユニークID文字列
   */
  static generateId(prefix = 'id') {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  }

  /**
   * HTML文字列をサニタイズしてXSSを防止する
   * innerHTMLに挿入するユーザー入力に必ず適用すること
   * @param {string} str - サニタイズする文字列
   * @returns {string} サニタイズ済みの文字列
   */
  static sanitizeHTML(str) {
    if (typeof str !== 'string') return '';
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
      '/': '&#x2F;',
    };
    return str.replace(/[&<>"'/]/g, (char) => map[char]);
  }

  /**
   * HTML属性値をサニタイズする（ダブルクォート用）
   * @param {string} str - サニタイズする文字列
   * @returns {string} サニタイズ済み文字列
   */
  static sanitizeAttribute(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&"<>]/g, (char) => {
      const map = { '&': '&amp;', '"': '&quot;', '<': '&lt;', '>': '&gt;' };
      return map[char];
    });
  }

  /**
   * URLが有効な画像URLかどうかを検証する
   * data: URI、http/https のみ許可（javascript: 等はブロック）
   * @param {string} url - 検証するURL文字列
   * @returns {boolean}
   */
  static isValidImageUrl(url) {
    if (!url || typeof url !== 'string') return false;
    // data:URI は許可
    if (url.startsWith('data:image/')) return true;
    // http/https のみ許可
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * デバウンス関数
   * @param {Function} fn - 実行する関数
   * @param {number} delay - 遅延ミリ秒
   * @returns {Function} デバウンスされた関数
   */
  static debounce(fn, delay = 300) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /**
   * スロットル関数
   * @param {Function} fn - 実行する関数
   * @param {number} limit - 制限ミリ秒
   * @returns {Function} スロットルされた関数
   */
  static throttle(fn, limit = 100) {
    let inThrottle = false;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, limit);
      }
    };
  }

  // ============================================================
  // 内部ヘルパーメソッド
  // ============================================================

  /**
   * セレクタ文字列またはDOM要素を解決する
   * @param {HTMLElement|string} target
   * @returns {HTMLElement|null}
   */
  _resolveElement(target) {
    if (target instanceof HTMLElement) return target;
    if (typeof target === 'string') return document.querySelector(target);
    return null;
  }

  /**
   * 要素が除外対象かどうかを判定する
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  _isExcluded(element) {
    return this.excludeSelectors.some((selector) => {
      return element.classList.contains(selector.replace('.', '')) || element.closest(selector);
    });
  }

  /**
   * 編集操作ヒントを表示する
   */
  _showEditingHint() {
    const hintClass = `${this.cssPrefix}-edit-hint`;
    if (document.querySelector(`.${hintClass}`)) return;

    const hint = document.createElement('div');
    hint.className = hintClass;
    hint.innerHTML = `
      <span class="hint-key">Enter</span> 保存
      <span class="hint-separator">|</span>
      <span class="hint-key">Esc</span> キャンセル
      <span class="hint-separator">|</span>
      <span class="hint-key">Shift+Enter</span> 改行
    `;
    document.body.appendChild(hint);
    this._hintElement = hint;
  }

  /**
   * 編集操作ヒントを非表示にする
   */
  _hideEditingHint() {
    const hintClass = `${this.cssPrefix}-edit-hint`;
    const hint = document.querySelector(`.${hintClass}`);
    if (hint) hint.remove();
    this._hintElement = null;
  }

  // 後方互換性: 旧メソッド名のエイリアス
  showEditingHint() {
    this._showEditingHint();
  }
  hideEditingHint() {
    this._hideEditingHint();
  }

  // ============================================================
  // スタイル注入
  // ============================================================

  addEditorStyles() {
    const styleId = `${this.cssPrefix}-editor-styles`;
    if (document.getElementById(styleId)) return;

    const p = this.cssPrefix;
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      /* 編集可能ホバー状態 */
      .${p}-editable-hover {
        outline: 2px dashed rgba(59, 130, 246, 0.5) !important;
        outline-offset: 2px;
        cursor: text !important;
      }

      /* アクティブ編集状態 */
      .${p}-inline-editing {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px;
        background: rgba(59, 130, 246, 0.05) !important;
        min-width: 50px;
        cursor: text !important;
      }

      .${p}-inline-editing:focus {
        outline: 2px solid #2563eb !important;
      }

      /* 編集操作ヒント */
      .${p}-edit-hint {
        position: fixed;
        bottom: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: #1e293b;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 8px;
        animation: ${p}HintFadeIn 0.3s ease-out;
      }

      .${p}-edit-hint .hint-key {
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: monospace;
      }

      .${p}-edit-hint .hint-separator {
        opacity: 0.5;
      }

      @keyframes ${p}HintFadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }

      /* 画像編集インジケーター */
      .${p}-image-editable {
        cursor: pointer !important;
        outline: 2px dashed rgba(59, 130, 246, 0.5);
        outline-offset: 2px;
      }

      /* 画像編集モーダル */
      .${p}-image-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10001;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .${p}-image-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      .${p}-image-modal-content {
        position: relative;
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: ${p}ModalSlideIn 0.3s ease-out;
      }

      @keyframes ${p}ModalSlideIn {
        from { opacity: 0; transform: scale(0.95) translateY(-20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }

      .${p}-image-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 24px;
        border-bottom: 1px solid #e2e8f0;
      }

      .${p}-image-modal-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
      }

      .${p}-image-modal-close {
        width: 32px;
        height: 32px;
        border: none;
        background: #f1f5f9;
        border-radius: 8px;
        font-size: 20px;
        cursor: pointer;
        color: #64748b;
        transition: all 0.2s;
      }

      .${p}-image-modal-close:hover {
        background: #e2e8f0;
        color: #1e293b;
      }

      .${p}-image-modal-body {
        padding: 24px;
        display: grid;
        gap: 20px;
      }

      .${p}-image-preview {
        background: #f8fafc;
        border-radius: 12px;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 200px;
        max-height: 300px;
        overflow: hidden;
      }

      .${p}-image-preview img {
        max-width: 100%;
        max-height: 250px;
        object-fit: contain;
        border-radius: 8px;
      }

      .${p}-image-form {
        display: grid;
        gap: 16px;
      }

      .${p}-form-group {
        display: grid;
        gap: 6px;
      }

      .${p}-form-group label {
        font-size: 14px;
        font-weight: 500;
        color: #475569;
      }

      .${p}-input {
        padding: 10px 14px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.2s;
      }

      .${p}-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .${p}-input-file {
        padding: 8px;
        background: #f8fafc;
      }

      .${p}-image-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px 24px;
        border-top: 1px solid #e2e8f0;
        background: #f8fafc;
      }

      .${p}-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .${p}-btn-primary {
        background: #3b82f6;
        color: white;
      }

      .${p}-btn-primary:hover {
        background: #2563eb;
      }

      .${p}-btn-secondary {
        background: #e2e8f0;
        color: #475569;
      }

      .${p}-btn-secondary:hover {
        background: #cbd5e1;
      }

      /* コンポーネント操作ボタン */
      .${p}-component-controls {
        position: absolute;
        top: 10px;
        right: 10px;
        display: none;
        gap: 6px;
        z-index: 100;
      }

      *:hover > .${p}-component-controls,
      .${p}-component-controls:hover {
        display: flex;
      }

      .${p}-control-btn {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #475569;
        transition: all 0.2s;
      }

      .${p}-control-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background: white;
        color: #1e293b;
      }

      .${p}-control-btn.${p}-drag-handle {
        cursor: grab;
      }

      .${p}-control-btn.${p}-drag-handle:active {
        cursor: grabbing;
      }

      .${p}-control-btn.${p}-delete:hover {
        background: #fee2e2;
        color: #dc2626;
      }

      .${p}-control-btn.${p}-duplicate:hover {
        background: #dbeafe;
        color: #2563eb;
      }

      .${p}-control-btn.${p}-edit:hover {
        background: #fef3c7;
        color: #d97706;
      }

      .${p}-control-btn svg {
        width: 16px;
        height: 16px;
      }

      /* 通知アニメーション */
      @keyframes notifySlideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes notifySlideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }
}

// グローバル参照を維持（他ファイルが参照するため）
window.CommonEditor = CommonEditor;
