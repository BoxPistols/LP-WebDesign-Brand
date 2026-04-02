// Universal Landing Page Generator
// Main Application Logic
// enhanced-generator.js の機能を統合済み

class LandingPageGenerator {
  // 定数: CommonEditor.CONFIG を拡張
  static get CONFIG() {
    return {
      ...CommonEditor.CONFIG,
      ZOOM_MIN: 25,
      ZOOM_MAX: 100,
      ZOOM_DEFAULT: 100,
      AUTOSAVE_INTERVAL: 30000,
      AUTOSAVE_RETENTION_HOURS: 24,
      CDN_BASE_URL: 'https://cdn.jsdelivr.net/gh/BoxPistols/LP-WebDesign-Brand@main/css',
      DEFAULT_THEME: 'modern-blue',
      DEFAULT_CSS_MODE: 'custom',
      NOTIFICATION_FADE_MS: 300,
    };
  }

  constructor() {
    this.currentTheme = LandingPageGenerator.CONFIG.DEFAULT_THEME;
    this.sections = [];
    this.animations = true;
    this.glassmorphism = false;
    this.deviceMode = 'desktop';
    this.autoSaveInterval = null;
    this.exportedHTML = null;
    this.cssMode = LandingPageGenerator.CONFIG.DEFAULT_CSS_MODE;
    this.zoomLevel = LandingPageGenerator.CONFIG.ZOOM_DEFAULT;

    // Undo/Redo 履歴管理
    this.history = [];
    this.historyIndex = -1;
    this.maxHistorySize = CommonEditor.CONFIG.MAX_HISTORY_SIZE;

    // EnhancedGenerator から統合: SEOデータ
    this.seoData = {
      title: '',
      description: '',
      keywords: '',
      ogImage: '',
      canonicalUrl: '',
      lang: 'ja',
      includeTwitterCard: true,
      includeSchema: true,
    };

    // EnhancedGenerator から統合: デザイン設定
    this.designSettings = {
      fontFamily: 'Inter',
      fontSizeScale: 1.0,
      spacingScale: 1.0,
      borderRadius: 8,
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      accentColor: '#f093fb',
    };

    // CommonEditor インスタンス（インライン編集の委譲先）
    this.commonEditor = null;

    // イベントリスナーの参照（destroy用）
    this._boundListeners = [];

    // IntersectionObserver参照
    this.animationObserver = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadSectionTemplates();
    this.setupSidebarToggle();
    this.setupInlineEditing();
    this.setupHelpPanel();
    this.setupWelcomeModal();
    this.setupZoomControls();
    this.setupSectionAccordion();
    this.draggedItem = null;

    // EnhancedGenerator から統合
    this.setupAdvancedExport();
    this.setupPresets();
    this.setupEnhancedKeyboardShortcuts();
    this.setupDesignCustomization();
    this.setupSEOEditor();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupParallaxEffects();
    this.setupAI();
  }

  // ==========================================
  // AI INTEGRATION
  // ==========================================

  setupAI() {
    if (typeof AIUIController === 'undefined') return;
    this.aiController = new AIUIController(this, 'lp');
    this.aiController.init();
  }

  /**
   * AI生成されたHTMLをセクションとして挿入
   * @param {string} html - 挿入するHTML
   * @param {string} [afterSectionId] - この後に挿入（省略時は末尾）
   */
  insertAIGeneratedSection(html, afterSectionId) {
    const newSection = {
      id: 'ai-' + Date.now(),
      template: {
        name: 'AI生成セクション',
        html: html,
      },
      imageChanges: [],
    };

    if (afterSectionId) {
      const idx = this.sections.findIndex(s => s.id === afterSectionId);
      if (idx !== -1) {
        this.sections.splice(idx + 1, 0, newSection);
      } else {
        this.sections.push(newSection);
      }
    } else {
      this.sections.push(newSection);
    }

    this.saveState();
    this.updatePreview();
    this.showNotification('AI生成セクションを追加しました');
  }

  // ==========================================
  // DESTROY / CLEANUP
  // ==========================================

  /**
   * リソース解放: setInterval、イベントリスナー、Observerをクリーンアップ
   */
  destroy() {
    this.stopAutoSave();

    // IntersectionObserver の切断
    if (this.animationObserver) {
      this.animationObserver.disconnect();
      this.animationObserver = null;
    }

    // 登録済みイベントリスナーを解除
    this._boundListeners.forEach(({ target, event, handler, options }) => {
      target.removeEventListener(event, handler, options);
    });
    this._boundListeners = [];
  }

  /**
   * イベントリスナー登録のヘルパー（destroyで自動解除）
   */
  _addListener(target, event, handler, options) {
    target.addEventListener(event, handler, options);
    this._boundListeners.push({ target, event, handler, options });
  }

  // ==========================================
  // SECTION ACCORDION
  // ==========================================

  setupSectionAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach((header) => {
      header.addEventListener('click', () => {
        const accordionItem = header.closest('.accordion-item');
        const content = accordionItem.querySelector('.accordion-content');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        header.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('open', !isExpanded);

        this.saveAccordionState();
      });
    });

