// Enhanced Generator Bridge
// 機能は generator.js の LandingPageGenerator に統合済み
// 後方互換のため window.enhancedGenerator を維持

class EnhancedGenerator {
  constructor() {
    // LandingPageGenerator が初期化済みならそれを参照
    this._generator = window.lpGenerator || null;
  }

  /**
   * LandingPageGenerator への参照を返す（遅延バインド）
   */
  get generator() {
    if (!this._generator) {
      this._generator = window.lpGenerator || null;
    }
    return this._generator;
  }

  // === 後方互換プロキシ ===

  get seoData() {
    return this.generator?.seoData || {
      title: '',
      description: '',
      keywords: '',
      ogImage: '',
      canonicalUrl: '',
      lang: 'ja',
      includeTwitterCard: true,
      includeSchema: true,
    };
  }

  get designSettings() {
    return this.generator?.designSettings || {
      fontFamily: 'Inter',
      fontSizeScale: 1.0,
      spacingScale: 1.0,
      borderRadius: 8,
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      accentColor: '#f093fb',
    };
  }

  generateSEOMetaTags() {
    return this.generator?.generateSEOMetaTags() || '';
  }

  applyPreset(presetName) {
    return this.generator?.applyPreset(presetName);
  }

  applyCustomColors() {
    return this.generator?.applyCustomColors();
  }

  exportAs(format) {
    return this.generator?.exportAs(format);
  }

  showNotification(message, type = 'success') {
    if (this.generator) {
      this.generator.showNotification(message, type);
    }
  }
}

// 初期化
document.addEventListener('DOMContentLoaded', () => {
  window.enhancedGenerator = new EnhancedGenerator();
});
