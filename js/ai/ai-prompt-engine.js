/**
 * AI Prompt Engine - プロンプト生成エンジン
 * テンプレートカスタマイズ、セクション生成、フルページ生成、
 * デザインシステム生成、デザインレビューのプロンプトを構築
 */
class AIPromptEngine {
  // --- CSSクラスリファレンス ---
  // AIが生成するHTMLで使用可能なクラス一覧
  static CSS_REFERENCE = {
    lp: {
      layout: [
        'lp-section', 'lp-hero', 'lp-hero-modern', 'lp-hero-split', 'lp-hero-animated',
        'lp-split-container', 'lp-split-content', 'lp-split-visual',
        'lp-hero-content', 'lp-hero-content-animated', 'lp-hero-visual',
      ],
      typography: [
        'lp-hero-title', 'lp-hero-title-xl', 'lp-hero-subtitle', 'lp-hero-description',
        'lp-gradient-text', 'lp-section-title-modern', 'lp-section-description',
        'lp-section-badge', 'lp-section-header',
      ],
      buttons: [
        'lp-btn', 'lp-btn-primary', 'lp-btn-outline', 'lp-btn-ghost',
        'lp-btn-gradient', 'lp-btn-lg', 'lp-btn-xl', 'lp-btn-block',
        'lp-btn-outline-white', 'lp-hero-buttons', 'lp-hero-cta-group',
      ],
      badges: [
        'lp-badge', 'lp-hero-badge', 'lp-badge-dot',
        'lp-discount-badge', 'lp-pricing-badge-modern',
      ],
      stats: [
        'lp-hero-stats', 'lp-hero-stat', 'lp-hero-stat-number', 'lp-hero-stat-label',
        'lp-hero-stat-divider',
      ],
      features: [
        'lp-features-modern', 'lp-features-grid-modern', 'lp-feature-card-hover',
        'lp-feature-icon-modern', 'lp-feature-link',
        'lp-features-timeline', 'lp-timeline', 'lp-timeline-item',
        'lp-timeline-marker', 'lp-timeline-content',
      ],
      socialProof: [
        'lp-social-proof', 'lp-trust-text', 'lp-logo-grid', 'lp-logo-item',
        'lp-logo-placeholder',
      ],
      testimonials: [
        'lp-testimonials-carousel', 'lp-carousel-container',
        'lp-testimonial-card-featured', 'lp-testimonial-rating',
        'lp-testimonial-quote-large', 'lp-testimonial-author-featured',
        'lp-author-avatar', 'lp-author-info',
        'lp-testimonial-grid-compact', 'lp-testimonial-card-small',
        'lp-author-compact',
      ],
      pricing: [
        'lp-pricing-modern', 'lp-pricing-toggle', 'lp-toggle-switch', 'lp-toggle-slider',
        'lp-pricing-grid-modern', 'lp-pricing-card-modern', 'lp-pricing-featured',
        'lp-pricing-header', 'lp-pricing-price-modern', 'lp-price-currency',
        'lp-price-amount', 'lp-price-period', 'lp-pricing-features-modern',
      ],
      cta: [
        'lp-cta-split', 'lp-cta-container', 'lp-cta-content', 'lp-cta-features',
        'lp-cta-actions', 'lp-cta-visual', 'lp-cta-image-wrapper', 'lp-cta-note',
      ],
      newsletter: [
        'lp-newsletter', 'lp-newsletter-container', 'lp-newsletter-icon',
        'lp-newsletter-form', 'lp-newsletter-note',
      ],
      gallery: [
        'lp-gallery-grid', 'lp-gallery-item', 'lp-gallery-overlay',
      ],
      visual: [
        'lp-visual-card', 'lp-visual-gradient',
        'lp-animated-bg', 'lp-floating-shape',
        'lp-hero-mockup', 'lp-mockup-browser', 'lp-mockup-header',
        'lp-mockup-content', 'lp-mockup-sidebar', 'lp-mockup-main',
      ],
      utility: [
        'lp-hide-mobile', 'lp-slide-up',
      ],
    },
    db: {
      card: [
        'db-card', 'db-card-header', 'db-card-title', 'db-card-action',
      ],
      typography: [
        'db-heading-1', 'db-heading-2', 'db-heading-3', 'db-text', 'db-caption',
      ],
      decoration: [
        'db-divider', 'db-icon',
      ],
      utility: [
        'db-bg-primary', 'db-bg-success', 'db-bg-warning', 'db-bg-error',
        'db-text-primary', 'db-text-muted', 'db-hover-lift',
      ],
      calendar: [
        'db-calendar-widget', 'db-calendar-header', 'db-calendar-title',
        'db-calendar-nav', 'db-calendar-grid', 'db-calendar-today',
        'db-calendar-other',
      ],
    },
  };