    this.restoreAccordionState();
  }

  saveAccordionState() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    const state = {};

    accordionItems.forEach((item) => {
      const accordionId = item.dataset.accordion;
      const isExpanded =
        item.querySelector('.accordion-header').getAttribute('aria-expanded') === 'true';
      state[accordionId] = isExpanded;
    });

    CommonEditor.saveToStorage('lpAccordionState', state);
  }

  restoreAccordionState() {
    const state = CommonEditor.loadFromStorage('lpAccordionState');
    if (!state) return;

    try {
      const accordionItems = document.querySelectorAll('.accordion-item');

      accordionItems.forEach((item) => {
        const accordionId = item.dataset.accordion;
        if (accordionId in state) {
          const header = item.querySelector('.accordion-header');
          const content = item.querySelector('.accordion-content');
          const isExpanded = state[accordionId];

          header.setAttribute('aria-expanded', isExpanded);
          content.classList.toggle('open', isExpanded);
        }
      });
    } catch (e) {
      console.warn('Failed to restore accordion state:', e);
    }
  }

  // ==========================================
  // SIDEBAR TOGGLE
  // ==========================================

  setupSidebarToggle() {
    const toggle = document.getElementById('sidebarToggle');
    const container = document.querySelector('.generator-container');

    if (toggle && container) {
      toggle.addEventListener('click', () => {
        container.classList.toggle('sidebar-collapsed');
        const isCollapsed = container.classList.contains('sidebar-collapsed');
        CommonEditor.saveToStorage('lpSidebarCollapsed', isCollapsed);
      });

      if (CommonEditor.loadFromStorage('lpSidebarCollapsed') === true) {
        container.classList.add('sidebar-collapsed');
      }
    }
  }

  // ==========================================
  // ZOOM CONTROLS
  // ==========================================

  setupZoomControls() {
    const zoomSlider = document.getElementById('zoomSlider');
    const zoomValue = document.getElementById('zoomValue');
    const zoomIn = document.getElementById('zoomIn');
    const zoomOut = document.getElementById('zoomOut');
    const zoomFit = document.getElementById('zoomFit');
    const zoomReset = document.getElementById('zoomReset');
    const previewFrame = document.getElementById('previewFrame');
    const previewArea = document.querySelector('.preview-area');

    if (!zoomSlider || !previewFrame) return;

    let baseWidth = null;
    let baseHeight = null;

    const { ZOOM_MIN, ZOOM_MAX, ZOOM_DEFAULT } = LandingPageGenerator.CONFIG;

    const applyZoom = (level) => {
      this.zoomLevel = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, level));
      const scale = this.zoomLevel / 100;

      if (this.zoomLevel < ZOOM_DEFAULT) {
        if (!baseWidth) {
          baseWidth = previewFrame.offsetWidth;
          baseHeight = previewFrame.scrollHeight;
        }
        previewFrame.style.width = `${baseWidth}px`;
        previewFrame.style.height = `${baseHeight}px`;
        previewFrame.style.transform = `scale(${scale})`;
        previewFrame.style.transformOrigin = 'top left';
        previewFrame.classList.add('zoomed');
        previewArea?.classList.add('zoom-active');
      } else {
        previewFrame.style.width = '';
        previewFrame.style.height = '';
        previewFrame.style.transform = '';
        previewFrame.classList.remove('zoomed');
        previewArea?.classList.remove('zoom-active');
        baseWidth = null;
        baseHeight = null;
      }

      zoomSlider.value = this.zoomLevel;
      zoomValue.textContent = `${this.zoomLevel}%`;

      CommonEditor.saveToStorage('lpZoomLevel', this.zoomLevel);
    };

    zoomSlider.addEventListener('input', (e) => {
      applyZoom(parseInt(e.target.value));
    });

    zoomIn?.addEventListener('click', () => {
      applyZoom(this.zoomLevel + 10);
    });

    zoomOut?.addEventListener('click', () => {
      applyZoom(this.zoomLevel - 10);
    });

    zoomFit?.addEventListener('click', () => {
      applyZoom(50);
    });

    zoomReset?.addEventListener('click', () => {
      applyZoom(ZOOM_DEFAULT);
    });

    // キーボードショートカット
    this._addListener(document, 'keydown', (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.target.tagName !== 'INPUT' &&
        e.target.tagName !== 'TEXTAREA'
      ) {
        if (e.key === '=' || e.key === '+') {
          e.preventDefault();
          applyZoom(this.zoomLevel + 10);
        } else if (e.key === '-') {
          e.preventDefault();
          applyZoom(this.zoomLevel - 10);
        } else if (e.key === '0') {
          e.preventDefault();
          applyZoom(ZOOM_DEFAULT);
        }
      }
    });

    // マウスホイールズーム (Ctrl)
    previewFrame.addEventListener(
      'wheel',
      (e) => {
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          const delta = e.deltaY > 0 ? -10 : 10;
          applyZoom(this.zoomLevel + delta);
        }
      },
      { passive: false }
    );

    // 保存済みズームレベル復元
    const savedZoom = CommonEditor.loadFromStorage('lpZoomLevel');
    if (savedZoom) {
      applyZoom(parseInt(savedZoom));
    }
  }

  // ==========================================
  // HELP PANEL
  // ==========================================

  setupHelpPanel() {
    const helpToggle = document.getElementById('helpToggle');
    const helpContent = document.getElementById('helpContent');
    const helpClose = document.getElementById('helpClose');

    if (helpToggle && helpContent) {
      helpToggle.addEventListener('click', () => {
        helpContent.classList.toggle('active');
      });

      helpClose?.addEventListener('click', () => {
        helpContent.classList.remove('active');
      });

      document.addEventListener('click', (e) => {
        if (!e.target.closest('.help-panel')) {
          helpContent.classList.remove('active');
        }
      });
    }
  }

  // ==========================================
  // WELCOME MODAL
  // ==========================================

  setupWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    const welcomeClose = document.getElementById('welcomeClose');
    const dontShowAgain = document.getElementById('dontShowAgain');

    if (!welcomeModal) return;

    const hideWelcome = CommonEditor.loadFromStorage('lpHideWelcome');

    if (hideWelcome !== true) {
      setTimeout(() => {
        welcomeModal.classList.add('active');
      }, 500);
    }

    welcomeClose?.addEventListener('click', () => {
      welcomeModal.classList.remove('active');

      if (dontShowAgain?.checked) {
        CommonEditor.saveToStorage('lpHideWelcome', true);
      }
    });

    welcomeModal.addEventListener('click', (e) => {
      if (e.target === welcomeModal) {
        welcomeModal.classList.remove('active');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && welcomeModal.classList.contains('active')) {
        welcomeModal.classList.remove('active');
      }
    });
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================

  setupEventListeners() {
    // テーマ選択
    document.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleThemeChange(e));
    });

    // コンポーネント追加（クリック&ドラッグ）
    document.querySelectorAll('.component-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleComponentAdd(e));

      btn.setAttribute('draggable', 'true');
      btn.addEventListener('dragstart', (e) => this.handleComponentDragStart(e));
      btn.addEventListener('dragend', (e) => this.handleComponentDragEnd(e));

      btn.addEventListener('mouseenter', (e) => this.showSectionPreview(e));
      btn.addEventListener('mouseleave', () => this.hideSectionPreview());
    });

    this.createSectionPreviewTooltip();
    this.setupPreviewDropZone();

    // デバイス切替
    document.querySelectorAll('.device-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleDeviceChange(e));
    });

    // レイアウトオプション
    document.getElementById('animationsToggle')?.addEventListener('change', (e) => {
      this.animations = e.target.checked;
      this.updatePreview();
    });

    document.getElementById('glassmorphismToggle')?.addEventListener('change', (e) => {
      this.glassmorphism = e.target.checked;
      this.updatePreview();
    });

    // アクション
    document.getElementById('exportHTML')?.addEventListener('click', () => this.exportHTML());
    document.getElementById('previewExport')?.addEventListener('click', () => this.previewExport());
    document.getElementById('clearAll')?.addEventListener('click', () => this.clearAll());

    // プロジェクト管理
    document.getElementById('saveProject')?.addEventListener('click', () => this.saveProject());
    document
      .getElementById('loadProject')
      ?.addEventListener('click', () => this.toggleProjectsList());

    // JSON Export/Import
    document
      .getElementById('exportJSON')
      ?.addEventListener('click', () => this.exportProjectAsJSON());
    document
      .getElementById('importJSON')
      ?.addEventListener('click', () => this.importProjectFromJSON());

    // エクスポートモーダル
    document
      .getElementById('exportModalClose')
      ?.addEventListener('click', () => this.closeExportModal());
    document.getElementById('copyCodeBtn')?.addEventListener('click', () => this.copyCode());
    document
      .getElementById('downloadCodeBtn')
      ?.addEventListener('click', () => this.downloadFromModal());

    document.getElementById('exportModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'exportModal') {
        this.closeExportModal();
      }
    });

    // Escape / Undo / Redo ショートカット
    this._addListener(document, 'keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('exportModal');
        if (modal && modal.classList.contains('active')) {
          this.closeExportModal();
        }
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      }

      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        this.redo();
      }
    });

    // CSSモード選択
    document.querySelectorAll('input[name="cssMode"]').forEach((radio) => {
      radio.addEventListener('change', (e) => {
        this.cssMode = e.target.value;
        this.showNotification(
          this.cssMode === 'tailwind'
            ? 'Tailwind CSSモードに切り替えました'
            : 'カスタムCSSモードに切り替えました'
        );
      });
    });
  }

  // ==========================================
  // SECTION TEMPLATES
  // ==========================================

  loadSectionTemplates() {
    this.renderProjectsList();
    this.startAutoSave();
  }

  // ==========================================
  // THEME CHANGE
  // ==========================================

  handleThemeChange(e) {
    const btn = e.currentTarget;
    const theme = btn.dataset.theme;

    document.querySelectorAll('.theme-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    this.currentTheme = theme;
    this.updatePreview();
  }

  // ==========================================
  // COMPONENT ADD
  // ==========================================

  handleComponentAdd(e) {
    const btn = e.currentTarget;
    const component = btn.dataset.component;

    if (!sectionTemplates[component]) {
      console.warn(`テンプレート "${component}" が見つかりません`);
      return;
    }

    if (this.sections.length === 0) {
      const emptyState = document.querySelector('.empty-state');
      if (emptyState) {
        emptyState.remove();
      }
    }

    this.sections.push({
      type: component,
      id: CommonEditor.generateId('section'),
      template: sectionTemplates[component],
    });

    this.saveState();
    this.updatePreview();
    this.showNotification(`${sectionTemplates[component].name} を追加しました`);
  }

  // ==========================================
  // DEVICE CHANGE
  // ==========================================

  handleDeviceChange(e) {
    const btn = e.currentTarget;
    const device = btn.dataset.device;

    document.querySelectorAll('.device-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    this.deviceMode = device;
    this.updateDeviceView();
  }

  updateDeviceView() {
    const previewFrame = document.getElementById('previewFrame');
    previewFrame.className = `preview-frame ${this.deviceMode}`;
  }

  // ==========================================
  // PREVIEW UPDATE
  // ==========================================

  updatePreview() {
    const previewFrame = document.getElementById('previewFrame');

    if (this.sections.length === 0) {
      previewFrame.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-content">
                        <h2>ランディングページを作成しましょう</h2>
                        <p>左側からカラーテーマを選択し、セクションを追加してください</p>
                        <div class="empty-state-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            `;
      return;
    }

    const html = this.generatePreviewHTML();
    previewFrame.innerHTML = html;

    this.addSectionControls();

    if (typeof ImageManager !== 'undefined') {
      ImageManager.makeImagesEditable(previewFrame);
    }

    // プレビュー再構築後にデザイン設定を再適用
    this.applyDesignSettings();
  }

  /**
   * 全デザイン設定をプレビューフレーム内にCSS変数として一括注入
   */
  applyDesignSettings() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) return;

    const settings = this.designSettings;

    // CSS変数をプレビューフレーム内に注入
    const styleId = 'lp-design-settings';
    let styleEl = previewFrame.querySelector(`#${styleId}`);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      previewFrame.prepend(styleEl);
    }

    styleEl.textContent = `
      :root {
        --lp-primary: ${settings.primaryColor};
        --lp-secondary: ${settings.secondaryColor};
        --lp-accent: ${settings.accentColor};
        --lp-font-family: '${settings.fontFamily}', sans-serif;
        --lp-font-scale: ${settings.fontSizeScale};
        --lp-spacing-scale: ${settings.spacingScale};
        --lp-border-radius: ${settings.borderRadius}px;
      }

      .lp-section { font-family: var(--lp-font-family); }
      .lp-section-title { font-size: calc(2.25rem * var(--lp-font-scale)); }
      .lp-section-subtitle { font-size: calc(1.125rem * var(--lp-font-scale)); }
      .lp-hero-title { font-size: calc(3rem * var(--lp-font-scale)); }
      .lp-btn { border-radius: var(--lp-border-radius); }
      .lp-btn-primary { background: var(--lp-primary); }
      .lp-btn-primary:hover { background: color-mix(in srgb, var(--lp-primary) 85%, black); }
      .lp-feature-card, .lp-pricing-card, .lp-testimonial-card { border-radius: var(--lp-border-radius); }
      .lp-feature-icon-wrapper { background: color-mix(in srgb, var(--lp-primary) 15%, white); }
      .lp-section-eyebrow, .lp-text-primary, .lp-gradient-text { color: var(--lp-primary); }
      .lp-bg-primary { background: var(--lp-primary); }
      .lp-bg-accent { background: var(--lp-accent); }
      .lp-section { padding: calc(4rem * var(--lp-spacing-scale)) 0; }
      .lp-content-wrapper { padding: 0 calc(1.5rem * var(--lp-spacing-scale)); }
    `;

    // 個別のカスタムCSSも再適用（フォント、サイズ、スペーシング、角丸、カラー）
    this.applyFontFamily(settings.fontFamily);
    this.applyFontSizeScale(settings.fontSizeScale);
    this.applySpacingScale(settings.spacingScale);
    this.applyBorderRadius(settings.borderRadius);
    this.injectThemeCSS();
  }

  generatePreviewHTML() {
    const sectionsHTML = this.sections
      .map((section) => {
        let sectionHtml = section.template.html;
        if (section.imageChanges && section.imageChanges.length > 0) {
          sectionHtml = this.applyImageChanges(sectionHtml, section.imageChanges);
        }

        return `
                <div class="lp-section-wrapper" data-section-id="${CommonEditor.sanitizeAttribute(section.id)}" draggable="true">
                    <div class="lp-section-controls">
                        <button class="lp-control-btn lp-drag-handle" title="ドラッグして移動" aria-label="ドラッグして移動">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
                        </button>
                        <button class="lp-control-btn lp-move-up" title="上に移動" aria-label="上に移動">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"/></svg>
                        </button>
                        <button class="lp-control-btn lp-move-down" title="下に移動" aria-label="下に移動">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
                        </button>
                        <button class="lp-control-btn lp-duplicate" title="複製" aria-label="複製">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </button>
                        <button class="lp-control-btn lp-delete" title="削除" aria-label="削除">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                    ${sectionHtml}
                </div>
            `;
      })
      .join('');

    return `
            <style>
                .lp-section-wrapper {
                    position: relative;
                    transition: all 0.3s ease;
                    border: 2px solid transparent;
                }
                .lp-section-wrapper.dragging {
                    opacity: 0.5;
                    transform: scale(0.98);
                    border: 2px dashed #3b82f6;
                }
                .lp-section-wrapper.drag-over {
                    border: 2px solid #3b82f6;
                    background: rgba(59, 130, 246, 0.05);
                }
                .lp-section-wrapper.drag-over::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 4px;
                    background: #3b82f6;
                    z-index: 1001;
                }
                .lp-section-controls {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    display: none;
                    gap: 8px;
                    z-index: 1000;
                }
                .lp-section-wrapper:hover .lp-section-controls {
                    display: flex;
                }
                .lp-control-btn {
                    width: 36px;
                    height: 36px;
                    border: none;
                    border-radius: 8px;
                    background: rgba(255, 255, 255, 0.95);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    cursor: pointer;
                    font-size: 16px;
                    transition: all 0.2s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #1e293b;
                }
                .lp-control-btn svg {
                    color: #1e293b;
                    stroke: #1e293b;
                }
                .lp-control-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                    background: #f1f5f9;
                }
                .lp-control-btn.lp-drag-handle {
                    cursor: grab;
                }
                .lp-control-btn.lp-drag-handle:active {
                    cursor: grabbing;
                }
                .lp-control-btn.lp-delete:hover {
                    background: #fee2e2;
                }
                .lp-control-btn.lp-delete:hover svg {
                    color: #dc2626;
                    stroke: #dc2626;
                }
            </style>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&family=Noto+Sans+JP:wght@300;400;500;700;900&family=BIZ+UDPGothic:wght@400;700&family=M+PLUS+1p:wght@300;400;500;700;900&family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="css/landing-page.css">
            <div class="lp-container ${this.glassmorphism ? 'glassmorphism' : ''}" data-theme="${this.currentTheme}">
                ${sectionsHTML}
            </div>
        `;
  }

  // ==========================================
  // SECTION CONTROLS
  // ==========================================

  addSectionControls() {
    document.querySelectorAll('.lp-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.currentTarget.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.deleteSection(sectionId);
      });
    });

    document.querySelectorAll('.lp-move-up').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.currentTarget.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.moveSectionUp(sectionId);
      });
    });

    document.querySelectorAll('.lp-move-down').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.currentTarget.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.moveSectionDown(sectionId);
      });
    });

    document.querySelectorAll('.lp-duplicate').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.currentTarget.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.duplicateSection(sectionId);
      });
    });

    this.setupDragAndDrop();

    // AIカスタマイズボタンをセクションコントロールに追加
    if (this.aiController) {
      document.querySelectorAll('.lp-section-wrapper').forEach(wrapper => {
        this.aiController.addAIButtonToSectionControls(wrapper);
      });
    }
  }

  // ==========================================
  // DRAG AND DROP (プレビュー内セクション並べ替え)
  // ==========================================

  setupDragAndDrop() {
    const wrappers = document.querySelectorAll('.lp-section-wrapper');

    wrappers.forEach((wrapper) => {
      wrapper.addEventListener('dragstart', (e) => {
        this.draggedItem = wrapper;
        wrapper.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', wrapper.dataset.sectionId);
      });

      wrapper.addEventListener('dragend', () => {
        this.draggedItem = null;
        wrapper.classList.remove('dragging');
        document.querySelectorAll('.lp-section-wrapper').forEach((w) => {
          w.classList.remove('drag-over');
        });
      });

      wrapper.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (this.draggedItem && this.draggedItem !== wrapper) {
          wrapper.classList.add('drag-over');
        }
      });

      wrapper.addEventListener('dragleave', () => {
        wrapper.classList.remove('drag-over');
      });

      wrapper.addEventListener('drop', (e) => {
        e.preventDefault();
        wrapper.classList.remove('drag-over');

        if (!this.draggedItem || this.draggedItem === wrapper) return;

        const draggedId = this.draggedItem.dataset.sectionId;
        const targetId = wrapper.dataset.sectionId;

        this.reorderSections(draggedId, targetId);
      });
    });
  }

  reorderSections(draggedId, targetId) {
    const draggedIndex = this.sections.findIndex((s) => s.id === draggedId);
    const targetIndex = this.sections.findIndex((s) => s.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const [draggedSection] = this.sections.splice(draggedIndex, 1);
    this.sections.splice(targetIndex, 0, draggedSection);

    this.saveState();
    this.updatePreview();
    this.showNotification('セクションを移動しました');
  }

  // ==========================================
  // COMPONENT DRAG FROM SIDEBAR TO PREVIEW
  // ==========================================

  handleComponentDragStart(e) {
    const btn = e.currentTarget;
    const component = btn.dataset.component;
    e.dataTransfer.setData('component-type', component);
    e.dataTransfer.effectAllowed = 'copy';
    btn.classList.add('dragging');
    this.draggedComponentType = component;

    const previewFrame = document.getElementById('previewFrame');
    previewFrame?.classList.add('drop-zone-active');
  }

  handleComponentDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    this.draggedComponentType = null;

    const previewFrame = document.getElementById('previewFrame');
    previewFrame?.classList.remove('drop-zone-active');

    document.querySelectorAll('.drop-indicator').forEach((el) => el.remove());
  }

  setupPreviewDropZone() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) return;

    previewFrame.addEventListener('dragover', (e) => {
      if (!this.draggedComponentType) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';

      this.updateDropIndicator(e);
    });

    previewFrame.addEventListener('dragleave', (e) => {
      if (e.target === previewFrame || !previewFrame.contains(e.relatedTarget)) {
        document.querySelectorAll('.drop-indicator').forEach((el) => el.remove());
      }
    });

    previewFrame.addEventListener('drop', (e) => {
      e.preventDefault();
      const componentType = e.dataTransfer.getData('component-type');

      if (componentType && sectionTemplates[componentType]) {
        const dropIndex = this.getDropIndex(e);
        this.insertComponentAt(componentType, dropIndex);
      }

      document.querySelectorAll('.drop-indicator').forEach((el) => el.remove());
      previewFrame.classList.remove('drop-zone-active');
    });
  }

  updateDropIndicator(e) {
    const previewFrame = document.getElementById('previewFrame');
    const container = previewFrame.querySelector('.lp-container');
    if (!container) {
      this.showEmptyDropIndicator(previewFrame);
      return;
    }

    const wrappers = container.querySelectorAll('.lp-section-wrapper');
    if (wrappers.length === 0) {
      this.showEmptyDropIndicator(container);
      return;
    }

    document.querySelectorAll('.drop-indicator').forEach((el) => el.remove());

    let closestWrapper = null;
    let closestOffset = Number.POSITIVE_INFINITY;
    let insertBefore = true;

    wrappers.forEach((wrapper) => {
      const rect = wrapper.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      const offset = e.clientY - midY;

      if (Math.abs(offset) < Math.abs(closestOffset)) {
        closestOffset = offset;
        closestWrapper = wrapper;
        insertBefore = offset < 0;
      }
    });

    if (closestWrapper) {
      const indicator = document.createElement('div');
      indicator.className = 'drop-indicator';
      indicator.style.cssText = `
        height: 4px;
        background: #3b82f6;
        border-radius: 2px;
        margin: 8px 0;
        animation: pulse 1s ease-in-out infinite;
      `;

      if (insertBefore) {
        closestWrapper.parentNode.insertBefore(indicator, closestWrapper);
      } else {
        closestWrapper.parentNode.insertBefore(indicator, closestWrapper.nextSibling);
      }
    }
  }

  showEmptyDropIndicator(container) {
    document.querySelectorAll('.drop-indicator').forEach((el) => el.remove());

    const indicator = document.createElement('div');
    indicator.className = 'drop-indicator';
    indicator.style.cssText = `
      height: 100px;
      border: 2px dashed #3b82f6;
      border-radius: 12px;
      background: rgba(59, 130, 246, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px;
      color: #3b82f6;
      font-weight: 600;
    `;
    indicator.textContent = 'ここにドロップ';
    container.appendChild(indicator);
  }

  getDropIndex(e) {
    const previewFrame = document.getElementById('previewFrame');
    const container = previewFrame.querySelector('.lp-container');
    if (!container) return 0;

    const wrappers = container.querySelectorAll('.lp-section-wrapper');
    if (wrappers.length === 0) return 0;

    let dropIndex = 0;
    wrappers.forEach((wrapper, index) => {
      const rect = wrapper.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (e.clientY > midY) {
        dropIndex = index + 1;
      }
    });

    return dropIndex;
  }

  insertComponentAt(componentType, index) {
    if (!sectionTemplates[componentType]) return;

    if (this.sections.length === 0) {
      const emptyState = document.querySelector('.empty-state');
      if (emptyState) emptyState.remove();
    }

    const newSection = {
      type: componentType,
      id: CommonEditor.generateId('section'),
      template: sectionTemplates[componentType],
    };

    this.sections.splice(index, 0, newSection);

    this.saveState();
    this.updatePreview();
    this.showNotification(`${sectionTemplates[componentType].name} を追加しました`);
  }

  // ==========================================
  // IMAGE CHANGES
  // ==========================================

  applyImageChanges(html, imageChanges) {
    const temp = document.createElement('div');
    temp.innerHTML = html;

    imageChanges.forEach((change) => {
      if (change.index < 1000) {
        const images = temp.querySelectorAll('img');
        if (images[change.index]) {
          images[change.index].src = change.src;
          if (change.alt) images[change.index].alt = change.alt;
        }
      } else {
        const bgIndex = change.index - 1000;
        const bgElements = temp.querySelectorAll('[style*="background"]');
        if (bgElements[bgIndex]) {
          const currentStyle = bgElements[bgIndex].getAttribute('style') || '';
          const newStyle = currentStyle.replace(
            /background(-image)?:\s*url\(['"]?[^'")\s]+['"]?\)/gi,
            `background-image: url('${change.src}')`
          );
          bgElements[bgIndex].setAttribute('style', newStyle);
        }
      }
    });

    return temp.innerHTML;
  }

  // ==========================================
  // SECTION OPERATIONS
  // ==========================================

  deleteSection(sectionId) {
    this.sections = this.sections.filter((s) => s.id !== sectionId);
    this.saveState();
    this.updatePreview();
    this.showNotification('セクションを削除しました');
  }

  moveSectionUp(sectionId) {
    const index = this.sections.findIndex((s) => s.id === sectionId);
    if (index > 0) {
      [this.sections[index - 1], this.sections[index]] = [
        this.sections[index],
        this.sections[index - 1],
      ];
      this.saveState();
      this.updatePreview();
    }
  }

  moveSectionDown(sectionId) {
    const index = this.sections.findIndex((s) => s.id === sectionId);
    if (index < this.sections.length - 1) {
      [this.sections[index], this.sections[index + 1]] = [
        this.sections[index + 1],
        this.sections[index],
      ];
      this.saveState();
      this.updatePreview();
    }
  }

  duplicateSection(sectionId) {
    const index = this.sections.findIndex((s) => s.id === sectionId);
    if (index === -1) return;

    const original = this.sections[index];
    const duplicate = {
      type: original.type,
      id: CommonEditor.generateId('section'),
      template: original.template,
    };

    this.sections.splice(index + 1, 0, duplicate);
    this.saveState();
    this.updatePreview();
    this.showNotification(`${original.template.name} を複製しました`);
  }

  // ==========================================
  // UNDO/REDO 機能
  // ==========================================

  saveState() {
    const state = JSON.parse(JSON.stringify(this.sections));

    this.history = this.history.slice(0, this.historyIndex + 1);

    this.history.push(state);
    this.historyIndex++;

    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
      this.historyIndex--;
    }
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.sections = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
      this.updatePreview();
      this.showNotification('元に戻しました (Ctrl+Z)');
    } else if (this.historyIndex === 0 && this.sections.length > 0) {
      this.historyIndex = -1;
      this.sections = [];
      this.updatePreview();
      this.showNotification('元に戻しました (Ctrl+Z)');
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.sections = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
      this.updatePreview();
      this.showNotification('やり直しました (Ctrl+Shift+Z)');
    }
  }

  // ==========================================
  // EXPORT
  // ==========================================

  async exportHTML() {
    if (this.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    const fullHTML = await this.generateFullHTML();
    this.showExportModal(fullHTML);
  }

  async previewExport() {
    if (this.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    const formatRadio = document.querySelector('input[name="lpExportFormat"]:checked');
    const format = formatRadio ? formatRadio.value : 'html';

    let code, filename, formatLabel;
    this.exportFormat = format;
    this.exportCSS = null;

    switch (format) {
      case 'css-only':
        code = await this.getInlineCSS();
        filename = `landing-page-${Date.now()}.css`;
        formatLabel = 'CSS Only';
        break;
      case 'html-external':
        code = await this.generateExternalCSSHTML();
        filename = `landing-page-${Date.now()}.html`;
        formatLabel = 'HTML + 外部CSS';
        this.exportCSS = await this.getInlineCSS();
        this.exportCSSFilename = `landing-page-${Date.now()}.css`;
        break;
      case 'tailwind':
        code = await this.generateTailwindHTML();
        filename = `landing-page-tailwind-${Date.now()}.html`;
        formatLabel = 'Tailwind CSS';
        break;
      case 'shadcn':
        code = this.generateShadcnUI();
        filename = `LandingPage-${Date.now()}.tsx`;
        formatLabel = 'shadcn/ui (React)';
        break;
      case 'mui':
        code = this.generateMUI();
        filename = `LandingPage-${Date.now()}.tsx`;
        formatLabel = 'MUI (React)';
        break;
      case 'html':
      default:
        code = await this.generateCustomCSSHTML();
        filename = `landing-page-${Date.now()}.html`;
        formatLabel = 'HTML/CSS (インライン)';
        break;
    }

    this.exportFilename = filename;
    this.showExportModal(code, formatLabel);
  }

  showExportModal(code, formatLabel = 'HTML/CSS') {
    const modal = document.getElementById('exportModal');
    const codePreview = document.getElementById('exportCodePreview').querySelector('code');
    const linesElement = document.getElementById('exportCodeLines');
    const sizeElement = document.getElementById('exportCodeSize');
    const modalTitle = modal.querySelector('.export-modal-header h3');
    const modalToolbar = modal.querySelector('.export-modal-toolbar');

    this.exportedHTML = code;
    this.currentPreviewTab = 'html';

    if (modalTitle) {
      modalTitle.textContent = `コードプレビュー - ${formatLabel}`;
    }

    const existingTabs = modal.querySelector('.export-file-tabs');
    if (existingTabs) existingTabs.remove();

    if (this.exportFormat === 'html-external' && this.exportCSS) {
      const tabsHTML = `
        <div class="export-file-tabs">
          <button class="export-tab active" data-tab="html">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            index.html
          </button>
          <button class="export-tab" data-tab="css">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
            </svg>
            landing-page.css
          </button>
        </div>
      `;
      modalToolbar.insertAdjacentHTML('beforebegin', tabsHTML);

      modal.querySelectorAll('.export-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          modal.querySelectorAll('.export-tab').forEach((t) => t.classList.remove('active'));
          tab.classList.add('active');
          this.currentPreviewTab = tab.dataset.tab;
          this.updateExportPreview();
        });
      });
    }

    codePreview.textContent = code;

    const lines = code.split('\n').length;
    const sizeKB = (new Blob([code]).size / 1024).toFixed(2);

    linesElement.textContent = lines;
    sizeElement.textContent = sizeKB;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  updateExportPreview() {
    const codePreview = document.getElementById('exportCodePreview').querySelector('code');
    const linesElement = document.getElementById('exportCodeLines');
    const sizeElement = document.getElementById('exportCodeSize');

    const content = this.currentPreviewTab === 'css' ? this.exportCSS : this.exportedHTML;

    codePreview.textContent = content;

    const lines = content.split('\n').length;
    const sizeKB = (new Blob([content]).size / 1024).toFixed(2);

    linesElement.textContent = lines;
    sizeElement.textContent = sizeKB;
  }

  closeExportModal() {
    const modal = document.getElementById('exportModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    this.exportedHTML = null;
    this.exportFilename = null;
    this.exportCSS = null;
    this.exportCSSFilename = null;
    this.exportFormat = null;
    this.currentPreviewTab = 'html';

    const tabs = modal.querySelector('.export-file-tabs');
    if (tabs) tabs.remove();
  }

  async copyCode() {
    if (!this.exportedHTML) return;

    const content =
      this.currentPreviewTab === 'css' && this.exportCSS ? this.exportCSS : this.exportedHTML;

    try {
      await navigator.clipboard.writeText(content);
      const fileType = this.currentPreviewTab === 'css' ? 'CSS' : 'コード';
      this.showNotification(`${fileType}をクリップボードにコピーしました`);

      const btn = document.getElementById('copyCodeBtn');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                コピー完了
            `;

      setTimeout(() => {
        btn.innerHTML = originalHTML;
      }, 2000);
    } catch (err) {
      console.error('コピーに失敗しました:', err);
      this.showNotification('コピーに失敗しました', 'error');
    }
  }

  downloadFromModal() {
    if (!this.exportedHTML) return;

    const filename = this.exportFilename || `landing-page-${Date.now()}.html`;
    const isReact = filename.endsWith('.tsx') || filename.endsWith('.jsx');
    const isCSS = filename.endsWith('.css');
    const mimeType = isReact ? 'text/plain' : isCSS ? 'text/css' : 'text/html';

    this.downloadFile(this.exportedHTML, filename, mimeType);

    if (this.exportFormat === 'html-external' && this.exportCSS) {
      setTimeout(() => {
        this.downloadFile(this.exportCSS, 'landing-page.css', 'text/css');
      }, 500);
      this.showNotification('HTMLとCSSファイルをダウンロードしました');
    } else {
      const formatName = isReact ? 'Reactコンポーネント' : isCSS ? 'CSSファイル' : 'HTMLファイル';
      this.showNotification(`${formatName}をダウンロードしました`);
    }

    this.closeExportModal();
  }

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  // ==========================================
  // HTML GENERATION
  // ==========================================

  async generateFullHTML() {
    if (this.cssMode === 'tailwind') {
      return await this.generateTailwindHTML();
    } else {
      return await this.generateCustomCSSHTML();
    }
  }

  async generateCustomCSSHTML() {
    const sectionsHTML = this.sections.map((section) => section.template.html).join('\n');

    const seoMetaTags = this.generateSEOMetaTags();
    const lang = this.seoData.lang || 'ja';
    const cdnBase = LandingPageGenerator.CONFIG.CDN_BASE_URL;

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
${seoMetaTags || '    <title>My Landing Page</title>'}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&family=Noto+Sans+JP:wght@300;400;500;700;900&family=BIZ+UDPGothic:wght@400;700&family=M+PLUS+1p:wght@300;400;500;700;900&family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <!-- Landing Page Styles via CDN -->
    <link rel="stylesheet" href="${cdnBase}/landing-page.css">
    <link rel="stylesheet" href="${cdnBase}/advanced-components.css">
</head>
<body>
    <div class="lp-container ${this.glassmorphism ? 'glassmorphism' : ''}" data-theme="${this.currentTheme}">
        ${sectionsHTML}
    </div>

    <script>
        // Smooth scroll animation observer
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.lp-slide-up, .lp-fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease-out';
            observer.observe(el);
        });

        // Form submission handler
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('フォームが送信されました！（デモ）');
            });
        });
    </script>
</body>
</html>`;
  }

  async generateExternalCSSHTML() {
    const sectionsHTML = this.sections.map((section) => section.template.html).join('\n');
    const seoMetaTags = this.generateSEOMetaTags();
    const lang = this.seoData.lang || 'ja';

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
${seoMetaTags || '    <title>My Landing Page</title>'}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&family=Roboto:wght@300;400;500;700;900&family=Noto+Sans+JP:wght@300;400;500;700;900&family=BIZ+UDPGothic:wght@400;700&family=M+PLUS+1p:wght@300;400;500;700;900&family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <!-- External CSS files - download separately -->
    <link rel="stylesheet" href="landing-page.css">
    <link rel="stylesheet" href="advanced-components.css">
</head>
<body>
    <div class="lp-container ${this.glassmorphism ? 'glassmorphism' : ''}" data-theme="${this.currentTheme}">
        ${sectionsHTML}
    </div>

    <script>
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        document.querySelectorAll('.lp-slide-up, .lp-fade-in').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease-out';
            observer.observe(el);
        });

        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('フォームが送信されました！（デモ）');
            });
        });
    </script>
