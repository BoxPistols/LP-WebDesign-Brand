// Dashboard Generator
// Drag & Drop Dashboard Builder

class DashboardGenerator {
  constructor() {
    this.components = [];
    this.currentLayout = 'sidebar-left';
    this.currentTheme = 'blue';
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

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupDesignCustomization();
    this.setupSidebarToggles();
    this.renderCanvas(); // Initialize canvas with empty state
    console.log('Dashboard Generator initialized');
  }

  setupSidebarToggles() {
    const toggleLeft = document.getElementById('toggleLeftSidebar');
    const toggleRight = document.getElementById('toggleRightSidebar');
    const builder = document.querySelector('.dashboard-builder');

    if (toggleLeft) {
      toggleLeft.addEventListener('click', () => {
        builder.classList.toggle('left-collapsed');
        const isCollapsed = builder.classList.contains('left-collapsed');
        localStorage.setItem('leftSidebarCollapsed', isCollapsed);
      });
    }

    if (toggleRight) {
      toggleRight.addEventListener('click', () => {
        builder.classList.toggle('right-collapsed');
        const isCollapsed = builder.classList.contains('right-collapsed');
        localStorage.setItem('rightSidebarCollapsed', isCollapsed);
      });
    }

    // Restore state from localStorage
    if (localStorage.getItem('leftSidebarCollapsed') === 'true') {
      builder.classList.add('left-collapsed');
    }
    if (localStorage.getItem('rightSidebarCollapsed') === 'true') {
      builder.classList.add('right-collapsed');
    }
  }

  setupEventListeners() {
    // Layout selection
    document.querySelectorAll('.layout-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleLayoutChange(e));
    });

