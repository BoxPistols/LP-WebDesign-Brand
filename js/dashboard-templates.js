// Dashboard Component Templates
// Modern SaaS Dashboard Components
// Atomic Design: Atoms → Molecules → Organisms

const dashboardTemplates = {
  // ==========================================
  // ========== ATOMS (最小単位) ==========
  // ==========================================

  // ----- Buttons -----
  'btn-primary': {
    name: 'ボタン (Primary)',
    category: 'atom',
    html: `<button class="action-btn primary">Primary Button</button>`,
  },

  'btn-secondary': {
    name: 'ボタン (Secondary)',
    category: 'atom',
    html: `<button class="action-btn secondary">Secondary Button</button>`,
  },

  'btn-ghost': {
    name: 'ボタン (Ghost)',
    category: 'atom',
    html: `<button class="action-btn ghost">Ghost Button</button>`,
  },

  'btn-icon': {
    name: 'アイコンボタン',
    category: 'atom',
    html: `
        <button class="icon-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </button>`,
  },

  // ----- Badges -----
  'badge-default': {
    name: 'バッジ (Default)',
    category: 'atom',
    html: `<span class="badge">Default</span>`,
  },

  'badge-success': {
    name: 'バッジ (Success)',
    category: 'atom',
    html: `<span class="badge success">Success</span>`,
  },

  'badge-warning': {
    name: 'バッジ (Warning)',
    category: 'atom',
    html: `<span class="badge warning">Warning</span>`,
  },

  'badge-danger': {
    name: 'バッジ (Danger)',
    category: 'atom',
    html: `<span class="badge danger">Danger</span>`,
  },

  // ----- Avatar -----
  'avatar-sm': {
    name: 'アバター (小)',
    category: 'atom',
    html: `<div class="avatar avatar-sm">田</div>`,
  },

  'avatar-md': {
    name: 'アバター (中)',
    category: 'atom',
    html: `<div class="avatar avatar-md">田</div>`,
  },

  'avatar-lg': {
    name: 'アバター (大)',
    category: 'atom',
    html: `<div class="avatar avatar-lg">田</div>`,
  },

  // ----- Form Elements -----
  'input-text': {
    name: 'テキスト入力',
    category: 'atom',
    html: `<input type="text" class="form-input" placeholder="テキストを入力...">`,
  },

  'input-select': {
    name: 'セレクト',
    category: 'atom',
    html: `
        <select class="form-select">
            <option>オプション 1</option>
            <option>オプション 2</option>
            <option>オプション 3</option>
        </select>`,
  },

  'input-checkbox': {
    name: 'チェックボックス',
    category: 'atom',
    html: `
        <label class="checkbox-label">
            <input type="checkbox" class="form-checkbox">
            <span>チェックボックス</span>
        </label>`,
  },

  'input-toggle': {
    name: 'トグルスイッチ',
    category: 'atom',
    html: `
        <label class="toggle-switch">
            <input type="checkbox">
            <span class="toggle-slider"></span>
        </label>`,
  },

  // ----- Progress -----
  'progress-bar': {
    name: 'プログレスバー',
    category: 'atom',
    html: `
        <div class="progress-bar-container">
            <div class="progress-bar" style="width: 65%;"></div>
        </div>`,
  },

  // ----- Typography -----
  'heading-h1': {
    name: '見出し H1',
    category: 'atom',
    html: `<h1 class="db-heading-1">見出しテキスト</h1>`,
  },

  'heading-h2': {
    name: '見出し H2',
    category: 'atom',
    html: `<h2 class="db-heading-2">見出しテキスト</h2>`,
  },

  'heading-h3': {
    name: '見出し H3',
    category: 'atom',
    html: `<h3 class="db-heading-3">見出しテキスト</h3>`,
  },

  'text-body': {
    name: '本文テキスト',
    category: 'atom',
    html: `<p class="db-text">これは本文テキストのサンプルです。ダッシュボードの説明文などに使用します。</p>`,
  },

  'text-caption': {
    name: 'キャプション',
    category: 'atom',
    html: `<span class="db-caption">キャプションテキスト</span>`,
  },

  // ----- Divider -----
  divider: {
    name: '区切り線',
    category: 'atom',
    html: `<hr class="db-divider">`,
  },

  // ----- Icons -----
  'icon-chart': {
    name: 'アイコン (Chart)',
    category: 'atom',
    html: `
        <div class="db-icon blue">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
        </div>`,
  },

  'icon-user': {
    name: 'アイコン (User)',
    category: 'atom',
    html: `
        <div class="db-icon green">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
            </svg>
        </div>`,
  },

  'icon-settings': {
    name: 'アイコン (Settings)',
    category: 'atom',
    html: `
        <div class="db-icon purple">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        </div>`,
  },

  // ----- Button Sizes -----
  'btn-sm': {
    name: 'ボタン (小)',
    category: 'atom',
    html: `<button class="action-btn primary btn-sm">Small</button>`,
  },

  'btn-lg': {
    name: 'ボタン (大)',
    category: 'atom',
    html: `<button class="action-btn primary btn-lg">Large Button</button>`,
  },

  'btn-danger': {
    name: 'ボタン (Danger)',
    category: 'atom',
    html: `<button class="action-btn danger">Delete</button>`,
  },

  'btn-success': {
    name: 'ボタン (Success)',
    category: 'atom',
    html: `<button class="action-btn success">Complete</button>`,
  },

  // ----- More Form Elements -----
  'input-textarea': {
    name: 'テキストエリア',
    category: 'atom',
    html: `<textarea class="form-textarea" placeholder="メッセージを入力..." rows="3"></textarea>`,
  },

  'input-radio': {
    name: 'ラジオボタン',
    category: 'atom',
    html: `
        <label class="radio-label">
            <input type="radio" name="option" class="form-radio" checked>
            <span>オプション A</span>
        </label>`,
  },

  'input-number': {
    name: '数値入力',
    category: 'atom',
    html: `<input type="number" class="form-input form-input-number" value="100" min="0" max="1000">`,
  },

  'input-date': {
    name: '日付入力',
    category: 'atom',
    html: `<input type="date" class="form-input">`,
  },

  'input-range': {
    name: 'スライダー',
    category: 'atom',
    html: `<input type="range" class="form-range" min="0" max="100" value="50">`,
  },

  // ----- Loading States -----
  spinner: {
    name: 'スピナー',
    category: 'atom',
    html: `
        <div class="spinner">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
        </div>`,
  },

  'skeleton-text': {
    name: 'スケルトン (テキスト)',
    category: 'atom',
    html: `
        <div class="skeleton-container">
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text skeleton-short"></div>
        </div>`,
  },

  'skeleton-avatar': {
    name: 'スケルトン (アバター)',
    category: 'atom',
    html: `<div class="skeleton skeleton-avatar"></div>`,
  },

  'skeleton-card': {
    name: 'スケルトン (カード)',
    category: 'atom',
    html: `
        <div class="skeleton-card">
            <div class="skeleton skeleton-image"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text skeleton-short"></div>
        </div>`,
  },

  // ----- Status Indicators -----
  'status-dot-online': {
    name: 'ステータス (Online)',
    category: 'atom',
    html: `<span class="status-dot online"></span>`,
  },

  'status-dot-offline': {
    name: 'ステータス (Offline)',
    category: 'atom',
    html: `<span class="status-dot offline"></span>`,
  },

  'status-dot-busy': {
    name: 'ステータス (Busy)',
    category: 'atom',
    html: `<span class="status-dot busy"></span>`,
  },

  // ----- Links -----
  'link-text': {
    name: 'テキストリンク',
    category: 'atom',
    html: `<a href="#" class="text-link">リンクテキスト</a>`,
  },

  'link-external': {
    name: '外部リンク',
    category: 'atom',
    html: `
        <a href="#" class="text-link external">
            外部リンク
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
        </a>`,
  },

  // ----- Tags -----
  tag: {
    name: 'タグ',
    category: 'atom',
    html: `
        <span class="tag">
            タグ
            <button class="tag-remove">×</button>
        </span>`,
  },

  'tag-group': {
    name: 'タググループ',
    category: 'atom',
    html: `
        <div class="tag-group">
            <span class="tag blue">React</span>
            <span class="tag green">Vue</span>
            <span class="tag purple">Angular</span>
        </div>`,
  },

  // ----- Image Placeholder -----
  'image-placeholder': {
    name: '画像プレースホルダー',
    category: 'atom',
    html: `
        <div class="image-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
            </svg>
        </div>`,
  },

  // ----- Separators -----
  'separator-vertical': {
    name: '縦区切り線',
    category: 'atom',
    html: `<div class="separator-vertical"></div>`,
  },

  'separator-with-text': {
    name: '区切り線 (テキスト付き)',
    category: 'atom',
    html: `
        <div class="separator-text">
            <span>または</span>
        </div>`,
  },

  // ==========================================
  // ========== MOLECULES (組み合わせ) ==========
  // ==========================================

  // ----- Layout Containers -----
  'layout-card': {
    name: 'カードコンテナ',
    category: 'molecule',
    html: `
        <div class="db-card">
            <div class="card-content">
                <!-- コンテンツをここに配置 -->
            </div>
        </div>`,
  },

  'layout-card-header': {
    name: 'カード (ヘッダー付き)',
    category: 'molecule',
    html: `
        <div class="db-card">
            <div class="db-card-header">
                <h3 class="db-card-title">カードタイトル</h3>
                <span class="db-card-action">アクション →</span>
            </div>
            <div class="card-content">
                <!-- コンテンツをここに配置 -->
            </div>
        </div>`,
  },

  'layout-flex-row': {
    name: 'Flexレイアウト (横並び)',
    category: 'molecule',
    html: `
        <div class="flex-row">
            <div class="flex-item">アイテム 1</div>
            <div class="flex-item">アイテム 2</div>
            <div class="flex-item">アイテム 3</div>
        </div>`,
  },

  'layout-flex-col': {
    name: 'Flexレイアウト (縦並び)',
    category: 'molecule',
    html: `
        <div class="flex-col">
            <div class="flex-item">アイテム 1</div>
            <div class="flex-item">アイテム 2</div>
            <div class="flex-item">アイテム 3</div>
        </div>`,
  },

  'layout-flex-between': {
    name: 'Flex (両端揃え)',
    category: 'molecule',
    html: `
        <div class="flex-between">
            <div>左側コンテンツ</div>
            <div>右側コンテンツ</div>
        </div>`,
  },

  'layout-flex-center': {
    name: 'Flex (中央揃え)',
    category: 'molecule',
    html: `
        <div class="flex-center">
            <div>中央コンテンツ</div>
        </div>`,
  },

  'layout-grid-2col': {
    name: 'Grid 2カラム',
    category: 'molecule',
    html: `
        <div class="layout-grid cols-2">
            <div class="grid-item">カラム 1</div>
            <div class="grid-item">カラム 2</div>
        </div>`,
  },

  'layout-grid-3col': {
    name: 'Grid 3カラム',
    category: 'molecule',
    html: `
        <div class="layout-grid cols-3">
            <div class="grid-item">カラム 1</div>
            <div class="grid-item">カラム 2</div>
            <div class="grid-item">カラム 3</div>
        </div>`,
  },

  'layout-grid-4col': {
    name: 'Grid 4カラム',
    category: 'molecule',
    html: `
        <div class="layout-grid cols-4">
            <div class="grid-item">1</div>
            <div class="grid-item">2</div>
            <div class="grid-item">3</div>
            <div class="grid-item">4</div>
        </div>`,
  },

  'layout-split': {
    name: 'Split レイアウト',
    category: 'molecule',
    html: `
        <div class="layout-split">
            <div class="split-left">
                左側エリア (1/3)
            </div>
            <div class="split-right">
                右側エリア (2/3)
            </div>
        </div>`,
  },

  'layout-stack': {
    name: 'Stack (縦積み)',
    category: 'molecule',
    html: `
        <div class="stack">
            <div class="stack-item">スタックアイテム 1</div>
            <div class="stack-item">スタックアイテム 2</div>
            <div class="stack-item">スタックアイテム 3</div>
        </div>`,
  },

  'layout-inline': {
    name: 'Inline (横並び)',
    category: 'molecule',
    html: `
        <div class="inline">
            <span class="inline-item">アイテム 1</span>
            <span class="inline-item">アイテム 2</span>
            <span class="inline-item">アイテム 3</span>
        </div>`,
  },

  'layout-section': {
    name: 'セクション',
    category: 'molecule',
    html: `
        <section class="layout-section">
            <h2 class="section-heading">セクションタイトル</h2>
            <div class="section-content">
                <!-- セクションコンテンツ -->
            </div>
        </section>`,
  },

  'layout-panel': {
    name: 'パネル',
    category: 'molecule',
    html: `
        <div class="panel">
            <div class="panel-header">
                <h4 class="panel-title">パネルタイトル</h4>
            </div>
            <div class="panel-body">
                パネルのコンテンツ
            </div>
            <div class="panel-footer">
                <button class="action-btn secondary">キャンセル</button>
                <button class="action-btn primary">保存</button>
            </div>
        </div>`,
  },

  'layout-box': {
    name: 'ボックス',
    category: 'molecule',
    html: `
        <div class="box">
            ボックスコンテンツ
        </div>`,
  },

  'layout-box-bordered': {
    name: 'ボックス (枠線付き)',
    category: 'molecule',
    html: `
        <div class="box bordered">
            枠線付きボックス
        </div>`,
  },

  'layout-box-shadowed': {
    name: 'ボックス (影付き)',
    category: 'molecule',
    html: `
        <div class="box shadowed">
            影付きボックス
        </div>`,
  },

  // ----- Stat Card Single -----
  'stat-card-single': {
    name: '単一統計カード',
    category: 'molecule',
    html: `
        <div class="stat-card">
            <div class="stat-card-header">
                <div>
                    <div class="stat-card-title">総売上</div>
                    <div class="stat-card-value">¥2,450,000</div>
                </div>
                <div class="stat-card-icon blue">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="12" y1="1" x2="12" y2="23" stroke-width="2" stroke-linecap="round"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="stat-card-footer">
                <span class="stat-trend up">12.5%</span>
                <span class="stat-period">先月比</span>
            </div>
        </div>`,
  },

  // ----- Avatar with Info -----
  'avatar-with-info': {
    name: 'アバター + 情報',
    category: 'molecule',
    html: `
        <div class="avatar-info">
            <div class="avatar avatar-md">田</div>
            <div class="avatar-info-text">
                <div class="avatar-name">田中太郎</div>
                <div class="avatar-email">tanaka@example.com</div>
            </div>
        </div>`,
  },

  // ----- Input with Label -----
  'input-with-label': {
    name: 'ラベル付き入力',
    category: 'molecule',
    html: `
        <div class="form-group">
            <label class="form-label">メールアドレス</label>
            <input type="email" class="form-input" placeholder="your@email.com">
            <span class="form-helper">有効なメールアドレスを入力してください</span>
        </div>`,
  },

  // ----- Button Group -----
  'button-group': {
    name: 'ボタングループ',
    category: 'molecule',
    html: `
        <div class="button-group">
            <button class="action-btn secondary active">日</button>
            <button class="action-btn secondary">週</button>
            <button class="action-btn secondary">月</button>
            <button class="action-btn secondary">年</button>
        </div>`,
  },

  // ----- Breadcrumb -----
  breadcrumb: {
    name: 'パンくずリスト',
    category: 'molecule',
    html: `
        <nav class="breadcrumb">
            <a href="#" class="breadcrumb-item">ホーム</a>
            <span class="breadcrumb-separator">/</span>
            <a href="#" class="breadcrumb-item">ダッシュボード</a>
            <span class="breadcrumb-separator">/</span>
            <span class="breadcrumb-item active">分析</span>
        </nav>`,
  },

  // ----- Pagination -----
  pagination: {
    name: 'ページネーション',
    category: 'molecule',
    html: `
        <div class="pagination">
            <button class="pagination-btn" disabled>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <button class="pagination-btn active">1</button>
            <button class="pagination-btn">2</button>
            <button class="pagination-btn">3</button>
            <span class="pagination-dots">...</span>
            <button class="pagination-btn">10</button>
            <button class="pagination-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>`,
  },

  // ----- Tabs -----
  tabs: {
    name: 'タブ',
    category: 'molecule',
    html: `
        <div class="tabs">
            <button class="tab-btn active">概要</button>
            <button class="tab-btn">分析</button>
            <button class="tab-btn">レポート</button>
            <button class="tab-btn">設定</button>
        </div>`,
  },

  // ----- Search Input -----
  'search-input': {
    name: '検索入力',
    category: 'molecule',
    html: `
        <div class="search-bar compact">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input type="text" class="search-input" placeholder="検索...">
        </div>`,
  },

  // ----- Notification Badge -----
  'notification-badge': {
    name: '通知バッジ',
    category: 'molecule',
    html: `
        <div class="notification-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="notification-count">3</span>
        </div>`,
  },

  // ----- List Item -----
  'list-item': {
    name: 'リストアイテム',
    category: 'molecule',
    html: `
        <div class="list-item">
            <div class="list-item-icon blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
            </div>
            <div class="list-item-content">
                <div class="list-item-title">ドキュメント名</div>
                <div class="list-item-subtitle">更新: 2024/01/15</div>
            </div>
            <button class="icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="19" cy="12" r="1"/>
                    <circle cx="5" cy="12" r="1"/>
                </svg>
            </button>
        </div>`,
  },

  // ----- Metric Mini -----
  'metric-mini': {
    name: 'ミニメトリック',
    category: 'molecule',
    html: `
        <div class="metric-mini">
            <span class="metric-label">アクティブユーザー</span>
            <span class="metric-value">1,234</span>
            <span class="metric-change up">+12%</span>
        </div>`,
  },

  // ----- Card Header -----
  'card-header': {
    name: 'カードヘッダー',
    category: 'molecule',
    html: `
        <div class="db-card-header">
            <h3 class="db-card-title">カードタイトル</h3>
            <span class="db-card-action">詳細を見る →</span>
        </div>`,
  },

  // ----- Empty State -----
  'empty-state': {
    name: '空の状態',
    category: 'molecule',
    html: `
        <div class="empty-state">
            <div class="empty-state-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                    <polyline points="13 2 13 9 20 9"/>
                </svg>
            </div>
            <p class="empty-state-title">データがありません</p>
            <p class="empty-state-text">まだデータが登録されていません</p>
            <button class="action-btn primary">データを追加</button>
        </div>`,
  },

  // ----- Tooltip -----
  tooltip: {
    name: 'ツールチップ',
    category: 'molecule',
    html: `
        <div class="tooltip-container">
            <button class="icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            </button>
            <div class="tooltip">ヘルプテキストがここに表示されます</div>
        </div>`,
  },

  // ==========================================
  // ========== ORGANISMS (大きな単位) ==========
  // ==========================================

  // ========== STATS CARDS ==========
  'stats-cards': {
    name: '統計カード',
    category: 'data',
    html: `
        <div class="stats-card-grid grid-col-12">
            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">総売上</div>
                        <div class="stat-card-value">¥2,450,000</div>
                    </div>
                    <div class="stat-card-icon blue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="12" y1="1" x2="12" y2="23" stroke-width="2" stroke-linecap="round"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-card-footer">
                    <span class="stat-trend up">12.5%</span>
                    <span class="stat-period">先月比</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">新規ユーザー</div>
                        <div class="stat-card-value">1,234</div>
                    </div>
                    <div class="stat-card-icon green">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="9" cy="7" r="4" stroke-width="2"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-card-footer">
                    <span class="stat-trend up">8.2%</span>
                    <span class="stat-period">先月比</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">コンバージョン率</div>
                        <div class="stat-card-value">3.24%</div>
                    </div>
                    <div class="stat-card-icon blue">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-card-footer">
                    <span class="stat-trend down">2.1%</span>
                    <span class="stat-period">先月比</span>
                </div>
            </div>

            <div class="stat-card">
                <div class="stat-card-header">
                    <div>
                        <div class="stat-card-title">アクティブユーザー</div>
                        <div class="stat-card-value">8,492</div>
                    </div>
                    <div class="stat-card-icon orange">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="8.5" cy="7" r="4" stroke-width="2"/>
                            <polyline points="17 11 19 13 23 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="stat-card-footer">
                    <span class="stat-trend up">18.7%</span>
                    <span class="stat-period">先月比</span>
                </div>
            </div>
        </div>
        `,
  },

  // ========== CHARTS ==========
  'chart-line': {
    name: '折れ線グラフ',
    category: 'data',
    html: `
        <div class="db-card grid-col-6">
            <div class="db-card-header">
                <h3 class="db-card-title">売上推移</h3>
                <span class="db-card-action">詳細を見る →</span>
            </div>
            <div class="chart-container">
                <div class="chart-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="17 6 23 6 23 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <p>折れ線グラフ（Chart.js などで実装）</p>
                </div>
            </div>
        </div>
        `,
  },

  'chart-bar': {
    name: '棒グラフ',
    category: 'data',
    html: `
        <div class="db-card grid-col-6">
            <div class="db-card-header">
                <h3 class="db-card-title">月別売上</h3>
                <span class="db-card-action">詳細を見る →</span>
            </div>
            <div class="chart-container">
                <div class="chart-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="12" y1="20" x2="12" y2="10" stroke-width="2" stroke-linecap="round"/>
                        <line x1="18" y1="20" x2="18" y2="4" stroke-width="2" stroke-linecap="round"/>
                        <line x1="6" y1="20" x2="6" y2="16" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <p>棒グラフ（Chart.js などで実装）</p>
                </div>
            </div>
        </div>
        `,
  },

  'chart-pie': {
    name: '円グラフ',
    category: 'data',
    html: `
        <div class="db-card grid-col-6">
            <div class="db-card-header">
                <h3 class="db-card-title">カテゴリ別分布</h3>
            </div>
            <div class="chart-container" style="height: 220px;">
                <div class="chart-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M12 2a10 10 0 0 0 0 20V2z" fill="currentColor" opacity="0.2"/>
                    </svg>
                    <p>円グラフ</p>
                </div>
            </div>
        </div>
        `,
  },

  // ========== TABLES ==========
  'data-table': {
    name: 'データテーブル',
    category: 'table',
    html: `
        <div class="db-card grid-col-12">
            <div class="db-card-header">
                <h3 class="db-card-title">最近の注文</h3>
                <span class="db-card-action">すべて表示 →</span>
            </div>
            <div class="data-table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>注文ID</th>
                            <th>顧客名</th>
                            <th>商品</th>
                            <th>金額</th>
                            <th>ステータス</th>
                            <th>日時</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD-001</td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div class="table-avatar">田</div>
                                    <span>田中太郎</span>
                                </div>
                            </td>
                            <td>プレミアムプラン</td>
                            <td>¥9,800</td>
                            <td><span class="table-status active">完了</span></td>
                            <td>2024/01/15 14:30</td>
                        </tr>
                        <tr>
                            <td>#ORD-002</td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div class="table-avatar">佐</div>
                                    <span>佐藤花子</span>
                                </div>
                            </td>
                            <td>スタンダードプラン</td>
                            <td>¥4,900</td>
                            <td><span class="table-status pending">処理中</span></td>
                            <td>2024/01/15 13:15</td>
                        </tr>
                        <tr>
                            <td>#ORD-003</td>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div class="table-avatar">鈴</div>
                                    <span>鈴木一郎</span>
                                </div>
                            </td>
                            <td>エンタープライズ</td>
                            <td>¥29,800</td>
                            <td><span class="table-status active">完了</span></td>
                            <td>2024/01/15 11:45</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `,
  },

  'user-list': {
    name: 'ユーザーリスト',
    category: 'table',
    html: `
        <div class="db-card grid-col-8">
            <div class="db-card-header">
                <h3 class="db-card-title">アクティブユーザー</h3>
                <span class="db-card-action">すべて表示 →</span>
            </div>
            <div class="data-table-wrapper">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>ユーザー</th>
                            <th>ステータス</th>
                            <th>最終ログイン</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div class="table-avatar">山</div>
                                    <div>
                                        <div style="font-weight: 600;">山田太郎</div>
                                        <div style="font-size: 12px; color: #64748b;">yamada@example.com</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="table-status active">オンライン</span></td>
                            <td>2分前</td>
                        </tr>
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div class="table-avatar">伊</div>
                                    <div>
                                        <div style="font-weight: 600;">伊藤美咲</div>
                                        <div style="font-size: 12px; color: #64748b;">itoh@example.com</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="table-status active">オンライン</span></td>
                            <td>15分前</td>
                        </tr>
                        <tr>
                            <td>
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <div class="table-avatar">高</div>
                                    <div>
                                        <div style="font-weight: 600;">高橋健</div>
                                        <div style="font-size: 12px; color: #64748b;">takahashi@example.com</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="table-status inactive">オフライン</span></td>
                            <td>2時間前</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `,
  },

  // ========== CARDS ==========
  'kpi-card': {
    name: 'KPIカード',
    category: 'card',
    html: `
        <div class="kpi-card grid-col-4">
            <div class="kpi-card-content">
                <div class="kpi-card-label">今月の目標達成率</div>
                <div class="kpi-card-value">87%</div>
                <div class="kpi-card-change">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span>目標まであと13%</span>
                </div>
            </div>
        </div>
        `,
  },

  'progress-card': {
    name: '進捗カード',
    category: 'card',
    html: `
        <div class="progress-card grid-col-4">
            <div class="progress-header">
                <span class="progress-title">プロジェクト進捗</span>
                <span class="progress-percentage">68%</span>
            </div>
            <div class="progress-bar-container">
                <div class="progress-bar" style="width: 68%;"></div>
            </div>
            <div class="progress-details">
                <span>完了: 34/50タスク</span>
                <span>残り12日</span>
            </div>
        </div>
        `,
  },

  'activity-feed': {
    name: 'アクティビティフィード',
    category: 'card',
    html: `
        <div class="db-card grid-col-6">
            <div class="db-card-header">
                <h3 class="db-card-title">最近のアクティビティ</h3>
            </div>
            <div class="activity-feed">
                <div class="activity-item">
                    <div class="activity-icon blue">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                        </svg>
                    </div>
                    <div class="activity-content">
                        <p class="activity-title">新規ユーザー登録</p>
                        <span class="activity-time">5分前</span>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon green">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>
                    <div class="activity-content">
                        <p class="activity-title">支払いが完了しました</p>
                        <span class="activity-time">23分前</span>
                    </div>
                </div>
                <div class="activity-item">
                    <div class="activity-icon orange">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                    </div>
                    <div class="activity-content">
                        <p class="activity-title">システムアラート</p>
                        <span class="activity-time">1時間前</span>
                    </div>
                </div>
            </div>
        </div>
        `,
  },

  // ========== FORMS ==========
  'form-basic': {
    name: '基本フォーム',
    category: 'form',
    html: `
        <div class="db-card grid-col-4">
            <div class="db-card-header">
                <h3 class="db-card-title">ユーザー情報</h3>
            </div>
            <form>
                <div class="form-group">
                    <label class="form-label">名前</label>
                    <input type="text" class="form-input" placeholder="山田太郎">
                </div>
                <div class="form-group">
                    <label class="form-label">メールアドレス</label>
                    <input type="email" class="form-input" placeholder="your@email.com">
                </div>
                <div class="form-group">
                    <label class="form-label">役割</label>
                    <select class="form-select">
                        <option>管理者</option>
                        <option>編集者</option>
                        <option>閲覧者</option>
                    </select>
                </div>
                <button type="submit" class="action-btn primary" style="width: 100%;">
                    保存する
                </button>
            </form>
        </div>
        `,
  },

  'search-bar': {
    name: '検索バー',
    category: 'form',
    html: `
        <div class="db-card grid-col-6">
            <div class="search-bar">
                <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="11" cy="11" r="8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="m21 21-4.35-4.35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <input type="text" class="search-input" placeholder="検索...">
            </div>
        </div>
        `,
  },

  // ========== OTHERS ==========
  'alert-banner': {
    name: 'アラートバナー',
    category: 'other',
    html: `
        <div class="grid-col-12">
            <div class="alert-banner info">
                <span class="alert-icon">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="16" x2="12" y2="12"/>
                        <line x1="12" y1="8" x2="12.01" y2="8"/>
                    </svg>
                </span>
                <span>新しいアップデートが利用可能です。今すぐアップデートして最新機能をお試しください。</span>
            </div>
        </div>
        `,
  },

  'user-profile': {
    name: 'ユーザープロフィール',
    category: 'other',
    html: `
        <div class="user-profile-card grid-col-4">
            <div class="user-avatar-large">田</div>
            <div class="user-name">田中太郎</div>
            <div class="user-role">シニアマネージャー</div>
            <div class="user-stats">
                <div class="user-stat-item">
                    <div class="user-stat-value">42</div>
                    <div class="user-stat-label">プロジェクト</div>
                </div>
                <div class="user-stat-item">
                    <div class="user-stat-value">128</div>
                    <div class="user-stat-label">タスク</div>
                </div>
                <div class="user-stat-item">
                    <div class="user-stat-value">95%</div>
                    <div class="user-stat-label">完了率</div>
                </div>
            </div>
        </div>
        `,
  },
};

// Export for use in dashboard generator
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dashboardTemplates;
}
