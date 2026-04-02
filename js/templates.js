// Section Templates for Landing Page Generator
// リファクタリング済み: インラインスタイル除去、アクセシビリティ改善、セマンティクス強化

const sectionTemplates = {
  'hero-1': {
    name: 'Hero Banner',
    html: `
        <section class="lp-section lp-hero lp-hero-modern" role="banner" aria-labelledby="hero-1-title">
            <div class="lp-hero-bg-pattern" aria-hidden="true">
                <div class="lp-hero-gradient-orb lp-hero-orb-1"></div>
                <div class="lp-hero-gradient-orb lp-hero-orb-2"></div>
                <div class="lp-hero-gradient-orb lp-hero-orb-3"></div>
            </div>
            <div class="lp-hero-content">
                <div class="lp-hero-badge">
                    <span class="lp-badge-dot" aria-hidden="true"></span>
                    <span>新機能リリース</span>
                </div>
                <h1 id="hero-1-title" class="lp-hero-title lp-slide-up">
                    ビジネスの成長を<br>
                    <span class="lp-gradient-text">加速させる</span>
                </h1>
                <p class="lp-hero-subtitle">
                    最先端のテクノロジーと洗練されたデザインで、<br class="lp-hide-mobile">
                    あなたのビジョンを現実に変えます。
                </p>
                <div class="lp-hero-buttons">
                    <button class="lp-btn lp-btn-primary lp-btn-lg" aria-label="無料で始める">
                        <span>無料で始める</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                    <button class="lp-btn lp-btn-ghost lp-btn-lg" aria-label="デモ動画を再生する">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        <span>デモを見る</span>
                    </button>
                </div>
                <div class="lp-hero-stats" role="list" aria-label="主要な実績数値">
                    <div class="lp-hero-stat" role="listitem">
                        <span class="lp-hero-stat-number">50K+</span>
                        <span class="lp-hero-stat-label">アクティブユーザー</span>
                    </div>
                    <div class="lp-hero-stat-divider" aria-hidden="true"></div>
                    <div class="lp-hero-stat" role="listitem">
                        <span class="lp-hero-stat-number">99.9%</span>
                        <span class="lp-hero-stat-label">稼働率</span>
                    </div>
                    <div class="lp-hero-stat-divider" aria-hidden="true"></div>
                    <div class="lp-hero-stat" role="listitem">
                        <span class="lp-hero-stat-number">4.9</span>
                        <span class="lp-hero-stat-label">ユーザー評価</span>
                    </div>
                </div>
            </div>
            <div class="lp-hero-visual" aria-hidden="true">
                <div class="lp-hero-mockup">
                    <div class="lp-mockup-browser">
                        <div class="lp-mockup-header">
                            <div class="lp-mockup-dots">
                                <span></span><span></span><span></span>
                            </div>
                            <div class="lp-mockup-url">dashboard.example.com</div>
                        </div>
                        <div class="lp-mockup-content">
                            <div class="lp-mockup-sidebar"></div>
                            <div class="lp-mockup-main">
                                <div class="lp-mockup-chart"></div>
                                <div class="lp-mockup-cards">
                                    <div class="lp-mockup-card"></div>
                                    <div class="lp-mockup-card"></div>
                                    <div class="lp-mockup-card"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'features-grid': {
    name: 'Features Grid',
    html: `
        <section class="lp-section lp-features lp-features-modern" aria-labelledby="features-grid-title">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <span class="lp-section-eyebrow">機能紹介</span>
                    <h2 id="features-grid-title" class="lp-section-title">ビジネスを変革する<br><span class="lp-gradient-text">パワフルな機能</span></h2>
                    <p class="lp-section-subtitle">最先端のテクノロジーで、あなたのビジネスを次のレベルへ</p>
                </div>

                <div class="lp-features-grid lp-features-grid-3" role="list">
                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up" role="listitem">
                        <div class="lp-feature-icon-wrapper" aria-hidden="true">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">高速パフォーマンス</h3>
                        <p class="lp-feature-description">最先端の技術により、驚くほど高速な処理を実現。ユーザー体験を最優先に設計されています。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up" role="listitem">
                        <div class="lp-feature-icon-wrapper" aria-hidden="true">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">セキュアな環境</h3>
                        <p class="lp-feature-description">エンタープライズグレードのセキュリティで、あなたのデータを完全に保護します。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up" role="listitem">
                        <div class="lp-feature-icon-wrapper" aria-hidden="true">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
                                <line x1="9" y1="9" x2="9.01" y2="9"/>
                                <line x1="15" y1="9" x2="15.01" y2="9"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">直感的なUI</h3>
                        <p class="lp-feature-description">モダンで洗練されたUIで、誰でも迷わず使えるデザインを提供します。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up" role="listitem">
                        <div class="lp-feature-icon-wrapper" aria-hidden="true">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                                <line x1="12" y1="18" x2="12.01" y2="18"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">レスポンシブ対応</h3>
                        <p class="lp-feature-description">あらゆるデバイスで完璧に動作。スマホ、タブレット、デスクトップに最適化。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up" role="listitem">
                        <div class="lp-feature-icon-wrapper" aria-hidden="true">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">簡単セットアップ</h3>
                        <p class="lp-feature-description">数分で始められる簡単セットアップ。技術的な知識は不要です。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up" role="listitem">
                        <div class="lp-feature-icon-wrapper" aria-hidden="true">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">24/7サポート</h3>
                        <p class="lp-feature-description">いつでもどこでも、専門チームがサポート。あなたの成功をお手伝いします。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  pricing: {
    name: 'Pricing Table',
    html: `
        <section class="lp-section lp-pricing lp-pricing-modern" aria-labelledby="pricing-title">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <span class="lp-section-eyebrow">料金プラン</span>
                    <h2 id="pricing-title" class="lp-section-title">シンプルで透明な<span class="lp-gradient-text">価格設定</span></h2>
                    <p class="lp-section-subtitle">14日間の無料トライアル。クレジットカード不要。</p>
                </div>

                <div class="lp-pricing-toggle" role="group" aria-label="料金プラン期間切替">
                    <span class="lp-toggle-label" id="toggle-monthly">月額</span>
                    <label class="lp-toggle-switch">
                        <input type="checkbox" aria-labelledby="toggle-monthly toggle-yearly">
                        <span class="lp-toggle-slider"></span>
                    </label>
                    <span class="lp-toggle-label" id="toggle-yearly">年額<span class="lp-discount-badge">20% OFF</span></span>
                </div>

                <div class="lp-pricing-grid lp-pricing-grid-modern" role="list">
                    <div class="lp-pricing-card lp-pricing-card-modern lp-slide-up" role="listitem">
                        <div class="lp-pricing-header">
                            <h3 class="lp-pricing-title">スターター</h3>
                            <p class="lp-pricing-desc">個人や小規模チーム向け</p>
                        </div>
                        <div class="lp-pricing-price-wrapper">
                            <span class="lp-pricing-currency">¥</span>
                            <span class="lp-pricing-amount">2,980</span>
                            <span class="lp-pricing-period">/月</span>
                        </div>
                        <ul class="lp-pricing-features lp-pricing-features-modern" aria-label="スタータープランの機能一覧">
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                基本機能の利用
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                月間10,000リクエスト
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                メールサポート
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                1ユーザー
                            </li>
                        </ul>
                        <button class="lp-btn lp-btn-outline lp-btn-block">無料で始める</button>
                    </div>

                    <div class="lp-pricing-card lp-pricing-card-modern lp-pricing-featured lp-slide-up" role="listitem">
                        <div class="lp-pricing-popular" aria-label="最も人気のプラン">最も人気</div>
                        <div class="lp-pricing-header">
                            <h3 class="lp-pricing-title">プロフェッショナル</h3>
                            <p class="lp-pricing-desc">成長するビジネス向け</p>
                        </div>
                        <div class="lp-pricing-price-wrapper">
                            <span class="lp-pricing-currency">¥</span>
                            <span class="lp-pricing-amount">9,800</span>
                            <span class="lp-pricing-period">/月</span>
                        </div>
                        <ul class="lp-pricing-features lp-pricing-features-modern" aria-label="プロフェッショナルプランの機能一覧">
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                全機能の利用
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                月間100,000リクエスト
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                優先サポート
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                5ユーザーまで
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                カスタムドメイン
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                高度な分析
                            </li>
                        </ul>
                        <button class="lp-btn lp-btn-primary lp-btn-block">無料で始める</button>
                    </div>

                    <div class="lp-pricing-card lp-pricing-card-modern lp-slide-up" role="listitem">
                        <div class="lp-pricing-header">
                            <h3 class="lp-pricing-title">エンタープライズ</h3>
                            <p class="lp-pricing-desc">大規模組織向け</p>
                        </div>
                        <div class="lp-pricing-price-wrapper">
                            <span class="lp-pricing-custom">カスタム</span>
                        </div>
                        <ul class="lp-pricing-features lp-pricing-features-modern" aria-label="エンタープライズプランの機能一覧">
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                無制限の機能
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                無制限リクエスト
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                専任サポート
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                無制限ユーザー
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                SLA保証
                            </li>
                        </ul>
                        <button class="lp-btn lp-btn-outline lp-btn-block">お問い合わせ</button>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  testimonials: {
    name: 'Testimonials',
    html: `
        <section class="lp-section lp-testimonials lp-testimonials-modern" aria-labelledby="testimonials-title">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <span class="lp-section-eyebrow">お客様の声</span>
                    <h2 id="testimonials-title" class="lp-section-title">信頼される理由が<span class="lp-gradient-text">ここにある</span></h2>
                    <p class="lp-section-subtitle">10,000社以上の企業に選ばれています</p>
                </div>

                <div class="lp-testimonials-grid lp-testimonials-grid-modern" role="list">
                    <article class="lp-testimonial-card lp-testimonial-card-modern lp-slide-up" role="listitem">
                        <div class="lp-testimonial-rating" role="img" aria-label="5つ星中5つ星の評価">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <blockquote class="lp-testimonial-quote">
                            「導入後3ヶ月で売上が40%向上しました。チーム全員の生産性が劇的に改善され、本当に感謝しています。」
                        </blockquote>
                        <div class="lp-testimonial-author">
                            <div class="lp-testimonial-avatar lp-bg-gradient-primary" aria-hidden="true">
                                <span>山</span>
                            </div>
                            <div class="lp-testimonial-info">
                                <h4 class="lp-testimonial-name">山田 太郎</h4>
                                <p class="lp-testimonial-role">株式会社ABC / CEO</p>
                            </div>
                        </div>
                    </article>

                    <article class="lp-testimonial-card lp-testimonial-card-modern lp-slide-up" role="listitem">
                        <div class="lp-testimonial-rating" role="img" aria-label="5つ星中5つ星の評価">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <blockquote class="lp-testimonial-quote">
                            「UIが直感的で、新しいメンバーも即座に使いこなせました。カスタマーサポートも迅速で丁寧です。」
                        </blockquote>
                        <div class="lp-testimonial-author">
                            <div class="lp-testimonial-avatar lp-bg-gradient-pink" aria-hidden="true">
                                <span>佐</span>
                            </div>
                            <div class="lp-testimonial-info">
                                <h4 class="lp-testimonial-name">佐藤 花子</h4>
                                <p class="lp-testimonial-role">XYZ株式会社 / マーケティング部長</p>
                            </div>
                        </div>
                    </article>

                    <article class="lp-testimonial-card lp-testimonial-card-modern lp-slide-up" role="listitem">
                        <div class="lp-testimonial-rating" role="img" aria-label="5つ星中5つ星の評価">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <blockquote class="lp-testimonial-quote">
                            「APIの統合が驚くほど簡単でした。ドキュメントも充実していて、開発チームからの評価も最高です。」
                        </blockquote>
                        <div class="lp-testimonial-author">
                            <div class="lp-testimonial-avatar lp-bg-gradient-green" aria-hidden="true">
                                <span>鈴</span>
                            </div>
                            <div class="lp-testimonial-info">
                                <h4 class="lp-testimonial-name">鈴木 一郎</h4>
                                <p class="lp-testimonial-role">テック株式会社 / CTO</p>
                            </div>
                        </div>
                    </article>
                </div>

                <div class="lp-testimonials-logos">
                    <p class="lp-logos-label">導入企業</p>
                    <div class="lp-logos-grid" role="list" aria-label="導入企業一覧">
                        <div class="lp-logo-item" role="listitem">Company A</div>
                        <div class="lp-logo-item" role="listitem">Company B</div>
                        <div class="lp-logo-item" role="listitem">Company C</div>
                        <div class="lp-logo-item" role="listitem">Company D</div>
                        <div class="lp-logo-item" role="listitem">Company E</div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  cta: {
    name: 'Call to Action',
    html: `
        <section class="lp-section lp-cta lp-cta-modern" aria-labelledby="cta-title">
            <div class="lp-cta-bg" aria-hidden="true">
                <div class="lp-cta-gradient-orb lp-cta-orb-1"></div>
                <div class="lp-cta-gradient-orb lp-cta-orb-2"></div>
                <div class="lp-cta-grid-pattern"></div>
            </div>
            <div class="lp-content-wrapper lp-cta-content">
                <div class="lp-cta-badge lp-fade-in">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span>期間限定オファー</span>
                </div>
                <h2 id="cta-title" class="lp-cta-title lp-slide-up">
                    今すぐ始めて<br>
                    <span class="lp-gradient-text-white">ビジネスを加速</span>
                </h2>
                <p class="lp-cta-description lp-fade-in">
                    無料トライアルで、すべての機能をお試しいただけます。<br>
                    クレジットカード不要、いつでもキャンセル可能。
                </p>
                <div class="lp-cta-buttons lp-slide-up">
                    <button class="lp-btn lp-btn-cta-primary" aria-label="無料で始める">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        無料で始める
                    </button>
                    <button class="lp-btn lp-btn-cta-secondary" aria-label="デモ動画を見る">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        デモを見る
                    </button>
                </div>
                <div class="lp-cta-trust lp-fade-in" role="list" aria-label="安心ポイント">
                    <div class="lp-cta-trust-item" role="listitem">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span>14日間無料</span>
                    </div>
                    <div class="lp-cta-trust-item" role="listitem">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span>セキュア決済</span>
                    </div>
                    <div class="lp-cta-trust-item" role="listitem">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <span>返金保証</span>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  gallery: {
    name: 'Image Gallery',
    html: `
        <section class="lp-section" aria-labelledby="gallery-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="gallery-title" class="lp-section-title">ギャラリー</h2>
                <p class="lp-section-subtitle">私たちの作品をご覧ください</p>

                <div class="lp-gallery-grid" role="list" aria-label="作品ギャラリー">
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery" role="listitem">
                        <img src="https://picsum.photos/400/300?random=1" alt="プロジェクト作品1 - デザインワーク" loading="lazy">
                        <div class="lp-gallery-overlay" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery" role="listitem">
                        <img src="https://picsum.photos/400/300?random=2" alt="プロジェクト作品2 - ブランディング" loading="lazy">
                        <div class="lp-gallery-overlay" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery" role="listitem">
                        <img src="https://picsum.photos/400/300?random=3" alt="プロジェクト作品3 - ウェブデザイン" loading="lazy">
                        <div class="lp-gallery-overlay" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery" role="listitem">
                        <img src="https://picsum.photos/400/300?random=4" alt="プロジェクト作品4 - UIデザイン" loading="lazy">
                        <div class="lp-gallery-overlay" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery" role="listitem">
                        <img src="https://picsum.photos/400/300?random=5" alt="プロジェクト作品5 - グラフィック" loading="lazy">
                        <div class="lp-gallery-overlay" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery" role="listitem">
                        <img src="https://picsum.photos/400/300?random=6" alt="プロジェクト作品6 - アプリデザイン" loading="lazy">
                        <div class="lp-gallery-overlay" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  stats: {
    name: 'Statistics',
    html: `
        <section class="lp-section lp-stats lp-stats-modern" aria-labelledby="stats-title">
            <div class="lp-stats-bg" aria-hidden="true">
                <div class="lp-stats-gradient-line"></div>
            </div>
            <div class="lp-content-wrapper">
                <div class="lp-stats-header lp-text-center">
                    <h2 id="stats-title" class="lp-section-title lp-slide-up">
                        <span class="lp-gradient-text">数字</span>で見る実績
                    </h2>
                    <p class="lp-section-subtitle lp-fade-in">多くの企業様に信頼されています</p>
                </div>
                <div class="lp-stats-grid-modern" role="list" aria-label="実績数値一覧">
                    <div class="lp-stat-card lp-slide-up" role="listitem">
                        <div class="lp-stat-icon" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                                <circle cx="9" cy="7" r="4"/>
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                            </svg>
                        </div>
                        <div class="lp-stat-number-modern">
                            <span class="lp-stat-count" data-target="10000">10,000</span>+
                        </div>
                        <div class="lp-stat-label-modern">満足しているユーザー</div>
                        <div class="lp-stat-growth">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                                <polyline points="17 6 23 6 23 12"/>
                            </svg>
                            <span>前年比 +42%</span>
                        </div>
                    </div>
                    <div class="lp-stat-card lp-stat-card-featured lp-slide-up" role="listitem">
                        <div class="lp-stat-icon" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <div class="lp-stat-number-modern">99.9<span class="lp-stat-unit">%</span></div>
                        <div class="lp-stat-label-modern">稼働率</div>
                        <div class="lp-stat-progress" role="progressbar" aria-valuenow="99.9" aria-valuemin="0" aria-valuemax="100" aria-label="稼働率 99.9%">
                            <div class="lp-stat-progress-bar lp-progress-full"></div>
                        </div>
                    </div>
                    <div class="lp-stat-card lp-slide-up" role="listitem">
                        <div class="lp-stat-icon" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="2" y1="12" x2="22" y2="12"/>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                        </div>
                        <div class="lp-stat-number-modern">50+</div>
                        <div class="lp-stat-label-modern">国で利用</div>
                        <div class="lp-stat-countries" aria-hidden="true">
                            <span class="lp-country-dot"></span>
                            <span class="lp-country-dot"></span>
                            <span class="lp-country-dot"></span>
                            <span>+47</span>
                        </div>
                    </div>
                    <div class="lp-stat-card lp-slide-up" role="listitem">
                        <div class="lp-stat-icon" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                        </div>
                        <div class="lp-stat-number-modern">24/7</div>
                        <div class="lp-stat-label-modern">サポート体制</div>
                        <div class="lp-stat-online">
                            <span class="lp-online-dot" aria-hidden="true"></span>
                            <span>オンライン中</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  team: {
    name: 'Team Members',
    html: `
        <section class="lp-section" aria-labelledby="team-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="team-title" class="lp-section-title">チームメンバー</h2>
                <p class="lp-section-subtitle">私たちの素晴らしいチームをご紹介します</p>

                <div class="lp-team-grid" role="list" aria-label="チームメンバー一覧">
                    <article class="lp-team-card lp-slide-up" role="listitem">
                        <div class="lp-team-avatar" aria-hidden="true">JD</div>
                        <h3 class="lp-team-name">田中 健太</h3>
                        <p class="lp-team-role">CEO & 創業者</p>
                        <p class="lp-team-bio">ビジョンを持ってチームを率いる情熱的なリーダー</p>
                    </article>

                    <article class="lp-team-card lp-slide-up" role="listitem">
                        <div class="lp-team-avatar" aria-hidden="true">YS</div>
                        <h3 class="lp-team-name">鈴木 由美</h3>
                        <p class="lp-team-role">CTO</p>
                        <p class="lp-team-bio">技術革新を推進するテクノロジーエキスパート</p>
                    </article>

                    <article class="lp-team-card lp-slide-up" role="listitem">
                        <div class="lp-team-avatar" aria-hidden="true">TN</div>
                        <h3 class="lp-team-name">中村 翔太</h3>
                        <p class="lp-team-role">デザインディレクター</p>
                        <p class="lp-team-bio">美しく使いやすいデザインを創造するクリエイター</p>
                    </article>

                    <article class="lp-team-card lp-slide-up" role="listitem">
                        <div class="lp-team-avatar" aria-hidden="true">AK</div>
                        <h3 class="lp-team-name">木村 彩</h3>
                        <p class="lp-team-role">マーケティングマネージャー</p>
                        <p class="lp-team-bio">戦略的なマーケティングでビジネスを成長させる</p>
                    </article>
                </div>
            </div>
        </section>
        `,
  },

  faq: {
    name: 'FAQ Section',
    html: `
        <section class="lp-section" aria-labelledby="faq-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="faq-title" class="lp-section-title">よくある質問</h2>
                <p class="lp-section-subtitle">お客様からよくいただく質問にお答えします</p>

                <div class="lp-faq-list" role="list">
                    <div class="lp-faq-item lp-slide-up" role="listitem">
                        <h3 class="lp-faq-question">サービスの利用開始までどのくらいかかりますか？</h3>
                        <p class="lp-faq-answer">
                            アカウント作成後、すぐにご利用いただけます。セットアップは数分で完了し、特別な技術知識は必要ありません。
                        </p>
                    </div>

                    <div class="lp-faq-item lp-slide-up" role="listitem">
                        <h3 class="lp-faq-question">プランの変更はいつでも可能ですか？</h3>
                        <p class="lp-faq-answer">
                            はい、いつでもプランの変更が可能です。アップグレードもダウングレードも簡単に行えます。
                        </p>
                    </div>

                    <div class="lp-faq-item lp-slide-up" role="listitem">
                        <h3 class="lp-faq-question">サポートはどのように受けられますか？</h3>
                        <p class="lp-faq-answer">
                            メール、チャット、電話など複数のチャネルでサポートを提供しています。プランによって24時間365日対応も可能です。
                        </p>
                    </div>

                    <div class="lp-faq-item lp-slide-up" role="listitem">
                        <h3 class="lp-faq-question">データのセキュリティは保証されていますか？</h3>
                        <p class="lp-faq-answer">
                            はい、エンタープライズグレードのセキュリティ対策を実施しています。データは暗号化され、定期的にバックアップされます。
                        </p>
                    </div>

                    <div class="lp-faq-item lp-slide-up" role="listitem">
                        <h3 class="lp-faq-question">無料トライアル期間中に解約できますか？</h3>
                        <p class="lp-faq-answer">
                            はい、いつでも解約可能です。無料トライアル期間中は一切料金が発生しません。
                        </p>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  contact: {
    name: 'Contact Form',
    html: `
        <section class="lp-section lp-contact" aria-labelledby="contact-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="contact-title" class="lp-section-title">お問い合わせ</h2>
                <p class="lp-section-subtitle">お気軽にご連絡ください</p>

                <form class="lp-contact-form lp-slide-up" aria-label="お問い合わせフォーム">
                    <div class="lp-form-group">
                        <label class="lp-form-label" for="contact-name">お名前</label>
                        <input type="text" id="contact-name" class="lp-form-input" placeholder="山田 太郎" required>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label" for="contact-email">メールアドレス</label>
                        <input type="email" id="contact-email" class="lp-form-input" placeholder="your@email.com" required>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label" for="contact-subject">件名</label>
                        <input type="text" id="contact-subject" class="lp-form-input" placeholder="お問い合わせ内容" required>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label" for="contact-message">メッセージ</label>
                        <textarea id="contact-message" class="lp-form-textarea" placeholder="詳細をお聞かせください" required></textarea>
                    </div>

                    <button type="submit" class="lp-btn lp-btn-primary lp-btn-block lp-mt-md">
                        送信する
                    </button>
                </form>
            </div>
        </section>
        `,
  },

  'contact-card': {
    name: 'Contact Form (Card)',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="contact-card-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="contact-card-title" class="lp-section-title">お問い合わせ</h2>
                <p class="lp-section-subtitle">ご質問やご相談はこちらから</p>

                <form class="lp-contact-form lp-form-card lp-slide-up" aria-label="お問い合わせフォーム">
                    <div class="lp-form-row">
                        <div class="lp-form-group">
                            <label class="lp-form-label required" for="card-lastname">姓</label>
                            <input type="text" id="card-lastname" class="lp-form-input" placeholder="山田" required>
                        </div>
                        <div class="lp-form-group">
                            <label class="lp-form-label required" for="card-firstname">名</label>
                            <input type="text" id="card-firstname" class="lp-form-input" placeholder="太郎" required>
                        </div>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label required" for="card-email">メールアドレス</label>
                        <input type="email" id="card-email" class="lp-form-input" placeholder="your@email.com" required>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label" for="card-tel">電話番号</label>
                        <input type="tel" id="card-tel" class="lp-form-input" placeholder="090-1234-5678">
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label" for="card-type">お問い合わせ種別</label>
                        <select id="card-type" class="lp-form-select">
                            <option value="">選択してください</option>
                            <option value="general">一般的なお問い合わせ</option>
                            <option value="support">サポート</option>
                            <option value="sales">お見積り・ご相談</option>
                            <option value="other">その他</option>
                        </select>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label required" for="card-message">メッセージ</label>
                        <textarea id="card-message" class="lp-form-textarea" placeholder="お問い合わせ内容を入力してください" required></textarea>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-check">
                            <input type="checkbox" required>
                            <span class="lp-form-check-label">プライバシーポリシーに同意します</span>
                        </label>
                    </div>

                    <button type="submit" class="lp-btn lp-btn-primary lp-btn-block">
                        送信する
                    </button>
                </form>
            </div>
        </section>
        `,
  },

  'contact-split': {
    name: 'Contact Form (Split)',
    html: `
        <section class="lp-section" aria-labelledby="contact-split-title">
            <div class="lp-content-wrapper">
                <div class="lp-grid-2col lp-gap-xl lp-items-start">
                    <div>
                        <h2 id="contact-split-title" class="lp-section-title lp-text-left">お気軽にお問い合わせください</h2>
                        <p class="lp-text-muted lp-mb-lg">ご質問やご相談がございましたら、下記フォームからお問い合わせください。担当者より2営業日以内にご連絡いたします。</p>

                        <address class="lp-contact-info-list">
                            <div class="lp-contact-info-item">
                                <div class="lp-contact-info-icon lp-bg-blue-light" aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-primary, #3b82f6)" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </div>
                                <div>
                                    <div class="lp-text-bold lp-text-dark">電話番号</div>
                                    <div class="lp-text-muted">03-1234-5678</div>
                                </div>
                            </div>
                            <div class="lp-contact-info-item">
                                <div class="lp-contact-info-icon lp-bg-blue-light" aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-primary, #3b82f6)" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                </div>
                                <div>
                                    <div class="lp-text-bold lp-text-dark">メール</div>
                                    <div class="lp-text-muted">info@example.com</div>
                                </div>
                            </div>
                            <div class="lp-contact-info-item">
                                <div class="lp-contact-info-icon lp-bg-blue-light" aria-hidden="true">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-primary, #3b82f6)" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                                <div>
                                    <div class="lp-text-bold lp-text-dark">所在地</div>
                                    <div class="lp-text-muted">東京都渋谷区〇〇 1-2-3</div>
                                </div>
                            </div>
                        </address>
                    </div>

                    <form class="lp-contact-form lp-form-card lp-m-0" aria-label="お問い合わせフォーム">
                        <div class="lp-form-group">
                            <label class="lp-form-label required" for="split-name">お名前</label>
                            <input type="text" id="split-name" class="lp-form-input" placeholder="山田 太郎" required>
                        </div>

                        <div class="lp-form-group">
                            <label class="lp-form-label required" for="split-email">メールアドレス</label>
                            <input type="email" id="split-email" class="lp-form-input" placeholder="your@email.com" required>
                        </div>

                        <div class="lp-form-group">
                            <label class="lp-form-label required" for="split-message">メッセージ</label>
                            <textarea id="split-message" class="lp-form-textarea" placeholder="お問い合わせ内容" required></textarea>
                        </div>

                        <button type="submit" class="lp-btn lp-btn-primary lp-btn-block">
                            送信する
                        </button>
                    </form>
                </div>
            </div>
        </section>
        `,
  },

  newsletter: {
    name: 'Newsletter Signup',
    html: `
        <section class="lp-section lp-bg-gradient-primary lp-text-white" aria-labelledby="newsletter-title">
            <div class="lp-content-wrapper lp-text-center lp-max-w-sm">
                <h2 id="newsletter-title" class="lp-section-title lp-text-white">ニュースレターを購読</h2>
                <p class="lp-text-white-muted lp-mb-lg">最新情報やお得な情報をメールでお届けします</p>

                <form class="lp-input-addon lp-max-w-xs lp-mx-auto" aria-label="ニュースレター登録フォーム">
                    <label for="newsletter-email" class="lp-sr-only">メールアドレス</label>
                    <input type="email" id="newsletter-email" class="lp-form-input lp-flex-1" placeholder="メールアドレスを入力" required>
                    <button type="submit" class="lp-btn lp-btn-white">
                        購読する
                    </button>
                </form>

                <p class="lp-text-sm lp-text-white-subtle lp-mt-md">
                    いつでも購読を解除できます
                </p>
            </div>
        </section>
        `,
  },

  'login-form': {
    name: 'Login Form',
    html: `
        <section class="lp-section lp-bg-light lp-min-h-form lp-flex-center" aria-labelledby="login-title">
            <div class="lp-content-wrapper lp-max-w-xs lp-mx-auto">
                <form class="lp-contact-form lp-form-card lp-m-0" aria-label="ログインフォーム">
                    <div class="lp-text-center lp-mb-lg">
                        <h2 id="login-title" class="lp-heading-md lp-mb-xs">ログイン</h2>
                        <p class="lp-text-muted">アカウントにサインイン</p>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label" for="login-email">メールアドレス</label>
                        <div class="lp-input-group">
                            <span class="lp-input-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </span>
                            <input type="email" id="login-email" class="lp-form-input" placeholder="your@email.com" required autocomplete="email">
                        </div>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label" for="login-password">パスワード</label>
                        <div class="lp-input-group">
                            <span class="lp-input-icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </span>
                            <input type="password" id="login-password" class="lp-form-input" placeholder="••••••••" required autocomplete="current-password">
                        </div>
                    </div>

                    <div class="lp-flex-between lp-items-center lp-mb-md">
                        <label class="lp-form-check lp-m-0">
                            <input type="checkbox">
                            <span class="lp-form-check-label">ログイン状態を保持</span>
                        </label>
                        <a href="#" class="lp-link-primary lp-text-sm">パスワードを忘れた方</a>
                    </div>

                    <button type="submit" class="lp-btn lp-btn-primary lp-btn-block">
                        ログイン
                    </button>

                    <p class="lp-text-center lp-text-muted lp-mt-md lp-text-sm">
                        アカウントをお持ちでない方は <a href="#" class="lp-link-primary">新規登録</a>
                    </p>
                </form>
            </div>
        </section>
        `,
  },

  'signup-form': {
    name: 'Signup Form',
    html: `
        <section class="lp-section lp-bg-light lp-min-h-form lp-flex-center" aria-labelledby="signup-title">
            <div class="lp-content-wrapper lp-max-w-sm lp-mx-auto">
                <form class="lp-contact-form lp-form-card lp-m-0" aria-label="新規登録フォーム">
                    <div class="lp-text-center lp-mb-lg">
                        <h2 id="signup-title" class="lp-heading-md lp-mb-xs">アカウント作成</h2>
                        <p class="lp-text-muted">無料でアカウントを作成</p>
                    </div>

                    <div class="lp-form-row">
                        <div class="lp-form-group">
                            <label class="lp-form-label" for="signup-lastname">姓</label>
                            <input type="text" id="signup-lastname" class="lp-form-input" placeholder="山田" required autocomplete="family-name">
                        </div>
                        <div class="lp-form-group">
                            <label class="lp-form-label" for="signup-firstname">名</label>
                            <input type="text" id="signup-firstname" class="lp-form-input" placeholder="太郎" required autocomplete="given-name">
                        </div>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label" for="signup-email">メールアドレス</label>
                        <input type="email" id="signup-email" class="lp-form-input" placeholder="your@email.com" required autocomplete="email">
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label" for="signup-password">パスワード</label>
                        <input type="password" id="signup-password" class="lp-form-input" placeholder="8文字以上" required autocomplete="new-password" minlength="8">
                        <p class="lp-form-hint" id="password-hint">8文字以上、英数字を含む</p>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-check">
                            <input type="checkbox" required>
                            <span class="lp-form-check-label"><a href="#" class="lp-link-primary">利用規約</a> と <a href="#" class="lp-link-primary">プライバシーポリシー</a> に同意します</span>
                        </label>
                    </div>

                    <button type="submit" class="lp-btn lp-btn-primary lp-btn-block">
                        アカウントを作成
                    </button>

                    <div class="lp-divider-text" aria-hidden="true">
                        <span class="lp-divider-line"></span>
                        <span class="lp-divider-label">または</span>
                        <span class="lp-divider-line"></span>
                    </div>

                    <button type="button" class="lp-btn lp-btn-secondary lp-btn-block lp-btn-icon-left" aria-label="Googleアカウントで続ける">
                        <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                        Googleで続ける
                    </button>
                </form>
            </div>
        </section>
        `,
  },
  // ===== NEW COMPONENTS - HERO VARIATIONS =====
  'hero-video': {
    name: 'Video Hero',
    html: `
        <section class="lp-section lp-hero lp-hero-video lp-bg-gradient-overlay" role="banner" aria-labelledby="hero-video-title">
            <div class="lp-hero-content lp-text-center">
                <h1 id="hero-video-title" class="lp-slide-up">ビデオで伝える、未来のストーリー</h1>
                <p class="lp-hero-subtitle">動画で魅力を最大限に引き出します</p>
                <div class="lp-hero-buttons">
                    <button class="lp-btn lp-btn-primary" aria-label="動画を再生する">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        動画を見る
                    </button>
                </div>
            </div>
        </section>
        `,
  },

  'hero-minimal': {
    name: 'Minimal Hero',
    html: `
        <section class="lp-section lp-hero-minimal lp-py-xxl lp-text-center" role="banner" aria-labelledby="hero-minimal-title">
            <div class="lp-content-wrapper lp-max-w-md lp-mx-auto">
                <h1 id="hero-minimal-title" class="lp-slide-up lp-heading-display lp-font-light">Simple. Powerful. Elegant.</h1>
                <p class="lp-text-lg lp-text-muted lp-mb-lg">シンプルさの中に、強力な機能を。</p>
                <button class="lp-btn lp-btn-primary">始める</button>
            </div>
        </section>
        `,
  },

  'hero-gradient': {
    name: 'Gradient Hero',
    html: `
        <section class="lp-section lp-bg-gradient-purple lp-text-white lp-py-xxl lp-text-center" role="banner" aria-labelledby="hero-gradient-title">
            <div class="lp-hero-content">
                <h1 id="hero-gradient-title" class="lp-slide-up">未来を創造する</h1>
                <p class="lp-hero-subtitle">革新的なソリューションで、ビジネスを変革</p>
                <div class="lp-hero-buttons">
                    <button class="lp-btn lp-btn-white">無料で試す</button>
                    <button class="lp-btn lp-btn-outline-white">詳細</button>
                </div>
            </div>
        </section>
        `,
  },

  'hero-split-image': {
    name: 'Split Image Hero',
    html: `
        <section class="lp-section lp-p-0" role="banner" aria-labelledby="hero-split-title">
            <div class="lp-grid-2col lp-min-h-hero lp-gap-0">
                <div class="lp-split-content">
                    <h1 id="hero-split-title" class="lp-heading-xl lp-mb-md">ビジネスを加速させる</h1>
                    <p class="lp-text-lg lp-text-muted lp-mb-lg">効率的なツールで、生産性を最大化</p>
                    <div class="lp-btn-group">
                        <button class="lp-btn lp-btn-primary">今すぐ開始</button>
                        <button class="lp-btn lp-btn-secondary">デモを見る</button>
                    </div>
                </div>
                <div class="lp-split-image lp-bg-cover" role="img" aria-label="サービスイメージ">
                    <img src="https://picsum.photos/800/600" alt="ビジネスプラットフォームのイメージ" loading="lazy" class="lp-img-cover">
                </div>
            </div>
        </section>
        `,
  },

  'hero-fullscreen': {
    name: 'Fullscreen Hero',
    html: `
        <section class="lp-section lp-hero-fullscreen lp-bg-dark-overlay lp-text-white lp-flex-center" role="banner" aria-labelledby="hero-fullscreen-title">
            <div class="lp-hero-content lp-text-center">
                <h1 id="hero-fullscreen-title" class="lp-slide-up lp-heading-hero lp-mb-md">Welcome to the Future</h1>
                <p class="lp-text-xl lp-mb-xl">革新と創造の世界へようこそ</p>
                <button class="lp-btn lp-btn-primary lp-btn-xl">探索を始める</button>
            </div>
        </section>
        `,
  },

  // ===== CONTENT SECTIONS =====
  'content-left': {
    name: 'Content + Image (Left)',
    html: `
        <section class="lp-section" aria-labelledby="content-left-title">
            <div class="lp-content-wrapper">
                <div class="lp-grid-2col lp-gap-xl lp-items-center">
                    <div>
                        <h2 id="content-left-title" class="lp-section-title lp-text-left">強力な機能で効率アップ</h2>
                        <p class="lp-text-lg lp-leading-relaxed lp-text-muted">私たちのプラットフォームは、最新のテクノロジーを活用して、あなたのビジネスを次のレベルへと導きます。直感的なインターフェースと強力な機能で、作業効率を劇的に向上させます。</p>
                        <button class="lp-btn lp-btn-primary lp-mt-md">詳しく見る</button>
                    </div>
                    <div>
                        <img src="https://picsum.photos/600/400" alt="プラットフォームの機能を示すダッシュボード画面" class="lp-img-rounded lp-img-shadow" loading="lazy">
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'content-right': {
    name: 'Content + Image (Right)',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="content-right-title">
            <div class="lp-content-wrapper">
                <div class="lp-grid-2col lp-gap-xl lp-items-center">
                    <div>
                        <img src="https://picsum.photos/600/400?random=2" alt="データ分析ダッシュボードの画面" class="lp-img-rounded lp-img-shadow" loading="lazy">
                    </div>
                    <div>
                        <h2 id="content-right-title" class="lp-section-title lp-text-left">データ駆動の意思決定</h2>
                        <p class="lp-text-lg lp-leading-relaxed lp-text-muted">リアルタイムの分析とインサイトで、ビジネスの成長を加速。データに基づいた戦略的な意思決定をサポートします。</p>
                        <ul class="lp-check-list lp-mt-md" aria-label="主な特徴">
                            <li class="lp-check-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                リアルタイム分析
                            </li>
                            <li class="lp-check-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                カスタムレポート
                            </li>
                            <li class="lp-check-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                データビジュアライゼーション
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        `,
  },
  'content-centered': {
    name: 'Centered Content',
    html: `
        <section class="lp-section" aria-labelledby="content-centered-title">
            <div class="lp-content-wrapper lp-text-center lp-max-w-md lp-mx-auto">
                <h2 id="content-centered-title" class="lp-section-title">なぜ私たちを選ぶのか</h2>
                <p class="lp-text-lg lp-leading-relaxed lp-text-muted lp-mb-lg">10年以上の実績と、数千社のクライアントから信頼されているプラットフォーム。業界をリードする技術と、専任サポートチームで、あなたの成功を支援します。</p>
                <div class="lp-stats-inline lp-mt-xl" role="list" aria-label="主要な実績">
                    <div role="listitem">
                        <div class="lp-stat-value lp-text-primary">10,000+</div>
                        <div class="lp-text-muted lp-mt-xs">満足した顧客</div>
                    </div>
                    <div role="listitem">
                        <div class="lp-stat-value lp-text-green">99.9%</div>
                        <div class="lp-text-muted lp-mt-xs">稼働時間</div>
                    </div>
                    <div role="listitem">
                        <div class="lp-stat-value lp-text-amber">24/7</div>
                        <div class="lp-text-muted lp-mt-xs">サポート</div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'quote-section': {
    name: 'Quote/Blockquote',
    html: `
        <section class="lp-section lp-bg-dark lp-text-white lp-py-xl" aria-labelledby="quote-attribution">
            <div class="lp-content-wrapper lp-text-center lp-max-w-lg lp-mx-auto">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="lp-quote-icon" aria-hidden="true">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
                <blockquote class="lp-blockquote">
                    <p>このプラットフォームのおかげで、私たちのビジネスは飛躍的に成長しました。直感的で強力なツールが、チーム全体の生産性を向上させてくれています。</p>
                </blockquote>
                <footer class="lp-blockquote-footer" id="quote-attribution">
                    <strong>田中 太郎</strong> - CEO, Tech Solutions Inc.
                </footer>
            </div>
        </section>
        `,
  },

  'video-section': {
    name: 'Video Section',
    html: `
        <section class="lp-section" aria-labelledby="video-section-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="video-section-title" class="lp-section-title">動画で見る製品紹介</h2>
                <p class="lp-section-subtitle">2分で分かる、私たちのソリューション</p>
                <div class="lp-video-wrapper lp-mt-xl">
                    <img src="https://picsum.photos/1600/900" alt="製品紹介動画のサムネイル" class="lp-video-thumbnail" loading="lazy">
                    <button class="lp-video-play-btn" aria-label="製品紹介動画を再生する">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
        `,
  },

  'logo-cloud': {
    name: 'Logo Cloud',
    html: `
        <section class="lp-section" aria-labelledby="logo-cloud-label">
            <div class="lp-content-wrapper lp-text-center">
                <p id="logo-cloud-label" class="lp-eyebrow-text">信頼されている企業</p>
                <div class="lp-logo-cloud" role="list" aria-label="導入企業ロゴ一覧">
                    <div class="lp-logo-cloud-item" role="listitem">COMPANY A</div>
                    <div class="lp-logo-cloud-item" role="listitem">BRAND B</div>
                    <div class="lp-logo-cloud-item" role="listitem">CORP C</div>
                    <div class="lp-logo-cloud-item" role="listitem">TECH D</div>
                    <div class="lp-logo-cloud-item" role="listitem">GLOBAL E</div>
                </div>
            </div>
        </section>
        `,
  },

  'steps-horizontal': {
    name: 'Steps Horizontal',
    html: `
        <section class="lp-section" aria-labelledby="steps-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="steps-title" class="lp-section-title">簡単3ステップ</h2>
                <p class="lp-section-subtitle">今すぐ始められる、シンプルなプロセス</p>
                <div class="lp-steps-grid lp-mt-xl" role="list" aria-label="利用開始の手順">
                    <div class="lp-step-item lp-slide-up" role="listitem">
                        <div class="lp-step-number" aria-hidden="true">1</div>
                        <h3 class="lp-step-title">アカウント作成</h3>
                        <p class="lp-text-muted">メールアドレスだけで、簡単にアカウントを作成できます。</p>
                    </div>
                    <div class="lp-step-item lp-slide-up" role="listitem">
                        <div class="lp-step-number" aria-hidden="true">2</div>
                        <h3 class="lp-step-title">設定</h3>
                        <p class="lp-text-muted">直感的なウィザードで、必要な設定を完了。</p>
                    </div>
                    <div class="lp-step-item lp-slide-up" role="listitem">
                        <div class="lp-step-number" aria-hidden="true">3</div>
                        <h3 class="lp-step-title">開始</h3>
                        <p class="lp-text-muted">すぐに使い始められます。成果を実感してください。</p>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'benefits-grid': {
    name: 'Benefits Grid',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="benefits-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="benefits-title" class="lp-section-title">導入のメリット</h2>
                <div class="lp-benefits-grid lp-mt-xl" role="list" aria-label="導入メリット一覧">
                    <div class="lp-benefit-card lp-slide-up" role="listitem">
                        <div class="lp-benefit-icon lp-bg-blue-light" aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-primary, #3b82f6)" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <h3 class="lp-benefit-title">コスト削減</h3>
                        <p class="lp-text-muted">運用コストを最大60%削減。ROIを最大化します。</p>
                    </div>
                    <div class="lp-benefit-card lp-slide-up" role="listitem">
                        <div class="lp-benefit-icon lp-bg-green-light" aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                            </svg>
                        </div>
                        <h3 class="lp-benefit-title">生産性向上</h3>
                        <p class="lp-text-muted">チームの生産性が平均40%向上。作業時間を大幅短縮。</p>
                    </div>
                    <div class="lp-benefit-card lp-slide-up" role="listitem">
                        <div class="lp-benefit-icon lp-bg-amber-light" aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-amber, #f59e0b)" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <h3 class="lp-benefit-title">セキュリティ強化</h3>
                        <p class="lp-text-muted">エンタープライズレベルのセキュリティで安心。</p>
                    </div>
                    <div class="lp-benefit-card lp-slide-up" role="listitem">
                        <div class="lp-benefit-icon lp-bg-pink-light" aria-hidden="true">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-pink, #ec4899)" stroke-width="2">
                                <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
                            </svg>
                        </div>
                        <h3 class="lp-benefit-title">スケーラビリティ</h3>
                        <p class="lp-text-muted">ビジネスの成長に合わせて柔軟にスケール可能。</p>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'comparison-table': {
    name: 'Comparison Table',
    html: `
        <section class="lp-section" aria-labelledby="comparison-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="comparison-title" class="lp-section-title">プラン比較</h2>
                <p class="lp-section-subtitle">最適なプランを見つけましょう</p>
                <div class="lp-table-wrapper lp-mt-xl">
                    <table class="lp-comparison-table" aria-label="プラン比較表">
                        <thead>
                            <tr>
                                <th scope="col" class="lp-table-th lp-text-left">機能</th>
                                <th scope="col" class="lp-table-th lp-text-center">スターター</th>
                                <th scope="col" class="lp-table-th lp-text-center lp-table-highlight">プロ</th>
                                <th scope="col" class="lp-table-th lp-text-center">エンタープライズ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="lp-table-td">ユーザー数</td>
                                <td class="lp-table-td lp-text-center">1</td>
                                <td class="lp-table-td lp-text-center lp-table-highlight-cell">5</td>
                                <td class="lp-table-td lp-text-center">無制限</td>
                            </tr>
                            <tr>
                                <td class="lp-table-td">ストレージ</td>
                                <td class="lp-table-td lp-text-center">10GB</td>
                                <td class="lp-table-td lp-text-center lp-table-highlight-cell">100GB</td>
                                <td class="lp-table-td lp-text-center">無制限</td>
                            </tr>
                            <tr>
                                <td class="lp-table-td">サポート</td>
                                <td class="lp-table-td lp-text-center">メール</td>
                                <td class="lp-table-td lp-text-center lp-table-highlight-cell">優先</td>
                                <td class="lp-table-td lp-text-center">専用</td>
                            </tr>
                            <tr>
                                <td class="lp-table-td">API アクセス</td>
                                <td class="lp-table-td lp-text-center"><span aria-label="利用不可">-</span></td>
                                <td class="lp-table-td lp-text-center lp-table-highlight-cell">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span class="lp-sr-only">利用可能</span>
                                </td>
                                <td class="lp-table-td lp-text-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span class="lp-sr-only">利用可能</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        `,
  },

  'cta-banner': {
    name: 'CTA Banner',
    html: `
        <section class="lp-section lp-bg-gradient-blue lp-text-white lp-py-lg" aria-labelledby="cta-banner-title">
            <div class="lp-content-wrapper lp-flex-between lp-items-center lp-gap-lg lp-cta-banner-layout">
                <div>
                    <h2 id="cta-banner-title" class="lp-heading-lg lp-mb-xs lp-text-white">今すぐ始めましょう</h2>
                    <p class="lp-text-lg lp-text-white-muted">無料トライアルで、すべての機能をお試しください。</p>
                </div>
                <div class="lp-flex-shrink-0">
                    <button class="lp-btn lp-btn-white lp-btn-lg">無料で始める</button>
                </div>
            </div>
        </section>
        `,
  },

  'cta-centered': {
    name: 'CTA Centered',
    html: `
        <section class="lp-section" aria-labelledby="cta-centered-title">
            <div class="lp-content-wrapper lp-text-center lp-max-w-sm lp-mx-auto">
                <h2 id="cta-centered-title" class="lp-section-title">準備はできましたか？</h2>
                <p class="lp-text-lg lp-text-muted lp-mb-xl">今すぐ始めて、ビジネスを次のレベルへ。クレジットカード不要。</p>
                <div class="lp-btn-group lp-justify-center">
                    <button class="lp-btn lp-btn-primary lp-btn-lg">無料トライアル</button>
                    <button class="lp-btn lp-btn-secondary lp-btn-lg">デモを予約</button>
                </div>
                <p class="lp-text-sm lp-text-subtle lp-mt-md">14日間の無料トライアル · クレジットカード不要</p>
            </div>
        </section>
        `,
  },

  'features-list': {
    name: 'Features List',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="features-list-title">
            <div class="lp-content-wrapper">
                <div class="lp-grid-2col lp-gap-xl lp-items-center">
                    <div>
                        <h2 id="features-list-title" class="lp-section-title lp-text-left">すべてが揃っています</h2>
                        <p class="lp-text-muted lp-mb-lg">成功に必要な、すべての機能を提供します。</p>
                        <div class="lp-feature-list" role="list">
                            <div class="lp-feature-list-item" role="listitem">
                                <div class="lp-feature-list-icon" aria-hidden="true">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="lp-feature-list-title">無制限のプロジェクト</h3>
                                    <p class="lp-text-muted lp-text-sm">プロジェクト数に制限なし。自由に作成できます。</p>
                                </div>
                            </div>
                            <div class="lp-feature-list-item" role="listitem">
                                <div class="lp-feature-list-icon" aria-hidden="true">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="lp-feature-list-title">リアルタイム同期</h3>
                                    <p class="lp-text-muted lp-text-sm">チーム全員がリアルタイムで共同作業できます。</p>
                                </div>
                            </div>
                            <div class="lp-feature-list-item" role="listitem">
                                <div class="lp-feature-list-icon" aria-hidden="true">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 class="lp-feature-list-title">高度な分析</h3>
                                    <p class="lp-text-muted lp-text-sm">詳細な分析レポートで、インサイトを獲得。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="https://picsum.photos/600/500?random=3" alt="機能一覧を表示するアプリケーション画面" class="lp-img-rounded lp-img-shadow" loading="lazy">
                    </div>
                </div>
            </div>
        </section>
        `,
  },
  'alert-banner': {
    name: 'Alert Banner',
    html: `
        <section class="lp-alert-banner lp-alert-warning" role="alert" aria-label="重要なお知らせ">
            <div class="lp-content-wrapper lp-flex-row lp-items-center lp-gap-md">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-amber, #f59e0b)" stroke-width="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div class="lp-flex-1">
                    <strong class="lp-alert-title">重要なお知らせ:</strong>
                    <span class="lp-alert-message">期間限定で、全プラン30%オフ！</span>
                </div>
                <button class="lp-btn lp-btn-primary lp-btn-sm">詳細</button>
            </div>
        </section>
        `,
  },

  'accordion-faq': {
    name: 'Accordion FAQ',
    html: `
        <section class="lp-section lp-faq-modern" aria-labelledby="accordion-faq-title">
            <div class="lp-content-wrapper">
                <div class="lp-faq-header lp-text-center">
                    <div class="lp-section-badge lp-fade-in">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                        <span>FAQ</span>
                    </div>
                    <h2 id="accordion-faq-title" class="lp-section-title lp-slide-up">よくある質問</h2>
                    <p class="lp-section-subtitle lp-fade-in">お客様からよくいただくご質問にお答えします</p>
                </div>
                <div class="lp-faq-grid">
                    <div class="lp-faq-item lp-slide-up">
                        <details class="lp-faq-details">
                            <summary class="lp-faq-summary">
                                <span class="lp-faq-question">無料トライアルはありますか？</span>
                                <span class="lp-faq-icon" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                </span>
                            </summary>
                            <div class="lp-faq-answer">
                                <p>はい、14日間の無料トライアルをご利用いただけます。クレジットカードの登録は不要で、すべての機能をお試しいただけます。</p>
                            </div>
                        </details>
                    </div>
                    <div class="lp-faq-item lp-slide-up">
                        <details class="lp-faq-details">
                            <summary class="lp-faq-summary">
                                <span class="lp-faq-question">プランの変更は可能ですか？</span>
                                <span class="lp-faq-icon" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                </span>
                            </summary>
                            <div class="lp-faq-answer">
                                <p>はい、いつでもプランのアップグレードまたはダウングレードが可能です。請求は日割り計算されます。</p>
                            </div>
                        </details>
                    </div>
                    <div class="lp-faq-item lp-slide-up">
                        <details class="lp-faq-details">
                            <summary class="lp-faq-summary">
                                <span class="lp-faq-question">サポート体制について教えてください</span>
                                <span class="lp-faq-icon" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                </span>
                            </summary>
                            <div class="lp-faq-answer">
                                <p>全プランで24時間365日、メールとチャットによるサポートを提供しています。Proプラン以上では電話サポートもご利用いただけます。</p>
                            </div>
                        </details>
                    </div>
                    <div class="lp-faq-item lp-slide-up">
                        <details class="lp-faq-details">
                            <summary class="lp-faq-summary">
                                <span class="lp-faq-question">解約手数料はかかりますか？</span>
                                <span class="lp-faq-icon" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                </span>
                            </summary>
                            <div class="lp-faq-answer">
                                <p>いいえ、解約手数料は一切かかりません。いつでも自由に解約でき、残りの期間分は返金されます。</p>
                            </div>
                        </details>
                    </div>
                    <div class="lp-faq-item lp-slide-up">
                        <details class="lp-faq-details">
                            <summary class="lp-faq-summary">
                                <span class="lp-faq-question">データのセキュリティはどうなっていますか？</span>
                                <span class="lp-faq-icon" aria-hidden="true">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M12 5v14M5 12h14"/>
                                    </svg>
                                </span>
                            </summary>
                            <div class="lp-faq-answer">
                                <p>すべてのデータは256ビットSSL暗号化で保護され、SOC2およびISO27001認証を取得しています。</p>
                            </div>
                        </details>
                    </div>
                </div>
                <div class="lp-faq-cta lp-fade-in">
                    <p>その他のご質問がありますか？</p>
                    <a href="#contact" class="lp-btn lp-btn-outline-modern">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                        </svg>
                        お問い合わせ
                    </a>
                </div>
            </div>
        </section>
        `,
  },

  'newsletter-inline': {
    name: 'Newsletter Inline',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="newsletter-inline-title">
            <div class="lp-content-wrapper lp-max-w-lg lp-mx-auto">
                <div class="lp-card lp-card-elevated lp-text-center lp-p-xl">
                    <h3 id="newsletter-inline-title" class="lp-heading-lg lp-mb-xs">最新情報をお届けします</h3>
                    <p class="lp-text-muted lp-mb-lg">製品アップデートやヒントを週1回お届けします</p>
                    <form class="lp-newsletter-form lp-mx-auto" aria-label="ニュースレター登録">
                        <label for="newsletter-inline-email" class="lp-sr-only">メールアドレス</label>
                        <input type="email" id="newsletter-inline-email" placeholder="メールアドレス" class="lp-form-input lp-flex-1" required>
                        <button class="lp-btn lp-btn-primary lp-btn-md" type="submit">登録</button>
                    </form>
                    <p class="lp-text-sm lp-text-subtle lp-mt-md">いつでも配信停止できます。</p>
                </div>
            </div>
        </section>
        `,
  },

  'app-screenshot': {
    name: 'App Screenshot',
    html: `
        <section class="lp-section" aria-labelledby="app-screenshot-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="app-screenshot-title" class="lp-section-title">美しいインターフェース</h2>
                <p class="lp-section-subtitle">直感的で使いやすいデザイン</p>
                <div class="lp-screenshot-wrapper lp-mt-xl">
                    <img src="https://picsum.photos/1200/700" alt="アプリケーションのダッシュボード画面。直感的なUIで構成された管理画面" class="lp-img-rounded lp-img-shadow-lg" loading="lazy">
                </div>
            </div>
        </section>
        `,
  },

  'feature-tabs': {
    name: 'Feature Tabs',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="feature-tabs-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="feature-tabs-title" class="lp-section-title">主要機能</h2>
                <div class="lp-mt-xl">
                    <div class="lp-tab-buttons" role="tablist" aria-label="機能タブ">
                        <button class="lp-tab-btn lp-tab-active" role="tab" aria-selected="true" aria-controls="tab-dashboard">ダッシュボード</button>
                        <button class="lp-tab-btn" role="tab" aria-selected="false" aria-controls="tab-analytics">分析</button>
                        <button class="lp-tab-btn" role="tab" aria-selected="false" aria-controls="tab-reports">レポート</button>
                        <button class="lp-tab-btn" role="tab" aria-selected="false" aria-controls="tab-settings">設定</button>
                    </div>
                    <div id="tab-dashboard" class="lp-tab-panel lp-card lp-card-elevated lp-p-xl" role="tabpanel">
                        <h3 class="lp-heading-md lp-mb-sm">リアルタイムダッシュボード</h3>
                        <p class="lp-text-muted lp-mb-lg">ビジネスの重要な指標を一目で確認。カスタマイズ可能なウィジェットで、必要な情報だけを表示できます。</p>
                        <img src="https://picsum.photos/800/400" alt="ダッシュボード機能のスクリーンショット。KPIウィジェットとグラフが表示されている" class="lp-img-rounded" loading="lazy">
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'social-links': {
    name: 'Social Links',
    html: `
        <section class="lp-section" aria-labelledby="social-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="social-title" class="lp-section-title">フォローしてください</h2>
                <p class="lp-section-subtitle">最新情報はSNSで</p>
                <nav class="lp-social-links lp-mt-lg" aria-label="ソーシャルメディアリンク">
                    <a href="#" class="lp-social-link lp-social-twitter" aria-label="Twitterでフォロー">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                    </a>
                    <a href="#" class="lp-social-link lp-social-facebook" aria-label="Facebookでフォロー">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                        </svg>
                    </a>
                    <a href="#" class="lp-social-link lp-social-instagram" aria-label="Instagramでフォロー">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                    </a>
                    <a href="#" class="lp-social-link lp-social-linkedin" aria-label="LinkedInでフォロー">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                        </svg>
                    </a>
                </nav>
            </div>
        </section>
        `,
  },

  'awards-badges': {
    name: 'Awards & Badges',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="awards-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="awards-title" class="lp-section-title">受賞歴</h2>
                <p class="lp-section-subtitle">業界から認められた実績</p>
                <div class="lp-awards-grid lp-mt-xl" role="list" aria-label="受賞歴一覧">
                    <div class="lp-award-item" role="listitem">
                        <div class="lp-award-badge lp-bg-gradient-gold" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <h4 class="lp-award-name">Best Product 2024</h4>
                    </div>
                    <div class="lp-award-item" role="listitem">
                        <div class="lp-award-badge lp-bg-gradient-blue" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
                            </svg>
                        </div>
                        <h4 class="lp-award-name">Top Rated</h4>
                    </div>
                    <div class="lp-award-item" role="listitem">
                        <div class="lp-award-badge lp-bg-gradient-green" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <h4 class="lp-award-name">Certified</h4>
                    </div>
                    <div class="lp-award-item" role="listitem">
                        <div class="lp-award-badge lp-bg-gradient-pink" aria-hidden="true">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
                            </svg>
                        </div>
                        <h4 class="lp-award-name">Innovation Award</h4>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'metrics-counter': {
    name: 'Metrics Counter',
    html: `
        <section class="lp-section lp-bg-dark lp-text-white" aria-labelledby="metrics-heading">
            <h2 id="metrics-heading" class="lp-sr-only">主要な指標</h2>
            <div class="lp-content-wrapper">
                <div class="lp-metrics-grid" role="list" aria-label="主要指標">
                    <div class="lp-metric-item" role="listitem">
                        <div class="lp-metric-value lp-gradient-text-blue-green">500K+</div>
                        <div class="lp-metric-label">アクティブユーザー</div>
                    </div>
                    <div class="lp-metric-item" role="listitem">
                        <div class="lp-metric-value lp-gradient-text-green-blue">150+</div>
                        <div class="lp-metric-label">対応国</div>
                    </div>
                    <div class="lp-metric-item" role="listitem">
                        <div class="lp-metric-value lp-gradient-text-amber-red">99.9%</div>
                        <div class="lp-metric-label">稼働率</div>
                    </div>
                    <div class="lp-metric-item" role="listitem">
                        <div class="lp-metric-value lp-gradient-text-pink-purple">4.9/5</div>
                        <div class="lp-metric-label">ユーザー評価</div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'integration-logos': {
    name: 'Integrations',
    html: `
        <section class="lp-section" aria-labelledby="integrations-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="integrations-title" class="lp-section-title">連携サービス</h2>
                <p class="lp-section-subtitle">お気に入りのツールと簡単に連携</p>
                <div class="lp-integrations-grid lp-mt-xl" role="list" aria-label="連携可能サービス一覧">
                    <div class="lp-integration-card" role="listitem">
                        <span class="lp-integration-name">Slack</span>
                    </div>
                    <div class="lp-integration-card" role="listitem">
                        <span class="lp-integration-name">Google</span>
                    </div>
                    <div class="lp-integration-card" role="listitem">
                        <span class="lp-integration-name">Stripe</span>
                    </div>
                    <div class="lp-integration-card" role="listitem">
                        <span class="lp-integration-name">Zoom</span>
                    </div>
                    <div class="lp-integration-card" role="listitem">
                        <span class="lp-integration-name">Dropbox</span>
                    </div>
                    <div class="lp-integration-card" role="listitem">
                        <span class="lp-integration-name">GitHub</span>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'before-after': {
    name: 'Before/After',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="before-after-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="before-after-title" class="lp-section-title">導入前後の変化</h2>
                <p class="lp-section-subtitle">実際の成果をご覧ください</p>
                <div class="lp-grid-2col lp-gap-xl lp-mt-xl lp-text-left">
                    <div>
                        <span class="lp-badge lp-badge-red">Before</span>
                        <ul class="lp-comparison-list lp-comparison-negative" aria-label="導入前の課題">
                            <li class="lp-comparison-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-red, #ef4444)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                <span>手動でデータ入力、時間がかかる</span>
                            </li>
                            <li class="lp-comparison-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-red, #ef4444)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                <span>エラーが多発、品質に問題</span>
                            </li>
                            <li class="lp-comparison-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-red, #ef4444)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                <span>チーム間の連携が不十分</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <span class="lp-badge lp-badge-green">After</span>
                        <ul class="lp-comparison-list lp-comparison-positive" aria-label="導入後の成果">
                            <li class="lp-comparison-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                <span>自動化で作業時間を70%削減</span>
                            </li>
                            <li class="lp-comparison-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                <span>エラー率を95%改善、高品質</span>
                            </li>
                            <li class="lp-comparison-item">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                <span>リアルタイム同期でチーム連携</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  roadmap: {
    name: 'Roadmap',
    html: `
        <section class="lp-section" aria-labelledby="roadmap-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="roadmap-title" class="lp-section-title">製品ロードマップ</h2>
                <p class="lp-section-subtitle">今後の開発予定</p>
                <div class="lp-roadmap lp-mt-xl">
                    <div class="lp-roadmap-grid" role="list" aria-label="開発ロードマップ">
                        <div class="lp-roadmap-item" role="listitem">
                            <span class="lp-badge lp-badge-green">Q1 2024</span>
                            <h3 class="lp-roadmap-phase">基盤強化</h3>
                            <ul class="lp-roadmap-list" aria-label="Q1完了項目">
                                <li class="lp-roadmap-task lp-roadmap-done">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    パフォーマンス最適化
                                </li>
                                <li class="lp-roadmap-task lp-roadmap-done">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    UI/UX刷新
                                </li>
                                <li class="lp-roadmap-task lp-roadmap-done">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    モバイルアプリリリース
                                </li>
                            </ul>
                        </div>
                        <div class="lp-roadmap-item lp-roadmap-current" role="listitem">
                            <span class="lp-badge lp-badge-blue">Q2 2024</span>
                            <h3 class="lp-roadmap-phase">機能拡充</h3>
                            <ul class="lp-roadmap-list" aria-label="Q2計画項目">
                                <li class="lp-roadmap-task">AI機能統合</li>
                                <li class="lp-roadmap-task">高度な分析機能</li>
                                <li class="lp-roadmap-task">API v2リリース</li>
                            </ul>
                        </div>
                        <div class="lp-roadmap-item" role="listitem">
                            <span class="lp-badge lp-badge-gray">Q3 2024</span>
                            <h3 class="lp-roadmap-phase">グローバル展開</h3>
                            <ul class="lp-roadmap-list" aria-label="Q3計画項目">
                                <li class="lp-roadmap-task">多言語対応</li>
                                <li class="lp-roadmap-task">グローバルCDN</li>
                                <li class="lp-roadmap-task">コンプライアンス対応</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'carousel-testimonials': {
    name: 'Carousel Testimonials',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="carousel-testimonial-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="carousel-testimonial-title" class="lp-section-title">お客様の声</h2>
                <p class="lp-section-subtitle">実際にご利用いただいているお客様のレビュー</p>
                <article class="lp-testimonial-featured lp-mt-xl">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="var(--lp-color-primary, #3b82f6)" class="lp-quote-icon" aria-hidden="true">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    <blockquote class="lp-testimonial-featured-quote">
                        このツールを導入してから、チームの生産性が劇的に向上しました。特に自動化機能が素晴らしく、手作業が大幅に削減されています。
                    </blockquote>
                    <div class="lp-testimonial-featured-author">
                        <img src="https://i.pravatar.cc/60?img=1" alt="佐藤 花子さんのプロフィール写真" class="lp-avatar-lg" loading="lazy">
                        <div class="lp-text-left">
                            <div class="lp-text-bold lp-text-dark">佐藤 花子</div>
                            <div class="lp-text-muted lp-text-sm">プロジェクトマネージャー, ABC Corporation</div>
                        </div>
                    </div>
                </article>
            </div>
        </section>
        `,
  },

  'job-openings': {
    name: 'Job Openings',
    html: `
        <section class="lp-section" aria-labelledby="jobs-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="jobs-title" class="lp-section-title">採用情報</h2>
                <p class="lp-section-subtitle">一緒に働く仲間を募集しています</p>
                <div class="lp-job-list lp-mt-xl" role="list" aria-label="募集中のポジション">
                    <article class="lp-job-card lp-job-card-hover" role="listitem">
                        <div class="lp-flex-between lp-items-start">
                            <div>
                                <h3 class="lp-job-title">フロントエンドエンジニア</h3>
                                <p class="lp-job-meta">東京 · フルタイム · React</p>
                            </div>
                            <button class="lp-btn lp-btn-secondary lp-btn-sm">応募する</button>
                        </div>
                    </article>
                    <article class="lp-job-card lp-job-card-hover" role="listitem">
                        <div class="lp-flex-between lp-items-start">
                            <div>
                                <h3 class="lp-job-title">バックエンドエンジニア</h3>
                                <p class="lp-job-meta">リモート · フルタイム · Node.js</p>
                            </div>
                            <button class="lp-btn lp-btn-secondary lp-btn-sm">応募する</button>
                        </div>
                    </article>
                    <article class="lp-job-card lp-job-card-hover" role="listitem">
                        <div class="lp-flex-between lp-items-start">
                            <div>
                                <h3 class="lp-job-title">プロダクトデザイナー</h3>
                                <p class="lp-job-meta">大阪 · フルタイム · Figma</p>
                            </div>
                            <button class="lp-btn lp-btn-secondary lp-btn-sm">応募する</button>
                        </div>
                    </article>
                </div>
            </div>
        </section>
        `,
  },
  'feature-highlight': {
    name: 'Feature Highlight',
    html: `
        <section class="lp-section" aria-labelledby="feature-highlight-title">
            <div class="lp-content-wrapper">
                <div class="lp-grid-2col-wide lp-gap-xl lp-items-center">
                    <div>
                        <span class="lp-badge lp-badge-blue">新機能</span>
                        <h2 id="feature-highlight-title" class="lp-heading-xl lp-mb-md lp-mt-md">AI搭載の自動化エンジン</h2>
                        <p class="lp-text-lg lp-text-muted lp-mb-lg lp-leading-relaxed">機械学習を活用した予測分析で、ビジネスの意思決定をサポート。過去のデータから最適な施策を提案します。</p>
                        <div class="lp-highlight-stats lp-mb-lg" role="list" aria-label="主な成果指標">
                            <div role="listitem">
                                <div class="lp-highlight-stat-value lp-text-green">85%</div>
                                <div class="lp-text-muted lp-text-sm">精度向上</div>
                            </div>
                            <div role="listitem">
                                <div class="lp-highlight-stat-value lp-text-primary">3x</div>
                                <div class="lp-text-muted lp-text-sm">処理速度</div>
                            </div>
                        </div>
                        <button class="lp-btn lp-btn-primary">詳しく見る</button>
                    </div>
                    <div>
                        <img src="https://picsum.photos/500/500?random=5" alt="AI自動化エンジンのダッシュボード画面。予測分析グラフと推奨施策が表示されている" class="lp-img-rounded lp-img-shadow-lg" loading="lazy">
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'pricing-toggle': {
    name: 'Pricing with Toggle',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="pricing-toggle-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="pricing-toggle-title" class="lp-section-title">シンプルな料金体系</h2>
                <p class="lp-section-subtitle">年間払いで20%お得</p>
                <div class="lp-pricing-toggle" role="group" aria-label="料金期間切替">
                    <span class="lp-toggle-label" id="ptoggle-monthly">月払い</span>
                    <label class="lp-toggle-switch">
                        <input type="checkbox" aria-labelledby="ptoggle-monthly ptoggle-yearly">
                        <span class="lp-toggle-slider"></span>
                    </label>
                    <span class="lp-toggle-label" id="ptoggle-yearly">年払い<span class="lp-discount-badge">20% OFF</span></span>
                </div>
                <div class="lp-pricing-grid-3 lp-mt-xl" role="list" aria-label="料金プラン一覧">
                    <div class="lp-pricing-card-simple" role="listitem">
                        <h3 class="lp-pricing-card-name">ベーシック</h3>
                        <div class="lp-pricing-card-price">
                            <span class="lp-pricing-card-amount">¥2,400</span>
                            <span class="lp-pricing-card-period">/月</span>
                        </div>
                        <div class="lp-text-muted lp-text-sm lp-mb-md">年払い ¥28,800</div>
                        <button class="lp-btn lp-btn-secondary lp-btn-block lp-mb-md">選択する</button>
                        <ul class="lp-pricing-list" aria-label="ベーシックプランの内容">
                            <li class="lp-pricing-list-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                5プロジェクト
                            </li>
                            <li class="lp-pricing-list-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                10GB ストレージ
                            </li>
                            <li class="lp-pricing-list-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                メールサポート
                            </li>
                        </ul>
                    </div>
                    <div class="lp-pricing-card-featured-gradient" role="listitem">
                        <div class="lp-pricing-popular-badge" aria-label="人気のプラン">人気</div>
                        <h3 class="lp-pricing-card-name lp-text-white">プロ</h3>
                        <div class="lp-pricing-card-price lp-text-white">
                            <span class="lp-pricing-card-amount">¥7,840</span>
                            <span class="lp-pricing-card-period">/月</span>
                        </div>
                        <div class="lp-text-white-muted lp-text-sm lp-mb-md">年払い ¥94,080</div>
                        <button class="lp-btn lp-btn-white lp-btn-block lp-mb-md">選択する</button>
                        <ul class="lp-pricing-list lp-text-white" aria-label="プロプランの内容">
                            <li class="lp-pricing-list-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                無制限プロジェクト
                            </li>
                            <li class="lp-pricing-list-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                100GB ストレージ
                            </li>
                            <li class="lp-pricing-list-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                優先サポート
                            </li>
                        </ul>
                    </div>
                    <div class="lp-pricing-card-simple" role="listitem">
                        <h3 class="lp-pricing-card-name">エンタープライズ</h3>
                        <div class="lp-pricing-card-price">
                            <span class="lp-pricing-card-amount">カスタム</span>
                        </div>
                        <div class="lp-text-muted lp-text-sm lp-mb-md">お問い合わせください</div>
                        <button class="lp-btn lp-btn-secondary lp-btn-block lp-mb-md">お問い合わせ</button>
                        <ul class="lp-pricing-list" aria-label="エンタープライズプランの内容">
                            <li class="lp-pricing-list-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                無制限すべて
                            </li>
                            <li class="lp-pricing-list-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                専用サポート
                            </li>
                            <li class="lp-pricing-list-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                カスタム機能
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'trust-badges': {
    name: 'Trust Badges',
    html: `
        <section class="lp-section lp-bg-dark lp-text-white lp-py-lg" aria-labelledby="trust-heading">
            <h2 id="trust-heading" class="lp-sr-only">セキュリティと信頼性</h2>
            <div class="lp-content-wrapper">
                <div class="lp-trust-grid" role="list" aria-label="信頼性の証明">
                    <div class="lp-trust-item" role="listitem">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <span class="lp-trust-label">SSL暗号化</span>
                    </div>
                    <div class="lp-trust-item" role="listitem">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <span class="lp-trust-label">GDPR準拠</span>
                    </div>
                    <div class="lp-trust-item" role="listitem">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span class="lp-trust-label">ISO 27001</span>
                    </div>
                    <div class="lp-trust-item" role="listitem">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <span class="lp-trust-label">99.9%稼働</span>
                    </div>
                    <div class="lp-trust-item" role="listitem">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <span class="lp-trust-label">24/7サポート</span>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'mobile-app-cta': {
    name: 'Mobile App CTA',
    html: `
        <section class="lp-section lp-bg-gradient-purple lp-text-white" aria-labelledby="mobile-app-title">
            <div class="lp-content-wrapper">
                <div class="lp-grid-2col lp-gap-xl lp-items-center">
                    <div>
                        <h2 id="mobile-app-title" class="lp-heading-xl lp-mb-md lp-text-white">モバイルアプリでどこでも作業</h2>
                        <p class="lp-text-lg lp-mb-lg lp-text-white-muted">iOS・Androidアプリで、外出先でも作業を継続。デスクトップと完全に同期します。</p>
                        <div class="lp-app-store-buttons">
                            <a href="#" class="lp-app-store-link" aria-label="App Storeでダウンロード">
                                <div class="lp-app-store-badge">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                    </svg>
                                    <div>
                                        <div class="lp-app-store-label">Download on the</div>
                                        <div class="lp-app-store-name">App Store</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" class="lp-app-store-link" aria-label="Google Playでダウンロード">
                                <div class="lp-app-store-badge">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626c.547.316.547 1.054 0 1.37l-2.807 1.626-2.51-2.311 2.51-2.311zM3.831 2.655L14.767 8.99 12.465 11.29 3.831 2.655z"/>
                                    </svg>
                                    <div>
                                        <div class="lp-app-store-label">GET IT ON</div>
                                        <div class="lp-app-store-name">Google Play</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="lp-text-center">
                        <img src="https://picsum.photos/400/600?random=6" alt="モバイルアプリの画面。タスク管理とチーム連携の機能が表示されている" class="lp-img-phone" loading="lazy">
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'feature-comparison': {
    name: 'Feature Comparison',
    html: `
        <section class="lp-section" aria-labelledby="feature-comparison-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="feature-comparison-title" class="lp-section-title">他社との違い</h2>
                <p class="lp-section-subtitle">なぜ当社が選ばれるのか</p>
                <div class="lp-table-wrapper lp-mt-xl">
                    <table class="lp-comparison-table" aria-label="競合他社との機能比較">
                        <thead>
                            <tr>
                                <th scope="col" class="lp-table-th lp-text-left"></th>
                                <th scope="col" class="lp-table-th lp-text-center lp-table-highlight">当社</th>
                                <th scope="col" class="lp-table-th lp-text-center">競合A</th>
                                <th scope="col" class="lp-table-th lp-text-center">競合B</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="lp-table-td lp-text-bold">AI機能</td>
                                <td class="lp-table-td lp-text-center lp-table-highlight-cell">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span class="lp-sr-only">対応</span>
                                </td>
                                <td class="lp-table-td lp-text-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-red, #ef4444)" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span class="lp-sr-only">非対応</span>
                                </td>
                                <td class="lp-table-td lp-text-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-red, #ef4444)" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span class="lp-sr-only">非対応</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="lp-table-td lp-text-bold">リアルタイム同期</td>
                                <td class="lp-table-td lp-text-center lp-table-highlight-cell">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span class="lp-sr-only">対応</span>
                                </td>
                                <td class="lp-table-td lp-text-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span class="lp-sr-only">対応</span>
                                </td>
                                <td class="lp-table-td lp-text-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-amber, #f59e0b)" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                    <span class="lp-sr-only">一部対応</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="lp-table-td lp-text-bold">モバイルアプリ</td>
                                <td class="lp-table-td lp-text-center lp-table-highlight-cell">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span class="lp-sr-only">対応</span>
                                </td>
                                <td class="lp-table-td lp-text-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-red, #ef4444)" stroke-width="2" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                    <span class="lp-sr-only">非対応</span>
                                </td>
                                <td class="lp-table-td lp-text-center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="3" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                                    <span class="lp-sr-only">対応</span>
                                </td>
                            </tr>
                            <tr>
                                <td class="lp-table-td lp-text-bold">料金</td>
                                <td class="lp-table-td lp-text-center lp-table-highlight-cell lp-text-green lp-text-bold">¥2,980~/月</td>
                                <td class="lp-table-td lp-text-center lp-text-muted">¥4,500/月</td>
                                <td class="lp-table-td lp-text-center lp-text-muted">¥3,800/月</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        `,
  },

  'security-features': {
    name: 'Security Features',
    html: `
        <section class="lp-section lp-bg-light" aria-labelledby="security-title">
            <div class="lp-content-wrapper lp-text-center">
                <h2 id="security-title" class="lp-section-title">エンタープライズレベルのセキュリティ</h2>
                <p class="lp-section-subtitle">あなたのデータを完全に保護します</p>
                <div class="lp-security-grid lp-mt-xl" role="list" aria-label="セキュリティ機能一覧">
                    <div class="lp-security-card" role="listitem">
                        <div class="lp-security-icon lp-bg-gradient-blue-dark" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <h3 class="lp-security-title">256-bit SSL/TLS暗号化</h3>
                        <p class="lp-text-muted lp-text-sm">銀行レベルの暗号化で、すべての通信を保護</p>
                    </div>
                    <div class="lp-security-card" role="listitem">
                        <div class="lp-security-icon lp-bg-gradient-green-dark" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <h3 class="lp-security-title">SOC 2 Type II準拠</h3>
                        <p class="lp-text-muted lp-text-sm">業界標準のセキュリティ監査をクリア</p>
                    </div>
                    <div class="lp-security-card" role="listitem">
                        <div class="lp-security-icon lp-bg-gradient-amber-dark" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"/><path d="M12 6v6l4 2"/>
                            </svg>
                        </div>
                        <h3 class="lp-security-title">自動バックアップ</h3>
                        <p class="lp-text-muted lp-text-sm">1時間ごとの自動バックアップで、データ損失を防止</p>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'enterprise-cta': {
    name: 'Enterprise CTA',
    html: `
        <section class="lp-section lp-bg-gradient-dark lp-text-white" aria-labelledby="enterprise-title">
            <div class="lp-content-wrapper">
                <div class="lp-max-w-lg lp-mx-auto lp-text-center">
                    <span class="lp-badge lp-badge-blue-transparent">ENTERPRISE</span>
                    <h2 id="enterprise-title" class="lp-heading-xl lp-mb-md lp-mt-md lp-text-white">大規模組織向けソリューション</h2>
                    <p class="lp-text-lg lp-mb-xl lp-text-white-muted lp-leading-relaxed">カスタマイズ可能な機能、専用サポート、SLA保証で、エンタープライズのニーズに完全対応</p>
                    <div class="lp-enterprise-features lp-mb-xl" role="list" aria-label="エンタープライズの特長">
                        <div class="lp-enterprise-feature" role="listitem">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 class="lp-enterprise-feature-title">無制限ユーザー</h4>
                                <p class="lp-text-white-subtle lp-text-sm">チーム規模に制限なし</p>
                            </div>
                        </div>
                        <div class="lp-enterprise-feature" role="listitem">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 class="lp-enterprise-feature-title">専用サポート</h4>
                                <p class="lp-text-white-subtle lp-text-sm">24/7 優先サポート</p>
                            </div>
                        </div>
                        <div class="lp-enterprise-feature" role="listitem">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 class="lp-enterprise-feature-title">カスタム開発</h4>
                                <p class="lp-text-white-subtle lp-text-sm">専用機能の開発</p>
                            </div>
                        </div>
                        <div class="lp-enterprise-feature" role="listitem">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 class="lp-enterprise-feature-title">SLA保証</h4>
                                <p class="lp-text-white-subtle lp-text-sm">99.99% 稼働保証</p>
                            </div>
                        </div>
                        <div class="lp-enterprise-feature" role="listitem">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 class="lp-enterprise-feature-title">SSO統合</h4>
                                <p class="lp-text-white-subtle lp-text-sm">シングルサインオン</p>
                            </div>
                        </div>
                        <div class="lp-enterprise-feature" role="listitem">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--lp-color-green, #10b981)" stroke-width="2" aria-hidden="true" class="lp-flex-shrink-0">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 class="lp-enterprise-feature-title">オンプレミス対応</h4>
                                <p class="lp-text-white-subtle lp-text-sm">自社環境への導入</p>
                            </div>
                        </div>
                    </div>
                    <div class="lp-btn-group lp-justify-center">
                        <button class="lp-btn lp-btn-primary lp-btn-xl">営業に相談する</button>
                        <button class="lp-btn lp-btn-outline-white lp-btn-xl">資料をダウンロード</button>
                    </div>
                </div>
            </div>
        </section>
        `,
  },
};

// Export for use in generator.js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = sectionTemplates;
}
