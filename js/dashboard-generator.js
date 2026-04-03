// Dashboard Generator
// Drag & Drop Dashboard Builder
// CommonEditor を活用し、インライン編集・画像編集・XSSサニタイズを委譲

class DashboardGenerator {
  // === 定数 ===
  static get CONFIG() {
    return {
      ...CommonEditor.CONFIG,
      GRID_COLUMNS: 12,
      DEFAULT_GRID_ROWS: 3,
      MIN_GRID_ROWS: 1,
      MAX_GRID_ROWS: 12,
      DEFAULT_LAYOUT: 'sidebar-left',
      DEFAULT_THEME: 'blue',
      ZOOM_MIN: 25,
      ZOOM_MAX: 150,
      ZOOM_STEP: 10,
      DEFAULT_ZOOM: 100,
      CANVAS_BASE_HEIGHT: 800,
      AREA_COLORS: ['blue', 'green', 'purple', 'orange', 'pink', 'cyan'],
      DEFAULT_GRID_COL: 6,
      GRID_COL_DEFAULTS: {
        'stats-cards': 12,
        'chart-line': 6,
        'chart-bar': 4,
        'chart-pie': 4,
        'data-table': 12,
        'user-list': 4,
        'kpi-card': 4,
        'progress-card': 4,
        'activity-feed': 4,
        'form-basic': 4,
        'search-bar': 6,
        'alert-banner': 12,
        'user-profile': 4,
        'calendar-widget': 4,
        'file-upload': 6,
        'timeline': 4,
        'metric-comparison': 6,
        'mini-chart': 4,
        'dashboard-overview': 12,
        'analytics-section': 12,
        'user-management': 12,
        'settings-panel': 8,
        'notification-center': 6,
      },
      THEME_COLORS: {
        blue: '#3b82f6',
        purple: '#8b5cf6',
        green: '#10b981',
        dark: '#1f2937',
      },
      SHADOW_MAP: {
        none: 'none',
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
      AREA_BG_COLORS: {
        blue: 'rgba(59, 130, 246, 0.08)',
        green: 'rgba(34, 197, 94, 0.08)',
        purple: 'rgba(168, 85, 247, 0.08)',
        orange: 'rgba(249, 115, 22, 0.08)',
        pink: 'rgba(236, 72, 153, 0.08)',
        cyan: 'rgba(6, 182, 212, 0.08)',
      },
      AREA_BORDER_COLORS: {
        blue: '#3b82f6',
        green: '#22c55e',
        purple: '#a855f7',
        orange: '#f97316',
        pink: '#ec4899',
        cyan: '#06b6d4',
      },
      QUICK_START_TEMPLATES: {
        analytics: ['stats-cards', 'chart-line', 'data-table', 'activity-feed'],
        crm: ['stats-cards', 'user-list', 'activity-feed', 'form-basic'],
        ecommerce: ['stats-cards', 'chart-bar', 'data-table', 'chart-pie'],
      },
      GRID_TEMPLATES: {
        'full-width': [{ name: 'Content', startCol: 0, endCol: 12, startRow: 0, endRow: 1 }],
        'two-column': [
          { name: 'Left', startCol: 0, endCol: 6, startRow: 0, endRow: 1 },
          { name: 'Right', startCol: 6, endCol: 12, startRow: 0, endRow: 1 },
        ],
        'three-column': [
          { name: 'Col 1', startCol: 0, endCol: 4, startRow: 0, endRow: 1 },
          { name: 'Col 2', startCol: 4, endCol: 8, startRow: 0, endRow: 1 },
          { name: 'Col 3', startCol: 8, endCol: 12, startRow: 0, endRow: 1 },
        ],
        'sidebar-main': [
          { name: 'Sidebar', startCol: 0, endCol: 3, startRow: 0, endRow: 2 },
          { name: 'Main', startCol: 3, endCol: 12, startRow: 0, endRow: 2 },
        ],
        'dashboard-classic': [
          { name: 'Stats', startCol: 0, endCol: 12, startRow: 0, endRow: 1 },
          { name: 'Card 1', startCol: 0, endCol: 4, startRow: 1, endRow: 2 },
          { name: 'Card 2', startCol: 4, endCol: 8, startRow: 1, endRow: 2 },
          { name: 'Card 3', startCol: 8, endCol: 12, startRow: 1, endRow: 2 },
          { name: 'Chart 1', startCol: 0, endCol: 6, startRow: 2, endRow: 3 },
          { name: 'Chart 2', startCol: 6, endCol: 12, startRow: 2, endRow: 3 },
        ],
        'holy-grail': [
          { name: 'Header', startCol: 0, endCol: 12, startRow: 0, endRow: 1 },
          { name: 'Left Nav', startCol: 0, endCol: 3, startRow: 1, endRow: 2 },
          { name: 'Content', startCol: 3, endCol: 9, startRow: 1, endRow: 2 },
          { name: 'Right Sidebar', startCol: 9, endCol: 12, startRow: 1, endRow: 2 },
          { name: 'Footer', startCol: 0, endCol: 12, startRow: 2, endRow: 3 },
        ],
      },
    };
  }

  constructor() {
    this.components = [];
    this.currentLayout = DashboardGenerator.CONFIG.DEFAULT_LAYOUT;
    this.currentTheme = DashboardGenerator.CONFIG.DEFAULT_THEME;
    this.draggedComponent = null;
    this.selectedComponentId = null;
    this.history = [];
    this.historyIndex = -1;
    this.designSettings = {
      fontFamily: 'Inter',
      fontSize: 1.0,
      spacing: 1.0,
      borderRadius: 8,
      primaryColor: '#3b82f6',
      secondaryColor: '#64748b',
      accentColor: '#10b981',
      bgColor: '#f8fafc',
      shadow: 'md',
    };

    // Grid Design Mode properties
    this.designMode = 'component'; // 'component' | 'grid' - デフォルトはDrag&Dropモード
    this.gridRows = DashboardGenerator.CONFIG.DEFAULT_GRID_ROWS;
    this.gridAreas = [];
    this.isSelectingArea = false;
    this.selectionStart = null;
    this.selectionEnd = null;

    // イベントリスナーの参照を保持（destroy用）
    this._boundListeners = [];

    // CommonEditor インスタンス（インライン編集・画像編集を委譲）
    this.editor = new CommonEditor({
      previewSelector: '#dashboardCanvas',
      sectionWrapperClass: 'dashboard-component-wrapper',
      controlsClass: 'component-controls',
      editableSelectors:
        'h1, h2, h3, h4, h5, h6, p, span:not(.component-icon):not(.component-name), a, button:not(.component-control):not(.lp-control-btn), li, label, td, th, .stat-value, .stat-label, .stat-change, .card-title, .card-value',
      onContentChange: (el, _oldVal, _newVal) => {
        const wrapper = el.closest('.dashboard-component-wrapper');
        const componentId = wrapper?.dataset?.componentId;
        if (componentId) {
          this.updateComponentContent(componentId, wrapper);
        }
      },
      onSaveState: () => this.saveState(),
      onImageChange: (img, _originalSrc, _newUrl) => {
        const wrapper = img.closest('.dashboard-component-wrapper');
        const componentId = wrapper?.dataset?.componentId;
        if (componentId && wrapper) {
          this.updateComponentContent(componentId, wrapper);
        }
      },
      notificationFn: (msg, type) => this.showNotification(msg, type),
      cssPrefix: 'db',
    });

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupDesignCustomization();
    this.setupSidebarToggles();
    this._setupCanvasEditing();
    this.renderCanvas();
    this.saveState();
    this.updateUndoRedoButtons();
    this.renderProjectsList();
    this.setupAI();
  }

  // ==========================================
  // AI INTEGRATION
  // ==========================================

  setupAI() {
    if (typeof AIUIController === 'undefined') return;
    this.aiController = new AIUIController(this, 'dashboard');
    this.aiController.init();
  }

  /**
   * AI生成されたHTMLをコンポーネントとして挿入
   * @param {string} html - 挿入するHTML
   * @param {string} [afterComponentId] - この後に挿入（省略時は末尾）
   */
  insertAIGeneratedSection(html, afterComponentId) {
    const newComponent = {
      id: 'ai-' + Date.now(),
      template: {
        name: 'AI生成コンポーネント',
        html: html,
        category: 'ai',
      },
      gridCol: DashboardGenerator.CONFIG.DEFAULT_GRID_COL,
    };

    if (afterComponentId) {
      const idx = this.components.findIndex(c => c.id === afterComponentId);
      if (idx !== -1) {
        this.components.splice(idx + 1, 0, newComponent);
      } else {
        this.components.push(newComponent);
      }
    } else {
      this.components.push(newComponent);
    }

    this.saveState();
    this.renderCanvas();
    this.showNotification('AI生成コンポーネントを追加しました');
  }

  /**
   * リソースの解放・イベントリスナーの削除
   */
  destroy() {
    this._boundListeners.forEach(({ target, event, handler, options }) => {
      target.removeEventListener(event, handler, options);
    });
    this._boundListeners = [];

    // テーマCSSを除去
    const themeStyle = document.getElementById('dash-theme-css');
    if (themeStyle) themeStyle.remove();

    // プレビューツールチップを除去
    const tooltip = document.getElementById('componentPreviewTooltip');
    if (tooltip) tooltip.remove();

    // 通知を除去
    const notification = document.querySelector('.db-notification');
    if (notification) notification.remove();
  }

  /**
   * イベントリスナーを登録し、参照を保持する（destroyで一括解除）
   */
  _addListener(target, event, handler, options) {
    target.addEventListener(event, handler, options);
    this._boundListeners.push({ target, event, handler, options });
  }

  // ==========================================
  // CommonEditor によるインライン編集セットアップ
  // ==========================================

  _setupCanvasEditing() {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) {
      setTimeout(() => this._setupCanvasEditing(), 500);
      return;
    }
    this.editor.setupInlineEditing(canvas);
    this.editor.setupImageEditing(canvas);
  }

  updateComponentContent(componentId, wrapper) {
    const component = this.components.find((c) => c.id === componentId);
    if (!component || !wrapper) return;

    // コントロールを除外したクローンからHTMLを取得
    const clone = wrapper.cloneNode(true);
    const controls = clone.querySelector('.component-controls');
    if (controls) controls.remove();

    const innerComponent = clone.firstElementChild;
    if (innerComponent) {
      component.template = {
        ...component.template,
        html: innerComponent.outerHTML,
      };
    }
  }

  // ==========================================
  // SIDEBAR TOGGLES
  // ==========================================

  setupSidebarToggles() {
    const toggleLeft = document.getElementById('toggleLeftSidebar');
    const toggleRight = document.getElementById('toggleRightSidebar');
    const builder = document.querySelector('.dashboard-builder');

    if (toggleLeft) {
      this._addListener(toggleLeft, 'click', () => {
        builder.classList.toggle('left-collapsed');
        CommonEditor.saveToStorage(
          'leftSidebarCollapsed',
          builder.classList.contains('left-collapsed')
        );
      });
    }

    if (toggleRight) {
      this._addListener(toggleRight, 'click', () => {
        builder.classList.toggle('right-collapsed');
        CommonEditor.saveToStorage(
          'rightSidebarCollapsed',
          builder.classList.contains('right-collapsed')
        );
      });
    }

    // 前回の状態を復元
    if (CommonEditor.loadFromStorage('leftSidebarCollapsed', false)) {
      builder?.classList.add('left-collapsed');
    }
    if (CommonEditor.loadFromStorage('rightSidebarCollapsed', false)) {
      builder?.classList.add('right-collapsed');
    }
  }

  // ==========================================
  // EVENT LISTENERS
  // ==========================================

