// Common Editor Module
// Shared inline editing and CRUD functionality for LP Generator and Dashboard Generator

class CommonEditor {
  constructor(options = {}) {
    this.previewSelector = options.previewSelector || '#previewFrame';
    this.sectionWrapperClass = options.sectionWrapperClass || 'lp-section-wrapper';
    this.controlsClass = options.controlsClass || 'section-controls';
    this.onContentChange = options.onContentChange || null;
    this.onSaveState = options.onSaveState || null;
    this.showNotification = options.showNotification || this.defaultNotification.bind(this);

    this.editableSelectors = 'h1, h2, h3, h4, h5, h6, p, span, a, button, li, label, td, th';
    this.isEditing = false;

    this.init();
  }

  init() {
    this.addEditorStyles();
    this.setupInlineEditing();
    this.setupImageEditing();
  }

  // ==========================================
  // INLINE TEXT EDITING
  // ==========================================

  setupInlineEditing() {
    const preview = document.querySelector(this.previewSelector);
    if (!preview) {
      setTimeout(() => this.setupInlineEditing(), 500);
      return;
    }

    // Double-click to edit text
    preview.addEventListener('dblclick', (e) => {
      const target = e.target.closest(this.editableSelectors);

      if (
        target &&
        !target.classList.contains('component-control') &&
        !target.classList.contains('lp-control-btn') &&
        !target.closest('.component-controls') &&
        !target.closest('.lp-section-controls') &&
        !target.closest(`.${this.controlsClass}`)
      ) {
        e.preventDefault();
        e.stopPropagation();
        this.makeTextEditable(target);
      }
    });

    // Show edit hint on hover
    preview.addEventListener('mouseover', (e) => {
      if (this.isEditing) return;

      const target = e.target.closest(this.editableSelectors);
      if (
        target &&
        !target.classList.contains('component-control') &&
        !target.closest('.component-controls') &&
        !target.closest(`.${this.controlsClass}`)
      ) {
        target.classList.add('common-editable-hover');
      }
    });

    preview.addEventListener('mouseout', (e) => {
      const target = e.target.closest(this.editableSelectors);
      if (target) {
        target.classList.remove('common-editable-hover');
      }
    });
  }

