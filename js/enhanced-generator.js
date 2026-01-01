// Enhanced Generator Features
// Drag & Drop, Advanced Interactions, Export Enhancements

class EnhancedGenerator {
  constructor() {
    this.draggedElement = null;
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
    this.designSettings = {
      fontFamily: 'Inter',
      fontSizeScale: 1.0,
      spacingScale: 1.0,
      borderRadius: 8,
      primaryColor: '#667eea',
      secondaryColor: '#764ba2',
      accentColor: '#f093fb',
    };
    this.init();
  }

  init() {
    this.setupDragAndDrop();
    this.setupAdvancedExport();
    this.setupPresets();
    this.setupKeyboardShortcuts();
    this.setupDesignCustomization();
    this.setupSEOEditor();
    this.setupInlineEditing();
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupParallaxEffects();
  }

  // ==========================================
  // INLINE EDITING FUNCTIONALITY
  // ==========================================

  setupInlineEditing() {
    document.addEventListener('DOMContentLoaded', () => {
      this.enableInlineEditing();
    });
  }

  enableInlineEditing() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) return;

    // Use event delegation for editable elements
    previewFrame.addEventListener('dblclick', (e) => {
      const editableSelectors = 'h1, h2, h3, h4, h5, h6, p, span, a, button, li, label';
      const target = e.target.closest(editableSelectors);

      if (
        target &&
        !target.classList.contains('lp-control-btn') &&
        !target.closest('.lp-section-controls')
      ) {
        e.preventDefault();
        e.stopPropagation();
        this.makeEditable(target);
      }
    });

    // Add inline editing styles
    this.addInlineEditingStyles();
  }

  addInlineEditingStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .lp-inline-editing {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px;
        background: rgba(59, 130, 246, 0.05) !important;
        min-width: 50px;
        cursor: text !important;
      }

      .lp-inline-editing:focus {
        outline: 2px solid #2563eb !important;
      }

      .lp-editable-hint {
        position: fixed;
        bottom: 20px;
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
        animation: fadeInUp 0.3s ease-out;
      }

      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateX(-50%) translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
      }

      .lp-section-wrapper [contenteditable="true"]:hover {
        cursor: text;
      }
    `;
    document.head.appendChild(style);
  }

  makeEditable(element) {
    // Store original content for potential undo
    const originalContent = element.textContent;

    // Make element editable
    element.contentEditable = 'true';
    element.classList.add('lp-inline-editing');
    element.focus();

    // Select all text
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Show hint
    this.showEditingHint();

    // Handle blur (save changes)
    const handleBlur = () => {
      element.contentEditable = 'false';
      element.classList.remove('lp-inline-editing');
      this.hideEditingHint();

      // If content changed, update section and save state
      if (element.textContent !== originalContent) {
        this.updateSectionContent(element);
        if (window.lpGenerator) {
          window.lpGenerator.saveState();
          window.lpGenerator.showNotification('テキストを更新しました');
        }
      }

      element.removeEventListener('blur', handleBlur);
      element.removeEventListener('keydown', handleKeydown);
    };

    // Handle keyboard events
    const handleKeydown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        element.blur();
      }
      if (e.key === 'Escape') {
        element.textContent = originalContent;
        element.blur();
      }
    };

    element.addEventListener('blur', handleBlur);
    element.addEventListener('keydown', handleKeydown);
  }

  updateSectionContent(element) {
    if (!window.lpGenerator) return;

    const wrapper = element.closest('.lp-section-wrapper');
    if (!wrapper) return;

    const sectionId = wrapper.dataset.sectionId;
    const section = window.lpGenerator.sections.find((s) => s.id === sectionId);

    if (section) {
      // Get updated HTML from the wrapper (excluding controls)
      const clone = wrapper.cloneNode(true);
      const controls = clone.querySelector('.lp-section-controls');
      if (controls) controls.remove();

      // Update section template HTML
      section.template = {
        ...section.template,
        html: clone.innerHTML,
      };
    }
  }

  showEditingHint() {
    if (document.querySelector('.lp-editable-hint')) return;

    const hint = document.createElement('div');
    hint.className = 'lp-editable-hint';
    hint.textContent = 'Enter: 保存 | Esc: キャンセル | Shift+Enter: 改行';
    document.body.appendChild(hint);
  }

  hideEditingHint() {
    const hint = document.querySelector('.lp-editable-hint');
    if (hint) hint.remove();
  }

  // ==========================================
  // DRAG AND DROP FUNCTIONALITY
  // ==========================================

  setupDragAndDrop() {
    document.addEventListener('DOMContentLoaded', () => {
      this.enableDragAndDrop();
    });
  }

  enableDragAndDrop() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) return;

    // Use event delegation for dynamically added elements
    previewFrame.addEventListener('dragstart', (e) => {
      const wrapper = e.target.closest('.lp-section-wrapper');
      if (wrapper) {
        this.draggedElement = wrapper;
        wrapper.style.opacity = '0.5';
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', wrapper.innerHTML);
      }
    });

    previewFrame.addEventListener('dragend', (e) => {
      const wrapper = e.target.closest('.lp-section-wrapper');
      if (wrapper) {
        wrapper.style.opacity = '1';
      }
    });

    previewFrame.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';

      const wrapper = e.target.closest('.lp-section-wrapper');
      if (wrapper && wrapper !== this.draggedElement) {
        const rect = wrapper.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;

        if (e.clientY < midpoint) {
          wrapper.parentNode.insertBefore(this.draggedElement, wrapper);
        } else {
          wrapper.parentNode.insertBefore(this.draggedElement, wrapper.nextSibling);
        }
      }
    });

    previewFrame.addEventListener('drop', (e) => {
      e.preventDefault();
      this.draggedElement = null;

      // Dispatch custom event for state update
      const event = new CustomEvent('sectionsReordered', {
        detail: { source: 'drag-drop' },
      });
      document.dispatchEvent(event);
    });

    // Make section wrappers draggable
    this.makeSectionsDraggable();
  }

  makeSectionsDraggable() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.classList && node.classList.contains('lp-section-wrapper')) {
            node.setAttribute('draggable', 'true');
          }
        });
      });
    });

    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
      observer.observe(previewFrame, { childList: true, subtree: true });
    }
  }

  // ==========================================
  // ADVANCED EXPORT FUNCTIONALITY
  // ==========================================

  setupAdvancedExport() {
    // Add export format buttons
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
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c1.5 0 3-.3 4.3-.9"/><path d="M19.8 10.1c1.4.8 2.2 1.7 2.2 2.9 0 2.2-3.5 4-8 4-1.5 0-3-.2-4.3-.6"/></svg>
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

    // Toggle export menu
    document.getElementById('exportOptions')?.addEventListener('click', () => {
      const menu = document.getElementById('exportMenu');
      if (menu) {
        menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
      }
    });

    // Handle export format selection
    document.querySelectorAll('.export-option').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const format = e.currentTarget.dataset.format;
        this.exportAs(format);
        document.getElementById('exportMenu').style.display = 'none';
      });
    });

    // Add styles for export dropdown
    this.addExportStyles();
  }

  addExportStyles() {
    const style = document.createElement('style');
    style.textContent = `
            .export-dropdown {
                position: relative;
            }

            .export-menu {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                margin-top: 8px;
                overflow: hidden;
                z-index: 1000;
            }

            .export-option {
                width: 100%;
                padding: 12px 16px;
                border: none;
                background: white;
                text-align: left;
                font-family: var(--font-primary, 'Inter', sans-serif);
                font-size: 0.95rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #2d3748;
            }

            .export-option:hover {
                background: #f7fafc;
                color: var(--primary-color, #667eea);
            }

            .export-option span {
                font-size: 1.2rem;
            }
        `;
    document.head.appendChild(style);
  }

  exportAs(format) {
    if (!window.lpGenerator) return;

    switch (format) {
      case 'html':
        window.lpGenerator.exportHTML();
        break;
      case 'react':
        this.exportReact();
        break;
      case 'vue':
        this.exportVue();
        break;
      case 'json':
        this.exportJSON();
        break;
    }
  }

  exportReact() {
    if (!window.lpGenerator || window.lpGenerator.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    const componentCode = this.generateReactComponent();
    this.downloadFile(componentCode, 'LandingPage.jsx', 'text/jsx');
    this.showNotification('Reactコンポーネントをエクスポートしました');
  }

  generateReactComponent() {
    const lpGen = window.lpGenerator;
    const sectionsJSX = lpGen.sections
      .map((section) => {
        const html = section.template.html
          .replace(/\bclass=/g, 'className=')
          .replace(/for=/g, 'htmlFor=');
        return html;
      })
      .join('\n');

    return `import React from 'react';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="lp-container" data-theme="${lpGen.currentTheme}">
      ${sectionsJSX}
    </div>
  );
};

