// Enhanced Generator Features
// Drag & Drop, Advanced Interactions, Export Enhancements

class EnhancedGenerator {
    constructor() {
        this.draggedElement = null;
        this.init();
    }

    init() {
        this.setupDragAndDrop();
        this.setupAdvancedExport();
        this.setupPresets();
        this.setupKeyboardShortcuts();
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
                detail: { source: 'drag-drop' }
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
                <span>⬇️</span> エクスポート形式
            </button>
            <div class="export-menu" id="exportMenu" style="display: none;">
                <button class="export-option" data-format="html">
                    <span>📄</span> HTML
                </button>
                <button class="export-option" data-format="react">
                    <span>⚛️</span> React Component
                </button>
                <button class="export-option" data-format="vue">
                    <span>💚</span> Vue Component
                </button>
                <button class="export-option" data-format="json">
                    <span>📋</span> JSON Config
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
        document.querySelectorAll('.export-option').forEach(btn => {
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
        const sectionsJSX = lpGen.sections.map(section => {
            const html = section.template.html
                .replace(/\bclass=/g, 'className=')
                .replace(/for=/g, 'htmlFor=');
            return html;
        }).join('\n');

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
        const sectionsHTML = lpGen.sections.map(s => s.template.html).join('\n');

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
            sections: lpGen.sections.map(section => ({
                id: section.id,
                type: section.type,
                name: section.template.name
            }))
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
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const preset = e.currentTarget.dataset.preset;
                this.applyPreset(preset);
            });
        });
    }

    applyPreset(presetName) {
        if (!window.lpGenerator) return;

        const presets = {
            startup: ['hero-split', 'features-cards-hover', 'social-proof', 'pricing-modern', 'testimonials-carousel', 'cta-split'],
            saas: ['hero-animated', 'features-timeline', 'pricing-modern', 'testimonials', 'faq', 'newsletter'],
            portfolio: ['hero-1', 'gallery', 'features-grid', 'team', 'testimonials', 'contact'],
            ecommerce: ['hero-split', 'features-grid', 'gallery', 'pricing', 'testimonials', 'cta']
        };

        const sections = presets[presetName] || [];

        // Clear existing sections
        window.lpGenerator.sections = [];

        // Add preset sections
        sections.forEach(componentType => {
            if (sectionTemplates[componentType]) {
                window.lpGenerator.sections.push({
                    type: componentType,
                    id: window.lpGenerator.generateId(),
                    template: sectionTemplates[componentType]
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

            wrappers.forEach(wrapper => {
                const sectionId = wrapper.dataset.sectionId;
                const section = window.lpGenerator.sections.find(s => s.id === sectionId);
                if (section) {
                    newOrder.push(section);
                }
            });

            window.lpGenerator.sections = newOrder;
        }
    });
});
