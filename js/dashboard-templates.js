// Dashboard Component Templates
// Modern SaaS Dashboard Components

const dashboardTemplates = {
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
        <div class="db-card grid-col-4">
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
        <div class="db-card grid-col-4">
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
        <div class="db-card grid-col-4">
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
        <div class="db-card grid-col-4">
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
