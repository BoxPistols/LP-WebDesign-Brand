// Dashboard Component Templates
// Modern SaaS Dashboard Components
// Atomic Design: Atoms → Molecules → Organisms
// アクセシビリティ・セマンティクス・CSSクラスベースのスタイリング対応

const dashboardTemplates = {
  // ==========================================
  // ========== ATOMS (最小単位) ==========
  // ==========================================

  // ----- Buttons -----
  'btn-primary': {
    name: 'ボタン (Primary)',
    category: 'atom',
    html: `<button class="db-btn db-btn-primary">Primary Button</button>`,
  },

  'btn-secondary': {
    name: 'ボタン (Secondary)',
    category: 'atom',
    html: `<button class="db-btn db-btn-secondary">Secondary Button</button>`,
  },

  'btn-ghost': {
    name: 'ボタン (Ghost)',
    category: 'atom',
    html: `<button class="db-btn db-btn-ghost">Ghost Button</button>`,
  },

  'btn-icon': {
    name: 'アイコンボタン',
    category: 'atom',
    html: `
        <button class="db-icon-btn" aria-label="追加">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
        </button>`,
  },

  // ----- Badges -----
  'badge-default': {
    name: 'バッジ (Default)',
    category: 'atom',
    html: `<span class="db-badge" role="status">Default</span>`,
  },

  'badge-success': {
    name: 'バッジ (Success)',
    category: 'atom',
    html: `<span class="db-badge db-badge-success" role="status">Success</span>`,
  },

  'badge-warning': {
    name: 'バッジ (Warning)',
    category: 'atom',
    html: `<span class="db-badge db-badge-warning" role="status">Warning</span>`,
  },

  'badge-danger': {
    name: 'バッジ (Danger)',
    category: 'atom',
    html: `<span class="db-badge db-badge-danger" role="status">Danger</span>`,
  },

  // ----- Avatar -----
  'avatar-sm': {
    name: 'アバター (小)',
    category: 'atom',
    html: `<div class="db-avatar db-avatar-sm" role="img" aria-label="田中のアバター">田</div>`,
  },

  'avatar-md': {
    name: 'アバター (中)',
    category: 'atom',
    html: `<div class="db-avatar db-avatar-md" role="img" aria-label="田中のアバター">田</div>`,
  },

  'avatar-lg': {
    name: 'アバター (大)',
    category: 'atom',
    html: `<div class="db-avatar db-avatar-lg" role="img" aria-label="田中のアバター">田</div>`,
  },

  // ----- Form Elements -----
  'input-text': {
    name: 'テキスト入力',
    category: 'atom',
    html: `
        <div class="db-form-field">
            <label for="input-text-default" class="db-form-label">テキスト</label>
            <input id="input-text-default" type="text" class="db-form-input" placeholder="テキストを入力...">
        </div>`,
  },

  'input-select': {
    name: 'セレクト',
    category: 'atom',
    html: `
        <div class="db-form-field">
            <label for="input-select-default" class="db-form-label">選択</label>
            <select id="input-select-default" class="db-form-select">
                <option>オプション 1</option>
                <option>オプション 2</option>
                <option>オプション 3</option>
            </select>
        </div>`,
  },

  'input-checkbox': {
    name: 'チェックボックス',
    category: 'atom',
    html: `
        <label class="db-checkbox-label">
            <input type="checkbox" class="db-form-checkbox">
            <span>チェックボックス</span>
        </label>`,
  },

  'input-toggle': {
    name: 'トグルスイッチ',
    category: 'atom',
    html: `
        <label class="db-toggle-switch">
            <input type="checkbox" aria-label="有効/無効の切り替え">
            <span class="db-toggle-slider" aria-hidden="true"></span>
        </label>`,
  },

  // ----- Progress -----
  'progress-bar': {
    name: 'プログレスバー',
    category: 'atom',
    html: `
        <div class="db-progress-container" role="progressbar" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100" aria-label="進捗状況">
            <div class="db-progress-bar db-progress-65"></div>
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
        <div class="db-icon db-icon-blue" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
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
        <div class="db-icon db-icon-green" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
            </svg>
        </div>`,
  },

  'icon-settings': {
    name: 'アイコン (Settings)',
    category: 'atom',
    html: `
        <div class="db-icon db-icon-purple" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
        </div>`,
  },

  // ----- Button Sizes -----
  'btn-sm': {
    name: 'ボタン (小)',
    category: 'atom',
    html: `<button class="db-btn db-btn-primary db-btn-sm">Small</button>`,
  },

  'btn-lg': {
    name: 'ボタン (大)',
    category: 'atom',
    html: `<button class="db-btn db-btn-primary db-btn-lg">Large Button</button>`,
  },

  'btn-danger': {
    name: 'ボタン (Danger)',
    category: 'atom',
    html: `<button class="db-btn db-btn-danger">Delete</button>`,
  },

  'btn-success': {
    name: 'ボタン (Success)',
    category: 'atom',
    html: `<button class="db-btn db-btn-success">Complete</button>`,
  },

  // ----- More Form Elements -----
  'input-textarea': {
    name: 'テキストエリア',
    category: 'atom',
    html: `
        <div class="db-form-field">
            <label for="textarea-default" class="db-form-label">メッセージ</label>
            <textarea id="textarea-default" class="db-form-textarea" placeholder="メッセージを入力..." rows="3"></textarea>
        </div>`,
  },

  'input-radio': {
    name: 'ラジオボタン',
    category: 'atom',
    html: `
        <label class="db-radio-label">
            <input type="radio" name="option" class="db-form-radio" checked>
            <span>オプション A</span>
        </label>`,
  },

  'input-number': {
    name: '数値入力',
    category: 'atom',
    html: `
        <div class="db-form-field">
            <label for="input-number-default" class="db-form-label">数値</label>
            <input id="input-number-default" type="number" class="db-form-input db-form-input-number" value="100" min="0" max="1000">
        </div>`,
  },

  'input-date': {
    name: '日付入力',
    category: 'atom',
    html: `
        <div class="db-form-field">
            <label for="input-date-default" class="db-form-label">日付</label>
            <input id="input-date-default" type="date" class="db-form-input">
        </div>`,
  },

  'input-range': {
    name: 'スライダー',
    category: 'atom',
    html: `
        <div class="db-form-field">
            <label for="input-range-default" class="db-form-label">スライダー</label>
            <input id="input-range-default" type="range" class="db-form-range" min="0" max="100" value="50" aria-label="値の調整">
        </div>`,
  },

  // ----- Loading States -----
  spinner: {
    name: 'スピナー',
    category: 'atom',
    html: `
        <div class="db-spinner" role="status" aria-label="読み込み中">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            <span class="db-sr-only">読み込み中</span>
        </div>`,
  },

  'skeleton-text': {
    name: 'スケルトン (テキスト)',
    category: 'atom',
    html: `
        <div class="db-skeleton-container" aria-hidden="true">
            <div class="db-skeleton db-skeleton-text"></div>
            <div class="db-skeleton db-skeleton-text db-skeleton-short"></div>
        </div>`,
  },

  'skeleton-avatar': {
    name: 'スケルトン (アバター)',
    category: 'atom',
    html: `<div class="db-skeleton db-skeleton-avatar" aria-hidden="true"></div>`,
  },

  'skeleton-card': {
    name: 'スケルトン (カード)',
    category: 'atom',
    html: `
        <div class="db-skeleton-card" aria-hidden="true">
            <div class="db-skeleton db-skeleton-image"></div>
            <div class="db-skeleton db-skeleton-text"></div>
            <div class="db-skeleton db-skeleton-text db-skeleton-short"></div>
        </div>`,
  },

  // ----- Status Indicators -----
  'status-dot-online': {
    name: 'ステータス (Online)',
    category: 'atom',
    html: `<span class="db-status-dot db-status-online" role="status" aria-label="オンライン"></span>`,
  },

  'status-dot-offline': {
    name: 'ステータス (Offline)',
    category: 'atom',
    html: `<span class="db-status-dot db-status-offline" role="status" aria-label="オフライン"></span>`,
  },

  'status-dot-busy': {
    name: 'ステータス (Busy)',
    category: 'atom',
    html: `<span class="db-status-dot db-status-busy" role="status" aria-label="取り込み中"></span>`,
  },

  // ----- Links -----
  'link-text': {
    name: 'テキストリンク',
    category: 'atom',
    html: `<a href="#" class="db-text-link">リンクテキスト</a>`,
  },

  'link-external': {
    name: '外部リンク',
    category: 'atom',
    html: `
        <a href="#" class="db-text-link db-text-link-external" target="_blank" rel="noopener noreferrer">
            外部リンク
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            <span class="db-sr-only">（新しいタブで開きます）</span>
        </a>`,
  },

  // ----- Tags -----
  tag: {
    name: 'タグ',
    category: 'atom',
    html: `
        <span class="db-tag">
            タグ
            <button class="db-tag-remove" aria-label="タグを削除">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </span>`,
  },

  'tag-group': {
    name: 'タググループ',
    category: 'atom',
    html: `
        <div class="db-tag-group" role="list" aria-label="タグ一覧">
            <span class="db-tag db-tag-blue" role="listitem">React</span>
            <span class="db-tag db-tag-green" role="listitem">Vue</span>
            <span class="db-tag db-tag-purple" role="listitem">Angular</span>
        </div>`,
  },

  // ----- Image Placeholder -----
  'image-placeholder': {
    name: '画像プレースホルダー',
    category: 'atom',
    html: `
        <div class="db-image-placeholder" role="img" aria-label="画像のプレースホルダー">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
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
    html: `<div class="db-separator-vertical" role="separator" aria-orientation="vertical"></div>`,
  },

  'separator-with-text': {
    name: '区切り線 (テキスト付き)',
    category: 'atom',
    html: `
        <div class="db-separator-text" role="separator">
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
        <div class="db-card" role="region" aria-label="カードコンテンツ">
            <div class="db-card-body">
                <!-- コンテンツをここに配置 -->
            </div>
        </div>`,
  },

  'layout-card-header': {
    name: 'カード (ヘッダー付き)',
    category: 'molecule',
    html: `
        <div class="db-card" role="region" aria-labelledby="card-header-title">
            <div class="db-card-header">
                <h3 id="card-header-title" class="db-card-title">カードタイトル</h3>
                <a href="#" class="db-card-action">アクション
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/></svg>
                </a>
            </div>
            <div class="db-card-body">
                <!-- コンテンツをここに配置 -->
            </div>
        </div>`,
  },

  'layout-flex-row': {
    name: 'Flexレイアウト (横並び)',
    category: 'molecule',
    html: `
        <div class="db-flex-row">
            <div class="db-flex-item">アイテム 1</div>
            <div class="db-flex-item">アイテム 2</div>
            <div class="db-flex-item">アイテム 3</div>
        </div>`,
  },

  'layout-flex-col': {
    name: 'Flexレイアウト (縦並び)',
    category: 'molecule',
    html: `
        <div class="db-flex-col">
            <div class="db-flex-item">アイテム 1</div>
            <div class="db-flex-item">アイテム 2</div>
            <div class="db-flex-item">アイテム 3</div>
        </div>`,
  },

  'layout-flex-between': {
    name: 'Flex (両端揃え)',
    category: 'molecule',
    html: `
        <div class="db-flex-between">
            <div>左側コンテンツ</div>
            <div>右側コンテンツ</div>
        </div>`,
  },

  'layout-flex-center': {
    name: 'Flex (中央揃え)',
    category: 'molecule',
    html: `
        <div class="db-flex-center">
            <div>中央コンテンツ</div>
        </div>`,
  },

  'layout-grid-2col': {
    name: 'Grid 2カラム',
    category: 'molecule',
    html: `
        <div class="db-layout-grid db-cols-2">
            <div class="db-grid-item">カラム 1</div>
            <div class="db-grid-item">カラム 2</div>
        </div>`,
  },

  'layout-grid-3col': {
    name: 'Grid 3カラム',
    category: 'molecule',
    html: `
        <div class="db-layout-grid db-cols-3">
            <div class="db-grid-item">カラム 1</div>
            <div class="db-grid-item">カラム 2</div>
            <div class="db-grid-item">カラム 3</div>
        </div>`,
  },

  'layout-grid-4col': {
    name: 'Grid 4カラム',
    category: 'molecule',
    html: `
        <div class="db-layout-grid db-cols-4">
            <div class="db-grid-item">1</div>
            <div class="db-grid-item">2</div>
            <div class="db-grid-item">3</div>
            <div class="db-grid-item">4</div>
        </div>`,
  },

  'layout-split': {
    name: 'Split レイアウト',
    category: 'molecule',
    html: `
        <div class="db-layout-split">
            <div class="db-split-left">
                左側エリア (1/3)
            </div>
            <div class="db-split-right">
                右側エリア (2/3)
            </div>
        </div>`,
  },

  'layout-stack': {
    name: 'Stack (縦積み)',
    category: 'molecule',
    html: `
        <div class="db-stack">
            <div class="db-stack-item">スタックアイテム 1</div>
            <div class="db-stack-item">スタックアイテム 2</div>
            <div class="db-stack-item">スタックアイテム 3</div>
        </div>`,
  },

  'layout-inline': {
    name: 'Inline (横並び)',
    category: 'molecule',
    html: `
        <div class="db-inline">
            <span class="db-inline-item">アイテム 1</span>
            <span class="db-inline-item">アイテム 2</span>
            <span class="db-inline-item">アイテム 3</span>
        </div>`,
  },

  'layout-section': {
    name: 'セクション',
    category: 'molecule',
    html: `
        <section class="db-layout-section" aria-labelledby="section-default-heading">
            <h2 id="section-default-heading" class="db-section-heading">セクションタイトル</h2>
            <div class="db-section-content">
                <!-- セクションコンテンツ -->
            </div>
        </section>`,
  },

  'layout-panel': {
    name: 'パネル',
    category: 'molecule',
    html: `
        <div class="db-panel" role="region" aria-labelledby="panel-default-title">
            <div class="db-panel-header">
                <h4 id="panel-default-title" class="db-panel-title">パネルタイトル</h4>
            </div>
            <div class="db-panel-body">
                パネルのコンテンツ
            </div>
            <div class="db-panel-footer">
                <button class="db-btn db-btn-secondary">キャンセル</button>
                <button class="db-btn db-btn-primary">保存</button>
            </div>
        </div>`,
  },

  'layout-box': {
    name: 'ボックス',
    category: 'molecule',
    html: `
        <div class="db-box">
            ボックスコンテンツ
        </div>`,
  },

  'layout-box-bordered': {
    name: 'ボックス (枠線付き)',
    category: 'molecule',
    html: `
        <div class="db-box db-box-bordered">
            枠線付きボックス
        </div>`,
  },

  'layout-box-shadowed': {
    name: 'ボックス (影付き)',
    category: 'molecule',
    html: `
        <div class="db-box db-box-shadowed">
            影付きボックス
        </div>`,
  },

  // ----- Stat Card Single -----
  'stat-card-single': {
    name: '単一統計カード',
    category: 'molecule',
    html: `
        <div class="db-stat-card" role="region" aria-label="総売上の統計">
            <div class="db-stat-card-header">
                <div>
                    <div class="db-stat-card-title">総売上</div>
                    <div class="db-stat-card-value">¥2,450,000</div>
                </div>
                <div class="db-stat-card-icon db-bg-blue" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                        <line x1="12" y1="1" x2="12" y2="23" stroke-width="2" stroke-linecap="round"/>
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </div>
            <div class="db-stat-card-footer">
                <span class="db-stat-trend db-trend-up" aria-label="上昇 12.5%">12.5%</span>
                <span class="db-stat-period">先月比</span>
            </div>
        </div>`,
  },

  // ----- Avatar with Info -----
  'avatar-with-info': {
    name: 'アバター + 情報',
    category: 'molecule',
    html: `
        <div class="db-avatar-info">
            <div class="db-avatar db-avatar-md" role="img" aria-label="田中太郎のアバター">田</div>
            <div class="db-avatar-info-text">
                <div class="db-avatar-name">田中太郎</div>
                <div class="db-avatar-email">tanaka@example.com</div>
            </div>
        </div>`,
  },

  // ----- Input with Label -----
  'input-with-label': {
    name: 'ラベル付き入力',
    category: 'molecule',
    html: `
        <div class="db-form-group">
            <label for="email-labeled" class="db-form-label">メールアドレス</label>
            <input id="email-labeled" type="email" class="db-form-input" placeholder="your@email.com" autocomplete="email">
            <span class="db-form-helper" id="email-helper">有効なメールアドレスを入力してください</span>
        </div>`,
  },

  // ----- Button Group -----
  'button-group': {
    name: 'ボタングループ',
    category: 'molecule',
    html: `
        <div class="db-button-group" role="group" aria-label="期間の切り替え">
            <button class="db-btn db-btn-secondary db-btn-active" aria-pressed="true">日</button>
            <button class="db-btn db-btn-secondary" aria-pressed="false">週</button>
            <button class="db-btn db-btn-secondary" aria-pressed="false">月</button>
            <button class="db-btn db-btn-secondary" aria-pressed="false">年</button>
        </div>`,
  },

  // ----- Breadcrumb -----
  breadcrumb: {
    name: 'パンくずリスト',
    category: 'molecule',
    html: `
        <nav class="db-breadcrumb" aria-label="パンくずリスト">
            <ol>
                <li class="db-breadcrumb-item"><a href="#">ホーム</a></li>
                <li class="db-breadcrumb-item"><a href="#">ダッシュボード</a></li>
                <li class="db-breadcrumb-item db-breadcrumb-current" aria-current="page">分析</li>
            </ol>
        </nav>`,
  },

  // ----- Pagination -----
  pagination: {
    name: 'ページネーション',
    category: 'molecule',
    html: `
        <nav class="db-pagination" aria-label="ページネーション">
            <button class="db-pagination-btn" disabled aria-label="前のページ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>
            <button class="db-pagination-btn db-pagination-active" aria-current="page" aria-label="1ページ目">1</button>
            <button class="db-pagination-btn" aria-label="2ページ目">2</button>
            <button class="db-pagination-btn" aria-label="3ページ目">3</button>
            <span class="db-pagination-dots" aria-hidden="true">...</span>
            <button class="db-pagination-btn" aria-label="10ページ目">10</button>
            <button class="db-pagination-btn" aria-label="次のページ">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </nav>`,
  },

  // ----- Tabs -----
  tabs: {
    name: 'タブ',
    category: 'molecule',
    html: `
        <div class="db-tabs" role="tablist" aria-label="コンテンツ切り替え">
            <button class="db-tab-btn db-tab-active" role="tab" aria-selected="true" aria-controls="tab-panel-overview">概要</button>
            <button class="db-tab-btn" role="tab" aria-selected="false" aria-controls="tab-panel-analytics">分析</button>
            <button class="db-tab-btn" role="tab" aria-selected="false" aria-controls="tab-panel-reports">レポート</button>
            <button class="db-tab-btn" role="tab" aria-selected="false" aria-controls="tab-panel-settings">設定</button>
        </div>`,
  },

  // ----- Search Input -----
  'search-input': {
    name: '検索入力',
    category: 'molecule',
    html: `
        <div class="db-search-bar db-search-compact" role="search">
            <svg class="db-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <label for="search-compact" class="db-sr-only">検索</label>
            <input id="search-compact" type="search" class="db-search-input" placeholder="検索...">
        </div>`,
  },

  // ----- Notification Badge -----
  'notification-badge': {
    name: '通知バッジ',
    category: 'molecule',
    html: `
        <button class="db-notification-icon" aria-label="通知 3件の未読があります">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            <span class="db-notification-count" aria-hidden="true">3</span>
        </button>`,
  },

  // ----- List Item -----
  'list-item': {
    name: 'リストアイテム',
    category: 'molecule',
    html: `
        <div class="db-list-item">
            <div class="db-list-item-icon db-bg-blue" aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                </svg>
            </div>
            <div class="db-list-item-content">
                <div class="db-list-item-title">ドキュメント名</div>
                <div class="db-list-item-subtitle">更新: 2024/01/15</div>
            </div>
            <button class="db-icon-btn" aria-label="その他のアクション">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
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
        <div class="db-metric-mini" role="region" aria-label="アクティブユーザー数の指標">
            <span class="db-metric-label">アクティブユーザー</span>
            <span class="db-metric-value">1,234</span>
            <span class="db-metric-change db-trend-up" aria-label="上昇 12%">+12%</span>
        </div>`,
  },

  // ----- Card Header -----
  'card-header': {
    name: 'カードヘッダー',
    category: 'molecule',
    html: `
        <div class="db-card-header">
            <h3 class="db-card-title">カードタイトル</h3>
            <a href="#" class="db-card-action">詳細を見る
                <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/></svg>
            </a>
        </div>`,
  },

  // ----- Empty State -----
  'empty-state': {
    name: '空の状態',
    category: 'molecule',
    html: `
        <div class="db-empty-state" role="status">
            <div class="db-empty-state-icon" aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
                    <polyline points="13 2 13 9 20 9"/>
                </svg>
            </div>
            <p class="db-empty-state-title">データがありません</p>
            <p class="db-empty-state-text">まだデータが登録されていません</p>
            <button class="db-btn db-btn-primary">データを追加</button>
        </div>`,
  },

  // ----- Tooltip -----
  tooltip: {
    name: 'ツールチップ',
    category: 'molecule',
    html: `
        <div class="db-tooltip-container">
            <button class="db-icon-btn" aria-describedby="tooltip-help-text" aria-label="ヘルプ">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            </button>
            <div id="tooltip-help-text" class="db-tooltip" role="tooltip">ヘルプテキストがここに表示されます</div>
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
        <div class="db-stats-card-grid db-grid-col-12" role="region" aria-label="主要な統計情報">
            <div class="db-stat-card" role="region" aria-label="総売上の統計">
                <div class="db-stat-card-header">
                    <div>
                        <div class="db-stat-card-title">総売上</div>
                        <div class="db-stat-card-value">¥2,450,000</div>
                    </div>
                    <div class="db-stat-card-icon db-bg-blue" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                            <line x1="12" y1="1" x2="12" y2="23" stroke-width="2" stroke-linecap="round"/>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="db-stat-card-footer">
                    <span class="db-stat-trend db-trend-up" aria-label="上昇 12.5%">12.5%</span>
                    <span class="db-stat-period">先月比</span>
                </div>
            </div>

            <div class="db-stat-card" role="region" aria-label="新規ユーザーの統計">
                <div class="db-stat-card-header">
                    <div>
                        <div class="db-stat-card-title">新規ユーザー</div>
                        <div class="db-stat-card-value">1,234</div>
                    </div>
                    <div class="db-stat-card-icon db-bg-green" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="9" cy="7" r="4" stroke-width="2"/>
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="db-stat-card-footer">
                    <span class="db-stat-trend db-trend-up" aria-label="上昇 8.2%">8.2%</span>
                    <span class="db-stat-period">先月比</span>
                </div>
            </div>

            <div class="db-stat-card" role="region" aria-label="コンバージョン率の統計">
                <div class="db-stat-card-header">
                    <div>
                        <div class="db-stat-card-title">コンバージョン率</div>
                        <div class="db-stat-card-value">3.24%</div>
                    </div>
                    <div class="db-stat-card-icon db-bg-blue" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="db-stat-card-footer">
                    <span class="db-stat-trend db-trend-down" aria-label="下降 2.1%">2.1%</span>
                    <span class="db-stat-period">先月比</span>
                </div>
            </div>

            <div class="db-stat-card" role="region" aria-label="アクティブユーザーの統計">
                <div class="db-stat-card-header">
                    <div>
                        <div class="db-stat-card-title">アクティブユーザー</div>
                        <div class="db-stat-card-value">8,492</div>
                    </div>
                    <div class="db-stat-card-icon db-bg-orange" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <circle cx="8.5" cy="7" r="4" stroke-width="2"/>
                            <polyline points="17 11 19 13 23 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
                <div class="db-stat-card-footer">
                    <span class="db-stat-trend db-trend-up" aria-label="上昇 18.7%">18.7%</span>
                    <span class="db-stat-period">先月比</span>
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
        <div class="db-card db-grid-col-6" role="region" aria-label="売上推移グラフ">
            <div class="db-card-header">
                <h3 class="db-card-title">売上推移</h3>
                <a href="#" class="db-card-action">詳細を見る
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/></svg>
                </a>
            </div>
            <div class="db-chart-container">
                <div class="db-chart-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
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
        <div class="db-card db-grid-col-6" role="region" aria-label="月別売上グラフ">
            <div class="db-card-header">
                <h3 class="db-card-title">月別売上</h3>
                <a href="#" class="db-card-action">詳細を見る
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/></svg>
                </a>
            </div>
            <div class="db-chart-container">
                <div class="db-chart-placeholder">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
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
        <div class="db-card db-grid-col-6" role="region" aria-label="カテゴリ別分布グラフ">
            <div class="db-card-header">
                <h3 class="db-card-title">カテゴリ別分布</h3>
            </div>
            <div class="db-chart-container db-chart-h-220">
                <div class="db-chart-placeholder">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
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
        <div class="db-card db-grid-col-12" role="region" aria-label="最近の注文一覧">
            <div class="db-card-header">
                <h3 class="db-card-title">最近の注文</h3>
                <a href="#" class="db-card-action">すべて表示
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/></svg>
                </a>
            </div>
            <div class="db-table-wrapper">
                <table class="db-table">
                    <caption class="db-sr-only">注文履歴一覧</caption>
                    <thead>
                        <tr>
                            <th scope="col">注文ID</th>
                            <th scope="col">顧客名</th>
                            <th scope="col">商品</th>
                            <th scope="col">金額</th>
                            <th scope="col">ステータス</th>
                            <th scope="col">日時</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#ORD-001</td>
                            <td>
                                <div class="db-table-cell-flex">
                                    <div class="db-table-avatar" role="img" aria-label="田中太郎">田</div>
                                    <span>田中太郎</span>
                                </div>
                            </td>
                            <td>プレミアムプラン</td>
                            <td>¥9,800</td>
                            <td><span class="db-table-status db-status-active" role="status">完了</span></td>
                            <td><time datetime="2024-01-15T14:30">2024/01/15 14:30</time></td>
                        </tr>
                        <tr>
                            <td>#ORD-002</td>
                            <td>
                                <div class="db-table-cell-flex">
                                    <div class="db-table-avatar" role="img" aria-label="佐藤花子">佐</div>
                                    <span>佐藤花子</span>
                                </div>
                            </td>
                            <td>スタンダードプラン</td>
                            <td>¥4,900</td>
                            <td><span class="db-table-status db-status-pending" role="status">処理中</span></td>
                            <td><time datetime="2024-01-15T13:15">2024/01/15 13:15</time></td>
                        </tr>
                        <tr>
                            <td>#ORD-003</td>
                            <td>
                                <div class="db-table-cell-flex">
                                    <div class="db-table-avatar" role="img" aria-label="鈴木一郎">鈴</div>
                                    <span>鈴木一郎</span>
                                </div>
                            </td>
                            <td>エンタープライズ</td>
                            <td>¥29,800</td>
                            <td><span class="db-table-status db-status-active" role="status">完了</span></td>
                            <td><time datetime="2024-01-15T11:45">2024/01/15 11:45</time></td>
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
        <div class="db-card db-grid-col-8" role="region" aria-label="アクティブユーザー一覧">
            <div class="db-card-header">
                <h3 class="db-card-title">アクティブユーザー</h3>
                <a href="#" class="db-card-action">すべて表示
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/></svg>
                </a>
            </div>
            <div class="db-table-wrapper">
                <table class="db-table">
                    <caption class="db-sr-only">アクティブユーザー一覧</caption>
                    <thead>
                        <tr>
                            <th scope="col">ユーザー</th>
                            <th scope="col">ステータス</th>
                            <th scope="col">最終ログイン</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div class="db-table-cell-flex">
                                    <div class="db-table-avatar" role="img" aria-label="山田太郎">山</div>
                                    <div>
                                        <div class="db-text-bold">山田太郎</div>
                                        <div class="db-text-muted db-text-sm">yamada@example.com</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="db-table-status db-status-active" role="status">オンライン</span></td>
                            <td><time>2分前</time></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="db-table-cell-flex">
                                    <div class="db-table-avatar" role="img" aria-label="伊藤美咲">伊</div>
                                    <div>
                                        <div class="db-text-bold">伊藤美咲</div>
                                        <div class="db-text-muted db-text-sm">itoh@example.com</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="db-table-status db-status-active" role="status">オンライン</span></td>
                            <td><time>15分前</time></td>
                        </tr>
                        <tr>
                            <td>
                                <div class="db-table-cell-flex">
                                    <div class="db-table-avatar" role="img" aria-label="高橋健">高</div>
                                    <div>
                                        <div class="db-text-bold">高橋健</div>
                                        <div class="db-text-muted db-text-sm">takahashi@example.com</div>
                                    </div>
                                </div>
                            </td>
                            <td><span class="db-table-status db-status-inactive" role="status">オフライン</span></td>
                            <td><time>2時間前</time></td>
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
        <div class="db-kpi-card db-grid-col-4" role="region" aria-label="今月の目標達成率">
            <div class="db-kpi-card-content">
                <div class="db-kpi-card-label">今月の目標達成率</div>
                <div class="db-kpi-card-value">87%</div>
                <div class="db-kpi-card-change">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
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
        <div class="db-progress-card db-grid-col-4" role="region" aria-label="プロジェクト進捗">
            <div class="db-progress-header">
                <span class="db-progress-title">プロジェクト進捗</span>
                <span class="db-progress-percentage">68%</span>
            </div>
            <div class="db-progress-container" role="progressbar" aria-valuenow="68" aria-valuemin="0" aria-valuemax="100" aria-label="プロジェクト進捗 68%">
                <div class="db-progress-bar db-progress-68"></div>
            </div>
            <div class="db-progress-details">
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
        <div class="db-card db-grid-col-6" role="region" aria-label="最近のアクティビティ">
            <div class="db-card-header">
                <h3 class="db-card-title">最近のアクティビティ</h3>
            </div>
            <div class="db-activity-feed" role="feed" aria-label="アクティビティ一覧">
                <article class="db-activity-item">
                    <div class="db-activity-icon db-bg-blue" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                            <circle cx="9" cy="7" r="4"/>
                        </svg>
                    </div>
                    <div class="db-activity-content">
                        <p class="db-activity-title">新規ユーザー登録</p>
                        <time class="db-activity-time">5分前</time>
                    </div>
                </article>
                <article class="db-activity-item">
                    <div class="db-activity-icon db-bg-green" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>
                    <div class="db-activity-content">
                        <p class="db-activity-title">支払いが完了しました</p>
                        <time class="db-activity-time">23分前</time>
                    </div>
                </article>
                <article class="db-activity-item">
                    <div class="db-activity-icon db-bg-orange" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                            <line x1="12" y1="9" x2="12" y2="13"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                    </div>
                    <div class="db-activity-content">
                        <p class="db-activity-title">システムアラート</p>
                        <time class="db-activity-time">1時間前</time>
                    </div>
                </article>
            </div>
        </div>
        `,
  },

  // ========== FORMS ==========
  'form-basic': {
    name: '基本フォーム',
    category: 'form',
    html: `
        <div class="db-card db-grid-col-4" role="region" aria-label="ユーザー情報フォーム">
            <div class="db-card-header">
                <h3 class="db-card-title">ユーザー情報</h3>
            </div>
            <form aria-label="ユーザー情報の入力">
                <div class="db-form-group">
                    <label for="form-basic-name" class="db-form-label">名前</label>
                    <input id="form-basic-name" type="text" class="db-form-input" placeholder="山田太郎" autocomplete="name">
                </div>
                <div class="db-form-group">
                    <label for="form-basic-email" class="db-form-label">メールアドレス</label>
                    <input id="form-basic-email" type="email" class="db-form-input" placeholder="your@email.com" autocomplete="email">
                </div>
                <div class="db-form-group">
                    <label for="form-basic-role" class="db-form-label">役割</label>
                    <select id="form-basic-role" class="db-form-select">
                        <option>管理者</option>
                        <option>編集者</option>
                        <option>閲覧者</option>
                    </select>
                </div>
                <button type="submit" class="db-btn db-btn-primary db-btn-block">
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
        <div class="db-card db-grid-col-6" role="region" aria-label="検索">
            <div class="db-search-bar" role="search">
                <svg class="db-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                    <circle cx="11" cy="11" r="8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="m21 21-4.35-4.35" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <label for="search-bar-input" class="db-sr-only">検索</label>
                <input id="search-bar-input" type="search" class="db-search-input" placeholder="検索...">
            </div>
        </div>
        `,
  },

  // ==========================================
  // ========== MOLECULES (追加) ==========
  // ==========================================

  // ----- カレンダーウィジェット -----
  'calendar-widget': {
    name: 'カレンダーウィジェット',
    category: 'molecule',
    html: `
        <div class="db-calendar-widget" role="region" aria-label="カレンダー">
            <div class="db-calendar-header">
                <button class="db-icon-btn db-calendar-nav" aria-label="前の月">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <span class="db-calendar-title">2026年4月</span>
                <button class="db-icon-btn db-calendar-nav" aria-label="次の月">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
            </div>
            <table class="db-calendar-grid" role="grid" aria-label="2026年4月のカレンダー">
                <thead>
                    <tr>
                        <th scope="col" abbr="日曜日">日</th>
                        <th scope="col" abbr="月曜日">月</th>
                        <th scope="col" abbr="火曜日">火</th>
                        <th scope="col" abbr="水曜日">水</th>
                        <th scope="col" abbr="木曜日">木</th>
                        <th scope="col" abbr="金曜日">金</th>
                        <th scope="col" abbr="土曜日">土</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="db-calendar-other">29</td>
                        <td class="db-calendar-other">30</td>
                        <td class="db-calendar-other">31</td>
                        <td>1</td><td>2</td>
                        <td class="db-calendar-today" aria-current="date">3</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>10</td><td>11</td>
                    </tr>
                    <tr>
                        <td>12</td><td>13</td><td>14</td>
                        <td class="db-calendar-event">15</td>
                        <td>16</td><td>17</td><td>18</td>
                    </tr>
                    <tr>
                        <td>19</td><td>20</td><td>21</td><td>22</td><td>23</td><td>24</td><td>25</td>
                    </tr>
                    <tr>
                        <td>26</td><td>27</td><td>28</td><td>29</td><td>30</td>
                        <td class="db-calendar-other">1</td>
                        <td class="db-calendar-other">2</td>
                    </tr>
                </tbody>
            </table>
        </div>`,
  },

  // ----- ファイルアップロード -----
  'file-upload': {
    name: 'ファイルアップロード',
    category: 'molecule',
    html: `
        <div class="db-file-upload" role="region" aria-label="ファイルアップロード">
            <div class="db-file-dropzone" role="button" tabindex="0" aria-label="ファイルをドラッグ&ドロップまたはクリックして選択">
                <div class="db-file-dropzone-icon" aria-hidden="true">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-linecap="round" stroke-linejoin="round"/>
                        <polyline points="17 8 12 3 7 8" stroke-linecap="round" stroke-linejoin="round"/>
                        <line x1="12" y1="3" x2="12" y2="15" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <p class="db-file-dropzone-text">ファイルをドラッグ&ドロップ</p>
                <p class="db-file-dropzone-hint">または <span class="db-file-browse">ファイルを選択</span></p>
                <p class="db-file-dropzone-formats">PNG, JPG, PDF (最大10MB)</p>
            </div>
            <div class="db-file-list" aria-label="アップロード済みファイル">
                <div class="db-file-item">
                    <div class="db-file-item-icon" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                            <polyline points="14 2 14 8 20 8"/>
                        </svg>
                    </div>
                    <div class="db-file-item-info">
                        <span class="db-file-item-name">report-2026.pdf</span>
                        <span class="db-file-item-size">2.4 MB</span>
                    </div>
                    <button class="db-icon-btn" aria-label="ファイルを削除">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </div>`,
  },

  // ----- タイムライン -----
  'timeline': {
    name: 'タイムライン',
    category: 'molecule',
    html: `
        <div class="db-timeline" role="list" aria-label="タイムライン">
            <div class="db-timeline-item" role="listitem">
                <div class="db-timeline-marker db-bg-blue" aria-hidden="true"></div>
                <div class="db-timeline-content">
                    <div class="db-timeline-title">プロジェクト開始</div>
                    <div class="db-timeline-date">2026年4月1日</div>
                    <p class="db-timeline-desc">新規プロジェクトのキックオフミーティングを実施しました。</p>
                </div>
            </div>
            <div class="db-timeline-item" role="listitem">
                <div class="db-timeline-marker db-bg-green" aria-hidden="true"></div>
                <div class="db-timeline-content">
                    <div class="db-timeline-title">デザイン完了</div>
                    <div class="db-timeline-date">2026年4月3日</div>
                    <p class="db-timeline-desc">UIデザインのレビューが完了し、承認されました。</p>
                </div>
            </div>
            <div class="db-timeline-item" role="listitem">
                <div class="db-timeline-marker db-bg-purple" aria-hidden="true"></div>
                <div class="db-timeline-content">
                    <div class="db-timeline-title">開発フェーズ</div>
                    <div class="db-timeline-date">2026年4月10日（予定）</div>
                    <p class="db-timeline-desc">フロントエンド開発を開始する予定です。</p>
                </div>
            </div>
        </div>`,
  },

  // ----- メトリクス比較 -----
  'metric-comparison': {
    name: 'メトリクス比較',
    category: 'molecule',
    html: `
        <div class="db-metric-comparison" role="region" aria-label="前期比メトリクス">
            <div class="db-metric-comp-item">
                <div class="db-metric-comp-header">
                    <span class="db-metric-comp-label">売上</span>
                    <span class="db-metric-comp-change db-trend-up" aria-label="上昇 15.3%">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                        </svg>
                        +15.3%
                    </span>
                </div>
                <div class="db-metric-comp-values">
                    <div class="db-metric-comp-current">
                        <span class="db-metric-comp-period">今期</span>
                        <span class="db-metric-comp-value">¥3,240,000</span>
                    </div>
                    <div class="db-metric-comp-previous">
                        <span class="db-metric-comp-period">前期</span>
                        <span class="db-metric-comp-value">¥2,810,000</span>
                    </div>
                </div>
                <div class="db-metric-comp-bar" aria-hidden="true">
                    <div class="db-metric-comp-bar-current" style="width: 100%;"></div>
                    <div class="db-metric-comp-bar-previous" style="width: 86.7%;"></div>
                </div>
            </div>
            <div class="db-metric-comp-item">
                <div class="db-metric-comp-header">
                    <span class="db-metric-comp-label">ユーザー数</span>
                    <span class="db-metric-comp-change db-trend-down" aria-label="下降 3.2%">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/>
                        </svg>
                        -3.2%
                    </span>
                </div>
                <div class="db-metric-comp-values">
                    <div class="db-metric-comp-current">
                        <span class="db-metric-comp-period">今期</span>
                        <span class="db-metric-comp-value">8,420</span>
                    </div>
                    <div class="db-metric-comp-previous">
                        <span class="db-metric-comp-period">前期</span>
                        <span class="db-metric-comp-value">8,698</span>
                    </div>
                </div>
                <div class="db-metric-comp-bar" aria-hidden="true">
                    <div class="db-metric-comp-bar-current" style="width: 96.8%;"></div>
                    <div class="db-metric-comp-bar-previous" style="width: 100%;"></div>
                </div>
            </div>
        </div>`,
  },

  // ----- ミニチャート -----
  'mini-chart': {
    name: 'ミニチャート',
    category: 'molecule',
    html: `
        <div class="db-mini-chart" role="img" aria-label="過去7日間の売上推移スパークライン">
            <div class="db-mini-chart-header">
                <span class="db-mini-chart-label">売上推移</span>
                <span class="db-mini-chart-value">¥420,000</span>
            </div>
            <svg class="db-sparkline" viewBox="0 0 200 50" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                    <linearGradient id="sparkGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="var(--db-primary, #3b82f6)" stop-opacity="0.3"/>
                        <stop offset="100%" stop-color="var(--db-primary, #3b82f6)" stop-opacity="0.02"/>
                    </linearGradient>
                </defs>
                <path class="db-sparkline-area" d="M0,35 L28,28 L57,32 L85,15 L114,22 L142,10 L171,18 L200,5 L200,50 L0,50Z" fill="url(#sparkGradient)"/>
                <polyline class="db-sparkline-line" points="0,35 28,28 57,32 85,15 114,22 142,10 171,18 200,5" fill="none" stroke="var(--db-primary, #3b82f6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <div class="db-mini-chart-footer">
                <span class="db-mini-chart-period">過去7日間</span>
                <span class="db-metric-change db-trend-up" aria-label="上昇 8.2%">+8.2%</span>
            </div>
        </div>`,
  },

  // ==========================================
  // ========== ORGANISMS (複合コンポーネント追加) ==========
  // ==========================================

  // ----- ダッシュボード概要 -----
  'dashboard-overview': {
    name: 'ダッシュボード概要',
    category: 'organisms',
    html: `
        <div class="db-dashboard-overview" role="region" aria-label="ダッシュボード概要">
            <div class="db-overview-kpis">
                <div class="db-overview-kpi" role="region" aria-label="総売上">
                    <div class="db-overview-kpi-icon db-bg-blue" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="12" y1="1" x2="12" y2="23" stroke-linecap="round"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="db-overview-kpi-info">
                        <span class="db-overview-kpi-label">総売上</span>
                        <span class="db-overview-kpi-value">¥12,450,000</span>
                        <span class="db-stat-trend db-trend-up" aria-label="上昇 12.5%">+12.5%</span>
                    </div>
                </div>
                <div class="db-overview-kpi" role="region" aria-label="アクティブユーザー">
                    <div class="db-overview-kpi-icon db-bg-green" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4"/>
                        </svg>
                    </div>
                    <div class="db-overview-kpi-info">
                        <span class="db-overview-kpi-label">アクティブユーザー</span>
                        <span class="db-overview-kpi-value">3,842</span>
                        <span class="db-stat-trend db-trend-up" aria-label="上昇 8.1%">+8.1%</span>
                    </div>
                </div>
                <div class="db-overview-kpi" role="region" aria-label="コンバージョン率">
                    <div class="db-overview-kpi-icon db-bg-purple" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="db-overview-kpi-info">
                        <span class="db-overview-kpi-label">コンバージョン率</span>
                        <span class="db-overview-kpi-value">4.28%</span>
                        <span class="db-stat-trend db-trend-down" aria-label="下降 0.3%">-0.3%</span>
                    </div>
                </div>
                <div class="db-overview-kpi" role="region" aria-label="平均セッション時間">
                    <div class="db-overview-kpi-icon db-bg-orange" aria-hidden="true">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <div class="db-overview-kpi-info">
                        <span class="db-overview-kpi-label">平均セッション時間</span>
                        <span class="db-overview-kpi-value">4分32秒</span>
                        <span class="db-stat-trend db-trend-up" aria-label="上昇 2.1%">+2.1%</span>
                    </div>
                </div>
            </div>
            <div class="db-overview-main">
                <div class="db-overview-chart">
                    <div class="db-card-header">
                        <h3 class="db-card-title">月間売上推移</h3>
                        <div class="db-button-group" role="group" aria-label="期間切替">
                            <button class="db-btn db-btn-secondary db-btn-sm" aria-pressed="false">週</button>
                            <button class="db-btn db-btn-secondary db-btn-sm db-btn-active" aria-pressed="true">月</button>
                            <button class="db-btn db-btn-secondary db-btn-sm" aria-pressed="false">年</button>
                        </div>
                    </div>
                    <svg class="db-overview-chart-svg" viewBox="0 0 400 180" aria-label="月間売上チャート" role="img">
                        <line x1="40" y1="160" x2="390" y2="160" stroke="#e2e8f0" stroke-width="1"/>
                        <line x1="40" y1="120" x2="390" y2="120" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                        <line x1="40" y1="80" x2="390" y2="80" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                        <line x1="40" y1="40" x2="390" y2="40" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                        <text x="10" y="164" font-size="10" fill="#94a3b8">0</text>
                        <text x="10" y="124" font-size="10" fill="#94a3b8">25</text>
                        <text x="10" y="84" font-size="10" fill="#94a3b8">50</text>
                        <text x="10" y="44" font-size="10" fill="#94a3b8">75</text>
                        <path d="M60,130 L110,100 L160,110 L210,70 L260,85 L310,50 L360,60" fill="none" stroke="var(--db-primary, #3b82f6)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M60,130 L110,100 L160,110 L210,70 L260,85 L310,50 L360,60 L360,160 L60,160Z" fill="var(--db-primary, #3b82f6)" opacity="0.08"/>
                    </svg>
                </div>
                <div class="db-overview-activity">
                    <h3 class="db-card-title">最近のアクティビティ</h3>
                    <div class="db-overview-activity-list" role="list">
                        <div class="db-overview-activity-item" role="listitem">
                            <div class="db-avatar db-avatar-sm" role="img" aria-label="田中">田</div>
                            <div class="db-overview-activity-info">
                                <span>田中太郎がレポートを更新しました</span>
                                <time class="db-overview-activity-time">3分前</time>
                            </div>
                        </div>
                        <div class="db-overview-activity-item" role="listitem">
                            <div class="db-avatar db-avatar-sm" role="img" aria-label="佐藤">佐</div>
                            <div class="db-overview-activity-info">
                                <span>佐藤花子が新規ユーザーを追加しました</span>
                                <time class="db-overview-activity-time">15分前</time>
                            </div>
                        </div>
                        <div class="db-overview-activity-item" role="listitem">
                            <div class="db-avatar db-avatar-sm" role="img" aria-label="鈴木">鈴</div>
                            <div class="db-overview-activity-info">
                                <span>鈴木一郎がタスクを完了しました</span>
                                <time class="db-overview-activity-time">1時間前</time>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
  },

  // ----- アナリティクスセクション -----
  'analytics-section': {
    name: 'アナリティクスセクション',
    category: 'organisms',
    html: `
        <div class="db-analytics-section" role="region" aria-label="アナリティクス">
            <div class="db-analytics-header">
                <h3 class="db-card-title">アナリティクス</h3>
                <div class="db-analytics-period-selector">
                    <select class="db-form-select db-select-sm" aria-label="期間を選択">
                        <option>過去7日間</option>
                        <option selected>過去30日間</option>
                        <option>過去90日間</option>
                        <option>過去1年間</option>
                    </select>
                </div>
            </div>
            <div class="db-analytics-chart">
                <svg viewBox="0 0 500 200" class="db-analytics-svg" aria-label="トラフィック推移グラフ" role="img">
                    <line x1="50" y1="180" x2="480" y2="180" stroke="#e2e8f0" stroke-width="1"/>
                    <line x1="50" y1="140" x2="480" y2="140" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                    <line x1="50" y1="100" x2="480" y2="100" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                    <line x1="50" y1="60" x2="480" y2="60" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                    <line x1="50" y1="20" x2="480" y2="20" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                    <text x="10" y="184" font-size="10" fill="#94a3b8">0</text>
                    <text x="10" y="144" font-size="10" fill="#94a3b8">1k</text>
                    <text x="10" y="104" font-size="10" fill="#94a3b8">2k</text>
                    <text x="10" y="64" font-size="10" fill="#94a3b8">3k</text>
                    <text x="10" y="24" font-size="10" fill="#94a3b8">4k</text>
                    <path d="M70,140 L120,120 L170,130 L220,80 L270,95 L320,55 L370,70 L420,40 L460,50" fill="none" stroke="var(--db-primary, #3b82f6)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M70,140 L120,120 L170,130 L220,80 L270,95 L320,55 L370,70 L420,40 L460,50 L460,180 L70,180Z" fill="var(--db-primary, #3b82f6)" opacity="0.06"/>
                    <path d="M70,155 L120,150 L170,145 L220,130 L270,135 L320,120 L370,115 L420,110 L460,105" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 3"/>
                </svg>
                <div class="db-analytics-legend">
                    <span class="db-analytics-legend-item"><span class="db-legend-dot db-bg-blue" aria-hidden="true"></span>ページビュー</span>
                    <span class="db-analytics-legend-item"><span class="db-legend-dot db-bg-green" aria-hidden="true"></span>ユニークユーザー</span>
                </div>
            </div>
            <div class="db-analytics-metrics">
                <div class="db-analytics-metric" role="region" aria-label="ページビュー数の指標">
                    <span class="db-analytics-metric-label">ページビュー</span>
                    <span class="db-analytics-metric-value">24,580</span>
                    <span class="db-stat-trend db-trend-up" aria-label="上昇 18.2%">+18.2%</span>
                </div>
                <div class="db-analytics-metric" role="region" aria-label="直帰率の指標">
                    <span class="db-analytics-metric-label">直帰率</span>
                    <span class="db-analytics-metric-value">32.4%</span>
                    <span class="db-stat-trend db-trend-down" aria-label="下降 5.1%">-5.1%</span>
                </div>
                <div class="db-analytics-metric" role="region" aria-label="セッション数の指標">
                    <span class="db-analytics-metric-label">セッション</span>
                    <span class="db-analytics-metric-value">12,340</span>
                    <span class="db-stat-trend db-trend-up" aria-label="上昇 9.7%">+9.7%</span>
                </div>
                <div class="db-analytics-metric" role="region" aria-label="平均滞在時間の指標">
                    <span class="db-analytics-metric-label">平均滞在時間</span>
                    <span class="db-analytics-metric-value">3:42</span>
                    <span class="db-stat-trend db-trend-up" aria-label="上昇 1.3%">+1.3%</span>
                </div>
            </div>
        </div>`,
  },

  // ----- ユーザー管理 -----
  'user-management': {
    name: 'ユーザー管理',
    category: 'organisms',
    html: `
        <div class="db-user-management" role="region" aria-label="ユーザー管理">
            <div class="db-user-mgmt-header">
                <h3 class="db-card-title">ユーザー管理</h3>
                <button class="db-btn db-btn-primary db-btn-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    ユーザー追加
                </button>
            </div>
            <div class="db-user-mgmt-toolbar">
                <div class="db-search-bar db-search-compact" role="search">
                    <svg class="db-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    <label for="user-mgmt-search" class="db-sr-only">ユーザーを検索</label>
                    <input id="user-mgmt-search" type="search" class="db-search-input" placeholder="ユーザーを検索...">
                </div>
                <div class="db-user-mgmt-filters" role="group" aria-label="フィルター">
                    <select class="db-form-select db-select-sm" aria-label="ロールでフィルター">
                        <option>すべてのロール</option>
                        <option>管理者</option>
                        <option>編集者</option>
                        <option>閲覧者</option>
                    </select>
                    <select class="db-form-select db-select-sm" aria-label="ステータスでフィルター">
                        <option>すべてのステータス</option>
                        <option>アクティブ</option>
                        <option>非アクティブ</option>
                    </select>
                </div>
            </div>
            <div class="db-user-mgmt-table-wrapper">
                <table class="db-data-table" aria-label="ユーザー一覧">
                    <thead>
                        <tr>
                            <th scope="col"><input type="checkbox" aria-label="全ユーザーを選択"></th>
                            <th scope="col">ユーザー</th>
                            <th scope="col">ロール</th>
                            <th scope="col">ステータス</th>
                            <th scope="col">最終ログイン</th>
                            <th scope="col">操作</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" aria-label="田中太郎を選択"></td>
                            <td>
                                <div class="db-avatar-info">
                                    <div class="db-avatar db-avatar-sm" role="img" aria-label="田中">田</div>
                                    <div class="db-avatar-info-text">
                                        <span class="db-avatar-name">田中太郎</span>
                                        <span class="db-avatar-email">tanaka@example.com</span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="db-badge db-badge-info">管理者</span></td>
                            <td><span class="db-status-dot db-status-online" aria-label="オンライン"></span> アクティブ</td>
                            <td>2026/04/03 10:30</td>
                            <td>
                                <button class="db-icon-btn" aria-label="編集"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                                <button class="db-icon-btn" aria-label="削除"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" aria-label="佐藤花子を選択"></td>
                            <td>
                                <div class="db-avatar-info">
                                    <div class="db-avatar db-avatar-sm" role="img" aria-label="佐藤">佐</div>
                                    <div class="db-avatar-info-text">
                                        <span class="db-avatar-name">佐藤花子</span>
                                        <span class="db-avatar-email">sato@example.com</span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="db-badge">編集者</span></td>
                            <td><span class="db-status-dot db-status-online" aria-label="オンライン"></span> アクティブ</td>
                            <td>2026/04/03 09:15</td>
                            <td>
                                <button class="db-icon-btn" aria-label="編集"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                                <button class="db-icon-btn" aria-label="削除"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                            </td>
                        </tr>
                        <tr>
                            <td><input type="checkbox" aria-label="鈴木一郎を選択"></td>
                            <td>
                                <div class="db-avatar-info">
                                    <div class="db-avatar db-avatar-sm" role="img" aria-label="鈴木">鈴</div>
                                    <div class="db-avatar-info-text">
                                        <span class="db-avatar-name">鈴木一郎</span>
                                        <span class="db-avatar-email">suzuki@example.com</span>
                                    </div>
                                </div>
                            </td>
                            <td><span class="db-badge">閲覧者</span></td>
                            <td><span class="db-status-dot db-status-offline" aria-label="オフライン"></span> 非アクティブ</td>
                            <td>2026/04/01 16:45</td>
                            <td>
                                <button class="db-icon-btn" aria-label="編集"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
                                <button class="db-icon-btn" aria-label="削除"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="db-user-mgmt-footer">
                <span class="db-user-mgmt-count">3件中 1-3件を表示</span>
                <nav class="db-pagination" aria-label="ページネーション">
                    <button class="db-pagination-btn" disabled aria-label="前のページ">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                    </button>
                    <button class="db-pagination-btn db-pagination-active" aria-current="page">1</button>
                    <button class="db-pagination-btn" aria-label="次のページ">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                    </button>
                </nav>
            </div>
        </div>`,
  },

  // ----- 設定パネル -----
  'settings-panel': {
    name: '設定パネル',
    category: 'organisms',
    html: `
        <div class="db-settings-panel" role="region" aria-label="設定">
            <div class="db-settings-tabs" role="tablist" aria-label="設定タブ">
                <button class="db-tab-btn db-tab-active" role="tab" aria-selected="true" aria-controls="settings-general">一般</button>
                <button class="db-tab-btn" role="tab" aria-selected="false" aria-controls="settings-notifications">通知</button>
                <button class="db-tab-btn" role="tab" aria-selected="false" aria-controls="settings-security">セキュリティ</button>
            </div>
            <div class="db-settings-content" id="settings-general" role="tabpanel">
                <div class="db-settings-group">
                    <h4 class="db-settings-group-title">プロフィール設定</h4>
                    <div class="db-form-group">
                        <label for="settings-name" class="db-form-label">表示名</label>
                        <input id="settings-name" type="text" class="db-form-input" value="田中太郎">
                    </div>
                    <div class="db-form-group">
                        <label for="settings-email" class="db-form-label">メールアドレス</label>
                        <input id="settings-email" type="email" class="db-form-input" value="tanaka@example.com">
                    </div>
                    <div class="db-form-group">
                        <label for="settings-lang" class="db-form-label">言語</label>
                        <select id="settings-lang" class="db-form-select">
                            <option selected>日本語</option>
                            <option>English</option>
                            <option>中文</option>
                        </select>
                    </div>
                </div>
                <div class="db-settings-group">
                    <h4 class="db-settings-group-title">表示設定</h4>
                    <div class="db-settings-toggle-row">
                        <div class="db-settings-toggle-info">
                            <span class="db-settings-toggle-label">ダークモード</span>
                            <span class="db-settings-toggle-desc">ダークテーマに切り替えます</span>
                        </div>
                        <label class="db-toggle-switch">
                            <input type="checkbox" aria-label="ダークモードの切り替え">
                            <span class="db-toggle-slider" aria-hidden="true"></span>
                        </label>
                    </div>
                    <div class="db-settings-toggle-row">
                        <div class="db-settings-toggle-info">
                            <span class="db-settings-toggle-label">コンパクト表示</span>
                            <span class="db-settings-toggle-desc">UIを圧縮して表示します</span>
                        </div>
                        <label class="db-toggle-switch">
                            <input type="checkbox" aria-label="コンパクト表示の切り替え" checked>
                            <span class="db-toggle-slider" aria-hidden="true"></span>
                        </label>
                    </div>
                </div>
                <div class="db-settings-actions">
                    <button class="db-btn db-btn-secondary">キャンセル</button>
                    <button class="db-btn db-btn-primary">保存</button>
                </div>
            </div>
        </div>`,
  },

  // ----- 通知センター -----
  'notification-center': {
    name: '通知センター',
    category: 'organisms',
    html: `
        <div class="db-notification-center" role="region" aria-label="通知センター">
            <div class="db-notif-header">
                <h3 class="db-card-title">通知</h3>
                <div class="db-notif-header-actions">
                    <span class="db-badge db-badge-info" role="status">5件の未読</span>
                    <button class="db-btn db-btn-ghost db-btn-sm">すべて既読にする</button>
                </div>
            </div>
            <div class="db-notif-filters" role="tablist" aria-label="通知フィルター">
                <button class="db-notif-filter db-notif-filter-active" role="tab" aria-selected="true">すべて</button>
                <button class="db-notif-filter" role="tab" aria-selected="false">未読</button>
                <button class="db-notif-filter" role="tab" aria-selected="false">メンション</button>
            </div>
            <div class="db-notif-list" role="list" aria-label="通知一覧">
                <div class="db-notif-item db-notif-unread" role="listitem">
                    <div class="db-notif-icon db-bg-blue" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                    </div>
                    <div class="db-notif-content">
                        <p class="db-notif-text"><strong>田中太郎</strong>があなたをメンションしました</p>
                        <time class="db-notif-time">5分前</time>
                    </div>
                    <button class="db-icon-btn" aria-label="通知を既読にする">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/></svg>
                    </button>
                </div>
                <div class="db-notif-item db-notif-unread" role="listitem">
                    <div class="db-notif-icon db-bg-green" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                    </div>
                    <div class="db-notif-content">
                        <p class="db-notif-text"><strong>タスク完了:</strong> ダッシュボードデザインが完了しました</p>
                        <time class="db-notif-time">30分前</time>
                    </div>
                    <button class="db-icon-btn" aria-label="通知を既読にする">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4"/></svg>
                    </button>
                </div>
                <div class="db-notif-item" role="listitem">
                    <div class="db-notif-icon db-bg-orange" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                    </div>
                    <div class="db-notif-content">
                        <p class="db-notif-text"><strong>システム:</strong> メンテナンスが明日予定されています</p>
                        <time class="db-notif-time">2時間前</time>
                    </div>
                    <button class="db-icon-btn" aria-label="通知の詳細">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                </div>
                <div class="db-notif-item" role="listitem">
                    <div class="db-notif-icon db-bg-purple" aria-hidden="true">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                        </svg>
                    </div>
                    <div class="db-notif-content">
                        <p class="db-notif-text"><strong>佐藤花子</strong>がチームに参加しました</p>
                        <time class="db-notif-time">昨日</time>
                    </div>
                    <button class="db-icon-btn" aria-label="通知の詳細">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                    </button>
                </div>
            </div>
        </div>`,
  },

  // ========== OTHERS ==========
  'alert-banner': {
    name: 'アラートバナー',
    category: 'other',
    html: `
        <div class="db-grid-col-12">
            <div class="db-alert-banner db-alert-info" role="alert">
                <span class="db-alert-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
        <div class="db-user-profile-card db-grid-col-4" role="region" aria-label="田中太郎のプロフィール">
            <div class="db-user-avatar-large" role="img" aria-label="田中太郎のアバター">田</div>
            <div class="db-user-name">田中太郎</div>
            <div class="db-user-role">シニアマネージャー</div>
            <dl class="db-user-stats" aria-label="ユーザー実績">
                <div class="db-user-stat-item">
                    <dt class="db-user-stat-label">プロジェクト</dt>
                    <dd class="db-user-stat-value">42</dd>
                </div>
                <div class="db-user-stat-item">
                    <dt class="db-user-stat-label">タスク</dt>
                    <dd class="db-user-stat-value">128</dd>
                </div>
                <div class="db-user-stat-item">
                    <dt class="db-user-stat-label">完了率</dt>
                    <dd class="db-user-stat-value">95%</dd>
                </div>
            </dl>
        </div>
        `,
  },
};

// Export for use in dashboard generator
if (typeof module !== 'undefined' && module.exports) {
  module.exports = dashboardTemplates;
}
