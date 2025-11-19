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

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadSectionTemplates();
  }

  setupEventListeners() {
    // Theme selection
    document.querySelectorAll('.theme-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleThemeChange(e));
    });

    // Component addition
    document.querySelectorAll('.component-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => this.handleComponentAdd(e));
    });

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
    document.getElementById('clearAll')?.addEventListener('click', () => this.clearAll());

    // Project management
    document.getElementById('saveProject')?.addEventListener('click', () => this.saveProject());
    document
      .getElementById('loadProject')
      ?.addEventListener('click', () => this.toggleProjectsList());

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

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('exportModal');
        if (modal && modal.classList.contains('active')) {
          this.closeExportModal();
        }
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
                        <div class="empty-state-icon">✨</div>
                    </div>
                </div>
            `;
      return;
    }

    const html = this.generatePreviewHTML();
    previewFrame.innerHTML = html;

    // Add delete buttons to sections
    this.addSectionControls();
  }

  generatePreviewHTML() {
    const sectionsHTML = this.sections
      .map((section) => {
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
      })
      .join('');

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
    document.querySelectorAll('.lp-delete').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.target.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.deleteSection(sectionId);
      });
    });

    // Move up buttons
    document.querySelectorAll('.lp-move-up').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.target.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.moveSectionUp(sectionId);
      });
    });

    // Move down buttons
    document.querySelectorAll('.lp-move-down').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const wrapper = e.target.closest('.lp-section-wrapper');
        const sectionId = wrapper.dataset.sectionId;
        this.moveSectionDown(sectionId);
      });
    });
  }

  deleteSection(sectionId) {
    this.sections = this.sections.filter((s) => s.id !== sectionId);
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
      this.updatePreview();
    }
  }

  exportHTML() {
    if (this.sections.length === 0) {
      this.showNotification('エクスポートするセクションがありません', 'error');
      return;
    }

    // Generate HTML and show preview modal
    const fullHTML = this.generateFullHTML();
    this.showExportModal(fullHTML);
  }

  showExportModal(htmlCode) {
    const modal = document.getElementById('exportModal');
    const codePreview = document.getElementById('exportCodePreview').querySelector('code');
    const linesElement = document.getElementById('exportCodeLines');
    const sizeElement = document.getElementById('exportCodeSize');

    // Store the HTML for later download
    this.exportedHTML = htmlCode;

    // Display the code
    codePreview.textContent = htmlCode;

    // Calculate and display stats
    const lines = htmlCode.split('\n').length;
    const sizeKB = (new Blob([htmlCode]).size / 1024).toFixed(2);

    linesElement.textContent = lines;
    sizeElement.textContent = sizeKB;

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  closeExportModal() {
    const modal = document.getElementById('exportModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    this.exportedHTML = null;
  }

  async copyCode() {
    if (!this.exportedHTML) return;

    try {
      await navigator.clipboard.writeText(this.exportedHTML);
      this.showNotification('コードをクリップボードにコピーしました');

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

    const blob = new Blob([this.exportedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `landing-page-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showNotification('HTMLファイルをダウンロードしました');
    this.closeExportModal();
  }

  generateFullHTML() {
    if (this.cssMode === 'tailwind') {
      return this.generateTailwindHTML();
    } else {
      return this.generateCustomCSSHTML();
    }
  }

  generateCustomCSSHTML() {
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

  generateTailwindHTML() {
    const sectionsHTML = this.sections.map((section) => section.template.html).join('\n');

    // Get SEO meta tags from enhanced generator if available
    let seoMetaTags = '';
    if (window.enhancedGenerator && window.enhancedGenerator.generateSEOMetaTags) {
      seoMetaTags = window.enhancedGenerator.generateSEOMetaTags();
    }

    // Get language setting from enhanced generator if available
    const lang = window.enhancedGenerator?.seoData?.lang || 'ja';

    // Get theme colors
    const themeColors = this.getThemeColors();

    return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
${seoMetaTags || '    <title>My Landing Page</title>'}
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        primary: '${themeColors.primary}',
                        secondary: '${themeColors.secondary}',
                    },
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                        display: ['Poppins', 'sans-serif'],
                    }
                }
            }
        }
    </script>
    <style>
        /* Custom styles for compatibility */
        ${this.getInlineCSS()}
    </style>
</head>
<body class="font-sans">
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
