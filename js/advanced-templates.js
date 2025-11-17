// Advanced Section Templates
// Extended collection with modern, interactive components

const advancedTemplates = {
    // ========== HERO VARIATIONS ==========

    'hero-split': {
        name: 'Hero Split Layout',
        category: 'hero',
        html: `
        <section class="lp-section lp-hero-split">
            <div class="lp-content-wrapper">
                <div class="lp-split-container">
                    <div class="lp-split-content ds-animate-slide-right">
                        <span class="lp-badge">新登場</span>
                        <h1 class="lp-hero-title">次世代のソリューション</h1>
                        <p class="lp-hero-description">
                            革新的なテクノロジーで、ビジネスの可能性を最大限に引き出します。
                            今すぐ始めて、未来を創造しましょう。
                        </p>
                        <div class="lp-hero-buttons">
                            <button class="lp-btn lp-btn-primary lp-btn-lg">
                                無料で始める
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"/>
                                </svg>
                            </button>
                            <button class="lp-btn lp-btn-outline lp-btn-lg">デモを見る</button>
                        </div>
                        <div class="lp-hero-stats">
                            <div class="lp-stat-item">
                                <strong>10,000+</strong>
                                <span>アクティブユーザー</span>
                            </div>
                            <div class="lp-stat-item">
                                <strong>99.9%</strong>
                                <span>稼働率</span>
                            </div>
                            <div class="lp-stat-item">
                                <strong>24/7</strong>
                                <span>サポート</span>
                            </div>
                        </div>
                    </div>
                    <div class="lp-split-visual ds-animate-slide-left">
                        <div class="lp-visual-card">
                            <div class="lp-visual-gradient"></div>
                            <img src="https://picsum.photos/600/700?random=hero" alt="Hero Visual" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    'hero-animated': {
        name: 'Animated Hero',
        category: 'hero',
        html: `
        <section class="lp-section lp-hero-animated">
            <div class="lp-animated-bg">
                <div class="lp-floating-shape lp-shape-1"></div>
                <div class="lp-floating-shape lp-shape-2"></div>
                <div class="lp-floating-shape lp-shape-3"></div>
            </div>
            <div class="lp-content-wrapper lp-text-center">
                <div class="lp-hero-content-animated">
                    <h1 class="lp-hero-title-xl ds-animate-fade-in">
                        革新的な体験を<br>あなたの手に
                    </h1>
                    <p class="lp-hero-subtitle ds-animate-slide-up">
                        最先端のテクノロジーとデザインが融合した、まったく新しいソリューション
                    </p>
                    <div class="lp-hero-cta-group ds-animate-scale-up">
                        <button class="lp-btn lp-btn-gradient lp-btn-xl">
                            今すぐ体験する
                        </button>
                        <p class="lp-cta-note">クレジットカード不要 • 無料トライアル</p>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    // ========== FEATURE VARIATIONS ==========

    'features-cards-hover': {
        name: 'Interactive Feature Cards',
        category: 'features',
        html: `
        <section class="lp-section lp-features-modern">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <span class="lp-section-badge">機能</span>
                    <h2 class="lp-section-title-modern">すべてが揃っています</h2>
                    <p class="lp-section-description">
                        あなたのビジネスを成功に導く、パワフルな機能の数々
                    </p>
                </div>
                <div class="lp-features-grid-modern">
                    <div class="lp-feature-card-hover">
                        <div class="lp-feature-icon-modern">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>超高速パフォーマンス</h3>
                        <p>最適化されたコードベースで、ページロード時間を最小化。ユーザー体験を最優先に設計されています。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る →
                        </a>
                    </div>
                    <div class="lp-feature-card-hover">
                        <div class="lp-feature-icon-modern">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>エンタープライズセキュリティ</h3>
                        <p>銀行レベルの暗号化とセキュリティ対策で、データを完全に保護します。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る →
                        </a>
                    </div>
                    <div class="lp-feature-card-hover">
                        <div class="lp-feature-icon-modern">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" stroke-width="2"/>
                                <path d="M12 6v6l4 2" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <h3>リアルタイム同期</h3>
                        <p>すべてのデバイスで瞬時に同期。チーム全体で常に最新の情報を共有できます。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る →
                        </a>
                    </div>
                    <div class="lp-feature-card-hover">
                        <div class="lp-feature-icon-modern">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke-width="2"/>
                                <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="12" y1="22.08" x2="12" y2="12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>スケーラブルアーキテクチャ</h3>
                        <p>小規模から大規模まで、成長に合わせて柔軟にスケールできます。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る →
                        </a>
                    </div>
                    <div class="lp-feature-card-hover">
                        <div class="lp-feature-icon-modern">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="14 2 14 8 20 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="16" y1="13" x2="8" y2="13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <line x1="16" y1="17" x2="8" y2="17" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <polyline points="10 9 9 9 8 9" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>詳細なドキュメント</h3>
                        <p>充実したドキュメントとチュートリアルで、すぐに始められます。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る →
                        </a>
                    </div>
                    <div class="lp-feature-card-hover">
                        <div class="lp-feature-icon-modern">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <circle cx="9" cy="7" r="4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <h3>チームコラボレーション</h3>
                        <p>チーム全体で効率的に作業できる、強力なコラボレーション機能。</p>
                        <a href="#" class="lp-feature-link">
                            詳しく見る →
                        </a>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    'features-timeline': {
        name: 'Feature Timeline',
        category: 'features',
        html: `
        <section class="lp-section lp-features-timeline">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <h2 class="lp-section-title-modern">成功への道のり</h2>
                    <p class="lp-section-description">4つのステップで始める</p>
                </div>
                <div class="lp-timeline">
                    <div class="lp-timeline-item">
                        <div class="lp-timeline-marker">1</div>
                        <div class="lp-timeline-content">
                            <h3>アカウント作成</h3>
                            <p>メールアドレスだけで、30秒で始められます。クレジットカードは不要です。</p>
                        </div>
                    </div>
                    <div class="lp-timeline-item">
                        <div class="lp-timeline-marker">2</div>
                        <div class="lp-timeline-content">
                            <h3>プロジェクト設定</h3>
                            <p>直感的なインターフェースで、プロジェクトを簡単にセットアップ。ガイドがサポートします。</p>
                        </div>
                    </div>
                    <div class="lp-timeline-item">
                        <div class="lp-timeline-marker">3</div>
                        <div class="lp-timeline-content">
                            <h3>チーム招待</h3>
                            <p>チームメンバーを招待して、コラボレーションを開始。権限管理も簡単です。</p>
                        </div>
                    </div>
                    <div class="lp-timeline-item">
                        <div class="lp-timeline-marker">4</div>
                        <div class="lp-timeline-content">
                            <h3>成果を実感</h3>
                            <p>すぐに効果が実感できます。生産性の向上を体験してください。</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    // ========== SOCIAL PROOF ==========

    'social-proof': {
        name: 'Social Proof Section',
        category: 'testimonials',
        html: `
        <section class="lp-section lp-social-proof">
            <div class="lp-content-wrapper lp-text-center">
                <p class="lp-trust-text">世界中の企業から信頼されています</p>
                <div class="lp-logo-grid">
                    <div class="lp-logo-item">
                        <div class="lp-logo-placeholder">COMPANY A</div>
                    </div>
                    <div class="lp-logo-item">
                        <div class="lp-logo-placeholder">COMPANY B</div>
                    </div>
                    <div class="lp-logo-item">
                        <div class="lp-logo-placeholder">COMPANY C</div>
                    </div>
                    <div class="lp-logo-item">
                        <div class="lp-logo-placeholder">COMPANY D</div>
                    </div>
                    <div class="lp-logo-item">
                        <div class="lp-logo-placeholder">COMPANY E</div>
                    </div>
                    <div class="lp-logo-item">
                        <div class="lp-logo-placeholder">COMPANY F</div>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    'testimonials-carousel': {
        name: 'Testimonials Carousel',
        category: 'testimonials',
        html: `
        <section class="lp-section lp-testimonials-carousel">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <h2 class="lp-section-title-modern">お客様の声</h2>
                    <p class="lp-section-description">多くのお客様に選ばれています</p>
                </div>
                <div class="lp-carousel-container">
                    <div class="lp-testimonial-card-featured">
                        <div class="lp-testimonial-rating">
                            ⭐⭐⭐⭐⭐
                        </div>
                        <blockquote class="lp-testimonial-quote-large">
                            「このサービスを導入してから、チームの生産性が3倍に向上しました。
                            直感的なUIと強力な機能のおかげで、複雑な作業も簡単にこなせます。」
                        </blockquote>
                        <div class="lp-testimonial-author-featured">
                            <div class="lp-author-avatar">
                                <img src="https://i.pravatar.cc/100?img=1" alt="Author" />
                            </div>
                            <div class="lp-author-info">
                                <h4>田中 太郎</h4>
                                <p>株式会社テックイノベーション・CEO</p>
                            </div>
                        </div>
                    </div>
                    <div class="lp-testimonial-grid-compact">
                        <div class="lp-testimonial-card-small">
                            <p>「最高のツールです！」</p>
                            <div class="lp-author-compact">
                                <img src="https://i.pravatar.cc/50?img=2" alt="Author" />
                                <span>佐藤 花子</span>
                            </div>
                        </div>
                        <div class="lp-testimonial-card-small">
                            <p>「コスパ最強！おすすめです」</p>
                            <div class="lp-author-compact">
                                <img src="https://i.pravatar.cc/50?img=3" alt="Author" />
                                <span>鈴木 一郎</span>
                            </div>
                        </div>
                        <div class="lp-testimonial-card-small">
                            <p>「サポートが素晴らしい」</p>
                            <div class="lp-author-compact">
                                <img src="https://i.pravatar.cc/50?img=4" alt="Author" />
                                <span>山田 次郎</span>
                            </div>
                        </div>
                        <div class="lp-testimonial-card-small">
                            <p>「使いやすさ抜群！」</p>
                            <div class="lp-author-compact">
                                <img src="https://i.pravatar.cc/50?img=5" alt="Author" />
                                <span>伊藤 美咲</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    // ========== PRICING VARIATIONS ==========

    'pricing-modern': {
        name: 'Modern Pricing Table',
        category: 'pricing',
        html: `
        <section class="lp-section lp-pricing-modern">
            <div class="lp-content-wrapper">
                <div class="lp-section-header lp-text-center">
                    <h2 class="lp-section-title-modern">シンプルな料金プラン</h2>
                    <p class="lp-section-description">あなたに最適なプランを選択してください</p>
                    <div class="lp-pricing-toggle">
                        <span>月額</span>
                        <label class="lp-toggle-switch">
                            <input type="checkbox" />
                            <span class="lp-toggle-slider"></span>
                        </label>
                        <span>年額 <span class="lp-discount-badge">20% OFF</span></span>
                    </div>
                </div>
                <div class="lp-pricing-grid-modern">
                    <div class="lp-pricing-card-modern">
                        <div class="lp-pricing-header">
                            <h3>スターター</h3>
                            <p>個人・小規模チーム向け</p>
                        </div>
                        <div class="lp-pricing-price-modern">
                            <span class="lp-price-currency">¥</span>
                            <span class="lp-price-amount">0</span>
                            <span class="lp-price-period">/月</span>
                        </div>
                        <ul class="lp-pricing-features-modern">
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>基本機能</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>1ユーザー</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>5GBストレージ</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>コミュニティサポート</li>
                        </ul>
                        <button class="lp-btn lp-btn-outline lp-btn-block">始める</button>
                    </div>

                    <div class="lp-pricing-card-modern lp-pricing-featured">
                        <div class="lp-pricing-badge-modern">人気</div>
                        <div class="lp-pricing-header">
                            <h3>プロフェッショナル</h3>
                            <p>成長中のビジネス向け</p>
                        </div>
                        <div class="lp-pricing-price-modern">
                            <span class="lp-price-currency">¥</span>
                            <span class="lp-price-amount">9,800</span>
                            <span class="lp-price-period">/月</span>
                        </div>
                        <ul class="lp-pricing-features-modern">
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>全機能利用可能</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>10ユーザーまで</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>100GBストレージ</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>優先サポート</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>高度な分析</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>API アクセス</li>
                        </ul>
                        <button class="lp-btn lp-btn-primary lp-btn-block">今すぐ始める</button>
                    </div>

                    <div class="lp-pricing-card-modern">
                        <div class="lp-pricing-header">
                            <h3>エンタープライズ</h3>
                            <p>大規模組織向け</p>
                        </div>
                        <div class="lp-pricing-price-modern">
                            <span class="lp-price-amount-custom">カスタム</span>
                        </div>
                        <ul class="lp-pricing-features-modern">
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>無制限の機能</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>無制限ユーザー</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>カスタムストレージ</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>専任サポート</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>SLA保証</li>
                            <li><svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/></svg>カスタム統合</li>
                        </ul>
                        <button class="lp-btn lp-btn-outline lp-btn-block">お問い合わせ</button>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    // ========== CTA VARIATIONS ==========

    'cta-split': {
        name: 'Split CTA Section',
        category: 'cta',
        html: `
        <section class="lp-section lp-cta-split">
            <div class="lp-content-wrapper">
                <div class="lp-cta-container">
                    <div class="lp-cta-content">
                        <h2>今すぐ始めて、<br>未来を創造しよう</h2>
                        <p>14日間の無料トライアルで、すべての機能をお試しいただけます。</p>
                        <ul class="lp-cta-features">
                            <li>✓ クレジットカード不要</li>
                            <li>✓ いつでもキャンセル可能</li>
                            <li>✓ 30秒で始められます</li>
                        </ul>
                        <div class="lp-cta-actions">
                            <button class="lp-btn lp-btn-primary lp-btn-lg">無料で始める</button>
                            <button class="lp-btn lp-btn-outline-white lp-btn-lg">デモを予約</button>
                        </div>
                    </div>
                    <div class="lp-cta-visual">
                        <div class="lp-cta-image-wrapper">
                            <img src="https://picsum.photos/500/600?random=cta" alt="CTA Visual" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    // ========== NEWSLETTER ==========

    'newsletter': {
        name: 'Newsletter Signup',
        category: 'cta',
        html: `
        <section class="lp-section lp-newsletter">
            <div class="lp-content-wrapper">
                <div class="lp-newsletter-container">
                    <div class="lp-newsletter-icon">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <polyline points="22,6 12,13 2,6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <h3>最新情報をお届けします</h3>
                    <p>製品アップデート、ヒント、特別なオファーを受け取りましょう</p>
                    <form class="lp-newsletter-form">
                        <input type="email" placeholder="メールアドレスを入力" required />
                        <button type="submit" class="lp-btn lp-btn-primary">購読する</button>
                    </form>
                    <p class="lp-newsletter-note">いつでも配信停止できます。プライバシーポリシーに同意したものとみなされます。</p>
                </div>
            </div>
        </section>
        `
    }
};

// Merge with existing templates
if (typeof sectionTemplates !== 'undefined') {
    Object.assign(sectionTemplates, advancedTemplates);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = advancedTemplates;
}