    // Theme selection
    document.querySelectorAll('.theme-option').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleThemeChange(e));
    });

    // Component drag and preview
    document.querySelectorAll('.component-item').forEach((item) => {
      item.setAttribute('draggable', 'true');
      item.addEventListener('dragstart', (e) => this.handleComponentDragStart(e));
      item.addEventListener('dragend', (e) => this.handleComponentDragEnd(e));
      item.addEventListener('mouseenter', (e) => this.showComponentPreview(e));
      item.addEventListener('mouseleave', () => this.hideComponentPreview());
    });

    // Create preview tooltip container
    this.createPreviewTooltip();

    // Canvas drop - Add to both workspace and canvas for better coverage
    const workspace = document.getElementById('canvasWorkspace');
    const canvas = document.getElementById('dashboardCanvas');

    if (workspace) {
      workspace.addEventListener('dragover', (e) => this.handleCanvasDragOver(e));
      workspace.addEventListener('drop', (e) => this.handleCanvasDrop(e));
    }

    if (canvas) {
      canvas.addEventListener('dragover', (e) => this.handleCanvasDragOver(e));
      canvas.addEventListener('drop', (e) => this.handleCanvasDrop(e));
    }

    // Quick start templates - Use event delegation
    document.addEventListener('click', (e) => {
      if (e.target.closest('.quick-start-btn')) {
        this.handleQuickStart(e);
      }
    });

    // Actions
    document
      .getElementById('exportDashboard')
      ?.addEventListener('click', () => this.exportDashboard());
    document
      .getElementById('clearDashboard')
      ?.addEventListener('click', () => this.clearDashboard());
    document
      .getElementById('previewDashboard')
      ?.addEventListener('click', () => this.previewDashboard());

    // Canvas controls
    document.querySelectorAll('.canvas-control').forEach((btn) => {
      const action = btn.dataset.action;
      if (action === 'undo') {
        btn.addEventListener('click', () => this.undo());
      } else if (action === 'redo') {
        btn.addEventListener('click', () => this.redo());
      }
    });

    // Zoom controls
    document.querySelectorAll('.zoom-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleZoom(e));
    });

    // Zoom slider
    const zoomSlider = document.getElementById('zoomSlider');
    if (zoomSlider) {
      zoomSlider.addEventListener('input', (e) => this.handleZoomSlider(e));
    }

    // Device preview toggles
    document.querySelectorAll('.device-preview-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleDeviceChange(e));
    });

    // Initialize current zoom level
    this.currentZoom = 100;
  }

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

    // Reapply current zoom to maintain canvas dimensions
    this.applyZoom(this.currentZoom || 100);

    this.showNotification(
      `プレビュー: ${device === 'desktop' ? 'デスクトップ' : device === 'tablet' ? 'タブレット' : 'モバイル'}`
    );
  }

  handleLayoutChange(e) {
    const btn = e.currentTarget;
    const layout = btn.dataset.layout;

    document.querySelectorAll('.layout-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    this.currentLayout = layout;
    this.renderCanvas(); // Re-render with new layout
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
    const themeColors = {
      blue: '#3b82f6',
      purple: '#8b5cf6',
      green: '#10b981',
      dark: '#1f2937',
    };

    const color = themeColors[theme];
    document.documentElement.style.setProperty('--db-primary', color);
  }

  handleComponentDragStart(e) {
    const componentType = e.currentTarget.dataset.component;
    this.draggedComponent = componentType;
    e.currentTarget.style.opacity = '0.5';
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/html', componentType);
  }

  handleComponentDragEnd(e) {
    e.currentTarget.style.opacity = '1';

    // Remove visual feedback when drag ends
    const workspace = document.getElementById('canvasWorkspace');
    if (workspace) {
      workspace.classList.remove('drag-over');
    }
  }

  handleCanvasDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';

    // Add visual feedback
    const workspace = document.getElementById('canvasWorkspace');
    if (workspace && !workspace.classList.contains('drag-over')) {
      workspace.classList.add('drag-over');
    }
  }

  handleCanvasDrop(e) {
    e.preventDefault();

    // Remove visual feedback
    const workspace = document.getElementById('canvasWorkspace');
    if (workspace) {
      workspace.classList.remove('drag-over');
    }

    if (!this.draggedComponent) return;

    const template = dashboardTemplates[this.draggedComponent];
    if (!template) {
      console.error('Template not found:', this.draggedComponent);
      return;
    }

    this.addComponent(template, this.draggedComponent);
    this.draggedComponent = null;
  }

  addComponent(template, type) {
    const component = {
      id: this.generateId(),
      type: type,
      template: template,
      timestamp: Date.now(),
    };

    this.components.push(component);
    this.saveState();
    this.renderCanvas();
    this.showNotification(`${template.name}を追加しました`);
  }

  renderCanvas() {
    const canvas = document.getElementById('dashboardCanvas');

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

      // Re-attach quick start listeners
      document.querySelectorAll('.quick-start-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => this.handleQuickStart(e));
      });
      return;
    }

    // Create dashboard grid container
    const grid = document.createElement('div');
    grid.className = 'dashboard-grid';

    // Add each component to the grid
    this.components.forEach((component) => {
      // Create a wrapper div for controls
      const wrapper = document.createElement('div');
      wrapper.className = 'dashboard-component-wrapper';
      wrapper.dataset.componentId = component.id;
      wrapper.setAttribute('draggable', 'true');

      // Add controls
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

      // Create a div to hold the component content
      const content = document.createElement('div');
      content.innerHTML = component.template.html;

      // Extract the first child (which has grid-col-* class)
      const componentElement = content.firstElementChild;
      if (componentElement) {
        // Remove existing grid-col class from component element
        componentElement.className = componentElement.className.replace(/grid-col-\d+/g, '').trim();
        wrapper.appendChild(componentElement);

        // Apply grid-col class from component data or use default
        const gridCol = component.gridCol || this.getDefaultGridCol(component.type);
        wrapper.classList.add(`grid-col-${gridCol}`);
      }

      grid.appendChild(wrapper);
    });

    // Apply layout wrapper based on currentLayout
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

    // Add component controls
    this.attachComponentControls();
    this.attachDragListeners();
  }

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

    // Click on component to select and show properties
    document.querySelectorAll('.dashboard-component-wrapper').forEach((wrapper) => {
      wrapper.addEventListener('click', (e) => {
        // Don't trigger if clicking on controls
        if (e.target.closest('.component-controls')) {
          return;
        }

        const componentId = wrapper.dataset.componentId;
        this.selectComponent(componentId);
      });
    });
  }

  selectComponent(componentId) {
    // Remove previous selection
    document.querySelectorAll('.dashboard-component-wrapper').forEach((el) => {
      el.classList.remove('selected');
    });

    // Add selection to clicked component
    const componentEl = document.querySelector(`[data-component-id="${componentId}"]`);
    if (componentEl) {
      componentEl.classList.add('selected');
    }

    this.selectedComponentId = componentId;
    this.showPropertiesPanel(componentId);
  }

  showPropertiesPanel(componentId) {
    const component = this.components.find((c) => c.id === componentId);
    if (!component) return;

    const propertiesPanel = document.getElementById('propertiesPanel');
    if (!propertiesPanel) return;

    // Get current grid column
    const currentGridCol = component.gridCol || this.getDefaultGridCol(component.type);

    // Build properties UI
    propertiesPanel.innerHTML = `
            <div class="properties-header">
                <h4>${component.template.name}</h4>
                <button class="properties-close" onclick="dashboardGenerator.closePropertiesPanel()">
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
                            <select id="gridColumnSelect" class="property-select" onchange="dashboardGenerator.changeGridColumn('${component.id}', this.value)">
                                <option value="3" ${currentGridCol === 3 ? 'selected' : ''}>3/12 (25%)</option>
                                <option value="4" ${currentGridCol === 4 ? 'selected' : ''}>4/12 (33%)</option>
                                <option value="5" ${currentGridCol === 5 ? 'selected' : ''}>5/12 (42%)</option>
                                <option value="6" ${currentGridCol === 6 ? 'selected' : ''}>6/12 (50%)</option>
                                <option value="7" ${currentGridCol === 7 ? 'selected' : ''}>7/12 (58%)</option>
                                <option value="8" ${currentGridCol === 8 ? 'selected' : ''}>8/12 (67%)</option>
                                <option value="9" ${currentGridCol === 9 ? 'selected' : ''}>9/12 (75%)</option>
                                <option value="10" ${currentGridCol === 10 ? 'selected' : ''}>10/12 (83%)</option>
                                <option value="12" ${currentGridCol === 12 ? 'selected' : ''}>12/12 (100%)</option>
                            </select>
                            <div class="grid-quick-buttons">
                                <button class="grid-quick-btn ${currentGridCol === 4 ? 'active' : ''}" onclick="dashboardGenerator.changeGridColumn('${component.id}', 4)">1/3</button>
                                <button class="grid-quick-btn ${currentGridCol === 6 ? 'active' : ''}" onclick="dashboardGenerator.changeGridColumn('${component.id}', 6)">1/2</button>
                                <button class="grid-quick-btn ${currentGridCol === 12 ? 'active' : ''}" onclick="dashboardGenerator.changeGridColumn('${component.id}', 12)">Full</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="property-divider"></div>

                <div class="property-group">
                    <label class="property-label">カテゴリー</label>
                    <div class="property-value">${component.template.category || 'data'}</div>
                </div>

                <div class="property-group">
                    <label class="property-label">コンポーネントID</label>
                    <div class="property-value property-id">${component.id}</div>
                </div>

                <div class="property-divider"></div>

                <div class="property-actions">
                    <button class="property-btn property-btn-primary" onclick="dashboardGenerator.duplicateComponent('${component.id}')">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                        複製
                    </button>
                    <button class="property-btn property-btn-danger" onclick="dashboardGenerator.deleteComponent('${component.id}')">
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
    for (let i = 1; i <= 12; i++) {
      const isActive = i <= cols;
      html += `<div class="grid-col-block ${isActive ? 'active' : ''}"></div>`;
    }
    return html;
  }

  getDefaultGridCol(type) {
    const defaults = {
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
    };
    return defaults[type] || 6;
  }

  changeGridColumn(componentId, newCol) {
    const component = this.components.find((c) => c.id === componentId);
    if (!component) return;

    component.gridCol = parseInt(newCol);
    this.saveState();
    this.renderCanvas();

    // Re-select the component to update properties panel
    setTimeout(() => {
      this.selectComponent(componentId);
    }, 50);

    this.showNotification(`グリッド幅を ${newCol}/12 に変更しました`);
  }

  closePropertiesPanel() {
    const propertiesPanel = document.getElementById('propertiesPanel');
    if (propertiesPanel) {
      propertiesPanel.style.display = 'none';
    }

    // Remove selection
    document.querySelectorAll('.dashboard-component-wrapper').forEach((el) => {
      el.classList.remove('selected');
    });

    this.selectedComponentId = null;
  }

  duplicateComponent(componentId) {
    const component = this.components.find((c) => c.id === componentId);
    if (!component) return;

    // Create a copy with new ID
    const newComponent = {
      id: this.generateId(),
      type: component.type,
      template: component.template,
      timestamp: Date.now(),
    };

    // Insert after the original component
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

    // Swap components
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

  attachDragListeners() {
    const wrappers = document.querySelectorAll('.dashboard-component-wrapper');

    wrappers.forEach((wrapper) => {
      wrapper.addEventListener('dragstart', (e) => {
        wrapper.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', wrapper.dataset.componentId);
      });

      wrapper.addEventListener('dragend', (_e) => {
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

  handleQuickStart(e) {
    const btn = e.target.closest('.quick-start-btn');
    if (!btn) return;

    const template = btn.dataset.template;
    this.applyTemplate(template);
  }

  applyTemplate(templateName) {
    const templates = {
      analytics: ['stats-cards', 'chart-line', 'data-table', 'activity-feed'],
      crm: ['stats-cards', 'user-list', 'activity-feed', 'form-basic'],
      ecommerce: ['stats-cards', 'chart-bar', 'data-table', 'chart-pie'],
    };

    const componentTypes = templates[templateName] || [];

    this.components = [];
    componentTypes.forEach((type) => {
      const template = dashboardTemplates[type];
      if (template) {
        this.addComponentSilent(template, type);
      }
    });

    this.renderCanvas();
    this.showNotification(`${templateName}テンプレートを適用しました`);
  }

  addComponentSilent(template, type) {
    const component = {
      id: this.generateId(),
      type: type,
      template: template,
      timestamp: Date.now(),
    };

    this.components.push(component);
  }

  async exportDashboard() {
    if (this.components.length === 0) {
      this.showNotification('エクスポートするコンポーネントがありません', 'error');
      return;
    }

    this.showNotification('エクスポート中...', 'info');
    const html = await this.generateFullHTML();
    this.downloadFile(html, `dashboard-${Date.now()}.html`, 'text/html');
    this.showNotification('ダッシュボードをエクスポートしました');
  }

  async generateFullHTML() {
    const componentsHTML = this.components.map((c) => c.template.html).join('\n');

    // Fetch and embed CSS files
    let embeddedCSS = '';
    try {
      const [designSystemCSS, dashboardCSS, generatorCSS] = await Promise.all([
        fetch('css/design-system.css').then((r) => r.text()),
        fetch('css/dashboard-components.css').then((r) => r.text()),
        fetch('css/dashboard-generator.css').then((r) => r.text()),
      ]);

      // Add layout-specific CSS
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
    } catch (error) {
      console.error('Failed to load CSS:', error);
      // Fallback to minimal CSS with layouts
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

    // Generate layout wrapper HTML
    let bodyContent = '';
    const gridContent = `<div class="dashboard-grid">${componentsHTML}</div>`;

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

  // History management
  saveState() {
    const state = JSON.parse(JSON.stringify(this.components));

    // Remove future history if we're not at the end
    this.history = this.history.slice(0, this.historyIndex + 1);

    this.history.push(state);
    this.historyIndex++;

    // Limit history to 50 states
    if (this.history.length > 50) {
      this.history.shift();
      this.historyIndex--;
    }
  }

  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.components = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
      this.renderCanvas();
      this.showNotification('元に戻しました');
    }
  }

  redo() {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      this.components = JSON.parse(JSON.stringify(this.history[this.historyIndex]));
      this.renderCanvas();
      this.showNotification('やり直しました');
    }
  }

  handleZoom(e) {
    const action = e.currentTarget.dataset.action;
    let currentZoom = this.currentZoom || 100;

    if (action === 'zoom-in' && currentZoom < 150) {
      currentZoom += 10;
    } else if (action === 'zoom-out' && currentZoom > 25) {
      currentZoom -= 10;
    }

    this.applyZoom(currentZoom);

    // Update slider
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

    // Adjust canvas height to maintain visual size when zoomed out
    const baseHeight = 800;
    const adjustedHeight = Math.max(baseHeight, baseHeight / scale);
    canvas.style.minHeight = `${adjustedHeight}px`;

    // Update slider
    const slider = document.getElementById('zoomSlider');
    if (slider && slider.value !== zoomPercent.toString()) {
      slider.value = zoomPercent;
    }
  }

  // Design Customization
  setupDesignCustomization() {
    // Font Family
    const fontFamilySelect = document.getElementById('dashFontFamily');
    if (fontFamilySelect) {
      fontFamilySelect.addEventListener('change', (e) => {
        this.designSettings.fontFamily = e.target.value;
        this.applyDesignSettings();
      });
    }

    // Font Size
    const fontSizeSelect = document.getElementById('dashFontSize');
    if (fontSizeSelect) {
      fontSizeSelect.addEventListener('change', (e) => {
        this.designSettings.fontSize = parseFloat(e.target.value);
        this.applyDesignSettings();
      });
    }

    // Spacing
    const spacingSelect = document.getElementById('dashSpacing');
    if (spacingSelect) {
      spacingSelect.addEventListener('change', (e) => {
        this.designSettings.spacing = parseFloat(e.target.value);
        this.applyDesignSettings();
      });
    }

    // Border Radius
    const borderRadiusSelect = document.getElementById('dashBorderRadius');
    if (borderRadiusSelect) {
      borderRadiusSelect.addEventListener('change', (e) => {
        this.designSettings.borderRadius = parseInt(e.target.value);
        this.applyDesignSettings();
      });
    }

    // Shadow
    const shadowSelect = document.getElementById('dashShadow');
    if (shadowSelect) {
      shadowSelect.addEventListener('change', (e) => {
        this.designSettings.shadow = e.target.value;
        this.applyDesignSettings();
      });
    }

    // Custom Colors
    const primaryColor = document.getElementById('dashPrimaryColor');
    const secondaryColor = document.getElementById('dashSecondaryColor');
    const accentColor = document.getElementById('dashAccentColor');
    const bgColor = document.getElementById('dashBgColor');

    if (primaryColor) {
      primaryColor.addEventListener('input', (e) => {
        this.designSettings.primaryColor = e.target.value;
        this.applyDesignSettings();
      });
    }
    if (secondaryColor) {
      secondaryColor.addEventListener('input', (e) => {
        this.designSettings.secondaryColor = e.target.value;
        this.applyDesignSettings();
      });
    }
    if (accentColor) {
      accentColor.addEventListener('input', (e) => {
        this.designSettings.accentColor = e.target.value;
        this.applyDesignSettings();
      });
    }
    if (bgColor) {
      bgColor.addEventListener('input', (e) => {
        this.designSettings.bgColor = e.target.value;
        this.applyDesignSettings();
      });
    }

    // Reset Colors
    const resetColors = document.getElementById('dashResetColors');
    if (resetColors) {
      resetColors.addEventListener('click', () => this.resetDesignColors());
    }
  }

  applyDesignSettings() {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) return;

    // Apply CSS custom properties
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

    // Apply font
    canvas.style.fontFamily = `'${this.designSettings.fontFamily}', sans-serif`;
    canvas.style.fontSize = `${this.designSettings.fontSize * 100}%`;

    // Apply background
    canvas.style.background = this.designSettings.bgColor;

    // Shadow mapping
    const shadowMap = {
      none: 'none',
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    };

    // Apply to cards
    const cards = canvas.querySelectorAll(
      '.dashboard-card, .stat-card, .data-table, .chart-card, .component-wrapper'
    );
    cards.forEach((card) => {
      card.style.borderRadius = `${this.designSettings.borderRadius}px`;
      card.style.boxShadow = shadowMap[this.designSettings.shadow];
    });

    // Apply spacing
    const grid = canvas.querySelector('.dashboard-grid');
    if (grid) {
      grid.style.gap = `${20 * this.designSettings.spacing}px`;
      grid.style.padding = `${24 * this.designSettings.spacing}px`;
    }

    // Apply primary color to buttons and accents
    const buttons = canvas.querySelectorAll('.btn-primary, .primary-btn');
    buttons.forEach((btn) => {
      btn.style.background = this.designSettings.primaryColor;
    });

    // Apply accent color to stats
    const statValues = canvas.querySelectorAll('.stat-value, .stat-change.positive');
    statValues.forEach((el) => {
      if (el.classList.contains('positive')) {
        el.style.color = this.designSettings.accentColor;
      }
    });

    // Inject theme CSS
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

    // Update inputs
    document.getElementById('dashPrimaryColor').value = this.designSettings.primaryColor;
    document.getElementById('dashSecondaryColor').value = this.designSettings.secondaryColor;
    document.getElementById('dashAccentColor').value = this.designSettings.accentColor;
    document.getElementById('dashBgColor').value = this.designSettings.bgColor;

    this.applyDesignSettings();
    this.showNotification('カラーをリセットしました');
  }

  // Component Preview Tooltip
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
    const template = dashboardTemplates[componentType];

    if (!template || !this.previewTooltip) return;

    const header = this.previewTooltip.querySelector('.preview-tooltip-header');
    const content = this.previewTooltip.querySelector('.preview-scale');

    header.textContent = template.name;
    content.innerHTML = template.html;

    // Position tooltip to the right of the sidebar
    const rect = item.getBoundingClientRect();
    const tooltipWidth = 280;
    const sidebarRight = document.querySelector('.db-sidebar')?.getBoundingClientRect().right || 300;

    this.previewTooltip.style.left = `${sidebarRight + 10}px`;
    this.previewTooltip.style.top = `${Math.max(60, rect.top - 20)}px`;

    // Ensure tooltip doesn't go off screen
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

  // Utilities
  generateId() {
    return `component-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
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

  showNotification(message, type = 'success') {
    const existing = document.querySelector('.db-notification');
    if (existing) existing.remove();

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

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
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
document.head.appendChild(style);

// Initialize dashboard generator
document.addEventListener('DOMContentLoaded', () => {
  window.dashboardGenerator = new DashboardGenerator();
  console.log('Dashboard Generator ready');
});