  // --- デザイントークンリファレンス ---
  static DESIGN_TOKENS_REFERENCE = `
CSS変数（デザイントークン）:
- カラー: --color-primary-{50-900}, --color-secondary-{50-900}, --color-accent-{50-900}, --color-neutral-{50-900}
- セマンティック: --color-success, --color-warning, --color-error, --color-info
- LP用: --lp-primary, --lp-primary-light, --lp-text, --lp-text-muted, --lp-bg, --lp-bg-alt, --lp-border
- DB用: --db-primary, --db-sidebar-bg, --db-card-bg, --db-border
- サーフェス: --theme-surface, --theme-surface-variant, --theme-on-surface
- フォント: --font-sans, --font-mono
`.trim();

  // --- デザイン様式別の追加CSSクラスリファレンス ---
  // lp-archetypes.css で定義される専用クラス群
  static ARCHETYPE_CSS_REFERENCE = {
    'jp-dense': {
      heading: ['lp-jp-band-title', 'lp-jp-marker', 'lp-jp-hero-offer', 'lp-nb'],
      emphasis: ['lp-jp-price', 'lp-jp-price-em', 'lp-jp-note', 'lp-jp-speech'],
      visual: ['lp-jp-art', 'lp-jp-avatar', 'lp-jp-reason-icon', 'lp-jp-media-logo'],
      density: [
        'lp-jp-bg-word', 'lp-jp-side-label', 'lp-jp-seam-top', 'lp-jp-bleed-up',
        'lp-jp-stat-row', 'lp-jp-stat', 'lp-jp-stat-num', 'lp-jp-stat-label',
        'lp-jp-cta-micro', 'lp-jp-float-chip',
      ],
      trust: ['lp-jp-badge-strip', 'lp-jp-badge', 'lp-jp-voice-card', 'lp-jp-voice-meta'],
      structure: [
        'lp-jp-checklist', 'lp-jp-check-item',
        'lp-jp-reasons', 'lp-jp-reason', 'lp-jp-reason-num',
        'lp-jp-steps', 'lp-jp-step', 'lp-jp-step-num',
        'lp-jp-compare-table', 'lp-jp-good', 'lp-jp-soso', 'lp-jp-bad',
        'lp-jp-faq',
      ],
      conversion: [
        'lp-jp-cta-band', 'lp-jp-cta-arrow',
        'lp-jp-offer', 'lp-jp-offer-deadline', 'lp-jp-offer-benefits',
      ],
    },
    'award-rich': {
      typography: [
        'lp-rich-title-xl', 'lp-rich-outline', 'lp-rich-vertical', 'lp-rich-serif', 'lp-nb',
      ],
      visual: [
        'lp-rich-art', 'lp-rich-index-num', 'lp-rich-editorial-num-label',
        'lp-rich-bg-word', 'lp-rich-statement-kanji', 'lp-rich-vertical-edge',
      ],
      layout: [
        'lp-rich-hero', 'lp-rich-editorial', 'lp-rich-index-num', 'lp-rich-offset-grid',
        'lp-rich-statement', 'lp-rich-cta-full',
      ],
      motion: ['lp-rich-marquee', 'lp-rich-marquee-track', 'lp-rich-hscroll', 'lp-rich-hscroll-item'],
    },
  };