  setupEventListeners() {
    // Layout selection
    document.querySelectorAll('.layout-btn').forEach((btn) => {
      this._addListener(btn, 'click', (e) => this.handleLayoutChange(e));
    });

    // Theme selection
    document.querySelectorAll('.theme-option').forEach((btn) => {
      this._addListener(btn, 'click', (e) => this.handleThemeChange(e));
    });

    // Component drag and preview
    document.querySelectorAll('.component-item').forEach((item) => {
      item.setAttribute('draggable', 'true');
      this._addListener(item, 'dragstart', (e) => this.handleComponentDragStart(e));
      this._addListener(item, 'dragend', (e) => this.handleComponentDragEnd(e));
      this._addListener(item, 'mouseenter', (e) => this.showComponentPreview(e));
      this._addListener(item, 'mouseleave', () => this.hideComponentPreview());
    });

    // プレビューツールチップ
    this.createPreviewTooltip();

    // Canvas drop
    const workspace = document.getElementById('canvasWorkspace');
    const canvas = document.getElementById('dashboardCanvas');

    if (workspace) {
      this._addListener(workspace, 'dragover', (e) => this.handleCanvasDragOver(e));
      this._addListener(workspace, 'drop', (e) => this.handleCanvasDrop(e));
    }

    if (canvas) {
      this._addListener(canvas, 'dragover', (e) => this.handleCanvasDragOver(e));
      this._addListener(canvas, 'drop', (e) => this.handleCanvasDrop(e));
    }

    // Quick start templates - イベント委譲
    this._addListener(document, 'click', (e) => {
      if (e.target.closest('.quick-start-btn')) {
        this.handleQuickStart(e);
      }
    });

    // Actions
    const previewCodeBtn = document.getElementById('previewCode');
    if (previewCodeBtn) this._addListener(previewCodeBtn, 'click', () => this.openCodePreview());

    const clearBtn = document.getElementById('clearDashboard');
    if (clearBtn) this._addListener(clearBtn, 'click', () => this.clearDashboard());

    const previewBtn = document.getElementById('previewDashboard');
    if (previewBtn) this._addListener(previewBtn, 'click', () => this.previewDashboard());

    // Code Preview Modal
    const closePreviewBtn = document.getElementById('closeCodePreview');
    if (closePreviewBtn)
      this._addListener(closePreviewBtn, 'click', () => this.closeCodePreview());

    const overlayEl = document.getElementById('codePreviewOverlay');
    if (overlayEl) this._addListener(overlayEl, 'click', () => this.closeCodePreview());

    const copyBtn = document.getElementById('copyCode');
    if (copyBtn) this._addListener(copyBtn, 'click', () => this.copyCode());

    const downloadBtn = document.getElementById('downloadCode');
    if (downloadBtn) this._addListener(downloadBtn, 'click', () => this.downloadGeneratedCode());

    document.querySelectorAll('.code-tab').forEach((tab) => {
      this._addListener(tab, 'click', (e) => this.switchCodeTab(e));
    });

    // Canvas controls
    document.querySelectorAll('.canvas-control').forEach((btn) => {
      const action = btn.dataset.action;
      if (action === 'undo') {
        this._addListener(btn, 'click', () => this.undo());
      } else if (action === 'redo') {
        this._addListener(btn, 'click', () => this.redo());
      }
    });

    // Keyboard shortcuts
    this._addListener(document, 'keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        this.redo();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        this.redo();
      }
    });

    // Zoom controls
    document.querySelectorAll('.zoom-btn').forEach((btn) => {
      this._addListener(btn, 'click', (e) => this.handleZoom(e));
    });

    const zoomSlider = document.getElementById('zoomSlider');
    if (zoomSlider) {
      this._addListener(zoomSlider, 'input', (e) => this.handleZoomSlider(e));
    }

    // Device preview toggles
    document.querySelectorAll('.device-preview-btn').forEach((btn) => {
      this._addListener(btn, 'click', (e) => this.handleDeviceChange(e));
    });

    // Initialize current zoom level
    this.currentZoom = DashboardGenerator.CONFIG.DEFAULT_ZOOM;

    // Grid Design Mode - Mode tabs
    document.querySelectorAll('.mode-tab').forEach((tab) => {
      this._addListener(tab, 'click', (e) => this.handleModeChange(e));
    });

    // Grid Templates
    document.querySelectorAll('.grid-template-btn').forEach((btn) => {
      this._addListener(btn, 'click', (e) => this.applyGridTemplate(e));
    });

    // Grid Row controls
    const addRowBtn = document.getElementById('addGridRow');
    if (addRowBtn) this._addListener(addRowBtn, 'click', () => this.addGridRow());

    const removeRowBtn = document.getElementById('removeGridRow');
    if (removeRowBtn) this._addListener(removeRowBtn, 'click', () => this.removeGridRow());

    const clearAreasBtn = document.getElementById('clearGridAreas');
    if (clearAreasBtn) this._addListener(clearAreasBtn, 'click', () => this.clearGridAreas());

    // プロジェクト管理ボタン
    const saveProjectBtn = document.getElementById('dbSaveProject');
    if (saveProjectBtn) this._addListener(saveProjectBtn, 'click', () => this.saveProject());

    const exportJSONBtn = document.getElementById('dbExportJSON');
    if (exportJSONBtn)
      this._addListener(exportJSONBtn, 'click', () => this.exportProjectAsJSON());

    const importJSONBtn = document.getElementById('dbImportJSON');
    if (importJSONBtn)
      this._addListener(importJSONBtn, 'click', () => this.importProjectFromJSON());

    // プロジェクト一覧のクリック（イベント委譲）
    const projectsList = document.getElementById('dbProjectsList');
    if (projectsList) {
      this._addListener(projectsList, 'click', (e) => {
        const deleteBtn = e.target.closest('[data-delete-project]');
        if (deleteBtn) {
          e.stopPropagation();
          this.deleteProject(deleteBtn.dataset.deleteProject);
          return;
        }
        const projectInfo = e.target.closest('.db-project-info');
        if (projectInfo) {
          const projectItem = projectInfo.closest('.db-project-item');
          if (projectItem) {
            this.loadProject(projectItem.dataset.projectId);
          }
        }
      });
    }

    // プロパティパネルのイベント委譲
    this._setupPropertiesPanelDelegation();
  }

  /**
   * プロパティパネルのonclickをイベント委譲に置き換え
   */
  _setupPropertiesPanelDelegation() {
    const propertiesPanel = document.getElementById('propertiesPanel');
    if (!propertiesPanel) return;

    this._addListener(propertiesPanel, 'click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;

      const action = btn.dataset.action;
      const componentId = btn.dataset.componentId;

      switch (action) {
        case 'close-properties':
          this.closePropertiesPanel();
          break;
        case 'duplicate':
          if (componentId) this.duplicateComponent(componentId);
          break;
        case 'delete':
          if (componentId) this.deleteComponent(componentId);
          break;
        case 'grid-quick':
          if (componentId && btn.dataset.gridCol) {
            this.changeGridColumn(componentId, parseInt(btn.dataset.gridCol));
          }
          break;
      }
    });

    this._addListener(propertiesPanel, 'change', (e) => {
      const select = e.target.closest('[data-action="grid-column-change"]');
      if (select) {
        const componentId = select.dataset.componentId;
        if (componentId) {
          this.changeGridColumn(componentId, parseInt(select.value));
        }
      }
    });
  }

  // ==========================================
  // DEVICE / LAYOUT / THEME
  // ==========================================

  handleDeviceChange(e) {
    const btn = e.currentTarget;
    const device = btn.dataset.device;

    document.querySelectorAll('.device-preview-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const workspace = document.getElementById('canvasWorkspace');
    workspace.className = 'canvas-workspace';

    if (device === 'mobile') {
      workspace.classList.add('device-mobile');
    } else if (device === 'tablet') {
      workspace.classList.add('device-tablet');
    }

    this.applyZoom(this.currentZoom || DashboardGenerator.CONFIG.DEFAULT_ZOOM);

    const deviceLabels = { desktop: 'デスクトップ', tablet: 'タブレット', mobile: 'モバイル' };
    this.showNotification(`プレビュー: ${deviceLabels[device] || device}`);
  }

  handleLayoutChange(e) {
    const btn = e.currentTarget;
    const layout = btn.dataset.layout;

    document.querySelectorAll('.layout-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    this.currentLayout = layout;
    this.renderCanvas();
    this.showNotification(`レイアウトを変更しました: ${layout}`);
  }

  handleThemeChange(e) {
    const btn = e.currentTarget;
    const theme = btn.dataset.theme;

    document.querySelectorAll('.theme-option').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    this.currentTheme = theme;
    this.applyTheme(theme);
    this.showNotification(`テーマを変更しました: ${theme}`);
  }

  applyTheme(theme) {
    const color = DashboardGenerator.CONFIG.THEME_COLORS[theme];
    if (color) {
      document.documentElement.style.setProperty('--db-primary', color);
    }
    // Darkテーマ時はbodyにクラスを追加してCSS側でダークモード適用
    document.body.classList.toggle('db-dark-mode', theme === 'dark');
  }

  // ==========================================
  // DRAG & DROP
  // ==========================================

  handleComponentDragStart(e) {
    const componentType = e.currentTarget.dataset.component;
    this.draggedComponent = componentType;
    e.currentTarget.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/html', componentType);
  }

  handleComponentDragEnd(e) {
    e.currentTarget.style.opacity = '1';

    const workspace = document.getElementById('canvasWorkspace');
    if (workspace) {
      workspace.classList.remove('drag-over');
    }
  }

  handleCanvasDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    const workspace = document.getElementById('canvasWorkspace');
    if (workspace && !workspace.classList.contains('drag-over')) {
      workspace.classList.add('drag-over');
    }
  }

  handleCanvasDrop(e) {
    e.preventDefault();

    const workspace = document.getElementById('canvasWorkspace');
    if (workspace) {
      workspace.classList.remove('drag-over');
    }

    if (!this.draggedComponent) return;

    const template = this._getTemplate(this.draggedComponent);
    if (!template) {
      this.showNotification('テンプレートが見つかりません', 'error');
      return;
    }

    this.addComponent(template, this.draggedComponent);
    this.draggedComponent = null;
  }

  /**
   * テンプレートを安全に取得する（ガード付き）
   */
  _getTemplate(type) {
    if (typeof dashboardTemplates === 'undefined') {
      console.error('dashboardTemplates が定義されていません');
      return null;
    }
    const template = dashboardTemplates[type];
    if (!template) {
      console.error('テンプレートが見つかりません:', type);
      return null;
    }
    return template;
  }

  // ==========================================
  // COMPONENT OPERATIONS
  // ==========================================

  addComponent(template, type) {
    const component = {
      id: CommonEditor.generateId('comp'),
      type: type,
      template: JSON.parse(JSON.stringify(template)),
      timestamp: Date.now(),
    };

    this.components.push(component);
    this.saveState();
    this.renderCanvas();
    this.showNotification(`${template.name}を追加しました`);
  }

  addComponentSilent(template, type) {
    const component = {
      id: CommonEditor.generateId('comp'),
      type: type,
      template: JSON.parse(JSON.stringify(template)),
      timestamp: Date.now(),
    };

    this.components.push(component);
  }

  duplicateComponent(componentId) {
    const component = this.components.find((c) => c.id === componentId);
    if (!component) return;

    const newComponent = {
      id: CommonEditor.generateId('comp'),
      type: component.type,
      template: JSON.parse(JSON.stringify(component.template)),
      timestamp: Date.now(),
    };

    const index = this.components.findIndex((c) => c.id === componentId);
    this.components.splice(index + 1, 0, newComponent);

    this.saveState();
    this.renderCanvas();
    this.closePropertiesPanel();
    this.showNotification(`${component.template.name}を複製しました`);
  }

  moveComponent(componentId, direction) {
    const index = this.components.findIndex((c) => c.id === componentId);
    if (index === -1) return;

    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= this.components.length) return;

    [this.components[index], this.components[newIndex]] = [
      this.components[newIndex],
      this.components[index],
    ];

    this.saveState();
    this.renderCanvas();
    this.showNotification('コンポーネントを移動しました');
  }

  deleteComponent(componentId) {
    this.components = this.components.filter((c) => c.id !== componentId);
    this.saveState();
    this.renderCanvas();
    this.showNotification('コンポーネントを削除しました');
  }

  selectComponent(componentId) {
    document.querySelectorAll('.dashboard-component-wrapper').forEach((el) => {
      el.classList.remove('selected');
    });

    const componentEl = document.querySelector(`[data-component-id="${CSS.escape(componentId)}"]`);
    if (componentEl) {
      componentEl.classList.add('selected');
    }

    this.selectedComponentId = componentId;
    this.showPropertiesPanel(componentId);
  }

  // ==========================================
  // RENDER CANVAS
  // ==========================================

  renderCanvas() {
    const canvas = document.getElementById('dashboardCanvas');

    // Grid Design Mode
    if (this.designMode === 'grid') {
      this.renderGridOverlay();
      return;
    }

    // Component Mode with Grid Areas
    if (this.gridAreas.length > 0) {
      this.renderComponentModeWithAreas();
      return;
    }

    if (this.components.length === 0) {
      canvas.innerHTML = `
        <div class="empty-canvas">
          <div class="empty-canvas-content">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
              <rect x="3" y="3" width="7" height="7" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="14" y="3" width="7" height="7" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="14" y="14" width="7" height="7" stroke-linecap="round" stroke-linejoin="round"/>
              <rect x="3" y="14" width="7" height="7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h3>ダッシュボードを作成しましょう</h3>
            <p>左側のコンポーネントをドラッグ&ドロップしてください</p>
            <div class="quick-start">
              <button class="quick-start-btn" data-template="analytics">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M3 3v18h18" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18 17V9" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13 17V5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8 17v-3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                アナリティクス
              </button>
              <button class="quick-start-btn" data-template="crm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                CRM
              </button>
              <button class="quick-start-btn" data-template="ecommerce">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="9" cy="21" r="1" stroke-linecap="round" stroke-linejoin="round"/>
                  <circle cx="20" cy="21" r="1" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Eコマース
              </button>
            </div>
          </div>
        </div>
      `;
      return;
    }

    // コンポーネントグリッド生成
    const grid = document.createElement('div');
    grid.className = 'dashboard-grid';

    this.components.forEach((component) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'dashboard-component-wrapper';
      wrapper.dataset.componentId = component.id;
      wrapper.setAttribute('draggable', 'true');

      // コントロールボタン
      const controls = document.createElement('div');
      controls.className = 'component-controls';
      controls.innerHTML = `
        <button class="component-control" data-action="move-up" title="上へ移動">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="component-control" data-action="move-down" title="下へ移動">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button class="component-control" data-action="delete" title="削除">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      `;

      wrapper.appendChild(controls);

      // テンプレートHTML挿入
      const content = document.createElement('div');
      content.innerHTML = component.template.html;

      const componentElement = content.firstElementChild;
      if (componentElement) {
        const templateGridColMatch = componentElement.className.match(/grid-col-(\d+)/);
        const templateGridCol = templateGridColMatch ? parseInt(templateGridColMatch[1], 10) : null;

        componentElement.className = componentElement.className.replace(/grid-col-\d+/g, '').trim();
        wrapper.appendChild(componentElement);

        const gridCol =
          component.gridCol || templateGridCol || this.getDefaultGridCol(component.type);
        wrapper.classList.add(`grid-col-${gridCol}`);
      }

      grid.appendChild(wrapper);
    });

    // レイアウトラッパー適用
    canvas.innerHTML = '';

    if (this.currentLayout === 'sidebar-left') {
      const layoutContainer = document.createElement('div');
      layoutContainer.className = 'db-layout-sidebar-left';
      layoutContainer.innerHTML = `
        <aside class="db-sidebar">
          <div class="db-sidebar-header">
            <h2>Dashboard</h2>
          </div>
          <nav class="db-sidebar-nav">
            <a href="#" class="db-nav-item active">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              <span>Overview</span>
            </a>
            <a href="#" class="db-nav-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
              <span>Analytics</span>
            </a>
          </nav>
        </aside>
        <main class="db-main"></main>
      `;
      layoutContainer.querySelector('.db-main').appendChild(grid);
      canvas.appendChild(layoutContainer);
    } else if (this.currentLayout === 'topbar') {
      const layoutContainer = document.createElement('div');
      layoutContainer.className = 'db-layout-topbar';
      layoutContainer.innerHTML = `
        <header class="db-topbar">
          <div class="db-topbar-brand">Dashboard</div>
          <nav class="db-topbar-nav">
            <a href="#" class="db-topbar-link active">Overview</a>
            <a href="#" class="db-topbar-link">Analytics</a>
            <a href="#" class="db-topbar-link">Reports</a>
          </nav>
        </header>
        <main class="db-main-topbar"></main>
      `;
      layoutContainer.querySelector('.db-main-topbar').appendChild(grid);
      canvas.appendChild(layoutContainer);
    } else if (this.currentLayout === 'sidebar-top') {
      const layoutContainer = document.createElement('div');
      layoutContainer.className = 'db-layout-sidebar-top';
      layoutContainer.innerHTML = `
        <header class="db-header-bar">
          <div class="db-header-brand">Dashboard</div>
          <div class="db-header-actions">
            <button class="db-header-btn">Settings</button>
          </div>
        </header>
        <div class="db-sidebar-content-wrapper">
          <aside class="db-sidebar-mini">
            <nav class="db-sidebar-nav-mini">
              <a href="#" class="db-nav-icon active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
              </a>
              <a href="#" class="db-nav-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
              </a>
            </nav>
          </aside>
          <main class="db-main-sidebar-top"></main>
        </div>
      `;
      layoutContainer.querySelector('.db-main-sidebar-top').appendChild(grid);
      canvas.appendChild(layoutContainer);
    } else {
      // Default: no layout wrapper
      canvas.appendChild(grid);
    }

    // コンポーネントコントロール・ドラッグリスナー
    this.attachComponentControls();
    this.attachDragListeners();

    // AIカスタマイズボタンをコンポーネントコントロールに追加
    if (this.aiController) {
      document.querySelectorAll('.dashboard-component-wrapper').forEach(wrapper => {
        this.aiController.addAIButtonToSectionControls(wrapper);
      });
    }
  }

  // ==========================================
  // COMPONENT CONTROLS & DRAG
  // ==========================================

  attachComponentControls() {
    document.querySelectorAll('.component-control').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const action = e.currentTarget.dataset.action;
        const componentEl = e.currentTarget.closest('.dashboard-component-wrapper');
        const componentId = componentEl.dataset.componentId;

        if (action === 'delete') {
          this.deleteComponent(componentId);
        } else if (action === 'move-up') {
          this.moveComponent(componentId, -1);
        } else if (action === 'move-down') {
          this.moveComponent(componentId, 1);
        }
      });
    });

    // Click on component to select
    document.querySelectorAll('.dashboard-component-wrapper').forEach((wrapper) => {
      wrapper.addEventListener('click', (e) => {
        if (e.target.closest('.component-controls')) return;
        const componentId = wrapper.dataset.componentId;
        this.selectComponent(componentId);
      });
    });
  }

  attachDragListeners() {
    const wrappers = document.querySelectorAll('.dashboard-component-wrapper');

    wrappers.forEach((wrapper) => {
      wrapper.addEventListener('dragstart', (e) => {
        wrapper.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', wrapper.dataset.componentId);
      });

      wrapper.addEventListener('dragend', () => {
        wrapper.classList.remove('dragging');
      });

      wrapper.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const dragging = document.querySelector('.dragging');
        if (!dragging || dragging === wrapper) return;

        const rect = wrapper.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;

        if (e.clientY < midpoint) {
          wrapper.parentNode.insertBefore(dragging, wrapper);
        } else {
          wrapper.parentNode.insertBefore(dragging, wrapper.nextSibling);
        }
      });

      wrapper.addEventListener('drop', (e) => {
        e.preventDefault();
        this.syncComponentsFromDOM();
      });
    });
  }

  syncComponentsFromDOM() {
    const wrappers = document.querySelectorAll('.dashboard-component-wrapper');
    const newOrder = [];

    wrappers.forEach((wrapper) => {
      const componentId = wrapper.dataset.componentId;
      const component = this.components.find((c) => c.id === componentId);
      if (component) {
        newOrder.push(component);
      }
    });

    this.components = newOrder;
    this.saveState();
    this.showNotification('コンポーネントを並べ替えました');
  }

  // ==========================================
  // PROPERTIES PANEL
  // ==========================================

  showPropertiesPanel(componentId) {
    const component = this.components.find((c) => c.id === componentId);
    if (!component) return;

    const propertiesPanel = document.getElementById('propertiesPanel');
    if (!propertiesPanel) return;

    const currentGridCol = component.gridCol || this.getDefaultGridCol(component.type);
    const safeName = CommonEditor.sanitizeHTML(component.template.name);
    const safeCategory = CommonEditor.sanitizeHTML(component.template.category || 'data');
    const safeId = CommonEditor.sanitizeHTML(component.id);
    const escapedId = CommonEditor.sanitizeAttribute(component.id);

    const gridOptions = [3, 4, 5, 6, 7, 8, 9, 10, 12];
    const gridPercents = { 3: '25%', 4: '33%', 5: '42%', 6: '50%', 7: '58%', 8: '67%', 9: '75%', 10: '83%', 12: '100%' };
    const optionsHTML = gridOptions
      .map(
        (val) =>
          `<option value="${val}" ${currentGridCol === val ? 'selected' : ''}>${val}/12 (${gridPercents[val]})</option>`
      )
      .join('');

    propertiesPanel.innerHTML = `
      <div class="properties-header">
        <h4>${safeName}</h4>
        <button class="properties-close" data-action="close-properties">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>

      <div class="properties-body">
        <div class="property-group">
          <label class="property-label">グリッド幅</label>
          <div class="grid-column-selector">
            <div class="grid-column-visual">
              ${this.generateGridVisual(currentGridCol)}
            </div>
            <div class="grid-column-controls">
              <select class="property-select" data-action="grid-column-change" data-component-id="${escapedId}">
                ${optionsHTML}
              </select>
              <div class="grid-quick-buttons">
                <button class="grid-quick-btn ${currentGridCol === 4 ? 'active' : ''}" data-action="grid-quick" data-component-id="${escapedId}" data-grid-col="4">1/3</button>
                <button class="grid-quick-btn ${currentGridCol === 6 ? 'active' : ''}" data-action="grid-quick" data-component-id="${escapedId}" data-grid-col="6">1/2</button>
                <button class="grid-quick-btn ${currentGridCol === 12 ? 'active' : ''}" data-action="grid-quick" data-component-id="${escapedId}" data-grid-col="12">Full</button>
              </div>
            </div>
          </div>
        </div>

        <div class="property-divider"></div>

        <div class="property-group">
          <label class="property-label">カテゴリー</label>
          <div class="property-value">${safeCategory}</div>
        </div>

        <div class="property-group">
          <label class="property-label">コンポーネントID</label>
          <div class="property-value property-id">${safeId}</div>
        </div>

        <div class="property-divider"></div>

        <div class="property-actions">
          <button class="property-btn property-btn-primary" data-action="duplicate" data-component-id="${escapedId}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            複製
          </button>
          <button class="property-btn property-btn-danger" data-action="delete" data-component-id="${escapedId}">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            </svg>
            削除
          </button>
        </div>
      </div>
    `;

    propertiesPanel.style.display = 'block';
  }

  generateGridVisual(cols) {
    let html = '';
    for (let i = 1; i <= DashboardGenerator.CONFIG.GRID_COLUMNS; i++) {
      const isActive = i <= cols;
      html += `<div class="grid-col-block ${isActive ? 'active' : ''}"></div>`;
    }
    return html;
  }

  getDefaultGridCol(type) {
    return (
      DashboardGenerator.CONFIG.GRID_COL_DEFAULTS[type] ||
      DashboardGenerator.CONFIG.DEFAULT_GRID_COL
    );
  }

  changeGridColumn(componentId, newCol) {
    const component = this.components.find((c) => c.id === componentId);
    if (!component) return;

    component.gridCol = parseInt(newCol);
    this.saveState();
    this.renderCanvas();

    setTimeout(() => {
      this.selectComponent(componentId);
    }, 50);

    this.showNotification(`グリッド幅を ${newCol}/${DashboardGenerator.CONFIG.GRID_COLUMNS} に変更しました`);
  }

  closePropertiesPanel() {
    const propertiesPanel = document.getElementById('propertiesPanel');
    if (propertiesPanel) {
      propertiesPanel.style.display = 'none';
    }

    document.querySelectorAll('.dashboard-component-wrapper').forEach((el) => {
      el.classList.remove('selected');
    });

    this.selectedComponentId = null;
  }

  // ==========================================
  // QUICK START & TEMPLATES
  // ==========================================

  handleQuickStart(e) {
    const btn = e.target.closest('.quick-start-btn');
    if (!btn) return;

    const template = btn.dataset.template;
    this.applyTemplate(template);
  }

  applyTemplate(templateName) {
    const componentTypes =
      DashboardGenerator.CONFIG.QUICK_START_TEMPLATES[templateName] || [];

    this.components = [];
    componentTypes.forEach((type) => {
      const template = this._getTemplate(type);
      if (template) {
        this.addComponentSilent(template, type);
      }
    });

    this.renderCanvas();
    this.showNotification(`${templateName}テンプレートを適用しました`);
  }

  // ==========================================
  // EXPORT & CODE PREVIEW
  // ==========================================

  async exportDashboard() {
    const hasContent = this.hasExportableContent();
    if (!hasContent) {
      this.showNotification('エクスポートするコンポーネントがありません', 'error');
      return;
    }

    this.showNotification('エクスポート中...', 'info');
    const html = await this.generateFullHTML();
    this.downloadFile(html, `dashboard-${Date.now()}.html`, 'text/html');
    this.showNotification('ダッシュボードをエクスポートしました');
  }

  hasExportableContent() {
    if (this.components.length > 0) return true;
    if (this.gridAreas.some((area) => area.components && area.components.length > 0)) return true;
    return false;
  }

  async openCodePreview() {
    const hasContent = this.hasExportableContent();
    if (!hasContent) {
      this.showNotification('プレビューするコンポーネントがありません', 'error');
      return;
    }

    const modal = document.getElementById('codePreviewModal');
    if (!modal) return;

    if (this.gridAreas.length > 0) {
      this.generatedHTML = this.generateGridAreasHTML();
    } else {
      this.generatedHTML = this.components.map((c) => c.template.html).join('\n\n');
    }
    this.generatedCSS = await this.fetchCSS();
    this.generatedFullHTML = await this.generateFullHTML();

    this.currentCodeTab = 'html';
    this.updateCodePreview();

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeCodePreview() {
    const modal = document.getElementById('codePreviewModal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  switchCodeTab(e) {
    const tab = e.currentTarget;
    const tabType = tab.dataset.tab;

    document.querySelectorAll('.code-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    this.currentCodeTab = tabType;
    this.updateCodePreview();
  }

  updateCodePreview() {
    const codeElement = document.getElementById('codePreviewContent');
    if (!codeElement) return;

    let code = '';
    switch (this.currentCodeTab) {
      case 'html':
        code = this.formatHTML(this.generatedHTML);
        break;
      case 'css':
        code = this.generatedCSS;
        break;
      case 'full':
        code = this.generatedFullHTML;
        break;
    }

    codeElement.textContent = code;
  }

  formatHTML(html) {
    return html.replace(/></g, '>\n<').replace(/(\s+)/g, ' ').trim();
  }

  async fetchCSS() {
    try {
      const css = await fetch('css/dashboard-components.css').then((r) => {
        if (!r.ok) throw new Error(`CSS取得失敗: ${r.status}`);
        return r.text();
      });
      return css;
    } catch (e) {
      console.warn('CSS読み込みエラー:', e.message);
      this.showNotification('CSSの読み込みに失敗しました', 'error');
      return '/* CSS could not be loaded */';
    }
  }

  async copyCode() {
    let code = '';
    switch (this.currentCodeTab) {
      case 'html':
        code = this.generatedHTML;
        break;
      case 'css':
        code = this.generatedCSS;
        break;
      case 'full':
        code = this.generatedFullHTML;
        break;
    }

    try {
      await navigator.clipboard.writeText(code);
      this.showNotification('コードをコピーしました');
    } catch (e) {
      this.showNotification('コピーに失敗しました', 'error');
    }
  }

  downloadGeneratedCode() {
    let code = '';
    let filename = '';
    let mimeType = 'text/plain';

    switch (this.currentCodeTab) {
      case 'html':
        code = this.generatedHTML;
        filename = `dashboard-components-${Date.now()}.html`;
        mimeType = 'text/html';
        break;
      case 'css':
        code = this.generatedCSS;
        filename = `dashboard-styles-${Date.now()}.css`;
        mimeType = 'text/css';
        break;
      case 'full':
        code = this.generatedFullHTML;
        filename = `dashboard-${Date.now()}.html`;
        mimeType = 'text/html';
        break;
    }

    this.downloadFile(code, filename, mimeType);
    this.showNotification('ダウンロードしました');
  }

  // ==========================================
  // GRID AREAS HTML/CSS GENERATION
  // ==========================================

  generateGridAreasHTML() {
    const gridCSS = this.generateGridAreasCSS();
    let html = `<!-- Grid Layout Generated by Dashboard Generator -->\n`;
    html += `<style>\n${gridCSS}\n</style>\n\n`;
    html += `<div class="grid-areas-container">\n`;

    this.gridAreas.forEach((area) => {
      const areaClass = `grid-area-${area.id}`;
      html += `  <div class="${areaClass}" style="grid-column: ${area.startCol} / ${area.endCol + 1}; grid-row: ${area.startRow} / ${area.endRow + 1};">\n`;

      if (area.components && area.components.length > 0) {
        area.components.forEach((comp) => {
          const template = this._getTemplate(comp.type);
          if (template) {
            html += `    ${template.html.trim()}\n`;
          }
        });
      } else {
        html += `    <!-- Empty Area: ${CommonEditor.sanitizeHTML(area.name)} -->\n`;
      }

      html += `  </div>\n`;
    });

    html += `</div>`;
    return html;
  }

  generateGridAreasCSS() {
    let css = `.grid-areas-container {\n`;
    css += `  display: grid;\n`;
    css += `  grid-template-columns: repeat(${DashboardGenerator.CONFIG.GRID_COLUMNS}, 1fr);\n`;
    css += `  grid-template-rows: repeat(${this.gridRows}, minmax(100px, auto));\n`;
    css += `  gap: var(--grid-gap, 24px);\n`;
    css += `  padding: var(--grid-padding, 24px);\n`;
    css += `  background: #f8fafc;\n`;
    css += `  min-height: 100%;\n`;
    css += `}\n\n`;

    this.gridAreas.forEach((area) => {
      const areaClass = `.grid-area-${area.id}`;
      css += `${areaClass} {\n`;
      css += `  background: #ffffff;\n`;
      css += `  border: 1px solid #e2e8f0;\n`;
      css += `  border-radius: 12px;\n`;
      css += `  padding: 16px;\n`;
      css += `  min-height: 80px;\n`;
      css += `}\n\n`;
    });

    return css;
  }

  generateGridAreasContentHTML() {
    let html = '';
    this.gridAreas.forEach((area) => {
      const areaClass = `grid-area-${area.id}`;
      html += `<div class="${areaClass}" style="grid-column: ${area.startCol} / ${area.endCol + 1}; grid-row: ${area.startRow} / ${area.endRow + 1};">\n`;

      if (area.components && area.components.length > 0) {
        area.components.forEach((comp) => {
          const template = this._getTemplate(comp.type);
          if (template) {
            html += `  ${template.html.trim()}\n`;
          }
        });
      }

      html += `</div>\n`;
    });
    return html;
  }

  async generateFullHTML() {
    let componentsHTML = '';
    let gridAreasCSS = '';

    if (
      this.gridAreas.length > 0 &&
      this.gridAreas.some((a) => a.components && a.components.length > 0)
    ) {
      componentsHTML = this.generateGridAreasContentHTML();
      gridAreasCSS = this.generateGridAreasCSS();
    } else if (this.components.length > 0) {
      componentsHTML = this.components.map((c) => c.template.html).join('\n');
    }

    // CSS取得
    let embeddedCSS = '';
    try {
      const [designSystemCSS, dashboardCSS, generatorCSS] = await Promise.all([
        fetch('css/design-system.css').then((r) => {
          if (!r.ok) throw new Error(`design-system.css: ${r.status}`);
          return r.text();
        }),
        fetch('css/dashboard-components.css').then((r) => {
          if (!r.ok) throw new Error(`dashboard-components.css: ${r.status}`);
          return r.text();
        }),
        fetch('css/dashboard-generator.css').then((r) => {
          if (!r.ok) throw new Error(`dashboard-generator.css: ${r.status}`);
          return r.text();
        }),
      ]);

      const layoutCSS = `
/* Dashboard Layout Styles */
.db-layout-sidebar-left {
    display: grid;
    grid-template-columns: 240px 1fr;
    min-height: 100vh;
    background: #f8fafc;
    gap: 0;
}

.db-sidebar {
    background: #1e293b;
    color: white;
    padding: 20px;
    border-right: 1px solid #e2e8f0;
}

.db-sidebar-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.db-sidebar-header h2 {
    font-size: 20px;
    font-weight: 700;
    margin: 0;
}

.db-sidebar-nav {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.db-nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 14px;
}

.db-nav-item:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.db-nav-item.active {
    background: #3b82f6;
    color: white;
}

.db-nav-item svg {
    flex-shrink: 0;
}

.db-main {
    padding: 0;
    overflow: auto;
}

.db-layout-topbar {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f8fafc;
}

.db-topbar {
    background: #1e293b;
    color: white;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 32px;
    border-bottom: 1px solid #e2e8f0;
}

.db-topbar-brand {
    font-size: 20px;
    font-weight: 700;
}

.db-topbar-nav {
    display: flex;
    gap: 16px;
}

.db-topbar-link {
    padding: 8px 16px;
    border-radius: 6px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.2s ease;
    font-size: 14px;
}

.db-topbar-link:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.db-topbar-link.active {
    background: #3b82f6;
    color: white;
}

.db-main-topbar {
    flex: 1;
    padding: 0;
    overflow: auto;
}

.db-layout-sidebar-top {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background: #f8fafc;
}

.db-header-bar {
    background: white;
    border-bottom: 1px solid #e2e8f0;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.db-header-brand {
    font-size: 20px;
    font-weight: 700;
    color: #1e293b;
}

.db-sidebar-content-wrapper {
    display: grid;
    grid-template-columns: 60px 1fr;
    flex: 1;
}

.db-sidebar-mini {
    background: #1e293b;
    padding: 16px;
    border-right: 1px solid #e2e8f0;
}

.db-sidebar-nav-mini {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.db-nav-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    color: rgba(255, 255, 255, 0.7);
    text-decoration: none;
    transition: all 0.2s ease;
}

.db-nav-icon:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
}

.db-nav-icon.active {
    background: #3b82f6;
    color: white;
}

.db-main-sidebar-top {
    padding: 0;
    overflow: auto;
}
`;

      embeddedCSS = designSystemCSS + '\n' + dashboardCSS + '\n' + generatorCSS + '\n' + layoutCSS;
      if (gridAreasCSS) {
        embeddedCSS += '\n/* Grid Areas Styles */\n' + gridAreasCSS;
      }
    } catch (error) {
      console.warn('CSS取得エラー:', error.message);
      this.showNotification('一部のCSSの読み込みに失敗しました', 'error');
      embeddedCSS = `
        :root {
            --space-1: 4px; --space-2: 8px; --space-3: 12px; --space-4: 16px;
            --space-5: 20px; --space-6: 24px; --text-sm: 14px; --text-base: 16px;
            --text-lg: 18px; --text-xl: 20px; --text-4xl: 36px; --font-normal: 400;
            --font-medium: 500; --font-semibold: 600; --font-bold: 700;
            --radius-md: 6px; --radius-lg: 8px; --radius-xl: 12px;
        }
        * { box-sizing: border-box; }
        body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background: #f8fafc; }
        .dashboard-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 8px; padding: 24px; }
        .grid-col-1 { grid-column: span 1; } .grid-col-2 { grid-column: span 2; }
        .grid-col-3 { grid-column: span 3; } .grid-col-4 { grid-column: span 4; }
        .grid-col-5 { grid-column: span 5; } .grid-col-6 { grid-column: span 6; }
        .grid-col-7 { grid-column: span 7; } .grid-col-8 { grid-column: span 8; }
        .grid-col-9 { grid-column: span 9; } .grid-col-10 { grid-column: span 10; }
        .grid-col-11 { grid-column: span 11; } .grid-col-12 { grid-column: span 12; }
        .db-layout-sidebar-left { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; gap: 0; }
        .db-sidebar { background: #1e293b; color: white; padding: 20px; }
        .db-sidebar-header { margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid rgba(255, 255, 255, 0.1); }
        .db-sidebar-header h2 { font-size: 20px; font-weight: 700; margin: 0; }
        .db-sidebar-nav { display: flex; flex-direction: column; gap: 8px; }
        .db-nav-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: 8px; color: rgba(255, 255, 255, 0.7); text-decoration: none; font-size: 14px; }
        .db-nav-item.active { background: #3b82f6; color: white; }
        .db-main { padding: 0; overflow: auto; }
      `;
    }

    // レイアウトラッパーHTML
    let bodyContent = '';
    const gridContainerClass =
      this.gridAreas.length > 0 &&
      this.gridAreas.some((a) => a.components && a.components.length > 0)
        ? 'grid-areas-container'
        : 'dashboard-grid';
    const gridContent = `<div class="${gridContainerClass}">${componentsHTML}</div>`;

    if (this.currentLayout === 'sidebar-left') {
      bodyContent = `
        <div class="db-layout-sidebar-left">
          <aside class="db-sidebar">
            <div class="db-sidebar-header"><h2>Dashboard</h2></div>
            <nav class="db-sidebar-nav">
              <a href="#" class="db-nav-item active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                <span>Overview</span>
              </a>
            </nav>
          </aside>
          <main class="db-main">${gridContent}</main>
        </div>
      `;
    } else if (this.currentLayout === 'topbar') {
      bodyContent = `
        <div class="db-layout-topbar">
          <header class="db-topbar">
            <div class="db-topbar-brand">Dashboard</div>
            <nav class="db-topbar-nav">
              <a href="#" class="db-topbar-link active">Overview</a>
              <a href="#" class="db-topbar-link">Analytics</a>
            </nav>
          </header>
          <main class="db-main-topbar">${gridContent}</main>
        </div>
      `;
    } else if (this.currentLayout === 'sidebar-top') {
      bodyContent = `
        <div class="db-layout-sidebar-top">
          <header class="db-header-bar">
            <div class="db-header-brand">Dashboard</div>
          </header>
          <div class="db-sidebar-content-wrapper">
            <aside class="db-sidebar-mini">
              <nav class="db-sidebar-nav-mini">
                <a href="#" class="db-nav-icon active">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                </a>
              </nav>
            </aside>
            <main class="db-main-sidebar-top">${gridContent}</main>
          </div>
        </div>
      `;
    } else {
      bodyContent = `<div class="dashboard-container">${gridContent}</div>`;
    }

    return `<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
${embeddedCSS}
    </style>
</head>
<body>
    ${bodyContent}
</body>
</html>`;
  }

  // ==========================================
  // DASHBOARD OPERATIONS
  // ==========================================

  clearDashboard() {
    if (this.components.length === 0) return;

    if (confirm('すべてのコンポーネントを削除してもよろしいですか？')) {
      this.components = [];
      this.history = [];
      this.historyIndex = -1;
      this.renderCanvas();
      this.showNotification('ダッシュボードをクリアしました');
    }
  }

  // ==========================================
  // プロジェクト管理（保存/読込/削除/エクスポート/インポート）
  // ==========================================

  /**
   * プロジェクト名を入力させる
   */
  _promptProjectName(defaultName = '') {
    const name = prompt('プロジェクト名を入力してください:', defaultName);
    if (!name || !name.trim()) return null;
    return name.trim();
  }

  /**
   * 現在のダッシュボード状態をプロジェクトとして保存
   */
  saveProject() {
    const name = this._promptProjectName();
    if (!name) return;

    const project = {
      id: CommonEditor.generateId('proj'),
      name: name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      components: JSON.parse(JSON.stringify(this.components)),
      gridAreas: JSON.parse(JSON.stringify(this.gridAreas)),
      gridRows: this.gridRows,
      currentLayout: this.currentLayout,
      currentTheme: this.currentTheme,
      designSettings: { ...this.designSettings },
    };

    const projects = CommonEditor.loadFromStorage('db-generator-projects', []);
    projects.unshift(project);
    CommonEditor.saveToStorage('db-generator-projects', projects);
    this.showNotification('プロジェクトを保存しました', 'success');
    this.renderProjectsList();
  }

  /**
   * プロジェクトを読み込む
   */
  loadProject(projectId) {
    const projects = CommonEditor.loadFromStorage('db-generator-projects', []);
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      this.showNotification('プロジェクトが見つかりません', 'error');
      return;
    }

    if (
      this.components.length > 0 &&
      !confirm('現在のダッシュボードは破棄されます。よろしいですか？')
    ) {
      return;
    }

    this.components = JSON.parse(JSON.stringify(project.components || []));
    this.gridAreas = JSON.parse(JSON.stringify(project.gridAreas || []));
    this.gridRows = project.gridRows || DashboardGenerator.CONFIG.DEFAULT_GRID_ROWS;
    this.currentLayout = project.currentLayout || DashboardGenerator.CONFIG.DEFAULT_LAYOUT;
    this.currentTheme = project.currentTheme || DashboardGenerator.CONFIG.DEFAULT_THEME;

    if (project.designSettings) {
      this.designSettings = { ...this.designSettings, ...project.designSettings };
    }

    // レイアウト・テーマUIを同期
    document.querySelectorAll('.layout-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.layout === this.currentLayout);
    });
    document.querySelectorAll('.theme-option').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.theme === this.currentTheme);
    });
    this.applyTheme(this.currentTheme);

    this.history = [];
    this.historyIndex = -1;
    this.saveState();
    this.renderCanvas();
    this.showNotification(`「${CommonEditor.sanitizeHTML(project.name)}」を読み込みました`, 'success');
  }

  /**
   * プロジェクトを削除
   */
  deleteProject(projectId) {
    if (!confirm('このプロジェクトを削除してもよろしいですか？')) return;

    let projects = CommonEditor.loadFromStorage('db-generator-projects', []);
    projects = projects.filter((p) => p.id !== projectId);
    CommonEditor.saveToStorage('db-generator-projects', projects);
    this.showNotification('プロジェクトを削除しました', 'info');
    this.renderProjectsList();
  }

  /**
   * プロジェクト一覧をサイドバーにレンダリング
   */
  renderProjectsList() {
    const container = document.getElementById('dbProjectsList');
    if (!container) return;

    const projects = CommonEditor.loadFromStorage('db-generator-projects', []);

    if (projects.length === 0) {
      container.innerHTML = '<p class="db-projects-empty">保存されたプロジェクトはありません</p>';
      return;
    }

    container.innerHTML = projects
      .map((project) => {
        const safeName = CommonEditor.sanitizeHTML(project.name);
        const safeId = CommonEditor.sanitizeAttribute(project.id);
        const date = new Date(project.updatedAt || project.createdAt);
        const dateStr = `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
        const componentCount = (project.components || []).length;
        return `
          <div class="db-project-item" data-project-id="${safeId}">
            <div class="db-project-info" role="button" tabindex="0" aria-label="${safeName}を読み込む">
              <span class="db-project-name">${safeName}</span>
              <span class="db-project-meta">${dateStr} - ${componentCount}個のコンポーネント</span>
            </div>
            <button class="db-project-delete db-icon-btn" data-delete-project="${safeId}" aria-label="${safeName}を削除">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
              </svg>
            </button>
          </div>`;
      })
      .join('');
  }

  /**
   * 現在のダッシュボード状態をJSONエクスポート
   */
  exportProjectAsJSON() {
    const project = {
      name: 'Dashboard Export',
      exportedAt: new Date().toISOString(),
      components: JSON.parse(JSON.stringify(this.components)),
      gridAreas: JSON.parse(JSON.stringify(this.gridAreas)),
      gridRows: this.gridRows,
      currentLayout: this.currentLayout,
      currentTheme: this.currentTheme,
      designSettings: { ...this.designSettings },
    };

    const json = JSON.stringify(project, null, 2);
    this.downloadFile(json, `dashboard-project-${Date.now()}.json`, 'application/json');
    this.showNotification('JSONをエクスポートしました', 'success');
  }

  /**
   * JSONファイルからプロジェクトをインポート
   */
  importProjectFromJSON() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const project = JSON.parse(ev.target.result);

          // 基本的なバリデーション
          if (!project.components || !Array.isArray(project.components)) {
            throw new Error('無効なプロジェクトデータです');
          }

          if (
            this.components.length > 0 &&
            !confirm('現在のダッシュボードは破棄されます。よろしいですか？')
          ) {
            return;
          }

          this.components = JSON.parse(JSON.stringify(project.components));
          this.gridAreas = JSON.parse(JSON.stringify(project.gridAreas || []));
          this.gridRows = project.gridRows || DashboardGenerator.CONFIG.DEFAULT_GRID_ROWS;
          this.currentLayout = project.currentLayout || DashboardGenerator.CONFIG.DEFAULT_LAYOUT;
          this.currentTheme = project.currentTheme || DashboardGenerator.CONFIG.DEFAULT_THEME;

          if (project.designSettings) {
            this.designSettings = { ...this.designSettings, ...project.designSettings };
          }

          this.applyTheme(this.currentTheme);

          this.history = [];
          this.historyIndex = -1;
          this.saveState();
          this.renderCanvas();
          this.showNotification('プロジェクトをインポートしました', 'success');
        } catch (err) {
          console.error('JSONインポートエラー:', err);
          this.showNotification('JSONファイルの読み込みに失敗しました', 'error');
        }
      };
      reader.readAsText(file);
    });
    input.click();
  }

  async previewDashboard() {
    if (this.components.length === 0) {
      this.showNotification('プレビューするコンポーネントがありません', 'error');
      return;
    }

    this.showNotification('プレビュー準備中...', 'info');
    const html = await this.generateFullHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    this.showNotification('プレビューを開きました');
  }

  // ==========================================
  // HISTORY (UNDO/REDO)
  // ==========================================

  saveState() {
    const state = {
      components: JSON.parse(JSON.stringify(this.components)),
      gridAreas: JSON.parse(JSON.stringify(this.gridAreas)),
      gridRows: this.gridRows,
    };

    this.history = this.history.slice(0, this.historyIndex + 1);
    this.history.push(state);
    this.historyIndex++;

    const maxHistory = DashboardGenerator.CONFIG.MAX_HISTORY_SIZE;
    if (this.history.length > maxHistory) {
      this.history.shift();
      this.historyIndex--;
    }

    this.updateUndoRedoButtons();
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      const state = this.history[this.historyIndex];
      this.components = JSON.parse(JSON.stringify(state.components));
      this.gridAreas = JSON.parse(JSON.stringify(state.gridAreas || []));
      this.gridRows = state.gridRows || DashboardGenerator.CONFIG.DEFAULT_GRID_ROWS;
      this.renderCanvas();
      this.updateUndoRedoButtons();
      this.showNotification('元に戻しました');
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      const state = this.history[this.historyIndex];
      this.components = JSON.parse(JSON.stringify(state.components));
      this.gridAreas = JSON.parse(JSON.stringify(state.gridAreas || []));
      this.gridRows = state.gridRows || DashboardGenerator.CONFIG.DEFAULT_GRID_ROWS;
      this.renderCanvas();
      this.updateUndoRedoButtons();
      this.showNotification('やり直しました');
    }
  }

  updateUndoRedoButtons() {
    const undoBtn = document.querySelector('.canvas-control[data-action="undo"]');
    const redoBtn = document.querySelector('.canvas-control[data-action="redo"]');

    if (undoBtn) {
      undoBtn.disabled = this.historyIndex <= 0;
      undoBtn.style.opacity = this.historyIndex <= 0 ? '0.4' : '1';
    }
    if (redoBtn) {
      redoBtn.disabled = this.historyIndex >= this.history.length - 1;
      redoBtn.style.opacity = this.historyIndex >= this.history.length - 1 ? '0.4' : '1';
    }
  }

  // ==========================================
  // ZOOM
  // ==========================================

  handleZoom(e) {
    const action = e.currentTarget.dataset.action;
    let currentZoom = this.currentZoom || DashboardGenerator.CONFIG.DEFAULT_ZOOM;
    const { ZOOM_MIN, ZOOM_MAX, ZOOM_STEP } = DashboardGenerator.CONFIG;

    if (action === 'zoom-in' && currentZoom < ZOOM_MAX) {
      currentZoom += ZOOM_STEP;
    } else if (action === 'zoom-out' && currentZoom > ZOOM_MIN) {
      currentZoom -= ZOOM_STEP;
    }

    this.applyZoom(currentZoom);

    const slider = document.getElementById('zoomSlider');
    if (slider) {
      slider.value = currentZoom;
    }
  }

  handleZoomSlider(e) {
    const currentZoom = parseInt(e.target.value);
    this.applyZoom(currentZoom);
  }

  applyZoom(zoomPercent) {
    this.currentZoom = zoomPercent;

    const zoomLevel = document.querySelector('.zoom-level');
    if (zoomLevel) {
      zoomLevel.textContent = `${zoomPercent}%`;
    }

    const canvas = document.getElementById('dashboardCanvas');
    const scale = zoomPercent / 100;
    canvas.style.transform = `scale(${scale})`;
    canvas.style.transformOrigin = 'top center';

    const baseHeight = DashboardGenerator.CONFIG.CANVAS_BASE_HEIGHT;
    const adjustedHeight = Math.max(baseHeight, baseHeight / scale);
    canvas.style.minHeight = `${adjustedHeight}px`;

    const slider = document.getElementById('zoomSlider');
    if (slider && slider.value !== zoomPercent.toString()) {
      slider.value = zoomPercent;
    }
  }

  // ==========================================
  // DESIGN CUSTOMIZATION
  // ==========================================

  setupDesignCustomization() {
    const controls = {
      dashFontFamily: { prop: 'fontFamily', parse: (v) => v },
      dashFontSize: { prop: 'fontSize', parse: (v) => parseFloat(v) },
      dashSpacing: { prop: 'spacing', parse: (v) => parseFloat(v) },
      dashBorderRadius: { prop: 'borderRadius', parse: (v) => parseInt(v) },
      dashShadow: { prop: 'shadow', parse: (v) => v },
    };

    Object.entries(controls).forEach(([id, config]) => {
      const el = document.getElementById(id);
      if (el) {
        this._addListener(el, 'change', (e) => {
          this.designSettings[config.prop] = config.parse(e.target.value);
          this.applyDesignSettings();
        });
      }
    });

    const colorControls = {
      dashPrimaryColor: 'primaryColor',
      dashSecondaryColor: 'secondaryColor',
      dashAccentColor: 'accentColor',
      dashBgColor: 'bgColor',
    };

    Object.entries(colorControls).forEach(([id, prop]) => {
      const el = document.getElementById(id);
      if (el) {
        this._addListener(el, 'input', (e) => {
          this.designSettings[prop] = e.target.value;
          this.applyDesignSettings();
        });
      }
    });

    const resetColors = document.getElementById('dashResetColors');
    if (resetColors) {
      this._addListener(resetColors, 'click', () => this.resetDesignColors());
    }
  }

  applyDesignSettings() {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) return;

    canvas.style.setProperty(
      '--dash-font-family',
      `'${this.designSettings.fontFamily}', sans-serif`
    );
    canvas.style.setProperty('--dash-font-scale', this.designSettings.fontSize);
    canvas.style.setProperty('--dash-spacing-scale', this.designSettings.spacing);
    canvas.style.setProperty('--dash-radius', `${this.designSettings.borderRadius}px`);
    canvas.style.setProperty('--dash-primary', this.designSettings.primaryColor);
    canvas.style.setProperty('--dash-secondary', this.designSettings.secondaryColor);
    canvas.style.setProperty('--dash-accent', this.designSettings.accentColor);
    canvas.style.setProperty('--dash-bg', this.designSettings.bgColor);

    canvas.style.fontFamily = `'${this.designSettings.fontFamily}', sans-serif`;
    canvas.style.fontSize = `${this.designSettings.fontSize * 100}%`;
    canvas.style.background = this.designSettings.bgColor;

    const cards = canvas.querySelectorAll(
      '.dashboard-card, .stat-card, .data-table, .chart-card, .component-wrapper'
    );
    cards.forEach((card) => {
      card.style.borderRadius = `${this.designSettings.borderRadius}px`;
      card.style.boxShadow = DashboardGenerator.CONFIG.SHADOW_MAP[this.designSettings.shadow];
    });

    const grid = canvas.querySelector('.dashboard-grid');
    if (grid) {
      grid.style.gap = `${20 * this.designSettings.spacing}px`;
      grid.style.padding = `${24 * this.designSettings.spacing}px`;
    }

    const buttons = canvas.querySelectorAll('.btn-primary, .primary-btn');
    buttons.forEach((btn) => {
      btn.style.background = this.designSettings.primaryColor;
    });

    const statValues = canvas.querySelectorAll('.stat-value, .stat-change.positive');
    statValues.forEach((el) => {
      if (el.classList.contains('positive')) {
        el.style.color = this.designSettings.accentColor;
      }
    });

    this.injectThemeCSS();
  }

  injectThemeCSS() {
    let styleEl = document.getElementById('dash-theme-css');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dash-theme-css';
      document.head.appendChild(styleEl);
    }

    styleEl.textContent = `
      #dashboardCanvas {
        --primary: ${this.designSettings.primaryColor};
        --secondary: ${this.designSettings.secondaryColor};
        --accent: ${this.designSettings.accentColor};
      }
      #dashboardCanvas .btn-primary,
      #dashboardCanvas .primary-btn {
        background: ${this.designSettings.primaryColor} !important;
      }
      #dashboardCanvas .text-primary {
        color: ${this.designSettings.primaryColor} !important;
      }
      #dashboardCanvas .stat-change.positive {
        color: ${this.designSettings.accentColor} !important;
      }
      #dashboardCanvas .chart-line {
        stroke: ${this.designSettings.primaryColor};
      }
      #dashboardCanvas .progress-bar {
        background: ${this.designSettings.primaryColor};
      }
    `;
  }

  resetDesignColors() {
    this.designSettings.primaryColor = '#3b82f6';
    this.designSettings.secondaryColor = '#64748b';
    this.designSettings.accentColor = '#10b981';
    this.designSettings.bgColor = '#f8fafc';

    const updates = {
      dashPrimaryColor: this.designSettings.primaryColor,
      dashSecondaryColor: this.designSettings.secondaryColor,
      dashAccentColor: this.designSettings.accentColor,
      dashBgColor: this.designSettings.bgColor,
    };

    Object.entries(updates).forEach(([id, value]) => {
      const el = document.getElementById(id);
      if (el) el.value = value;
    });

    this.applyDesignSettings();
    this.showNotification('カラーをリセットしました');
  }

  // ==========================================
  // COMPONENT PREVIEW TOOLTIP
  // ==========================================

  createPreviewTooltip() {
    if (document.getElementById('componentPreviewTooltip')) return;

    const tooltip = document.createElement('div');
    tooltip.id = 'componentPreviewTooltip';
    tooltip.className = 'component-preview-tooltip';
    tooltip.innerHTML = `
      <div class="preview-tooltip-header"></div>
      <div class="preview-tooltip-content">
        <div class="preview-scale"></div>
      </div>
    `;
    document.body.appendChild(tooltip);
    this.previewTooltip = tooltip;
  }

  showComponentPreview(e) {
    const item = e.currentTarget;
    const componentType = item.dataset.component;

    if (typeof dashboardTemplates === 'undefined') return;
    const template = dashboardTemplates[componentType];
    if (!template || !this.previewTooltip) return;

    const header = this.previewTooltip.querySelector('.preview-tooltip-header');
    const content = this.previewTooltip.querySelector('.preview-scale');

    header.textContent = template.name;
    content.innerHTML = template.html;

    const rect = item.getBoundingClientRect();
    const sidebarRight =
      document.querySelector('.db-sidebar')?.getBoundingClientRect().right || 300;

    this.previewTooltip.style.left = `${sidebarRight + 10}px`;
    this.previewTooltip.style.top = `${Math.max(60, rect.top - 20)}px`;

    const maxTop = window.innerHeight - 260;
    if (parseInt(this.previewTooltip.style.top) > maxTop) {
      this.previewTooltip.style.top = `${maxTop}px`;
    }

    this.previewTooltip.classList.add('visible');
  }

  hideComponentPreview() {
    if (this.previewTooltip) {
      this.previewTooltip.classList.remove('visible');
    }
  }

  // ==========================================
  // COMPONENT MODE WITH GRID AREAS
  // ==========================================

  renderComponentModeWithAreas() {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) return;

    canvas.innerHTML = '';

    const gridContainer = document.createElement('div');
    gridContainer.className = 'component-grid-container';
    gridContainer.style.cssText = `
      display: grid;
      grid-template-columns: repeat(${DashboardGenerator.CONFIG.GRID_COLUMNS}, 1fr);
      grid-template-rows: repeat(${this.gridRows}, minmax(120px, auto));
      gap: 16px;
      padding: 24px;
      min-height: 400px;
      background: #f8fafc;
    `;

    this.gridAreas.forEach((area) => {
      const dropZone = document.createElement('div');
      dropZone.className = 'area-drop-zone';
      dropZone.dataset.areaId = area.id;
      dropZone.dataset.color = area.color;

      dropZone.style.cssText = `
        grid-column: ${area.startCol + 1} / ${area.endCol + 1};
        grid-row: ${area.startRow + 1} / ${area.endRow + 1};
        background: ${this.getAreaBackgroundColor(area.color)};
        border: 2px dashed ${this.getAreaBorderColor(area.color)};
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        min-height: 100px;
        transition: all 0.2s ease;
        position: relative;
      `;

      // エリアラベル
      const label = document.createElement('div');
      label.className = 'area-zone-label';
      label.textContent = area.name;
      label.style.cssText = `
        position: absolute;
        top: 8px;
        left: 8px;
        font-size: 11px;
        font-weight: 600;
        color: ${this.getAreaBorderColor(area.color)};
        background: white;
        padding: 2px 8px;
        border-radius: 4px;
        z-index: 5;
      `;
      dropZone.appendChild(label);

      // コンテンツコンテナ
      const contentContainer = document.createElement('div');
      contentContainer.className = 'area-content';
      contentContainer.style.cssText = `
        flex: 1;
        padding: 32px 12px 12px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow: auto;
      `;

      const areaComponents = area.components || [];
      if (areaComponents.length === 0) {
        const emptyState = document.createElement('div');
        emptyState.className = 'area-empty-state';
        emptyState.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>ドロップしてコンポーネントを追加</span>
        `;
        emptyState.style.cssText = `
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          color: ${this.getAreaBorderColor(area.color)};
          opacity: 0.6;
          font-size: 12px;
          gap: 8px;
        `;
        contentContainer.appendChild(emptyState);
      } else {
        areaComponents.forEach((comp, index) => {
          const compWrapper = this._createAreaComponentWrapper(area, comp, index);
          contentContainer.appendChild(compWrapper);
        });
      }

      dropZone.appendChild(contentContainer);

      // ドロップゾーンのドラッグイベント
      dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.add('drag-over');
      });

      dropZone.addEventListener('dragleave', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
      });

      dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZone.classList.remove('drag-over');
        this.handleAreaDrop(area.id);
      });

      gridContainer.appendChild(dropZone);
    });

    // レイアウトラッパー
    if (this.currentLayout === 'sidebar-left' || this.currentLayout === 'sidebar-top') {
      const layoutContainer = document.createElement('div');
      layoutContainer.className = `db-layout-${this.currentLayout} component-layout sidebar-collapsed`;

      if (this.currentLayout === 'sidebar-left') {
        layoutContainer.innerHTML = `
          <aside class="db-sidebar component-sidebar">
            <div class="db-sidebar-header">
              <h2>Dashboard</h2>
              <button class="sidebar-toggle-btn" title="Toggle Sidebar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
            <nav class="db-sidebar-nav">
              <a href="#" class="db-nav-item active">Overview</a>
              <a href="#" class="db-nav-item">Analytics</a>
            </nav>
          </aside>
          <main class="db-main"></main>
        `;
      } else {
        layoutContainer.innerHTML = `
          <aside class="db-sidebar component-sidebar">
            <div class="db-sidebar-header">
              <h2>Dashboard</h2>
              <button class="sidebar-toggle-btn" title="Toggle Sidebar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </aside>
          <div class="db-content-area">
            <header class="db-topbar"><span>Navigation</span></header>
            <main class="db-main"></main>
          </div>
        `;
      }

      layoutContainer.querySelector('.sidebar-toggle-btn')?.addEventListener('click', () => {
        layoutContainer.classList.toggle('sidebar-collapsed');
      });

      layoutContainer.querySelector('.db-main').appendChild(gridContainer);
      canvas.appendChild(layoutContainer);
    } else if (this.currentLayout === 'topbar') {
      const layoutContainer = document.createElement('div');
      layoutContainer.className = 'db-layout-topbar component-layout';
      layoutContainer.innerHTML = `
        <header class="db-topbar"><span>Navigation</span></header>
        <main class="db-main"></main>
      `;
      layoutContainer.querySelector('.db-main').appendChild(gridContainer);
      canvas.appendChild(layoutContainer);
    } else {
      canvas.appendChild(gridContainer);
    }
  }

  /**
   * エリア内コンポーネントラッパーを生成する
   */
  _createAreaComponentWrapper(area, comp, index) {
    const compWrapper = document.createElement('div');
    compWrapper.className = 'area-component-wrapper';
    compWrapper.dataset.componentId = comp.id;
    compWrapper.dataset.areaId = area.id;
    compWrapper.dataset.index = index;
    compWrapper.draggable = true;

    // スペーシング適用
    const spacing = comp.spacing || {};
    const spacingProps = [
      'marginTop',
      'marginBottom',
      'marginLeft',
      'marginRight',
      'paddingTop',
      'paddingBottom',
      'paddingLeft',
      'paddingRight',
    ];
    spacingProps.forEach((prop) => {
      if (spacing[prop]) {
        compWrapper.style[prop] = `${spacing[prop]}px`;
      }
    });

    // レスポンシブデータ属性
    const responsive = comp.responsive || {};
    if (responsive.hideOnMobile) compWrapper.dataset.hideMobile = 'true';
    if (responsive.hideOnTablet) compWrapper.dataset.hideTablet = 'true';
    if (responsive.mobileFullWidth) compWrapper.dataset.mobileFull = 'true';

    compWrapper.innerHTML = comp.template.html;

    // コントロール
    const controls = document.createElement('div');
    controls.className = 'area-component-controls';

    const dragHandle = document.createElement('button');
    dragHandle.className = 'area-component-drag';
    dragHandle.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="5" r="2"/><circle cx="15" cy="5" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="9" cy="19" r="2"/><circle cx="15" cy="19" r="2"/></svg>`;
    dragHandle.title = 'ドラッグして移動';
    controls.appendChild(dragHandle);

    const settingsBtn = document.createElement('button');
    settingsBtn.className = 'area-component-settings';
    settingsBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
    settingsBtn.title = '設定';
    settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.showComponentSettings(area.id, comp.id);
    });
    controls.appendChild(settingsBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'area-component-delete';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.title = '削除';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.removeComponentFromArea(area.id, comp.id);
    });
    controls.appendChild(deleteBtn);

    compWrapper.appendChild(controls);

    // ドラッグイベント（並べ替え用）
    compWrapper.addEventListener('dragstart', (e) => {
      e.stopPropagation();
      compWrapper.classList.add('dragging');
      e.dataTransfer.setData(
        'text/plain',
        JSON.stringify({
          type: 'reorder',
          areaId: area.id,
          componentId: comp.id,
          fromIndex: index,
        })
      );
      e.dataTransfer.effectAllowed = 'move';
    });

    compWrapper.addEventListener('dragend', () => {
      compWrapper.classList.remove('dragging');
      document.querySelectorAll('.area-component-wrapper').forEach((el) => {
        el.classList.remove('drag-over-top', 'drag-over-bottom');
      });
    });

    compWrapper.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const dragging = document.querySelector('.area-component-wrapper.dragging');
      if (dragging && dragging !== compWrapper) {
        const rect = compWrapper.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        compWrapper.classList.remove('drag-over-top', 'drag-over-bottom');
        if (e.clientY < midY) {
          compWrapper.classList.add('drag-over-top');
        } else {
          compWrapper.classList.add('drag-over-bottom');
        }
      }
    });

    compWrapper.addEventListener('dragleave', () => {
      compWrapper.classList.remove('drag-over-top', 'drag-over-bottom');
    });

    compWrapper.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
      try {
        const data = JSON.parse(e.dataTransfer.getData('text/plain'));
        if (data.type === 'reorder') {
          const rect = compWrapper.getBoundingClientRect();
          const midY = rect.top + rect.height / 2;
          const insertBefore = e.clientY < midY;
          this.reorderComponentInArea(
            data.areaId,
            data.componentId,
            area.id,
            comp.id,
            insertBefore
          );
        }
      } catch (err) {
        console.warn('ドロップデータの解析に失敗:', err.message);
      }
      compWrapper.classList.remove('drag-over-top', 'drag-over-bottom');
    });

    return compWrapper;
  }

  getAreaBackgroundColor(colorName) {
    return (
      DashboardGenerator.CONFIG.AREA_BG_COLORS[colorName] ||
      DashboardGenerator.CONFIG.AREA_BG_COLORS.blue
    );
  }

  getAreaBorderColor(colorName) {
    return (
      DashboardGenerator.CONFIG.AREA_BORDER_COLORS[colorName] ||
      DashboardGenerator.CONFIG.AREA_BORDER_COLORS.blue
    );
  }

  handleAreaDrop(areaId) {
    if (!this.draggedComponent) return;

    const template = this._getTemplate(this.draggedComponent);
    if (!template) return;

    const area = this.gridAreas.find((a) => a.id === areaId);
    if (!area) return;

    if (!area.components) area.components = [];

    const component = {
      id: CommonEditor.generateId('area-comp'),
      type: this.draggedComponent,
      template: JSON.parse(JSON.stringify(template)),
      timestamp: Date.now(),
    };

    area.components.push(component);
    this.draggedComponent = null;
    this.renderCanvas();
    this.showNotification(`${template.name}を${area.name}に追加しました`);
  }

  removeComponentFromArea(areaId, componentId) {
    const area = this.gridAreas.find((a) => a.id === areaId);
    if (!area || !area.components) return;

    area.components = area.components.filter((c) => c.id !== componentId);
    this.saveState();
    this.renderCanvas();
    this.showNotification('コンポーネントを削除しました', 'info');
  }

  reorderComponentInArea(fromAreaId, componentId, toAreaId, targetComponentId, insertBefore) {
    const fromArea = this.gridAreas.find((a) => a.id === fromAreaId);
    const toArea = this.gridAreas.find((a) => a.id === toAreaId);
    if (!fromArea || !toArea) return;

    const compIndex = fromArea.components.findIndex((c) => c.id === componentId);
    if (compIndex === -1) return;
    const [component] = fromArea.components.splice(compIndex, 1);

    let targetIndex = toArea.components.findIndex((c) => c.id === targetComponentId);
    if (!insertBefore) targetIndex++;

    if (fromAreaId === toAreaId && compIndex < targetIndex) {
      targetIndex--;
    }

    toArea.components.splice(targetIndex, 0, component);

    this.saveState();
    this.renderCanvas();
    this.showNotification('コンポーネントを移動しました', 'success');
  }

  // ==========================================
  // COMPONENT SETTINGS MODAL
  // ==========================================

  showComponentSettings(areaId, componentId) {
    const area = this.gridAreas.find((a) => a.id === areaId);
    if (!area) return;
    const component = area.components.find((c) => c.id === componentId);
    if (!component) return;

    // デフォルト値初期化
    if (!component.spacing) {
      component.spacing = {
        marginTop: 0, marginBottom: 0, marginLeft: 0, marginRight: 0,
        paddingTop: 0, paddingBottom: 0, paddingLeft: 0, paddingRight: 0,
      };
    }
    const sp = component.spacing;
    sp.marginLeft = sp.marginLeft || 0;
    sp.marginRight = sp.marginRight || 0;
    sp.paddingLeft = sp.paddingLeft || 0;
    sp.paddingRight = sp.paddingRight || 0;

    if (!component.responsive) {
      component.responsive = { hideOnMobile: false, hideOnTablet: false, mobileFullWidth: true };
    }

    const modal = document.createElement('div');
    modal.className = 'component-settings-modal';

    const spacingGroupHTML = (label, prop, max, value) => `
      <div class="spacing-group">
        <label>${CommonEditor.sanitizeHTML(label)}</label>
        <div class="spacing-input-row">
          <input type="range" min="0" max="${max}" step="4" value="${value}"
            data-prop="${prop}" class="spacing-slider">
          <span class="spacing-value">${value}px</span>
        </div>
      </div>
    `;

    modal.innerHTML = `
      <div class="settings-modal-overlay"></div>
      <div class="settings-modal-content">
        <div class="settings-modal-header">
          <h3>コンポーネント設定</h3>
          <button class="settings-modal-close">&times;</button>
        </div>
        <div class="settings-modal-body">
          <div class="settings-section">
            <h4>マージン（外側余白）</h4>
            <div class="spacing-controls spacing-grid">
              ${spacingGroupHTML('上', 'marginTop', 48, sp.marginTop)}
              ${spacingGroupHTML('下', 'marginBottom', 48, sp.marginBottom)}
              ${spacingGroupHTML('左', 'marginLeft', 48, sp.marginLeft)}
              ${spacingGroupHTML('右', 'marginRight', 48, sp.marginRight)}
            </div>
          </div>

          <div class="settings-section">
            <h4>パディング（内側余白）</h4>
            <div class="spacing-controls spacing-grid">
              ${spacingGroupHTML('上', 'paddingTop', 32, sp.paddingTop)}
              ${spacingGroupHTML('下', 'paddingBottom', 32, sp.paddingBottom)}
              ${spacingGroupHTML('左', 'paddingLeft', 32, sp.paddingLeft)}
              ${spacingGroupHTML('右', 'paddingRight', 32, sp.paddingRight)}
            </div>
          </div>

          <div class="settings-section">
            <h4>レスポンシブ設定</h4>
            <div class="responsive-controls">
              <label class="responsive-checkbox">
                <input type="checkbox" data-resp="hideOnMobile" ${component.responsive.hideOnMobile ? 'checked' : ''}>
                <span>モバイルで非表示</span>
              </label>
              <label class="responsive-checkbox">
                <input type="checkbox" data-resp="hideOnTablet" ${component.responsive.hideOnTablet ? 'checked' : ''}>
                <span>タブレットで非表示</span>
              </label>
              <label class="responsive-checkbox">
                <input type="checkbox" data-resp="mobileFullWidth" ${component.responsive.mobileFullWidth ? 'checked' : ''}>
                <span>モバイルで全幅表示</span>
              </label>
            </div>
          </div>
        </div>
        <div class="settings-modal-footer">
          <button class="settings-btn-cancel">キャンセル</button>
          <button class="settings-btn-apply">適用</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
      modal.remove();
    };

    modal.querySelector('.settings-modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('.settings-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.settings-btn-cancel').addEventListener('click', closeModal);

    // スライダー値表示の更新
    modal.querySelectorAll('.spacing-slider').forEach((slider) => {
      slider.addEventListener('input', (e) => {
        e.target.nextElementSibling.textContent = `${e.target.value}px`;
      });
    });

    // 適用
    modal.querySelector('.settings-btn-apply').addEventListener('click', () => {
      modal.querySelectorAll('.spacing-slider').forEach((slider) => {
        component.spacing[slider.dataset.prop] = parseInt(slider.value);
      });

      modal.querySelectorAll('[data-resp]').forEach((checkbox) => {
        component.responsive[checkbox.dataset.resp] = checkbox.checked;
      });

      this.saveState();
      this.renderCanvas();
      closeModal();
      this.showNotification('設定を適用しました', 'success');
    });
  }

  // ==========================================
  // UTILITIES
  // ==========================================

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

  showNotification(message, type = 'success') {
    const existing = document.querySelector('.db-notification');
    if (existing) existing.remove();

    const safeMessage = CommonEditor.sanitizeHTML(message);

    const notification = document.createElement('div');
    notification.className = `db-notification db-notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      padding: 12px 20px;
      max-width: 320px;
      max-height: 60px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      animation: slideInRight 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    const duration = DashboardGenerator.CONFIG.NOTIFICATION_DURATION;
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, duration);
  }

  // ==========================================
  // GRID DESIGN MODE METHODS
  // ==========================================

  handleModeChange(e) {
    const tab = e.currentTarget;
    const mode = tab.dataset.mode;

    document.querySelectorAll('.mode-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    this.designMode = mode;

    if (mode === 'component') {
      document.body.classList.add('component-mode');
    } else {
      document.body.classList.remove('component-mode');
    }

    this.renderCanvas();
  }

  renderGridOverlay() {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) return;

    canvas.innerHTML = '';

    const gridContent = document.createElement('div');
    gridContent.className = 'grid-design-container';
    gridContent.style.position = 'relative';

    // カラムヘッダー
    const headers = document.createElement('div');
    headers.className = 'grid-column-headers';
    for (let i = 1; i <= DashboardGenerator.CONFIG.GRID_COLUMNS; i++) {
      const header = document.createElement('div');
      header.className = 'column-header';
      header.textContent = i;
      headers.appendChild(header);
    }
    gridContent.appendChild(headers);

    // グリッドオーバーレイ
    const overlay = document.createElement('div');
    overlay.className = 'grid-overlay';
    overlay.id = 'gridOverlay';

    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < DashboardGenerator.CONFIG.GRID_COLUMNS; col++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.textContent = `${col + 1}`;

        const occupiedArea = this.gridAreas.find(
          (area) =>
            col >= area.startCol && col < area.endCol && row >= area.startRow && row < area.endRow
        );
        if (occupiedArea) {
          cell.classList.add('occupied');
        }

        cell.addEventListener('mousedown', (e) => this.handleGridCellMouseDown(e, col, row));
        cell.addEventListener('mouseenter', (e) => this.handleGridCellMouseEnter(e, col, row));
        cell.addEventListener('mouseup', () => this.handleGridCellMouseUp());

        overlay.appendChild(cell);
      }
    }

    gridContent.appendChild(overlay);

    this.pendingAreas = [...this.gridAreas];

    // レイアウトラッパー
    if (this.currentLayout === 'sidebar-left') {
      const layoutContainer = document.createElement('div');
      layoutContainer.className = 'db-layout-sidebar-left grid-design-layout';
      layoutContainer.innerHTML = `
        <aside class="db-sidebar grid-design-sidebar">
          <div class="db-sidebar-header">
            <h2>Sidebar</h2>
            <button class="sidebar-collapse-btn" title="Toggle Sidebar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
          </div>
          <div class="sidebar-placeholder">
            <span>Sidebar Area</span>
          </div>
        </aside>
        <main class="db-main"></main>
      `;
      layoutContainer.querySelector('.db-main').appendChild(gridContent);
      canvas.appendChild(layoutContainer);

      layoutContainer.querySelector('.sidebar-collapse-btn')?.addEventListener('click', () => {
        layoutContainer.classList.toggle('sidebar-collapsed');
      });
    } else if (this.currentLayout === 'topbar') {
      const layoutContainer = document.createElement('div');
      layoutContainer.className = 'db-layout-topbar grid-design-layout';
      layoutContainer.innerHTML = `
        <header class="db-topbar grid-design-topbar">
          <div class="topbar-placeholder">
            <span>Top Navigation Area</span>
          </div>
        </header>
        <main class="db-main"></main>
      `;
      layoutContainer.querySelector('.db-main').appendChild(gridContent);
      canvas.appendChild(layoutContainer);
    } else if (this.currentLayout === 'sidebar-top') {
      const layoutContainer = document.createElement('div');
      layoutContainer.className = 'db-layout-sidebar-top grid-design-layout';
      layoutContainer.innerHTML = `
        <aside class="db-sidebar grid-design-sidebar">
          <div class="db-sidebar-header">
            <h2>Sidebar</h2>
            <button class="sidebar-collapse-btn" title="Toggle Sidebar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="15 18 9 12 15 6"/>
              </svg>
            </button>
          </div>
          <div class="sidebar-placeholder">
            <span>Sidebar Area</span>
          </div>
        </aside>
        <div class="db-content-area">
          <header class="db-topbar grid-design-topbar">
            <div class="topbar-placeholder">
              <span>Top Navigation Area</span>
            </div>
          </header>
          <main class="db-main"></main>
        </div>
      `;
      layoutContainer.querySelector('.db-main').appendChild(gridContent);
      canvas.appendChild(layoutContainer);

      layoutContainer.querySelector('.sidebar-collapse-btn')?.addEventListener('click', () => {
        layoutContainer.classList.toggle('sidebar-collapsed');
      });
    } else {
      canvas.appendChild(gridContent);
    }

    // エリア要素を描画
    requestAnimationFrame(() => {
      const overlayEl = document.getElementById('gridOverlay');
      if (overlayEl && this.pendingAreas) {
        this.pendingAreas.forEach((area, index) => {
          const areaEl = this.createAreaElement(area, index);
          overlayEl.parentElement.appendChild(areaEl);
        });
      }
    });

    // グローバルmouseupハンドラー
    document.addEventListener('mouseup', () => this.handleGridCellMouseUp(), { once: true });
  }

  // ==========================================
  // GRID CELL SELECTION
  // ==========================================

  handleGridCellMouseDown(e, col, row) {
    const occupiedArea = this.gridAreas.find(
      (area) =>
        col >= area.startCol && col < area.endCol && row >= area.startRow && row < area.endRow
    );
    if (occupiedArea) return;

    this.isSelectingArea = true;
    this.selectionStart = { col, row };
    this.selectionEnd = { col, row };
    e.currentTarget.classList.add('selecting');
    this.updateSelectionPreview();
  }

  handleGridCellMouseEnter(_e, col, row) {
    if (!this.isSelectingArea) return;
    this.selectionEnd = { col, row };
    this.updateSelectionPreview();
  }

  handleGridCellMouseUp() {
    if (!this.isSelectingArea) return;
    this.isSelectingArea = false;

    if (this.selectionStart && this.selectionEnd) {
      this.defineArea(this.selectionStart, this.selectionEnd);
    }

    this.selectionStart = null;
    this.selectionEnd = null;
  }

  updateSelectionPreview() {
    const overlay = document.getElementById('gridOverlay');
    if (!overlay) return;

    const cells = overlay.querySelectorAll('.grid-cell');
    const minCol = Math.min(this.selectionStart.col, this.selectionEnd.col);
    const maxCol = Math.max(this.selectionStart.col, this.selectionEnd.col);
    const minRow = Math.min(this.selectionStart.row, this.selectionEnd.row);
    const maxRow = Math.max(this.selectionStart.row, this.selectionEnd.row);

    cells.forEach((cell) => {
      const col = parseInt(cell.dataset.col);
      const row = parseInt(cell.dataset.row);
      cell.classList.remove('selecting', 'in-selection');

      if (col >= minCol && col <= maxCol && row >= minRow && row <= maxRow) {
        cell.classList.add('in-selection');
        if (col === this.selectionStart.col && row === this.selectionStart.row) {
          cell.classList.add('selecting');
        }
      }
    });
  }

  defineArea(start, end) {
    const { AREA_COLORS } = DashboardGenerator.CONFIG;

    const area = {
      id: CommonEditor.generateId('area'),
      name: `Area ${this.gridAreas.length + 1}`,
      startCol: Math.min(start.col, end.col),
      endCol: Math.max(start.col, end.col) + 1,
      startRow: Math.min(start.row, end.row),
      endRow: Math.max(start.row, end.row) + 1,
      color: AREA_COLORS[this.gridAreas.length % AREA_COLORS.length],
      components: [],
    };

    // 重複チェック
    const hasOverlap = this.gridAreas.some(
      (existing) =>
        !(
          area.endCol <= existing.startCol ||
          area.startCol >= existing.endCol ||
          area.endRow <= existing.startRow ||
          area.startRow >= existing.endRow
        )
    );

    if (hasOverlap) {
      this.showNotification('エリアが重複しています', 'error');
      this.renderGridOverlay();
      return;
    }

    this.gridAreas.push(area);
    this.saveState();
    this.renderGridOverlay();
    this.showNotification(`${area.name} を作成しました`, 'success');
  }

  createAreaElement(area, _index) {
    const overlay = document.getElementById('gridOverlay');
    if (!overlay) return document.createElement('div');

    const firstCell = overlay.querySelector(
      `[data-row="${area.startRow}"][data-col="${area.startCol}"]`
    );
    const lastCell = overlay.querySelector(
      `[data-row="${area.endRow - 1}"][data-col="${area.endCol - 1}"]`
    );

    if (!firstCell || !lastCell) return document.createElement('div');

    const overlayRect = overlay.getBoundingClientRect();
    const firstRect = firstCell.getBoundingClientRect();
    const lastRect = lastCell.getBoundingClientRect();

    const areaEl = document.createElement('div');
    areaEl.className = 'grid-area-defined';
    areaEl.dataset.areaId = area.id;
    areaEl.dataset.color = area.color;

    areaEl.style.left = `${firstRect.left - overlayRect.left}px`;
    areaEl.style.top = `${firstRect.top - overlayRect.top}px`;
    areaEl.style.width = `${lastRect.right - firstRect.left}px`;
    areaEl.style.height = `${lastRect.bottom - firstRect.top}px`;

    const label = document.createElement('span');
    label.className = 'grid-area-label';
    label.textContent = area.name;
    label.style.borderLeftColor = this.getAreaBorderColor(area.color);
    areaEl.appendChild(label);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'grid-area-delete';
    deleteBtn.innerHTML = '&times;';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteArea(area.id);
    });
    areaEl.appendChild(deleteBtn);

    areaEl.addEventListener('dblclick', () => this.renameArea(area.id));

    return areaEl;
  }

  deleteArea(areaId) {
    this.gridAreas = this.gridAreas.filter((a) => a.id !== areaId);
    this.saveState();
    this.renderGridOverlay();
    this.showNotification('エリアを削除しました', 'info');
  }

  renameArea(areaId) {
    const area = this.gridAreas.find((a) => a.id === areaId);
    if (!area) return;

    const newName = prompt('エリア名を入力:', area.name);
    if (newName && newName.trim()) {
      area.name = newName.trim();
      this.saveState();
      this.renderGridOverlay();
    }
  }

  addGridRow() {
    if (this.gridRows < DashboardGenerator.CONFIG.MAX_GRID_ROWS) {
      this.gridRows++;
      const rowCountEl = document.getElementById('gridRowCount');
      if (rowCountEl) rowCountEl.textContent = this.gridRows;
      this.saveState();
      this.renderGridOverlay();
    }
  }

  removeGridRow() {
    if (this.gridRows > DashboardGenerator.CONFIG.MIN_GRID_ROWS) {
      const hasAreasInLastRow = this.gridAreas.some((area) => area.endRow > this.gridRows - 1);
      if (hasAreasInLastRow) {
        this.showNotification('最後の行にエリアがあるため削除できません', 'error');
        return;
      }
      this.gridRows--;
      const rowCountEl = document.getElementById('gridRowCount');
      if (rowCountEl) rowCountEl.textContent = this.gridRows;
      this.saveState();
      this.renderGridOverlay();
    }
  }

  clearGridAreas() {
    if (this.gridAreas.length === 0) return;
    if (confirm('すべてのエリアを削除しますか？')) {
      this.gridAreas = [];
      this.saveState();
      this.renderGridOverlay();
      this.showNotification('すべてのエリアを削除しました', 'info');
    }
  }

  applyGridTemplate(e) {
    const btn = e.currentTarget;
    const templateName = btn.dataset.template;
    const { GRID_TEMPLATES, AREA_COLORS } = DashboardGenerator.CONFIG;

    const templateAreas = GRID_TEMPLATES[templateName];
    if (!templateAreas) return;

    this.gridAreas = [];

    const maxRow = Math.max(...templateAreas.map((a) => a.endRow));
    this.gridRows = maxRow;
    const rowCountEl = document.getElementById('gridRowCount');
    if (rowCountEl) rowCountEl.textContent = this.gridRows;

    templateAreas.forEach((areaData, index) => {
      this.gridAreas.push({
        id: CommonEditor.generateId('area'),
        name: areaData.name,
        startCol: areaData.startCol,
        endCol: areaData.endCol,
        startRow: areaData.startRow,
        endRow: areaData.endRow,
        color: AREA_COLORS[index % AREA_COLORS.length],
        components: [],
      });
    });

    document.querySelectorAll('.grid-template-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    this.saveState();
    this.renderGridOverlay();
    this.showNotification(`${templateName} テンプレートを適用しました`, 'success');
  }
}

// 通知アニメーション
const dbNotificationStyle = document.createElement('style');
dbNotificationStyle.id = 'db-notification-animations';
dbNotificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }

    .dashboard-component {
        position: relative;
    }

    .component-controls {
        position: absolute;
        top: 12px;
        right: 12px;
        display: none;
        gap: 8px;
        z-index: 10;
    }

    .dashboard-component:hover .component-controls {
        display: flex;
    }

    .component-control {
        width: 32px;
        height: 32px;
        border: none;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.95);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
    }

    .component-control:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
        background: #fee;
    }
`;
if (!document.getElementById('db-notification-animations')) {
  document.head.appendChild(dbNotificationStyle);
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  window.dashboardGenerator = new DashboardGenerator();
});
