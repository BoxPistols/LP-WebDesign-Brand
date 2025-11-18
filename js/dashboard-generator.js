// Dashboard Generator
// Drag & Drop Dashboard Builder

class DashboardGenerator {
    constructor() {
        this.components = [];
        this.currentLayout = 'sidebar-left';
        this.currentTheme = 'blue';
        this.draggedComponent = null;
        this.history = [];
        this.historyIndex = -1;
        this.designSettings = {
            fontSize: 14,
            spacing: 1.0,
            borderRadius: 8
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDesignCustomization();
        this.renderCanvas(); // Initialize canvas with empty state
        console.log('Dashboard Generator initialized');
    }

    setupEventListeners() {
        // Layout selection
        document.querySelectorAll('.layout-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleLayoutChange(e));
        });

        // Theme selection
        document.querySelectorAll('.theme-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleThemeChange(e));
        });

        // Component drag
        document.querySelectorAll('.component-item').forEach(item => {
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', (e) => this.handleComponentDragStart(e));
            item.addEventListener('dragend', (e) => this.handleComponentDragEnd(e));
        });

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
        document.getElementById('exportDashboard')?.addEventListener('click', () => this.exportDashboard());
        document.getElementById('clearDashboard')?.addEventListener('click', () => this.clearDashboard());
        document.getElementById('previewDashboard')?.addEventListener('click', () => this.previewDashboard());

        // Canvas controls
        document.querySelectorAll('.canvas-control').forEach(btn => {
            const action = btn.dataset.action;
            if (action === 'undo') {
                btn.addEventListener('click', () => this.undo());
            } else if (action === 'redo') {
                btn.addEventListener('click', () => this.redo());
            }
        });