  // --- デザイン様式別のセクションタイプ定義 ---
  static SECTION_TYPES_JP = {
    jpHeroOffer: { name: 'JPヒーロー（オファー型）', description: 'キャッチコピー+権威バッジ+価格/期限オファー+CTA' },
    badgeStrip: { name: '実績・掲載メディア帯', description: '導入実績数値・受賞・掲載メディアのバッジ帯' },
    problemChecklist: { name: '悩みチェックリスト', description: '「こんなお悩みありませんか？」具体的な悩みのチェックリスト' },
    empathyBridge: { name: '共感→解決ブリッジ', description: 'その悩みへの共感と「◯◯がすべて解決」への橋渡し' },
    reasons: { name: '選ばれる理由', description: '丸数字付き「選ばれる理由3選」根拠と実績数値' },
    voices: { name: 'お客様の声（高密度）', description: '顔写真+氏名+属性+星評価付きレビュー複数件' },
    comparison: { name: '他社比較表', description: '自社と他社A/Bの○△×比較表' },
    steps: { name: 'ご利用の流れ', description: '申込みから利用開始までの3ステップ図' },
    offer: { name: '特別オファー', description: '価格強調・期限・特典リスト付きオファーボックス' },
    ctaBand: { name: 'CTA帯', description: 'セクション間に挟む行動喚起の帯（繰り返し使用）' },
    faq: { name: 'FAQ（高密度）', description: '不安を潰す質問と丁寧な回答を多数' },
    footer: { name: 'フッター', description: 'ページフッター・会社情報・注釈まとめ' },
  };

  static SECTION_TYPES_RICH = {
    richHero: { name: 'リッチヒーロー', description: '画面いっぱいの大型タイポグラフィ・縦書きアクセント' },
    marquee: { name: 'マーキー帯', description: '流れるキーワードテキストの帯' },
    statement: { name: 'ステートメント', description: '明朝体の大型コピーと大胆な余白によるブランド宣言' },
    editorialFeatures: { name: 'エディトリアル特集', description: '大型数字インデックス01/02/03とオフセットグリッド' },
    showcase: { name: '横スクロールショーケース', description: 'scroll-snapの横スクロールギャラリー' },
    richCta: { name: 'フルブリードCTA', description: '全幅・大型タイポの行動喚起' },
    contact: { name: 'お問い合わせ', description: 'コンタクトフォーム' },
    footer: { name: 'フッター', description: 'ページフッター' },
  };

  // --- デザイン様式別の構成方針 ---
  static _planStyleGuide(designStyle, purpose) {
    if (designStyle === 'jp-dense') {
      return `構成の方針（日本型・高密度コンバージョンLP）:
- PASONAの法則に沿って構成する: Problem（悩み提起）→ Affinity（共感）→ Solution（解決策）→ Offer（提案・価格）→ Narrowing（限定・緊急性）→ Action（行動喚起）
- セクション数は10〜14。冒頭は jpHeroOffer、直後に badgeStrip で権威付け
- ctaBand を2〜3セクションごとに挟み、行動導線を反復する
- 実績・数値は具体的に（「導入3,000社」「継続率98.5%」等）。「No.1」等の表記を使う場合は notes に注釈の根拠を書く
- 終盤に offer（期限・特典付き）→ faq → 最後の ctaBand の順で不安解消とクロージング
- 目的「${purpose}」への導線を全セクションで意識する`;
    }
    if (designStyle === 'award-rich') {
      return `構成の方針（アワード志向・リッチ表現LP）:
- セクション数は6〜8。タイポグラフィとレイアウトが主役
- richHero で始め、中盤に statement（ブランド宣言）を置く
- marquee や showcase を挟んでリズムと緩急を作る
- コピーは短く、強く、詩的に。説明的な長文は避ける
- 各セクションの notes には「どんな視覚的インパクトを狙うか」を書く
- 最後は richCta で締める`;
    }
    return `構成の方針:
- ファーストビュー(hero)で目的「${purpose}」への導線を最優先にする
- 強み・差別化ポイントは features や socialProof セクションの notes に具体的に反映する
- 各セクションの notes には、そのセクションで使う具体的なコピーの方向性を書く`;
  }