</body>
</html>`;
  }

  async generateTailwindHTML() {
    const sectionsHTML = this.sections
      .map((section) => this.convertToTailwind(section.template.html))
      .join('\n');

    const seoMetaTags = this.generateSEOMetaTags();
    const lang = this.seoData.lang || 'ja';
    const themeColors = this.getThemeColors();

    return `<!--
============================================
環境構築ガイド (Tailwind CSS Setup Guide)
============================================

【CDN版（このファイルのまま使用）】
  このHTMLファイルをそのままブラウザで開けば動作します。
  本番環境では以下のビルド版を推奨します。

【ビルド版（推奨）】
1. プロジェクト作成:
   npm create vite@latest my-landing-page -- --template vanilla
   cd my-landing-page

2. Tailwind CSS インストール:
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p

3. tailwind.config.js を編集:
   module.exports = {
     content: ["./*.html", "./src/**/*.{js,ts}"],
     theme: {
       extend: {
         colors: {
           primary: '${themeColors.primary}',
           secondary: '${themeColors.secondary}',
         }
       }
     }
   }

4. src/style.css を作成:
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

5. index.html の <script src="https://cdn.tailwindcss.com"> を削除し、
   CSSファイルをリンク: <link rel="stylesheet" href="./src/style.css">

6. 開発サーバー起動:
   npm run dev

============================================
-->
<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
${seoMetaTags || '    <title>My Landing Page</title>'}
    <!-- CDN版: 開発用。本番ではビルド版を使用してください -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '${themeColors.primary}',
                        secondary: '${themeColors.secondary}',
                    },
                    fontFamily: {
                        sans: ['Inter', 'Noto Sans JP', 'sans-serif'],
                    }
                }
            }
        }
    </script>
</head>
<body class="font-sans antialiased bg-white text-gray-900">
    ${sectionsHTML}

    <script>
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('フォームが送信されました！');
            });
        });
    </script>
</body>
</html>`;
  }

  // ==========================================
  // TAILWIND CONVERSION
  // ==========================================

  convertToTailwind(html) {
    const classMap = {
      // レイアウト
      'lp-section-alt': 'bg-gray-50',
      'lp-section': 'py-16 md:py-24',
      'lp-content-wrapper': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      'lp-section-header': 'text-center mb-12',
      'lp-section-title': 'text-3xl md:text-4xl font-bold text-gray-900',
      'lp-section-subtitle': 'mt-4 text-lg text-gray-600 max-w-2xl mx-auto',
      'lp-section-eyebrow': 'text-sm font-semibold text-primary uppercase tracking-wide',

      // ヒーロー
      'lp-hero-modern': 'relative overflow-hidden',
      'lp-hero':
        'min-h-screen flex items-center bg-gradient-to-br from-primary to-secondary text-white py-20 px-4',
      'lp-container': 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      'lp-hero-content': 'relative z-10 max-w-3xl',
      'lp-hero-title': 'text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight',
      'lp-hero-subtitle': 'mt-6 text-xl md:text-2xl text-gray-600 opacity-90 mb-8',
      'lp-hero-buttons': 'flex flex-col sm:flex-row gap-4',
      'lp-hero-visual': 'relative mt-12 lg:mt-0',
      'lp-hero-image': 'rounded-2xl shadow-2xl',
      'lp-hero-bg-pattern': 'absolute inset-0 overflow-hidden pointer-events-none',
      'lp-hero-gradient-orb': 'absolute w-96 h-96 rounded-full blur-3xl opacity-30',
      'lp-hero-orb-1': 'bg-blue-500 top-0 right-0',
      'lp-hero-orb-2': 'bg-purple-500 bottom-0 left-1/4',
      'lp-hero-orb-3': 'bg-pink-500 top-1/2 right-1/4',
      'lp-hero-stats': 'flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20',
      'lp-hero-stat-number': 'text-3xl font-bold',
      'lp-hero-stat-label': 'text-sm opacity-80',
      'lp-hero-stat': 'text-center',
      'lp-hero-badge':
        'inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6',
      'lp-badge-dot': 'w-2 h-2 bg-white rounded-full animate-pulse',

      // ボタン
      'lp-btn-primary': 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl',
      'lp-btn-secondary': 'bg-secondary hover:bg-secondary/90 text-white',
      'lp-btn-ghost': 'text-gray-700 hover:bg-gray-100 px-6 py-3',
      'lp-btn-outline': 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      'lp-btn-lg': 'px-8 py-4 text-lg',
      'lp-btn':
        'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300',

      // フィーチャー
      'lp-features-grid-3': 'grid grid-cols-1 md:grid-cols-3 gap-8',
      'lp-features-grid': 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
      'lp-feature-card-modern': 'p-6 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow',
      'lp-feature-card':
        'bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300',
      'lp-feature-icon-wrapper':
        'w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white mb-6',
      'lp-feature-icon': 'w-8 h-8',
      'lp-feature-title': 'mt-4 text-xl font-semibold text-gray-900 mb-3',
      'lp-feature-description': 'mt-2 text-gray-600 leading-relaxed',

      // グラデーション
      'lp-gradient-text':
        'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',

      // プライシング
      'lp-pricing-grid-modern': 'grid grid-cols-1 md:grid-cols-3 gap-8',
      'lp-pricing-grid': 'grid md:grid-cols-3 gap-8 items-start',
      'lp-pricing-card-featured': 'p-8 rounded-2xl bg-primary text-white shadow-xl scale-105',
      'lp-pricing-card-popular': 'ring-2 ring-primary scale-105',
      'lp-pricing-card': 'bg-white rounded-2xl p-8 shadow-lg border border-gray-200',
      'lp-pricing-badge':
        'absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full',
      'lp-pricing-price': 'text-4xl font-bold text-gray-900 mb-2',
      'lp-pricing-period': 'text-gray-500',
      'lp-pricing-title': 'text-xl font-semibold text-gray-900 mb-2',
      'lp-pricing-description': 'text-gray-600 mb-6',
      'lp-pricing-features': 'space-y-3 mb-8',
      'lp-pricing-feature': 'flex items-center gap-3 text-gray-600',

      // テスティモニアル
      'lp-testimonials-grid': 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
      'lp-testimonial-card': 'bg-white rounded-2xl p-6 shadow-lg',
      'lp-testimonial-text': 'text-gray-700 mb-4 italic',
      'lp-testimonial-author': 'font-semibold text-gray-900',
      'lp-testimonial-role': 'text-sm text-gray-500',

      // CTA
      'lp-cta-banner': 'bg-primary text-white rounded-2xl p-12 text-center',
      'lp-cta': 'bg-gradient-to-r from-primary to-secondary text-white py-20 px-4',
      'lp-cta-content': 'max-w-3xl mx-auto text-center',
      'lp-cta-title': 'text-3xl md:text-4xl font-bold mb-4',
      'lp-cta-subtitle': 'text-xl opacity-90 mb-8',

      // フォーム
      'lp-contact-form': 'bg-white rounded-2xl p-8 shadow-xl',
      'lp-form-group': 'mb-4',
      'lp-form-label': 'block text-sm font-medium text-gray-700 mb-1',
      'lp-form-input':
        'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition',
      'lp-form-textarea':
        'w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary resize-none outline-none transition',
      'lp-input':
        'w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition',
      'lp-textarea':
        'w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none',
      'lp-select':
        'w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition appearance-none bg-white',

      // フッター
      'lp-footer-grid': 'grid md:grid-cols-4 gap-8',
      'lp-footer': 'bg-gray-900 text-white py-16 px-4',
      'lp-footer-logo': 'text-2xl font-bold mb-4',
      'lp-footer-description': 'text-gray-400 mb-6',
      'lp-footer-title': 'font-semibold mb-4',
      'lp-footer-links': 'space-y-2',
      'lp-footer-link': 'text-gray-400 hover:text-white transition-colors',
      'lp-footer-bottom': 'border-t border-gray-800 mt-12 pt-8 text-center text-gray-400',
      'lp-social-links': 'flex gap-4',
      'lp-social-link':
        'w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors',

      // FAQ
      'lp-faq-list': 'max-w-3xl mx-auto space-y-4',
      'lp-faq-item': 'bg-white rounded-xl shadow-md overflow-hidden',
      'lp-faq-question':
        'w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors',
      'lp-faq-answer': 'px-6 py-4 text-gray-600 border-t border-gray-100',

      // ギャラリー
      'lp-gallery-grid': 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
      'lp-gallery-item': 'aspect-square rounded-xl overflow-hidden',
      'lp-gallery-image':
        'w-full h-full object-cover hover:scale-110 transition-transform duration-300',

      // タイムライン
      'lp-timeline': 'relative max-w-3xl mx-auto',
      'lp-timeline-item': 'relative pl-8 pb-8 border-l-2 border-primary/30 last:border-transparent',
      'lp-timeline-dot': 'absolute left-0 -translate-x-1/2 w-4 h-4 bg-primary rounded-full',
      'lp-timeline-content': 'bg-white rounded-xl p-6 shadow-lg',
      'lp-timeline-date': 'text-sm text-primary font-medium mb-2',
      'lp-timeline-title': 'text-lg font-semibold text-gray-900 mb-2',
      'lp-timeline-description': 'text-gray-600',

      // アニメーション
      'lp-slide-up': 'opacity-0 translate-y-8 transition-all duration-700',
      'lp-fade-in': 'opacity-0 transition-opacity duration-700',
      'lp-hover-lift': 'hover:-translate-y-1 transition-transform',

      // ユーティリティ
      'lp-bg-light': 'bg-gray-50',
      'lp-bg-dark': 'bg-gray-900',
      'lp-bg-primary': 'bg-primary',
      'lp-text-primary': 'text-primary',
      'lp-text-white': 'text-white',
      'lp-text-muted': 'text-gray-500',
      'lp-grid-2col': 'grid grid-cols-1 md:grid-cols-2 gap-8',
      'lp-gap-xl': 'gap-12',
      'lp-items-center': 'items-center',
      'lp-mx-auto': 'mx-auto',
      'lp-py-xl': 'py-16',
      'lp-sr-only': 'sr-only',
    };

    let result = html;

    // CSS変数 var(--xxx) をTailwindのカスタムカラーに変換
    result = result.replace(/var\(--primary(?:-color)?\)/g, 'theme(colors.primary)');
    result = result.replace(/var\(--secondary(?:-color)?\)/g, 'theme(colors.secondary)');

    // style属性内のCSS変数をインラインで処理
    result = result.replace(/style="([^"]*)"/g, (match, styleContent) => {
      let cleaned = styleContent
        .replace(/color:\s*var\(--primary(?:-color)?\)/g, '')
        .replace(/background(?:-color)?:\s*var\(--primary(?:-color)?\)/g, '')
        .replace(/color:\s*var\(--secondary(?:-color)?\)/g, '')
        .replace(/background(?:-color)?:\s*var\(--secondary(?:-color)?\)/g, '')
        .replace(/;\s*;/g, ';')
        .replace(/^\s*;\s*/, '')
        .replace(/;\s*$/, '')
        .trim();
      return cleaned ? `style="${cleaned}"` : '';
    });

    const sortedEntries = Object.entries(classMap).sort((a, b) => b[0].length - a[0].length);

    sortedEntries.forEach(([lpClass, twClasses]) => {
      const regex = new RegExp(`\\b${lpClass}\\b`, 'g');
      result = result.replace(regex, twClasses);
    });

    // 未マッピングのlp-*クラスを除去（空白も整理）
    result = result.replace(/\blp-[a-zA-Z0-9-]+\b\s*/g, '');

    // 重複スペースの整理とclass属性の最適化
    result = result.replace(/class="([^"]*)"/g, (match, classes) => {
      // 重複クラスを除去
      const uniqueClasses = [...new Set(classes.split(/\s+/).filter(Boolean))];
      const cleaned = uniqueClasses.join(' ');
      return cleaned ? `class="${cleaned}"` : '';
    });

    // 空のclass属性を除去
    result = result.replace(/\s*class=""\s*/g, ' ');

    // 空のstyle属性を除去
    result = result.replace(/\s*style=""\s*/g, ' ');

    // data-animate属性を追加（アニメーション用）
    result = result.replace(
      /class="([^"]*(?:opacity-0[^"]*translate-y-8|transition-all duration-700)[^"]*)"/g,
      'class="$1" data-animate'
    );

    return result;
  }

  // ==========================================
  // THEME COLORS
  // ==========================================

  getThemeColors() {
    const themes = {
      'modern-blue': { primary: '#3b82f6', secondary: '#3b82f6' },
      sunset: { primary: '#f5576c', secondary: '#f093fb' },
      ocean: { primary: '#3b82f6', secondary: '#1e40af' },
      forest: { primary: '#10b981', secondary: '#059669' },
      'dark-mode': { primary: '#1e3a8a', secondary: '#3730a3' },
      vibrant: { primary: '#f59e0b', secondary: '#dc2626' },
      neon: { primary: '#3b82f6', secondary: '#3b82f6' },
      nature: { primary: '#10b981', secondary: '#059669' },
      monochrome: { primary: '#171717', secondary: '#404040' },
      pastel: { primary: '#10b981', secondary: '#3b82f6' },
    };

    return themes[this.currentTheme] || themes[LandingPageGenerator.CONFIG.DEFAULT_THEME];
  }

  // ==========================================
  // SHADCN UI EXPORT
  // ==========================================

  generateShadcnUI() {
    const themeColors = this.getThemeColors();

    const sectionComponents = this.sections
      .map((section) => {
        return this.convertToReactComponent(section);
      })
      .join('\n');

    const imports = this.getShadcnImports();
    const requiredComponents = this.getRequiredShadcnComponents();

    return `/**
 * Generated by LP Generator - shadcn/ui React Component
 *
 * ============================================
 * 環境構築ガイド (Setup Guide)
 * ============================================
 *
 * 1. プロジェクト作成 (Create Project):
 *    npx create-next-app@latest my-landing-page --typescript --tailwind --eslint
 *    cd my-landing-page
 *
 * 2. shadcn/ui 初期化 (Initialize shadcn/ui):
 *    npx shadcn@latest init
 *    - Style: Default
 *    - Base color: Slate
 *    - CSS variables: Yes
 *
 * 3. 必要なコンポーネントをインストール (Install Components):
 *    npx shadcn@latest add ${requiredComponents.join(' ')}
 *
 * 4. globals.css でカラー変数を設定 (Set Color Variables):
 *    :root {
 *      --primary: ${this.hexToHSL(themeColors.primary)};
 *      --secondary: ${this.hexToHSL(themeColors.secondary)};
 *    }
 *
 * 5. このファイルを配置 (Place this file):
 *    app/page.tsx または components/LandingPage.tsx
 *
 * 6. 開発サーバー起動 (Start Dev Server):
 *    npm run dev
 *
 * ============================================
 */

'use client';

import React from 'react';
${imports}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
${sectionComponents}
    </div>
  );
}

// ==========================================
// Section Components
// ==========================================

${this.generateShadcnSectionComponents()}
`;
  }

  getRequiredShadcnComponents() {
    const components = new Set(['button']);

    this.sections.forEach((section) => {
      if (
        section.type.includes('features') ||
        section.type.includes('pricing') ||
        section.type.includes('testimonial')
      ) {
        components.add('card');
      }
      if (section.type.includes('contact') || section.type.includes('newsletter')) {
        components.add('input');
        components.add('label');
        components.add('textarea');
      }
      if (section.type.includes('faq') || section.type.includes('accordion')) {
        components.add('accordion');
      }
      if (section.type.includes('pricing')) {
        components.add('badge');
      }
    });

    return Array.from(components).sort();
  }

  hexToHSL(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
          break;
        case g:
          h = ((b - r) / d + 2) / 6;
          break;
        case b:
          h = ((r - g) / d + 4) / 6;
          break;
      }
    }

    return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
  }

  convertToReactComponent(section) {
    const componentName = this.pascalCase(section.type);
    return `      <${componentName} />`;
  }

  pascalCase(str) {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  getShadcnImports() {
    const imports = new Set();

    imports.add("import { Button } from '@/components/ui/button';");
    imports.add(
      "import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';"
    );

    this.sections.forEach((section) => {
      if (section.type.includes('contact') || section.type.includes('newsletter')) {
        imports.add("import { Input } from '@/components/ui/input';");
        imports.add("import { Label } from '@/components/ui/label';");
        imports.add("import { Textarea } from '@/components/ui/textarea';");
      }
      if (section.type.includes('faq') || section.type.includes('accordion')) {
        imports.add(
          "import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';"
        );
      }
      if (section.type.includes('pricing') || section.type.includes('toggle')) {
        imports.add("import { Badge } from '@/components/ui/badge';");
      }
      if (section.type.includes('tabs')) {
        imports.add(
          "import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';"
        );
      }
    });

    return Array.from(imports).join('\n');
  }

  generateShadcnSectionComponents() {
    const components = [];
    const generatedTypes = new Set();

    this.sections.forEach((section) => {
      if (generatedTypes.has(section.type)) return;
      generatedTypes.add(section.type);

      const componentCode = this.generateShadcnComponent(section);
      components.push(componentCode);
    });

    return components.join('\n\n');
  }

  generateShadcnComponent(section) {
    const componentName = this.pascalCase(section.type);
    const type = section.type;

    if (type.includes('hero')) return this.generateHeroComponent(componentName, type);
    if (type.includes('features')) return this.generateFeaturesComponent(componentName, type);
    if (type.includes('pricing')) return this.generatePricingComponent(componentName, type);
    if (type.includes('testimonial') || type.includes('carousel'))
      return this.generateTestimonialsComponent(componentName, type);
    if (type.includes('cta')) return this.generateCtaComponent(componentName, type);
    if (type.includes('faq') || type.includes('accordion'))
      return this.generateFaqComponent(componentName, type);
    if (type.includes('contact')) return this.generateContactComponent(componentName, type);
    if (type.includes('newsletter'))
      return this.generateNewsletterComponent(componentName, type);
    if (type.includes('stats') || type.includes('metrics'))
      return this.generateStatsComponent(componentName, type);
    if (type.includes('team')) return this.generateTeamComponent(componentName, type);
    if (type.includes('gallery')) return this.generateGalleryComponent(componentName, type);
    if (type.includes('logo')) return this.generateLogoCloudComponent(componentName, type);
    return this.generateGenericComponent(componentName, type);
  }

  generateHeroComponent(name) {
    return `interface ${name}Props {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
}