  makeTextEditable(element) {
    if (element.contentEditable === 'true') return;

    this.isEditing = true;
    const originalContent = element.textContent;
    const originalHTML = element.innerHTML;

    // Make editable
    element.contentEditable = 'true';
    element.classList.add('common-inline-editing');
    element.classList.remove('common-editable-hover');
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
      element.classList.remove('common-inline-editing');
      this.hideEditingHint();
      this.isEditing = false;

      if (element.textContent !== originalContent) {
        if (this.onContentChange) {
          this.onContentChange(element, originalContent, element.textContent);
        }
        if (this.onSaveState) {
          this.onSaveState();
        }
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

  showEditingHint() {
    if (document.querySelector('.common-edit-hint')) return;

    const hint = document.createElement('div');
    hint.className = 'common-edit-hint';
    hint.innerHTML = `
      <span class="hint-key">Enter</span> 保存
      <span class="hint-separator">|</span>
      <span class="hint-key">Esc</span> キャンセル
      <span class="hint-separator">|</span>
      <span class="hint-key">Shift+Enter</span> 改行
    `;
    document.body.appendChild(hint);
  }

  hideEditingHint() {
    const hint = document.querySelector('.common-edit-hint');
    if (hint) hint.remove();
  }

  // ==========================================
  // IMAGE EDITING
  // ==========================================

  setupImageEditing() {
    const preview = document.querySelector(this.previewSelector);
    if (!preview) return;

    // Click on image to edit
    preview.addEventListener('click', (e) => {
      const img = e.target.closest('img');
      if (img && !img.dataset.editMode) {
        this.showImageEditor(img);
      }
    });

    // Make images show edit indicator on hover
    preview.addEventListener('mouseover', (e) => {
      const img = e.target.closest('img');
      if (img && !this.isEditing) {
        img.classList.add('common-image-editable');
      }
    });

    preview.addEventListener('mouseout', (e) => {
      const img = e.target.closest('img');
      if (img) {
        img.classList.remove('common-image-editable');
      }
    });
  }

  showImageEditor(img) {
    // Create modal for image editing
    const modal = document.createElement('div');
    modal.className = 'common-image-modal';
    modal.innerHTML = `
      <div class="common-image-modal-overlay"></div>
      <div class="common-image-modal-content">
        <div class="common-image-modal-header">
          <h3>画像を編集</h3>
          <button class="common-image-modal-close">&times;</button>
        </div>
        <div class="common-image-modal-body">
          <div class="common-image-preview">
            <img src="${img.src}" alt="${img.alt || ''}" />
          </div>
          <div class="common-image-form">
            <div class="common-form-group">
              <label>画像URL</label>
              <input type="url" class="common-input" id="imageUrlInput" value="${img.src}" placeholder="https://example.com/image.jpg" />
            </div>
            <div class="common-form-group">
              <label>Alt テキスト</label>
              <input type="text" class="common-input" id="imageAltInput" value="${img.alt || ''}" placeholder="画像の説明" />
            </div>
            <div class="common-form-group">
              <label>または画像をアップロード</label>
              <input type="file" accept="image/*" id="imageFileInput" class="common-input-file" />
            </div>
          </div>
        </div>
        <div class="common-image-modal-footer">
          <button class="common-btn common-btn-secondary" id="cancelImageEdit">キャンセル</button>
          <button class="common-btn common-btn-primary" id="saveImageEdit">保存</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    const previewImg = modal.querySelector('.common-image-preview img');
    const urlInput = modal.querySelector('#imageUrlInput');
    const altInput = modal.querySelector('#imageAltInput');
    const fileInput = modal.querySelector('#imageFileInput');

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

    modal.querySelector('.common-image-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.common-image-modal-overlay').addEventListener('click', closeModal);
    modal.querySelector('#cancelImageEdit').addEventListener('click', closeModal);

    // Save changes
    modal.querySelector('#saveImageEdit').addEventListener('click', () => {
      const originalSrc = img.src;
      img.src = urlInput.value;
      img.alt = altInput.value;

      if (img.src !== originalSrc) {
        if (this.onSaveState) {
          this.onSaveState();
        }
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

  // ==========================================
  // CRUD CONTROLS GENERATOR
  // ==========================================

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

    let html = '<div class="common-component-controls">';

    if (showDragHandle) {
      html += `
        <button class="common-control-btn common-drag-handle" title="ドラッグして移動" aria-label="ドラッグして移動">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/>
            <circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/>
          </svg>
        </button>
      `;
    }

    if (showMoveUp) {
      html += `
        <button class="common-control-btn common-move-up" title="上に移動" aria-label="上に移動" data-action="move-up">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      `;
    }

    if (showMoveDown) {
      html += `
        <button class="common-control-btn common-move-down" title="下に移動" aria-label="下に移動" data-action="move-down">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>
      `;
    }

    if (showDuplicate) {
      html += `
        <button class="common-control-btn common-duplicate" title="複製" aria-label="複製" data-action="duplicate">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </button>
      `;
    }

    if (showEdit) {
      html += `
        <button class="common-control-btn common-edit" title="編集" aria-label="編集" data-action="edit">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
          </svg>
        </button>
      `;
    }

    if (showSettings) {
      html += `
        <button class="common-control-btn common-settings" title="設定" aria-label="設定" data-action="settings">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>
      `;
    }

    if (showDelete) {
      html += `
        <button class="common-control-btn common-delete" title="削除" aria-label="削除" data-action="delete">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
          </svg>
        </button>
      `;
    }

    html += '</div>';
    return html;
  }

  // ==========================================
  // STYLES
  // ==========================================

  addEditorStyles() {
    if (document.getElementById('common-editor-styles')) return;

    const style = document.createElement('style');
    style.id = 'common-editor-styles';
    style.textContent = `
      /* Editable hover state */
      .common-editable-hover {
        outline: 2px dashed rgba(59, 130, 246, 0.5) !important;
        outline-offset: 2px;
        cursor: text !important;
      }

      /* Active editing state */
      .common-inline-editing {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px;
        background: rgba(59, 130, 246, 0.05) !important;
        min-width: 50px;
        cursor: text !important;
      }

      .common-inline-editing:focus {
        outline: 2px solid #2563eb !important;
      }

      /* Edit hint */
      .common-edit-hint {
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
        animation: hintFadeIn 0.3s ease-out;
      }

      .common-edit-hint .hint-key {
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 8px;
        border-radius: 4px;
        font-family: monospace;
      }

      .common-edit-hint .hint-separator {
        opacity: 0.5;
      }

      @keyframes hintFadeIn {
        from { opacity: 0; transform: translateX(-50%) translateY(10px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
      }

      /* Image editable indicator */
      .common-image-editable {
        cursor: pointer !important;
        outline: 2px dashed rgba(59, 130, 246, 0.5);
        outline-offset: 2px;
      }

      .common-image-editable::after {
        content: 'クリックして編集';
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.75);
        color: white;
        padding: 4px 12px;
        border-radius: 4px;
        font-size: 12px;
        white-space: nowrap;
      }

      /* Image modal */
      .common-image-modal {
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

      .common-image-modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
      }

      .common-image-modal-content {
        position: relative;
        background: white;
        border-radius: 16px;
        width: 90%;
        max-width: 600px;
        max-height: 90vh;
        overflow: hidden;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        animation: modalSlideIn 0.3s ease-out;
      }

      @keyframes modalSlideIn {
        from { opacity: 0; transform: scale(0.95) translateY(-20px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }

      .common-image-modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 24px;
        border-bottom: 1px solid #e2e8f0;
      }

      .common-image-modal-header h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #1e293b;
      }

      .common-image-modal-close {
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

      .common-image-modal-close:hover {
        background: #e2e8f0;
        color: #1e293b;
      }

      .common-image-modal-body {
        padding: 24px;
        display: grid;
        gap: 20px;
      }

      .common-image-preview {
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

      .common-image-preview img {
        max-width: 100%;
        max-height: 250px;
        object-fit: contain;
        border-radius: 8px;
      }

      .common-image-form {
        display: grid;
        gap: 16px;
      }

      .common-form-group {
        display: grid;
        gap: 6px;
      }

      .common-form-group label {
        font-size: 14px;
        font-weight: 500;
        color: #475569;
      }

      .common-input {
        padding: 10px 14px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        font-size: 14px;
        transition: all 0.2s;
      }

      .common-input:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }

      .common-input-file {
        padding: 8px;
        background: #f8fafc;
      }

      .common-image-modal-footer {
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px 24px;
        border-top: 1px solid #e2e8f0;
        background: #f8fafc;
      }

      .common-btn {
        padding: 10px 20px;
        border: none;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
      }

      .common-btn-primary {
        background: #3b82f6;
        color: white;
      }

      .common-btn-primary:hover {
        background: #2563eb;
      }

      .common-btn-secondary {
        background: #e2e8f0;
        color: #475569;
      }

      .common-btn-secondary:hover {
        background: #cbd5e1;
      }

      /* Component Controls */
      .common-component-controls {
        position: absolute;
        top: 10px;
        right: 10px;
        display: none;
        gap: 6px;
        z-index: 100;
      }

      *:hover > .common-component-controls,
      .common-component-controls:hover {
        display: flex;
      }

      .common-control-btn {
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

      .common-control-btn:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        background: white;
        color: #1e293b;
      }

      .common-control-btn.common-drag-handle {
        cursor: grab;
      }

      .common-control-btn.common-drag-handle:active {
        cursor: grabbing;
      }

      .common-control-btn.common-delete:hover {
        background: #fee2e2;
        color: #dc2626;
      }

      .common-control-btn.common-duplicate:hover {
        background: #dbeafe;
        color: #2563eb;
      }

      .common-control-btn.common-edit:hover {
        background: #fef3c7;
        color: #d97706;
      }

      .common-control-btn svg {
        width: 16px;
        height: 16px;
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // UTILITIES
  // ==========================================

  defaultNotification(message, type = 'success') {
    const existing = document.querySelector('.common-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `common-notification common-notification-${type}`;
    notification.textContent = message;
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

    setTimeout(() => {
      notification.style.animation = 'notifySlideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Export for use in other modules
window.CommonEditor = CommonEditor;

// Add notification animations
const notifyStyle = document.createElement('style');
notifyStyle.textContent = `
  @keyframes notifySlideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes notifySlideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(notifyStyle);