  // --- デザイン様式別のセクションタイプ一覧を返す ---
  static _sectionTypesFor(designStyle) {
    if (designStyle === 'jp-dense') return AIPromptEngine.SECTION_TYPES_JP;
    if (designStyle === 'award-rich') return AIPromptEngine.SECTION_TYPES_RICH;
    return AIPromptEngine.SECTION_TYPES;
  }

  // --- デザイン様式別の追加クラスリファレンスをテキスト化 ---
  static _archetypeClassText(designStyle) {
    const ref = AIPromptEngine.ARCHETYPE_CSS_REFERENCE[designStyle];
    if (!ref) return '';
    let text = `\nデザイン様式専用の追加CSSクラス（積極的に使用する）:\n`;
    for (const [category, classes] of Object.entries(ref)) {
      text += `  [${category}]: ${classes.join(', ')}\n`;
    }
    return text;
  }

  // --- モーション属性の使用ルール（lp-motion.js ランタイムが解釈する） ---
  static MOTION_RULES = `
モーション属性（ランタイムが自動で演出する。scriptタグは書かないこと）:
- カード・見出し等の出現: data-motion="up|fade|left|right|scale"、グリッド内は data-motion-delay="0/80/160..." でスタッガー
- 統計・価格の数値: data-counter="数値" data-counter-suffix="社" 等（テキスト内容にも最終値を書くこと）
- 背景の巨大タイポ層(lp-jp-bg-word / lp-rich-bg-word): data-parallax="0.15" 程度を付与`;

  // --- デザイン様式別のコピー執筆ルール ---
  static _copyRules(designStyle) {
    if (designStyle === 'jp-dense') {
      return `
コピー執筆ルール（日本型・高密度）:
- 情報密度を高くする: 見出し + リード文 + 箇条書き3〜5点 + 必要に応じて lp-jp-note の※注釈
- 重要語句は lp-jp-marker でマーカー強調、価格・数値は lp-jp-price / lp-jp-price-em で強調する
- 「No.1」「満足度◯%」等の訴求には必ず lp-jp-note で根拠注釈（例: ※2025年 自社調べ）を付ける
- 見出しの改行は文節単位で制御する: 文節ごとに <span class="lp-nb">…</span> で囲む
- 具体的な数値・固有の悩み・ベネフィットを書く。抽象的な定型文は禁止
- 背景に lp-jp-bg-word でセクションキーワードの巨大英字を敷き、lp-jp-side-label で回転ラベルを付ける
${AIPromptEngine.MOTION_RULES}`;
    }
    if (designStyle === 'award-rich') {
      return `
コピー執筆ルール（アワード志向・リッチ）:
- コピーは短く、強く、詩的に。1セクションの文字量は最小限
- 見出しは lp-rich-title-xl / lp-rich-outline / lp-rich-serif 等の大型タイポクラスを主役にする
- 要素数を絞り、余白を大胆に使う。装飾的な説明文は書かない
- 英語の短いキーワード（例: VISION, CRAFT）をアクセントに使ってよい
- 見出しの改行は文節単位で制御する: 文節ごとに <span class="lp-nb">…</span> で囲む
- 背景に lp-rich-bg-word で巨大アウトライン英字を敷き、1つの「見せ場」を必ず作る
${AIPromptEngine.MOTION_RULES}`;
    }
    return '';
  }

  // --- セクションタイプ定義 ---
  static SECTION_TYPES = {
    hero: { name: 'ヒーロー', description: 'ファーストビュー。キャッチコピーとCTAボタン' },
    features: { name: '特徴・機能', description: '製品/サービスの特徴をカード形式で紹介' },
    testimonials: { name: 'お客様の声', description: '顧客の感想・レビュー' },
    pricing: { name: '料金プラン', description: '価格表・プラン比較' },
    cta: { name: 'CTA', description: '行動喚起セクション' },
    faq: { name: 'FAQ', description: 'よくある質問と回答' },
    socialProof: { name: '実績・信頼', description: '導入企業ロゴ、実績数値' },
    newsletter: { name: 'ニュースレター', description: 'メール登録フォーム' },
    gallery: { name: 'ギャラリー', description: '画像ギャラリー' },
    contact: { name: 'お問い合わせ', description: 'コンタクトフォーム' },
    footer: { name: 'フッター', description: 'ページフッター・リンク集' },
  };