function ${name}({
  title = "あなたのビジネスを次のレベルへ",
  subtitle = "革新的なソリューションで、ビジネスの成長を加速させましょう。今すぐ始めて、未来を切り開いてください。",
  ctaText = "今すぐ始める",
  secondaryCtaText = "詳しく見る",
}: ${name}Props) {
  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          {title}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            {ctaText}
          </Button>
          <Button size="lg" variant="outline">
            {secondaryCtaText}
          </Button>
        </div>
      </div>
    </section>
  );
}`;
  }

  generateFeaturesComponent(name) {
    return `interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

interface ${name}Props {
  heading?: string;
  subheading?: string;
  features?: FeatureItem[];
}

function ${name}({
  heading = "主な機能",
  subheading = "最高の体験を提供するための機能をご紹介します",
  features = [
    { title: '高速パフォーマンス', description: '最新技術により、高速で安定したパフォーマンスを実現します。', icon: '⚡' },
    { title: 'セキュリティ', description: '業界最高水準のセキュリティで、大切なデータを保護します。', icon: '🔒' },
    { title: '24時間サポート', description: '専門チームが24時間体制でサポートいたします。', icon: '💬' },
  ],
}: ${name}Props) {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{subheading}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generatePricingComponent(name) {
    return `interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
}

interface ${name}Props {
  heading?: string;
  subheading?: string;
  plans?: PricingPlan[];
}

function ${name}({
  heading = "料金プラン",
  subheading = "あなたに最適なプランをお選びください",
  plans = [
    { name: 'スターター', price: '¥980', period: '/月', description: '個人利用に最適', features: ['基本機能', 'メールサポート', '1GB ストレージ'], featured: false },
    { name: 'プロ', price: '¥2,980', period: '/月', description: 'チーム利用に最適', features: ['全機能', '優先サポート', '10GB ストレージ', 'API アクセス'], featured: true },
    { name: 'エンタープライズ', price: 'お問合せ', period: '', description: '大規模組織向け', features: ['カスタム機能', '専任サポート', '無制限ストレージ', 'SLA保証'], featured: false },
  ],
}: ${name}Props) {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-lg text-muted-foreground">{subheading}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card key={index} className={\`\${plan.featured ? 'border-primary shadow-lg scale-105' : ''} transition-all\`}>
              <CardHeader className="text-center">
                {plan.featured && <Badge className="mb-2 mx-auto">人気</Badge>}
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-primary">✓</span>{feature}</li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.featured ? 'default' : 'outline'}>選択する</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generateTestimonialsComponent(name) {
    return `interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

interface ${name}Props {
  heading?: string;
  subheading?: string;
  testimonials?: TestimonialItem[];
}

function ${name}({
  heading = "お客様の声",
  subheading = "実際にご利用いただいているお客様からの声をご紹介します",
  testimonials = [
    { name: '田中 太郎', role: 'マーケティング部長', company: 'ABC株式会社', content: 'このサービスを導入してから、業務効率が大幅に改善しました。' },
    { name: '佐藤 花子', role: 'CEO', company: 'XYZ Inc.', content: '素晴らしいサポートと機能性。私たちのビジネスに欠かせないツールになりました。' },
    { name: '鈴木 一郎', role: 'エンジニア', company: 'テック株式会社', content: '直感的なUIと強力な機能が魅力です。導入してから3ヶ月で投資回収できました。' },
  ],
}: ${name}Props) {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-lg text-muted-foreground">{subheading}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  {testimonial.avatar ? (
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generateCtaComponent(name) {
    return `interface ${name}Props {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  secondaryCtaText?: string;
}

function ${name}({
  title = "今すぐ始めましょう",
  subtitle = "14日間の無料トライアルで、すべての機能をお試しいただけます。",
  ctaText = "無料で始める",
  secondaryCtaText = "お問い合わせ",
}: ${name}Props) {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl opacity-90 mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">{ctaText}</Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">{secondaryCtaText}</Button>
        </div>
      </div>
    </section>
  );
}`;
  }

  generateFaqComponent(name) {
    return `interface FaqEntry {
  question: string;
  answer: string;
}

interface ${name}Props {
  heading?: string;
  subheading?: string;
  faqs?: FaqEntry[];
}

function ${name}({
  heading = "よくある質問",
  subheading = "お客様からよくいただくご質問にお答えします",
  faqs = [
    { question: 'サービスの利用に必要なものは？', answer: 'インターネット接続環境とウェブブラウザがあれば、すぐにご利用いただけます。' },
    { question: '無料トライアル期間はありますか？', answer: 'はい、14日間の無料トライアルをご用意しています。' },
    { question: 'プランの変更はいつでもできますか？', answer: 'はい、いつでもプランの変更が可能です。' },
    { question: 'サポート対応時間は？', answer: 'プロプラン以上では24時間365日のサポートを提供しています。' },
  ],
}: ${name}Props) {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-lg text-muted-foreground">{subheading}</p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={\`item-\${index}\`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}`;
  }

  generateContactComponent(name) {
    return `interface ${name}Props {
  heading?: string;
  subheading?: string;
}

function ${name}({
  heading = "お問い合わせ",
  subheading = "ご質問やご相談がございましたら、お気軽にお問い合わせください",
}: ${name}Props) {
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert('お問い合わせを受け付けました（デモ）'); };
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-muted/50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-lg text-muted-foreground">{subheading}</p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label htmlFor="name">お名前</Label><Input id="name" placeholder="山田 太郎" required /></div>
                <div className="space-y-2"><Label htmlFor="email">メールアドレス</Label><Input id="email" type="email" placeholder="you@example.com" required /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="subject">件名</Label><Input id="subject" placeholder="お問い合わせ内容" required /></div>
              <div className="space-y-2"><Label htmlFor="message">メッセージ</Label><Textarea id="message" placeholder="詳細をご記入ください..." rows={5} required /></div>
              <Button type="submit" className="w-full">送信する</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}`;
  }

  generateNewsletterComponent(name) {
    return `interface ${name}Props {
  heading?: string;
  subheading?: string;
  buttonText?: string;
}

function ${name}({
  heading = "ニュースレターに登録",
  subheading = "最新情報やお得な情報をメールでお届けします",
  buttonText = "登録する",
}: ${name}Props) {
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); alert('ニュースレターに登録しました（デモ）'); };
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-primary/5">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
        <p className="text-lg text-muted-foreground mb-8">{subheading}</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Input type="email" placeholder="メールアドレスを入力" className="max-w-sm" required />
          <Button type="submit">{buttonText}</Button>
        </form>
      </div>
    </section>
  );
}`;
  }

  generateStatsComponent(name) {
    return `interface StatEntry {
  value: string;
  label: string;
}

interface ${name}Props {
  stats?: StatEntry[];
}

function ${name}({
  stats = [{ value: '10,000+', label: '利用企業数' }, { value: '99.9%', label: '稼働率' }, { value: '24/7', label: 'サポート対応' }, { value: '50+', label: '連携サービス' }],
}: ${name}Props) {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generateTeamComponent(name) {
    return `interface TeamMember {
  name: string;
  role: string;
  avatar?: string;
}

interface ${name}Props {
  heading?: string;
  subheading?: string;
  team?: TeamMember[];
}

function ${name}({
  heading = "チームメンバー",
  subheading = "私たちのサービスを支えるメンバーをご紹介します",
  team = [
    { name: '山田 太郎', role: 'CEO', avatar: '/api/placeholder/150/150' },
    { name: '佐藤 花子', role: 'CTO', avatar: '/api/placeholder/150/150' },
    { name: '鈴木 一郎', role: 'デザインリード', avatar: '/api/placeholder/150/150' },
    { name: '田中 美咲', role: 'マーケティング', avatar: '/api/placeholder/150/150' },
  ],
}: ${name}Props) {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{heading}</h2>
          <p className="text-lg text-muted-foreground">{subheading}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-muted-foreground">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generateGalleryComponent(name) {
    return `function ${name}() {
  const images = ['/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300', '/api/placeholder/400/300'];
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">ギャラリー</h2></div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
              <img src={src} alt={\`Gallery image \${index + 1}\`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generateLogoCloudComponent(name) {
    return `function ${name}() {
  const logos = [{ name: 'Company 1', src: '/api/placeholder/120/40' }, { name: 'Company 2', src: '/api/placeholder/120/40' }, { name: 'Company 3', src: '/api/placeholder/120/40' }, { name: 'Company 4', src: '/api/placeholder/120/40' }, { name: 'Company 5', src: '/api/placeholder/120/40' }];
  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-muted-foreground mb-8">多くの企業様にご利用いただいています</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <img key={index} src={logo.src} alt={logo.name} className="h-8 opacity-60 hover:opacity-100 transition-opacity" />
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generateGenericComponent(name, type) {
    return `function ${name}() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>${name} Section</CardTitle>
            <CardDescription>This is a placeholder for the ${type} section.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Add your content here.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}`;
  }

  // ==========================================
  // MUI (Material UI) Export Methods
  // ==========================================

  generateMUI() {
    const themeColors = this.getThemeColors();

    const sectionComponents = this.sections
      .map((section) => `        <${this.pascalCase(section.type)} />`)
      .join('\n');

    const imports = this.getMUIImports();

    return `/**
 * Generated by LP Generator - MUI (Material UI) React Component
 *
 * ============================================
 * 環境構築ガイド (Setup Guide)
 * ============================================
 *
 * 1. プロジェクト作成 (Create Project):
 *    npx create-next-app@latest my-landing-page --typescript
 *    cd my-landing-page
 *
 * 2. 依存関係インストール (Install Dependencies):
 *    npm install @mui/material @mui/icons-material @emotion/react @emotion/styled
 *
 * 3. フォントの設定 (Font Setup - app/layout.tsx):
 *    import { Inter } from 'next/font/google';
 *    const inter = Inter({ subsets: ['latin'] });
 *
 * 4. このファイルを配置 (Place this file):
 *    app/page.tsx または components/LandingPage.tsx
 *
 * 5. 開発サーバー起動 (Start Dev Server):
 *    npm run dev
 *
 * ============================================
 */

'use client';

import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
${imports}

const theme = createTheme({
  palette: {
    primary: { main: '${themeColors.primary}' },
    secondary: { main: '${themeColors.secondary}' },
  },
  typography: {
    fontFamily: '"Inter", "Noto Sans JP", sans-serif',
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
  },
  shape: { borderRadius: 12 },
});

export default function LandingPage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
${sectionComponents}
      </Box>
    </ThemeProvider>
  );
}

${this.generateMUISectionComponents()}
`;
  }

  getMUIImports() {
    const materialComponents = new Set(['Box', 'Container', 'Typography', 'Button', 'Grid']);
    const iconComponents = new Set();

    this.sections.forEach((section) => {
      if (
        section.type.includes('features') ||
        section.type.includes('pricing') ||
        section.type.includes('testimonial')
      ) {
        materialComponents.add('Card');
        materialComponents.add('CardContent');
      }
      if (section.type.includes('contact') || section.type.includes('newsletter')) {
        materialComponents.add('TextField');
        materialComponents.add('Paper');
      }
      if (section.type.includes('faq')) {
        materialComponents.add('Accordion');
        materialComponents.add('AccordionSummary');
        materialComponents.add('AccordionDetails');
        iconComponents.add('ExpandMore');
      }
      if (section.type.includes('pricing')) {
        materialComponents.add('Chip');
        materialComponents.add('List');
        materialComponents.add('ListItem');
        materialComponents.add('ListItemIcon');
        materialComponents.add('ListItemText');
        iconComponents.add('Check');
      }
      if (section.type.includes('stats')) {
        materialComponents.add('Paper');
      }
      if (section.type.includes('testimonial')) {
        materialComponents.add('Avatar');
      }
      if (section.type.includes('footer')) {
        materialComponents.add('Stack');
        materialComponents.add('Link');
        materialComponents.add('Divider');
        materialComponents.add('IconButton');
      }
    });

    const imports = [];
    const materialList = Array.from(materialComponents).sort();
    imports.push(`import { ${materialList.join(', ')} } from '@mui/material';`);

    if (iconComponents.size > 0) {
      const iconList = Array.from(iconComponents)
        .sort()
        .map((name) => `${name} as ${name}Icon`);
      imports.push(`import { ${iconList.join(', ')} } from '@mui/icons-material';`);
    }

    return imports.join('\n');
  }

  generateMUISectionComponents() {
    const components = [];
    const generatedTypes = new Set();

    this.sections.forEach((section) => {
      if (generatedTypes.has(section.type)) return;
      generatedTypes.add(section.type);
      components.push(this.generateMUIComponent(section));
    });

    return components.join('\n\n');
  }

  generateMUIComponent(section) {
    const name = this.pascalCase(section.type);
    const type = section.type;

    if (type.includes('hero')) return this.muiHero(name);
    if (type.includes('features')) return this.muiFeatures(name);
    if (type.includes('pricing')) return this.muiPricing(name);
    if (type.includes('testimonial')) return this.muiTestimonials(name);
    if (type.includes('cta')) return this.muiCta(name);
    if (type.includes('faq')) return this.muiFaq(name);
    if (type.includes('contact')) return this.muiContact(name);
    if (type.includes('newsletter')) return this.muiNewsletter(name);
    if (type.includes('stats')) return this.muiStats(name);
    if (type.includes('footer')) return this.muiFooter(name);
    return this.muiGeneric(name, type);
  }

  muiHero(name) {
    return `function ${name}() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: (t) => \`linear-gradient(135deg, \${t.palette.primary.main}, \${t.palette.secondary.main})\`, color: 'white', py: { xs: 8, md: 12 }, px: 2 }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 800 }}>
          <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, mb: 3 }}>あなたのビジネスを次のレベルへ</Typography>
          <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>革新的なソリューションで、ビジネスの成長を加速させましょう。</Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}>今すぐ始める</Button>
            <Button variant="outlined" size="large" sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>詳しく見る</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}`;
  }

  muiFeatures(name) {
    return `function ${name}() {
  const features = [
    { title: '高速パフォーマンス', description: '最新技術により、高速で安定したパフォーマンスを実現します。', icon: '⚡' },
    { title: 'セキュリティ', description: '業界最高水準のセキュリティで、大切なデータを保護します。', icon: '🔒' },
    { title: '24時間サポート', description: '専門チームが24時間体制でサポートいたします。', icon: '💬' },
  ];
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 2, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>主な機能</Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>最高の体験を提供するための機能をご紹介します</Typography>
        </Box>
        <Grid container spacing={4}>
          {features.map((f, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card elevation={0} sx={{ height: '100%', p: 3, border: '1px solid', borderColor: 'divider', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' }, transition: 'all 0.3s' }}>
                <CardContent>
                  <Typography sx={{ fontSize: '3rem', mb: 2 }}>{f.icon}</Typography>
                  <Typography variant="h6" sx={{ mb: 1.5, fontWeight: 600 }}>{f.title}</Typography>
                  <Typography variant="body2" color="text.secondary">{f.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}`;
  }

  muiPricing(name) {
    return `function ${name}() {
  const plans = [
    { name: 'スターター', price: '¥980', period: '/月', description: '個人利用に最適', features: ['基本機能', 'メールサポート', '1GB ストレージ'], featured: false },
    { name: 'プロ', price: '¥2,980', period: '/月', description: 'チーム利用に最適', features: ['全機能', '優先サポート', '10GB ストレージ', 'API アクセス'], featured: true },
    { name: 'エンタープライズ', price: 'お問合せ', period: '', description: '大規模組織向け', features: ['カスタム機能', '専用サポート', '無制限ストレージ'], featured: false },
  ];
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 2, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>料金プラン</Typography>
        </Box>
        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card elevation={plan.featured ? 8 : 1} sx={{ height: '100%', position: 'relative', border: plan.featured ? 2 : 0, borderColor: 'primary.main', transform: plan.featured ? 'scale(1.05)' : 'none' }}>
                {plan.featured && <Chip label="人気" color="primary" size="small" sx={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' }} />}
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h6" sx={{ mb: 1 }}>{plan.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{plan.description}</Typography>
                  <Box sx={{ mb: 3 }}><Typography variant="h3" component="span" sx={{ fontWeight: 700 }}>{plan.price}</Typography><Typography variant="body2" component="span" color="text.secondary">{plan.period}</Typography></Box>
                  <List dense>{plan.features.map((f, j) => <ListItem key={j} disableGutters><ListItemIcon sx={{ minWidth: 36 }}><CheckIcon color="primary" fontSize="small" /></ListItemIcon><ListItemText primary={f} /></ListItem>)}</List>
                  <Button variant={plan.featured ? 'contained' : 'outlined'} fullWidth sx={{ mt: 2 }}>選択する</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}`;
  }

  muiTestimonials(name) {
    return `function ${name}() {
  const testimonials = [
    { name: '田中 太郎', role: 'CEO', content: 'このサービスのおかげで、業務効率が劇的に向上しました。', avatar: 'T' },
    { name: '鈴木 花子', role: 'マーケティング部長', content: 'サポートが素晴らしく、困った時にすぐに対応してもらえます。', avatar: 'S' },
    { name: '山田 次郎', role: 'フリーランス', content: '直感的な操作性で、すぐに使いこなせました。', avatar: 'Y' },
  ];
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 2, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}><Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>お客様の声</Typography></Box>
        <Grid container spacing={4}>
          {testimonials.map((t, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Card elevation={2} sx={{ height: '100%', p: 3 }}>
                <CardContent>
                  <Typography sx={{ mb: 3, fontStyle: 'italic' }}>"{t.content}"</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>{t.avatar}</Avatar>
                    <Box><Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{t.name}</Typography><Typography variant="caption" color="text.secondary">{t.role}</Typography></Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}`;
  }

  muiCta(name) {
    return `function ${name}() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 2, background: (t) => \`linear-gradient(135deg, \${t.palette.primary.main}, \${t.palette.secondary.main})\`, color: 'white', textAlign: 'center' }}>
      <Container maxWidth="md">
        <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>今すぐ始めましょう</Typography>
        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>14日間の無料トライアルで、すべての機能をお試しいただけます</Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}>無料で始める</Button>
          <Button variant="outlined" size="large" sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>お問い合わせ</Button>
        </Box>
      </Container>
    </Box>
  );
}`;
  }

  muiFaq(name) {
    return `function ${name}() {
  const faqs = [
    { q: '無料トライアルは何日間ですか？', a: '14日間の無料トライアルをご用意しています。' },
    { q: 'いつでも解約できますか？', a: 'はい、いつでも解約可能です。' },
    { q: 'サポート体制について教えてください', a: 'メール、チャット、電話でのサポートを提供しています。' },
  ];
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 2, bgcolor: 'background.paper' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}><Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>よくある質問</Typography></Box>
        {faqs.map((f, i) => (
          <Accordion key={i} elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 1 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{f.q}</Typography></AccordionSummary>
            <AccordionDetails><Typography variant="body2" color="text.secondary">{f.a}</Typography></AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Box>
  );
}`;
  }

  muiContact(name) {
    return `function ${name}() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 2, bgcolor: 'grey.50' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', mb: 8 }}><Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}>お問い合わせ</Typography></Box>
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 } }}>
          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}><TextField fullWidth label="お名前" required /></Grid>
              <Grid item xs={12} md={6}><TextField fullWidth label="メールアドレス" type="email" required /></Grid>
            </Grid>
            <TextField fullWidth label="件名" required />
            <TextField fullWidth label="メッセージ" multiline rows={5} required />
            <Button variant="contained" size="large" type="submit" sx={{ alignSelf: 'center', px: 6 }}>送信する</Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}`;
  }

  muiNewsletter(name) {
    return `function ${name}() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: 2, bgcolor: 'primary.main', color: 'white' }}>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ mb: 2 }}>ニュースレターに登録</Typography>
          <Typography sx={{ mb: 4, opacity: 0.9 }}>最新情報やお得な情報をお届けします</Typography>
          <Box component="form" sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap', maxWidth: 500, mx: 'auto' }}>
            <TextField placeholder="メールアドレス" size="small" sx={{ flex: 1, minWidth: 250, bgcolor: 'white', borderRadius: 1 }} />
            <Button variant="contained" sx={{ bgcolor: 'secondary.main', '&:hover': { bgcolor: 'secondary.dark' } }}>登録</Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}`;
  }

  muiStats(name) {
    return `function ${name}() {
  const stats = [{ value: '10K+', label: 'アクティブユーザー' }, { value: '99.9%', label: '稼働率' }, { value: '24/7', label: 'サポート対応' }, { value: '50+', label: '導入企業' }];
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, px: 2, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {stats.map((s, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Paper elevation={0} sx={{ p: 3, textAlign: 'center', bgcolor: 'grey.50', borderRadius: 2 }}>
                <Typography variant="h3" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>{s.value}</Typography>
                <Typography variant="body2" color="text.secondary">{s.label}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}`;
  }

  muiFooter(name) {
    return `function ${name}() {
  const links = [{ title: '製品', items: ['機能', '料金', '導入事例'] }, { title: '会社情報', items: ['会社概要', 'ブログ', '採用情報'] }, { title: 'サポート', items: ['ヘルプセンター', 'API ドキュメント', 'ステータス'] }];
  return (
    <Box sx={{ bgcolor: 'grey.900', color: 'white', py: { xs: 6, md: 8 }, px: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>LP Generator</Typography>
            <Typography variant="body2" sx={{ color: 'grey.400', mb: 3 }}>美しいランディングページを簡単に作成できるサービスです。</Typography>
            <Stack direction="row" spacing={1}>{['T', 'F', 'L'].map((s) => <IconButton key={s} size="small" sx={{ color: 'grey.400', '&:hover': { color: 'white' } }}><Typography variant="caption">{s}</Typography></IconButton>)}</Stack>
          </Grid>
          {links.map((section, i) => (
            <Grid item xs={6} md={2} key={i}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>{section.title}</Typography>
              <Stack spacing={1}>{section.items.map((link, j) => <Link key={j} href="#" underline="hover" sx={{ color: 'grey.400', fontSize: '0.875rem', '&:hover': { color: 'white' } }}>{link}</Link>)}</Stack>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />
        <Typography variant="body2" sx={{ color: 'grey.500', textAlign: 'center' }}>© {new Date().getFullYear()} LP Generator. All rights reserved.</Typography>
      </Container>
    </Box>
  );
}`;
  }

  muiGeneric(name, type) {
    return `function ${name}() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, px: 2, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Card elevation={1}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>${name} Section</Typography>
            <Typography variant="body2" color="text.secondary">Placeholder for ${type} section. Customize as needed.</Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}`;
  }

  // ==========================================
  // CSS LOADING
  // ==========================================

  async getInlineCSS() {
    try {
      const [landingPageCSS, advancedComponentsCSS] = await Promise.all([
        fetch('css/landing-page.css').then((r) => r.text()),
        fetch('css/advanced-components.css').then((r) => r.text()),
      ]);
      return `/* Landing Page Styles */\n${landingPageCSS}\n\n/* Advanced Components */\n${advancedComponentsCSS}`;
    } catch (error) {
      console.error('CSSの読み込みに失敗しました:', error);
      this.showNotification('CSSファイルの読み込みに失敗しました', 'error');
      return '/* CSS loading failed - please include css/landing-page.css and css/advanced-components.css manually */';
    }
  }

  // ==========================================
  // CLEAR ALL
  // ==========================================

  clearAll() {
    if (this.sections.length === 0) {
      this.showNotification('クリアするセクションがありません', 'info');
      return;
    }

    if (confirm('すべてのセクションを削除してもよろしいですか？')) {
      this.sections = [];
      this.updatePreview();
      this.showNotification('すべてのセクションをクリアしました');
    }
  }

  generateId() {
    return CommonEditor.generateId('section');
  }

  // ==========================================
  // LOCAL STORAGE / PROJECT MANAGEMENT
  // ==========================================

  saveProject() {
    if (this.sections.length === 0) {
      this.showNotification('保存するセクションがありません', 'error');
      return;
    }

    const projectName = prompt(
      'プロジェクト名を入力してください:',
      `LP-${new Date().toLocaleDateString('ja-JP')}`
    );

    if (!projectName) return;

    const sanitizedName = CommonEditor.sanitizeHTML(projectName);

    const projectData = {
      id: CommonEditor.generateId('project'),
      name: sanitizedName,
      timestamp: Date.now(),
      data: {
        theme: this.currentTheme,
        sections: this.sections,
        animations: this.animations,
        glassmorphism: this.glassmorphism,
        deviceMode: this.deviceMode,
      },
    };

    const projects = this.getAllProjects();
    projects.push(projectData);

    CommonEditor.saveToStorage('lp-generator-projects', projects);

    this.showNotification(`プロジェクト「${sanitizedName}」を保存しました`);
    this.renderProjectsList();
  }

  toggleProjectsList() {
    const list = document.getElementById('savedProjectsList');
    if (list.classList.contains('active')) {
      list.classList.remove('active');
    } else {
      list.classList.add('active');
      this.renderProjectsList();
    }
  }

  getAllProjects() {
    return CommonEditor.loadFromStorage('lp-generator-projects', []);
  }

  renderProjectsList() {
    const projects = this.getAllProjects();
    const list = document.getElementById('savedProjectsList');

    if (!list) return;

    if (projects.length === 0) {
      list.innerHTML =
        '<p style="text-align: center; color: #94a3b8; font-size: 0.85rem; padding: 1rem;">保存されたプロジェクトはありません</p>';
      return;
    }

    projects.sort((a, b) => b.timestamp - a.timestamp);

    list.innerHTML = projects
      .map((project) => {
        const date = new Date(project.timestamp);
        const dateStr = date.toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        const timeStr = date.toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' });
        const sectionCount = project.data.sections.length;
        const safeName = CommonEditor.sanitizeHTML(project.name);
        const safeId = CommonEditor.sanitizeAttribute(project.id);

        return `
                <div class="saved-project-item" data-project-id="${safeId}">
                    <div class="project-info" onclick="window.lpGenerator.loadProjectById('${safeId}')">
                        <div class="project-name">${safeName}</div>
                        <div class="project-meta">${dateStr} ${timeStr} · ${sectionCount}セクション</div>
                    </div>
                    <div class="project-actions">
                        <button class="project-action-btn" onclick="window.lpGenerator.loadProjectById('${safeId}')" title="読み込む">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/>
                            </svg>
                        </button>
                        <button class="project-action-btn delete" onclick="window.lpGenerator.deleteProject('${safeId}')" title="削除">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
      })
      .join('');
  }

  loadProjectById(projectId) {
    const projects = this.getAllProjects();
    const project = projects.find((p) => p.id === projectId);

    if (!project) {
      this.showNotification('プロジェクトが見つかりません', 'error');
      return;
    }

    if (this.sections.length > 0) {
      if (!confirm('現在の内容を破棄して読み込みますか？')) {
        return;
      }
    }

    this.currentTheme = project.data.theme;
    this.sections = project.data.sections;
    this.animations = project.data.animations !== undefined ? project.data.animations : true;
    this.glassmorphism = project.data.glassmorphism || false;
    this.deviceMode = project.data.deviceMode || 'desktop';

    document.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.theme === this.currentTheme);
    });

    document.getElementById('animationsToggle').checked = this.animations;
    document.getElementById('glassmorphismToggle').checked = this.glassmorphism;

    this.updatePreview();
    this.showNotification(`プロジェクト「${project.name}」を読み込みました`);

    document.getElementById('savedProjectsList').classList.remove('active');
  }

  deleteProject(projectId) {
    if (!confirm('このプロジェクトを削除してもよろしいですか？')) {
      return;
    }

    let projects = this.getAllProjects();
    projects = projects.filter((p) => p.id !== projectId);

    CommonEditor.saveToStorage('lp-generator-projects', projects);

    this.showNotification('プロジェクトを削除しました');
    this.renderProjectsList();
  }

  // ==========================================
  // AUTO SAVE
  // ==========================================

  startAutoSave() {
    this.stopAutoSave();

    this.autoSaveInterval = setInterval(() => {
      if (this.sections.length > 0) {
        this.autoSave();
      }
    }, LandingPageGenerator.CONFIG.AUTOSAVE_INTERVAL);
  }

  stopAutoSave() {
    if (this.autoSaveInterval) {
      clearInterval(this.autoSaveInterval);
      this.autoSaveInterval = null;
    }
  }

  autoSave() {
    const autoSaveData = {
      theme: this.currentTheme,
      sections: this.sections,
      animations: this.animations,
      glassmorphism: this.glassmorphism,
      deviceMode: this.deviceMode,
      timestamp: Date.now(),
    };

    CommonEditor.saveToStorage('lp-generator-autosave', autoSaveData);
  }

  loadAutoSave() {
    const autoSaveData = CommonEditor.loadFromStorage('lp-generator-autosave');
    if (!autoSaveData) return false;

    const hoursSinceAutoSave =
      (Date.now() - autoSaveData.timestamp) / (1000 * 60 * 60);
    if (hoursSinceAutoSave > LandingPageGenerator.CONFIG.AUTOSAVE_RETENTION_HOURS) return false;

    if (confirm('前回の作業内容が見つかりました。復元しますか？')) {
      this.currentTheme = autoSaveData.theme;
      this.sections = autoSaveData.sections;
      this.animations = autoSaveData.animations;
      this.glassmorphism = autoSaveData.glassmorphism;
      this.deviceMode = autoSaveData.deviceMode;

      document.querySelectorAll('.theme-btn').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.theme === this.currentTheme);
      });

      document.getElementById('animationsToggle').checked = this.animations;
      document.getElementById('glassmorphismToggle').checked = this.glassmorphism;

      this.updatePreview();
      this.showNotification('前回の作業内容を復元しました');
      return true;
    }

    return false;
  }

  // ==========================================
  // JSON EXPORT/IMPORT
  // ==========================================

  exportProjectAsJSON() {
    if (this.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    const projectData = {
      version: '1.0',
      type: 'lp-generator-project',
      exportedAt: new Date().toISOString(),
      data: {
        theme: this.currentTheme,
        sections: this.sections.map((section) => ({
          type: section.type,
          id: section.id,
          customContent: section.customContent || null,
          template: {
            name: section.template.name,
            html: section.template.html,
          },
        })),
        animations: this.animations,
        glassmorphism: this.glassmorphism,
      },
    };

    const jsonString = JSON.stringify(projectData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lp-project-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    this.showNotification('プロジェクトをJSONファイルでエクスポートしました');
  }

  importProjectFromJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';

    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const projectData = JSON.parse(event.target.result);

          // バリデーション強化
          if (!projectData || projectData.type !== 'lp-generator-project') {
            throw new Error('無効なプロジェクトファイル形式です');
          }

          if (!projectData.data || !Array.isArray(projectData.data.sections)) {
            throw new Error('プロジェクトデータにセクション情報がありません');
          }

          this.currentTheme = projectData.data.theme || LandingPageGenerator.CONFIG.DEFAULT_THEME;
          this.animations =
            projectData.data.animations !== undefined ? projectData.data.animations : true;
          this.glassmorphism = projectData.data.glassmorphism || false;

          this.sections = projectData.data.sections.map((section) => {
            if (!section.type) {
              console.warn('セクションにtypeがありません、スキップします');
              return null;
            }
            const originalTemplate = sectionTemplates[section.type];
            if (!originalTemplate && !section.template) {
              console.warn(`テンプレート "${section.type}" が見つかりません`);
            }
            return {
              type: section.type,
              id: section.id || CommonEditor.generateId('section'),
              customContent: section.customContent,
              template: originalTemplate || section.template,
            };
          }).filter(Boolean);

          document.querySelectorAll('.theme-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.theme === this.currentTheme);
          });
          document.getElementById('animationsToggle').checked = this.animations;
          document.getElementById('glassmorphismToggle').checked = this.glassmorphism;

          this.saveState();
          this.updatePreview();
          this.showNotification('プロジェクトをインポートしました');
        } catch (error) {
          console.error('インポートエラー:', error);
          this.showNotification(
            error.message || 'ファイルの読み込みに失敗しました',
            'error'
          );
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }

  // ==========================================
  // INLINE EDITING (CommonEditor に委譲)
  // ==========================================

  setupInlineEditing() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) return;

    // CommonEditor がロード済みならそれを使用
    if (typeof CommonEditor !== 'undefined') {
      this.commonEditor = new CommonEditor({
        previewSelector: '#previewFrame',
        sectionWrapperClass: 'lp-section-wrapper',
        controlsClass: 'lp-section-controls',
        cssPrefix: 'lp',
        onContentChange: (element, oldContent, newContent) => {
          const wrapper = element.closest('.lp-section-wrapper');
          if (wrapper) {
            const sectionId = wrapper.dataset.sectionId;
            this.saveContentChange(sectionId, element, oldContent);
          }
        },
        onSaveState: () => this.saveState(),
        notificationFn: (msg, type) => this.showNotification(msg, type),
      });

      this.commonEditor.setupInlineEditing(previewFrame);
    } else {
      // フォールバック: 直接実装
      previewFrame.addEventListener('dblclick', (e) => {
        const editableSelectors =
          'h1, h2, h3, h4, h5, h6, p, span:not(.lp-control-btn span), a, button:not(.lp-control-btn), li, label';
        const target = e.target.closest(editableSelectors);

        if (target && !target.closest('.lp-section-controls')) {
          e.preventDefault();
          e.stopPropagation();
          this.makeElementEditable(target);
        }
      });
    }
  }

  makeElementEditable(element) {
    if (element.contentEditable === 'true') return;

    const originalContent = element.innerHTML;
    element.contentEditable = 'true';
    element.style.outline = '2px solid #3b82f6';
    element.style.outlineOffset = '2px';
    element.style.background = 'rgba(59, 130, 246, 0.05)';
    element.focus();

    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    const finishEditing = () => {
      element.contentEditable = 'false';
      element.style.outline = '';
      element.style.outlineOffset = '';
      element.style.background = '';

      const wrapper = element.closest('.lp-section-wrapper');
      if (wrapper) {
        const sectionId = wrapper.dataset.sectionId;
        this.saveContentChange(sectionId, element, originalContent);
      }
    };

    element.addEventListener('blur', finishEditing, { once: true });
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
      if (e.key === 'Escape') {
        element.innerHTML = originalContent;
        element.blur();
      }
    });
  }

  saveContentChange(sectionId, element, originalContent) {
    const section = this.sections.find((s) => s.id === sectionId);
    if (!section) return;

    const newContent = element.innerHTML;
    if (newContent !== originalContent) {
      if (!section.customContent) {
        section.customContent = {};
      }

      const elementPath = this.getElementPath(element);
      section.customContent[elementPath] = newContent;

      this.saveState();
      this.autoSave();
    }
  }

  getElementPath(element) {
    const parts = [];
    let current = element;
    const wrapper = element.closest('.lp-section-wrapper');

    while (current && current !== wrapper) {
      const tag = current.tagName.toLowerCase();
      const siblings = Array.from(current.parentNode?.children || []).filter(
        (el) => el.tagName === current.tagName
      );
      const index = siblings.indexOf(current);
      parts.unshift(`${tag}[${index}]`);
      current = current.parentNode;
    }

    return parts.join(' > ');
  }

  // ==========================================
  // NOTIFICATION
  // ==========================================

  showNotification(message, type = 'success') {
    const existing = document.querySelector('.lp-notification');
    if (existing) {
      existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `lp-notification lp-notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
            animation: slideInRight 0.3s ease-out;
        `;

    document.body.appendChild(notification);

    const fadeMs = LandingPageGenerator.CONFIG.NOTIFICATION_FADE_MS;
    setTimeout(() => {
      notification.style.animation = `slideOutRight ${fadeMs}ms ease-out`;
      setTimeout(() => notification.remove(), fadeMs);
    }, CommonEditor.CONFIG.NOTIFICATION_DURATION);
  }

  // ==========================================
  // SECTION PREVIEW TOOLTIP
  // ==========================================

  createSectionPreviewTooltip() {
    if (document.getElementById('sectionPreviewTooltip')) return;

    const tooltip = document.createElement('div');
    tooltip.id = 'sectionPreviewTooltip';
    tooltip.className = 'section-preview-tooltip';
    tooltip.innerHTML = `
      <div class="preview-tooltip-header"></div>
      <div class="preview-tooltip-content">
        <div class="preview-scale"></div>
      </div>
    `;
    document.body.appendChild(tooltip);
    this.sectionPreviewTooltip = tooltip;
  }

  showSectionPreview(e) {
    const btn = e.currentTarget;
    const componentType = btn.dataset.component;

    if (!sectionTemplates[componentType]) return;
    const template = sectionTemplates[componentType];

    if (!template || !this.sectionPreviewTooltip) return;

    const header = this.sectionPreviewTooltip.querySelector('.preview-tooltip-header');
    const content = this.sectionPreviewTooltip.querySelector('.preview-scale');

    header.textContent = template.name;

    const previewHTML = `
      <div style="background: white; padding: 10px; border-radius: 8px; font-family: 'Inter', sans-serif;">
        ${template.html}
      </div>
    `;
    content.innerHTML = previewHTML;

    const rect = btn.getBoundingClientRect();
    const sidebar = document.querySelector('.sidebar');
    const sidebarRight = sidebar ? sidebar.getBoundingClientRect().right : 320;

    this.sectionPreviewTooltip.style.left = `${sidebarRight + 12}px`;
    this.sectionPreviewTooltip.style.top = `${Math.max(80, rect.top - 40)}px`;

    const maxTop = window.innerHeight - 320;
    if (parseInt(this.sectionPreviewTooltip.style.top) > maxTop) {
      this.sectionPreviewTooltip.style.top = `${maxTop}px`;
    }

    this.sectionPreviewTooltip.classList.add('visible');
  }

  hideSectionPreview() {
    if (this.sectionPreviewTooltip) {
      this.sectionPreviewTooltip.classList.remove('visible');
    }
  }

  // ==========================================
  // ENHANCED GENERATOR 統合: Advanced Export
  // ==========================================

  setupAdvancedExport() {
    const exportSection = document.querySelector('.action-buttons');
    if (!exportSection) return;

    const exportDropdown = document.createElement('div');
    exportDropdown.className = 'export-dropdown';
    exportDropdown.innerHTML = `
            <button class="action-btn secondary export-toggle" id="exportOptions">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                エクスポート形式
            </button>
            <div class="export-menu" id="exportMenu" style="display: none;">
                <button class="export-option" data-format="html">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                    HTML
                </button>
                <button class="export-option" data-format="react">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.9"/></svg>
                    React Component
                </button>
                <button class="export-option" data-format="vue">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                    Vue Component
                </button>
                <button class="export-option" data-format="json">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
                    JSON Config
                </button>
            </div>
        `;

    exportSection.insertBefore(exportDropdown, exportSection.firstChild);

    document.getElementById('exportOptions')?.addEventListener('click', () => {
      const menu = document.getElementById('exportMenu');
      if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      }
    });

    document.querySelectorAll('.export-option').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const format = e.currentTarget.dataset.format;
        this.exportAs(format);
        document.getElementById('exportMenu').style.display = 'none';
      });
    });

    this.addExportStyles();
  }

  addExportStyles() {
    const style = document.createElement('style');
    style.textContent = `
            .export-dropdown { position: relative; }
            .export-menu {
                position: absolute; top: 100%; left: 0; right: 0;
                background: white; border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                margin-top: 8px; overflow: hidden; z-index: 1000;
            }
            .export-option {
                width: 100%; padding: 12px 16px; border: none;
                background: white; text-align: left;
                font-family: var(--font-primary, 'Inter', sans-serif);
                font-size: 0.95rem; font-weight: 600; cursor: pointer;
                transition: all 0.2s ease; display: flex;
                align-items: center; gap: 8px; color: #2d3748;
            }
            .export-option:hover {
                background: #f7fafc;
                color: var(--primary-color, #667eea);
            }
        `;
    document.head.appendChild(style);
  }

  exportAs(format) {
    switch (format) {
      case 'html':
        this.exportHTML();
        break;
      case 'react':
        this.exportReact();
        break;
      case 'vue':
        this.exportVue();
        break;
      case 'json':
        this.exportEnhancedJSON();
        break;
    }
  }

  exportReact() {
    if (this.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    const themeColors = this.getThemeColors();
    const sectionComponents = [];
    const sectionUsages = [];
    const generatedTypes = new Set();

    this.sections.forEach((section) => {
      const componentName = this.pascalCase(section.type);
      sectionUsages.push(`      <${componentName} />`);

      if (generatedTypes.has(section.type)) return;
      generatedTypes.add(section.type);

      const componentCode = this.generateReactSectionComponent(section);
      sectionComponents.push(componentCode);
    });

    const componentCode = `/**
 * LP Generator - React (TypeScript) コンポーネント
 *
 * ============================================
 * 環境構築ガイド (Setup Guide)
 * ============================================
 *
 * 1. プロジェクト作成:
 *    npx create-vite@latest my-landing-page -- --template react-ts
 *    cd my-landing-page
 *
 * 2. Tailwind CSS インストール:
 *    npm install -D tailwindcss @tailwindcss/vite
 *
 * 3. vite.config.ts に追加:
 *    import tailwindcss from '@tailwindcss/vite'
 *    plugins: [react(), tailwindcss()]
 *
 * 4. src/index.css に追加:
 *    @import "tailwindcss";
 *
 * 5. tailwind.config.ts でカスタムカラーを設定:
 *    colors: {
 *      primary: '${themeColors.primary}',
 *      secondary: '${themeColors.secondary}',
 *    }
 *
 * 6. このファイルを src/components/LandingPage.tsx に配置
 *
 * 7. 開発サーバー起動:
 *    npm run dev
 *
 * ============================================
 */

import React from 'react';

// ==========================================
// メインコンポーネント
// ==========================================

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
${sectionUsages.join('\n')}
    </div>
  );
}

// ==========================================
// セクションコンポーネント
// ==========================================

${sectionComponents.join('\n\n')}
`;

    this.downloadFile(componentCode, 'LandingPage.tsx', 'text/plain');
    this.showNotification('Reactコンポーネントをエクスポートしました');
  }

  generateReactSectionComponent(section) {
    const name = this.pascalCase(section.type);
    const type = section.type;

    if (type.includes('hero')) return this.reactHero(name);
    if (type.includes('features')) return this.reactFeatures(name);
    if (type.includes('pricing')) return this.reactPricing(name);
    if (type.includes('testimonial') || type.includes('carousel')) return this.reactTestimonials(name);
    if (type.includes('cta')) return this.reactCta(name);
    if (type.includes('faq') || type.includes('accordion')) return this.reactFaq(name);
    if (type.includes('contact')) return this.reactContact(name);
    if (type.includes('newsletter')) return this.reactNewsletter(name);
    if (type.includes('stats') || type.includes('metrics')) return this.reactStats(name);
    if (type.includes('footer')) return this.reactFooter(name);
    return this.reactGeneric(name, type);
  }

  reactHero(name) {
    return `interface ${name}Props {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

function ${name}({
  title = "ビジネスを次のレベルへ",
  subtitle = "革新的なソリューションで、ビジネスの成長を加速させましょう。今すぐ始めて、未来を切り開いてください。",
  ctaText = "今すぐ始める",
  ctaLink = "#",
  secondaryCtaText = "詳しく見る",
  secondaryCtaLink = "#",
}: ${name}Props) {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{title}</h1>
          <p className="mt-6 text-xl md:text-2xl opacity-90">{subtitle}</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a href={ctaLink} className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              {ctaText}
            </a>
            <a href={secondaryCtaLink} className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
              {secondaryCtaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}`;
  }

  reactFeatures(name) {
    return `interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface ${name}Props {
  heading?: string;
  subheading?: string;
  features?: Feature[];
}

function ${name}({
  heading = "主な機能",
  subheading = "最高の体験を提供するための機能をご紹介します",
  features = [
    { title: '高速パフォーマンス', description: '最新技術により、高速で安定したパフォーマンスを実現します。', icon: '⚡' },
    { title: 'セキュリティ', description: '業界最高水準のセキュリティで、大切なデータを保護します。', icon: '🔒' },
    { title: '24時間サポート', description: '専門チームが24時間体制でサポートいたします。', icon: '💬' },
  ],
}: ${name}Props) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subheading}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  reactPricing(name) {
    return `interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
}

interface ${name}Props {
  heading?: string;
  subheading?: string;
  plans?: PricingPlan[];
}

function ${name}({
  heading = "料金プラン",
  subheading = "あなたに最適なプランをお選びください",
  plans = [
    { name: 'スターター', price: '¥980', period: '/月', description: '個人利用に最適', features: ['基本機能', 'メールサポート', '1GB ストレージ'], featured: false },
    { name: 'プロ', price: '¥2,980', period: '/月', description: 'チーム利用に最適', features: ['全機能', '優先サポート', '10GB ストレージ', 'API アクセス'], featured: true },
    { name: 'エンタープライズ', price: 'お問合せ', period: '', description: '大規模組織向け', features: ['カスタム機能', '専任サポート', '無制限ストレージ', 'SLA保証'], featured: false },
  ],
}: ${name}Props) {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h2>
          <p className="mt-4 text-lg text-gray-600">{subheading}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) => (
            <div key={index} className={\`bg-white rounded-2xl p-8 shadow-lg border \${plan.featured ? 'border-primary ring-2 ring-primary scale-105' : 'border-gray-200'} relative\`}>
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">人気</span>
              )}
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-600">
                    <span className="text-primary">✓</span>{feature}
                  </li>
                ))}
              </ul>
              <button className={\`w-full py-3 rounded-lg font-semibold transition-colors \${plan.featured ? 'bg-primary text-white hover:bg-primary/90' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}\`}>
                選択する
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  reactTestimonials(name) {
    return `interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
}

interface ${name}Props {
  heading?: string;
  subheading?: string;
  testimonials?: Testimonial[];
}

function ${name}({
  heading = "お客様の声",
  subheading = "実際にご利用いただいているお客様からの声をご紹介します",
  testimonials = [
    { name: '田中 太郎', role: 'マーケティング部長', company: 'ABC株式会社', content: 'このサービスを導入してから、業務効率が大幅に改善しました。' },
    { name: '佐藤 花子', role: 'CEO', company: 'XYZ Inc.', content: '素晴らしいサポートと機能性。私たちのビジネスに欠かせないツールになりました。' },
    { name: '鈴木 一郎', role: 'エンジニア', company: 'テック株式会社', content: '直感的なUIと強力な機能が魅力です。導入してから3ヶ月で投資回収できました。' },
  ],
}: ${name}Props) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{subheading}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <p className="text-gray-700 mb-4 italic">"{t.content}"</p>
              <div className="flex items-center gap-4">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                    {t.name.charAt(0)}
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  reactCta(name) {
    return `interface ${name}Props {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
}

function ${name}({
  title = "今すぐ始めましょう",
  subtitle = "14日間の無料トライアルで、すべての機能をお試しいただけます。",
  ctaText = "無料で始める",
  ctaLink = "#",
  secondaryCtaText = "お問い合わせ",
}: ${name}Props) {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{title}</h2>
        <p className="text-xl opacity-90 mb-8">{subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href={ctaLink} className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            {ctaText}
          </a>
          <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
            {secondaryCtaText}
          </button>
        </div>
      </div>
    </section>
  );
}`;
  }

  reactFaq(name) {
    return `interface FaqItem {
  question: string;
  answer: string;
}

interface ${name}Props {
  heading?: string;
  subheading?: string;
  faqs?: FaqItem[];
}

function ${name}({
  heading = "よくある質問",
  subheading = "お客様からよくいただくご質問にお答えします",
  faqs = [
    { question: 'サービスの利用に必要なものは？', answer: 'インターネット接続環境とウェブブラウザがあれば、すぐにご利用いただけます。' },
    { question: '無料トライアル期間はありますか？', answer: 'はい、14日間の無料トライアルをご用意しています。' },
    { question: 'プランの変更はいつでもできますか？', answer: 'はい、いつでもプランの変更が可能です。' },
    { question: 'サポート対応時間は？', answer: 'プロプラン以上では24時間365日のサポートを提供しています。' },
  ],
}: ${name}Props) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h2>
          <p className="mt-4 text-lg text-gray-600">{subheading}</p>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                {faq.question}
                <span className={\`transform transition-transform \${openIndex === index ? 'rotate-180' : ''}\`}>▼</span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 text-gray-600 border-t border-gray-100">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  reactContact(name) {
    return `interface ${name}Props {
  heading?: string;
  subheading?: string;
}

function ${name}({
  heading = "お問い合わせ",
  subheading = "ご質問やご相談がございましたら、お気軽にお問い合わせください",
}: ${name}Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('お問い合わせを受け付けました（デモ）');
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h2>
          <p className="mt-4 text-lg text-gray-600">{subheading}</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">お名前</label>
              <input id="name" type="text" placeholder="山田 太郎" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
              <input id="email" type="email" placeholder="you@example.com" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">件名</label>
            <input id="subject" type="text" placeholder="お問い合わせ内容" required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">メッセージ</label>
            <textarea id="message" rows={5} placeholder="詳細をご記入ください..." required className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none" />
          </div>
          <button type="submit" className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">送信する</button>
        </form>
      </div>
    </section>
  );
}`;
  }

  reactNewsletter(name) {
    return `interface ${name}Props {
  heading?: string;
  subheading?: string;
  buttonText?: string;
}

function ${name}({
  heading = "ニュースレターに登録",
  subheading = "最新情報やお得な情報をメールでお届けします",
  buttonText = "登録する",
}: ${name}Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ニュースレターに登録しました（デモ）');
  };

  return (
    <section className="py-16 md:py-24 bg-primary/5">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{heading}</h2>
        <p className="mt-4 text-lg text-gray-600 mb-8">{subheading}</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <input type="email" placeholder="メールアドレスを入力" required className="max-w-sm flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" />
          <button type="submit" className="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">{buttonText}</button>
        </form>
      </div>
    </section>
  );
}`;
  }

  reactStats(name) {
    return `interface StatItem {
  value: string;
  label: string;
}

interface ${name}Props {
  stats?: StatItem[];
}

function ${name}({
  stats = [
    { value: '10,000+', label: '利用企業数' },
    { value: '99.9%', label: '稼働率' },
    { value: '24/7', label: 'サポート対応' },
    { value: '50+', label: '連携サービス' },
  ],
}: ${name}Props) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  reactFooter(name) {
    return `interface FooterLink {
  title: string;
  items: { label: string; href: string }[];
}

interface ${name}Props {
  companyName?: string;
  description?: string;
  links?: FooterLink[];
}

function ${name}({
  companyName = "LP Generator",
  description = "美しいランディングページを簡単に作成できるサービスです。",
  links = [
    { title: '製品', items: [{ label: '機能', href: '#' }, { label: '料金', href: '#' }, { label: '導入事例', href: '#' }] },
    { title: '会社情報', items: [{ label: '会社概要', href: '#' }, { label: 'ブログ', href: '#' }, { label: '採用情報', href: '#' }] },
    { title: 'サポート', items: [{ label: 'ヘルプセンター', href: '#' }, { label: 'API ドキュメント', href: '#' }, { label: 'お問い合わせ', href: '#' }] },
  ],
}: ${name}Props) {
  return (
    <footer className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">{companyName}</h3>
            <p className="text-gray-400 mb-6">{description}</p>
          </div>
          {links.map((section, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.items.map((link, j) => (
                  <li key={j}><a href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.label}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} {companyName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}`;
  }

  reactGeneric(name, type) {
    return `interface ${name}Props {
  title?: string;
  description?: string;
}

function ${name}({
  title = "${name}",
  description = "${type} セクションの内容をここに追加してください。",
}: ${name}Props) {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h2>
          <p className="mt-4 text-lg text-gray-600">{description}</p>
        </div>
      </div>
    </section>
  );
}`;
  }

  exportVue() {
    if (this.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    const themeColors = this.getThemeColors();
    const sectionComponents = [];
    const sectionUsages = [];
    const componentImports = [];
    const generatedTypes = new Set();

    this.sections.forEach((section) => {
      const componentName = this.pascalCase(section.type);
      sectionUsages.push(`      <${componentName} />`);

      if (generatedTypes.has(section.type)) return;
      generatedTypes.add(section.type);

      componentImports.push(componentName);
      const componentCode = this.generateVueSectionComponent(section);
      sectionComponents.push(componentCode);
    });

    const componentCode = `<!--
  LP Generator - Vue 3 (Composition API) コンポーネント

  ============================================
  環境構築ガイド (Setup Guide)
  ============================================

  1. プロジェクト作成:
     npm create vue@latest my-landing-page
     cd my-landing-page

  2. Tailwind CSS インストール:
     npm install -D tailwindcss @tailwindcss/vite

  3. vite.config.ts に追加:
     import tailwindcss from '@tailwindcss/vite'
     plugins: [vue(), tailwindcss()]

  4. src/assets/main.css に追加:
     @import "tailwindcss";

  5. tailwind.config.ts でカスタムカラーを設定:
     colors: {
       primary: '${themeColors.primary}',
       secondary: '${themeColors.secondary}',
     }

  6. このファイルを src/components/LandingPage.vue に配置
     各セクションコンポーネントは src/components/sections/ に配置

  7. 開発サーバー起動:
     npm run dev

  ============================================
-->

<script setup lang="ts">
// セクションコンポーネントのインポート
// 各コンポーネントを個別ファイルに分割する場合:
// ${componentImports.map(name => `import ${name} from './sections/${name}.vue';`).join('\n// ')}
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900 font-sans antialiased">
${sectionUsages.join('\n')}
  </div>
</template>

<!--
==========================================
セクションコンポーネント（個別ファイルに分割推奨）
==========================================
以下は各セクションの実装例です。
実運用時は各コンポーネントを個別の .vue ファイルに分割してください。
-->

${sectionComponents.join('\n\n')}
`;

    this.downloadFile(componentCode, 'LandingPage.vue', 'text/plain');
    this.showNotification('Vueコンポーネントをエクスポートしました');
  }

  generateVueSectionComponent(section) {
    const name = this.pascalCase(section.type);
    const type = section.type;

    if (type.includes('hero')) return this.vueHero(name);
    if (type.includes('features')) return this.vueFeatures(name);
    if (type.includes('pricing')) return this.vuePricing(name);
    if (type.includes('testimonial') || type.includes('carousel')) return this.vueTestimonials(name);
    if (type.includes('cta')) return this.vueCta(name);
    if (type.includes('faq') || type.includes('accordion')) return this.vueFaq(name);
    if (type.includes('contact')) return this.vueContact(name);
    if (type.includes('newsletter')) return this.vueNewsletter(name);
    if (type.includes('stats') || type.includes('metrics')) return this.vueStats(name);
    if (type.includes('footer')) return this.vueFooter(name);
    return this.vueGeneric(name, type);
  }

  vueHero(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'ビジネスを次のレベルへ',
  subtitle: '革新的なソリューションで、ビジネスの成長を加速させましょう。',
  ctaText: '今すぐ始める',
  ctaLink: '#',
  secondaryCtaText: '詳しく見る',
});
<\/script>

<template>
  <section class="relative py-24 overflow-hidden bg-gradient-to-br from-primary to-secondary text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{{ title }}</h1>
        <p class="mt-6 text-xl md:text-2xl opacity-90">{{ subtitle }}</p>
        <div class="mt-8 flex flex-col sm:flex-row gap-4">
          <a :href="ctaLink" class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">{{ ctaText }}</a>
          <a href="#" class="inline-flex items-center justify-center px-8 py-4 border-2 border-white/30 text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">{{ secondaryCtaText }}</a>
        </div>
      </div>
    </div>
  </section>
</template>
-->`;
  }

  vueFeatures(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface Feature {
  title: string;
  description: string;
  icon: string;
}

interface Props {
  heading?: string;
  subheading?: string;
  features?: Feature[];
}

const props = withDefaults(defineProps<Props>(), {
  heading: '主な機能',
  subheading: '最高の体験を提供するための機能をご紹介します',
  features: () => [
    { title: '高速パフォーマンス', description: '最新技術により、高速で安定したパフォーマンスを実現します。', icon: '⚡' },
    { title: 'セキュリティ', description: '業界最高水準のセキュリティで、大切なデータを保護します。', icon: '🔒' },
    { title: '24時間サポート', description: '専門チームが24時間体制でサポートいたします。', icon: '💬' },
  ],
});
<\/script>

<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">{{ heading }}</h2>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{{ subheading }}</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index" class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div class="text-4xl mb-4">{{ feature.icon }}</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ feature.title }}</h3>
          <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
-->`;
  }

  vuePricing(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface Plan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured: boolean;
}

interface Props {
  heading?: string;
  subheading?: string;
  plans?: Plan[];
}

const props = withDefaults(defineProps<Props>(), {
  heading: '料金プラン',
  subheading: 'あなたに最適なプランをお選びください',
  plans: () => [
    { name: 'スターター', price: '¥980', period: '/月', description: '個人利用に最適', features: ['基本機能', 'メールサポート', '1GB ストレージ'], featured: false },
    { name: 'プロ', price: '¥2,980', period: '/月', description: 'チーム利用に最適', features: ['全機能', '優先サポート', '10GB ストレージ', 'API アクセス'], featured: true },
    { name: 'エンタープライズ', price: 'お問合せ', period: '', description: '大規模組織向け', features: ['カスタム機能', '専任サポート', '無制限ストレージ'], featured: false },
  ],
});
<\/script>

<template>
  <section class="py-16 md:py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">{{ heading }}</h2>
        <p class="mt-4 text-lg text-gray-600">{{ subheading }}</p>
      </div>
      <div class="grid md:grid-cols-3 gap-8 items-start">
        <div v-for="(plan, index) in plans" :key="index" :class="['bg-white rounded-2xl p-8 shadow-lg border relative', plan.featured ? 'border-primary ring-2 ring-primary scale-105' : 'border-gray-200']">
          <span v-if="plan.featured" class="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">人気</span>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ plan.name }}</h3>
          <p class="text-gray-600 mb-4">{{ plan.description }}</p>
          <div class="mb-6">
            <span class="text-4xl font-bold text-gray-900">{{ plan.price }}</span>
            <span class="text-gray-500">{{ plan.period }}</span>
          </div>
          <ul class="space-y-3 mb-8">
            <li v-for="(feature, i) in plan.features" :key="i" class="flex items-center gap-3 text-gray-600">
              <span class="text-primary">✓</span>{{ feature }}
            </li>
          </ul>
          <button :class="['w-full py-3 rounded-lg font-semibold transition-colors', plan.featured ? 'bg-primary text-white hover:bg-primary/90' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white']">選択する</button>
        </div>
      </div>
    </div>
  </section>
</template>
-->`;
  }

  vueTestimonials(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
}

interface Props {
  heading?: string;
  subheading?: string;
  testimonials?: Testimonial[];
}

const props = withDefaults(defineProps<Props>(), {
  heading: 'お客様の声',
  subheading: '実際にご利用いただいているお客様からの声をご紹介します',
  testimonials: () => [
    { name: '田中 太郎', role: 'マーケティング部長', company: 'ABC株式会社', content: 'このサービスを導入してから、業務効率が大幅に改善しました。' },
    { name: '佐藤 花子', role: 'CEO', company: 'XYZ Inc.', content: '素晴らしいサポートと機能性。' },
    { name: '鈴木 一郎', role: 'エンジニア', company: 'テック株式会社', content: '直感的なUIと強力な機能が魅力です。' },
  ],
});
<\/script>

<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">{{ heading }}</h2>
        <p class="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{{ subheading }}</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(t, index) in testimonials" :key="index" class="bg-white rounded-2xl p-6 shadow-lg">
          <p class="text-gray-700 mb-4 italic">"{{ t.content }}"</p>
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">{{ t.name.charAt(0) }}</div>
            <div>
              <p class="font-semibold text-gray-900">{{ t.name }}</p>
              <p class="text-sm text-gray-500">{{ t.role }}, {{ t.company }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
-->`;
  }

  vueCta(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface Props {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '今すぐ始めましょう',
  subtitle: '14日間の無料トライアルで、すべての機能をお試しいただけます。',
  ctaText: '無料で始める',
  ctaLink: '#',
});
<\/script>

<template>
  <section class="py-16 md:py-24 bg-gradient-to-r from-primary to-secondary text-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">{{ title }}</h2>
      <p class="text-xl opacity-90 mb-8">{{ subtitle }}</p>
      <a :href="ctaLink" class="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-gray-100 transition-colors">{{ ctaText }}</a>
    </div>
  </section>
</template>
-->`;
  }

  vueFaq(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
import { ref } from 'vue';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  heading?: string;
  subheading?: string;
  faqs?: FaqItem[];
}

const props = withDefaults(defineProps<Props>(), {
  heading: 'よくある質問',
  subheading: 'お客様からよくいただくご質問にお答えします',
  faqs: () => [
    { question: 'サービスの利用に必要なものは？', answer: 'インターネット接続環境とウェブブラウザがあれば、すぐにご利用いただけます。' },
    { question: '無料トライアル期間はありますか？', answer: 'はい、14日間の無料トライアルをご用意しています。' },
    { question: 'プランの変更はいつでもできますか？', answer: 'はい、いつでもプランの変更が可能です。' },
  ],
});

const openIndex = ref<number | null>(null);
const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index;
};
<\/script>

<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">{{ heading }}</h2>
        <p class="mt-4 text-lg text-gray-600">{{ subheading }}</p>
      </div>
      <div class="space-y-4">
        <div v-for="(faq, index) in faqs" :key="index" class="bg-white rounded-xl shadow-md overflow-hidden">
          <button @click="toggle(index)" class="w-full px-6 py-4 text-left font-semibold text-gray-900 flex justify-between items-center hover:bg-gray-50 transition-colors">
            {{ faq.question }}
            <span :class="['transform transition-transform', openIndex === index ? 'rotate-180' : '']">▼</span>
          </button>
          <div v-show="openIndex === index" class="px-6 py-4 text-gray-600 border-t border-gray-100">{{ faq.answer }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
-->`;
  }

  vueContact(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface Props {
  heading?: string;
  subheading?: string;
}

const props = withDefaults(defineProps<Props>(), {
  heading: 'お問い合わせ',
  subheading: 'ご質問やご相談がございましたら、お気軽にお問い合わせください',
});

const handleSubmit = () => {
  alert('お問い合わせを受け付けました（デモ）');
};
<\/script>

<template>
  <section class="py-16 md:py-24 bg-gray-50">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">{{ heading }}</h2>
        <p class="mt-4 text-lg text-gray-600">{{ subheading }}</p>
      </div>
      <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl p-8 shadow-xl space-y-6">
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">お名前</label>
            <input type="text" placeholder="山田 太郎" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
            <input type="email" placeholder="you@example.com" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">メッセージ</label>
          <textarea rows="5" placeholder="詳細をご記入ください..." required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none"></textarea>
        </div>
        <button type="submit" class="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">送信する</button>
      </form>
    </div>
  </section>
</template>
-->`;
  }

  vueNewsletter(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface Props {
  heading?: string;
  subheading?: string;
  buttonText?: string;
}

const props = withDefaults(defineProps<Props>(), {
  heading: 'ニュースレターに登録',
  subheading: '最新情報やお得な情報をメールでお届けします',
  buttonText: '登録する',
});

const handleSubmit = () => {
  alert('ニュースレターに登録しました（デモ）');
};
<\/script>

<template>
  <section class="py-16 md:py-24 bg-primary/5">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-3xl md:text-4xl font-bold text-gray-900">{{ heading }}</h2>
      <p class="mt-4 text-lg text-gray-600 mb-8">{{ subheading }}</p>
      <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row gap-4 justify-center">
        <input type="email" placeholder="メールアドレスを入力" required class="max-w-sm flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition" />
        <button type="submit" class="px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors">{{ buttonText }}</button>
      </form>
    </div>
  </section>
</template>
-->`;
  }

  vueStats(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface StatItem {
  value: string;
  label: string;
}

interface Props {
  stats?: StatItem[];
}

const props = withDefaults(defineProps<Props>(), {
  stats: () => [
    { value: '10,000+', label: '利用企業数' },
    { value: '99.9%', label: '稼働率' },
    { value: '24/7', label: 'サポート対応' },
    { value: '50+', label: '連携サービス' },
  ],
});
<\/script>

<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div v-for="(stat, index) in stats" :key="index" class="text-center">
          <div class="text-4xl md:text-5xl font-bold text-primary mb-2">{{ stat.value }}</div>
          <div class="text-gray-600">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </section>
</template>
-->`;
  }

  vueFooter(name) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface FooterLink {
  title: string;
  items: { label: string; href: string }[];
}

interface Props {
  companyName?: string;
  description?: string;
  links?: FooterLink[];
}

const props = withDefaults(defineProps<Props>(), {
  companyName: 'LP Generator',
  description: '美しいランディングページを簡単に作成できるサービスです。',
  links: () => [
    { title: '製品', items: [{ label: '機能', href: '#' }, { label: '料金', href: '#' }, { label: '導入事例', href: '#' }] },
    { title: '会社情報', items: [{ label: '会社概要', href: '#' }, { label: 'ブログ', href: '#' }, { label: '採用情報', href: '#' }] },
    { title: 'サポート', items: [{ label: 'ヘルプセンター', href: '#' }, { label: 'API ドキュメント', href: '#' }, { label: 'お問い合わせ', href: '#' }] },
  ],
});

const currentYear = new Date().getFullYear();
<\/script>

<template>
  <footer class="bg-gray-900 text-white py-16 px-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <h3 class="text-2xl font-bold mb-4">{{ companyName }}</h3>
          <p class="text-gray-400 mb-6">{{ description }}</p>
        </div>
        <div v-for="(section, i) in links" :key="i">
          <h4 class="font-semibold mb-4">{{ section.title }}</h4>
          <ul class="space-y-2">
            <li v-for="(link, j) in section.items" :key="j">
              <a :href="link.href" class="text-gray-400 hover:text-white transition-colors">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        <p>&copy; {{ currentYear }} {{ companyName }}. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>
-->`;
  }

  vueGeneric(name, type) {
    return `<!--
  ${name}.vue
-->
<!--
<script setup lang="ts">
interface Props {
  title?: string;
  description?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '${name}',
  description: '${type} セクションの内容をここに追加してください。',
});
<\/script>

<template>
  <section class="py-16 md:py-24 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900">{{ title }}</h2>
        <p class="mt-4 text-lg text-gray-600">{{ description }}</p>
      </div>
    </div>
  </section>
</template>
-->`;
  }

  exportEnhancedJSON() {
    const config = {
      version: '1.0.0',
      theme: this.currentTheme,
      animations: this.animations,
      glassmorphism: this.glassmorphism,
      sections: this.sections.map((section) => ({
        id: section.id,
        type: section.type,
        name: section.template.name,
      })),
    };

    const jsonString = JSON.stringify(config, null, 2);
    this.downloadFile(jsonString, 'landing-page-config.json', 'application/json');
    this.showNotification('設定をJSONでエクスポートしました');
  }

  // ==========================================
  // ENHANCED GENERATOR 統合: Presets
  // ==========================================

  setupPresets() {
    const controlSection = document.createElement('section');
    controlSection.className = 'control-section';
    controlSection.innerHTML = `
            <h3 class="section-title">プリセットテンプレート</h3>
            <div class="preset-grid">
                <button class="preset-btn" data-preset="startup">
                    <span class="preset-name">スタートアップ</span>
                    <span class="preset-desc">新規ビジネス向け</span>
                </button>
                <button class="preset-btn" data-preset="saas">
                    <span class="preset-name">SaaS</span>
                    <span class="preset-desc">ソフトウェア製品向け</span>
                </button>
                <button class="preset-btn" data-preset="portfolio">
                    <span class="preset-name">ポートフォリオ</span>
                    <span class="preset-desc">個人作品集</span>
                </button>
                <button class="preset-btn" data-preset="ecommerce">
                    <span class="preset-name">Eコマース</span>
                    <span class="preset-desc">オンラインストア</span>
                </button>
                <button class="preset-btn" data-preset="agency">
                    <span class="preset-name">エージェンシー</span>
                    <span class="preset-desc">制作会社・代理店向け</span>
                </button>
                <button class="preset-btn" data-preset="consulting">
                    <span class="preset-name">コンサルティング</span>
                    <span class="preset-desc">専門サービス向け</span>
                </button>
                <button class="preset-btn" data-preset="education">
                    <span class="preset-name">教育・スクール</span>
                    <span class="preset-desc">オンライン講座向け</span>
                </button>
                <button class="preset-btn" data-preset="restaurant">
                    <span class="preset-name">レストラン</span>
                    <span class="preset-desc">飲食店向け</span>
                </button>
                <button class="preset-btn" data-preset="realestate">
                    <span class="preset-name">不動産</span>
                    <span class="preset-desc">物件紹介向け</span>
                </button>
                <button class="preset-btn" data-preset="event">
                    <span class="preset-name">イベント</span>
                    <span class="preset-desc">セミナー・展示会向け</span>
                </button>
            </div>
        `;

    const layoutSection = document.querySelector('.control-section:nth-child(4)');
    if (layoutSection) {
      layoutSection.parentNode.insertBefore(controlSection, layoutSection);
    }

    const style = document.createElement('style');
    style.textContent = `
            .preset-grid { display: grid; grid-template-columns: 1fr; gap: 12px; }
            .preset-btn {
                display: flex; flex-direction: column; align-items: flex-start;
                padding: 16px; border: 2px solid var(--border-color, #e2e8f0);
                border-radius: 12px; background: white; cursor: pointer;
                transition: all 0.3s ease; text-align: left;
            }
            .preset-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                border-color: var(--primary-color, #667eea);
            }
            .preset-name { font-size: 1rem; font-weight: 700; color: #2d3748; margin-bottom: 4px; }
            .preset-desc { font-size: 0.85rem; color: #718096; }
        `;
    document.head.appendChild(style);

    document.querySelectorAll('.preset-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const preset = e.currentTarget.dataset.preset;
        this.applyPreset(preset);
      });
    });
  }

  applyPreset(presetName) {
    const presets = {
      startup: ['hero-split', 'features-cards-hover', 'social-proof', 'pricing-modern', 'testimonials-carousel', 'cta-split'],
      saas: ['hero-animated', 'features-timeline', 'pricing-modern', 'testimonials', 'faq', 'newsletter'],
      portfolio: ['hero-1', 'gallery', 'features-grid', 'team', 'testimonials', 'contact'],
      ecommerce: ['hero-split', 'features-grid', 'gallery', 'pricing', 'testimonials', 'cta'],
      agency: ['hero-gradient', 'logo-cloud', 'features-grid', 'gallery', 'testimonials-carousel', 'team', 'cta-banner'],
      consulting: ['hero-minimal', 'features-list', 'benefits-grid', 'testimonials', 'steps-horizontal', 'contact'],
      education: ['hero-video', 'features-cards-hover', 'pricing-modern', 'testimonials-carousel', 'accordion-faq', 'cta-split'],
      restaurant: ['hero-fullscreen', 'gallery', 'features-grid', 'testimonials', 'contact'],
      realestate: ['hero-split-image', 'features-grid', 'gallery', 'testimonials', 'contact-split'],
      event: ['hero-gradient', 'steps-horizontal', 'features-grid', 'pricing-modern', 'testimonials', 'cta-banner'],
    };

    const sections = presets[presetName] || [];

    this.sections = [];

    sections.forEach((componentType) => {
      if (sectionTemplates[componentType]) {
        this.sections.push({
          type: componentType,
          id: CommonEditor.generateId('section'),
          template: sectionTemplates[componentType],
        });
      }
    });

    this.updatePreview();
    this.showNotification(`${presetName}プリセットを適用しました`);
  }

  // ==========================================
  // ENHANCED GENERATOR 統合: Keyboard Shortcuts
  // ==========================================

  setupEnhancedKeyboardShortcuts() {
    this._addListener(document, 'keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        this.exportHTML();
      }
    });
  }

  // ==========================================
  // ENHANCED GENERATOR 統合: Design Customization
  // ==========================================

  setupDesignCustomization() {
    const fontFamilySelect = document.getElementById('fontFamilySelect');
    if (fontFamilySelect) {
      fontFamilySelect.addEventListener('change', (e) => {
        this.designSettings.fontFamily = e.target.value;
        this.applyFontFamily(e.target.value);
      });
    }

    const fontSizeScale = document.getElementById('fontSizeScale');
    if (fontSizeScale) {
      fontSizeScale.addEventListener('change', (e) => {
        this.designSettings.fontSizeScale = parseFloat(e.target.value);
        this.applyFontSizeScale(parseFloat(e.target.value));
      });
    }

    const spacingScale = document.getElementById('spacingScale');
    if (spacingScale) {
      spacingScale.addEventListener('change', (e) => {
        this.designSettings.spacingScale = parseFloat(e.target.value);
        this.applySpacingScale(parseFloat(e.target.value));
      });
    }

    const borderRadiusStyle = document.getElementById('borderRadiusStyle');
    if (borderRadiusStyle) {
      borderRadiusStyle.addEventListener('change', (e) => {
        this.designSettings.borderRadius = parseInt(e.target.value);
        this.applyBorderRadius(parseInt(e.target.value));
      });
    }

    const primaryColor = document.getElementById('primaryColor');
    const secondaryColor = document.getElementById('secondaryColor');
    const accentColor = document.getElementById('accentColor');

    primaryColor?.addEventListener('change', (e) => {
      this.designSettings.primaryColor = e.target.value;
      this.applyCustomColors();
    });

    secondaryColor?.addEventListener('change', (e) => {
      this.designSettings.secondaryColor = e.target.value;
      this.applyCustomColors();
    });

    accentColor?.addEventListener('change', (e) => {
      this.designSettings.accentColor = e.target.value;
      this.applyCustomColors();
    });

    const resetColors = document.getElementById('resetColors');
    resetColors?.addEventListener('click', () => {
      this.resetColors();
    });
  }

  applyFontFamily(fontFamily) {
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
      previewFrame.style.fontFamily = `'${fontFamily}', sans-serif`;
      this.injectCustomCSS('custom-font-css', `
        #previewFrame, #previewFrame * { font-family: '${fontFamily}', sans-serif !important; }
      `);
      this.showNotification(`フォントを ${fontFamily} に変更しました`);
    }
  }

  applyFontSizeScale(scale) {
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
      previewFrame.style.fontSize = `${scale * 100}%`;
      this.injectCustomCSS('custom-fontsize-css', `
        #previewFrame { font-size: ${scale * 100}% !important; }
      `);
      this.showNotification(`フォントサイズを ${scale * 100}% に変更しました`);
    }
  }

  applySpacingScale(scale) {
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
      previewFrame.style.setProperty('--spacing-scale', scale);
      this.injectCustomCSS('custom-spacing-css', `
        #previewFrame [class*="lp-section"] { padding-top: calc(80px * ${scale}) !important; padding-bottom: calc(80px * ${scale}) !important; }
        #previewFrame [class*="lp-hero"] { padding-top: calc(120px * ${scale}) !important; padding-bottom: calc(120px * ${scale}) !important; }
        #previewFrame [class*="lp-card"], #previewFrame [class*="lp-feature"] { padding: calc(24px * ${scale}) !important; }
      `);
      this.showNotification(`余白を ${scale * 100}% に変更しました`);
    }
  }

  applyBorderRadius(radius) {
    this.injectCustomCSS('custom-radius-css', `
      #previewFrame [class*="lp-btn"] { border-radius: ${radius}px !important; }
      #previewFrame [class*="lp-card"], #previewFrame [class*="lp-feature-card"],
      #previewFrame [class*="lp-pricing-card"], #previewFrame [class*="lp-testimonial"] { border-radius: ${radius}px !important; }
      #previewFrame [class*="lp-mockup"] { border-radius: ${radius}px !important; }
      #previewFrame .lp-hero-visual img { border-radius: ${radius}px !important; }
    `);
    this.showNotification(`角丸を ${radius}px に変更しました`);
  }

  applyCustomColors() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) return;

    previewFrame.style.setProperty('--theme-primary', this.designSettings.primaryColor);
    previewFrame.style.setProperty('--theme-secondary', this.designSettings.secondaryColor);
    previewFrame.style.setProperty('--theme-accent', this.designSettings.accentColor);

    this.injectThemeCSS();
    this.showNotification('カスタムカラーを適用しました');
  }

  injectThemeCSS() {
    const { primaryColor, secondaryColor, accentColor } = this.designSettings;
    this.injectCustomCSS('custom-theme-css', `
      #previewFrame [class*="lp-hero"]:not([class*="lp-hero-stat"]):not([class*="lp-hero-content"]):not([class*="lp-hero-visual"]):not([class*="lp-hero-title"]):not([class*="lp-hero-subtitle"]):not([class*="lp-hero-buttons"]):not([class*="lp-hero-badge"]) {
        background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
      }
      #previewFrame .lp-btn-primary, #previewFrame [class*="lp-btn-primary"],
      #previewFrame .lp-cta-btn, #previewFrame [class*="lp-cta"] button {
        background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
        border-color: ${primaryColor} !important;
      }
      #previewFrame .lp-btn-primary:hover, #previewFrame [class*="lp-btn-primary"]:hover {
        box-shadow: 0 10px 30px ${primaryColor}40 !important;
      }
      #previewFrame .lp-hero-badge, #previewFrame [class*="lp-badge"], #previewFrame .lp-section-badge {
        background: ${primaryColor}15 !important; color: ${primaryColor} !important;
      }
      #previewFrame .lp-badge-dot { background: ${primaryColor} !important; }
      #previewFrame .lp-hero-stat-number, #previewFrame .lp-stat-number, #previewFrame [class*="stat-number"] { color: ${primaryColor} !important; }
      #previewFrame .lp-feature-icon, #previewFrame [class*="lp-feature-icon"] { color: ${primaryColor} !important; }
      #previewFrame .lp-feature-icon-wrapper, #previewFrame [class*="icon-wrapper"] {
        background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
      }
      #previewFrame .lp-pricing-card.featured, #previewFrame .lp-pricing-card.highlighted,
      #previewFrame [class*="lp-pricing"][class*="featured"] { border-color: ${primaryColor} !important; }
      #previewFrame .lp-pricing-card .lp-pricing-cta { background: ${primaryColor} !important; }
      #previewFrame .lp-cta, #previewFrame [class*="lp-cta-section"], #previewFrame .lp-newsletter {
        background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}) !important;
      }
      #previewFrame .lp-gradient-text {
        background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}, ${accentColor}) !important;
        -webkit-background-clip: text !important; -webkit-text-fill-color: transparent !important; background-clip: text !important;
      }
      #previewFrame a:not([class*="lp-btn"]):hover { color: ${primaryColor} !important; }
      #previewFrame .lp-team-role, #previewFrame [class*="lp-team-role"] { color: ${primaryColor} !important; }
      #previewFrame .lp-nav-logo { color: ${primaryColor} !important; }
      #previewFrame .lp-testimonial-rating, #previewFrame [class*="rating"] svg {
        color: ${accentColor} !important; fill: ${accentColor} !important;
      }
      #previewFrame [class*="faq"] [class*="icon"] { color: ${primaryColor} !important; }
      #previewFrame .lp-hero-orb-1 { background: ${primaryColor} !important; }
      #previewFrame .lp-hero-orb-2 { background: ${secondaryColor} !important; }
      #previewFrame .lp-hero-orb-3 { background: ${accentColor} !important; }
      #previewFrame .lp-nav-menu li a::after { background: ${primaryColor} !important; }
    `);
  }

  resetColors() {
    this.designSettings.primaryColor = '#667eea';
    this.designSettings.secondaryColor = '#764ba2';
    this.designSettings.accentColor = '#f093fb';

    const primaryEl = document.getElementById('primaryColor');
    const secondaryEl = document.getElementById('secondaryColor');
    const accentEl = document.getElementById('accentColor');
    if (primaryEl) primaryEl.value = this.designSettings.primaryColor;
    if (secondaryEl) secondaryEl.value = this.designSettings.secondaryColor;
    if (accentEl) accentEl.value = this.designSettings.accentColor;

    this.applyCustomColors();
    this.showNotification('カラーをリセットしました');
  }

  /**
   * カスタムCSS注入のヘルパー（IDで管理、上書き可能）
   * プレビューフレーム内にも注入して確実に反映させる
   */
  injectCustomCSS(id, cssText) {
    // document.head にも注入（既存互換）
    const existing = document.getElementById(id);
    if (existing) existing.remove();

    const style = document.createElement('style');
    style.id = id;
    style.textContent = cssText;
    document.head.appendChild(style);

    // プレビューフレーム内にも注入（テンプレートへの確実な反映）
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
      const previewId = `${id}-preview`;
      const existingPreview = previewFrame.querySelector(`#${previewId}`);
      if (existingPreview) existingPreview.remove();

      const previewStyle = document.createElement('style');
      previewStyle.id = previewId;
      previewStyle.textContent = cssText;
      previewFrame.prepend(previewStyle);
    }
  }

  // ==========================================
  // ENHANCED GENERATOR 統合: SEO Editor
  // ==========================================

  setupSEOEditor() {
    const fields = [
      { id: 'seoTitle', prop: 'title', event: 'input' },
      { id: 'seoDescription', prop: 'description', event: 'input' },
      { id: 'seoKeywords', prop: 'keywords', event: 'input' },
      { id: 'ogImage', prop: 'ogImage', event: 'input' },
      { id: 'canonicalUrl', prop: 'canonicalUrl', event: 'input' },
      { id: 'seoLang', prop: 'lang', event: 'change' },
    ];

    const checkboxFields = [
      { id: 'includeTwitterCard', prop: 'includeTwitterCard' },
      { id: 'includeSchema', prop: 'includeSchema' },
    ];

    // DOMContentLoaded 後にバインド
    const bindFields = () => {
      fields.forEach(({ id, prop, event }) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener(event, (e) => {
            this.seoData[prop] = e.target.value;
          });
        }
      });

      checkboxFields.forEach(({ id, prop }) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener('change', (e) => {
            this.seoData[prop] = e.target.checked;
          });
        }
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', bindFields);
    } else {
      bindFields();
    }
  }

  generateSEOMetaTags() {
    let metaTags = '';

    if (this.seoData.title) {
      metaTags += `    <title>${CommonEditor.sanitizeHTML(this.seoData.title)}</title>\n`;
    }

    if (this.seoData.description) {
      metaTags += `    <meta name="description" content="${CommonEditor.sanitizeAttribute(this.seoData.description)}">\n`;
    }

    if (this.seoData.keywords) {
      metaTags += `    <meta name="keywords" content="${CommonEditor.sanitizeAttribute(this.seoData.keywords)}">\n`;
    }

    metaTags += `    <meta http-equiv="content-language" content="${CommonEditor.sanitizeAttribute(this.seoData.lang)}">\n`;

    if (this.seoData.canonicalUrl) {
      metaTags += `    <link rel="canonical" href="${CommonEditor.sanitizeAttribute(this.seoData.canonicalUrl)}">\n`;
    }

    // Open Graph
    if (this.seoData.title) {
      metaTags += `    <meta property="og:title" content="${CommonEditor.sanitizeAttribute(this.seoData.title)}">\n`;
    }
    if (this.seoData.description) {
      metaTags += `    <meta property="og:description" content="${CommonEditor.sanitizeAttribute(this.seoData.description)}">\n`;
    }
    if (this.seoData.ogImage) {
      metaTags += `    <meta property="og:image" content="${CommonEditor.sanitizeAttribute(this.seoData.ogImage)}">\n`;
    }
    metaTags += `    <meta property="og:type" content="website">\n`;
    if (this.seoData.canonicalUrl) {
      metaTags += `    <meta property="og:url" content="${CommonEditor.sanitizeAttribute(this.seoData.canonicalUrl)}">\n`;
    }

    // Twitter Card
    if (this.seoData.includeTwitterCard) {
      metaTags += `    <meta name="twitter:card" content="summary_large_image">\n`;
      if (this.seoData.title) {
        metaTags += `    <meta name="twitter:title" content="${CommonEditor.sanitizeAttribute(this.seoData.title)}">\n`;
      }
      if (this.seoData.description) {
        metaTags += `    <meta name="twitter:description" content="${CommonEditor.sanitizeAttribute(this.seoData.description)}">\n`;
      }
      if (this.seoData.ogImage) {
        metaTags += `    <meta name="twitter:image" content="${CommonEditor.sanitizeAttribute(this.seoData.ogImage)}">\n`;
      }
    }

    // Schema.org JSON-LD
    if (this.seoData.includeSchema) {
      const schema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: this.seoData.title || 'Landing Page',
        description: this.seoData.description || '',
        url: this.seoData.canonicalUrl || '',
      };
      metaTags += `    <script type="application/ld+json">\n${JSON.stringify(schema, null, 6)}\n    </script>\n`;
    }

    return metaTags;
  }

  // ==========================================
  // ENHANCED GENERATOR 統合: Scroll Animations
  // ==========================================

  setupScrollAnimations() {
    this.addAnimationStyles();

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: [0, 0.1, 0.2, 0.3],
    };

    this.animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
          const target = entry.target;
          const delay = target.dataset.animDelay || 0;

          setTimeout(() => {
            target.classList.add('lp-animated');
            target.classList.remove('lp-animate-ready');
          }, delay);

          this.animationObserver.unobserve(target);
        }
      });
    }, observerOptions);

    this.observePreviewChanges();
  }

  observePreviewChanges() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) {
      setTimeout(() => this.observePreviewChanges(), 500);
      return;
    }

    this.initializeAnimatedElements(previewFrame);

    const mutationObserver = new MutationObserver(() => {
      this.initializeAnimatedElements(previewFrame);
    });

    mutationObserver.observe(previewFrame, {
      childList: true,
      subtree: true,
    });
  }

  initializeAnimatedElements(container) {
    const animatableSelectors = [
      '.lp-slide-up', '.lp-fade-in', '.lp-scale-in',
      '.lp-slide-left', '.lp-slide-right',
      '.lp-feature-card', '.lp-pricing-card-modern',
      '.lp-testimonial-card', '.lp-stat-card', '.lp-faq-item',
    ];

    const elements = container.querySelectorAll(animatableSelectors.join(', '));

    elements.forEach((el, index) => {
      if (!el.classList.contains('lp-animated') && !el.classList.contains('lp-animate-ready')) {
        el.classList.add('lp-animate-ready');
        el.dataset.animDelay = index * 100;
        if (this.animationObserver) {
          this.animationObserver.observe(el);
        }
      }
    });
  }

  addAnimationStyles() {
    if (document.getElementById('lp-animation-styles')) return;

    this.injectCustomCSS('lp-animation-styles', `
      .lp-animate-ready.lp-slide-up { opacity: 0; transform: translateY(40px); }
      .lp-animate-ready.lp-fade-in { opacity: 0; }
      .lp-animate-ready.lp-scale-in { opacity: 0; transform: scale(0.9); }
      .lp-animate-ready.lp-slide-left { opacity: 0; transform: translateX(-40px); }
      .lp-animate-ready.lp-slide-right { opacity: 0; transform: translateX(40px); }
      .lp-animate-ready.lp-feature-card, .lp-animate-ready.lp-pricing-card-modern,
      .lp-animate-ready.lp-testimonial-card, .lp-animate-ready.lp-stat-card,
      .lp-animate-ready.lp-faq-item { opacity: 0; transform: translateY(30px); }

      .lp-animated.lp-slide-up { opacity: 1; transform: translateY(0); transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
      .lp-animated.lp-fade-in { opacity: 1; transition: opacity 0.8s ease; }
      .lp-animated.lp-scale-in { opacity: 1; transform: scale(1); transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
      .lp-animated.lp-slide-left { opacity: 1; transform: translateX(0); transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
      .lp-animated.lp-slide-right { opacity: 1; transform: translateX(0); transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
      .lp-animated.lp-feature-card, .lp-animated.lp-pricing-card-modern,
      .lp-animated.lp-testimonial-card, .lp-animated.lp-stat-card,
      .lp-animated.lp-faq-item { opacity: 1; transform: translateY(0); transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }

      .lp-features-grid-modern .lp-feature-card:nth-child(1) { transition-delay: 0ms; }
      .lp-features-grid-modern .lp-feature-card:nth-child(2) { transition-delay: 100ms; }
      .lp-features-grid-modern .lp-feature-card:nth-child(3) { transition-delay: 200ms; }
      .lp-features-grid-modern .lp-feature-card:nth-child(4) { transition-delay: 300ms; }
      .lp-features-grid-modern .lp-feature-card:nth-child(5) { transition-delay: 400ms; }
      .lp-features-grid-modern .lp-feature-card:nth-child(6) { transition-delay: 500ms; }

      .lp-pricing-grid-modern .lp-pricing-card-modern:nth-child(1) { transition-delay: 0ms; }
      .lp-pricing-grid-modern .lp-pricing-card-modern:nth-child(2) { transition-delay: 150ms; }
      .lp-pricing-grid-modern .lp-pricing-card-modern:nth-child(3) { transition-delay: 300ms; }

      .lp-stats-grid-modern .lp-stat-card:nth-child(1) { transition-delay: 0ms; }
      .lp-stats-grid-modern .lp-stat-card:nth-child(2) { transition-delay: 100ms; }
      .lp-stats-grid-modern .lp-stat-card:nth-child(3) { transition-delay: 200ms; }
      .lp-stats-grid-modern .lp-stat-card:nth-child(4) { transition-delay: 300ms; }
    `);
  }

  // ==========================================
  // ENHANCED GENERATOR 統合: Hover Effects
  // ==========================================

  setupHoverEffects() {
    this.addHoverEffectStyles();

    const throttledMouseMove = CommonEditor.throttle((e) => {
      const cards = document.querySelectorAll(
        '.lp-feature-card, .lp-pricing-card-modern, .lp-stat-card'
      );
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    }, 16);

    this._addListener(document, 'mousemove', throttledMouseMove);
  }

  addHoverEffectStyles() {
    if (document.getElementById('lp-hover-effect-styles')) return;

    this.injectCustomCSS('lp-hover-effect-styles', `
      .lp-feature-card::before, .lp-pricing-card-modern::before, .lp-stat-card::before {
        content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.08), transparent 40%);
        border-radius: inherit; opacity: 0; transition: opacity 0.3s ease; pointer-events: none; z-index: 0;
      }
      .lp-feature-card:hover::before, .lp-pricing-card-modern:hover::before, .lp-stat-card:hover::before { opacity: 1; }
      .lp-btn { position: relative; overflow: hidden; }
      .lp-btn::after {
        content: ''; position: absolute; width: 100%; height: 100%; top: 0; left: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 10%);
        transform: scale(10); opacity: 0; transition: transform 0.5s, opacity 0.3s; pointer-events: none;
      }
      .lp-btn:active::after { transform: scale(0); opacity: 1; transition: 0s; }
      .lp-gallery-item img, .lp-feature-image img { transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
      .lp-gallery-item:hover img, .lp-feature-image:hover img { transform: scale(1.05); }
      .lp-feature-link { position: relative; }
      .lp-feature-link::after {
        content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 2px;
        background: currentColor; transition: width 0.3s ease;
      }
      .lp-feature-link:hover::after { width: 100%; }
      @media (hover: hover) {
        .lp-pricing-card-modern { transform-style: preserve-3d; perspective: 1000px; }
        .lp-pricing-card-modern:hover { transform: translateY(-8px) rotateX(2deg); }
        .lp-pricing-featured:hover { transform: scale(1.05) translateY(-10px) rotateX(2deg); }
      }
    `);
  }

  // ==========================================
  // ENHANCED GENERATOR 統合: Parallax Effects
  // ==========================================

  setupParallaxEffects() {
    this.addParallaxStyles();

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const heroSection = document.querySelector('.lp-hero-modern');

      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroOffset = heroRect.top + scrollY;
        const scrollProgress = Math.max(0, scrollY - heroOffset);

        const orbs = heroSection.querySelectorAll('.lp-hero-gradient-orb');
        orbs.forEach((orb, index) => {
          const speed = 0.3 + index * 0.1;
          orb.style.transform = `translateY(${scrollProgress * speed}px)`;
        });

        const mockup = heroSection.querySelector('.lp-hero-mockup');
        if (mockup) {
          mockup.style.transform = `translateY(${scrollProgress * 0.15}px)`;
        }

        const heroContent = heroSection.querySelector('.lp-hero-content');
        if (heroContent) {
          const opacity = Math.max(0, 1 - scrollProgress / 400);
          heroContent.style.opacity = opacity;
        }
      }

      const statsSection = document.querySelector('.lp-stats-modern');
      if (statsSection) {
        const gradientLine = statsSection.querySelector('.lp-stats-gradient-line');
        if (gradientLine) {
          gradientLine.style.backgroundPosition = `${scrollY * 0.5}% 0%`;
        }
      }

      ticking = false;
    };

    this._addListener(window, 'scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  addParallaxStyles() {
    if (document.getElementById('lp-parallax-styles')) return;

    this.injectCustomCSS('lp-parallax-styles', `
      .lp-hero-gradient-orb { will-change: transform; transition: transform 0.1s ease-out; }
      .lp-hero-mockup { will-change: transform; transition: transform 0.1s ease-out; }
      .lp-hero-content { will-change: opacity; transition: opacity 0.1s ease-out; }
      @keyframes float-subtle {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        25% { transform: translateY(-10px) rotate(1deg); }
        50% { transform: translateY(-5px) rotate(-1deg); }
        75% { transform: translateY(-15px) rotate(0.5deg); }
      }
      .lp-hero-stats .lp-hero-stat-item { animation: float-subtle 6s ease-in-out infinite; }
      .lp-hero-stats .lp-hero-stat-item:nth-child(1) { animation-delay: 0s; }
      .lp-hero-stats .lp-hero-stat-item:nth-child(2) { animation-delay: 1s; }
      .lp-hero-stats .lp-hero-stat-item:nth-child(3) { animation-delay: 2s; }
      @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
      .lp-gradient-text { background-size: 200% auto; animation: shimmer 4s linear infinite; }
      @keyframes badge-pulse {
        0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
        50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
      }
      .lp-hero-badge, .lp-cta-badge { animation: badge-pulse 3s infinite; }
      .lp-stat-count { display: inline-block; }
    `);
  }
}

