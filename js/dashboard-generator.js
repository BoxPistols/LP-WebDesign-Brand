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

    // Grid Design Mode properties
    this.designMode = 'grid'; // 'grid' | 'component'
    this.gridRows = 3;
    this.gridAreas = [];
    this.isSelectingArea = false;
    this.selectionStart = null;
    this.selectionEnd = null;
    this.areaColors = ['blue', 'green', 'purple', 'orange', 'pink', 'cyan'];

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupDesignCustomization();
    this.setupSidebarToggles();
    this.setupInlineEditing();
    this.setupImageEditing();
    this.renderCanvas(); // Initialize canvas with empty state
    this.saveState(); // Save initial empty state for undo/redo
    this.updateUndoRedoButtons(); // Update button states
    console.log('Dashboard Generator initialized');
  }

  // ==========================================
  // INLINE EDITING FUNCTIONALITY
  // ==========================================

  setupInlineEditing() {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) {
      setTimeout(() => this.setupInlineEditing(), 500);
      return;
    }

    // Editable elements selector
    this.editableSelectors =
      'h1, h2, h3, h4, h5, h6, p, span:not(.component-icon):not(.component-name), a, button:not(.component-control):not(.lp-control-btn), li, label, td, th, .stat-value, .stat-label, .stat-change, .card-title, .card-value';

    // Double-click to edit text
    canvas.addEventListener('dblclick', (e) => {
      const target = e.target.closest(this.editableSelectors);

      if (
        target &&
        !target.classList.contains('component-control') &&
        !target.closest('.component-controls') &&
        !target.closest('.lp-section-controls')
      ) {
        e.preventDefault();
        e.stopPropagation();
        this.makeTextEditable(target);
      }
    });

    // Show edit hint on hover
    canvas.addEventListener('mouseover', (e) => {
      if (this.isEditing) return;

      const target = e.target.closest(this.editableSelectors);
      if (
        target &&
        !target.classList.contains('component-control') &&
        !target.closest('.component-controls')
      ) {
        target.classList.add('db-editable-hover');
      }
    });

    canvas.addEventListener('mouseout', (e) => {
      const target = e.target.closest(this.editableSelectors);
      if (target) {
        target.classList.remove('db-editable-hover');
      }
    });

    // Add inline editing styles
    this.addInlineEditingStyles();
  }

  makeTextEditable(element) {
    if (element.contentEditable === 'true') return;

    this.isEditing = true;
    const originalContent = element.textContent;
    const originalHTML = element.innerHTML;

    // Find which component this element belongs to
    const wrapper = element.closest('.dashboard-component-wrapper');
    const componentId = wrapper?.dataset?.componentId;

    // Make editable
    element.contentEditable = 'true';
    element.classList.add('db-inline-editing');
    element.classList.remove('db-editable-hover');
    element.focus();

    // Select all text
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Show hint
    this.showEditingHint();

    // Handle blur (save)
    const handleBlur = () => {
      element.contentEditable = 'false';
      element.classList.remove('db-inline-editing');
      this.hideEditingHint();
      this.isEditing = false;

      if (element.textContent !== originalContent) {
        // Update the component's template HTML to persist changes
        if (componentId) {
          this.updateComponentContent(componentId, wrapper);
        }
        this.saveState();
        this.showNotification('テキストを更新しました');
      }

      element.removeEventListener('blur', handleBlur);
      element.removeEventListener('keydown', handleKeydown);
    };

    // Handle keyboard
    const handleKeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
      if (e.key === 'Escape') {
        element.innerHTML = originalHTML;
        element.blur();
      }
    };

    element.addEventListener('blur', handleBlur);
    element.addEventListener('keydown', handleKeydown);
  }

  updateComponentContent(componentId, wrapper) {
    const component = this.components.find((c) => c.id === componentId);
    if (!component || !wrapper) return;

    // Get the content element (excluding controls)
    const clone = wrapper.cloneNode(true);
    const controls = clone.querySelector('.component-controls');
    if (controls) controls.remove();

    // Get the inner component (first child after controls)
    const innerComponent = clone.firstElementChild;
    if (innerComponent) {
      // Update the template HTML with the new content
      component.template = {
        ...component.template,
        html: innerComponent.outerHTML,
      };
    }
  }

  showEditingHint() {
    if (document.querySelector('.db-edit-hint')) return;

    const hint = document.createElement('div');
    hint.className = 'db-edit-hint';
    hint.innerHTML = `
      <span class="hint-key">Enter</span> 保存
      <span class="hint-sep">|</span>
      <span class="hint-key">Esc</span> キャンセル
      <span class="hint-sep">|</span>
      <span class="hint-key">Shift+Enter</span> 改行
    `;
    document.body.appendChild(hint);
  }

  hideEditingHint() {
    const hint = document.querySelector('.db-edit-hint');
    if (hint) hint.remove();
  }

  addInlineEditingStyles() {
    if (document.getElementById('db-inline-editing-styles')) return;

    const style = document.createElement('style');
    style.id = 'db-inline-editing-styles';
    style.textContent = `
      /* Editable hover state */
      .db-editable-hover {
        outline: 2px dashed rgba(59, 130, 246, 0.5) !important;
        outline-offset: 2px;
        cursor: text !important;
        border-radius: 4px;
      }

      /* Active editing state */
      .db-inline-editing {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px;
        background: rgba(59, 130, 246, 0.05) !important;
        min-width: 50px;
        cursor: text !important;
        border-radius: 4px;
      }

      .db-inline-editing:focus {
        outline: 2px solid #2563eb !important;
      }

      /* Edit hint */
      .db-edit-hint {
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
        animation: dbHintFadeIn 0.3s ease-out;
      }

      .db-edit-hint .hint-key {
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: monospace;
      }

      .db-edit-hint .hint-sep {
        opacity: 0.5;
      }

      @keyframes dbHintFadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }

      /* Image editable indicator */
      #dashboardCanvas img {
        cursor: pointer;
        transition: outline 0.2s ease;
      }

      #dashboardCanvas img:hover {
        outline: 2px dashed rgba(59, 130, 246, 0.5);
        outline-offset: 2px;
      }

      /* Selected component highlight */
      .dashboard-component-wrapper.selected {
        outline: 2px solid #3b82f6;
        outline-offset: 4px;
        border-radius: 8px;
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // IMAGE EDITING FUNCTIONALITY
  // ==========================================

  setupImageEditing() {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) return;

    // Click on image to edit
    canvas.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (img && !this.isEditing) {
        e.stopPropagation();
        this.showImageEditor(img);
      }
    });
  }

  showImageEditor(img) {
    // Find the component this image belongs to
    const wrapper = img.closest('.dashboard-component-wrapper');
    const componentId = wrapper?.dataset?.componentId;

    // Create modal for image editing
    const modal = document.createElement('div');
    modal.className = 'db-image-modal';
    modal.innerHTML = `
      <div class="db-image-modal-overlay"></div>
      <div class="db-image-modal-content">
        <div class="db-image-modal-header">
          <h3>画像を編集</h3>
          <button class="db-image-modal-close">&times;</button>
        </div>
        <div class="db-image-modal-body">
          <div class="db-image-preview">
            <img src="${img.src}" alt="${img.alt || ''}" />
          </div>
          <div class="db-image-form">
            <div class="db-form-group">
              <label>画像URL</label>
              <input type="url" class="db-input" id="dbImageUrlInput" value="${img.src}" placeholder="https://example.com/image.jpg" />
            </div>
            <div class="db-form-group">
              <label>Alt テキスト</label>
              <input type="text" class="db-input" id="dbImageAltInput" value="${img.alt || ''}" placeholder="画像の説明" />
            </div>
            <div class="db-form-group">
              <label>または画像をアップロード</label>
              <input type="file" accept="image/*" id="dbImageFileInput" class="db-input-file" />
            </div>
          </div>
        </div>
        <div class="db-image-modal-footer">
          <button class="db-btn db-btn-secondary" id="dbCancelImageEdit">キャンセル</button>
          <button class="db-btn db-btn-primary" id="dbSaveImageEdit">保存</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Add modal styles
    this.addImageModalStyles();

    const previewImg = modal.querySelector('.db-image-preview img');
    const urlInput = modal.querySelector('#dbImageUrlInput');
    const altInput = modal.querySelector('#dbImageAltInput');
    const fileInput = modal.querySelector('#dbImageFileInput');

    // URL input change - update preview
    urlInput.addEventListener('input', () => {
      previewImg.src = urlInput.value;
    });

    // File upload
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          urlInput.value = ev.target.result;
          previewImg.src = ev.target.result;
        };
        reader.readAsDataURL(file);
      }
    });

    // Close modal
    const closeModal = () => {
      modal.remove();
      document.body.style.overflow = '';
    };

    modal.querySelector('.db-image-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.db-image-modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('#dbCancelImageEdit').addEventListener('click', closeModal);

    // Save changes
    modal.querySelector('#dbSaveImageEdit').addEventListener('click', () => {
      const originalSrc = img.src;
      img.src = urlInput.value;
      img.alt = altInput.value;

      if (img.src !== originalSrc) {
        // Update component template
        if (componentId && wrapper) {
          this.updateComponentContent(componentId, wrapper);
        }
        this.saveState();
        this.showNotification('画像を更新しました');
      }
      closeModal();
    });

    // ESC to close
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEsc);
      }
    };
    document.addEventListener('keydown', handleEsc);
  }

  addImageModalStyles() {
    if (document.getElementById('db-image-modal-styles')) return;

    const style = document.createElement('style');
    style.id = 'db-image-modal-styles';
    style.textContent = `
      .db-image-modal {
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

      .db-image-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      .db-image-modal-content {
        position: relative;
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: dbModalSlideIn 0.3s ease-out;
      }

      @keyframes dbModalSlideIn {
        from { opacity: 0; transform: scale(0.95) translateY(-20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }

      .db-image-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 24px;
        border-bottom: 1px solid #e2e8f0;
      }

      .db-image-modal-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
      }

      .db-image-modal-close {
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

      .db-image-modal-close:hover {
        background: #e2e8f0;
        color: #1e293b;
      }

      .db-image-modal-body {
        padding: 24px;
        display: grid;
        gap: 20px;
      }

      .db-image-preview {
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

      .db-image-preview img {
        max-width: 100%;
        max-height: 250px;
        object-fit: contain;
        border-radius: 8px;
      }

      .db-image-form {
        display: grid;
        gap: 16px;
      }

      .db-form-group {
        display: grid;
        gap: 6px;
      }

      .db-form-group label {
        font-size: 14px;
        font-weight: 500;
        color: #475569;
      }

      .db-input {
        padding: 10px 14px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.2s;
      }

      .db-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .db-input-file {
        padding: 8px;
        background: #f8fafc;
      }

      .db-image-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px 24px;
        border-top: 1px solid #e2e8f0;
        background: #f8fafc;
      }

      .db-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .db-btn-primary {
        background: #3b82f6;
        color: white;
      }

      .db-btn-primary:hover {
        background: #2563eb;
      }

      .db-btn-secondary {
        background: #e2e8f0;
        color: #475569;
      }

      .db-btn-secondary:hover {
        background: #cbd5e1;
      }
    `;
    document.head.appendChild(style);
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
    document.getElementById('previewCode')?.addEventListener('click', () => this.openCodePreview());
    document
      .getElementById('clearDashboard')
      ?.addEventListener('click', () => this.clearDashboard());
    document
      .getElementById('previewDashboard')
      ?.addEventListener('click', () => this.previewDashboard());

    // Code Preview Modal
    document
      .getElementById('closeCodePreview')
      ?.addEventListener('click', () => this.closeCodePreview());
    document
      .getElementById('codePreviewOverlay')
      ?.addEventListener('click', () => this.closeCodePreview());
    document.getElementById('copyCode')?.addEventListener('click', () => this.copyCode());
    document
      .getElementById('downloadCode')
      ?.addEventListener('click', () => this.downloadGeneratedCode());
    document.querySelectorAll('.code-tab').forEach((tab) => {
      tab.addEventListener('click', (e) => this.switchCodeTab(e));
    });

    // Canvas controls
    document.querySelectorAll('.canvas-control').forEach((btn) => {
      const action = btn.dataset.action;
      if (action === 'undo') {
        btn.addEventListener('click', () => this.undo());
      } else if (action === 'redo') {
        btn.addEventListener('click', () => this.redo());
      }
    });

    // Keyboard shortcuts for Undo/Redo
    document.addEventListener('keydown', (e) => {
      // Ctrl+Z or Cmd+Z for Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      }
      // Ctrl+Shift+Z or Cmd+Shift+Z for Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        this.redo();
      }
      // Ctrl+Y or Cmd+Y for Redo (alternative)
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        this.redo();
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

    // Grid Design Mode - Mode tabs
    document.querySelectorAll('.mode-tab').forEach((tab) => {
      tab.addEventListener('click', (e) => this.handleModeChange(e));
    });

    // Grid Templates
    document.querySelectorAll('.grid-template-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.applyGridTemplate(e));
    });

    // Grid Row controls
    document.getElementById('addGridRow')?.addEventListener('click', () => this.addGridRow());
    document.getElementById('removeGridRow')?.addEventListener('click', () => this.removeGridRow());
    document
      .getElementById('clearGridAreas')
      ?.addEventListener('click', () => this.clearGridAreas());
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

    // Grid Design Mode - render grid overlay instead of components
    if (this.designMode === 'grid') {
      this.renderGridOverlay();
      return;
    }

    // Component Mode with Grid Areas - render areas as drop zones
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
        // Extract grid-col value from template before stripping
        const templateGridColMatch = componentElement.className.match(/grid-col-(\d+)/);
        const templateGridCol = templateGridColMatch ? parseInt(templateGridColMatch[1], 10) : null;

        // Remove existing grid-col class from component element
        componentElement.className = componentElement.className.replace(/grid-col-\d+/g, '').trim();
        wrapper.appendChild(componentElement);

        // Apply grid-col class: component data > template value > default
        const gridCol =
          component.gridCol || templateGridCol || this.getDefaultGridCol(component.type);
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
    // Check old components array
    if (this.components.length > 0) return true;
    // Check grid areas with components
    if (this.gridAreas.some((area) => area.components && area.components.length > 0)) return true;
    return false;
  }

  // Code Preview Modal Methods
  async openCodePreview() {
    const hasContent = this.hasExportableContent();
    if (!hasContent) {
      this.showNotification('プレビューするコンポーネントがありません', 'error');
      return;
    }

    const modal = document.getElementById('codePreviewModal');
    if (!modal) return;

    // Generate code based on mode
    if (this.gridAreas.length > 0) {
      this.generatedHTML = this.generateGridAreasHTML();
    } else {
      this.generatedHTML = this.components.map((c) => c.template.html).join('\n\n');
    }
    this.generatedCSS = await this.fetchCSS();
    this.generatedFullHTML = await this.generateFullHTML();

    // Show HTML tab by default
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
    // Simple HTML formatting
    return html.replace(/></g, '>\n<').replace(/(\s+)/g, ' ').trim();
  }

  async fetchCSS() {
    try {
      const css = await fetch('css/dashboard-components.css').then((r) => r.text());
      return css;
    } catch (e) {
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

  generateGridAreasHTML() {
    // Generate HTML from grid areas with their components
    const gridCSS = this.generateGridAreasCSS();
    let html = `<!-- Grid Layout Generated by Dashboard Generator -->\n`;
    html += `<style>\n${gridCSS}\n</style>\n\n`;
    html += `<div class="grid-areas-container">\n`;

    this.gridAreas.forEach((area) => {
      const areaClass = `grid-area-${area.id}`;
      html += `  <div class="${areaClass}" style="grid-column: ${area.startCol} / ${area.endCol + 1}; grid-row: ${area.startRow} / ${area.endRow + 1};">\n`;

      if (area.components && area.components.length > 0) {
        area.components.forEach((comp) => {
          const template = dashboardTemplates[comp.type];
          if (template) {
            html += `    ${template.html.trim()}\n`;
          }
        });
      } else {
        html += `    <!-- Empty Area: ${area.name} -->\n`;
      }

      html += `  </div>\n`;
    });

    html += `</div>`;
    return html;
  }

  generateGridAreasCSS() {
    let css = `.grid-areas-container {\n`;
    css += `  display: grid;\n`;
    css += `  grid-template-columns: repeat(12, 1fr);\n`;
    css += `  grid-template-rows: repeat(${this.gridRows}, minmax(100px, auto));\n`;
    css += `  gap: var(--grid-gap, 24px);\n`;
    css += `  padding: var(--grid-padding, 24px);\n`;
    css += `  background: #f8fafc;\n`;
    css += `  min-height: 100%;\n`;
    css += `}\n\n`;

    // Generate area-specific styles
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
    // Generate HTML content from grid areas (without wrapper styles)
    let html = '';
    this.gridAreas.forEach((area) => {
      const areaClass = `grid-area-${area.id}`;
      html += `<div class="${areaClass}" style="grid-column: ${area.startCol} / ${area.endCol + 1}; grid-row: ${area.startRow} / ${area.endRow + 1};">\n`;

      if (area.components && area.components.length > 0) {
        area.components.forEach((comp) => {
          const template = dashboardTemplates[comp.type];
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
    // Generate components HTML - either from grid areas or legacy components
    let componentsHTML = '';
    let gridAreasCSS = '';

    if (
      this.gridAreas.length > 0 &&
      this.gridAreas.some((a) => a.components && a.components.length > 0)
    ) {
      // Generate from grid areas
      componentsHTML = this.generateGridAreasContentHTML();
      gridAreasCSS = this.generateGridAreasCSS();
    } else if (this.components.length > 0) {
      // Legacy components
      componentsHTML = this.components.map((c) => c.template.html).join('\n');
    }

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
      if (gridAreasCSS) {
        embeddedCSS += '\n/* Grid Areas Styles */\n' + gridAreasCSS;
      }
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
    const state = {
      components: JSON.parse(JSON.stringify(this.components)),
      gridAreas: JSON.parse(JSON.stringify(this.gridAreas)),
      gridRows: this.gridRows,
    };

    // Remove future history if we're not at the end
    this.history = this.history.slice(0, this.historyIndex + 1);

    this.history.push(state);
    this.historyIndex++;

    // Limit history to 50 states
    if (this.history.length > 50) {
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
      this.gridRows = state.gridRows || 3;
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
      this.gridRows = state.gridRows || 3;
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
    const sidebarRight =
      document.querySelector('.db-sidebar')?.getBoundingClientRect().right || 300;

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

  // ==========================================
  // COMPONENT MODE WITH GRID AREAS
  // ==========================================

  renderComponentModeWithAreas() {
    const canvas = document.getElementById('dashboardCanvas');
    if (!canvas) return;

    canvas.innerHTML = '';

    // Create main grid container using CSS Grid
    const gridContainer = document.createElement('div');
    gridContainer.className = 'component-grid-container';
    gridContainer.style.cssText = `
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      grid-template-rows: repeat(${this.gridRows}, minmax(120px, auto));
      gap: 16px;
      padding: 24px;
      min-height: 400px;
      background: #f8fafc;
    `;

    // Create drop zones for each area
    this.gridAreas.forEach((area) => {
      const dropZone = document.createElement('div');
      dropZone.className = 'area-drop-zone';
      dropZone.dataset.areaId = area.id;
      dropZone.dataset.color = area.color;

      // Position using CSS Grid
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

      // Area label
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

      // Content container for components
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

      // Check if area has components
      const areaComponents = area.components || [];
      if (areaComponents.length === 0) {
        // Empty state
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
        // Render components in area
        areaComponents.forEach((comp, index) => {
          const compWrapper = document.createElement('div');
          compWrapper.className = 'area-component-wrapper';
          compWrapper.dataset.componentId = comp.id;
          compWrapper.dataset.areaId = area.id;
          compWrapper.dataset.index = index;
          compWrapper.draggable = true;

          // Apply spacing styles
          const spacing = comp.spacing || {};
          compWrapper.style.marginTop = spacing.marginTop ? `${spacing.marginTop}px` : '';
          compWrapper.style.marginBottom = spacing.marginBottom ? `${spacing.marginBottom}px` : '';
          compWrapper.style.marginLeft = spacing.marginLeft ? `${spacing.marginLeft}px` : '';
          compWrapper.style.marginRight = spacing.marginRight ? `${spacing.marginRight}px` : '';
          compWrapper.style.paddingTop = spacing.paddingTop ? `${spacing.paddingTop}px` : '';
          compWrapper.style.paddingBottom = spacing.paddingBottom
            ? `${spacing.paddingBottom}px`
            : '';
          compWrapper.style.paddingLeft = spacing.paddingLeft ? `${spacing.paddingLeft}px` : '';
          compWrapper.style.paddingRight = spacing.paddingRight ? `${spacing.paddingRight}px` : '';

          // Apply responsive data attributes
          const responsive = comp.responsive || {};
          if (responsive.hideOnMobile) compWrapper.dataset.hideMobile = 'true';
          if (responsive.hideOnTablet) compWrapper.dataset.hideTablet = 'true';
          if (responsive.mobileFullWidth) compWrapper.dataset.mobileFull = 'true';

          compWrapper.innerHTML = comp.template.html;

          // Add controls container
          const controls = document.createElement('div');
          controls.className = 'area-component-controls';

          // Drag handle
          const dragHandle = document.createElement('button');
          dragHandle.className = 'area-component-drag';
          dragHandle.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="5" r="2"/><circle cx="15" cy="5" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="9" cy="19" r="2"/><circle cx="15" cy="19" r="2"/></svg>`;
          dragHandle.title = 'ドラッグして移動';
          controls.appendChild(dragHandle);

          // Settings button
          const settingsBtn = document.createElement('button');
          settingsBtn.className = 'area-component-settings';
          settingsBtn.innerHTML = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
          settingsBtn.title = '設定';
          settingsBtn.onclick = (e) => {
            e.stopPropagation();
            this.showComponentSettings(area.id, comp.id);
          };
          controls.appendChild(settingsBtn);

          // Delete button
          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'area-component-delete';
          deleteBtn.innerHTML = '×';
          deleteBtn.title = '削除';
          deleteBtn.onclick = (e) => {
            e.stopPropagation();
            this.removeComponentFromArea(area.id, comp.id);
          };
          controls.appendChild(deleteBtn);

          compWrapper.appendChild(controls);

          // Drag events for reordering
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
            compWrapper.classList.remove('drag-over-top', 'drag-over-bottom');
          });

          contentContainer.appendChild(compWrapper);
        });
      }

      dropZone.appendChild(contentContainer);

      // Drag events for drop zone
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

    // Apply layout wrapper if needed
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

      // Add toggle handler
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

  getAreaBackgroundColor(colorName) {
    const colors = {
      blue: 'rgba(59, 130, 246, 0.08)',
      green: 'rgba(34, 197, 94, 0.08)',
      purple: 'rgba(168, 85, 247, 0.08)',
      orange: 'rgba(249, 115, 22, 0.08)',
      pink: 'rgba(236, 72, 153, 0.08)',
      cyan: 'rgba(6, 182, 212, 0.08)',
    };
    return colors[colorName] || colors.blue;
  }

  handleAreaDrop(areaId) {
    if (!this.draggedComponent) return;

    const template = dashboardTemplates[this.draggedComponent];
    if (!template) return;

    const area = this.gridAreas.find((a) => a.id === areaId);
    if (!area) return;

    // Initialize components array if not exists
    if (!area.components) area.components = [];

    // Add component to area
    const component = {
      id: this.generateId(),
      type: this.draggedComponent,
      template: template,
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

    // Find and remove component from source
    const compIndex = fromArea.components.findIndex((c) => c.id === componentId);
    if (compIndex === -1) return;
    const [component] = fromArea.components.splice(compIndex, 1);

    // Find target index in destination
    let targetIndex = toArea.components.findIndex((c) => c.id === targetComponentId);
    if (!insertBefore) targetIndex++;

    // If moving within same area, adjust index if needed
    if (fromAreaId === toAreaId && compIndex < targetIndex) {
      targetIndex--;
    }

    // Insert at new position
    toArea.components.splice(targetIndex, 0, component);

    this.saveState();
    this.renderCanvas();
    this.showNotification('コンポーネントを移動しました', 'success');
  }

  showComponentSettings(areaId, componentId) {
    const area = this.gridAreas.find((a) => a.id === areaId);
    if (!area) return;
    const component = area.components.find((c) => c.id === componentId);
    if (!component) return;

    // Initialize spacing if not exists
    if (!component.spacing) {
      component.spacing = {
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
      };
    }
    // Ensure all properties exist for older components
    component.spacing.marginLeft = component.spacing.marginLeft || 0;
    component.spacing.marginRight = component.spacing.marginRight || 0;
    component.spacing.paddingLeft = component.spacing.paddingLeft || 0;
    component.spacing.paddingRight = component.spacing.paddingRight || 0;

    if (!component.responsive) {
      component.responsive = { hideOnMobile: false, hideOnTablet: false, mobileFullWidth: true };
    }

    const modal = document.createElement('div');
    modal.className = 'component-settings-modal';
    modal.innerHTML = `
      <div class="settings-modal-overlay"></div>
      <div class="settings-modal-content">
        <div class="settings-modal-header">
          <h3>コンポーネント設定</h3>
          <button class="settings-modal-close">×</button>
        </div>
        <div class="settings-modal-body">
          <div class="settings-section">
            <h4>マージン（外側余白）</h4>
            <div class="spacing-controls spacing-grid">
              <div class="spacing-group">
                <label>上</label>
                <div class="spacing-input-row">
                  <input type="range" min="0" max="48" step="4" value="${component.spacing.marginTop}"
                    data-prop="marginTop" class="spacing-slider">
                  <span class="spacing-value">${component.spacing.marginTop}px</span>
                </div>
              </div>
              <div class="spacing-group">
                <label>下</label>
                <div class="spacing-input-row">
                  <input type="range" min="0" max="48" step="4" value="${component.spacing.marginBottom}"
                    data-prop="marginBottom" class="spacing-slider">
                  <span class="spacing-value">${component.spacing.marginBottom}px</span>
                </div>
              </div>
              <div class="spacing-group">
                <label>左</label>
                <div class="spacing-input-row">
                  <input type="range" min="0" max="48" step="4" value="${component.spacing.marginLeft}"
                    data-prop="marginLeft" class="spacing-slider">
                  <span class="spacing-value">${component.spacing.marginLeft}px</span>
                </div>
              </div>
              <div class="spacing-group">
                <label>右</label>
                <div class="spacing-input-row">
                  <input type="range" min="0" max="48" step="4" value="${component.spacing.marginRight}"
                    data-prop="marginRight" class="spacing-slider">
                  <span class="spacing-value">${component.spacing.marginRight}px</span>
                </div>
              </div>
            </div>
          </div>

          <div class="settings-section">
            <h4>パディング（内側余白）</h4>
            <div class="spacing-controls spacing-grid">
              <div class="spacing-group">
                <label>上</label>
                <div class="spacing-input-row">
                  <input type="range" min="0" max="32" step="4" value="${component.spacing.paddingTop}"
                    data-prop="paddingTop" class="spacing-slider">
                  <span class="spacing-value">${component.spacing.paddingTop}px</span>
                </div>
              </div>
              <div class="spacing-group">
                <label>下</label>
                <div class="spacing-input-row">
                  <input type="range" min="0" max="32" step="4" value="${component.spacing.paddingBottom}"
                    data-prop="paddingBottom" class="spacing-slider">
                  <span class="spacing-value">${component.spacing.paddingBottom}px</span>
                </div>
              </div>
              <div class="spacing-group">
                <label>左</label>
                <div class="spacing-input-row">
                  <input type="range" min="0" max="32" step="4" value="${component.spacing.paddingLeft}"
                    data-prop="paddingLeft" class="spacing-slider">
                  <span class="spacing-value">${component.spacing.paddingLeft}px</span>
                </div>
              </div>
              <div class="spacing-group">
                <label>右</label>
                <div class="spacing-input-row">
                  <input type="range" min="0" max="32" step="4" value="${component.spacing.paddingRight}"
                    data-prop="paddingRight" class="spacing-slider">
                  <span class="spacing-value">${component.spacing.paddingRight}px</span>
                </div>
              </div>
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

    // Event listeners
    const closeModal = () => {
      modal.remove();
    };

    modal.querySelector('.settings-modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('.settings-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.settings-btn-cancel').addEventListener('click', closeModal);

    // Spacing sliders
    modal.querySelectorAll('.spacing-slider').forEach((slider) => {
      slider.addEventListener('input', (e) => {
        const value = e.target.value;
        e.target.nextElementSibling.textContent = `${value}px`;
      });
    });

    // Apply button
    modal.querySelector('.settings-btn-apply').addEventListener('click', () => {
      // Save spacing
      modal.querySelectorAll('.spacing-slider').forEach((slider) => {
        const prop = slider.dataset.prop;
        component.spacing[prop] = parseInt(slider.value);
      });

      // Save responsive
      modal.querySelectorAll('[data-resp]').forEach((checkbox) => {
        const prop = checkbox.dataset.resp;
        component.responsive[prop] = checkbox.checked;
      });

      this.saveState();
      this.renderCanvas();
      closeModal();
      this.showNotification('設定を適用しました', 'success');
    });
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

  // ==========================================
  // GRID DESIGN MODE METHODS
  // ==========================================

  handleModeChange(e) {
    const tab = e.currentTarget;
    const mode = tab.dataset.mode;

    document.querySelectorAll('.mode-tab').forEach((t) => t.classList.remove('active'));
    tab.classList.add('active');

    this.designMode = mode;

    // Toggle body class for CSS visibility
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

    // Create grid content container
    const gridContent = document.createElement('div');
    gridContent.className = 'grid-design-container';
    gridContent.style.position = 'relative';

    // Column headers
    const headers = document.createElement('div');
    headers.className = 'grid-column-headers';
    for (let i = 1; i <= 12; i++) {
      const header = document.createElement('div');
      header.className = 'column-header';
      header.textContent = i;
      headers.appendChild(header);
    }
    gridContent.appendChild(headers);

    // Grid overlay
    const overlay = document.createElement('div');
    overlay.className = 'grid-overlay';
    overlay.id = 'gridOverlay';

    for (let row = 0; row < this.gridRows; row++) {
      for (let col = 0; col < 12; col++) {
        const cell = document.createElement('div');
        cell.className = 'grid-cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.textContent = `${col + 1}`;

        // Check if cell is occupied by an area
        const occupiedArea = this.gridAreas.find(
          (area) =>
            col >= area.startCol && col < area.endCol && row >= area.startRow && row < area.endRow
        );
        if (occupiedArea) {
          cell.classList.add('occupied');
        }

        // Mouse events for selection
        cell.addEventListener('mousedown', (e) => this.handleGridCellMouseDown(e, col, row));
        cell.addEventListener('mouseenter', (e) => this.handleGridCellMouseEnter(e, col, row));
        cell.addEventListener('mouseup', () => this.handleGridCellMouseUp());

        overlay.appendChild(cell);
      }
    }

    gridContent.appendChild(overlay);

    // Render defined areas (will be positioned after layout is applied)
    this.pendingAreas = [...this.gridAreas];

    // Apply layout wrapper based on currentLayout
    if (this.currentLayout === 'sidebar-left') {
      const layoutContainer = document.createElement('div');
      layoutContainer.className = 'db-layout-sidebar-left grid-design-layout';
      layoutContainer.innerHTML = `
        <aside class="db-sidebar grid-design-sidebar">
          <div class="db-sidebar-header">
            <h2>Sidebar</h2>
            <button class="sidebar-collapse-btn" id="collapseSidebarPreview" title="Toggle Sidebar">
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

      // Add collapse toggle
      layoutContainer.querySelector('#collapseSidebarPreview')?.addEventListener('click', () => {
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
            <button class="sidebar-collapse-btn" id="collapseSidebarPreview" title="Toggle Sidebar">
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

      // Add collapse toggle
      layoutContainer.querySelector('#collapseSidebarPreview')?.addEventListener('click', () => {
        layoutContainer.classList.toggle('sidebar-collapsed');
      });
    } else {
      canvas.appendChild(gridContent);
    }

    // Render defined areas after a short delay to ensure DOM is ready
    requestAnimationFrame(() => {
      const overlayEl = document.getElementById('gridOverlay');
      if (overlayEl && this.pendingAreas) {
        this.pendingAreas.forEach((area, index) => {
          const areaEl = this.createAreaElement(area, index);
          overlayEl.parentElement.appendChild(areaEl);
        });
      }
    });

    // Global mouseup handler
    document.addEventListener('mouseup', () => this.handleGridCellMouseUp(), { once: true });
  }

  handleGridCellMouseDown(e, col, row) {
    // Check if cell is occupied
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

  handleGridCellMouseEnter(e, col, row) {
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
    const area = {
      id: Date.now(),
      name: `Area ${this.gridAreas.length + 1}`,
      startCol: Math.min(start.col, end.col),
      endCol: Math.max(start.col, end.col) + 1,
      startRow: Math.min(start.row, end.row),
      endRow: Math.max(start.row, end.row) + 1,
      color: this.areaColors[this.gridAreas.length % this.areaColors.length],
      components: [],
    };

    // Check for overlap with existing areas
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
    this.saveState(); // Save state for undo/redo
    this.renderGridOverlay();
    this.showNotification(`${area.name} を作成しました`, 'success');
  }

  createAreaElement(area, index) {
    const overlay = document.getElementById('gridOverlay');
    if (!overlay) return document.createElement('div');

    const cells = overlay.querySelectorAll('.grid-cell');
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

    // Position relative to overlay
    areaEl.style.left = `${firstRect.left - overlayRect.left}px`;
    areaEl.style.top = `${firstRect.top - overlayRect.top}px`;
    areaEl.style.width = `${lastRect.right - firstRect.left}px`;
    areaEl.style.height = `${lastRect.bottom - firstRect.top}px`;

    // Label
    const label = document.createElement('span');
    label.className = 'grid-area-label';
    label.textContent = area.name;
    label.style.borderLeftColor = this.getAreaBorderColor(area.color);
    areaEl.appendChild(label);

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'grid-area-delete';
    deleteBtn.innerHTML = '×';
    deleteBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.deleteArea(area.id);
    });
    areaEl.appendChild(deleteBtn);

    // Click to rename
    areaEl.addEventListener('dblclick', () => this.renameArea(area.id));

    return areaEl;
  }

  getAreaBorderColor(colorName) {
    const colors = {
      blue: '#3b82f6',
      green: '#22c55e',
      purple: '#a855f7',
      orange: '#f97316',
      pink: '#ec4899',
      cyan: '#06b6d4',
    };
    return colors[colorName] || colors.blue;
  }

  deleteArea(areaId) {
    this.gridAreas = this.gridAreas.filter((a) => a.id !== areaId);
    this.saveState(); // Save state for undo/redo
    this.renderGridOverlay();
    this.showNotification('エリアを削除しました', 'info');
  }

  renameArea(areaId) {
    const area = this.gridAreas.find((a) => a.id === areaId);
    if (!area) return;

    const newName = prompt('エリア名を入力:', area.name);
    if (newName && newName.trim()) {
      area.name = newName.trim();
      this.saveState(); // Save state for undo/redo
      this.renderGridOverlay();
    }
  }

  addGridRow() {
    if (this.gridRows < 10) {
      this.gridRows++;
      document.getElementById('gridRowCount').textContent = this.gridRows;
      this.saveState(); // Save state for undo/redo
      this.renderGridOverlay();
    }
  }

  removeGridRow() {
    if (this.gridRows > 1) {
      // Check if any areas use the last row
      const hasAreasInLastRow = this.gridAreas.some((area) => area.endRow > this.gridRows - 1);
      if (hasAreasInLastRow) {
        this.showNotification('最後の行にエリアがあるため削除できません', 'error');
        return;
      }
      this.gridRows--;
      document.getElementById('gridRowCount').textContent = this.gridRows;
      this.saveState(); // Save state for undo/redo
      this.renderGridOverlay();
    }
  }

  clearGridAreas() {
    if (this.gridAreas.length === 0) return;
    if (confirm('すべてのエリアを削除しますか？')) {
      this.gridAreas = [];
      this.saveState(); // Save state for undo/redo
      this.renderGridOverlay();
      this.showNotification('すべてのエリアを削除しました', 'info');
    }
  }

  applyGridTemplate(e) {
    const btn = e.currentTarget;
    const template = btn.dataset.template;

    // Clear existing areas
    this.gridAreas = [];

    // Grid templates definition
    const templates = {
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
    };

    const templateAreas = templates[template];
    if (!templateAreas) return;

    // Calculate required rows
    const maxRow = Math.max(...templateAreas.map((a) => a.endRow));
    this.gridRows = maxRow;
    document.getElementById('gridRowCount').textContent = this.gridRows;

    // Create areas
    templateAreas.forEach((areaData, index) => {
      this.gridAreas.push({
        id: Date.now() + index,
        name: areaData.name,
        startCol: areaData.startCol,
        endCol: areaData.endCol,
        startRow: areaData.startRow,
        endRow: areaData.endRow,
        color: this.areaColors[index % this.areaColors.length],
        components: [],
      });
    });

    // Update active state
    document.querySelectorAll('.grid-template-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    this.saveState(); // Save state for undo/redo
    this.renderGridOverlay();
    this.showNotification(`${template} テンプレートを適用しました`, 'success');
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