  // --- 共通システムプロンプト ---
  static _systemBase() {
    return `あなたはWebデザインとHTML/CSSに精通した日本語のアシスタントです。
指示に従い、セマンティックなHTML5を生成してください。

重要なルール:
- インラインスタイルは使わない。必ず既存のCSSクラスを使用する
- <script>タグは絶対に含めない
- アクセシビリティを考慮する（role, aria-label, alt属性）
- 画像はplaceholder.co等のプレースホルダーURLを使用
- 日本語のテキストを使用する
- HTMLのみ出力。説明文は不要`;
  }

  // --- CSSクラス一覧をテキスト化 ---
  static _cssReferenceText(type = 'lp') {
    const ref = AIPromptEngine.CSS_REFERENCE[type];
    if (!ref) return '';
    let text = `利用可能な ${type.toUpperCase()} CSSクラス:\n`;
    for (const [category, classes] of Object.entries(ref)) {
      text += `  [${category}]: ${classes.join(', ')}\n`;
    }
    return text;
  }

  // ============================================================
  // テンプレートカスタマイズ
  // 既存HTMLを業種に合わせてテキスト/色/画像を最適化
  // ============================================================
  static buildCustomizePrompt(html, industry, options = {}) {
    const {
      tone = 'プロフェッショナル',
      targetAudience = '',
      additionalNotes = '',
    } = options;

    const system = `${AIPromptEngine._systemBase()}

${AIPromptEngine._cssReferenceText('lp')}

${AIPromptEngine.DESIGN_TOKENS_REFERENCE}`;

    const user = `以下のHTMLテンプレートを「${industry}」業界向けにカスタマイズしてください。

トーン: ${tone}
${targetAudience ? `ターゲット: ${targetAudience}` : ''}
${additionalNotes ? `追加要件: ${additionalNotes}` : ''}

カスタマイズ方針:
1. テキスト: 見出し、本文、CTAテキストを業界に適したものに書き換える
2. 数値: 統計・実績数値を業界に合ったリアルなものに変更する
3. 画像: alt属性を業界に合わせ、URLは placeholder.co の適切なサイズで置換する
4. 構造: HTML構造とCSSクラスはそのまま維持する
5. CSSクラスの追加・削除はしない

HTMLを \`\`\`html コードブロックで出力してください。

--- 元のHTML ---
${html}`;

    return {
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.2,
      estimatedTokens: AIPromptEngine.estimateTokens(system + user),
    };
  }

  // ============================================================
  // セクション生成
  // 利用可能CSSクラス一覧付きで新規セクションHTML生成
  // ============================================================
  static buildSectionPrompt(sectionType, options = {}) {
    const {
      industry = '',
      style = 'モダン',
      colorScheme = '',
      existingSections = [],
      additionalNotes = '',
    } = options;

    const sectionInfo = AIPromptEngine.SECTION_TYPES[sectionType] || {
      name: sectionType,
      description: '',
    };

    const system = `${AIPromptEngine._systemBase()}

${AIPromptEngine._cssReferenceText('lp')}

${AIPromptEngine.DESIGN_TOKENS_REFERENCE}

既存のCSSクラスのみを使い、新しいCSSクラスは作成しないでください。
出力は <section> タグで囲まれた1つのセクションHTMLのみです。`;

    const existingInfo = existingSections.length > 0
      ? `\nページ内の既存セクション: ${existingSections.join(', ')}\n重複しない内容にしてください。`
      : '';

    const user = `「${sectionInfo.name}」セクション（${sectionInfo.description}）を新規作成してください。

スタイル: ${style}
${industry ? `業界: ${industry}` : ''}
${colorScheme ? `カラースキーム: ${colorScheme}` : ''}
${existingInfo}
${additionalNotes ? `追加要件: ${additionalNotes}` : ''}

HTMLを \`\`\`html コードブロックで出力してください。`;

    return {
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.2,
      estimatedTokens: AIPromptEngine.estimateTokens(system + user),
    };
  }