// 通知アニメーション
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  window.lpGenerator = new LandingPageGenerator();

  setTimeout(() => {
    window.lpGenerator.loadAutoSave();
  }, 500);
});

// ==========================================
// LIGHTBOX FUNCTIONALITY
// ==========================================

class Lightbox {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.init();
  }

  init() {
    const lightboxHTML = `
            <div class="lp-lightbox" id="lightbox">
                <button class="lp-lightbox-close" id="lightboxClose">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
                <button class="lp-lightbox-nav lp-lightbox-prev" id="lightboxPrev">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"/>
                    </svg>
                </button>
                <button class="lp-lightbox-nav lp-lightbox-next" id="lightboxNext">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"/>
                    </svg>
                </button>
                <div class="lp-lightbox-content">
                    <img id="lightboxImage" src="" alt="">
                </div>
                <div class="lp-lightbox-counter" id="lightboxCounter"></div>
            </div>
        `;

    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    this.attachEventListeners();
  }

  attachEventListeners() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightboxClose');
    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');

    closeBtn?.addEventListener('click', () => this.close());
    lightbox?.addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') this.close();
    });

    prevBtn?.addEventListener('click', () => this.prev());
    nextBtn?.addEventListener('click', () => this.next());

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    document.addEventListener('click', (e) => {
      const galleryItem = e.target.closest('[data-lightbox="gallery"]');
      if (galleryItem) {
        e.preventDefault();
        this.open(galleryItem);
      }
    });
  }

  open(clickedItem) {
    const gallery = clickedItem.closest('.lp-gallery-grid');
    if (!gallery) return;

    this.images = Array.from(gallery.querySelectorAll('[data-lightbox="gallery"] img'));
    this.currentIndex = this.images.findIndex(
      (img) => img.closest('[data-lightbox="gallery"]') === clickedItem
    );

    this.show();
  }

  show() {
    const lightbox = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImage');
    const counter = document.getElementById('lightboxCounter');

    if (this.images[this.currentIndex]) {
      img.src = this.images[this.currentIndex].src;
      img.alt = this.images[this.currentIndex].alt || '';
      counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  close() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.show();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.show();
  }
}

