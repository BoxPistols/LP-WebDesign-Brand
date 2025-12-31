/**
 * Image Manager for LP Generator
 * Handles image upload, URL input, clipboard paste, and gallery selection
 */

class ImageManager {
  constructor() {
    this.modal = document.getElementById('imageEditorModal');
    this.currentImagePreview = document.getElementById('currentImagePreview');
    this.targetElement = null;
    this.originalSrc = '';
    this.newImageSrc = '';

    // Preset gallery images
    this.presetImages = [
      { url: 'https://picsum.photos/800/600?random=1', alt: 'Business meeting' },
      { url: 'https://picsum.photos/800/600?random=2', alt: 'Technology' },
      { url: 'https://picsum.photos/800/600?random=3', alt: 'Nature landscape' },
      { url: 'https://picsum.photos/800/600?random=4', alt: 'City skyline' },
      { url: 'https://picsum.photos/800/600?random=5', alt: 'Office workspace' },
      { url: 'https://picsum.photos/800/600?random=6', alt: 'Team collaboration' },
      { url: 'https://picsum.photos/800/600?random=7', alt: 'Product showcase' },
      { url: 'https://picsum.photos/800/600?random=8', alt: 'Abstract pattern' },
      { url: 'https://picsum.photos/800/600?random=9', alt: 'Creative design' },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        alt: 'Modern office',
      },
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        alt: 'Team work',
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        alt: 'Data analytics',
      },
    ];

    this.init();
  }

  init() {
    this.bindEvents();
    this.loadGallery();
    this.setupClipboardPaste();
  }

  bindEvents() {
    // Close modal
    document.getElementById('imageEditorClose')?.addEventListener('click', () => this.close());
    document.getElementById('imageEditorCancel')?.addEventListener('click', () => this.close());

    // Close on backdrop click
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // Tab switching
    document.querySelectorAll('.image-tab').forEach((tab) => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });

    // Upload zone
    const uploadZone = document.getElementById('imageUploadZone');
    const fileInput = document.getElementById('imageFileInput');

    uploadZone?.addEventListener('click', () => fileInput?.click());
    uploadZone?.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });
    uploadZone?.addEventListener('dragleave', () => {
      uploadZone.classList.remove('dragover');
    });
    uploadZone?.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) this.handleFileUpload(files[0]);
    });

    fileInput?.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleFileUpload(e.target.files[0]);
      }
    });

    // URL input
    document.getElementById('loadImageUrl')?.addEventListener('click', () => this.loadFromUrl());
    document.getElementById('imageUrlInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.loadFromUrl();
    });

    // Apply/Delete buttons
    document.getElementById('imageEditorApply')?.addEventListener('click', () => this.apply());
    document
      .getElementById('imageEditorDelete')
      ?.addEventListener('click', () => this.deleteImage());

    // ESC to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.close();
      }
    });
  }

  setupClipboardPaste() {
    // Global paste handler when modal is open
    document.addEventListener('paste', (e) => {
      if (!this.modal?.classList.contains('active')) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          e.preventDefault();
          const blob = item.getAsFile();
          if (blob) this.handleFileUpload(blob);
          break;
        }
      }
    });
  }

  loadGallery() {
    const grid = document.getElementById('imageGalleryGrid');
    if (!grid) return;

    grid.innerHTML = this.presetImages
      .map(
        (img, index) => `
        <div class="image-gallery-item" data-index="${index}" data-url="${img.url}" data-alt="${img.alt}">
          <img src="${img.url}" alt="${img.alt}" loading="lazy">
        </div>
      `
      )
      .join('');

    // Gallery item click
    grid.querySelectorAll('.image-gallery-item').forEach((item) => {
      item.addEventListener('click', () => this.selectGalleryImage(item));
    });
  }

  selectGalleryImage(item) {
    // Remove previous selection
    document.querySelectorAll('.image-gallery-item.selected').forEach((el) => {
      el.classList.remove('selected');
    });

    item.classList.add('selected');
    const url = item.dataset.url;
    const alt = item.dataset.alt;

    this.newImageSrc = url;
    this.currentImagePreview.src = url;
    document.getElementById('imageAltInput').value = alt;
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.image-tab').forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // Update tab contents
    document.querySelectorAll('.image-tab-content').forEach((content) => {
      content.classList.toggle('active', content.id === `tab-${tabName}`);
    });
  }

  handleFileUpload(file) {
    if (!file.type.startsWith('image/')) {
      alert('画像ファイルを選択してください');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.newImageSrc = e.target.result;
      this.currentImagePreview.src = this.newImageSrc;

      // Auto-fill alt from filename
      const filename = file.name.replace(/\.[^/.]+$/, '');
      if (!document.getElementById('imageAltInput').value) {
        document.getElementById('imageAltInput').value = filename;
      }
    };
    reader.readAsDataURL(file);
  }

  loadFromUrl() {
    const urlInput = document.getElementById('imageUrlInput');
    const url = urlInput?.value.trim();

    if (!url) {
      alert('URLを入力してください');
      return;
    }

    // Test if URL is valid
    const img = new Image();
    img.onload = () => {
      this.newImageSrc = url;
      this.currentImagePreview.src = url;
    };
    img.onerror = () => {
      alert('画像を読み込めませんでした。URLを確認してください。');
    };
    img.src = url;
  }

  open(imageElement) {
    if (!imageElement) return;

    this.targetElement = imageElement;

    // Get current image source
    if (imageElement.tagName === 'IMG') {
      this.originalSrc = imageElement.src;
      this.currentImagePreview.src = imageElement.src;
      document.getElementById('imageAltInput').value = imageElement.alt || '';
    } else if (imageElement.style.backgroundImage) {
      const bgUrl = imageElement.style.backgroundImage.replace(/url\(['"]?([^'"]+)['"]?\)/i, '$1');
      this.originalSrc = bgUrl;
      this.currentImagePreview.src = bgUrl;
      document.getElementById('imageAltInput').value = '';
    }

    this.newImageSrc = this.originalSrc;

    // Reset tabs
    this.switchTab('upload');

    // Clear selections
    document.querySelectorAll('.image-gallery-item.selected').forEach((el) => {
      el.classList.remove('selected');
    });
    document.getElementById('imageUrlInput').value = '';
    document.getElementById('imageFileInput').value = '';

    // Show modal
    this.modal?.classList.add('active');
  }

  close() {
    this.modal?.classList.remove('active');
    this.targetElement = null;
    this.originalSrc = '';
    this.newImageSrc = '';
  }

  apply() {
    if (!this.targetElement || !this.newImageSrc) {
      this.close();
      return;
    }

    const altText = document.getElementById('imageAltInput')?.value || '';

    // Update the image
    if (this.targetElement.tagName === 'IMG') {
      this.targetElement.src = this.newImageSrc;
      this.targetElement.alt = altText;

      // Update section data to persist changes
      this.updateSectionData(this.targetElement, this.newImageSrc, altText);
    } else if (this.targetElement.style.backgroundImage) {
      this.targetElement.style.backgroundImage = `url('${this.newImageSrc}')`;

      // Update section data for background image
      this.updateSectionData(this.targetElement, this.newImageSrc, altText);
    }

    this.close();
  }

  updateSectionData(element, newSrc, altText) {
    // Find the section wrapper
    const sectionWrapper = element.closest('.lp-section-wrapper');
    if (!sectionWrapper || !window.lpGenerator) return;

    const sectionId = sectionWrapper.dataset.sectionId;
    const section = window.lpGenerator.sections.find((s) => s.id === sectionId);
    if (!section) return;

    // Store image changes in section data
    if (!section.imageChanges) section.imageChanges = [];

    // Create a unique identifier for this image
    const imgIndex = this.getImageIndex(element, sectionWrapper);

    // Update or add the change
    const existingChange = section.imageChanges.find((c) => c.index === imgIndex);
    if (existingChange) {
      existingChange.src = newSrc;
      existingChange.alt = altText;
    } else {
      section.imageChanges.push({ index: imgIndex, src: newSrc, alt: altText });
    }

    // Save state
    window.lpGenerator.saveState?.();
  }

  getImageIndex(element, container) {
    if (element.tagName === 'IMG') {
      const images = container.querySelectorAll('img');
      return Array.from(images).indexOf(element);
    } else {
      const bgElements = container.querySelectorAll('[style*="background-image"]');
      return 1000 + Array.from(bgElements).indexOf(element); // Offset for bg images
    }
  }

  deleteImage() {
    if (!this.targetElement) {
      this.close();
      return;
    }

    // Set placeholder or remove image
    if (this.targetElement.tagName === 'IMG') {
      this.targetElement.src =
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f1f5f9" width="400" height="300"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
      this.targetElement.alt = '';
    } else if (this.targetElement.style.backgroundImage) {
      this.targetElement.style.backgroundImage = 'none';
      this.targetElement.style.backgroundColor = '#f1f5f9';
    }

    // Notify generator to update
    if (window.lpGenerator) {
      window.lpGenerator.updatePreview?.();
    }

    this.close();
  }

  // Static method to make images editable in the preview
  static makeImagesEditable(container) {
    if (!container) return;

    // Find all images and background images
    const images = container.querySelectorAll('img');
    const bgElements = container.querySelectorAll('[style*="background"]');

    images.forEach((img) => {
      // Skip already processed images or UI images
      if (img.dataset.editable === 'true') return;
      if (img.closest('.lp-control-btn')) return; // Skip control buttons

      img.dataset.editable = 'true';
      img.style.cursor = 'pointer';

      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.imageManager?.open(img);
      });
    });

    // Background images
    bgElements.forEach((el) => {
      const bgImage = el.style.backgroundImage;
      if (!bgImage || bgImage === 'none') return;
      if (el.dataset.editable === 'true') return;
      if (el.closest('.lp-control-btn')) return;

      el.dataset.editable = 'true';
      el.style.cursor = 'pointer';

      el.addEventListener('click', (e) => {
        // Only trigger if clicking on the background element itself
        if (e.target === el) {
          e.preventDefault();
          e.stopPropagation();
          window.imageManager?.open(el);
        }
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.imageManager = new ImageManager();
});