  // ============================================================
  // フルページ生成 - Phase 1: 構成計画JSON
  // ============================================================
  static buildPagePlanPrompt(options = {}) {
    const {
      industry = 'テクノロジー',
      purpose = 'サービス紹介',
      targetAudience = '',
      tone = 'プロフェッショナル',
      sectionCount = 6,
      differentiators = '',
      ctaText = '',
      designStyle = 'global',
      additionalNotes = '',
    } = options;

    const sectionList = Object.entries(AIPromptEngine._sectionTypesFor(designStyle))
      .map(([key, val]) => `  - ${key}: ${val.name}（${val.description}）`)
      .join('\n');

    const system = `あなたはWebデザインの構成プランナーです。
LP（ランディングページ）のセクション構成をJSON形式で出力してください。

利用可能なセクションタイプ:
${sectionList}`;

    const user = `以下の要件でLPの構成計画を作成してください。

業界: ${industry}
目的: ${purpose}
${targetAudience ? `ターゲット: ${targetAudience}` : ''}
トーン: ${tone}
${differentiators ? `強み・差別化ポイント: ${differentiators}` : ''}
${ctaText ? `主要CTAボタンの文言: ${ctaText}` : ''}
セクション数: 約${sectionCount}セクション
${additionalNotes ? `追加要件: ${additionalNotes}` : ''}

${AIPromptEngine._planStyleGuide(designStyle, purpose)}

以下のJSON形式で出力してください（JSONのみ、説明不要）:
\`\`\`json
{
  "title": "ページタイトル",
  "description": "ページの概要説明",
  "colorScheme": "推奨カラースキーム（例: blue, green, purple）",
  "sections": [
    {
      "type": "セクションタイプ（上記の key）",
      "heading": "セクション見出し",
      "notes": "このセクションの要点・含めるべき内容"
    }
  ]
}
\`\`\``;

    return {
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.3,
      estimatedTokens: AIPromptEngine.estimateTokens(system + user),
    };
  }

  // ============================================================
  // フルページ生成 - Phase 2: 計画に基づく個別セクション生成
  // ============================================================
  static buildPageSectionPrompt(sectionPlan, pageContext) {
    const {
      type,
      heading = '',
      notes = '',
    } = sectionPlan;

    const {
      industry = '',
      colorScheme = '',
      tone = '',
      audience = '',
      differentiators = '',
      ctaText = '',
      designStyle = 'global',
      generatedSections = [],
    } = pageContext;

    const system = `${AIPromptEngine._systemBase()}

${AIPromptEngine._cssReferenceText('lp')}
${AIPromptEngine._archetypeClassText(designStyle)}
${AIPromptEngine.DESIGN_TOKENS_REFERENCE}
${AIPromptEngine._copyRules(designStyle)}

ページ全体のコンテキスト:
- 業界: ${industry}
- カラー: ${colorScheme}
- トーン: ${tone}
${audience ? `- ターゲット: ${audience}` : ''}
${differentiators ? `- 強み・差別化ポイント: ${differentiators}` : ''}
${ctaText ? `- 主要CTAボタンの文言（CTAボタンにはこの文言を使う）: ${ctaText}` : ''}
- 生成済みセクション数: ${generatedSections.length}

既存のCSSクラスのみを使ってください。
コピーは業界・ターゲットに即した具体的な日本語で書き、汎用的な定型文は避けてください。
出力は <section> タグで囲まれた1つのセクションHTMLのみです。`;

    const user = `以下のセクションを生成してください。

セクションタイプ: ${type}
見出し: ${heading}
含めるべき内容: ${notes}

HTMLを \`\`\`html コードブロックで出力してください。`;

    return {
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.2,
      estimatedTokens: AIPromptEngine.estimateTokens(system + user),
    };
  }

