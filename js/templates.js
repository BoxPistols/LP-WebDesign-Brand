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
        `,
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
        `,
  },

  pricing: {
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
        `,
  },

  testimonials: {
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
        `,
  },

  cta: {
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
        <section class="lp-section">
            <div class="lp-content-wrapper" style="max-width: 800px; margin: 0 auto;">
                <h2 class="lp-section-title lp-text-center">よくある質問</h2>
                <div style="margin-top: 3rem; display: flex; flex-direction: column; gap: 1rem;">
                    <details style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
                        <summary style="font-weight: 600; cursor: pointer; list-style: none;">無料トライアルはありますか？</summary>
                        <p style="margin-top: 1rem; color: #64748b; padding-left: 0;">はい、14日間の無料トライアルをご利用いただけます。クレジットカードの登録は不要です。</p>
                    </details>
                    <details style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
                        <summary style="font-weight: 600; cursor: pointer; list-style: none;">プランの変更は可能ですか？</summary>
                        <p style="margin-top: 1rem; color: #64748b; padding-left: 0;">はい、いつでもプランのアップグレードまたはダウングレードが可能です。</p>
                    </details>
                    <details style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem;">
                        <summary style="font-weight: 600; cursor: pointer; list-style: none;">サポート体制について教えてください</summary>
                        <p style="margin-top: 1rem; color: #64748b; padding-left: 0;">全プランで24時間365日、メールとチャットによるサポートを提供しています。</p>
                    </details>
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
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin: 2rem 0;">
                    <span style="color: #64748b;">月払い</span>
                    <div style="width: 50px; height: 28px; background: #3b82f6; border-radius: 14px; cursor: pointer; position: relative;">
                        <div style="width: 24px; height: 24px; background: white; border-radius: 50%; position: absolute; top: 2px; right: 2px; transition: all 0.3s;"></div>
                    </div>
                    <span style="color: #1e293b; font-weight: 600;">年払い <span style="color: #10b981; font-size: 0.85rem;">(20% OFF)</span></span>
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
