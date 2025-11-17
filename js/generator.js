// Universal Landing Page Generator
// Main Application Logic

class LandingPageGenerator {
    constructor() {
        this.currentTheme = 'modern-blue';
        this.sections = [];
        this.animations = true;
        this.glassmorphism = false;
        this.deviceMode = 'desktop';

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSectionTemplates();
    }

    setupEventListeners() {
        // Theme selection
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleThemeChange(e));
        });

        // Component addition
        document.querySelectorAll('.component-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleComponentAdd(e));
        });

        // Device toggles
        document.querySelectorAll('.device-btn').forEach(btn => {
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
        document.getElementById('clearAll')?.addEventListener('click', () => this.clearAll());
    }

    loadSectionTemplates() {
        // Templates are loaded from templates.js
        console.log('Section templates loaded');
    }

    handleThemeChange(e) {
        const btn = e.currentTarget;
        const theme = btn.dataset.theme;

        // Update active state
        document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
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
                template: sectionTemplates[component]
            });

            this.updatePreview();
            this.showNotification(`${sectionTemplates[component].name} を追加しました`);
        }
    }

    handleDeviceChange(e) {
        const btn = e.currentTarget;
        const device = btn.dataset.device;

        // Update active state
        document.querySelectorAll('.device-btn').forEach(b => b.classList.remove('active'));
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
                        <div class="empty-state-icon">✨</div>
                    </div>
                </div>
            `;
            return;
        }

        let html = this.generatePreviewHTML();
        previewFrame.innerHTML = html;

        // Add delete buttons to sections
        this.addSectionControls();
    }

    generatePreviewHTML() {
        const sectionsHTML = this.sections.map(section => {
            return `
                <div class="lp-section-wrapper" data-section-id="${section.id}">
                    <div class="lp-section-controls">
                        <button class="lp-control-btn lp-move-up" title="上に移動">↑</button>
                        <button class="lp-control-btn lp-move-down" title="下に移動">↓</button>
                        <button class="lp-control-btn lp-delete" title="削除">🗑️</button>
                    </div>
                    ${section.template.html}
                </div>
            `;
        }).join('');

        return `
            <style>
                .lp-section-wrapper {
                    position: relative;
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
                }
                .lp-control-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
                }
                .lp-control-btn.lp-delete:hover {
                    background: #fee;
                }
            </style>
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="css/landing-page.css">
            <div class="lp-container ${this.glassmorphism ? 'glassmorphism' : ''}" data-theme="${this.currentTheme}">
                ${sectionsHTML}
            </div>
        `;
    }

    addSectionControls() {
        // Delete buttons
        document.querySelectorAll('.lp-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wrapper = e.target.closest('.lp-section-wrapper');
                const sectionId = wrapper.dataset.sectionId;
                this.deleteSection(sectionId);
            });
        });

        // Move up buttons
        document.querySelectorAll('.lp-move-up').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wrapper = e.target.closest('.lp-section-wrapper');
                const sectionId = wrapper.dataset.sectionId;
                this.moveSectionUp(sectionId);
            });
        });

        // Move down buttons
        document.querySelectorAll('.lp-move-down').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const wrapper = e.target.closest('.lp-section-wrapper');
                const sectionId = wrapper.dataset.sectionId;
                this.moveSectionDown(sectionId);
            });
        });
    }

    deleteSection(sectionId) {
        this.sections = this.sections.filter(s => s.id !== sectionId);
        this.updatePreview();
        this.showNotification('セクションを削除しました');
    }

    moveSectionUp(sectionId) {
        const index = this.sections.findIndex(s => s.id === sectionId);
        if (index > 0) {
            [this.sections[index - 1], this.sections[index]] = [this.sections[index], this.sections[index - 1]];
            this.updatePreview();
        }
    }

    moveSectionDown(sectionId) {
        const index = this.sections.findIndex(s => s.id === sectionId);
        if (index < this.sections.length - 1) {
            [this.sections[index], this.sections[index + 1]] = [this.sections[index + 1], this.sections[index]];
            this.updatePreview();
        }
    }

    exportHTML() {
        if (this.sections.length === 0) {
            this.showNotification('エクスポートするセクションがありません', 'error');
            return;
        }

        const fullHTML = this.generateFullHTML();
        const blob = new Blob([fullHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `landing-page-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        this.showNotification('HTMLファイルをダウンロードしました');
    }

    generateFullHTML() {
        const sectionsHTML = this.sections.map(section => section.template.html).join('\n');

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
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        ${this.getInlineCSS()}
    </style>
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

    async getInlineCSS() {
        // In a real implementation, this would fetch the CSS file content
        // For now, we'll return a placeholder that references the external file
        try {
            const response = await fetch('css/landing-page.css');
            const css = await response.text();
            return css;
        } catch (error) {
            console.error('Failed to load CSS:', error);
            return '/* CSS loading failed - please include css/landing-page.css manually */';
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
});