        // Zoom controls
        document.querySelectorAll('.zoom-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleZoom(e));
        });

        // Device preview toggles
        document.querySelectorAll('.device-preview-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleDeviceChange(e));
        });
    }

    handleDeviceChange(e) {
        const btn = e.currentTarget;
        const device = btn.dataset.device;

        document.querySelectorAll('.device-preview-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const workspace = document.getElementById('canvasWorkspace');
        workspace.className = 'canvas-workspace';

        if (device === 'mobile') {
            workspace.classList.add('device-mobile');
        } else if (device === 'tablet') {
            workspace.classList.add('device-tablet');
        }

        this.showNotification(`プレビュー: ${device === 'desktop' ? 'デスクトップ' : device === 'tablet' ? 'タブレット' : 'モバイル'}`);
    }

    handleLayoutChange(e) {
        const btn = e.currentTarget;
        const layout = btn.dataset.layout;

        document.querySelectorAll('.layout-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        this.currentLayout = layout;
        this.renderCanvas(); // Re-render with new layout
        this.showNotification(`レイアウトを変更しました: ${layout}`);
    }

    handleThemeChange(e) {
        const btn = e.currentTarget;
        const theme = btn.dataset.theme;

        document.querySelectorAll('.theme-option').forEach(b => b.classList.remove('active'));
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
            dark: '#1f2937'
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
    }

    handleCanvasDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    handleCanvasDrop(e) {
        e.preventDefault();

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
            timestamp: Date.now()
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
            document.querySelectorAll('.quick-start-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.handleQuickStart(e));
            });
            return;
        }

        // Create dashboard grid container
        const grid = document.createElement('div');
        grid.className = 'dashboard-grid';

        // Add each component to the grid
        this.components.forEach(component => {
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
                wrapper.appendChild(componentElement);

                // Apply grid-col class to wrapper if component has it
                const gridColMatch = componentElement.className.match(/grid-col-\d+/);
                if (gridColMatch) {
                    wrapper.classList.add(gridColMatch[0]);
                } else {
                    wrapper.classList.add('grid-col-12'); // Default to full width
                }
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
        document.querySelectorAll('.component-control').forEach(btn => {
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
    }

    moveComponent(componentId, direction) {
        const index = this.components.findIndex(c => c.id === componentId);
        if (index === -1) return;

        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= this.components.length) return;

        // Swap components
        [this.components[index], this.components[newIndex]] = [this.components[newIndex], this.components[index]];

        this.saveState();
        this.renderCanvas();
        this.showNotification('コンポーネントを移動しました');
    }

    deleteComponent(componentId) {
        this.components = this.components.filter(c => c.id !== componentId);
        this.saveState();
        this.renderCanvas();
        this.showNotification('コンポーネントを削除しました');
    }

    attachDragListeners() {
        const wrappers = document.querySelectorAll('.dashboard-component-wrapper');

        wrappers.forEach(wrapper => {
            wrapper.addEventListener('dragstart', (e) => {
                wrapper.classList.add('dragging');
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', wrapper.dataset.componentId);
            });

            wrapper.addEventListener('dragend', (e) => {
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

        wrappers.forEach(wrapper => {
            const componentId = wrapper.dataset.componentId;
            const component = this.components.find(c => c.id === componentId);
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
            ecommerce: ['stats-cards', 'chart-bar', 'data-table', 'chart-pie']
        };

        const componentTypes = templates[templateName] || [];

        this.components = [];
        componentTypes.forEach(type => {
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
            timestamp: Date.now()
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
        const componentsHTML = this.components.map(c => c.template.html).join('\n');

        // Fetch and embed CSS files
        let embeddedCSS = '';
        try {
            const [designSystemCSS, dashboardCSS, generatorCSS] = await Promise.all([
                fetch('css/design-system.css').then(r => r.text()),
                fetch('css/dashboard-components.css').then(r => r.text()),
                fetch('css/dashboard-generator.css').then(r => r.text())
            ]);
            // Extract only layout-related CSS from generator (exclude builder UI)
            const layoutCSS = generatorCSS.split('/* ==========================================')[0] +
                              generatorCSS.substring(generatorCSS.indexOf('DASHBOARD LAYOUT PREVIEWS'));
            embeddedCSS = designSystemCSS + '\n' + dashboardCSS + '\n' + layoutCSS;
        } catch (error) {
            console.error('Failed to load CSS:', error);
            // Fallback to minimal CSS
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
                .dashboard-grid { display: grid; grid-template-columns: repeat(12, 1fr); gap: 24px; padding: 24px; }
                .grid-col-1 { grid-column: span 1; } .grid-col-2 { grid-column: span 2; }
                .grid-col-3 { grid-column: span 3; } .grid-col-4 { grid-column: span 4; }
                .grid-col-5 { grid-column: span 5; } .grid-col-6 { grid-column: span 6; }
                .grid-col-7 { grid-column: span 7; } .grid-col-8 { grid-column: span 8; }
                .grid-col-9 { grid-column: span 9; } .grid-col-10 { grid-column: span 10; }
                .grid-col-11 { grid-column: span 11; } .grid-col-12 { grid-column: span 12; }
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
        const zoomLevel = document.querySelector('.zoom-level');
        let currentZoom = parseInt(zoomLevel.textContent);

        if (action === 'zoom-in' && currentZoom < 200) {
            currentZoom += 10;
        } else if (action === 'zoom-out' && currentZoom > 50) {
            currentZoom -= 10;
        }

        zoomLevel.textContent = `${currentZoom}%`;

        const canvas = document.getElementById('dashboardCanvas');
        canvas.style.transform = `scale(${currentZoom / 100})`;
        canvas.style.transformOrigin = 'top left';
    }

    // Design Customization
    setupDesignCustomization() {
        // Font Size
        const fontSizeSelect = document.getElementById('dashFontSize');
        if (fontSizeSelect) {
            fontSizeSelect.addEventListener('change', (e) => {
                this.designSettings.fontSize = parseInt(e.target.value);
                this.applyFontSize(parseInt(e.target.value));
            });
        }

        // Spacing
        const spacingSelect = document.getElementById('dashSpacing');
        if (spacingSelect) {
            spacingSelect.addEventListener('change', (e) => {
                this.designSettings.spacing = parseFloat(e.target.value);
                this.applySpacing(parseFloat(e.target.value));
            });
        }

        // Border Radius
        const borderRadiusSelect = document.getElementById('dashBorderRadius');
        if (borderRadiusSelect) {
            borderRadiusSelect.addEventListener('change', (e) => {
                this.designSettings.borderRadius = parseInt(e.target.value);
                this.applyBorderRadius(parseInt(e.target.value));
            });
        }
    }

    applyFontSize(size) {
        const canvas = document.getElementById('dashboardCanvas');
        if (canvas) {
            canvas.style.fontSize = `${size}px`;
            this.showNotification(`フォントサイズを ${size}px に変更しました`);
        }
    }

    applySpacing(scale) {
        const canvas = document.getElementById('dashboardCanvas');
        if (canvas) {
            // Apply spacing scale to grid gaps and padding
            const cards = canvas.querySelectorAll('.dashboard-card, .stat-card, .data-table, .chart-card');
            cards.forEach(card => {
                const baseGap = 24;
                card.style.gap = `${baseGap * scale}px`;
                const basePadding = 24;
                card.style.padding = `${basePadding * scale}px`;
            });
            this.showNotification(`余白を ${scale * 100}% に変更しました`);
        }
    }

    applyBorderRadius(radius) {
        const canvas = document.getElementById('dashboardCanvas');
        if (canvas) {
            const elements = canvas.querySelectorAll('.dashboard-card, .stat-card, .data-table, .chart-card, .btn');
            elements.forEach(el => {
                el.style.borderRadius = `${radius}px`;
            });
            this.showNotification(`角丸を ${radius}px に変更しました`);
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
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
            z-index: 10000;
            font-family: 'Inter', sans-serif;
            font-weight: 600;
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
