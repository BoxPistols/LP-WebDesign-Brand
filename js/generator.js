// Universal Landing Page Generator
// Main Application Logic

class LandingPageGenerator {
  constructor() {
    this.currentTheme = 'modern-blue';
    this.sections = [];
    this.animations = true;
    this.glassmorphism = false;
    this.deviceMode = 'desktop';
    this.autoSaveInterval = null;
    this.exportedHTML = null;
    this.cssMode = 'custom'; // 'custom' or 'tailwind'
    this.zoomLevel = 100; // Zoom level percentage

    // Undo/Redo 履歴管理
    this.history = [];
    this.historyIndex = -1;
    this.maxHistorySize = 50;

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
  }

  setupSectionAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach((header) => {
      header.addEventListener('click', () => {
        const accordionItem = header.closest('.accordion-item');
        const content = accordionItem.querySelector('.accordion-content');
        const isExpanded = header.getAttribute('aria-expanded') === 'true';

        // Toggle current accordion
        header.setAttribute('aria-expanded', !isExpanded);
        content.classList.toggle('open', !isExpanded);

        // Save accordion state to localStorage
        this.saveAccordionState();
      });
    });

    // Restore accordion state from localStorage
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

    localStorage.setItem('lpAccordionState', JSON.stringify(state));
  }

  restoreAccordionState() {
    const savedState = localStorage.getItem('lpAccordionState');
    if (!savedState) return;

    try {
      const state = JSON.parse(savedState);
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

  setupSidebarToggle() {
    const toggle = document.getElementById('sidebarToggle');
    const container = document.querySelector('.generator-container');

    if (toggle && container) {
      toggle.addEventListener('click', () => {
        container.classList.toggle('sidebar-collapsed');
        const isCollapsed = container.classList.contains('sidebar-collapsed');
        localStorage.setItem('lpSidebarCollapsed', isCollapsed);
      });

      // Restore state from localStorage
      if (localStorage.getItem('lpSidebarCollapsed') === 'true') {
        container.classList.add('sidebar-collapsed');
      }
    }
  }

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

    // Store original dimensions for zoom calculations
    let baseWidth = null;
    let baseHeight = null;

    // Apply zoom level (scale entire preview, maintain aspect ratio)
    const applyZoom = (level) => {
      this.zoomLevel = Math.max(25, Math.min(100, level));
      const scale = this.zoomLevel / 100;

      if (this.zoomLevel < 100) {
        // Fix dimensions to prevent responsive breakpoints from triggering
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
        // Reset to normal
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

      // Save to localStorage
      localStorage.setItem('lpZoomLevel', this.zoomLevel);
    };

    // Slider change
    zoomSlider.addEventListener('input', (e) => {
      applyZoom(parseInt(e.target.value));
    });

    // Zoom in button
    zoomIn?.addEventListener('click', () => {
      applyZoom(this.zoomLevel + 10);
    });

    // Zoom out button
    zoomOut?.addEventListener('click', () => {
      applyZoom(this.zoomLevel - 10);
    });

    // Fit to screen (compact view at 50%)
    zoomFit?.addEventListener('click', () => {
      applyZoom(50);
    });

    // Reset to 100%
    zoomReset?.addEventListener('click', () => {
      applyZoom(100);
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
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
          applyZoom(100);
        }
      }
    });

    // Mouse wheel zoom with Ctrl
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

    // Restore zoom level from localStorage
    const savedZoom = localStorage.getItem('lpZoomLevel');
    if (savedZoom) {
      applyZoom(parseInt(savedZoom));
    }
  }

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

      // Close on click outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.help-panel')) {
          helpContent.classList.remove('active');
        }
      });
    }
  }

  setupWelcomeModal() {
    const welcomeModal = document.getElementById('welcomeModal');
    const welcomeClose = document.getElementById('welcomeClose');
    const dontShowAgain = document.getElementById('dontShowAgain');

    if (!welcomeModal) return;

    // Check if user has dismissed the welcome modal
    const hideWelcome = localStorage.getItem('lpHideWelcome');

    if (hideWelcome !== 'true') {
      // Show welcome modal after a short delay
      setTimeout(() => {
        welcomeModal.classList.add('active');
      }, 500);
    }

    welcomeClose?.addEventListener('click', () => {
      welcomeModal.classList.remove('active');

      // Save preference if checkbox is checked
      if (dontShowAgain?.checked) {
        localStorage.setItem('lpHideWelcome', 'true');
      }
    });

    // Close on backdrop click
    welcomeModal.addEventListener('click', (e) => {
      if (e.target === welcomeModal) {
        welcomeModal.classList.remove('active');
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && welcomeModal.classList.contains('active')) {
        welcomeModal.classList.remove('active');
      }
    });
  }

  setupEventListeners() {
    // Theme selection
    document.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleThemeChange(e));
    });

    // Component addition (click and drag) with preview tooltip
    document.querySelectorAll('.component-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleComponentAdd(e));

      // Make draggable
      btn.setAttribute('draggable', 'true');
      btn.addEventListener('dragstart', (e) => this.handleComponentDragStart(e));
      btn.addEventListener('dragend', (e) => this.handleComponentDragEnd(e));

      // Preview tooltip on hover
      btn.addEventListener('mouseenter', (e) => this.showSectionPreview(e));
      btn.addEventListener('mouseleave', () => this.hideSectionPreview());
    });

    // Create preview tooltip
    this.createSectionPreviewTooltip();

    // Setup preview area as drop zone
    this.setupPreviewDropZone();

    // Device toggles
    document.querySelectorAll('.device-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleDeviceChange(e));
    });

    // Layout options
    document.getElementById('animationsToggle')?.addEventListener('change', (e) => {
      this.animations = e.target.checked;
      this.updatePreview();
    });

    document.getElementById('glassmorphismToggle')?.addEventListener('change', (e) => {
      this.glassmorphism = e.target.checked;
      this.updatePreview();
    });

    // Actions
    document.getElementById('exportHTML')?.addEventListener('click', () => this.exportHTML());
    document.getElementById('previewExport')?.addEventListener('click', () => this.previewExport());
    document.getElementById('clearAll')?.addEventListener('click', () => this.clearAll());

    // Project management
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

    // Export modal
    document
      .getElementById('exportModalClose')
      ?.addEventListener('click', () => this.closeExportModal());
    document.getElementById('copyCodeBtn')?.addEventListener('click', () => this.copyCode());
    document
      .getElementById('downloadCodeBtn')
      ?.addEventListener('click', () => this.downloadFromModal());

    // Close modal on backdrop click
    document.getElementById('exportModal')?.addEventListener('click', (e) => {
      if (e.target.id === 'exportModal') {
        this.closeExportModal();
      }
    });

    // Close modal on Escape key & Undo/Redo shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('exportModal');
        if (modal && modal.classList.contains('active')) {
          this.closeExportModal();
        }
      }

      // Undo: Ctrl+Z or Cmd+Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      }

      // Redo: Ctrl+Shift+Z or Cmd+Shift+Z or Ctrl+Y
      if (
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') ||
        ((e.ctrlKey || e.metaKey) && e.key === 'y')
      ) {
        e.preventDefault();
        this.redo();
      }
    });

    // CSS mode selection
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

  loadSectionTemplates() {
    // Templates are loaded from templates.js
    console.log('Section templates loaded');

    // Load saved projects list on init
    this.renderProjectsList();

    // Start auto-save (every 30 seconds)
    this.startAutoSave();
  }

  handleThemeChange(e) {
    const btn = e.currentTarget;
    const theme = btn.dataset.theme;

    // Update active state
    document.querySelectorAll('.theme-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    this.currentTheme = theme;
    this.updatePreview();
  }

  handleComponentAdd(e) {
    const btn = e.currentTarget;
    const component = btn.dataset.component;

    if (sectionTemplates[component]) {
      // Remove empty state if this is the first section
      if (this.sections.length === 0) {
        const emptyState = document.querySelector('.empty-state');
        if (emptyState) {
          emptyState.remove();
        }
      }

      this.sections.push({
        type: component,
        id: this.generateId(),
        template: sectionTemplates[component],
      });

      this.saveState();
      this.updatePreview();
      this.showNotification(`${sectionTemplates[component].name} を追加しました`);
    }
  }

  handleDeviceChange(e) {
    const btn = e.currentTarget;
    const device = btn.dataset.device;

    // Update active state
    document.querySelectorAll('.device-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    this.deviceMode = device;
    this.updateDeviceView();
  }

  updateDeviceView() {
    const previewFrame = document.getElementById('previewFrame');
    previewFrame.className = `preview-frame ${this.deviceMode}`;
  }

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

    // Add delete buttons to sections
    this.addSectionControls();

    // Make images editable
    if (typeof ImageManager !== 'undefined') {
      ImageManager.makeImagesEditable(previewFrame);
    }
  }

  generatePreviewHTML() {
    const sectionsHTML = this.sections
      .map((section) => {
        // Apply image changes if any
        let sectionHtml = section.template.html;
        if (section.imageChanges && section.imageChanges.length > 0) {
          sectionHtml = this.applyImageChanges(sectionHtml, section.imageChanges);
        }

        return `
                <div class="lp-section-wrapper" data-section-id="${section.id}" draggable="true">
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

  addSectionControls() {
    // Delete buttons
    document.querySelectorAll('.lp-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.currentTarget.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.deleteSection(sectionId);
      });
    });

    // Move up buttons
    document.querySelectorAll('.lp-move-up').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.currentTarget.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.moveSectionUp(sectionId);
      });
    });

    // Move down buttons
    document.querySelectorAll('.lp-move-down').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.currentTarget.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.moveSectionDown(sectionId);
      });
    });

    // Duplicate buttons
    document.querySelectorAll('.lp-duplicate').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.currentTarget.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.duplicateSection(sectionId);
      });
    });

    // Drag and Drop functionality
    this.setupDragAndDrop();
  }

  setupDragAndDrop() {
    const wrappers = document.querySelectorAll('.lp-section-wrapper');

    wrappers.forEach((wrapper) => {
      // Drag start
      wrapper.addEventListener('dragstart', (e) => {
        this.draggedItem = wrapper;
        wrapper.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', wrapper.dataset.sectionId);
      });

      // Drag end
      wrapper.addEventListener('dragend', () => {
        this.draggedItem = null;
        wrapper.classList.remove('dragging');
        document.querySelectorAll('.lp-section-wrapper').forEach((w) => {
          w.classList.remove('drag-over');
        });
      });

      // Drag over
      wrapper.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        if (this.draggedItem && this.draggedItem !== wrapper) {
          wrapper.classList.add('drag-over');
        }
      });

      // Drag leave
      wrapper.addEventListener('dragleave', () => {
        wrapper.classList.remove('drag-over');
      });

      // Drop
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

    // Remove dragged item and insert at target position
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

    // Show drop zone indicator
    const previewFrame = document.getElementById('previewFrame');
    previewFrame?.classList.add('drop-zone-active');
  }

  handleComponentDragEnd(e) {
    e.currentTarget.classList.remove('dragging');
    this.draggedComponentType = null;

    // Hide drop zone indicator
    const previewFrame = document.getElementById('previewFrame');
    previewFrame?.classList.remove('drop-zone-active');

    // Remove all drop indicators
    document.querySelectorAll('.drop-indicator').forEach((el) => el.remove());
  }

  setupPreviewDropZone() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) return;

    previewFrame.addEventListener('dragover', (e) => {
      if (!this.draggedComponentType) return;
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';

      // Find drop position
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

      // Cleanup
      document.querySelectorAll('.drop-indicator').forEach((el) => el.remove());
      previewFrame.classList.remove('drop-zone-active');
    });
  }

  updateDropIndicator(e) {
    const previewFrame = document.getElementById('previewFrame');
    const container = previewFrame.querySelector('.lp-container');
    if (!container) {
      // Show indicator for empty state
      this.showEmptyDropIndicator(previewFrame);
      return;
    }

    const wrappers = container.querySelectorAll('.lp-section-wrapper');
    if (wrappers.length === 0) {
      this.showEmptyDropIndicator(container);
      return;
    }

    // Remove existing indicators
    document.querySelectorAll('.drop-indicator').forEach((el) => el.remove());

    // Find the closest section
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

    // Remove empty state if first section
    if (this.sections.length === 0) {
      const emptyState = document.querySelector('.empty-state');
      if (emptyState) emptyState.remove();
    }

    const newSection = {
      type: componentType,
      id: this.generateId(),
      template: sectionTemplates[componentType],
    };

    // Insert at specific index
    this.sections.splice(index, 0, newSection);

    this.saveState();
    this.updatePreview();
    this.showNotification(`${sectionTemplates[componentType].name} を追加しました`);
  }

  applyImageChanges(html, imageChanges) {
    // Create a temporary container to parse the HTML
    const temp = document.createElement('div');
    temp.innerHTML = html;

    imageChanges.forEach((change) => {
      if (change.index < 1000) {
        // Regular image
        const images = temp.querySelectorAll('img');
        if (images[change.index]) {
          images[change.index].src = change.src;
          if (change.alt) images[change.index].alt = change.alt;
        }
      } else {
        // Background image
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

  // セクション複製
  duplicateSection(sectionId) {
    const index = this.sections.findIndex((s) => s.id === sectionId);
    if (index === -1) return;

    const original = this.sections[index];
    const duplicate = {
      type: original.type,
      id: this.generateId(),
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

    // 現在位置より後の履歴を削除
    this.history = this.history.slice(0, this.historyIndex + 1);

    this.history.push(state);
    this.historyIndex++;

    // 最大履歴サイズを超えたら古いものを削除
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
      // 最初の状態に戻す
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

  async exportHTML() {
    if (this.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    // Generate HTML and show preview modal
    const fullHTML = await this.generateFullHTML();
    this.showExportModal(fullHTML);
  }

  async previewExport() {
    if (this.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    // Get selected export format
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

    // Store the code for later download
    this.exportedHTML = code;
    this.currentPreviewTab = 'html';

    // Update modal title with format
    if (modalTitle) {
      modalTitle.textContent = `コードプレビュー - ${formatLabel}`;
    }

    // Remove existing tabs if any
    const existingTabs = modal.querySelector('.export-file-tabs');
    if (existingTabs) existingTabs.remove();

    // Add file tabs for html-external format
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

      // Add tab click handlers
      modal.querySelectorAll('.export-tab').forEach((tab) => {
        tab.addEventListener('click', () => {
          modal.querySelectorAll('.export-tab').forEach((t) => t.classList.remove('active'));
          tab.classList.add('active');
          this.currentPreviewTab = tab.dataset.tab;
          this.updateExportPreview();
        });
      });
    }

    // Display the code
    codePreview.textContent = code;

    // Calculate and display stats
    const lines = code.split('\n').length;
    const sizeKB = (new Blob([code]).size / 1024).toFixed(2);

    linesElement.textContent = lines;
    sizeElement.textContent = sizeKB;

    // Show modal
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

    // Remove tabs if any
    const tabs = modal.querySelector('.export-file-tabs');
    if (tabs) tabs.remove();
  }

  async copyCode() {
    if (!this.exportedHTML) return;

    // Copy currently visible content
    const content =
      this.currentPreviewTab === 'css' && this.exportCSS ? this.exportCSS : this.exportedHTML;

    try {
      await navigator.clipboard.writeText(content);
      const fileType = this.currentPreviewTab === 'css' ? 'CSS' : 'コード';
      this.showNotification(`${fileType}をクリップボードにコピーしました`);

      // Update button text temporarily
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
      this.showNotification('コピーに失敗しました', 'error');
    }
  }

  downloadFromModal() {
    if (!this.exportedHTML) return;

    // Determine file type based on filename
    const filename = this.exportFilename || `landing-page-${Date.now()}.html`;
    const isReact = filename.endsWith('.tsx') || filename.endsWith('.jsx');
    const isCSS = filename.endsWith('.css');
    const mimeType = isReact ? 'text/plain' : isCSS ? 'text/css' : 'text/html';

    // Download main file
    this.downloadFile(this.exportedHTML, filename, mimeType);

    // If html-external format, also download CSS file
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

  async generateFullHTML() {
    if (this.cssMode === 'tailwind') {
      return await this.generateTailwindHTML();
    } else {
      return await this.generateCustomCSSHTML();
    }
  }

  async generateCustomCSSHTML() {
    const sectionsHTML = this.sections.map((section) => section.template.html).join('\n');

    // Get SEO meta tags from enhanced generator if available
    let seoMetaTags = '';
    if (window.enhancedGenerator && window.enhancedGenerator.generateSEOMetaTags) {
      seoMetaTags = window.enhancedGenerator.generateSEOMetaTags();
    }

    // Get language setting from enhanced generator if available
    const lang = window.enhancedGenerator?.seoData?.lang || 'ja';

    // CDN URLs for CSS (via jsDelivr from GitHub)
    const cdnBase = 'https://cdn.jsdelivr.net/gh/BoxPistols/LP-WebDesign-Brand@main/css';

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

    // Get SEO meta tags from enhanced generator if available
    let seoMetaTags = '';
    if (window.enhancedGenerator && window.enhancedGenerator.generateSEOMetaTags) {
      seoMetaTags = window.enhancedGenerator.generateSEOMetaTags();
    }

    // Get language setting from enhanced generator if available
    const lang = window.enhancedGenerator?.seoData?.lang || 'ja';

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

  async generateTailwindHTML() {
    // Convert sections to Tailwind classes
    const sectionsHTML = this.sections
      .map((section) => this.convertToTailwind(section.template.html))
      .join('\n');

    // Get SEO meta tags from enhanced generator if available
    let seoMetaTags = '';
    if (window.enhancedGenerator && window.enhancedGenerator.generateSEOMetaTags) {
      seoMetaTags = window.enhancedGenerator.generateSEOMetaTags();
    }

    // Get language setting from enhanced generator if available
    const lang = window.enhancedGenerator?.seoData?.lang || 'ja';

    // Get theme colors
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
        // Intersection Observer for animations
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('opacity-100', 'translate-y-0');
                    entry.target.classList.remove('opacity-0', 'translate-y-8');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

        // Form handler
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

  convertToTailwind(html) {
    // Map of lp- classes to Tailwind classes (comprehensive mapping)
    const classMap = {
      // Sections
      'lp-section-alt': 'bg-gray-50',
      'lp-section': 'py-20 px-4 md:px-8 lg:px-16',
      'lp-hero-modern': 'relative overflow-hidden',
      'lp-hero':
        'min-h-screen flex items-center bg-gradient-to-br from-primary to-secondary text-white py-20 px-4',

      // Layout
      'lp-container': 'max-w-7xl mx-auto px-4',
      'lp-hero-content': 'relative z-10 max-w-3xl',
      'lp-section-header': 'text-center mb-16',

      // Typography
      'lp-hero-title': 'text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight',
      'lp-hero-subtitle': 'text-xl md:text-2xl opacity-90 mb-8',
      'lp-section-title': 'text-3xl md:text-4xl font-bold text-gray-900 mb-4',
      'lp-section-subtitle': 'text-lg text-gray-600 max-w-2xl mx-auto',
      'lp-gradient-text':
        'bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent',
      'lp-feature-title': 'text-xl font-semibold text-gray-900 mb-3',
      'lp-feature-description': 'text-gray-600 leading-relaxed',
      'lp-pricing-price': 'text-4xl font-bold text-gray-900 mb-2',
      'lp-pricing-period': 'text-gray-500',
      'lp-pricing-title': 'text-xl font-semibold text-gray-900 mb-2',
      'lp-pricing-description': 'text-gray-600 mb-6',
      'lp-testimonial-text': 'text-gray-700 mb-4 italic',
      'lp-testimonial-author': 'font-semibold text-gray-900',
      'lp-testimonial-role': 'text-sm text-gray-500',

      // Buttons
      'lp-btn-primary': 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl',
      'lp-btn-secondary': 'bg-secondary hover:bg-secondary/90 text-white',
      'lp-btn-ghost': 'border-2 border-white/30 text-white hover:bg-white/10',
      'lp-btn-outline': 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
      'lp-btn-lg': 'px-8 py-4 text-lg',
      'lp-btn':
        'inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300',
      'lp-hero-buttons': 'flex flex-col sm:flex-row gap-4',

      // Cards
      'lp-feature-card':
        'bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300',
      'lp-pricing-card-popular': 'ring-2 ring-primary scale-105',
      'lp-pricing-card': 'bg-white rounded-2xl p-8 shadow-lg border border-gray-100',
      'lp-testimonial-card': 'bg-white rounded-2xl p-6 shadow-lg',
      'lp-cta-content': 'max-w-3xl mx-auto text-center',

      // Grid
      'lp-features-grid': 'grid md:grid-cols-2 lg:grid-cols-3 gap-8',
      'lp-pricing-grid': 'grid md:grid-cols-3 gap-8 items-start',
      'lp-testimonials-grid': 'grid md:grid-cols-2 lg:grid-cols-3 gap-6',
      'lp-footer-grid': 'grid md:grid-cols-4 gap-8',

      // Stats
      'lp-hero-stats': 'flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/20',
      'lp-hero-stat-number': 'text-3xl font-bold',
      'lp-hero-stat-label': 'text-sm opacity-80',
      'lp-hero-stat': 'text-center',

      // Badges
      'lp-hero-badge':
        'inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6',
      'lp-badge-dot': 'w-2 h-2 bg-white rounded-full animate-pulse',
      'lp-pricing-badge':
        'absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-sm font-medium rounded-full',

      // Icons
      'lp-feature-icon-wrapper':
        'w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center text-white mb-6',
      'lp-feature-icon': 'w-8 h-8',

      // CTA
      'lp-cta': 'bg-gradient-to-r from-primary to-secondary text-white py-20 px-4',
      'lp-cta-title': 'text-3xl md:text-4xl font-bold mb-4',
      'lp-cta-subtitle': 'text-xl opacity-90 mb-8',

      // Forms
      'lp-contact-form': 'bg-white rounded-2xl p-8 shadow-xl',
      'lp-form-group': 'mb-6',
      'lp-form-label': 'block text-sm font-medium text-gray-700 mb-2',
      'lp-input':
        'w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition',
      'lp-textarea':
        'w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition resize-none',
      'lp-select':
        'w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition appearance-none bg-white',

      // Lists
      'lp-pricing-features': 'space-y-3 mb-8',
      'lp-pricing-feature': 'flex items-center gap-3 text-gray-600',
      'lp-footer-links': 'space-y-2',
      'lp-footer-link': 'text-gray-400 hover:text-white transition-colors',

      // Animation classes
      'lp-slide-up': 'opacity-0 translate-y-8 transition-all duration-700',
      'lp-fade-in': 'opacity-0 transition-opacity duration-700',

      // Visual elements
      'lp-hero-visual': 'relative mt-12 lg:mt-0',
      'lp-hero-image': 'rounded-2xl shadow-2xl',
      'lp-hero-bg-pattern': 'absolute inset-0 overflow-hidden pointer-events-none',
      'lp-hero-gradient-orb': 'absolute w-96 h-96 rounded-full blur-3xl opacity-30',
      'lp-hero-orb-1': 'bg-blue-500 top-0 right-0',
      'lp-hero-orb-2': 'bg-purple-500 bottom-0 left-1/4',
      'lp-hero-orb-3': 'bg-pink-500 top-1/2 right-1/4',

      // Footer
      'lp-footer': 'bg-gray-900 text-white py-16 px-4',
      'lp-footer-logo': 'text-2xl font-bold mb-4',
      'lp-footer-description': 'text-gray-400 mb-6',
      'lp-footer-title': 'font-semibold mb-4',
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

      // Gallery
      'lp-gallery-grid': 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4',
      'lp-gallery-item': 'aspect-square rounded-xl overflow-hidden',
      'lp-gallery-image':
        'w-full h-full object-cover hover:scale-110 transition-transform duration-300',

      // Timeline
      'lp-timeline': 'relative max-w-3xl mx-auto',
      'lp-timeline-item': 'relative pl-8 pb-8 border-l-2 border-primary/30 last:border-transparent',
      'lp-timeline-dot': 'absolute left-0 -translate-x-1/2 w-4 h-4 bg-primary rounded-full',
      'lp-timeline-content': 'bg-white rounded-xl p-6 shadow-lg',
      'lp-timeline-date': 'text-sm text-primary font-medium mb-2',
      'lp-timeline-title': 'text-lg font-semibold text-gray-900 mb-2',
      'lp-timeline-description': 'text-gray-600',
    };

    let result = html;

    // Sort by length (longest first) to match more specific classes first
    const sortedEntries = Object.entries(classMap).sort((a, b) => b[0].length - a[0].length);

    // Replace lp- classes with Tailwind equivalents (completely remove lp- classes)
    sortedEntries.forEach(([lpClass, twClasses]) => {
      // Match class="...lp-class..." patterns and replace the lp- class with Tailwind
      const regex = new RegExp(`\\b${lpClass}\\b`, 'g');
      result = result.replace(regex, twClasses);
    });

    // Clean up any remaining unmapped lp- classes (remove them entirely)
    result = result.replace(/\blp-[a-zA-Z0-9-]+\b\s*/g, '');

    // Clean up extra whitespace in class attributes
    result = result.replace(/class="([^"]*)"/g, (match, classes) => {
      const cleaned = classes.replace(/\s+/g, ' ').trim();
      return cleaned ? `class="${cleaned}"` : '';
    });

    // Remove empty class attributes
    result = result.replace(/\s*class=""\s*/g, ' ');

    // Add data-animate to elements with animation classes
    result = result.replace(
      /class="([^"]*(?:opacity-0[^"]*translate-y-8|transition-all duration-700)[^"]*)"/g,
      'class="$1" data-animate'
    );

    return result;
  }

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

    return themes[this.currentTheme] || themes['modern-blue'];
  }

  generateShadcnUI() {
    const themeColors = this.getThemeColors();

    // Convert HTML sections to React components
    const sectionComponents = this.sections
      .map((section) => {
        return this.convertToReactComponent(section);
      })
      .join('\n');

    // Generate imports based on used components
    const imports = this.getShadcnImports();

    // Get required shadcn components
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
    // Convert hex to HSL for CSS variables
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

  convertToReactComponent(section, index) {
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

    // Always include base components
    imports.add("import { Button } from '@/components/ui/button';");
    imports.add(
      "import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';"
    );

    // Check for specific sections
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

      const componentName = this.pascalCase(section.type);
      const componentCode = this.generateShadcnComponent(section);
      components.push(componentCode);
    });

    return components.join('\n\n');
  }

  generateShadcnComponent(section) {
    const componentName = this.pascalCase(section.type);
    const type = section.type;

    // Generate component based on section type
    if (type.includes('hero')) {
      return this.generateHeroComponent(componentName, type);
    } else if (type.includes('features')) {
      return this.generateFeaturesComponent(componentName, type);
    } else if (type.includes('pricing')) {
      return this.generatePricingComponent(componentName, type);
    } else if (type.includes('testimonial') || type.includes('carousel')) {
      return this.generateTestimonialsComponent(componentName, type);
    } else if (type.includes('cta')) {
      return this.generateCtaComponent(componentName, type);
    } else if (type.includes('faq') || type.includes('accordion')) {
      return this.generateFaqComponent(componentName, type);
    } else if (type.includes('contact')) {
      return this.generateContactComponent(componentName, type);
    } else if (type.includes('newsletter')) {
      return this.generateNewsletterComponent(componentName, type);
    } else if (type.includes('stats') || type.includes('metrics')) {
      return this.generateStatsComponent(componentName, type);
    } else if (type.includes('team')) {
      return this.generateTeamComponent(componentName, type);
    } else if (type.includes('gallery')) {
      return this.generateGalleryComponent(componentName, type);
    } else if (type.includes('logo')) {
      return this.generateLogoCloudComponent(componentName, type);
    } else {
      return this.generateGenericComponent(componentName, type);
    }
  }

  generateHeroComponent(name, type) {
    return `function ${name}() {
  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
          あなたのビジネスを次のレベルへ
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          革新的なソリューションで、ビジネスの成長を加速させましょう。
          今すぐ始めて、未来を切り開いてください。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            今すぐ始める
          </Button>
          <Button size="lg" variant="outline">
            詳しく見る
          </Button>
        </div>
      </div>
    </section>
  );
}`;
  }

  generateFeaturesComponent(name, type) {
    return `function ${name}() {
  const features = [
    {
      title: '高速パフォーマンス',
      description: '最新技術により、高速で安定したパフォーマンスを実現します。',
      icon: '⚡',
    },
    {
      title: 'セキュリティ',
      description: '業界最高水準のセキュリティで、大切なデータを保護します。',
      icon: '🔒',
    },
    {
      title: '24時間サポート',
      description: '専門チームが24時間体制でサポートいたします。',
      icon: '💬',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            主な機能
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            最高の体験を提供するための機能をご紹介します
          </p>
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

  generatePricingComponent(name, type) {
    return `function ${name}() {
  const plans = [
    {
      name: 'スターター',
      price: '¥980',
      period: '/月',
      description: '個人利用に最適',
      features: ['基本機能', 'メールサポート', '1GB ストレージ'],
      featured: false,
    },
    {
      name: 'プロ',
      price: '¥2,980',
      period: '/月',
      description: 'チーム利用に最適',
      features: ['全機能', '優先サポート', '10GB ストレージ', 'API アクセス'],
      featured: true,
    },
    {
      name: 'エンタープライズ',
      price: 'お問合せ',
      period: '',
      description: '大規模組織向け',
      features: ['カスタム機能', '専任サポート', '無制限ストレージ', 'SLA保証'],
      featured: false,
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            料金プラン
          </h2>
          <p className="text-lg text-muted-foreground">
            あなたに最適なプランをお選びください
          </p>
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
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-primary">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" variant={plan.featured ? 'default' : 'outline'}>
                  選択する
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generateTestimonialsComponent(name, type) {
    return `function ${name}() {
  const testimonials = [
    {
      name: '田中 太郎',
      role: 'マーケティング部長',
      company: 'ABC株式会社',
      content: 'このサービスを導入してから、業務効率が大幅に改善しました。チーム全体の生産性が向上しています。',
      avatar: '/api/placeholder/64/64',
    },
    {
      name: '佐藤 花子',
      role: 'CEO',
      company: 'XYZ Inc.',
      content: '素晴らしいサポートと機能性。私たちのビジネスに欠かせないツールになりました。',
      avatar: '/api/placeholder/64/64',
    },
    {
      name: '鈴木 一郎',
      role: 'エンジニア',
      company: 'テック株式会社',
      content: '直感的なUIと強力な機能が魅力です。導入してから3ヶ月で投資回収できました。',
      avatar: '/api/placeholder/64/64',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            お客様の声
          </h2>
          <p className="text-lg text-muted-foreground">
            実際にご利用いただいているお客様からの声をご紹介します
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
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

  generateCtaComponent(name, type) {
    return `function ${name}() {
  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          今すぐ始めましょう
        </h2>
        <p className="text-xl opacity-90 mb-8">
          14日間の無料トライアルで、すべての機能をお試しいただけます。
          クレジットカード不要で今すぐスタート。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary">
            無料で始める
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            お問い合わせ
          </Button>
        </div>
      </div>
    </section>
  );
}`;
  }

  generateFaqComponent(name, type) {
    return `function ${name}() {
  const faqs = [
    {
      question: 'サービスの利用に必要なものは？',
      answer: 'インターネット接続環境とウェブブラウザがあれば、すぐにご利用いただけます。特別なソフトウェアのインストールは不要です。',
    },
    {
      question: '無料トライアル期間はありますか？',
      answer: 'はい、14日間の無料トライアルをご用意しています。クレジットカードの登録なしでお試しいただけます。',
    },
    {
      question: 'プランの変更はいつでもできますか？',
      answer: 'はい、いつでもプランの変更が可能です。アップグレードは即座に反映され、ダウングレードは次の請求サイクルから適用されます。',
    },
    {
      question: 'サポート対応時間は？',
      answer: 'プロプラン以上では24時間365日のサポートを提供しています。スタータープランでは営業時間内（9:00-18:00 JST）のメールサポートとなります。',
    },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            よくある質問
          </h2>
          <p className="text-lg text-muted-foreground">
            お客様からよくいただくご質問にお答えします
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={\`item-\${index}\`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}`;
  }

  generateContactComponent(name, type) {
    return `function ${name}() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('お問い合わせを受け付けました（デモ）');
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-muted/50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            お問い合わせ
          </h2>
          <p className="text-lg text-muted-foreground">
            ご質問やご相談がございましたら、お気軽にお問い合わせください
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">お名前</Label>
                  <Input id="name" placeholder="山田 太郎" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input id="email" type="email" placeholder="you@example.com" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">件名</Label>
                <Input id="subject" placeholder="お問い合わせ内容" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">メッセージ</Label>
                <Textarea id="message" placeholder="詳細をご記入ください..." rows={5} required />
              </div>
              <Button type="submit" className="w-full">
                送信する
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}`;
  }

  generateNewsletterComponent(name, type) {
    return `function ${name}() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('ニュースレターに登録しました（デモ）');
  };

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-primary/5">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          ニュースレターに登録
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          最新情報やお得な情報をメールでお届けします
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Input
            type="email"
            placeholder="メールアドレスを入力"
            className="max-w-sm"
            required
          />
          <Button type="submit">登録する</Button>
        </form>
      </div>
    </section>
  );
}`;
  }

  generateStatsComponent(name, type) {
    return `function ${name}() {
  const stats = [
    { value: '10,000+', label: '利用企業数' },
    { value: '99.9%', label: '稼働率' },
    { value: '24/7', label: 'サポート対応' },
    { value: '50+', label: '連携サービス' },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generateTeamComponent(name, type) {
    return `function ${name}() {
  const team = [
    { name: '山田 太郎', role: 'CEO', avatar: '/api/placeholder/150/150' },
    { name: '佐藤 花子', role: 'CTO', avatar: '/api/placeholder/150/150' },
    { name: '鈴木 一郎', role: 'デザインリード', avatar: '/api/placeholder/150/150' },
    { name: '田中 美咲', role: 'マーケティング', avatar: '/api/placeholder/150/150' },
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            チームメンバー
          </h2>
          <p className="text-lg text-muted-foreground">
            私たちのサービスを支えるメンバーをご紹介します
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
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

  generateGalleryComponent(name, type) {
    return `function ${name}() {
  const images = [
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
  ];

  return (
    <section className="py-20 px-4 md:px-8 lg:px-16 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ギャラリー
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((src, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
              <img
                src={src}
                alt={\`Gallery image \${index + 1}\`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`;
  }

  generateLogoCloudComponent(name, type) {
    return `function ${name}() {
  const logos = [
    { name: 'Company 1', src: '/api/placeholder/120/40' },
    { name: 'Company 2', src: '/api/placeholder/120/40' },
    { name: 'Company 3', src: '/api/placeholder/120/40' },
    { name: 'Company 4', src: '/api/placeholder/120/40' },
    { name: 'Company 5', src: '/api/placeholder/120/40' },
  ];

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-muted-foreground mb-8">
          多くの企業様にご利用いただいています
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.name}
              className="h-8 opacity-60 hover:opacity-100 transition-opacity"
            />
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
            <CardDescription>
              This is a placeholder for the ${type} section.
              Customize this component to match your needs.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Add your content here.
            </p>
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
    // Collect components by package
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

    // Generate grouped imports
    const imports = [];

    // Material UI components (single line)
    const materialList = Array.from(materialComponents).sort();
    imports.push(`import { ${materialList.join(', ')} } from '@mui/material';`);

    // Icons (if any)
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

  async getInlineCSS() {
    // Load both landing-page.css and advanced-components.css
    try {
      const [landingPageCSS, advancedComponentsCSS] = await Promise.all([
        fetch('css/landing-page.css').then((r) => r.text()),
        fetch('css/advanced-components.css').then((r) => r.text()),
      ]);
      return `/* Landing Page Styles */\n${landingPageCSS}\n\n/* Advanced Components */\n${advancedComponentsCSS}`;
    } catch (error) {
      console.error('Failed to load CSS:', error);
      return '/* CSS loading failed - please include css/landing-page.css and css/advanced-components.css manually */';
    }
  }

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
    return `section-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // ==========================================
  // LOCAL STORAGE FUNCTIONALITY
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

    const projectData = {
      id: `project-${Date.now()}`,
      name: projectName,
      timestamp: Date.now(),
      data: {
        theme: this.currentTheme,
        sections: this.sections,
        animations: this.animations,
        glassmorphism: this.glassmorphism,
        deviceMode: this.deviceMode,
      },
    };

    // Get existing projects
    const projects = this.getAllProjects();

    // Add new project
    projects.push(projectData);

    // Save to localStorage
    localStorage.setItem('lp-generator-projects', JSON.stringify(projects));

    this.showNotification(`プロジェクト「${projectName}」を保存しました`);
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
    const data = localStorage.getItem('lp-generator-projects');
    return data ? JSON.parse(data) : [];
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

    // Sort by timestamp (newest first)
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

        return `
                <div class="saved-project-item" data-project-id="${project.id}">
                    <div class="project-info" onclick="window.lpGenerator.loadProjectById('${project.id}')">
                        <div class="project-name">${project.name}</div>
                        <div class="project-meta">${dateStr} ${timeStr} · ${sectionCount}セクション</div>
                    </div>
                    <div class="project-actions">
                        <button class="project-action-btn" onclick="window.lpGenerator.loadProjectById('${project.id}')" title="読み込む">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 9l-5 5-5-5M12 12.8V2.5"/>
                            </svg>
                        </button>
                        <button class="project-action-btn delete" onclick="window.lpGenerator.deleteProject('${project.id}')" title="削除">
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

    // Load project data
    this.currentTheme = project.data.theme;
    this.sections = project.data.sections;
    this.animations = project.data.animations !== undefined ? project.data.animations : true;
    this.glassmorphism = project.data.glassmorphism || false;
    this.deviceMode = project.data.deviceMode || 'desktop';

    // Update UI
    document.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.theme === this.currentTheme);
    });

    document.getElementById('animationsToggle').checked = this.animations;
    document.getElementById('glassmorphismToggle').checked = this.glassmorphism;

    this.updatePreview();
    this.showNotification(`プロジェクト「${project.name}」を読み込みました`);

    // Close the projects list
    document.getElementById('savedProjectsList').classList.remove('active');
  }

  deleteProject(projectId) {
    if (!confirm('このプロジェクトを削除してもよろしいですか？')) {
      return;
    }

    let projects = this.getAllProjects();
    projects = projects.filter((p) => p.id !== projectId);

    localStorage.setItem('lp-generator-projects', JSON.stringify(projects));

    this.showNotification('プロジェクトを削除しました');
    this.renderProjectsList();
  }

  startAutoSave() {
    // Auto-save every 30 seconds if there are sections
    this.autoSaveInterval = setInterval(() => {
      if (this.sections.length > 0) {
        this.autoSave();
      }
    }, 30000); // 30 seconds
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

    localStorage.setItem('lp-generator-autosave', JSON.stringify(autoSaveData));
    console.log('Auto-saved at', new Date().toLocaleTimeString());
  }

  loadAutoSave() {
    const data = localStorage.getItem('lp-generator-autosave');
    if (!data) return false;

    const autoSaveData = JSON.parse(data);

    // Check if auto-save is recent (within 24 hours)
    const hoursSinceAutoSave = (Date.now() - autoSaveData.timestamp) / (1000 * 60 * 60);
    if (hoursSinceAutoSave > 24) return false;

    if (confirm('前回の作業内容が見つかりました。復元しますか？')) {
      this.currentTheme = autoSaveData.theme;
      this.sections = autoSaveData.sections;
      this.animations = autoSaveData.animations;
      this.glassmorphism = autoSaveData.glassmorphism;
      this.deviceMode = autoSaveData.deviceMode;

      // Update UI
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

          // Validate project data
          if (projectData.type !== 'lp-generator-project') {
            throw new Error('Invalid project file format');
          }

          // Restore project
          this.currentTheme = projectData.data.theme || 'modern-blue';
          this.animations =
            projectData.data.animations !== undefined ? projectData.data.animations : true;
          this.glassmorphism = projectData.data.glassmorphism || false;

          // Restore sections with templates from sectionTemplates
          this.sections = projectData.data.sections.map((section) => {
            const originalTemplate = sectionTemplates[section.type];
            return {
              type: section.type,
              id: section.id || this.generateId(),
              customContent: section.customContent,
              template: originalTemplate || section.template,
            };
          });

          // Update UI
          document.querySelectorAll('.theme-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.theme === this.currentTheme);
          });
          document.getElementById('animationsToggle').checked = this.animations;
          document.getElementById('glassmorphismToggle').checked = this.glassmorphism;

          this.saveState();
          this.updatePreview();
          this.showNotification('プロジェクトをインポートしました');
        } catch (error) {
          console.error('Import error:', error);
          this.showNotification('ファイルの読み込みに失敗しました', 'error');
        }
      };

      reader.readAsText(file);
    };

    input.click();
  }

  // ==========================================
  // INLINE EDITING WITH CONTENT SAVE
  // ==========================================

  setupInlineEditing() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) return;

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

  makeElementEditable(element) {
    if (element.contentEditable === 'true') return;

    const originalContent = element.innerHTML;
    element.contentEditable = 'true';
    element.style.outline = '2px solid #3b82f6';
    element.style.outlineOffset = '2px';
    element.style.background = 'rgba(59, 130, 246, 0.05)';
    element.focus();

    // Select all text
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

      // Save content change to section
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
      // Store custom content modifications
      if (!section.customContent) {
        section.customContent = {};
      }

      // Create a unique identifier for this element
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

  showNotification(message, type = 'success') {
    // Remove existing notification
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

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // Section Preview Tooltip
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
    const template = sectionTemplates[componentType];

    if (!template || !this.sectionPreviewTooltip) return;

    const header = this.sectionPreviewTooltip.querySelector('.preview-tooltip-header');
    const content = this.sectionPreviewTooltip.querySelector('.preview-scale');

    header.textContent = template.name;

    // Create a mini version of the section with inline styles for preview
    const previewHTML = `
      <div style="background: white; padding: 10px; border-radius: 8px; font-family: 'Inter', sans-serif;">
        ${template.html}
      </div>
    `;
    content.innerHTML = previewHTML;

    // Position tooltip
    const rect = btn.getBoundingClientRect();
    const sidebar = document.querySelector('.sidebar');
    const sidebarRight = sidebar ? sidebar.getBoundingClientRect().right : 320;

    this.sectionPreviewTooltip.style.left = `${sidebarRight + 12}px`;
    this.sectionPreviewTooltip.style.top = `${Math.max(80, rect.top - 40)}px`;

    // Ensure tooltip doesn't go off screen
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
`;
document.head.appendChild(style);

// Initialize the generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.lpGenerator = new LandingPageGenerator();
  console.log('Landing Page Generator initialized');

  // Check for auto-save after a short delay to ensure everything is loaded
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
    // Create lightbox HTML
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

    // Close lightbox
    closeBtn?.addEventListener('click', () => this.close());
    lightbox?.addEventListener('click', (e) => {
      if (e.target.id === 'lightbox') this.close();
    });

    // Navigation
    prevBtn?.addEventListener('click', () => this.prev());
    nextBtn?.addEventListener('click', () => this.next());

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    // Gallery items click handler using delegation
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

// Initialize lightbox when DOM is ready
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
    // Load saved preference from localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'enabled') {
      this.enable();
    }

    // Attach event listener
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
    localStorage.setItem('darkMode', 'enabled');
  }

  disable() {
    document.body.classList.remove('dark-mode');
    if (this.modeText) this.modeText.textContent = 'Dark Mode';
    localStorage.setItem('darkMode', 'disabled');
  }
}

// Initialize dark mode toggle when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.darkModeToggle = new DarkModeToggle();
});