  // ============================================================
  // デザインシステム生成
  // CSS変数セットをJSON出力
  // ============================================================
  static buildDesignSystemPrompt(options = {}) {
    const {
      industry = '',
      mood = 'プロフェッショナル',
      baseColor = '',
      additionalNotes = '',
    } = options;

    const system = `あなたはブランドデザインの専門家です。
指示に基づいてCSS変数（カスタムプロパティ）のセットをJSON形式で出力してください。

既存のCSS変数構造:
${AIPromptEngine.DESIGN_TOKENS_REFERENCE}

色はHEXコード（#RRGGBB）で指定してください。
アクセシビリティ（WCAG AA以上のコントラスト比）を確保してください。`;

    const user = `以下の要件でデザインシステムのカラーパレットを生成してください。

${industry ? `業界: ${industry}` : ''}
雰囲気: ${mood}
${baseColor ? `ベースカラー: ${baseColor}` : ''}
${additionalNotes ? `追加要件: ${additionalNotes}` : ''}

以下のJSON形式で出力してください（JSONのみ、説明不要）:
\`\`\`json
{
  "name": "パレット名",
  "description": "パレットの説明",
  "tokens": {
    "--color-primary-50": "#...",
    "--color-primary-100": "#...",
    "--color-primary-200": "#...",
    "--color-primary-300": "#...",
    "--color-primary-400": "#...",
    "--color-primary-500": "#...",
    "--color-primary-600": "#...",
    "--color-primary-700": "#...",
    "--color-primary-800": "#...",
    "--color-primary-900": "#...",
    "--color-accent-50": "#...",
    "--color-accent-100": "#...",
    "--color-accent-200": "#...",
    "--color-accent-300": "#...",
    "--color-accent-400": "#...",
    "--color-accent-500": "#...",
    "--color-accent-600": "#...",
    "--color-accent-700": "#...",
    "--color-accent-800": "#...",
    "--color-accent-900": "#...",
    "--color-success": "#...",
    "--color-warning": "#...",
    "--color-error": "#...",
    "--color-info": "#..."
  }
}
\`\`\``;

    return {
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.3,
      estimatedTokens: AIPromptEngine.estimateTokens(system + user),
    };
  }