// Lightbox 初期化
document.addEventListener('DOMContentLoaded', () => {
  window.lightbox = new Lightbox();
});

// ==========================================
// DARK MODE FUNCTIONALITY
// ==========================================

class DarkModeToggle {
  constructor() {
    this.toggle = document.getElementById('modeToggle');
    this.modeText = this.toggle?.querySelector('.mode-text');
    this.init();
  }

  init() {
    const savedMode = CommonEditor.loadFromStorage('darkMode');
    if (savedMode === 'enabled') {
      this.enable();
    }

    this.toggle?.addEventListener('click', () => this.toggleMode());
  }

  toggleMode() {
    if (document.body.classList.contains('dark-mode')) {
      this.disable();
    } else {
      this.enable();
    }
  }

  enable() {
    document.body.classList.add('dark-mode');
    if (this.modeText) this.modeText.textContent = 'Light Mode';
    CommonEditor.saveToStorage('darkMode', 'enabled');
  }

  disable() {
    document.body.classList.remove('dark-mode');
    if (this.modeText) this.modeText.textContent = 'Dark Mode';
    CommonEditor.saveToStorage('darkMode', 'disabled');
  }
}

// ダークモード初期化
document.addEventListener('DOMContentLoaded', () => {
  window.darkModeToggle = new DarkModeToggle();
});