export default LandingPage;
`;
  }

  exportVue() {
    if (!window.lpGenerator || window.lpGenerator.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    const componentCode = this.generateVueComponent();
    this.downloadFile(componentCode, 'LandingPage.vue', 'text/vue');
    this.showNotification('Vueコンポーネントをエクスポートしました');
  }

  generateVueComponent() {
    const lpGen = window.lpGenerator;
    const sectionsHTML = lpGen.sections.map((s) => s.template.html).join('\n');

    return `<template>
  <div class="lp-container" :data-theme="theme">
    ${sectionsHTML}
  </div>
</template>

<script>
export default {
  name: 'LandingPage',
  data() {
    return {
      theme: '${lpGen.currentTheme}'
    };
  }
};
</script>

<style scoped>
@import './LandingPage.css';
</style>
`;
  }

  exportJSON() {
    if (!window.lpGenerator) return;

    const lpGen = window.lpGenerator;
    const config = {
      version: '1.0.0',
      theme: lpGen.currentTheme,
      animations: lpGen.animations,
      glassmorphism: lpGen.glassmorphism,
      sections: lpGen.sections.map((section) => ({
        id: section.id,
        type: section.type,
        name: section.template.name,
      })),
    };

    const jsonString = JSON.stringify(config, null, 2);
    this.downloadFile(jsonString, 'landing-page-config.json', 'application/json');
    this.showNotification('設定をJSONでエクスポートしました');
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
  // PRESET TEMPLATES
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

    // Add preset styles
    const style = document.createElement('style');
    style.textContent = `
            .preset-grid {
                display: grid;
                grid-template-columns: 1fr;
                gap: 12px;
            }

            .preset-btn {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                padding: 16px;
                border: 2px solid var(--border-color, #e2e8f0);
                border-radius: 12px;
                background: white;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: left;
            }

            .preset-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                border-color: var(--primary-color, #667eea);
            }

            .preset-name {
                font-size: 1rem;
                font-weight: 700;
                color: #2d3748;
                margin-bottom: 4px;
            }

            .preset-desc {
                font-size: 0.85rem;
                color: #718096;
            }
        `;
    document.head.appendChild(style);

    // Add preset click handlers
    document.querySelectorAll('.preset-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const preset = e.currentTarget.dataset.preset;
        this.applyPreset(preset);
      });
    });
  }

  applyPreset(presetName) {
    if (!window.lpGenerator) return;

    const presets = {
      startup: [
        'hero-split',
        'features-cards-hover',
        'social-proof',
        'pricing-modern',
        'testimonials-carousel',
        'cta-split',
      ],
      saas: [
        'hero-animated',
        'features-timeline',
        'pricing-modern',
        'testimonials',
        'faq',
        'newsletter',
      ],
      portfolio: ['hero-1', 'gallery', 'features-grid', 'team', 'testimonials', 'contact'],
      ecommerce: ['hero-split', 'features-grid', 'gallery', 'pricing', 'testimonials', 'cta'],
      agency: [
        'hero-gradient',
        'logo-cloud',
        'features-grid',
        'gallery',
        'testimonials-carousel',
        'team',
        'cta-banner',
      ],
      consulting: [
        'hero-minimal',
        'features-list',
        'benefits-grid',
        'testimonials',
        'steps-horizontal',
        'contact',
      ],
      education: [
        'hero-video',
        'features-cards-hover',
        'pricing-modern',
        'testimonials-carousel',
        'accordion-faq',
        'cta-split',
      ],
      restaurant: [
        'hero-fullscreen',
        'gallery',
        'features-grid',
        'testimonials',
        'contact',
      ],
      realestate: [
        'hero-split-image',
        'features-grid',
        'gallery',
        'testimonials',
        'contact-split',
      ],
      event: [
        'hero-gradient',
        'steps-horizontal',
        'features-grid',
        'pricing-modern',
        'testimonials',
        'cta-banner',
      ],
    };

    const sections = presets[presetName] || [];

    // Clear existing sections
    window.lpGenerator.sections = [];

    // Add preset sections
    sections.forEach((componentType) => {
      if (sectionTemplates[componentType]) {
        window.lpGenerator.sections.push({
          type: componentType,
          id: window.lpGenerator.generateId(),
          template: sectionTemplates[componentType],
        });
      }
    });

    window.lpGenerator.updatePreview();
    this.showNotification(`${presetName}プリセットを適用しました`);
  }

  // ==========================================
  // KEYBOARD SHORTCUTS
  // ==========================================

  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl/Cmd + S: Quick Export
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        if (window.lpGenerator) {
          window.lpGenerator.exportHTML();
          this.showNotification('HTMLをエクスポートしました');
        }
      }
    });
  }

  // ==========================================
  // DESIGN CUSTOMIZATION
  // ==========================================

  setupDesignCustomization() {
    // Font Family
    const fontFamilySelect = document.getElementById('fontFamilySelect');
    if (fontFamilySelect) {
      fontFamilySelect.addEventListener('change', (e) => {
        this.designSettings.fontFamily = e.target.value;
        this.applyFontFamily(e.target.value);
      });
    }

    // Font Size Scale
    const fontSizeScale = document.getElementById('fontSizeScale');
    if (fontSizeScale) {
      fontSizeScale.addEventListener('change', (e) => {
        this.designSettings.fontSizeScale = parseFloat(e.target.value);
        this.applyFontSizeScale(parseFloat(e.target.value));
      });
    }

    // Spacing Scale
    const spacingScale = document.getElementById('spacingScale');
    if (spacingScale) {
      spacingScale.addEventListener('change', (e) => {
        this.designSettings.spacingScale = parseFloat(e.target.value);
        this.applySpacingScale(parseFloat(e.target.value));
      });
    }

    // Border Radius
    const borderRadiusStyle = document.getElementById('borderRadiusStyle');
    if (borderRadiusStyle) {
      borderRadiusStyle.addEventListener('change', (e) => {
        this.designSettings.borderRadius = parseInt(e.target.value);
        this.applyBorderRadius(parseInt(e.target.value));
      });
    }

    // Custom Colors
    const primaryColor = document.getElementById('primaryColor');
    const secondaryColor = document.getElementById('secondaryColor');
    const accentColor = document.getElementById('accentColor');

    if (primaryColor) {
      primaryColor.addEventListener('change', (e) => {
        this.designSettings.primaryColor = e.target.value;
        this.applyCustomColors();
      });
    }

    if (secondaryColor) {
      secondaryColor.addEventListener('change', (e) => {
        this.designSettings.secondaryColor = e.target.value;
        this.applyCustomColors();
      });
    }

    if (accentColor) {
      accentColor.addEventListener('change', (e) => {
        this.designSettings.accentColor = e.target.value;
        this.applyCustomColors();
      });
    }

    // Reset Colors Button
    const resetColors = document.getElementById('resetColors');
    if (resetColors) {
      resetColors.addEventListener('click', () => {
        this.resetColors();
      });
    }
  }

  applyFontFamily(fontFamily) {
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
      previewFrame.style.fontFamily = `'${fontFamily}', sans-serif`;

      // Also inject CSS for all text elements
      this.injectFontCSS(fontFamily);
      this.showNotification(`フォントを ${fontFamily} に変更しました`);
    }
  }

  injectFontCSS(fontFamily) {
    const existingStyle = document.getElementById('custom-font-css');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'custom-font-css';
    style.textContent = `
      #previewFrame,
      #previewFrame * {
        font-family: '${fontFamily}', sans-serif !important;
      }
    `;
    document.head.appendChild(style);
  }

  applyFontSizeScale(scale) {
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
      previewFrame.style.fontSize = `${scale * 100}%`;
      this.injectFontSizeCSS(scale);
      this.showNotification(`フォントサイズを ${scale * 100}% に変更しました`);
    }
  }

  injectFontSizeCSS(scale) {
    const existingStyle = document.getElementById('custom-fontsize-css');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'custom-fontsize-css';
    style.textContent = `
      #previewFrame {
        font-size: ${scale * 100}% !important;
      }
    `;
    document.head.appendChild(style);
  }

  applySpacingScale(scale) {
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
      // Apply spacing scale via CSS custom property
      previewFrame.style.setProperty('--spacing-scale', scale);
      this.injectSpacingCSS(scale);
      this.showNotification(`余白を ${scale * 100}% に変更しました`);
    }
  }

  injectSpacingCSS(scale) {
    const existingStyle = document.getElementById('custom-spacing-css');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'custom-spacing-css';
    style.textContent = `
      #previewFrame [class*="lp-section"] {
        padding-top: calc(80px * ${scale}) !important;
        padding-bottom: calc(80px * ${scale}) !important;
      }
      #previewFrame [class*="lp-hero"] {
        padding-top: calc(120px * ${scale}) !important;
        padding-bottom: calc(120px * ${scale}) !important;
      }
      #previewFrame [class*="lp-card"],
      #previewFrame [class*="lp-feature"] {
        padding: calc(24px * ${scale}) !important;
      }
    `;
    document.head.appendChild(style);
  }

  applyBorderRadius(radius) {
    const previewFrame = document.getElementById('previewFrame');
    if (previewFrame) {
      // Apply border radius to buttons, cards, and images
      const elements = previewFrame.querySelectorAll(
        '[class*="lp-btn"], [class*="lp-card"], [class*="lp-feature"], [class*="lp-pricing"], [class*="lp-testimonial"], [class*="lp-mockup"], img'
      );
      elements.forEach((el) => {
        el.style.borderRadius = `${radius}px`;
      });

      // Also inject CSS for consistent application
      this.injectBorderRadiusCSS(radius);
      this.showNotification(`角丸を ${radius}px に変更しました`);
    }
  }

  injectBorderRadiusCSS(radius) {
    const existingStyle = document.getElementById('custom-radius-css');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'custom-radius-css';
    style.textContent = `
      #previewFrame [class*="lp-btn"] {
        border-radius: ${radius}px !important;
      }
      #previewFrame [class*="lp-card"],
      #previewFrame [class*="lp-feature-card"],
      #previewFrame [class*="lp-pricing-card"],
      #previewFrame [class*="lp-testimonial"] {
        border-radius: ${radius}px !important;
      }
      #previewFrame [class*="lp-mockup"] {
        border-radius: ${radius}px !important;
      }
      #previewFrame .lp-hero-visual img {
        border-radius: ${radius}px !important;
      }
    `;
    document.head.appendChild(style);
  }

  applyCustomColors() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) return;

    // Set CSS custom properties
    previewFrame.style.setProperty('--theme-primary', this.designSettings.primaryColor);
    previewFrame.style.setProperty('--theme-secondary', this.designSettings.secondaryColor);
    previewFrame.style.setProperty('--theme-accent', this.designSettings.accentColor);

    // Generate gradient
    const gradient = `linear-gradient(135deg, ${this.designSettings.primaryColor}, ${this.designSettings.secondaryColor})`;

    // Apply to hero backgrounds
    const heroBackgrounds = previewFrame.querySelectorAll('.lp-hero-background, .lp-hero');
    heroBackgrounds.forEach((el) => {
      el.style.background = gradient;
    });

    // Apply to buttons
    const buttons = previewFrame.querySelectorAll('.lp-btn, .lp-btn-primary, .lp-cta-btn');
    buttons.forEach((btn) => {
      btn.style.background = gradient;
      btn.style.borderColor = this.designSettings.primaryColor;
    });

    // Apply to pricing cards highlighted
    const pricingHighlighted = previewFrame.querySelectorAll(
      '.lp-pricing-card.featured, .lp-pricing-card.highlighted'
    );
    pricingHighlighted.forEach((card) => {
      card.style.borderColor = this.designSettings.primaryColor;
    });

    // Apply to section titles and accents
    const accents = previewFrame.querySelectorAll(
      '.lp-section-badge, .lp-feature-icon, .lp-stat-number'
    );
    accents.forEach((el) => {
      el.style.color = this.designSettings.primaryColor;
    });

    // Apply to CTA sections
    const ctaSections = previewFrame.querySelectorAll('.lp-cta, .lp-newsletter');
    ctaSections.forEach((section) => {
      section.style.background = gradient;
    });

    // Inject dynamic CSS for theme
    this.injectThemeCSS();

    this.showNotification('カスタムカラーを適用しました');
  }

  injectThemeCSS() {
    // Remove existing theme CSS
    const existingStyle = document.getElementById('custom-theme-css');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'custom-theme-css';
    style.textContent = `
      /* Hero sections - using attribute selector for broader matching */
      #previewFrame [class*="lp-hero"]:not([class*="lp-hero-stat"]):not([class*="lp-hero-content"]):not([class*="lp-hero-visual"]):not([class*="lp-hero-title"]):not([class*="lp-hero-subtitle"]):not([class*="lp-hero-buttons"]):not([class*="lp-hero-badge"]) {
        background: linear-gradient(135deg, ${this.designSettings.primaryColor}, ${this.designSettings.secondaryColor}) !important;
      }

      /* Primary buttons */
      #previewFrame .lp-btn-primary,
      #previewFrame [class*="lp-btn-primary"],
      #previewFrame .lp-cta-btn,
      #previewFrame [class*="lp-cta"] button {
        background: linear-gradient(135deg, ${this.designSettings.primaryColor}, ${this.designSettings.secondaryColor}) !important;
        border-color: ${this.designSettings.primaryColor} !important;
      }

      #previewFrame .lp-btn-primary:hover,
      #previewFrame [class*="lp-btn-primary"]:hover {
        box-shadow: 0 10px 30px ${this.designSettings.primaryColor}40 !important;
      }

      /* Badge/tag elements */
      #previewFrame .lp-hero-badge,
      #previewFrame [class*="lp-badge"],
      #previewFrame .lp-section-badge {
        background: ${this.designSettings.primaryColor}15 !important;
        color: ${this.designSettings.primaryColor} !important;
      }

      #previewFrame .lp-badge-dot {
        background: ${this.designSettings.primaryColor} !important;
      }

      /* Stat numbers */
      #previewFrame .lp-hero-stat-number,
      #previewFrame .lp-stat-number,
      #previewFrame [class*="stat-number"] {
        color: ${this.designSettings.primaryColor} !important;
      }

      /* Feature icons */
      #previewFrame .lp-feature-icon,
      #previewFrame [class*="lp-feature-icon"] {
        color: ${this.designSettings.primaryColor} !important;
      }

      #previewFrame .lp-feature-icon-wrapper,
      #previewFrame [class*="icon-wrapper"] {
        background: linear-gradient(135deg, ${this.designSettings.primaryColor}, ${this.designSettings.secondaryColor}) !important;
      }

      /* Pricing cards */
      #previewFrame .lp-pricing-card.featured,
      #previewFrame .lp-pricing-card.highlighted,
      #previewFrame [class*="lp-pricing"][class*="featured"] {
        border-color: ${this.designSettings.primaryColor} !important;
      }

      #previewFrame .lp-pricing-card .lp-pricing-cta {
        background: ${this.designSettings.primaryColor} !important;
      }

      /* CTA sections */
      #previewFrame .lp-cta,
      #previewFrame [class*="lp-cta-section"],
      #previewFrame .lp-newsletter {
        background: linear-gradient(135deg, ${this.designSettings.primaryColor}, ${this.designSettings.secondaryColor}) !important;
      }

      /* Gradient text */
      #previewFrame .lp-gradient-text {
        background: linear-gradient(135deg, ${this.designSettings.primaryColor}, ${this.designSettings.secondaryColor}, ${this.designSettings.accentColor}) !important;
        -webkit-background-clip: text !important;
        -webkit-text-fill-color: transparent !important;
        background-clip: text !important;
      }

      /* Links */
      #previewFrame a:not([class*="lp-btn"]):hover {
        color: ${this.designSettings.primaryColor} !important;
      }

      /* Team role */
      #previewFrame .lp-team-role,
      #previewFrame [class*="lp-team-role"] {
        color: ${this.designSettings.primaryColor} !important;
      }

      /* Nav logo */
      #previewFrame .lp-nav-logo {
        color: ${this.designSettings.primaryColor} !important;
      }

      /* Testimonial rating */
      #previewFrame .lp-testimonial-rating,
      #previewFrame [class*="rating"] svg {
        color: ${this.designSettings.accentColor} !important;
        fill: ${this.designSettings.accentColor} !important;
      }

      /* FAQ accordion icons */
      #previewFrame [class*="faq"] [class*="icon"] {
        color: ${this.designSettings.primaryColor} !important;
      }

      /* Mockup decorations */
      #previewFrame .lp-hero-orb-1 {
        background: ${this.designSettings.primaryColor} !important;
      }
      #previewFrame .lp-hero-orb-2 {
        background: ${this.designSettings.secondaryColor} !important;
      }
      #previewFrame .lp-hero-orb-3 {
        background: ${this.designSettings.accentColor} !important;
      }

      /* Links hover */
      #previewFrame .lp-nav-menu li a::after {
        background: ${this.designSettings.primaryColor} !important;
      }
    `;
    document.head.appendChild(style);
  }

  resetColors() {
    this.designSettings.primaryColor = '#667eea';
    this.designSettings.secondaryColor = '#764ba2';
    this.designSettings.accentColor = '#f093fb';

    document.getElementById('primaryColor').value = this.designSettings.primaryColor;
    document.getElementById('secondaryColor').value = this.designSettings.secondaryColor;
    document.getElementById('accentColor').value = this.designSettings.accentColor;

    this.applyCustomColors();
    this.showNotification('カラーをリセットしました');
  }

  // ==========================================
  // SEO EDITOR
  // ==========================================

  setupSEOEditor() {
    document.addEventListener('DOMContentLoaded', () => {
      // SEO Title
      const seoTitle = document.getElementById('seoTitle');
      if (seoTitle) {
        seoTitle.addEventListener('input', (e) => {
          this.seoData.title = e.target.value;
        });
      }

      // SEO Description
      const seoDescription = document.getElementById('seoDescription');
      if (seoDescription) {
        seoDescription.addEventListener('input', (e) => {
          this.seoData.description = e.target.value;
        });
      }

      // SEO Keywords
      const seoKeywords = document.getElementById('seoKeywords');
      if (seoKeywords) {
        seoKeywords.addEventListener('input', (e) => {
          this.seoData.keywords = e.target.value;
        });
      }

      // OG Image
      const ogImage = document.getElementById('ogImage');
      if (ogImage) {
        ogImage.addEventListener('input', (e) => {
          this.seoData.ogImage = e.target.value;
        });
      }

      // Canonical URL
      const canonicalUrl = document.getElementById('canonicalUrl');
      if (canonicalUrl) {
        canonicalUrl.addEventListener('input', (e) => {
          this.seoData.canonicalUrl = e.target.value;
        });
      }

      // Language
      const seoLang = document.getElementById('seoLang');
      if (seoLang) {
        seoLang.addEventListener('change', (e) => {
          this.seoData.lang = e.target.value;
        });
      }

      // Twitter Card Checkbox
      const includeTwitterCard = document.getElementById('includeTwitterCard');
      if (includeTwitterCard) {
        includeTwitterCard.addEventListener('change', (e) => {
          this.seoData.includeTwitterCard = e.target.checked;
        });
      }

      // Schema.org Checkbox
      const includeSchema = document.getElementById('includeSchema');
      if (includeSchema) {
        includeSchema.addEventListener('change', (e) => {
          this.seoData.includeSchema = e.target.checked;
        });
      }
    });
  }

  generateSEOMetaTags() {
    let metaTags = '';

    // Basic meta tags
    if (this.seoData.title) {
      metaTags += `    <title>${this.seoData.title}</title>\n`;
    }

    if (this.seoData.description) {
      metaTags += `    <meta name="description" content="${this.seoData.description}">\n`;
    }

    if (this.seoData.keywords) {
      metaTags += `    <meta name="keywords" content="${this.seoData.keywords}">\n`;
    }

    // Language
    metaTags += `    <meta http-equiv="content-language" content="${this.seoData.lang}">\n`;

    // Canonical URL
    if (this.seoData.canonicalUrl) {
      metaTags += `    <link rel="canonical" href="${this.seoData.canonicalUrl}">\n`;
    }

    // Open Graph tags
    if (this.seoData.title) {
      metaTags += `    <meta property="og:title" content="${this.seoData.title}">\n`;
    }

    if (this.seoData.description) {
      metaTags += `    <meta property="og:description" content="${this.seoData.description}">\n`;
    }

    if (this.seoData.ogImage) {
      metaTags += `    <meta property="og:image" content="${this.seoData.ogImage}">\n`;
    }

    metaTags += `    <meta property="og:type" content="website">\n`;

    if (this.seoData.canonicalUrl) {
      metaTags += `    <meta property="og:url" content="${this.seoData.canonicalUrl}">\n`;
    }

    // Twitter Card tags
    if (this.seoData.includeTwitterCard) {
      metaTags += `    <meta name="twitter:card" content="summary_large_image">\n`;
      if (this.seoData.title) {
        metaTags += `    <meta name="twitter:title" content="${this.seoData.title}">\n`;
      }
      if (this.seoData.description) {
        metaTags += `    <meta name="twitter:description" content="${this.seoData.description}">\n`;
      }
      if (this.seoData.ogImage) {
        metaTags += `    <meta name="twitter:image" content="${this.seoData.ogImage}">\n`;
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
  // HELPER METHODS
  // ==========================================

  showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.enhanced-notification');
    if (existing) {
      existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `enhanced-notification enhanced-notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
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

  // ==========================================
  // SCROLL ANIMATIONS
  // ==========================================

  setupScrollAnimations() {
    // Add animation styles
    this.addAnimationStyles();

    // Setup Intersection Observer for scroll-triggered animations
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

          // Unobserve after animation
          this.animationObserver.unobserve(target);
        }
      });
    }, observerOptions);

    // Observe preview frame for changes
    this.observePreviewChanges();
  }

  observePreviewChanges() {
    const previewFrame = document.getElementById('previewFrame');
    if (!previewFrame) {
      setTimeout(() => this.observePreviewChanges(), 500);
      return;
    }

    // Initial setup
    this.initializeAnimatedElements(previewFrame);

    // Watch for DOM changes in preview
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
      '.lp-slide-up',
      '.lp-fade-in',
      '.lp-scale-in',
      '.lp-slide-left',
      '.lp-slide-right',
      '.lp-feature-card',
      '.lp-pricing-card-modern',
      '.lp-testimonial-card',
      '.lp-stat-card',
      '.lp-faq-item',
    ];

    const elements = container.querySelectorAll(animatableSelectors.join(', '));

    elements.forEach((el, index) => {
      if (!el.classList.contains('lp-animated') && !el.classList.contains('lp-animate-ready')) {
        el.classList.add('lp-animate-ready');
        el.dataset.animDelay = index * 100; // Stagger animations
        this.animationObserver.observe(el);
      }
    });
  }

  addAnimationStyles() {
    const existingStyle = document.getElementById('lp-animation-styles');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'lp-animation-styles';
    style.textContent = `
      /* Animation Ready States */
      .lp-animate-ready.lp-slide-up {
        opacity: 0;
        transform: translateY(40px);
      }

      .lp-animate-ready.lp-fade-in {
        opacity: 0;
      }

      .lp-animate-ready.lp-scale-in {
        opacity: 0;
        transform: scale(0.9);
      }

      .lp-animate-ready.lp-slide-left {
        opacity: 0;
        transform: translateX(-40px);
      }

      .lp-animate-ready.lp-slide-right {
        opacity: 0;
        transform: translateX(40px);
      }

      .lp-animate-ready.lp-feature-card,
      .lp-animate-ready.lp-pricing-card-modern,
      .lp-animate-ready.lp-testimonial-card,
      .lp-animate-ready.lp-stat-card,
      .lp-animate-ready.lp-faq-item {
        opacity: 0;
        transform: translateY(30px);
      }

      /* Animated States */
      .lp-animated.lp-slide-up {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
                    transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .lp-animated.lp-fade-in {
        opacity: 1;
        transition: opacity 0.8s ease;
      }

      .lp-animated.lp-scale-in {
        opacity: 1;
        transform: scale(1);
        transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
      }

      .lp-animated.lp-slide-left {
        opacity: 1;
        transform: translateX(0);
        transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .lp-animated.lp-slide-right {
        opacity: 1;
        transform: translateX(0);
        transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .lp-animated.lp-feature-card,
      .lp-animated.lp-pricing-card-modern,
      .lp-animated.lp-testimonial-card,
      .lp-animated.lp-stat-card,
      .lp-animated.lp-faq-item {
        opacity: 1;
        transform: translateY(0);
        transition: opacity 0.5s cubic-bezier(0.22, 1, 0.36, 1),
                    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      }

      /* Stagger animation for grids */
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
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // HOVER EFFECTS
  // ==========================================

  setupHoverEffects() {
    this.addHoverEffectStyles();

    // Enhanced hover effects via event delegation
    document.addEventListener('mousemove', (e) => {
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
    });
  }

  addHoverEffectStyles() {
    const existingStyle = document.getElementById('lp-hover-effect-styles');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'lp-hover-effect-styles';
    style.textContent = `
      /* Spotlight hover effect for cards */
      .lp-feature-card::before,
      .lp-pricing-card-modern::before,
      .lp-stat-card::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(
          600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(59, 130, 246, 0.08),
          transparent 40%
        );
        border-radius: inherit;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
        z-index: 0;
      }

      .lp-feature-card:hover::before,
      .lp-pricing-card-modern:hover::before,
      .lp-stat-card:hover::before {
        opacity: 1;
      }

      /* Button ripple effect */
      .lp-btn {
        position: relative;
        overflow: hidden;
      }

      .lp-btn::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 10%, transparent 10%);
        transform: scale(10);
        opacity: 0;
        transition: transform 0.5s, opacity 0.3s;
        pointer-events: none;
      }

      .lp-btn:active::after {
        transform: scale(0);
        opacity: 1;
        transition: 0s;
      }

      /* Image zoom effect */
      .lp-gallery-item img,
      .lp-feature-image img {
        transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .lp-gallery-item:hover img,
      .lp-feature-image:hover img {
        transform: scale(1.05);
      }

      /* Link underline animation */
      .lp-feature-link {
        position: relative;
      }

      .lp-feature-link::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 2px;
        background: currentColor;
        transition: width 0.3s ease;
      }

      .lp-feature-link:hover::after {
        width: 100%;
      }

      /* Card tilt effect on hover */
      @media (hover: hover) {
        .lp-pricing-card-modern {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .lp-pricing-card-modern:hover {
          transform: translateY(-8px) rotateX(2deg);
        }

        .lp-pricing-featured:hover {
          transform: scale(1.05) translateY(-10px) rotateX(2deg);
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ==========================================
  // PARALLAX EFFECTS
  // ==========================================

  setupParallaxEffects() {
    this.addParallaxStyles();

    // Smooth parallax scrolling for hero elements
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const heroSection = document.querySelector('.lp-hero-modern');

      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        const heroOffset = heroRect.top + scrollY;
        const scrollProgress = Math.max(0, scrollY - heroOffset);

        // Parallax for orbs
        const orbs = heroSection.querySelectorAll('.lp-hero-gradient-orb');
        orbs.forEach((orb, index) => {
          const speed = 0.3 + index * 0.1;
          orb.style.transform = `translateY(${scrollProgress * speed}px)`;
        });

        // Parallax for mockup
        const mockup = heroSection.querySelector('.lp-hero-mockup');
        if (mockup) {
          mockup.style.transform = `translateY(${scrollProgress * 0.15}px)`;
        }

        // Fade out hero content on scroll
        const heroContent = heroSection.querySelector('.lp-hero-content');
        if (heroContent) {
          const opacity = Math.max(0, 1 - scrollProgress / 400);
          heroContent.style.opacity = opacity;
        }
      }

      // Stats section parallax
      const statsSection = document.querySelector('.lp-stats-modern');
      if (statsSection) {
        const gradientLine = statsSection.querySelector('.lp-stats-gradient-line');
        if (gradientLine) {
          gradientLine.style.backgroundPosition = `${scrollY * 0.5}% 0%`;
        }
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  addParallaxStyles() {
    const existingStyle = document.getElementById('lp-parallax-styles');
    if (existingStyle) return;

    const style = document.createElement('style');
    style.id = 'lp-parallax-styles';
    style.textContent = `
      /* Smooth transitions for parallax elements */
      .lp-hero-gradient-orb {
        will-change: transform;
        transition: transform 0.1s ease-out;
      }

      .lp-hero-mockup {
        will-change: transform;
        transition: transform 0.1s ease-out;
      }

      .lp-hero-content {
        will-change: opacity;
        transition: opacity 0.1s ease-out;
      }

      /* Floating animation enhancement */
      @keyframes float-subtle {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-10px) rotate(1deg);
        }
        50% {
          transform: translateY(-5px) rotate(-1deg);
        }
        75% {
          transform: translateY(-15px) rotate(0.5deg);
        }
      }

      .lp-hero-stats .lp-hero-stat-item {
        animation: float-subtle 6s ease-in-out infinite;
      }

      .lp-hero-stats .lp-hero-stat-item:nth-child(1) {
        animation-delay: 0s;
      }

      .lp-hero-stats .lp-hero-stat-item:nth-child(2) {
        animation-delay: 1s;
      }

      .lp-hero-stats .lp-hero-stat-item:nth-child(3) {
        animation-delay: 2s;
      }

      /* Gradient text shimmer animation */
      @keyframes shimmer {
        0% {
          background-position: -200% center;
        }
        100% {
          background-position: 200% center;
        }
      }

      .lp-gradient-text {
        background-size: 200% auto;
        animation: shimmer 4s linear infinite;
      }

      /* Pulse animation for badges */
      @keyframes badge-pulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4);
        }
        50% {
          box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
        }
      }

      .lp-hero-badge,
      .lp-cta-badge {
        animation: badge-pulse 3s infinite;
      }

      /* Counter animation for stats */
      .lp-stat-count {
        display: inline-block;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize enhanced features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.enhancedGenerator = new EnhancedGenerator();
  console.log('Enhanced Generator initialized');

  // Listen for section reorder events
  document.addEventListener('sectionsReordered', () => {
    if (window.lpGenerator) {
      // Sync sections from DOM
      const wrappers = document.querySelectorAll('.lp-section-wrapper');
      const newOrder = [];

      wrappers.forEach((wrapper) => {
        const sectionId = wrapper.dataset.sectionId;
        const section = window.lpGenerator.sections.find((s) => s.id === sectionId);
        if (section) {
          newOrder.push(section);
        }
      });

      window.lpGenerator.sections = newOrder;
    }
  });
});
