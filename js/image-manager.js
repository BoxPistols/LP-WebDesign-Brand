// ============================================================
// Image Manager for LP Generator
// 画像のアップロード、URL入力、クリップボード貼り付け、ギャラリー選択を管理
// CommonEditor.sanitizeHTML / isValidImageUrl を利用してXSS対策
// ============================================================

class ImageManager {
  constructor() {
    this.modal = document.getElementById('imageEditorModal');
    this.currentImagePreview = document.getElementById('currentImagePreview');
    this.targetElement = null;
    this.originalSrc = '';
    this.newImageSrc = '';

    // プリセットギャラリー画像
    this.presetImages = [
      { url: 'https://picsum.photos/800/600?random=1', alt: 'ビジネスミーティング' },
      { url: 'https://picsum.photos/800/600?random=2', alt: 'テクノロジー' },
      { url: 'https://picsum.photos/800/600?random=3', alt: '自然の風景' },
      { url: 'https://picsum.photos/800/600?random=4', alt: '都市のスカイライン' },
      { url: 'https://picsum.photos/800/600?random=5', alt: 'オフィスワークスペース' },
      { url: 'https://picsum.photos/800/600?random=6', alt: 'チームコラボレーション' },
      { url: 'https://picsum.photos/800/600?random=7', alt: 'プロダクト紹介' },
      { url: 'https://picsum.photos/800/600?random=8', alt: '抽象パターン' },
      { url: 'https://picsum.photos/800/600?random=9', alt: 'クリエイティブデザイン' },
      {
        url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        alt: 'モダンオフィス',
      },
      {
        url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800',
        alt: 'チームワーク',
      },
      {
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
        alt: 'データ分析',
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
    // モーダルを閉じる
    document.getElementById('imageEditorClose')?.addEventListener('click', () => this.close());
    document.getElementById('imageEditorCancel')?.addEventListener('click', () => this.close());

    // 背景クリックで閉じる
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });

    // タブ切り替え
    document.querySelectorAll('.image-tab').forEach((tab) => {
      tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
    });

    // アップロードゾーン
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

    // URL入力
    document.getElementById('loadImageUrl')?.addEventListener('click', () => this.loadFromUrl());
    document.getElementById('imageUrlInput')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.loadFromUrl();
    });

    // 適用・削除ボタン
    document.getElementById('imageEditorApply')?.addEventListener('click', () => this.apply());
    document
      .getElementById('imageEditorDelete')
      ?.addEventListener('click', () => this.deleteImage());

    // ESCで閉じる
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal?.classList.contains('active')) {
        this.close();
      }
    });
  }

  setupClipboardPaste() {
    // モーダルが開いている時のみクリップボード貼り付けを処理
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

    // サニタイズしてからHTMLに埋め込む
    const sanitize = typeof CommonEditor !== 'undefined'
      ? CommonEditor.sanitizeAttribute
      : (s) => s;

    grid.innerHTML = this.presetImages
      .map(
        (img, index) => `
        <div class="image-gallery-item" data-index="${index}" data-url="${sanitize(img.url)}" data-alt="${sanitize(img.alt)}">
          <img src="${sanitize(img.url)}" alt="${sanitize(img.alt)}" loading="lazy">
        </div>
      `
      )
      .join('');

    // ギャラリーアイテムのクリック
    grid.querySelectorAll('.image-gallery-item').forEach((item) => {
      item.addEventListener('click', () => this.selectGalleryImage(item));
    });
  }

  selectGalleryImage(item) {
    // 選択状態をリセット
    document.querySelectorAll('.image-gallery-item.selected').forEach((el) => {
      el.classList.remove('selected');
    });

    item.classList.add('selected');
    const url = item.dataset.url;
    const alt = item.dataset.alt;

    this.newImageSrc = url;
    if (this.currentImagePreview) {
      this.currentImagePreview.src = url;
    }

    const altInput = document.getElementById('imageAltInput');
    if (altInput) altInput.value = alt;
  }

  switchTab(tabName) {
    // タブボタンの状態更新
    document.querySelectorAll('.image-tab').forEach((tab) => {
      tab.classList.toggle('active', tab.dataset.tab === tabName);
    });

    // タブコンテンツの表示切替
    document.querySelectorAll('.image-tab-content').forEach((content) => {
      content.classList.toggle('active', content.id === `tab-${tabName}`);
    });
  }

  handleFileUpload(file) {
    if (!file.type.startsWith('image/')) {
      this._showError('画像ファイルを選択してください');
      return;
    }

    // ファイルサイズ上限チェック（10MB）
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      this._showError('ファイルサイズが大きすぎます（上限: 10MB）');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      this.newImageSrc = e.target.result;
      if (this.currentImagePreview) {
        this.currentImagePreview.src = this.newImageSrc;
      }

      // ファイル名からalt属性を自動入力
      const altInput = document.getElementById('imageAltInput');
      if (altInput && !altInput.value) {
        const filename = file.name.replace(/\.[^/.]+$/, '');
        altInput.value = filename;
      }
    };
    reader.onerror = () => {
      this._showError('ファイルの読み込みに失敗しました');
    };
    reader.readAsDataURL(file);
  }

  loadFromUrl() {
    const urlInput = document.getElementById('imageUrlInput');
    const url = urlInput?.value.trim();

    if (!url) {
      this._showError('URLを入力してください');
      return;
    }

    // URL検証（XSS対策: http/httpsのみ許可）
    const isValid = typeof CommonEditor !== 'undefined'
      ? CommonEditor.isValidImageUrl(url)
      : /^https?:\/\//.test(url);

    if (!isValid) {
      this._showError('無効なURLです。http:// または https:// で始まるURLを入力してください。');
      return;
    }

    // 画像の読み込みテスト
    const img = new Image();
    img.onload = () => {
      this.newImageSrc = url;
      if (this.currentImagePreview) {
        this.currentImagePreview.src = url;
      }
    };
    img.onerror = () => {
      this._showError('画像を読み込めませんでした。URLを確認してください。');
    };
    img.src = url;
  }

  open(imageElement) {
    if (!imageElement) return;

    this.targetElement = imageElement;

    // 現在の画像ソースを取得
    if (imageElement.tagName === 'IMG') {
      this.originalSrc = imageElement.src;
      if (this.currentImagePreview) {
        this.currentImagePreview.src = imageElement.src;
      }
      const altInput = document.getElementById('imageAltInput');
      if (altInput) altInput.value = imageElement.alt || '';
    } else if (imageElement.style.backgroundImage) {
      const bgUrl = imageElement.style.backgroundImage.replace(
        /url\(['"]?([^'"]+)['"]?\)/i,
        '$1'
      );
      this.originalSrc = bgUrl;
      if (this.currentImagePreview) {
        this.currentImagePreview.src = bgUrl;
      }
      const altInput = document.getElementById('imageAltInput');
      if (altInput) altInput.value = '';
    }

    this.newImageSrc = this.originalSrc;

    // タブをリセット
    this.switchTab('upload');

    // 選択状態をクリア
    document.querySelectorAll('.image-gallery-item.selected').forEach((el) => {
      el.classList.remove('selected');
    });

    const urlInput = document.getElementById('imageUrlInput');
    const fileInput = document.getElementById('imageFileInput');
    if (urlInput) urlInput.value = '';
    if (fileInput) fileInput.value = '';

    // モーダル表示
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

    // URL検証（data:URIは許可）
    if (
      !this.newImageSrc.startsWith('data:') &&
      typeof CommonEditor !== 'undefined' &&
      !CommonEditor.isValidImageUrl(this.newImageSrc)
    ) {
      this._showError('無効な画像URLです');
      return;
    }

    const altInput = document.getElementById('imageAltInput');
    const altText = altInput?.value || '';

    // 画像を更新
    if (this.targetElement.tagName === 'IMG') {
      this.targetElement.src = this.newImageSrc;
      this.targetElement.alt = altText;
      this.updateSectionData(this.targetElement, this.newImageSrc, altText);
    } else if (this.targetElement.style.backgroundImage) {
      // 背景画像のURLもサニタイズ
      this.targetElement.style.backgroundImage = `url('${this.newImageSrc}')`;
      this.updateSectionData(this.targetElement, this.newImageSrc, altText);
    }

    this.close();
  }

  updateSectionData(element, newSrc, altText) {
    // セクションラッパーを探す
    const sectionWrapper = element.closest('.lp-section-wrapper');
    if (!sectionWrapper || !window.lpGenerator) return;

    const sectionId = sectionWrapper.dataset.sectionId;
    const section = window.lpGenerator.sections.find((s) => s.id === sectionId);
    if (!section) return;

    // 画像変更をセクションデータに保存
    if (!section.imageChanges) section.imageChanges = [];

    // この画像のユニーク識別子を取得
    const imgIndex = this.getImageIndex(element, sectionWrapper);

    // 既存の変更を更新または新規追加
    const existingChange = section.imageChanges.find((c) => c.index === imgIndex);
    if (existingChange) {
      existingChange.src = newSrc;
      existingChange.alt = altText;
    } else {
      section.imageChanges.push({ index: imgIndex, src: newSrc, alt: altText });
    }

    // 状態を保存
    window.lpGenerator.saveState?.();
  }

  getImageIndex(element, container) {
    if (element.tagName === 'IMG') {
      const images = container.querySelectorAll('img');
      return Array.from(images).indexOf(element);
    } else {
      const bgElements = container.querySelectorAll('[style*="background-image"]');
      // 背景画像はオフセットして区別する
      return 1000 + Array.from(bgElements).indexOf(element);
    }
  }

  deleteImage() {
    if (!this.targetElement) {
      this.close();
      return;
    }

    // プレースホルダーに置き換えるか画像を削除
    if (this.targetElement.tagName === 'IMG') {
      this.targetElement.src =
        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f1f5f9" width="400" height="300"/%3E%3Ctext fill="%2394a3b8" font-family="sans-serif" font-size="14" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
      this.targetElement.alt = '';
    } else if (this.targetElement.style.backgroundImage) {
      this.targetElement.style.backgroundImage = 'none';
      this.targetElement.style.backgroundColor = '#f1f5f9';
    }

    // ジェネレーターに更新を通知
    if (window.lpGenerator) {
      window.lpGenerator.updatePreview?.();
    }

    this.close();
  }

  // ============================================================
  // 静的メソッド: プレビュー内の画像を編集可能にする
  // ============================================================

  static makeImagesEditable(container) {
    if (!container) return;

    // img要素と背景画像要素を検出
    const images = container.querySelectorAll('img');
    const bgElements = container.querySelectorAll('[style*="background"]');

    images.forEach((img) => {
      // 既に処理済み、またはUI要素の画像はスキップ
      if (img.dataset.editable === 'true') return;
      if (img.closest('.lp-control-btn')) return;

      img.dataset.editable = 'true';
      img.style.cursor = 'pointer';

      img.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        window.imageManager?.open(img);
      });
    });

    // 背景画像
    bgElements.forEach((el) => {
      const bgImage = el.style.backgroundImage;
      if (!bgImage || bgImage === 'none') return;
      if (el.dataset.editable === 'true') return;
      if (el.closest('.lp-control-btn')) return;

      el.dataset.editable = 'true';
      el.style.cursor = 'pointer';

      el.addEventListener('click', (e) => {
        // 背景要素自体がクリックされた場合のみ発火
        if (e.target === el) {
          e.preventDefault();
          e.stopPropagation();
          window.imageManager?.open(el);
        }
      });
    });
  }

  // ============================================================
  // 内部ヘルパー
  // ============================================================

  /**
   * エラーメッセージを表示する（CommonEditorがあれば通知、なければalert）
   * @param {string} message - エラーメッセージ
   */
  _showError(message) {
    if (typeof CommonEditor !== 'undefined') {
      CommonEditor.showDefaultNotification(message, 'error');
    } else {
      alert(message);
    }
  }
}

// DOMContentLoaded時に初期化
document.addEventListener('DOMContentLoaded', () => {
  window.imageManager = new ImageManager();
});