  // ============================================================
  // デザインレビュー
  // 現在の構成を分析して改善提案
  // ============================================================
  static buildDesignReviewPrompt(html, options = {}) {
    const {
      industry = '',
      purpose = '',
      additionalNotes = '',
    } = options;

    const system = `あなたはWebデザインとUXの専門家です。
与えられたLPのHTMLを分析し、改善提案を日本語で行ってください。

分析の観点:
1. 構成・情報設計: セクション順序、コンテンツ階層の適切さ
2. ビジュアルデザイン: CSSクラスの活用、一貫性
3. コンバージョン最適化: CTAの配置・文言、ユーザーの行動導線
4. アクセシビリティ: aria属性、alt属性、セマンティクス
5. モバイル対応: レスポンシブ関連クラスの活用

${AIPromptEngine._cssReferenceText('lp')}`;

    const user = `以下のLP HTMLをレビューして改善提案をしてください。

${industry ? `業界: ${industry}` : ''}
${purpose ? `ページの目的: ${purpose}` : ''}
${additionalNotes ? `追加コンテキスト: ${additionalNotes}` : ''}

以下のJSON形式で出力してください（JSONのみ、説明不要）:
\`\`\`json
{
  "score": {
    "overall": 75,
    "structure": 80,
    "visual": 70,
    "conversion": 75,
    "accessibility": 65,
    "mobile": 80
  },
  "summary": "総合的な評価コメント",
  "improvements": [
    {
      "category": "カテゴリ（structure/visual/conversion/accessibility/mobile）",
      "priority": "high/medium/low",
      "title": "改善項目のタイトル",
      "description": "具体的な改善内容",
      "currentIssue": "現在の問題点",
      "suggestion": "改善案（具体的なHTMLの変更提案を含む）"
    }
  ]
}
\`\`\`

--- 対象HTML ---
${html}`;

    return {
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: user },
      ],
      temperature: 0.5,
      estimatedTokens: AIPromptEngine.estimateTokens(system + user),
    };
  }

  // ============================================================
  // 自由入力プロンプト（チャットモード）
  // ============================================================
  static buildFreeformPrompt(userMessage, context = {}) {
    const {
      currentHtml = '',
      mode = 'lp', // 'lp' or 'db'
    } = context;

    const cssRef = AIPromptEngine._cssReferenceText(mode);

    const system = `${AIPromptEngine._systemBase()}

${cssRef}

${AIPromptEngine.DESIGN_TOKENS_REFERENCE}

ユーザーの指示に従ってHTMLを生成・修正してください。
HTMLを生成する場合は \`\`\`html コードブロックで出力してください。
質問や提案のみの場合はテキストで回答してください。`;

    const messages = [{ role: 'system', content: system }];

    if (currentHtml) {
      messages.push({
        role: 'user',
        content: `現在のHTML:\n\`\`\`html\n${currentHtml}\n\`\`\``,
      });
      messages.push({
        role: 'assistant',
        content: 'HTMLを確認しました。どのような変更をしますか？',
      });
    }

    messages.push({ role: 'user', content: userMessage });

    return {
      messages,
      temperature: 0.3,
      estimatedTokens: AIPromptEngine.estimateTokens(
        messages.map(m => m.content).join('')
      ),
    };
  }

  // ============================================================
  // トークン数推定
  // 日本語: 文字数 / 2、英語: 文字数 / 4
  // ============================================================
  static estimateTokens(text) {
    if (!text) return 0;

    let jpChars = 0;
    let enChars = 0;

    for (const char of text) {
      const code = char.codePointAt(0);
      // CJK統合漢字、ひらがな、カタカナ、全角記号
      if (
        (code >= 0x3000 && code <= 0x9FFF) ||
        (code >= 0xF900 && code <= 0xFAFF) ||
        (code >= 0xFF00 && code <= 0xFFEF)
      ) {
        jpChars++;
      } else {
        enChars++;
      }
    }

    return Math.ceil(jpChars / 2) + Math.ceil(enChars / 4);
  }
  // ============================================================
  // UIコントローラーとの互換ブリッジ
  // buildMessages(taskType, prompt, context) でどのタスクでも呼べる
  // 戻り値は常に { messages, temperature?, estimatedTokens? } 形式
  // ============================================================

  /** メッセージ配列を { messages, temperature, estimatedTokens } 形式に包む */
  static _asPromptResult(messages, temperature = 0.3) {
    return {
      messages,
      temperature,
      estimatedTokens: AIPromptEngine.estimateTokens(
        messages.map(m => m.content || '').join('')
      ),
    };
  }

  static buildMessages(taskType, prompt, context = {}) {
    switch (taskType) {
      case 'customize_section':
        return AIPromptEngine.buildCustomizePrompt(
          context.currentHTML || '',
          prompt,
          { type: context.type, cssRef: true }
        );
      case 'generate_section':
        return AIPromptEngine.buildSectionPrompt(
          prompt,
          { type: context.type, cssRef: true, context: context.context }
        );
      case 'plan_fullpage':
        return AIPromptEngine.buildPagePlanPrompt({
          industry: prompt,
          type: context.type,
        });
      case 'design_system':
        return AIPromptEngine.buildDesignSystemPrompt({
          additionalNotes: prompt,
        });
      case 'review': {
        const structureInfo = context.structure || '';
        const settingsInfo = context.designSettings ? JSON.stringify(context.designSettings) : '';
        return AIPromptEngine._asPromptResult([
          { role: 'system', content: 'あなたはUX/UIの専門家です。Webページの構成とデザインをレビューし、改善提案を日本語で返してください。' },
          { role: 'user', content: `以下のページ構成をレビューしてください。\n\n構成: ${structureInfo}\nデザイン設定: ${settingsInfo}\n${prompt ? `追加の観点: ${prompt}` : ''}` },
        ], 0.5);
      }
      case 'freeform':
        return AIPromptEngine.buildFreeformPrompt(prompt, context);
      default:
        return AIPromptEngine._asPromptResult([
          { role: 'system', content: 'あなたはWebデザインの専門家です。' },
          { role: 'user', content: prompt },
        ]);
    }
  }

  // インスタンスメソッドとしても呼べるようにする
  buildMessages(taskType, prompt, context = {}) {
    return AIPromptEngine.buildMessages(taskType, prompt, context);
  }
}

window.AIPromptEngine = AIPromptEngine;
