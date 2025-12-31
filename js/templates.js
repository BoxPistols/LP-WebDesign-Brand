// Section Templates for Landing Page Generator

const sectionTemplates = {
  'hero-1': {
    name: 'Hero Banner',
    html: `
        <section class="lp-section lp-hero lp-hero-modern">
            <div class="lp-hero-bg-pattern">
                <div class="lp-hero-gradient-orb lp-hero-orb-1"></div>
                <div class="lp-hero-gradient-orb lp-hero-orb-2"></div>
                <div class="lp-hero-gradient-orb lp-hero-orb-3"></div>
            </div>
            <div class="lp-hero-content">
                <div class="lp-hero-badge">
                    <span class="lp-badge-dot"></span>
                    <span>新機能リリース</span>
                </div>
                <h1 class="lp-hero-title lp-slide-up">
                    ビジネスの成長を<br>
                    <span class="lp-gradient-text">加速させる</span>
                </h1>
                <p class="lp-hero-subtitle">
                    最先端のテクノロジーと洗練されたデザインで、<br class="lp-hide-mobile">
                    あなたのビジョンを現実に変えます。
                </p>
                <div class="lp-hero-buttons">
                    <button class="lp-btn lp-btn-primary lp-btn-lg">
                        <span>無料で始める</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </button>
                    <button class="lp-btn lp-btn-ghost lp-btn-lg">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        <span>デモを見る</span>
                    </button>
                </div>
                <div class="lp-hero-stats">
                    <div class="lp-hero-stat">
                        <span class="lp-hero-stat-number">50K+</span>
                        <span class="lp-hero-stat-label">アクティブユーザー</span>
                    </div>
                    <div class="lp-hero-stat-divider"></div>
                    <div class="lp-hero-stat">
                        <span class="lp-hero-stat-number">99.9%</span>
                        <span class="lp-hero-stat-label">稼働率</span>
                    </div>
                    <div class="lp-hero-stat-divider"></div>
                    <div class="lp-hero-stat">
                        <span class="lp-hero-stat-number">4.9</span>
                        <span class="lp-hero-stat-label">ユーザー評価</span>
                    </div>
                </div>
            </div>
            <div class="lp-hero-visual">
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
        <section class="lp-section lp-features lp-features-modern">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <span class="lp-section-eyebrow">機能紹介</span>
                    <h2 class="lp-section-title">ビジネスを変革する<br><span class="lp-gradient-text">パワフルな機能</span></h2>
                    <p class="lp-section-subtitle">最先端のテクノロジーで、あなたのビジネスを次のレベルへ</p>
                </div>

                <div class="lp-features-grid lp-features-grid-3">
                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up">
                        <div class="lp-feature-icon-wrapper">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">高速パフォーマンス</h3>
                        <p class="lp-feature-description">最先端の技術により、驚くほど高速な処理を実現。ユーザー体験を最優先に設計されています。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up">
                        <div class="lp-feature-icon-wrapper">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">セキュアな環境</h3>
                        <p class="lp-feature-description">エンタープライズグレードのセキュリティで、あなたのデータを完全に保護します。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up">
                        <div class="lp-feature-icon-wrapper">
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
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up">
                        <div class="lp-feature-icon-wrapper">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                                <line x1="12" y1="18" x2="12.01" y2="18"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">レスポンシブ対応</h3>
                        <p class="lp-feature-description">あらゆるデバイスで完璧に動作。スマホ、タブレット、デスクトップに最適化。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up">
                        <div class="lp-feature-icon-wrapper">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                                <polyline points="22 4 12 14.01 9 11.01"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">簡単セットアップ</h3>
                        <p class="lp-feature-description">数分で始められる簡単セットアップ。技術的な知識は不要です。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </a>
                    </div>

                    <div class="lp-feature-card lp-feature-card-modern lp-slide-up">
                        <div class="lp-feature-icon-wrapper">
                            <svg class="lp-feature-icon-svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                        </div>
                        <h3 class="lp-feature-title">24/7サポート</h3>
                        <p class="lp-feature-description">いつでもどこでも、専門チームがサポート。あなたの成功をお手伝いします。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        <section class="lp-section lp-pricing lp-pricing-modern">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <span class="lp-section-eyebrow">料金プラン</span>
                    <h2 class="lp-section-title">シンプルで透明な<span class="lp-gradient-text">価格設定</span></h2>
                    <p class="lp-section-subtitle">14日間の無料トライアル。クレジットカード不要。</p>
                </div>

                <div class="lp-pricing-toggle">
                    <span class="lp-toggle-label">月額</span>
                    <label class="lp-toggle-switch">
                        <input type="checkbox">
                        <span class="lp-toggle-slider"></span>
                    </label>
                    <span class="lp-toggle-label">年額<span class="lp-discount-badge">20% OFF</span></span>
                </div>

                <div class="lp-pricing-grid lp-pricing-grid-modern">
                    <div class="lp-pricing-card lp-pricing-card-modern lp-slide-up">
                        <div class="lp-pricing-header">
                            <h3 class="lp-pricing-title">スターター</h3>
                            <p class="lp-pricing-desc">個人や小規模チーム向け</p>
                        </div>
                        <div class="lp-pricing-price-wrapper">
                            <span class="lp-pricing-currency">¥</span>
                            <span class="lp-pricing-amount">2,980</span>
                            <span class="lp-pricing-period">/月</span>
                        </div>
                        <ul class="lp-pricing-features lp-pricing-features-modern">
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                基本機能の利用
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                月間10,000リクエスト
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                メールサポート
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                1ユーザー
                            </li>
                        </ul>
                        <button class="lp-btn lp-btn-outline lp-btn-block">無料で始める</button>
                    </div>

                    <div class="lp-pricing-card lp-pricing-card-modern lp-pricing-featured lp-slide-up">
                        <div class="lp-pricing-popular">最も人気</div>
                        <div class="lp-pricing-header">
                            <h3 class="lp-pricing-title">プロフェッショナル</h3>
                            <p class="lp-pricing-desc">成長するビジネス向け</p>
                        </div>
                        <div class="lp-pricing-price-wrapper">
                            <span class="lp-pricing-currency">¥</span>
                            <span class="lp-pricing-amount">9,800</span>
                            <span class="lp-pricing-period">/月</span>
                        </div>
                        <ul class="lp-pricing-features lp-pricing-features-modern">
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                全機能の利用
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                月間100,000リクエスト
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                優先サポート
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                5ユーザーまで
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                カスタムドメイン
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                高度な分析
                            </li>
                        </ul>
                        <button class="lp-btn lp-btn-primary lp-btn-block">無料で始める</button>
                    </div>

                    <div class="lp-pricing-card lp-pricing-card-modern lp-slide-up">
                        <div class="lp-pricing-header">
                            <h3 class="lp-pricing-title">エンタープライズ</h3>
                            <p class="lp-pricing-desc">大規模組織向け</p>
                        </div>
                        <div class="lp-pricing-price-wrapper">
                            <span class="lp-pricing-custom">カスタム</span>
                        </div>
                        <ul class="lp-pricing-features lp-pricing-features-modern">
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                無制限の機能
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                無制限リクエスト
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                専任サポート
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                無制限ユーザー
                            </li>
                            <li>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        <section class="lp-section lp-testimonials lp-testimonials-modern">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <span class="lp-section-eyebrow">お客様の声</span>
                    <h2 class="lp-section-title">信頼される理由が<span class="lp-gradient-text">ここにある</span></h2>
                    <p class="lp-section-subtitle">10,000社以上の企業に選ばれています</p>
                </div>

                <div class="lp-testimonials-grid lp-testimonials-grid-modern">
                    <div class="lp-testimonial-card lp-testimonial-card-modern lp-slide-up">
                        <div class="lp-testimonial-rating">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <p class="lp-testimonial-quote">
                            「導入後3ヶ月で売上が40%向上しました。チーム全員の生産性が劇的に改善され、本当に感謝しています。」
                        </p>
                        <div class="lp-testimonial-author">
                            <div class="lp-testimonial-avatar" style="background: linear-gradient(135deg, #3b82f6, #8b5cf6);">
                                <span>山</span>
                            </div>
                            <div class="lp-testimonial-info">
                                <h4 class="lp-testimonial-name">山田 太郎</h4>
                                <p class="lp-testimonial-role">株式会社ABC / CEO</p>
                            </div>
                        </div>
                    </div>

                    <div class="lp-testimonial-card lp-testimonial-card-modern lp-slide-up">
                        <div class="lp-testimonial-rating">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <p class="lp-testimonial-quote">
                            「UIが直感的で、新しいメンバーも即座に使いこなせました。カスタマーサポートも迅速で丁寧です。」
                        </p>
                        <div class="lp-testimonial-author">
                            <div class="lp-testimonial-avatar" style="background: linear-gradient(135deg, #ec4899, #f472b6);">
                                <span>佐</span>
                            </div>
                            <div class="lp-testimonial-info">
                                <h4 class="lp-testimonial-name">佐藤 花子</h4>
                                <p class="lp-testimonial-role">XYZ株式会社 / マーケティング部長</p>
                            </div>
                        </div>
                    </div>

                    <div class="lp-testimonial-card lp-testimonial-card-modern lp-slide-up">
                        <div class="lp-testimonial-rating">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <p class="lp-testimonial-quote">
                            「APIの統合が驚くほど簡単でした。ドキュメントも充実していて、開発チームからの評価も最高です。」
                        </p>
                        <div class="lp-testimonial-author">
                            <div class="lp-testimonial-avatar" style="background: linear-gradient(135deg, #10b981, #34d399);">
                                <span>鈴</span>
                            </div>
                            <div class="lp-testimonial-info">
                                <h4 class="lp-testimonial-name">鈴木 一郎</h4>
                                <p class="lp-testimonial-role">テック株式会社 / CTO</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lp-testimonials-logos">
                    <p class="lp-logos-label">導入企業</p>
                    <div class="lp-logos-grid">
                        <div class="lp-logo-item">Company A</div>
                        <div class="lp-logo-item">Company B</div>
                        <div class="lp-logo-item">Company C</div>
                        <div class="lp-logo-item">Company D</div>
                        <div class="lp-logo-item">Company E</div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  cta: {
    name: 'Call to Action',
    html: `
        <section class="lp-section lp-cta lp-cta-modern">
            <div class="lp-cta-bg">
                <div class="lp-cta-gradient-orb lp-cta-orb-1"></div>
                <div class="lp-cta-gradient-orb lp-cta-orb-2"></div>
                <div class="lp-cta-grid-pattern"></div>
            </div>
            <div class="lp-content-wrapper lp-cta-content">
                <div class="lp-cta-badge lp-fade-in">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span>期間限定オファー</span>
                </div>
                <h2 class="lp-cta-title lp-slide-up">
                    今すぐ始めて<br>
                    <span class="lp-gradient-text-white">ビジネスを加速</span>
                </h2>
                <p class="lp-cta-description lp-fade-in">
                    無料トライアルで、すべての機能をお試しいただけます。<br>
                    クレジットカード不要、いつでもキャンセル可能。
                </p>
                <div class="lp-cta-buttons lp-slide-up">
                    <button class="lp-btn lp-btn-cta-primary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                        無料で始める
                    </button>
                    <button class="lp-btn lp-btn-cta-secondary">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polygon points="5 3 19 12 5 21 5 3"/>
                        </svg>
                        デモを見る
                    </button>
                </div>
                <div class="lp-cta-trust lp-fade-in">
                    <div class="lp-cta-trust-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                        <span>14日間無料</span>
                    </div>
                    <div class="lp-cta-trust-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span>セキュア決済</span>
                    </div>
                    <div class="lp-cta-trust-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">ギャラリー</h2>
                <p class="lp-section-subtitle">私たちの作品をご覧ください</p>

                <div class="lp-gallery-grid">
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery">
                        <img src="https://picsum.photos/400/300?random=1" alt="Gallery Image 1" loading="lazy">
                        <div class="lp-gallery-overlay">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery">
                        <img src="https://picsum.photos/400/300?random=2" alt="Gallery Image 2" loading="lazy">
                        <div class="lp-gallery-overlay">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery">
                        <img src="https://picsum.photos/400/300?random=3" alt="Gallery Image 3" loading="lazy">
                        <div class="lp-gallery-overlay">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery">
                        <img src="https://picsum.photos/400/300?random=4" alt="Gallery Image 4" loading="lazy">
                        <div class="lp-gallery-overlay">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery">
                        <img src="https://picsum.photos/400/300?random=5" alt="Gallery Image 5" loading="lazy">
                        <div class="lp-gallery-overlay">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                        </div>
                    </div>
                    <div class="lp-gallery-item lp-slide-up" data-lightbox="gallery">
                        <img src="https://picsum.photos/400/300?random=6" alt="Gallery Image 6" loading="lazy">
                        <div class="lp-gallery-overlay">
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
        <section class="lp-section lp-stats lp-stats-modern">
            <div class="lp-stats-bg">
                <div class="lp-stats-gradient-line"></div>
            </div>
            <div class="lp-content-wrapper">
                <div class="lp-stats-header lp-text-center">
                    <h2 class="lp-section-title lp-slide-up">
                        <span class="lp-gradient-text">数字</span>で見る実績
                    </h2>
                    <p class="lp-section-subtitle lp-fade-in">多くの企業様に信頼されています</p>
                </div>
                <div class="lp-stats-grid-modern">
                    <div class="lp-stat-card lp-slide-up">
                        <div class="lp-stat-icon">
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
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
                                <polyline points="17 6 23 6 23 12"/>
                            </svg>
                            <span>前年比 +42%</span>
                        </div>
                    </div>
                    <div class="lp-stat-card lp-stat-card-featured lp-slide-up">
                        <div class="lp-stat-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <div class="lp-stat-number-modern">99.9<span class="lp-stat-unit">%</span></div>
                        <div class="lp-stat-label-modern">稼働率</div>
                        <div class="lp-stat-progress">
                            <div class="lp-stat-progress-bar" style="width: 99.9%;"></div>
                        </div>
                    </div>
                    <div class="lp-stat-card lp-slide-up">
                        <div class="lp-stat-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <circle cx="12" cy="12" r="10"/>
                                <line x1="2" y1="12" x2="22" y2="12"/>
                                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                            </svg>
                        </div>
                        <div class="lp-stat-number-modern">50+</div>
                        <div class="lp-stat-label-modern">国で利用</div>
                        <div class="lp-stat-countries">
                            <span class="lp-country-dot"></span>
                            <span class="lp-country-dot"></span>
                            <span class="lp-country-dot"></span>
                            <span>+47</span>
                        </div>
                    </div>
                    <div class="lp-stat-card lp-slide-up">
                        <div class="lp-stat-icon">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                            </svg>
                        </div>
                        <div class="lp-stat-number-modern">24/7</div>
                        <div class="lp-stat-label-modern">サポート体制</div>
                        <div class="lp-stat-online">
                            <span class="lp-online-dot"></span>
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
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">チームメンバー</h2>
                <p class="lp-section-subtitle">私たちの素晴らしいチームをご紹介します</p>

                <div class="lp-team-grid">
                    <div class="lp-team-card lp-slide-up">
                        <div class="lp-team-avatar">JD</div>
                        <h3 class="lp-team-name">ジョン・ドゥ</h3>
                        <p class="lp-team-role">CEO & 創業者</p>
                        <p>ビジョンを持ってチームを率いる情熱的なリーダー</p>
                    </div>

                    <div class="lp-team-card lp-slide-up">
                        <div class="lp-team-avatar">JS</div>
                        <h3 class="lp-team-name">ジェーン・スミス</h3>
                        <p class="lp-team-role">CTO</p>
                        <p>技術革新を推進するテクノロジーエキスパート</p>
                    </div>

                    <div class="lp-team-card lp-slide-up">
                        <div class="lp-team-avatar">MJ</div>
                        <h3 class="lp-team-name">マイク・ジョンソン</h3>
                        <p class="lp-team-role">デザインディレクター</p>
                        <p>美しく使いやすいデザインを創造するクリエイター</p>
                    </div>

                    <div class="lp-team-card lp-slide-up">
                        <div class="lp-team-avatar">SW</div>
                        <h3 class="lp-team-name">サラ・ウィリアムズ</h3>
                        <p class="lp-team-role">マーケティングマネージャー</p>
                        <p>戦略的なマーケティングでビジネスを成長させる</p>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  faq: {
    name: 'FAQ Section',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">よくある質問</h2>
                <p class="lp-section-subtitle">お客様からよくいただく質問にお答えします</p>

                <div class="lp-faq-list">
                    <div class="lp-faq-item lp-slide-up">
                        <h3 class="lp-faq-question">サービスの利用開始までどのくらいかかりますか？</h3>
                        <p class="lp-faq-answer">
                            アカウント作成後、すぐにご利用いただけます。セットアップは数分で完了し、特別な技術知識は必要ありません。
                        </p>
                    </div>

                    <div class="lp-faq-item lp-slide-up">
                        <h3 class="lp-faq-question">プランの変更はいつでも可能ですか？</h3>
                        <p class="lp-faq-answer">
                            はい、いつでもプランの変更が可能です。アップグレードもダウングレードも簡単に行えます。
                        </p>
                    </div>

                    <div class="lp-faq-item lp-slide-up">
                        <h3 class="lp-faq-question">サポートはどのように受けられますか？</h3>
                        <p class="lp-faq-answer">
                            メール、チャット、電話など複数のチャネルでサポートを提供しています。プランによって24時間365日対応も可能です。
                        </p>
                    </div>

                    <div class="lp-faq-item lp-slide-up">
                        <h3 class="lp-faq-question">データのセキュリティは保証されていますか？</h3>
                        <p class="lp-faq-answer">
                            はい、エンタープライズグレードのセキュリティ対策を実施しています。データは暗号化され、定期的にバックアップされます。
                        </p>
                    </div>

                    <div class="lp-faq-item lp-slide-up">
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
        <section class="lp-section lp-contact">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">お問い合わせ</h2>
                <p class="lp-section-subtitle">お気軽にご連絡ください</p>

                <form class="lp-contact-form lp-slide-up">
                    <div class="lp-form-group">
                        <label class="lp-form-label">お名前</label>
                        <input type="text" class="lp-form-input" placeholder="山田 太郎" required>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label">メールアドレス</label>
                        <input type="email" class="lp-form-input" placeholder="your@email.com" required>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label">件名</label>
                        <input type="text" class="lp-form-input" placeholder="お問い合わせ内容" required>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label">メッセージ</label>
                        <textarea class="lp-form-textarea" placeholder="詳細をお聞かせください" required></textarea>
                    </div>

                    <button type="submit" class="lp-btn lp-btn-primary" style="width: 100%; margin-top: 20px;">
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
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">お問い合わせ</h2>
                <p class="lp-section-subtitle">ご質問やご相談はこちらから</p>

                <form class="lp-contact-form lp-form-card lp-slide-up">
                    <div class="lp-form-row">
                        <div class="lp-form-group">
                            <label class="lp-form-label required">姓</label>
                            <input type="text" class="lp-form-input" placeholder="山田" required>
                        </div>
                        <div class="lp-form-group">
                            <label class="lp-form-label required">名</label>
                            <input type="text" class="lp-form-input" placeholder="太郎" required>
                        </div>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label required">メールアドレス</label>
                        <input type="email" class="lp-form-input" placeholder="your@email.com" required>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label">電話番号</label>
                        <input type="tel" class="lp-form-input" placeholder="090-1234-5678">
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label">お問い合わせ種別</label>
                        <select class="lp-form-select">
                            <option value="">選択してください</option>
                            <option value="general">一般的なお問い合わせ</option>
                            <option value="support">サポート</option>
                            <option value="sales">お見積り・ご相談</option>
                            <option value="other">その他</option>
                        </select>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label required">メッセージ</label>
                        <textarea class="lp-form-textarea" placeholder="お問い合わせ内容を入力してください" required></textarea>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-check">
                            <input type="checkbox" required>
                            <span class="lp-form-check-label">プライバシーポリシーに同意します</span>
                        </label>
                    </div>

                    <button type="submit" class="lp-btn lp-btn-primary" style="width: 100%;">
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
        <section class="lp-section">
            <div class="lp-content-wrapper">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start;">
                    <div>
                        <h2 class="lp-section-title" style="text-align: left;">お気軽にお問い合わせください</h2>
                        <p style="color: #64748b; margin-bottom: 2rem;">ご質問やご相談がございましたら、下記フォームからお問い合わせください。担当者より2営業日以内にご連絡いたします。</p>

                        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <div style="width: 48px; height: 48px; background: #eff6ff; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #1e293b;">電話番号</div>
                                    <div style="color: #64748b;">03-1234-5678</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <div style="width: 48px; height: 48px; background: #eff6ff; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #1e293b;">メール</div>
                                    <div style="color: #64748b;">info@example.com</div>
                                </div>
                            </div>
                            <div style="display: flex; align-items: center; gap: 1rem;">
                                <div style="width: 48px; height: 48px; background: #eff6ff; border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                                </div>
                                <div>
                                    <div style="font-weight: 600; color: #1e293b;">所在地</div>
                                    <div style="color: #64748b;">東京都渋谷区〇〇 1-2-3</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <form class="lp-contact-form lp-form-card" style="margin: 0;">
                        <div class="lp-form-group">
                            <label class="lp-form-label required">お名前</label>
                            <input type="text" class="lp-form-input" placeholder="山田 太郎" required>
                        </div>

                        <div class="lp-form-group">
                            <label class="lp-form-label required">メールアドレス</label>
                            <input type="email" class="lp-form-input" placeholder="your@email.com" required>
                        </div>

                        <div class="lp-form-group">
                            <label class="lp-form-label required">メッセージ</label>
                            <textarea class="lp-form-textarea" placeholder="お問い合わせ内容" required></textarea>
                        </div>

                        <button type="submit" class="lp-btn lp-btn-primary" style="width: 100%;">
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
        <section class="lp-section" style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: white;">
            <div class="lp-content-wrapper lp-text-center" style="max-width: 600px;">
                <h2 style="font-size: 2rem; margin-bottom: 1rem;">ニュースレターを購読</h2>
                <p style="opacity: 0.9; margin-bottom: 2rem;">最新情報やお得な情報をメールでお届けします</p>

                <form class="lp-input-addon" style="max-width: 450px; margin: 0 auto;">
                    <input type="email" class="lp-form-input" placeholder="メールアドレスを入力" required style="flex: 1;">
                    <button type="submit" class="lp-btn" style="background: white; color: #3b82f6; font-weight: 600;">
                        購読する
                    </button>
                </form>

                <p style="font-size: 0.875rem; opacity: 0.7; margin-top: 1rem;">
                    いつでも購読を解除できます
                </p>
            </div>
        </section>
        `,
  },

  'login-form': {
    name: 'Login Form',
    html: `
        <section class="lp-section" style="background: #f8fafc; min-height: 600px; display: flex; align-items: center;">
            <div class="lp-content-wrapper" style="max-width: 400px; margin: 0 auto;">
                <form class="lp-contact-form lp-form-card" style="margin: 0;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">ログイン</h2>
                        <p style="color: #64748b;">アカウントにサインイン</p>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label">メールアドレス</label>
                        <div class="lp-input-group">
                            <span class="lp-input-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                            </span>
                            <input type="email" class="lp-form-input" placeholder="your@email.com" required>
                        </div>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label">パスワード</label>
                        <div class="lp-input-group">
                            <span class="lp-input-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                            </span>
                            <input type="password" class="lp-form-input" placeholder="••••••••" required>
                        </div>
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                        <label class="lp-form-check" style="margin: 0;">
                            <input type="checkbox">
                            <span class="lp-form-check-label">ログイン状態を保持</span>
                        </label>
                        <a href="#" style="color: #3b82f6; font-size: 0.875rem; text-decoration: none;">パスワードを忘れた方</a>
                    </div>

                    <button type="submit" class="lp-btn lp-btn-primary" style="width: 100%;">
                        ログイン
                    </button>

                    <p style="text-align: center; color: #64748b; margin-top: 1.5rem; font-size: 0.875rem;">
                        アカウントをお持ちでない方は <a href="#" style="color: #3b82f6; text-decoration: none;">新規登録</a>
                    </p>
                </form>
            </div>
        </section>
        `,
  },

  'signup-form': {
    name: 'Signup Form',
    html: `
        <section class="lp-section" style="background: #f8fafc; min-height: 600px; display: flex; align-items: center;">
            <div class="lp-content-wrapper" style="max-width: 450px; margin: 0 auto;">
                <form class="lp-contact-form lp-form-card" style="margin: 0;">
                    <div style="text-align: center; margin-bottom: 2rem;">
                        <h2 style="font-size: 1.5rem; margin-bottom: 0.5rem;">アカウント作成</h2>
                        <p style="color: #64748b;">無料でアカウントを作成</p>
                    </div>

                    <div class="lp-form-row">
                        <div class="lp-form-group">
                            <label class="lp-form-label">姓</label>
                            <input type="text" class="lp-form-input" placeholder="山田" required>
                        </div>
                        <div class="lp-form-group">
                            <label class="lp-form-label">名</label>
                            <input type="text" class="lp-form-input" placeholder="太郎" required>
                        </div>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label">メールアドレス</label>
                        <input type="email" class="lp-form-input" placeholder="your@email.com" required>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-label">パスワード</label>
                        <input type="password" class="lp-form-input" placeholder="8文字以上" required>
                        <p class="lp-form-hint">8文字以上、英数字を含む</p>
                    </div>

                    <div class="lp-form-group">
                        <label class="lp-form-check">
                            <input type="checkbox" required>
                            <span class="lp-form-check-label"><a href="#" style="color: #3b82f6;">利用規約</a> と <a href="#" style="color: #3b82f6;">プライバシーポリシー</a> に同意します</span>
                        </label>
                    </div>

                    <button type="submit" class="lp-btn lp-btn-primary" style="width: 100%;">
                        アカウントを作成
                    </button>

                    <div style="display: flex; align-items: center; margin: 1.5rem 0; gap: 1rem;">
                        <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
                        <span style="color: #94a3b8; font-size: 0.875rem;">または</span>
                        <div style="flex: 1; height: 1px; background: #e2e8f0;"></div>
                    </div>

                    <button type="button" class="lp-btn lp-btn-secondary" style="width: 100%; display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
                        <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
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
        <section class="lp-section lp-hero" style="background: linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(16, 185, 129, 0.9)), url('https://picsum.photos/1920/1080') center/cover; min-height: 600px;">
            <div class="lp-hero-content">
                <h1 class="lp-slide-up">ビデオで伝える、未来のストーリー</h1>
                <p>動画で魅力を最大限に引き出します</p>
                <div class="lp-hero-buttons">
                    <button class="lp-btn lp-btn-primary">動画を見る</button>
                </div>
            </div>
        </section>
        `,
  },

  'hero-minimal': {
    name: 'Minimal Hero',
    html: `
        <section class="lp-section" style="padding: 120px 20px; text-align: center;">
            <div class="lp-content-wrapper" style="max-width: 800px; margin: 0 auto;">
                <h1 class="lp-slide-up" style="font-size: 3.5rem; font-weight: 300; margin-bottom: 1.5rem;">Simple. Powerful. Elegant.</h1>
                <p style="font-size: 1.25rem; color: #64748b; margin-bottom: 2rem;">シンプルさの中に、強力な機能を。</p>
                <button class="lp-btn lp-btn-primary">始める</button>
            </div>
        </section>
        `,
  },

  'hero-gradient': {
    name: 'Gradient Hero',
    html: `
        <section class="lp-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center;">
            <div class="lp-hero-content">
                <h1 class="lp-slide-up">未来を創造する</h1>
                <p>革新的なソリューションで、ビジネスを変革</p>
                <div class="lp-hero-buttons">
                    <button class="lp-btn lp-btn-primary" style="background: white; color: #667eea;">無料で試す</button>
                    <button class="lp-btn lp-btn-secondary" style="border-color: white; color: white;">詳細</button>
                </div>
            </div>
        </section>
        `,
  },

  'hero-split-image': {
    name: 'Split Image Hero',
    html: `
        <section class="lp-section" style="padding: 0;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; gap: 0;">
                <div style="padding: 80px 60px; display: flex; flex-direction: column; justify-content: center;">
                    <h1 style="font-size: 2.5rem; margin-bottom: 1.5rem;">ビジネスを加速させる</h1>
                    <p style="font-size: 1.1rem; color: #64748b; margin-bottom: 2rem;">効率的なツールで、生産性を最大化</p>
                    <div style="display: flex; gap: 1rem;">
                        <button class="lp-btn lp-btn-primary">今すぐ開始</button>
                        <button class="lp-btn lp-btn-secondary">デモを見る</button>
                    </div>
                </div>
                <div style="background: url('https://picsum.photos/800/600') center/cover;"></div>
            </div>
        </section>
        `,
  },

  'hero-fullscreen': {
    name: 'Fullscreen Hero',
    html: `
        <section class="lp-section" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('https://picsum.photos/1920/1080') center/cover; color: white;">
            <div class="lp-hero-content" style="text-align: center;">
                <h1 class="lp-slide-up" style="font-size: 4rem; margin-bottom: 1.5rem;">Welcome to the Future</h1>
                <p style="font-size: 1.5rem; margin-bottom: 2.5rem;">革新と創造の世界へようこそ</p>
                <button class="lp-btn lp-btn-primary" style="padding: 1rem 3rem; font-size: 1.1rem;">探索を始める</button>
            </div>
        </section>
        `,
  },

  // ===== CONTENT SECTIONS =====
  'content-left': {
    name: 'Content + Image (Left)',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                    <div>
                        <h2 class="lp-section-title" style="text-align: left;">強力な機能で効率アップ</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #64748b;">私たちのプラットフォームは、最新のテクノロジーを活用して、あなたのビジネスを次のレベルへと導きます。直感的なインターフェースと強力な機能で、作業効率を劇的に向上させます。</p>
                        <button class="lp-btn lp-btn-primary" style="margin-top: 1.5rem;">詳しく見る</button>
                    </div>
                    <div>
                        <img src="https://picsum.photos/600/400" alt="Feature" style="width: 100%; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'content-right': {
    name: 'Content + Image (Right)',
    html: `
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                    <div>
                        <img src="https://picsum.photos/600/400?random=2" alt="Feature" style="width: 100%; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    </div>
                    <div>
                        <h2 class="lp-section-title" style="text-align: left;">データ駆動の意思決定</h2>
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #64748b;">リアルタイムの分析とインサイトで、ビジネスの成長を加速。データに基づいた戦略的な意思決定をサポートします。</p>
                        <ul style="margin-top: 1.5rem; list-style: none; padding: 0;">
                            <li style="padding: 0.5rem 0; color: #334155;"><strong>✓</strong> リアルタイム分析</li>
                            <li style="padding: 0.5rem 0; color: #334155;"><strong>✓</strong> カスタムレポート</li>
                            <li style="padding: 0.5rem 0; color: #334155;"><strong>✓</strong> データビジュアライゼーション</li>
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
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center" style="max-width: 800px; margin: 0 auto;">
                <h2 class="lp-section-title">なぜ私たちを選ぶのか</h2>
                <p style="font-size: 1.2rem; line-height: 1.8; color: #64748b; margin-bottom: 2rem;">10年以上の実績と、数千社のクライアントから信頼されているプラットフォーム。業界をリードする技術と、dedicated support teamで、あなたの成功を支援します。</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; text-align: center;">
                    <div>
                        <div style="font-size: 2.5rem; font-weight: 700; color: #3b82f6;">10,000+</div>
                        <div style="color: #64748b; margin-top: 0.5rem;">満足した顧客</div>
                    </div>
                    <div>
                        <div style="font-size: 2.5rem; font-weight: 700; color: #10b981;">99.9%</div>
                        <div style="color: #64748b; margin-top: 0.5rem;">稼働時間</div>
                    </div>
                    <div>
                        <div style="font-size: 2.5rem; font-weight: 700; color: #f59e0b;">24/7</div>
                        <div style="color: #64748b; margin-top: 0.5rem;">サポート</div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'quote-section': {
    name: 'Quote/Blockquote',
    html: `
        <section class="lp-section" style="background: #1e293b; color: white; padding: 80px 20px;">
            <div class="lp-content-wrapper lp-text-center" style="max-width: 900px; margin: 0 auto;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor" style="opacity: 0.3; margin-bottom: 2rem;">
                    <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                </svg>
                <blockquote style="font-size: 1.8rem; font-weight: 300; line-height: 1.6; margin-bottom: 2rem; font-style: italic;">
                    このプラットフォームのおかげで、私たちのビジネスは飛躍的に成長しました。直感的で強力なツールが、チーム全体の生産性を向上させてくれています。
                </blockquote>
                <div style="font-size: 1.1rem; opacity: 0.8;">
                    <strong>田中 太郎</strong> - CEO, Tech Solutions Inc.
                </div>
            </div>
        </section>
        `,
  },

  'video-section': {
    name: 'Video Section',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">動画で見る製品紹介</h2>
                <p class="lp-section-subtitle">2分で分かる、私たちのソリューション</p>
                <div style="max-width: 900px; margin: 3rem auto; position: relative; padding-bottom: 56.25%; height: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.15);">
                    <img src="https://picsum.photos/1600/900" alt="Video Thumbnail" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,0.9); width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" style="color: #3b82f6; margin-left: 4px;">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'logo-cloud': {
    name: 'Logo Cloud',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <p style="font-size: 0.9rem; text-transform: uppercase; letter-spacing: 2px; color: #64748b; margin-bottom: 2rem;">信頼されている企業</p>
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 3rem; align-items: center; opacity: 0.6;">
                    <div style="font-size: 1.5rem; font-weight: 700; color: #1e293b;">COMPANY A</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #1e293b;">BRAND B</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #1e293b;">CORP C</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #1e293b;">TECH D</div>
                    <div style="font-size: 1.5rem; font-weight: 700; color: #1e293b;">GLOBAL E</div>
                </div>
            </div>
        </section>
        `,
  },

  'steps-horizontal': {
    name: 'Steps Horizontal',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">簡単3ステップ</h2>
                <p class="lp-section-subtitle">今すぐ始められる、シンプルなプロセス</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; margin-top: 4rem;">
                    <div class="lp-slide-up">
                        <div style="width: 60px; height: 60px; background: #eff6ff; color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; margin: 0 auto 1.5rem;">1</div>
                        <h3 style="font-size: 1.3rem; margin-bottom: 1rem;">アカウント作成</h3>
                        <p style="color: #64748b;">メールアドレスだけで、簡単にアカウントを作成できます。</p>
                    </div>
                    <div class="lp-slide-up">
                        <div style="width: 60px; height: 60px; background: #eff6ff; color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; margin: 0 auto 1.5rem;">2</div>
                        <h3 style="font-size: 1.3rem; margin-bottom: 1rem;">設定</h3>
                        <p style="color: #64748b;">直感的なウィザードで、必要な設定を完了。</p>
                    </div>
                    <div class="lp-slide-up">
                        <div style="width: 60px; height: 60px; background: #eff6ff; color: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: 700; margin: 0 auto 1.5rem;">3</div>
                        <h3 style="font-size: 1.3rem; margin-bottom: 1rem;">開始</h3>
                        <p style="color: #64748b;">すぐに使い始められます。成果を実感してください。</p>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'benefits-grid': {
    name: 'Benefits Grid',
    html: `
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">導入のメリット</h2>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem; margin-top: 3rem; text-align: left;">
                    <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="width: 48px; height: 48px; background: #eff6ff; color: #3b82f6; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">コスト削減</h3>
                        <p style="color: #64748b;">運用コストを最大60%削減。ROIを最大化します。</p>
                    </div>
                    <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="width: 48px; height: 48px; background: #ecfdf5; color: #10b981; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                            </svg>
                        </div>
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">生産性向上</h3>
                        <p style="color: #64748b;">チームの生産性が平均40%向上。作業時間を大幅短縮。</p>
                    </div>
                    <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="width: 48px; height: 48px; background: #fef3c7; color: #f59e0b; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">セキュリティ強化</h3>
                        <p style="color: #64748b;">エンタープライズレベルのセキュリティで安心。</p>
                    </div>
                    <div style="background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="width: 48px; height: 48px; background: #fce7f3; color: #ec4899; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
                            </svg>
                        </div>
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">スケーラビリティ</h3>
                        <p style="color: #64748b;">ビジネスの成長に合わせて柔軟にスケール可能。</p>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'comparison-table': {
    name: 'Comparison Table',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">プラン比較</h2>
                <p class="lp-section-subtitle">最適なプランを見つけましょう</p>
                <div style="overflow-x: auto; margin-top: 3rem;">
                    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="padding: 1.5rem; text-align: left; font-weight: 600;">機能</th>
                                <th style="padding: 1.5rem; text-align: center; font-weight: 600;">スターター</th>
                                <th style="padding: 1.5rem; text-align: center; font-weight: 600; background: #eff6ff; color: #3b82f6;">プロ</th>
                                <th style="padding: 1.5rem; text-align: center; font-weight: 600;">エンタープライズ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-top: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem;">ユーザー数</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">1</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; background: #f8fafc;">5</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">無制限</td>
                            </tr>
                            <tr style="border-top: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem;">ストレージ</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">10GB</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; background: #f8fafc;">100GB</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">無制限</td>
                            </tr>
                            <tr style="border-top: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem;">サポート</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">メール</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; background: #f8fafc;">優先</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">専用</td>
                            </tr>
                            <tr style="border-top: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem;">API アクセス</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">-</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; background: #f8fafc;">✓</td>
                                <td style="padding: 1rem 1.5rem; text-align: center;">✓</td>
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
        <section class="lp-section" style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 60px 20px;">
            <div class="lp-content-wrapper" style="display: flex; align-items: center; justify-content: space-between; gap: 2rem;">
                <div>
                    <h2 style="font-size: 2rem; margin-bottom: 0.5rem; color: white;">今すぐ始めましょう</h2>
                    <p style="font-size: 1.1rem; opacity: 0.9;">無料トライアルで、すべての機能をお試しください。</p>
                </div>
                <div style="flex-shrink: 0;">
                    <button class="lp-btn" style="background: white; color: #3b82f6; padding: 1rem 2.5rem; font-size: 1.1rem; font-weight: 600;">無料で始める</button>
                </div>
            </div>
        </section>
        `,
  },

  'cta-centered': {
    name: 'CTA Centered',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center" style="max-width: 700px; margin: 0 auto;">
                <h2 class="lp-section-title">準備はできましたか？</h2>
                <p style="font-size: 1.2rem; color: #64748b; margin-bottom: 2.5rem;">今すぐ始めて、ビジネスを次のレベルへ。クレジットカード不要。</p>
                <div style="display: flex; gap: 1rem; justify-content: center;">
                    <button class="lp-btn lp-btn-primary" style="padding: 1rem 2.5rem;">無料トライアル</button>
                    <button class="lp-btn lp-btn-secondary" style="padding: 1rem 2.5rem;">デモを予約</button>
                </div>
                <p style="font-size: 0.9rem; color: #94a3b8; margin-top: 1.5rem;">14日間の無料トライアル · クレジットカード不要</p>
            </div>
        </section>
        `,
  },

  'features-list': {
    name: 'Features List',
    html: `
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                    <div>
                        <h2 class="lp-section-title" style="text-align: left;">すべてが揃っています</h2>
                        <p style="color: #64748b; margin-bottom: 2rem;">成功に必要な、すべての機能を提供します。</p>
                        <div style="display: flex; flex-direction: column; gap: 1rem;">
                            <div style="display: flex; gap: 1rem; align-items: start;">
                                <div style="flex-shrink: 0; width: 24px; height: 24px; background: #10b981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 0.2rem;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;">無制限のプロジェクト</h3>
                                    <p style="color: #64748b; font-size: 0.95rem;">プロジェクト数に制限なし。自由に作成できます。</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 1rem; align-items: start;">
                                <div style="flex-shrink: 0; width: 24px; height: 24px; background: #10b981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 0.2rem;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;">リアルタイム同期</h3>
                                    <p style="color: #64748b; font-size: 0.95rem;">チーム全員がリアルタイムで共同作業できます。</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 1rem; align-items: start;">
                                <div style="flex-shrink: 0; width: 24px; height: 24px; background: #10b981; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 0.2rem;">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                                        <polyline points="20 6 9 17 4 12"/>
                                    </svg>
                                </div>
                                <div>
                                    <h3 style="font-size: 1.1rem; margin-bottom: 0.25rem;">高度な分析</h3>
                                    <p style="color: #64748b; font-size: 0.95rem;">詳細な分析レポートで、インサイトを獲得。</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src="https://picsum.photos/600/500?random=3" alt="Features" style="width: 100%; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.1);">
                    </div>
                </div>
            </div>
        </section>
        `,
  },
  'alert-banner': {
    name: 'Alert Banner',
    html: `
        <section style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 1.5rem 2rem;">
            <div class="lp-content-wrapper" style="display: flex; align-items: center; gap: 1rem;">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <div style="flex: 1;">
                    <strong style="color: #78350f;">重要なお知らせ:</strong>
                    <span style="color: #92400e; margin-left: 0.5rem;">期間限定で、全プラン30%オフ！</span>
                </div>
                <button class="lp-btn lp-btn-primary" style="padding: 0.5rem 1.5rem;">詳細</button>
            </div>
        </section>
        `,
  },

  'accordion-faq': {
    name: 'Accordion FAQ',
    html: `
        <section class="lp-section lp-faq-modern">
            <div class="lp-content-wrapper">
                <div class="lp-faq-header lp-text-center">
                    <div class="lp-section-badge lp-fade-in">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                            <line x1="12" y1="17" x2="12.01" y2="17"/>
                        </svg>
                        <span>FAQ</span>
                    </div>
                    <h2 class="lp-section-title lp-slide-up">よくある質問</h2>
                    <p class="lp-section-subtitle lp-fade-in">お客様からよくいただくご質問にお答えします</p>
                </div>
                <div class="lp-faq-grid">
                    <div class="lp-faq-item lp-slide-up">
                        <details class="lp-faq-details">
                            <summary class="lp-faq-summary">
                                <span class="lp-faq-question">無料トライアルはありますか？</span>
                                <span class="lp-faq-icon">
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
                                <span class="lp-faq-icon">
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
                                <span class="lp-faq-icon">
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
                                <span class="lp-faq-icon">
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
                                <span class="lp-faq-icon">
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
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper" style="max-width: 900px; margin: 0 auto;">
                <div style="background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); text-align: center;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem;">最新情報をお届けします</h3>
                    <p style="color: #64748b; margin-bottom: 2rem;">製品アップデートやヒントを週1回お届けします</p>
                    <form style="display: flex; gap: 1rem; max-width: 500px; margin: 0 auto;">
                        <input type="email" placeholder="メールアドレス" style="flex: 1; padding: 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 1rem;">
                        <button class="lp-btn lp-btn-primary" style="padding: 0.75rem 2rem;">登録</button>
                    </form>
                    <p style="font-size: 0.85rem; color: #94a3b8; margin-top: 1rem;">いつでも配信停止できます。</p>
                </div>
            </div>
        </section>
        `,
  },

  'app-screenshot': {
    name: 'App Screenshot',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">美しいインターフェース</h2>
                <p class="lp-section-subtitle">直感的で使いやすいデザイン</p>
                <div style="margin-top: 3rem;">
                    <img src="https://picsum.photos/1200/700" alt="App Screenshot" style="width: 100%; max-width: 1000px; border-radius: 12px; box-shadow: 0 25px 50px rgba(0,0,0,0.15);">
                </div>
            </div>
        </section>
        `,
  },

  'feature-tabs': {
    name: 'Feature Tabs',
    html: `
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">主要機能</h2>
                <div style="margin-top: 3rem;">
                    <div style="display: flex; gap: 1rem; justify-content: center; margin-bottom: 3rem; flex-wrap: wrap;">
                        <button style="padding: 0.75rem 1.5rem; background: #3b82f6; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">ダッシュボード</button>
                        <button style="padding: 0.75rem 1.5rem; background: white; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 8px; font-weight: 600; cursor: pointer;">分析</button>
                        <button style="padding: 0.75rem 1.5rem; background: white; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 8px; font-weight: 600; cursor: pointer;">レポート</button>
                        <button style="padding: 0.75rem 1.5rem; background: white; color: #1e293b; border: 1px solid #e2e8f0; border-radius: 8px; font-weight: 600; cursor: pointer;">設定</button>
                    </div>
                    <div style="background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                        <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">リアルタイムダッシュボード</h3>
                        <p style="color: #64748b; margin-bottom: 2rem;">ビジネスの重要な指標を一目で確認。カスタマイズ可能なウィジェットで、必要な情報だけを表示できます。</p>
                        <img src="https://picsum.photos/800/400" alt="Dashboard" style="width: 100%; border-radius: 8px;">
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'social-links': {
    name: 'Social Links',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">フォローしてください</h2>
                <p class="lp-section-subtitle">最新情報はSNSで</p>
                <div style="display: flex; gap: 1.5rem; justify-content: center; margin-top: 2.5rem;">
                    <a href="#" style="width: 48px; height: 48px; background: #1da1f2; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: transform 0.2s;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                    </a>
                    <a href="#" style="width: 48px; height: 48px; background: #4267B2; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: transform 0.2s;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                        </svg>
                    </a>
                    <a href="#" style="width: 48px; height: 48px; background: #E4405F; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: transform 0.2s;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                    </a>
                    <a href="#" style="width: 48px; height: 48px; background: #0077b5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none; transition: transform 0.2s;">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
                        </svg>
                    </a>
                </div>
            </div>
        </section>
        `,
  },

  'awards-badges': {
    name: 'Awards & Badges',
    html: `
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">受賞歴</h2>
                <p class="lp-section-subtitle">業界から認められた実績</p>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; margin-top: 3rem;">
                    <div style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; box-shadow: 0 8px 16px rgba(251, 191, 36, 0.3);">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                        </div>
                        <h4 style="font-size: 0.9rem; font-weight: 600;">Best Product 2024</h4>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; box-shadow: 0 8px 16px rgba(59, 130, 246, 0.3);">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <circle cx="12" cy="8" r="7"/><path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12"/>
                            </svg>
                        </div>
                        <h4 style="font-size: 0.9rem; font-weight: 600;">Top Rated</h4>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #34d399 0%, #10b981 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; box-shadow: 0 8px 16px rgba(16, 185, 129, 0.3);">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                        <h4 style="font-size: 0.9rem; font-weight: 600;">Certified</h4>
                    </div>
                    <div style="text-align: center;">
                        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f472b6 0%, #ec4899 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; box-shadow: 0 8px 16px rgba(236, 72, 153, 0.3);">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="white">
                                <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
                            </svg>
                        </div>
                        <h4 style="font-size: 0.9rem; font-weight: 600;">Innovation Award</h4>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'metrics-counter': {
    name: 'Metrics Counter',
    html: `
        <section class="lp-section" style="background: #1e293b; color: white;">
            <div class="lp-content-wrapper">
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 3rem; text-align: center;">
                    <div>
                        <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(135deg, #3b82f6, #10b981); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">500K+</div>
                        <div style="font-size: 1.1rem; opacity: 0.8;">Active Users</div>
                    </div>
                    <div>
                        <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(135deg, #10b981, #3b82f6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">150+</div>
                        <div style="font-size: 1.1rem; opacity: 0.8;">Countries</div>
                    </div>
                    <div>
                        <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(135deg, #f59e0b, #ef4444); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">99.9%</div>
                        <div style="font-size: 1.1rem; opacity: 0.8;">Uptime</div>
                    </div>
                    <div>
                        <div style="font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem; background: linear-gradient(135deg, #ec4899, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">4.9/5</div>
                        <div style="font-size: 1.1rem; opacity: 0.8;">Rating</div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'integration-logos': {
    name: 'Integrations',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">連携サービス</h2>
                <p class="lp-section-subtitle">お気に入りのツールと簡単に連携</p>
                <div style="display: grid; grid-template-columns: repeat(6, 1fr); gap: 2rem; margin-top: 3rem;">
                    <div style="padding: 1.5rem; background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;">
                        <div style="font-weight: 700; color: #64748b;">Slack</div>
                    </div>
                    <div style="padding: 1.5rem; background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;">
                        <div style="font-weight: 700; color: #64748b;">Google</div>
                    </div>
                    <div style="padding: 1.5rem; background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;">
                        <div style="font-weight: 700; color: #64748b;">Stripe</div>
                    </div>
                    <div style="padding: 1.5rem; background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;">
                        <div style="font-weight: 700; color: #64748b;">Zoom</div>
                    </div>
                    <div style="padding: 1.5rem; background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;">
                        <div style="font-weight: 700; color: #64748b;">Dropbox</div>
                    </div>
                    <div style="padding: 1.5rem; background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer;">
                        <div style="font-weight: 700; color: #64748b;">GitHub</div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'before-after': {
    name: 'Before/After',
    html: `
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">導入前後の変化</h2>
                <p class="lp-section-subtitle">実際の成果をご覧ください</p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem; text-align: left;">
                    <div>
                        <div style="background: #fee2e2; color: #991b1b; padding: 0.5rem 1rem; border-radius: 8px; display: inline-block; margin-bottom: 1.5rem; font-weight: 600;">Before</div>
                        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                            <li style="display: flex; align-items: start; gap: 0.75rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                <span style="color: #1e293b;">手動でデータ入力、時間がかかる</span>
                            </li>
                            <li style="display: flex; align-items: start; gap: 0.75rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                <span style="color: #1e293b;">エラーが多発、品質に問題</span>
                            </li>
                            <li style="display: flex; align-items: start; gap: 0.75rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                                <span style="color: #1e293b;">チーム間の連携が不十分</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <div style="background: #dcfce7; color: #166534; padding: 0.5rem 1rem; border-radius: 8px; display: inline-block; margin-bottom: 1.5rem; font-weight: 600;">After</div>
                        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: 1rem;">
                            <li style="display: flex; align-items: start; gap: 0.75rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                <span style="color: #1e293b;">自動化で作業時間を70%削減</span>
                            </li>
                            <li style="display: flex; align-items: start; gap: 0.75rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                <span style="color: #1e293b;">エラー率を95%改善、高品質</span>
                            </li>
                            <li style="display: flex; align-items: start; gap: 0.75rem;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                                <span style="color: #1e293b;">リアルタイム同期でチーム連携</span>
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
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">製品ロードマップ</h2>
                <p class="lp-section-subtitle">今後の開発予定</p>
                <div style="max-width: 900px; margin: 3rem auto;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
                        <div style="text-align: center;">
                            <div style="background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 8px; display: inline-block; margin-bottom: 1rem; font-weight: 600;">Q1 2024 ✓</div>
                            <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">基盤強化</h3>
                            <ul style="list-style: none; padding: 0; color: #64748b; font-size: 0.95rem; text-align: left;">
                                <li style="padding: 0.5rem 0;">✓ パフォーマンス最適化</li>
                                <li style="padding: 0.5rem 0;">✓ UI/UX刷新</li>
                                <li style="padding: 0.5rem 0;">✓ モバイルアプリリリース</li>
                            </ul>
                        </div>
                        <div style="text-align: center;">
                            <div style="background: #3b82f6; color: white; padding: 0.5rem 1rem; border-radius: 8px; display: inline-block; margin-bottom: 1rem; font-weight: 600;">Q2 2024 →</div>
                            <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">機能拡充</h3>
                            <ul style="list-style: none; padding: 0; color: #64748b; font-size: 0.95rem; text-align: left;">
                                <li style="padding: 0.5rem 0;">• AI機能統合</li>
                                <li style="padding: 0.5rem 0;">• 高度な分析機能</li>
                                <li style="padding: 0.5rem 0;">• API v2リリース</li>
                            </ul>
                        </div>
                        <div style="text-align: center;">
                            <div style="background: #e2e8f0; color: #64748b; padding: 0.5rem 1rem; border-radius: 8px; display: inline-block; margin-bottom: 1rem; font-weight: 600;">Q3 2024</div>
                            <h3 style="font-size: 1.2rem; margin-bottom: 1rem;">グローバル展開</h3>
                            <ul style="list-style: none; padding: 0; color: #64748b; font-size: 0.95rem; text-align: left;">
                                <li style="padding: 0.5rem 0;">• 多言語対応</li>
                                <li style="padding: 0.5rem 0;">• グローバルCDN</li>
                                <li style="padding: 0.5rem 0;">• コンプライアンス対応</li>
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
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">お客様の声</h2>
                <p class="lp-section-subtitle">実際にご利用いただいているお客様のレビュー</p>
                <div style="max-width: 700px; margin: 3rem auto; background: white; padding: 3rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="#3b82f6" style="margin-bottom: 1.5rem;">
                        <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z"/>
                    </svg>
                    <p style="font-size: 1.2rem; line-height: 1.8; color: #1e293b; margin-bottom: 2rem;">このツールを導入してから、チームの生産性が劇的に向上しました。特に自動化機能が素晴らしく、手作業が大幅に削減されています。</p>
                    <div style="display: flex; align-items: center; justify-content: center; gap: 1rem;">
                        <img src="https://i.pravatar.cc/60?img=1" alt="User" style="width: 60px; height: 60px; border-radius: 50%;">
                        <div style="text-align: left;">
                            <div style="font-weight: 600; color: #1e293b;">佐藤 花子</div>
                            <div style="color: #64748b; font-size: 0.9rem;">プロジェクトマネージャー, ABC Corporation</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'job-openings': {
    name: 'Job Openings',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">採用情報</h2>
                <p class="lp-section-subtitle">一緒に働く仲間を募集しています</p>
                <div style="max-width: 800px; margin: 3rem auto; text-align: left;">
                    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e2e8f0'">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">フロントエンドエンジニア</h3>
                                <div style="color: #64748b; font-size: 0.9rem; margin-bottom: 1rem;">東京 · フルタイム · React</div>
                            </div>
                            <button class="lp-btn lp-btn-secondary" style="padding: 0.5rem 1.5rem;">応募する</button>
                        </div>
                    </div>
                    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; margin-bottom: 1rem; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e2e8f0'">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">バックエンドエンジニア</h3>
                                <div style="color: #64748b; font-size: 0.9rem; margin-bottom: 1rem;">リモート · フルタイム · Node.js</div>
                            </div>
                            <button class="lp-btn lp-btn-secondary" style="padding: 0.5rem 1.5rem;">応募する</button>
                        </div>
                    </div>
                    <div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; transition: all 0.2s; cursor: pointer;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='#e2e8f0'">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <h3 style="font-size: 1.2rem; margin-bottom: 0.5rem;">プロダクトデザイナー</h3>
                                <div style="color: #64748b; font-size: 0.9rem; margin-bottom: 1rem;">大阪 · フルタイム · Figma</div>
                            </div>
                            <button class="lp-btn lp-btn-secondary" style="padding: 0.5rem 1.5rem;">応募する</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },
  'feature-highlight': {
    name: 'Feature Highlight',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper">
                <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center;">
                    <div>
                        <div style="background: #eff6ff; color: #3b82f6; padding: 0.5rem 1rem; border-radius: 8px; display: inline-block; margin-bottom: 1.5rem; font-weight: 600; font-size: 0.9rem;">新機能</div>
                        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; line-height: 1.2;">AI搭載の自動化エンジン</h2>
                        <p style="font-size: 1.1rem; color: #64748b; margin-bottom: 2rem; line-height: 1.8;">機械学習を活用した予測分析で、ビジネスの意思決定をサポート。過去のデータから最適な施策を提案します。</p>
                        <div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
                            <div>
                                <div style="font-size: 2rem; font-weight: 700; color: #10b981;">85%</div>
                                <div style="color: #64748b; font-size: 0.9rem;">精度向上</div>
                            </div>
                            <div>
                                <div style="font-size: 2rem; font-weight: 700; color: #3b82f6;">3x</div>
                                <div style="color: #64748b; font-size: 0.9rem;">処理速度</div>
                            </div>
                        </div>
                        <button class="lp-btn lp-btn-primary">詳しく見る</button>
                    </div>
                    <div>
                        <img src="https://picsum.photos/500/500?random=5" alt="AI Feature" style="width: 100%; border-radius: 12px; box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'pricing-toggle': {
    name: 'Pricing with Toggle',
    html: `
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">シンプルな料金体系</h2>
                <p class="lp-section-subtitle">年間払いで20%お得</p>
                <div class="lp-pricing-toggle">
                    <span class="lp-toggle-label">月払い</span>
                    <label class="lp-toggle-switch">
                        <input type="checkbox">
                        <span class="lp-toggle-slider"></span>
                    </label>
                    <span class="lp-toggle-label">年払い<span class="lp-discount-badge">20% OFF</span></span>
                </div>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem; max-width: 1000px; margin-left: auto; margin-right: auto;">
                    <div style="background: white; padding: 2rem; border-radius: 12px; border: 2px solid #e2e8f0;">
                        <h3 style="font-size: 1.3rem; margin-bottom: 1rem;">ベーシック</h3>
                        <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem;">¥2,400<span style="font-size: 1rem; font-weight: 400; color: #64748b;">/月</span></div>
                        <div style="color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem;">年払い ¥28,800</div>
                        <button class="lp-btn lp-btn-secondary" style="width: 100%; margin-bottom: 1.5rem;">選択する</button>
                        <ul style="list-style: none; padding: 0; text-align: left; color: #64748b; font-size: 0.95rem;">
                            <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9;">✓ 5プロジェクト</li>
                            <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9;">✓ 10GB ストレージ</li>
                            <li style="padding: 0.5rem 0;">✓ メールサポート</li>
                        </ul>
                    </div>
                    <div style="background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%); color: white; padding: 2rem; border-radius: 12px; position: relative; transform: scale(1.05); box-shadow: 0 20px 40px rgba(59, 130, 246, 0.3);">
                        <div style="position: absolute; top: -12px; right: 20px; background: #10b981; color: white; padding: 0.5rem 1rem; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">人気</div>
                        <h3 style="font-size: 1.3rem; margin-bottom: 1rem;">プロ</h3>
                        <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem;">¥7,840<span style="font-size: 1rem; font-weight: 400; opacity: 0.8;">/月</span></div>
                        <div style="opacity: 0.8; font-size: 0.9rem; margin-bottom: 1.5rem;">年払い ¥94,080</div>
                        <button class="lp-btn" style="width: 100%; margin-bottom: 1.5rem; background: white; color: #3b82f6;">選択する</button>
                        <ul style="list-style: none; padding: 0; text-align: left; font-size: 0.95rem;">
                            <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.2);">✓ 無制限プロジェクト</li>
                            <li style="padding: 0.5rem 0; border-bottom: 1px solid rgba(255,255,255,0.2);">✓ 100GB ストレージ</li>
                            <li style="padding: 0.5rem 0;">✓ 優先サポート</li>
                        </ul>
                    </div>
                    <div style="background: white; padding: 2rem; border-radius: 12px; border: 2px solid #e2e8f0;">
                        <h3 style="font-size: 1.3rem; margin-bottom: 1rem;">エンタープライズ</h3>
                        <div style="font-size: 2.5rem; font-weight: 700; margin-bottom: 0.5rem;">カスタム</div>
                        <div style="color: #64748b; font-size: 0.9rem; margin-bottom: 1.5rem;">お問い合わせください</div>
                        <button class="lp-btn lp-btn-secondary" style="width: 100%; margin-bottom: 1.5rem;">お問い合わせ</button>
                        <ul style="list-style: none; padding: 0; text-align: left; color: #64748b; font-size: 0.95rem;">
                            <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9;">✓ 無制限すべて</li>
                            <li style="padding: 0.5rem 0; border-bottom: 1px solid #f1f5f9;">✓ 専用サポート</li>
                            <li style="padding: 0.5rem 0;">✓ カスタム機能</li>
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
        <section class="lp-section" style="background: #1e293b; color: white; padding: 3rem 20px;">
            <div class="lp-content-wrapper">
                <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 3rem; align-items: center; text-align: center;">
                    <div>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 0.5rem;">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                        </svg>
                        <div style="font-size: 0.9rem; opacity: 0.8;">SSL暗号化</div>
                    </div>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 0.5rem;">
                            <polyline points="20 6 9 17 4 12"/>
                        </svg>
                        <div style="font-size: 0.9rem; opacity: 0.8;">GDPR準拠</div>
                    </div>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 0.5rem;">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <div style="font-size: 0.9rem; opacity: 0.8;">ISO 27001</div>
                    </div>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 0.5rem;">
                            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"/><polyline points="12 6 12 12 16 14"/>
                        </svg>
                        <div style="font-size: 0.9rem; opacity: 0.8;">99.9%稼働</div>
                    </div>
                    <div>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-bottom: 0.5rem;">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                        </svg>
                        <div style="font-size: 0.9rem; opacity: 0.8;">24/7サポート</div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'mobile-app-cta': {
    name: 'Mobile App CTA',
    html: `
        <section class="lp-section" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <div class="lp-content-wrapper">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: center;">
                    <div>
                        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: white;">モバイルアプリでどこでも作業</h2>
                        <p style="font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.9;">iOS・Androidアプリで、外出先でも作業を継続。デスクトップと完全に同期します。</p>
                        <div style="display: flex; gap: 1rem;">
                            <a href="#" style="display: inline-block;">
                                <div style="background: #1e293b; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; display: flex; align-items: center; gap: 0.75rem;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                                    </svg>
                                    <div>
                                        <div style="font-size: 0.7rem; opacity: 0.8;">Download on the</div>
                                        <div style="font-size: 1.1rem; font-weight: 600;">App Store</div>
                                    </div>
                                </div>
                            </a>
                            <a href="#" style="display: inline-block;">
                                <div style="background: #1e293b; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; display: flex; align-items: center; gap: 0.75rem;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626c.547.316.547 1.054 0 1.37l-2.807 1.626-2.51-2.311 2.51-2.311zM3.831 2.655L14.767 8.99 12.465 11.29 3.831 2.655z"/>
                                    </svg>
                                    <div>
                                        <div style="font-size: 0.7rem; opacity: 0.8;">GET IT ON</div>
                                        <div style="font-size: 1.1rem; font-weight: 600;">Google Play</div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div style="text-align: center;">
                        <img src="https://picsum.photos/400/600?random=6" alt="Mobile App" style="max-width: 300px; border-radius: 24px; box-shadow: 0 30px 60px rgba(0,0,0,0.3);">
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'feature-comparison': {
    name: 'Feature Comparison',
    html: `
        <section class="lp-section">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">他社との違い</h2>
                <p class="lp-section-subtitle">なぜ当社が選ばれるのか</p>
                <div style="overflow-x: auto; margin-top: 3rem;">
                    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="padding: 1.5rem; text-align: left; font-weight: 600;"></th>
                                <th style="padding: 1.5rem; text-align: center; font-weight: 600; background: #eff6ff; color: #3b82f6;">当社</th>
                                <th style="padding: 1.5rem; text-align: center; font-weight: 600;">競合A</th>
                                <th style="padding: 1.5rem; text-align: center; font-weight: 600;">競合B</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-top: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem; font-weight: 500;">AI機能</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; background: #f8fafc;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" style="display: inline;"><polyline points="20 6 9 17 4 12"/></svg></td>
                                <td style="padding: 1rem 1.5rem; text-align: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" style="display: inline;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></td>
                                <td style="padding: 1rem 1.5rem; text-align: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" style="display: inline;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></td>
                            </tr>
                            <tr style="border-top: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem; font-weight: 500;">リアルタイム同期</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; background: #f8fafc;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" style="display: inline;"><polyline points="20 6 9 17 4 12"/></svg></td>
                                <td style="padding: 1rem 1.5rem; text-align: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" style="display: inline;"><polyline points="20 6 9 17 4 12"/></svg></td>
                                <td style="padding: 1rem 1.5rem; text-align: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2" style="display: inline;"><line x1="5" y1="12" x2="19" y2="12"/></svg></td>
                            </tr>
                            <tr style="border-top: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem; font-weight: 500;">モバイルアプリ</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; background: #f8fafc;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" style="display: inline;"><polyline points="20 6 9 17 4 12"/></svg></td>
                                <td style="padding: 1rem 1.5rem; text-align: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" style="display: inline;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></td>
                                <td style="padding: 1rem 1.5rem; text-align: center;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="3" style="display: inline;"><polyline points="20 6 9 17 4 12"/></svg></td>
                            </tr>
                            <tr style="border-top: 1px solid #e2e8f0;">
                                <td style="padding: 1rem 1.5rem; font-weight: 500;">料金</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; background: #f8fafc; color: #10b981; font-weight: 600;">¥2,980~/月</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; color: #64748b;">¥4,500/月</td>
                                <td style="padding: 1rem 1.5rem; text-align: center; color: #64748b;">¥3,800/月</td>
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
        <section class="lp-section" style="background: #f8fafc;">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">エンタープライズレベルのセキュリティ</h2>
                <p class="lp-section-subtitle">あなたのデータを完全に保護します</p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-top: 3rem;">
                    <div style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #3b82f6, #1e40af); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.75rem;">256-bit SSL/TLS暗号化</h3>
                        <p style="color: #64748b; font-size: 0.95rem;">銀行レベルの暗号化で、すべての通信を保護</p>
                    </div>
                    <div style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #10b981, #059669); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                            </svg>
                        </div>
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.75rem;">SOC 2 Type II準拠</h3>
                        <p style="color: #64748b; font-size: 0.95rem;">業界標準のセキュリティ監査をクリア</p>
                    </div>
                    <div style="background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                        <div style="width: 64px; height: 64px; background: linear-gradient(135deg, #f59e0b, #d97706); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"/><path d="M12 6v6l4 2"/>
                            </svg>
                        </div>
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.75rem;">自動バックアップ</h3>
                        <p style="color: #64748b; font-size: 0.95rem;">1時間ごとの自動バックアップで、データ損失を防止</p>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'enterprise-cta': {
    name: 'Enterprise CTA',
    html: `
        <section class="lp-section" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white;">
            <div class="lp-content-wrapper">
                <div style="max-width: 900px; margin: 0 auto; text-align: center;">
                    <div style="background: rgba(59, 130, 246, 0.2); color: #60a5fa; padding: 0.5rem 1rem; border-radius: 20px; display: inline-block; margin-bottom: 1.5rem; font-weight: 600; font-size: 0.9rem;">ENTERPRISE</div>
                    <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem; color: white;">大規模組織向けソリューション</h2>
                    <p style="font-size: 1.2rem; margin-bottom: 3rem; opacity: 0.9; line-height: 1.8;">カスタマイズ可能な機能、専用サポート、SLA保証で、エンタープライズのニーズに完全対応</p>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 3rem; text-align: left;">
                        <div style="display: flex; gap: 1rem; align-items: start;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 style="margin-bottom: 0.5rem; color: white;">無制限ユーザー</h4>
                                <p style="opacity: 0.7; font-size: 0.9rem;">チーム規模に制限なし</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: start;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 style="margin-bottom: 0.5rem; color: white;">専用サポート</h4>
                                <p style="opacity: 0.7; font-size: 0.9rem;">24/7 優先サポート</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: start;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 style="margin-bottom: 0.5rem; color: white;">カスタム開発</h4>
                                <p style="opacity: 0.7; font-size: 0.9rem;">専用機能の開発</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: start;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 style="margin-bottom: 0.5rem; color: white;">SLA保証</h4>
                                <p style="opacity: 0.7; font-size: 0.9rem;">99.99% 稼働保証</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: start;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 style="margin-bottom: 0.5rem; color: white;">SSO統合</h4>
                                <p style="opacity: 0.7; font-size: 0.9rem;">シングルサインオン</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem; align-items: start;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" style="flex-shrink: 0; margin-top: 0.2rem;">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                            <div>
                                <h4 style="margin-bottom: 0.5rem; color: white;">オンプレミス対応</h4>
                                <p style="opacity: 0.7; font-size: 0.9rem;">自社環境への導入</p>
                            </div>
                        </div>
                    </div>
                    <div style="display: flex; gap: 1.5rem; justify-content: center;">
                        <button class="lp-btn lp-btn-primary" style="padding: 1rem 2.5rem; font-size: 1.1rem;">営業に相談する</button>
                        <button class="lp-btn lp-btn-secondary" style="padding: 1rem 2.5rem; font-size: 1.1rem; background: transparent; border: 2px solid rgba(255,255,255,0.3); color: white;">資料をダウンロード</button>
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
