// Advanced Section Templates
// Extended collection with modern, interactive components
// アクセシビリティ・セマンティクス・CSSクラスベースのスタイリング対応

const advancedTemplates = {
  // ========== HERO VARIATIONS ==========

  'hero-split': {
    name: 'Hero Split Layout',
    category: 'hero',
    html: `
        <section class="lp-section lp-hero-split" aria-label="メインビジュアル">
            <div class="lp-content-wrapper">
                <div class="lp-split-container">
                    <div class="lp-split-content lp-slide-up">
                        <span class="lp-badge" role="status">新登場</span>
                        <h1 class="lp-hero-title">次世代のソリューション</h1>
                        <p class="lp-hero-description">
                            革新的なテクノロジーで、ビジネスの可能性を最大限に引き出します。
                            今すぐ始めて、未来を創造しましょう。
                        </p>
                        <div class="lp-hero-buttons">
                            <button class="lp-btn lp-btn-primary lp-btn-lg lp-hover-lift" aria-label="無料で始める">
                                無料で始める
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                                </svg>
                            </button>
                            <button class="lp-btn lp-btn-outline lp-btn-lg lp-hover-lift" aria-label="デモを見る">デモを見る</button>
                        </div>
                        <dl class="lp-hero-stats" aria-label="サービス実績">
                            <div class="lp-stat-item">
                                <dt class="lp-sr-only">アクティブユーザー数</dt>
                                <dd>
                                    <strong>10,000+</strong>
                                    <span>アクティブユーザー</span>
                                </dd>
                            </div>
                            <div class="lp-stat-item">
                                <dt class="lp-sr-only">稼働率</dt>
                                <dd>
                                    <strong>99.9%</strong>
                                    <span>稼働率</span>
                                </dd>
                            </div>
                            <div class="lp-stat-item">
                                <dt class="lp-sr-only">サポート体制</dt>
                                <dd>
                                    <strong>24/7</strong>
                                    <span>サポート</span>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div class="lp-split-visual lp-slide-up">
                        <div class="lp-visual-card">
                            <div class="lp-visual-gradient" aria-hidden="true"></div>
                            <img src="https://picsum.photos/600/700?random=hero" alt="サービスのメインビジュアル画像" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'hero-animated': {
    name: 'Animated Hero',
    category: 'hero',
    html: `
        <section class="lp-section lp-hero-animated" aria-label="メインビジュアル">
            <div class="lp-animated-bg" aria-hidden="true">
                <div class="lp-floating-shape lp-shape-1"></div>
                <div class="lp-floating-shape lp-shape-2"></div>
                <div class="lp-floating-shape lp-shape-3"></div>
            </div>
            <div class="lp-content-wrapper lp-text-center">
                <div class="lp-hero-content-animated">
                    <h1 class="lp-hero-title-xl lp-slide-up">
                        革新的な体験を<br>あなたの手に
                    </h1>
                    <p class="lp-hero-subtitle lp-slide-up">
                        最先端のテクノロジーとデザインが融合した、まったく新しいソリューション
                    </p>
                    <div class="lp-hero-cta-group lp-slide-up">
                        <button class="lp-btn lp-btn-gradient lp-btn-xl lp-hover-lift" aria-label="今すぐ体験する">
                            今すぐ体験する
                        </button>
                        <p class="lp-cta-note" aria-label="補足情報">クレジットカード不要 ・ 無料トライアル</p>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  // ========== FEATURE VARIATIONS ==========

  'features-cards-hover': {
    name: 'Interactive Feature Cards',
    category: 'features',
    html: `
        <section class="lp-section lp-features-modern" aria-labelledby="features-heading">
            <div class="lp-content-wrapper">
                <header class="lp-section-header lp-text-center">
                    <span class="lp-section-badge">機能</span>
                    <h2 id="features-heading" class="lp-section-title-modern">すべてが揃っています</h2>
                    <p class="lp-section-description">
                        あなたのビジネスを成功に導く、パワフルな機能の数々
                    </p>
                </header>
                <div class="lp-features-grid-modern" role="list">
                    <article class="lp-feature-card-hover lp-hover-lift" role="listitem">
                        <div class="lp-feature-icon-modern" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>超高速パフォーマンス</h3>
                        <p>最適化されたコードベースで、ページロード時間を最小化。ユーザー体験を最優先に設計されています。</p>
                        <a href="#" class="lp-feature-link" aria-label="超高速パフォーマンスについて詳しく見る">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                            </svg>
                        </a>
                    </article>
                    <article class="lp-feature-card-hover lp-hover-lift" role="listitem">
                        <div class="lp-feature-icon-modern" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>エンタープライズセキュリティ</h3>
                        <p>銀行レベルの暗号化とセキュリティ対策で、データを完全に保護します。</p>
                        <a href="#" class="lp-feature-link" aria-label="エンタープライズセキュリティについて詳しく見る">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                            </svg>
                        </a>
                    </article>
                    <article class="lp-feature-card-hover lp-hover-lift" role="listitem">
                        <div class="lp-feature-icon-modern" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                                <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <h3>リアルタイム同期</h3>
                        <p>すべてのデバイスで瞬時に同期。チーム全体で常に最新の情報を共有できます。</p>
                        <a href="#" class="lp-feature-link" aria-label="リアルタイム同期について詳しく見る">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                            </svg>
                        </a>
                    </article>
                    <article class="lp-feature-card-hover lp-hover-lift" role="listitem">
                        <div class="lp-feature-icon-modern" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke-width="2"/>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="12" y1="22.08" x2="12" y2="12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>スケーラブルアーキテクチャ</h3>
                        <p>小規模から大規模まで、成長に合わせて柔軟にスケールできます。</p>
                        <a href="#" class="lp-feature-link" aria-label="スケーラブルアーキテクチャについて詳しく見る">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                            </svg>
                        </a>
                    </article>
                    <article class="lp-feature-card-hover lp-hover-lift" role="listitem">
                        <div class="lp-feature-icon-modern" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="14 2 14 8 20 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="16" y1="13" x2="8" y2="13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="16" y1="17" x2="8" y2="17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="10 9 9 9 8 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>詳細なドキュメント</h3>
                        <p>充実したドキュメントとチュートリアルで、すぐに始められます。</p>
                        <a href="#" class="lp-feature-link" aria-label="詳細なドキュメントについて詳しく見る">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                            </svg>
                        </a>
                    </article>
                    <article class="lp-feature-card-hover lp-hover-lift" role="listitem">
                        <div class="lp-feature-icon-modern" aria-hidden="true">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="9" cy="7" r="4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>チームコラボレーション</h3>
                        <p>チーム全体で効率的に作業できる、強力なコラボレーション機能。</p>
                        <a href="#" class="lp-feature-link" aria-label="チームコラボレーションについて詳しく見る">
                            詳しく見る
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                            </svg>
                        </a>
                    </article>
                </div>
            </div>
        </section>
        `,
  },

  'features-timeline': {
    name: 'Feature Timeline',
    category: 'features',
    html: `
        <section class="lp-section lp-features-timeline" aria-labelledby="timeline-heading">
            <div class="lp-content-wrapper">
                <header class="lp-section-header lp-text-center">
                    <h2 id="timeline-heading" class="lp-section-title-modern">成功への道のり</h2>
                    <p class="lp-section-description">4つのステップで始める</p>
                </header>
                <ol class="lp-timeline" role="list">
                    <li class="lp-timeline-item lp-slide-up">
                        <div class="lp-timeline-marker" aria-hidden="true">1</div>
                        <div class="lp-timeline-content">
                            <h3>アカウント作成</h3>
                            <p>メールアドレスだけで、30秒で始められます。クレジットカードは不要です。</p>
                        </div>
                    </li>
                    <li class="lp-timeline-item lp-slide-up">
                        <div class="lp-timeline-marker" aria-hidden="true">2</div>
                        <div class="lp-timeline-content">
                            <h3>プロジェクト設定</h3>
                            <p>直感的なインターフェースで、プロジェクトを簡単にセットアップ。ガイドがサポートします。</p>
                        </div>
                    </li>
                    <li class="lp-timeline-item lp-slide-up">
                        <div class="lp-timeline-marker" aria-hidden="true">3</div>
                        <div class="lp-timeline-content">
                            <h3>チーム招待</h3>
                            <p>チームメンバーを招待して、コラボレーションを開始。権限管理も簡単です。</p>
                        </div>
                    </li>
                    <li class="lp-timeline-item lp-slide-up">
                        <div class="lp-timeline-marker" aria-hidden="true">4</div>
                        <div class="lp-timeline-content">
                            <h3>成果を実感</h3>
                            <p>すぐに効果が実感できます。生産性の向上を体験してください。</p>
                        </div>
                    </li>
                </ol>
            </div>
        </section>
        `,
  },

  // ========== SOCIAL PROOF ==========

  'social-proof': {
    name: 'Social Proof Section',
    category: 'testimonials',
    html: `
        <section class="lp-section lp-social-proof" aria-label="導入企業">
            <div class="lp-content-wrapper lp-text-center">
                <p class="lp-trust-text">世界中の企業から信頼されています</p>
                <div class="lp-logo-grid" role="list" aria-label="パートナー企業一覧">
                    <div class="lp-logo-item lp-hover-lift" role="listitem">
                        <div class="lp-logo-placeholder" aria-label="Company A">COMPANY A</div>
                    </div>
                    <div class="lp-logo-item lp-hover-lift" role="listitem">
                        <div class="lp-logo-placeholder" aria-label="Company B">COMPANY B</div>
                    </div>
                    <div class="lp-logo-item lp-hover-lift" role="listitem">
                        <div class="lp-logo-placeholder" aria-label="Company C">COMPANY C</div>
                    </div>
                    <div class="lp-logo-item lp-hover-lift" role="listitem">
                        <div class="lp-logo-placeholder" aria-label="Company D">COMPANY D</div>
                    </div>
                    <div class="lp-logo-item lp-hover-lift" role="listitem">
                        <div class="lp-logo-placeholder" aria-label="Company E">COMPANY E</div>
                    </div>
                    <div class="lp-logo-item lp-hover-lift" role="listitem">
                        <div class="lp-logo-placeholder" aria-label="Company F">COMPANY F</div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'testimonials-carousel': {
    name: 'Testimonials Carousel',
    category: 'testimonials',
    html: `
        <section class="lp-section lp-testimonials-carousel" aria-labelledby="testimonials-heading">
            <div class="lp-content-wrapper">
                <header class="lp-section-header lp-text-center">
                    <h2 id="testimonials-heading" class="lp-section-title-modern">お客様の声</h2>
                    <p class="lp-section-description">多くのお客様に選ばれています</p>
                </header>
                <div class="lp-carousel-container">
                    <article class="lp-testimonial-card-featured lp-hover-lift">
                        <div class="lp-testimonial-rating" role="img" aria-label="5つ星評価">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="lp-icon-star" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="lp-icon-star" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="lp-icon-star" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="lp-icon-star" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="lp-icon-star" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        </div>
                        <blockquote class="lp-testimonial-quote-large">
                            <p>「このサービスを導入してから、チームの生産性が3倍に向上しました。
                            直感的なUIと強力な機能のおかげで、複雑な作業も簡単にこなせます。」</p>
                        </blockquote>
                        <footer class="lp-testimonial-author-featured">
                            <div class="lp-author-avatar">
                                <img src="https://i.pravatar.cc/100?img=1" alt="田中 太郎の顔写真" loading="lazy" />
                            </div>
                            <div class="lp-author-info">
                                <cite>田中 太郎</cite>
                                <p>株式会社テックイノベーション・CEO</p>
                            </div>
                        </footer>
                    </article>
                    <div class="lp-testimonial-grid-compact" role="list">
                        <article class="lp-testimonial-card-small lp-hover-lift" role="listitem">
                            <blockquote><p>「最高のツールです！」</p></blockquote>
                            <footer class="lp-author-compact">
                                <img src="https://i.pravatar.cc/50?img=2" alt="佐藤 花子の顔写真" loading="lazy" />
                                <cite>佐藤 花子</cite>
                            </footer>
                        </article>
                        <article class="lp-testimonial-card-small lp-hover-lift" role="listitem">
                            <blockquote><p>「コスパ最強！おすすめです」</p></blockquote>
                            <footer class="lp-author-compact">
                                <img src="https://i.pravatar.cc/50?img=3" alt="鈴木 一郎の顔写真" loading="lazy" />
                                <cite>鈴木 一郎</cite>
                            </footer>
                        </article>
                        <article class="lp-testimonial-card-small lp-hover-lift" role="listitem">
                            <blockquote><p>「サポートが素晴らしい」</p></blockquote>
                            <footer class="lp-author-compact">
                                <img src="https://i.pravatar.cc/50?img=4" alt="山田 次郎の顔写真" loading="lazy" />
                                <cite>山田 次郎</cite>
                            </footer>
                        </article>
                        <article class="lp-testimonial-card-small lp-hover-lift" role="listitem">
                            <blockquote><p>「使いやすさ抜群！」</p></blockquote>
                            <footer class="lp-author-compact">
                                <img src="https://i.pravatar.cc/50?img=5" alt="伊藤 美咲の顔写真" loading="lazy" />
                                <cite>伊藤 美咲</cite>
                            </footer>
                        </article>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  // ========== PRICING VARIATIONS ==========

  'pricing-modern': {
    name: 'Modern Pricing Table',
    category: 'pricing',
    html: `
        <section class="lp-section lp-pricing-modern" aria-labelledby="pricing-heading">
            <div class="lp-content-wrapper">
                <header class="lp-section-header lp-text-center">
                    <h2 id="pricing-heading" class="lp-section-title-modern">シンプルな料金プラン</h2>
                    <p class="lp-section-description">あなたに最適なプランを選択してください</p>
                    <div class="lp-pricing-toggle" role="group" aria-label="料金表示切り替え">
                        <span id="pricing-monthly-label">月額</span>
                        <label class="lp-toggle-switch">
                            <input type="checkbox" aria-labelledby="pricing-monthly-label pricing-yearly-label" />
                            <span class="lp-toggle-slider" aria-hidden="true"></span>
                        </label>
                        <span id="pricing-yearly-label">年額 <span class="lp-discount-badge" role="status">20% OFF</span></span>
                    </div>
                </header>
                <div class="lp-pricing-grid-modern" role="list">
                    <article class="lp-pricing-card-modern lp-hover-lift" role="listitem" aria-label="スタータープラン">
                        <header class="lp-pricing-header">
                            <h3>スターター</h3>
                            <p>個人・小規模チーム向け</p>
                        </header>
                        <div class="lp-pricing-price-modern">
                            <span class="lp-price-currency">¥</span>
                            <span class="lp-price-amount">0</span>
                            <span class="lp-price-period">/月</span>
                        </div>
                        <ul class="lp-pricing-features-modern" aria-label="スタータープランの機能一覧">
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>基本機能</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>1ユーザー</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>5GBストレージ</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>コミュニティサポート</li>
                        </ul>
                        <button class="lp-btn lp-btn-outline lp-btn-block lp-hover-lift" aria-label="スタータープランで始める">始める</button>
                    </article>

                    <article class="lp-pricing-card-modern lp-pricing-featured lp-hover-lift" role="listitem" aria-label="プロフェッショナルプラン（おすすめ）">
                        <div class="lp-pricing-badge-modern" role="status">人気</div>
                        <header class="lp-pricing-header">
                            <h3>プロフェッショナル</h3>
                            <p>成長中のビジネス向け</p>
                        </header>
                        <div class="lp-pricing-price-modern">
                            <span class="lp-price-currency">¥</span>
                            <span class="lp-price-amount">9,800</span>
                            <span class="lp-price-period">/月</span>
                        </div>
                        <ul class="lp-pricing-features-modern" aria-label="プロフェッショナルプランの機能一覧">
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>全機能利用可能</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>10ユーザーまで</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>100GBストレージ</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>優先サポート</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>高度な分析</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>API アクセス</li>
                        </ul>
                        <button class="lp-btn lp-btn-primary lp-btn-block lp-hover-lift" aria-label="プロフェッショナルプランを今すぐ始める">今すぐ始める</button>
                    </article>

                    <article class="lp-pricing-card-modern lp-hover-lift" role="listitem" aria-label="エンタープライズプラン">
                        <header class="lp-pricing-header">
                            <h3>エンタープライズ</h3>
                            <p>大規模組織向け</p>
                        </header>
                        <div class="lp-pricing-price-modern">
                            <span class="lp-price-amount-custom">カスタム</span>
                        </div>
                        <ul class="lp-pricing-features-modern" aria-label="エンタープライズプランの機能一覧">
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>無制限の機能</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>無制限ユーザー</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>カスタムストレージ</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>専任サポート</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>SLA保証</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>カスタム統合</li>
                        </ul>
                        <button class="lp-btn lp-btn-outline lp-btn-block lp-hover-lift" aria-label="エンタープライズプランについてお問い合わせ">お問い合わせ</button>
                    </article>
                </div>
            </div>
        </section>
        `,
  },

  // ========== CTA VARIATIONS ==========

  'cta-split': {
    name: 'Split CTA Section',
    category: 'cta',
    html: `
        <section class="lp-section lp-cta-split" aria-labelledby="cta-heading">
            <div class="lp-content-wrapper">
                <div class="lp-cta-container">
                    <div class="lp-cta-content lp-slide-up">
                        <h2 id="cta-heading">今すぐ始めて、<br>未来を創造しよう</h2>
                        <p>14日間の無料トライアルで、すべての機能をお試しいただけます。</p>
                        <ul class="lp-cta-features" aria-label="トライアルの特徴">
                            <li>
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                                クレジットカード不要
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                                いつでもキャンセル可能
                            </li>
                            <li>
                                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" class="lp-icon-check" aria-hidden="true"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>
                                30秒で始められます
                            </li>
                        </ul>
                        <div class="lp-cta-actions">
                            <button class="lp-btn lp-btn-primary lp-btn-lg lp-hover-lift" aria-label="無料で始める">無料で始める</button>
                            <button class="lp-btn lp-btn-outline-white lp-btn-lg lp-hover-lift" aria-label="デモを予約する">デモを予約</button>
                        </div>
                    </div>
                    <div class="lp-cta-visual" aria-hidden="true">
                        <div class="lp-cta-image-wrapper">
                            <img src="https://picsum.photos/500/600?random=cta" alt="サービスイメージ画像" loading="lazy" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  // ========== NEWSLETTER ==========

  newsletter: {
    name: 'Newsletter Signup',
    category: 'cta',
    html: `
        <section class="lp-section lp-newsletter" aria-labelledby="newsletter-heading">
            <div class="lp-content-wrapper">
                <div class="lp-newsletter-container lp-slide-up">
                    <div class="lp-newsletter-icon" aria-hidden="true">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <polyline points="22,6 12,13 2,6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3 id="newsletter-heading">最新情報をお届けします</h3>
                    <p>製品アップデート、ヒント、特別なオファーを受け取りましょう</p>
                    <form class="lp-newsletter-form" aria-label="ニュースレター登録">
                        <label for="newsletter-email" class="lp-sr-only">メールアドレス</label>
                        <input id="newsletter-email" type="email" placeholder="メールアドレスを入力" required autocomplete="email" />
                        <button type="submit" class="lp-btn lp-btn-primary lp-hover-lift">購読する</button>
                    </form>
                    <p class="lp-newsletter-note">いつでも配信停止できます。プライバシーポリシーに同意したものとみなされます。</p>
                </div>
            </div>
        </section>
        `,
  },
};

// Merge with existing templates
if (typeof sectionTemplates !== 'undefined') {
  Object.assign(sectionTemplates, advancedTemplates);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = advancedTemplates;
}
