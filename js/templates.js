// Section Templates for Landing Page Generator

const sectionTemplates = {
    'hero-1': {
        name: 'Hero Banner',
        html: `
        <section class="lp-section lp-hero lp-fade-in">
            <div class="lp-hero-content">
                <h1 class="lp-slide-up">あなたのビジネスを次のレベルへ</h1>
                <p>モダンで効果的なソリューションで、成長を加速させましょう。今すぐ始めて、未来を創造してください。</p>
                <div class="lp-hero-buttons">
                    <button class="lp-btn lp-btn-primary">今すぐ始める</button>
                    <button class="lp-btn lp-btn-secondary">詳細を見る</button>
                </div>
            </div>
        </section>
        `
    },

    'features-grid': {
        name: 'Features Grid',
        html: `
        <section class="lp-section lp-features">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">主な機能</h2>
                <p class="lp-section-subtitle">私たちが提供する素晴らしい機能をご覧ください</p>

                <div class="lp-features-grid">
                    <div class="lp-feature-card lp-slide-up">
                        <div class="lp-feature-icon">⚡</div>
                        <h3 class="lp-feature-title">高速パフォーマンス</h3>
                        <p class="lp-feature-description">最先端の技術により、驚くほど高速な処理を実現。ユーザー体験を最優先に設計されています。</p>
                    </div>

                    <div class="lp-feature-card lp-slide-up">
                        <div class="lp-feature-icon">🔒</div>
                        <h3 class="lp-feature-title">セキュアな環境</h3>
                        <p class="lp-feature-description">エンタープライズグレードのセキュリティで、あなたのデータを完全に保護します。</p>
                    </div>

                    <div class="lp-feature-card lp-slide-up">
                        <div class="lp-feature-icon">🎨</div>
                        <h3 class="lp-feature-title">美しいデザイン</h3>
                        <p class="lp-feature-description">モダンで洗練されたUIで、直感的な操作を提供します。</p>
                    </div>

                    <div class="lp-feature-card lp-slide-up">
                        <div class="lp-feature-icon">📱</div>
                        <h3 class="lp-feature-title">レスポンシブ対応</h3>
                        <p class="lp-feature-description">あらゆるデバイスで完璧に動作。スマホ、タブレット、デスクトップに最適化。</p>
                    </div>

                    <div class="lp-feature-card lp-slide-up">
                        <div class="lp-feature-icon">🚀</div>
                        <h3 class="lp-feature-title">簡単セットアップ</h3>
                        <p class="lp-feature-description">数分で始められる簡単セットアップ。技術的な知識は不要です。</p>
                    </div>

                    <div class="lp-feature-card lp-slide-up">
                        <div class="lp-feature-icon">💬</div>
                        <h3 class="lp-feature-title">24/7サポート</h3>
                        <p class="lp-feature-description">いつでもどこでも、専門チームがサポート。あなたの成功をお手伝いします。</p>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    'pricing': {
        name: 'Pricing Table',
        html: `
        <section class="lp-section lp-pricing">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">料金プラン</h2>
                <p class="lp-section-subtitle">あなたに最適なプランを選択してください</p>

                <div class="lp-pricing-grid">
                    <div class="lp-pricing-card lp-slide-up">
                        <h3 class="lp-pricing-title">スターター</h3>
                        <div class="lp-pricing-price">¥2,980<span>/月</span></div>
                        <ul class="lp-pricing-features">
                            <li>基本機能の利用</li>
                            <li>月間10,000リクエスト</li>
                            <li>メールサポート</li>
                            <li>1ユーザー</li>
                        </ul>
                        <button class="lp-btn lp-btn-secondary" style="width: 100%;">プランを選択</button>
                    </div>

                    <div class="lp-pricing-card featured lp-slide-up">
                        <div class="lp-pricing-badge">人気</div>
                        <h3 class="lp-pricing-title">プロフェッショナル</h3>
                        <div class="lp-pricing-price">¥9,800<span>/月</span></div>
                        <ul class="lp-pricing-features">
                            <li>全機能の利用</li>
                            <li>月間100,000リクエスト</li>
                            <li>優先サポート</li>
                            <li>5ユーザーまで</li>
                            <li>カスタムドメイン</li>
                            <li>高度な分析</li>
                        </ul>
                        <button class="lp-btn lp-btn-primary" style="width: 100%;">プランを選択</button>
                    </div>

                    <div class="lp-pricing-card lp-slide-up">
                        <h3 class="lp-pricing-title">エンタープライズ</h3>
                        <div class="lp-pricing-price">カスタム</div>
                        <ul class="lp-pricing-features">
                            <li>無制限の機能</li>
                            <li>無制限リクエスト</li>
                            <li>専任サポート</li>
                            <li>無制限ユーザー</li>
                            <li>カスタム統合</li>
                            <li>SLA保証</li>
                        </ul>
                        <button class="lp-btn lp-btn-secondary" style="width: 100%;">お問い合わせ</button>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    'testimonials': {
        name: 'Testimonials',
        html: `
        <section class="lp-section lp-testimonials">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title">お客様の声</h2>
                <p class="lp-section-subtitle">多くのお客様に選ばれています</p>

                <div class="lp-testimonials-grid">
                    <div class="lp-testimonial-card lp-slide-up">
                        <p class="lp-testimonial-quote">
                            「このサービスは本当に素晴らしい！私たちのビジネスを劇的に変革してくれました。チーム全員が大満足です。」
                        </p>
                        <div class="lp-testimonial-author">
                            <div class="lp-testimonial-avatar">A</div>
                            <div class="lp-testimonial-info">
                                <h4>山田 太郎</h4>
                                <p>株式会社ABC・CEO</p>
                            </div>
                        </div>
                    </div>

                    <div class="lp-testimonial-card lp-slide-up">
                        <p class="lp-testimonial-quote">
                            「使いやすさと機能性のバランスが完璧。コストパフォーマンスも最高で、導入して本当に良かったです。」
                        </p>
                        <div class="lp-testimonial-author">
                            <div class="lp-testimonial-avatar">B</div>
                            <div class="lp-testimonial-info">
                                <h4>佐藤 花子</h4>
                                <p>XYZ株式会社・マーケティング部長</p>
                            </div>
                        </div>
                    </div>

                    <div class="lp-testimonial-card lp-slide-up">
                        <p class="lp-testimonial-quote">
                            「サポートチームの対応が素晴らしい。24時間いつでも頼りになる存在です。これからも使い続けます！」
                        </p>
                        <div class="lp-testimonial-author">
                            <div class="lp-testimonial-avatar">C</div>
                            <div class="lp-testimonial-info">
                                <h4>鈴木 一郎</h4>
                                <p>テック株式会社・CTO</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    'cta': {
        name: 'Call to Action',
        html: `
        <section class="lp-section lp-cta">
            <div class="lp-content-wrapper">
                <h2 class="lp-fade-in">今すぐ始めましょう</h2>
                <p class="lp-fade-in">無料トライアルで、すべての機能をお試しいただけます。クレジットカード不要。</p>
                <div class="lp-hero-buttons">
                    <button class="lp-btn lp-btn-primary">無料で始める</button>
                    <button class="lp-btn lp-btn-secondary">デモを見る</button>
                </div>
            </div>
        </section>
        `
    },

    'gallery': {
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
        `
    },

    'stats': {
        name: 'Statistics',
        html: `
        <section class="lp-section lp-stats">
            <div class="lp-content-wrapper lp-text-center">
                <h2 class="lp-section-title" style="color: white;">数字で見る実績</h2>
                <div class="lp-stats-grid">
                    <div class="lp-stat-item lp-fade-in">
                        <div class="lp-stat-number">10,000+</div>
                        <div class="lp-stat-label">満足しているユーザー</div>
                    </div>
                    <div class="lp-stat-item lp-fade-in">
                        <div class="lp-stat-number">99.9%</div>
                        <div class="lp-stat-label">稼働率</div>
                    </div>
                    <div class="lp-stat-item lp-fade-in">
                        <div class="lp-stat-number">50+</div>
                        <div class="lp-stat-label">国で利用</div>
                    </div>
                    <div class="lp-stat-item lp-fade-in">
                        <div class="lp-stat-number">24/7</div>
                        <div class="lp-stat-label">サポート体制</div>
                    </div>
                </div>
            </div>
        </section>
        `
    },

    'team': {
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
        `
    },

    'faq': {
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
        `
    },

    'contact': {
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
        `
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
        `
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
        `
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
        `
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
        `
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
        `
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
        `
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
        `
    }

};

// Export for use in generator.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = sectionTemplates;
}
