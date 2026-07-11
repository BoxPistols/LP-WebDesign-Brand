// Archetype Section Templates
// 1) 日本型・高密度LP (category: 'jp-conversion') — 通販/BtoBリード獲得型の縦長LPセクション
// 2) アワード志向リッチ表現 (category: 'rich-design') — エディトリアル/タイポグラフィ主導のブランドセクション
// スタイルは css/lp-archetypes.css に定義。ビジュアルはすべてインラインSVG（外部画像なし）。
// モーションは js/lp-motion.js の data-motion / data-parallax / data-counter を使用。
// サンプルコピーは勤怠管理SaaS「タイムライトクラウド」想定。

const archetypeTemplates = {
  // ============================================================
  // 日本型・高密度LP
  // ============================================================

  'jp-hero-offer': {
    name: 'JPヒーロー（オファー型）',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-hero-offer" aria-labelledby="jp-hero-offer-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-tr" data-parallax="0.12">AUTOMATION</span>
            </div>
            <div class="lp-content-wrapper">
                <div class="lp-jp-hero-topbar" data-motion="fade">
                    <span class="lp-jp-hero-logo">
                        <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
                            <circle cx="13" cy="13" r="12" fill="var(--lp-primary, #6366f1)"/>
                            <circle cx="13" cy="13" r="8.5" fill="#fff"/>
                            <line x1="13" y1="13" x2="13" y2="7.6" stroke="var(--lp-primary, #6366f1)" stroke-width="2" stroke-linecap="round"/>
                            <line x1="13" y1="13" x2="16.8" y2="15" stroke="var(--lp-primary, #6366f1)" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                        タイムライトクラウド
                    </span>
                    <span class="lp-jp-hero-topbar-tag">クラウド勤怠管理システム</span>
                    <a class="lp-jp-hero-tel" href="tel:0120000000" aria-label="電話で相談する。フリーダイヤル0120-000-000、平日9時から18時受付">
                        <span class="lp-jp-hero-tel-num">0120-000-000</span>
                        <span class="lp-jp-hero-tel-hours">通話無料｜平日 9:00〜18:00</span>
                    </a>
                </div>
                <div class="lp-jp-hero-grid">
                    <div class="lp-jp-hero-copy">
                        <div class="lp-jp-badge-row-inline" aria-label="実績バッジ" data-motion="up">
                            <span class="lp-jp-badge-inline">導入社数 3,000社突破</span>
                            <span class="lp-jp-badge-inline">顧客満足度 No.1※</span>
                            <span class="lp-jp-badge-inline">継続率 99.2%</span>
                        </div>
                        <h1 id="jp-hero-offer-title" class="lp-jp-hero-title" data-motion="up" data-motion-delay="60">
                            <span class="lp-nb">勤怠管理の</span><span class="lp-nb">ムダな作業を、</span><br>
                            <span class="lp-nb"><span class="lp-jp-marker">まるごと自動化</span>する</span>
                        </h1>
                        <p class="lp-jp-hero-lead" data-motion="up" data-motion-delay="120">
                            <span class="lp-nb">打刻・集計・申請承認・給与連携まで</span><span class="lp-nb">ワンストップ。</span>
                            <span class="lp-nb">タイムライトクラウドなら、</span><span class="lp-nb">毎月の締め作業が</span><span class="lp-nb">最短10分で完了します。</span>
                        </p>
                        <ul class="lp-jp-hero-points" data-motion="up" data-motion-delay="160">
                            <li>初期費用0円</li>
                            <li>最短即日で利用開始</li>
                            <li>専任サポート付き</li>
                        </ul>
                        <div class="lp-jp-hero-price-box" data-motion="scale" data-motion-delay="200">
                            <p class="lp-jp-price">
                                <span class="lp-jp-price-label">月額1名あたり</span>
                                <span class="lp-jp-price-em">300</span>
                                <span class="lp-jp-price-unit">円</span>
                                <span class="lp-jp-price-tax">（税込330円）〜</span>
                            </p>
                            <p class="lp-jp-price">
                                <span class="lp-jp-price-label">初期費用</span>
                                <span class="lp-jp-price-em">0</span>
                                <span class="lp-jp-price-unit">円</span>
                            </p>
                        </div>
                        <div class="lp-jp-hero-cta" data-motion="up" data-motion-delay="240">
                            <span class="lp-jp-btn-caption">＼ 30日間ずっと無料で試せる ／</span>
                            <button type="button" class="lp-jp-btn" aria-label="無料トライアルを今すぐ始める">無料トライアルを始める</button>
                            <span class="lp-jp-note">※クレジットカード登録不要。期間終了後に自動課金されることはありません。<br>※顧客満足度No.1は2025年◯◯総研「勤怠管理システム利用実態調査」による。</span>
                        </div>
                    </div>
                    <div class="lp-jp-hero-visual" data-motion="right" data-motion-delay="180">
                        <div class="lp-jp-hero-shot">
                            <svg class="lp-jp-art" viewBox="0 0 560 400" role="img" aria-label="タイムライトクラウドの管理画面イメージ">
                                <rect width="560" height="400" fill="#fdfdff"/>
                                <rect width="560" height="34" fill="#eef1f8"/>
                                <circle cx="20" cy="17" r="5" fill="#f47c6d"/>
                                <circle cx="38" cy="17" r="5" fill="#f5c451"/>
                                <circle cx="56" cy="17" r="5" fill="#66c98a"/>
                                <rect x="180" y="9" width="200" height="16" rx="8" fill="#fff"/>
                                <rect x="0" y="34" width="118" height="366" fill="var(--lp-primary, #6366f1)" opacity="0.06"/>
                                <rect x="16" y="58" width="86" height="12" rx="6" fill="var(--lp-primary, #6366f1)" opacity="0.8"/>
                                <rect x="16" y="92" width="70" height="8" rx="4" fill="#a9b1c4"/>
                                <rect x="16" y="116" width="82" height="8" rx="4" fill="#c6ccdb"/>
                                <rect x="16" y="140" width="62" height="8" rx="4" fill="#c6ccdb"/>
                                <rect x="16" y="164" width="76" height="8" rx="4" fill="#c6ccdb"/>
                                <g>
                                    <rect x="140" y="56" width="122" height="66" rx="10" fill="#fff" stroke="#e5e9f2"/>
                                    <rect x="152" y="68" width="52" height="7" rx="3.5" fill="#a9b1c4"/>
                                    <text x="152" y="106" font-family="sans-serif" font-size="22" font-weight="700" fill="#28304a">142.5<tspan font-size="11" fill="#7d8598">h</tspan></text>
                                </g>
                                <g>
                                    <rect x="274" y="56" width="122" height="66" rx="10" fill="#fff" stroke="#e5e9f2"/>
                                    <rect x="286" y="68" width="52" height="7" rx="3.5" fill="#a9b1c4"/>
                                    <text x="286" y="106" font-family="sans-serif" font-size="22" font-weight="700" fill="var(--lp-primary, #6366f1)">98.6<tspan font-size="11" fill="#7d8598">%</tspan></text>
                                </g>
                                <g>
                                    <rect x="408" y="56" width="122" height="66" rx="10" fill="#fff" stroke="#e5e9f2"/>
                                    <rect x="420" y="68" width="52" height="7" rx="3.5" fill="#a9b1c4"/>
                                    <text x="420" y="106" font-family="sans-serif" font-size="22" font-weight="700" fill="#28304a">0<tspan font-size="11" fill="#7d8598">件</tspan></text>
                                </g>
                                <g>
                                    <rect x="140" y="140" width="256" height="236" rx="12" fill="#fff" stroke="#e5e9f2"/>
                                    <rect x="156" y="156" width="96" height="9" rx="4.5" fill="#8d96ab"/>
                                    <line x1="156" y1="238" x2="380" y2="238" stroke="#eef1f6"/>
                                    <line x1="156" y1="288" x2="380" y2="288" stroke="#eef1f6"/>
                                    <line x1="156" y1="338" x2="380" y2="338" stroke="#eef1f6"/>
                                    <rect x="162" y="300" width="22" height="58" rx="4" fill="var(--lp-primary, #6366f1)" opacity="0.35"/>
                                    <rect x="194" y="270" width="22" height="88" rx="4" fill="var(--lp-primary, #6366f1)" opacity="0.5"/>
                                    <rect x="226" y="288" width="22" height="70" rx="4" fill="var(--lp-primary, #6366f1)" opacity="0.4"/>
                                    <rect x="258" y="236" width="22" height="122" rx="4" fill="var(--lp-primary, #6366f1)" opacity="0.72"/>
                                    <rect x="290" y="252" width="22" height="106" rx="4" fill="var(--lp-primary, #6366f1)" opacity="0.55"/>
                                    <rect x="322" y="196" width="22" height="162" rx="4" fill="var(--lp-primary, #6366f1)"/>
                                    <rect x="354" y="222" width="22" height="136" rx="4" fill="var(--lp-primary, #6366f1)" opacity="0.82"/>
                                </g>
                                <g>
                                    <rect x="408" y="140" width="122" height="236" rx="12" fill="#fff" stroke="#e5e9f2"/>
                                    <rect x="424" y="156" width="76" height="9" rx="4.5" fill="#8d96ab"/>
                                    <circle cx="469" cy="242" r="40" fill="none" stroke="#edf0f6" stroke-width="14"/>
                                    <circle cx="469" cy="242" r="40" fill="none" stroke="var(--lp-primary, #6366f1)" stroke-width="14"
                                        stroke-dasharray="188 251" stroke-linecap="round" transform="rotate(-90 469 242)"/>
                                    <text x="469" y="248" font-family="sans-serif" font-size="17" font-weight="700" fill="#28304a" text-anchor="middle">75%</text>
                                    <rect x="424" y="306" width="82" height="8" rx="4" fill="#c6ccdb"/>
                                    <rect x="424" y="326" width="64" height="8" rx="4" fill="#e0e4ee"/>
                                    <rect x="424" y="346" width="72" height="8" rx="4" fill="#e0e4ee"/>
                                </g>
                            </svg>
                        </div>
                        <span class="lp-jp-hero-float-alert" aria-hidden="true">リアルタイム集計中</span>
                        <div class="lp-jp-hero-float" aria-hidden="true">
                            <svg width="38" height="38" viewBox="0 0 38 38">
                                <circle cx="19" cy="19" r="19" fill="#e8f8ee"/>
                                <path d="M11 19.5l5.5 5.5L27 14" fill="none" stroke="#1fa45c" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span>
                                <span class="lp-jp-hero-float-title">今月の勤怠締め 完了</span>
                                <span class="lp-jp-hero-float-sub">所要時間 8分32秒</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'jp-problem-checklist': {
    name: '悩みチェックリスト',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-problem lp-jp-seam-top" aria-labelledby="jp-problem-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-bl" data-parallax="0.1">PROBLEM</span>
            </div>
            <span class="lp-jp-side-label" aria-hidden="true">SECTION 01 — お悩みチェック</span>
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title" data-motion="up">
                    <span class="lp-jp-band-eyebrow">CHECK LIST</span>
                    <h2 id="jp-problem-title"><span class="lp-jp-band-heading"><span class="lp-nb">こんな<span class="lp-jp-marker">お悩み</span>、</span><span class="lp-nb">ありませんか？</span></span></h2>
                    <p class="lp-jp-band-sub"><span class="lp-nb">1つでも当てはまる方は、</span><span class="lp-nb">勤怠管理の見直しどきです。</span></p>
                </header>
                <div class="lp-jp-problem-grid">
                    <div class="lp-jp-problem-main">
                        <ul class="lp-jp-checklist">
                            <li class="lp-jp-check-item" data-motion="up">打刻漏れ・修正依頼の確認に毎月何時間もかかっている</li>
                            <li class="lp-jp-check-item" data-motion="up" data-motion-delay="60">Excelの勤怠表と給与ソフトへの転記でミスが絶えない</li>
                            <li class="lp-jp-check-item" data-motion="up" data-motion-delay="120">残業時間の上限超過に、月末になってから気づく</li>
                            <li class="lp-jp-check-item" data-motion="up" data-motion-delay="180">有給休暇の残日数管理が属人化していて把握できない</li>
                            <li class="lp-jp-check-item" data-motion="up" data-motion-delay="240">テレワークや直行直帰の勤務実態が見えない</li>
                            <li class="lp-jp-check-item" data-motion="up" data-motion-delay="300">法改正のたびに就業規則との整合チェックに追われる</li>
                        </ul>
                        <p class="lp-jp-problem-tally" data-motion="fade" data-motion-delay="320">
                            <strong>2つ以上</strong>当てはまったら、仕組みを変えるサインです
                        </p>
                    </div>
                    <aside class="lp-jp-problem-aside">
                        <p class="lp-jp-speech" data-motion="scale" data-motion-delay="120"><span class="lp-nb">その悩み、</span><span class="lp-nb"><span class="lp-jp-marker">タイムライトクラウド</span>が</span><span class="lp-nb">まとめて解決します！</span></p>
                        <p class="lp-jp-speech-source">
                            <svg class="lp-jp-mascot" width="52" height="52" viewBox="0 0 52 52" role="img" aria-label="タイムライトクラウド公式キャラクター">
                                <circle cx="26" cy="26" r="25" fill="var(--lp-primary, #6366f1)"/>
                                <circle cx="26" cy="26" r="19" fill="#fff"/>
                                <line x1="26" y1="26" x2="26" y2="14.5" stroke="var(--lp-primary, #6366f1)" stroke-width="3" stroke-linecap="round"/>
                                <line x1="26" y1="26" x2="34" y2="30" stroke="var(--lp-primary, #6366f1)" stroke-width="3" stroke-linecap="round"/>
                                <circle cx="26" cy="26" r="2.6" fill="var(--lp-primary, #6366f1)"/>
                                <circle cx="19" cy="21" r="1.6" fill="#28304a"/>
                                <circle cx="33" cy="21" r="1.6" fill="#28304a"/>
                            </svg>
                            導入企業3,000社の運用ノウハウでサポートします
                        </p>
                        <div class="lp-jp-mini-stat" data-motion="up" data-motion-delay="200">
                            <span class="lp-jp-mini-stat-label">導入企業の平均削減時間</span>
                            <span class="lp-jp-mini-stat-value">
                                <span class="lp-jp-mini-stat-num" data-counter="32" data-counter-suffix="">32</span>
                                <span class="lp-jp-mini-stat-unit">時間/月</span>
                            </span>
                            <span class="lp-jp-note">※2025年12月時点、導入128社の当社調べ。</span>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
        `,
  },

  'jp-empathy-bridge': {
    name: '共感→解決ブリッジ',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-bridge lp-jp-seam-top-rev" aria-labelledby="jp-bridge-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-tr" data-parallax="0.14">SOLUTION</span>
            </div>
            <span class="lp-jp-side-label" aria-hidden="true">SECTION 02 — 課題から解決へ</span>
            <div class="lp-content-wrapper">
                <div class="lp-jp-bridge-grid">
                    <div class="lp-jp-bridge-quotes">
                        <p class="lp-jp-quote-card" data-motion="left">
                            <svg class="lp-jp-quote-avatar" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                                <circle cx="20" cy="20" r="20" fill="#dbe3f8"/>
                                <circle cx="20" cy="16" r="7" fill="var(--lp-primary, #6366f1)" opacity="0.7"/>
                                <path d="M5 42c2-9 8-13 15-13s13 4 15 13z" fill="var(--lp-primary, #6366f1)" opacity="0.7"/>
                            </svg>
                            <span>「月末月初は勤怠の締めで<strong>残業続き</strong>…」</span>
                        </p>
                        <p class="lp-jp-quote-card" data-motion="left" data-motion-delay="100">
                            <svg class="lp-jp-quote-avatar" width="40" height="40" viewBox="0 0 40 40" aria-hidden="true">
                                <circle cx="20" cy="20" r="20" fill="#fdeed3"/>
                                <circle cx="20" cy="16" r="7" fill="var(--lp-accent, #f59e0b)" opacity="0.75"/>
                                <path d="M5 42c2-9 8-13 15-13s13 4 15 13z" fill="var(--lp-accent, #f59e0b)" opacity="0.75"/>
                            </svg>
                            <span>「チェックしても、<strong>修正が出てくる</strong>…」</span>
                        </p>
                        <p class="lp-jp-bridge-empathy" data-motion="left" data-motion-delay="200">
                            <span class="lp-nb">そのお気持ち、よく分かります。</span><span class="lp-nb">実は担当者の努力不足ではなく、</span><span class="lp-nb"><strong>仕組みの問題</strong>なのです。</span>
                        </p>
                    </div>
                    <div class="lp-jp-bridge-arrow" aria-hidden="true">
                        <span></span><span></span><span></span>
                    </div>
                    <div class="lp-jp-bridge-main">
                        <h2 id="jp-bridge-title" class="lp-jp-bridge-answer" data-motion="up">
                            <span class="lp-nb">だからこそ、</span><span class="lp-nb"><strong>集計ゼロ・転記ゼロ</strong>の</span><br>
                            <span class="lp-nb"><span class="lp-jp-marker">自動化された</span></span><span class="lp-nb"><span class="lp-jp-marker">勤怠管理</span>が</span><span class="lp-nb">必要です。</span>
                        </h2>
                        <p class="lp-jp-bridge-lead" data-motion="up" data-motion-delay="100">
                            <span class="lp-nb">タイムライトクラウドは</span><span class="lp-nb">打刻データをリアルタイムに自動集計。</span>
                            <span class="lp-nb">アラート機能が異常値をその場で検知するので、</span><span class="lp-nb">月末にまとめて確認する作業そのものが</span><span class="lp-nb">なくなります。</span>
                        </p>
                        <div class="lp-jp-stat-row" aria-label="導入効果の実績値">
                            <div class="lp-jp-stat" data-motion="up" data-motion-delay="140">
                                <span class="lp-jp-stat-label">月次の集計時間</span>
                                <span class="lp-jp-stat-num"><span data-counter="87" data-counter-prefix="-" data-counter-suffix="%">-87%</span></span>
                            </div>
                            <div class="lp-jp-stat" data-motion="up" data-motion-delay="220">
                                <span class="lp-jp-stat-label">給与転記ミス</span>
                                <span class="lp-jp-stat-num"><span data-counter="0" data-counter-suffix="件">0件</span></span>
                            </div>
                            <div class="lp-jp-stat" data-motion="up" data-motion-delay="300">
                                <span class="lp-jp-stat-label">締め作業は最短</span>
                                <span class="lp-jp-stat-num"><span data-counter="10" data-counter-suffix="分">10分</span></span>
                            </div>
                        </div>
                        <span class="lp-jp-note">※2025年12月時点、導入企業128社の平均値（当社調べ）。</span>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'jp-reasons': {
    name: '選ばれる理由3選',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-reasons" aria-labelledby="jp-reasons-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-tl" data-parallax="0.1">REASON</span>
            </div>
            <span class="lp-jp-side-label" aria-hidden="true">SECTION 03 — 選ばれる理由</span>
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title" data-motion="up">
                    <span class="lp-jp-band-eyebrow">REASON</span>
                    <h2 id="jp-reasons-title"><span class="lp-jp-band-heading"><span class="lp-nb">タイムライトクラウドが</span><span class="lp-nb"><span class="lp-jp-marker">選ばれる3つの理由</span></span></span></h2>
                </header>
                <ol class="lp-jp-reason-list">
                    <li class="lp-jp-reason" data-motion="up">
                        <span class="lp-jp-reason-num" aria-hidden="true">1</span>
                        <span class="lp-jp-reason-icon" aria-hidden="true">
                            <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M40 24a16 16 0 1 1-4.9-11.5"/>
                                <path d="M40 6v8h-8"/>
                                <path d="M18 24l4.5 4.5L31 20"/>
                            </svg>
                        </span>
                        <h3><span class="lp-nb">集計・転記が</span><span class="lp-nb">完全自動</span></h3>
                        <p>打刻データを就業規則に沿って自動計算し、主要な給与ソフトへワンクリック連携。手作業の転記ミスをゼロにします。</p>
                    </li>
                    <li class="lp-jp-reason" data-motion="up" data-motion-delay="120">
                        <span class="lp-jp-reason-num" aria-hidden="true">2</span>
                        <span class="lp-jp-reason-icon" aria-hidden="true">
                            <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M24 5l15 5.5V22c0 9.5-6.4 16.2-15 20-8.6-3.8-15-10.5-15-20V10.5z"/>
                                <path d="M24 16v8"/>
                                <circle cx="24" cy="30.5" r="0.5" fill="currentColor" stroke-width="2.4"/>
                            </svg>
                        </span>
                        <h3><span class="lp-nb">法令リスクを</span><span class="lp-nb">事前にアラート</span></h3>
                        <p>残業上限や有給取得義務の未達を自動で検知して通知。月末に慌てる前に、リアルタイムで手を打てます。</p>
                    </li>
                    <li class="lp-jp-reason" data-motion="up" data-motion-delay="240">
                        <span class="lp-jp-reason-num" aria-hidden="true">3</span>
                        <span class="lp-jp-reason-icon" aria-hidden="true">
                            <svg width="52" height="52" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M9 28v-5a15 15 0 0 1 30 0v5"/>
                                <rect x="5" y="27" width="9" height="13" rx="4"/>
                                <rect x="34" y="27" width="9" height="13" rx="4"/>
                                <path d="M38 40v2a5 5 0 0 1-5 5h-6"/>
                            </svg>
                        </span>
                        <h3><span class="lp-nb">導入から定着まで</span><span class="lp-nb">専任伴走</span></h3>
                        <p>就業規則のヒアリングから初期設定、社内説明会の資料まで専任担当がサポート。導入後の定着率は99.2%※です。</p>
                    </li>
                </ol>
                <p class="lp-jp-reason-foot" data-motion="fade" data-motion-delay="200">
                    <a class="lp-jp-more-link" href="#features" aria-label="全32機能の一覧を見る">全32機能の一覧を見る</a>
                    <span class="lp-jp-note">※2025年12月時点、当社契約データベースにおける年間継続率。</span>
                </p>
            </div>
        </section>
        `,
  },

  'jp-steps': {
    name: 'ご利用の流れ3ステップ',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-steps-section lp-jp-seam-top" aria-labelledby="jp-steps-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-br" data-parallax="0.1">FLOW</span>
            </div>
            <span class="lp-jp-side-label" aria-hidden="true">SECTION 04 — ご利用の流れ</span>
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title" data-motion="up">
                    <span class="lp-jp-band-eyebrow">FLOW</span>
                    <h2 id="jp-steps-title"><span class="lp-jp-band-heading"><span class="lp-nb">ご利用開始まで</span><span class="lp-nb"><span class="lp-jp-marker">最短即日</span>・3ステップ</span></span></h2>
                </header>
                <ol class="lp-jp-steps">
                    <li class="lp-jp-step" data-motion="up">
                        <span class="lp-jp-step-num"><span class="lp-jp-step-num-label">STEP</span><span class="lp-jp-step-num-digit">01</span></span>
                        <span class="lp-jp-step-time">所要 約30秒</span>
                        <h3><span class="lp-nb">フォームから</span><span class="lp-nb">お申し込み</span></h3>
                        <p>会社名とメールアドレスを入力するだけ。その場でアカウントが発行され、すぐに管理画面へ入れます。</p>
                    </li>
                    <li class="lp-jp-step-arrow" aria-hidden="true"></li>
                    <li class="lp-jp-step" data-motion="up" data-motion-delay="120">
                        <span class="lp-jp-step-num"><span class="lp-jp-step-num-label">STEP</span><span class="lp-jp-step-num-digit">02</span></span>
                        <span class="lp-jp-step-time">1〜3営業日</span>
                        <h3><span class="lp-nb">就業規則にあわせて</span><span class="lp-nb">初期設定</span></h3>
                        <p>専任スタッフがオンラインでヒアリングし、締め日・残業ルール・雇用区分を代行設定します。</p>
                    </li>
                    <li class="lp-jp-step-arrow" aria-hidden="true"></li>
                    <li class="lp-jp-step" data-motion="up" data-motion-delay="240">
                        <span class="lp-jp-step-num"><span class="lp-jp-step-num-label">STEP</span><span class="lp-jp-step-num-digit">03</span></span>
                        <span class="lp-jp-step-time">設定完了後 即日</span>
                        <h3><span class="lp-nb">その日から</span><span class="lp-nb">打刻スタート</span></h3>
                        <p>PC・スマホ・ICカードですぐに打刻開始。集計はすべて自動なので、あとは待つだけです。</p>
                    </li>
                </ol>
                <p class="lp-jp-note lp-jp-steps-note">※初期設定の代行は従業員100名までのプランが対象です。101名以上は別途お見積りとなります。</p>
            </div>
        </section>
        `,
  },

  'jp-compare-table': {
    name: '他社比較表',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-compare" aria-labelledby="jp-compare-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-br" data-parallax="0.1">COMPARE</span>
            </div>
            <span class="lp-jp-side-label" aria-hidden="true">SECTION 05 — 他社比較</span>
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title" data-motion="up">
                    <span class="lp-jp-band-eyebrow">COMPARISON</span>
                    <h2 id="jp-compare-title"><span class="lp-jp-band-heading"><span class="lp-nb">他社サービスとの</span><span class="lp-nb"><span class="lp-jp-marker">違い</span>をご覧ください</span></span></h2>
                </header>
                <div class="lp-jp-compare-wrap" role="region" aria-label="他社比較表（横にスクロールできます）" tabindex="0" data-motion="up" data-motion-delay="100">
                    <table class="lp-jp-compare-table">
                        <thead>
                            <tr>
                                <th scope="col">項目</th>
                                <th scope="col" class="lp-jp-compare-own"><span class="lp-jp-compare-own-tag">おすすめ</span>タイムライト<br>クラウド</th>
                                <th scope="col">A社</th>
                                <th scope="col">B社</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">月額料金（1名）</th>
                                <td class="lp-jp-compare-own">300円〜</td>
                                <td>500円〜</td>
                                <td>450円〜</td>
                            </tr>
                            <tr>
                                <th scope="row">初期費用</th>
                                <td class="lp-jp-compare-own"><span class="lp-jp-good" aria-label="優れている">◎</span><br>0円</td>
                                <td><span class="lp-jp-soso" aria-label="条件つき">△</span><br>10万円〜</td>
                                <td><span class="lp-jp-bad" aria-label="非対応">×</span><br>要問い合わせ</td>
                            </tr>
                            <tr>
                                <th scope="row">給与ソフト連携</th>
                                <td class="lp-jp-compare-own"><span class="lp-jp-good" aria-label="優れている">◎</span><br>主要20種に対応</td>
                                <td><span class="lp-jp-good" aria-label="対応">○</span><br>8種に対応</td>
                                <td><span class="lp-jp-soso" aria-label="条件つき">△</span><br>CSV出力のみ</td>
                            </tr>
                            <tr>
                                <th scope="row">残業・有給アラート</th>
                                <td class="lp-jp-compare-own"><span class="lp-jp-good" aria-label="優れている">◎</span><br>リアルタイム通知</td>
                                <td><span class="lp-jp-soso" aria-label="条件つき">△</span><br>日次バッチ</td>
                                <td><span class="lp-jp-bad" aria-label="非対応">×</span></td>
                            </tr>
                            <tr>
                                <th scope="row">導入サポート</th>
                                <td class="lp-jp-compare-own"><span class="lp-jp-good" aria-label="優れている">◎</span><br>専任担当が代行</td>
                                <td><span class="lp-jp-soso" aria-label="条件つき">△</span><br>マニュアル提供</td>
                                <td><span class="lp-jp-good" aria-label="対応">○</span><br>有償オプション</td>
                            </tr>
                            <tr>
                                <th scope="row">無料トライアル</th>
                                <td class="lp-jp-compare-own"><span class="lp-jp-good" aria-label="優れている">◎</span><br>30日間</td>
                                <td><span class="lp-jp-good" aria-label="対応">○</span><br>14日間</td>
                                <td><span class="lp-jp-bad" aria-label="非対応">×</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <span class="lp-jp-note lp-jp-compare-note">※2026年6月時点、各社公開情報をもとに当社作成。最新の料金・機能は各社サイトをご確認ください。</span>
            </div>
        </section>
        `,
  },

  'jp-voice': {
    name: 'お客様の声（高密度）',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-voice" aria-labelledby="jp-voice-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-tl" data-parallax="0.1">VOICE</span>
            </div>
            <span class="lp-jp-side-label" aria-hidden="true">SECTION 06 — お客様の声</span>
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title" data-motion="up">
                    <span class="lp-jp-band-eyebrow">VOICE</span>
                    <h2 id="jp-voice-title"><span class="lp-jp-band-heading"><span class="lp-nb">導入企業さまの</span><span class="lp-nb"><span class="lp-jp-marker">リアルな声</span></span></span></h2>
                </header>
                <div class="lp-jp-voice-summary" data-motion="scale">
                    <div class="lp-jp-voice-summary-score" aria-label="総合満足度 5点満点中4.8点">
                        <span class="lp-jp-voice-summary-num" data-counter="4.8">4.8</span>
                        <span class="lp-jp-voice-summary-stars" aria-hidden="true">★★★★★</span>
                        <span class="lp-jp-voice-summary-label">総合満足度※</span>
                    </div>
                    <div class="lp-jp-stat-row lp-jp-voice-summary-facts">
                        <div class="lp-jp-stat">
                            <span class="lp-jp-stat-label">回答件数</span>
                            <span class="lp-jp-stat-num"><span data-counter="1247" data-counter-suffix="件">1,247件</span></span>
                        </div>
                        <div class="lp-jp-stat">
                            <span class="lp-jp-stat-label">継続利用意向</span>
                            <span class="lp-jp-stat-num"><span data-counter="96.4" data-counter-suffix="%">96.4%</span></span>
                        </div>
                        <div class="lp-jp-stat">
                            <span class="lp-jp-stat-label">サポート評価</span>
                            <span class="lp-jp-stat-num"><span data-counter="4.9" data-counter-suffix="点">4.9点</span></span>
                        </div>
                    </div>
                </div>
                <div class="lp-jp-voice-grid">
                    <article class="lp-jp-voice-card" data-motion="up">
                        <span class="lp-jp-voice-tag">コスト削減</span>
                        <p class="lp-jp-stars" aria-label="5点満点中4.8点の評価">★★★★★<span class="lp-jp-stars-score">4.8</span></p>
                        <h3 class="lp-jp-voice-title"><span class="lp-nb">月40時間かかっていた</span><span class="lp-nb">締め作業が<span class="lp-jp-marker">半日で完了</span></span></h3>
                        <p class="lp-jp-voice-body">拠点ごとにバラバラだったExcel集計を廃止できました。給与ソフト連携で転記作業もなくなり、締め日直後の残業がゼロに。もっと早く入れればよかったです。</p>
                        <footer class="lp-jp-voice-meta">
                            <svg class="lp-jp-avatar" width="52" height="52" viewBox="0 0 52 52" role="img" aria-label="佐藤様のアバター">
                                <defs><clipPath id="lpjpav1"><circle cx="26" cy="26" r="26"/></clipPath></defs>
                                <g clip-path="url(#lpjpav1)">
                                    <rect width="52" height="52" fill="#dbe3f8"/>
                                    <circle cx="26" cy="21" r="9.5" fill="var(--lp-primary, #6366f1)" opacity="0.75"/>
                                    <path d="M6 56c2.5-12 10.5-17 20-17s17.5 5 20 17z" fill="var(--lp-primary, #6366f1)" opacity="0.75"/>
                                </g>
                            </svg>
                            <p class="lp-jp-voice-name">佐藤 様（40代・総務部長）<span class="lp-jp-voice-attr">製造業／従業員320名</span></p>
                        </footer>
                    </article>
                    <article class="lp-jp-voice-card" data-motion="up" data-motion-delay="120">
                        <span class="lp-jp-voice-tag">リスク対策</span>
                        <p class="lp-jp-stars" aria-label="5点満点中4.6点の評価">★★★★★<span class="lp-jp-stars-score">4.6</span></p>
                        <h3 class="lp-jp-voice-title"><span class="lp-nb">残業の上限超過アラートで</span><span class="lp-nb"><span class="lp-jp-marker">労務リスクを未然に防止</span></span></h3>
                        <p class="lp-jp-voice-body">36協定の上限に近づくと本人と上長に自動通知が届くので、月末に慌てて調整することがなくなりました。監査対応の資料出力も助かっています。</p>
                        <footer class="lp-jp-voice-meta">
                            <svg class="lp-jp-avatar" width="52" height="52" viewBox="0 0 52 52" role="img" aria-label="田中様のアバター">
                                <defs><clipPath id="lpjpav2"><circle cx="26" cy="26" r="26"/></clipPath></defs>
                                <g clip-path="url(#lpjpav2)">
                                    <rect width="52" height="52" fill="#fdeed3"/>
                                    <circle cx="26" cy="21" r="9.5" fill="var(--lp-accent, #f59e0b)" opacity="0.8"/>
                                    <path d="M6 56c2.5-12 10.5-17 20-17s17.5 5 20 17z" fill="var(--lp-accent, #f59e0b)" opacity="0.8"/>
                                </g>
                            </svg>
                            <p class="lp-jp-voice-name">田中 様（30代・人事労務担当）<span class="lp-jp-voice-attr">IT・通信／従業員85名</span></p>
                        </footer>
                    </article>
                    <article class="lp-jp-voice-card" data-motion="up" data-motion-delay="240">
                        <span class="lp-jp-voice-tag">現場定着</span>
                        <p class="lp-jp-stars" aria-label="5点満点中4.9点の評価">★★★★★<span class="lp-jp-stars-score">4.9</span></p>
                        <h3 class="lp-jp-voice-title"><span class="lp-nb">ITが苦手な現場でも</span><span class="lp-nb"><span class="lp-jp-marker">初日から迷わず打刻</span></span></h3>
                        <p class="lp-jp-voice-body">スマホとICカードの併用ができるので、店舗スタッフにもすぐ定着しました。導入時は専任の方が説明会用の資料まで用意してくれて心強かったです。</p>
                        <footer class="lp-jp-voice-meta">
                            <svg class="lp-jp-avatar" width="52" height="52" viewBox="0 0 52 52" role="img" aria-label="鈴木様のアバター">
                                <defs><clipPath id="lpjpav3"><circle cx="26" cy="26" r="26"/></clipPath></defs>
                                <g clip-path="url(#lpjpav3)">
                                    <rect width="52" height="52" fill="#e2e8f0"/>
                                    <circle cx="26" cy="21" r="9.5" fill="#64748b"/>
                                    <path d="M6 56c2.5-12 10.5-17 20-17s17.5 5 20 17z" fill="#64748b"/>
                                </g>
                            </svg>
                            <p class="lp-jp-voice-name">鈴木 様（50代・店舗運営部）<span class="lp-jp-voice-attr">小売業／従業員150名</span></p>
                        </footer>
                    </article>
                </div>
                <span class="lp-jp-note lp-jp-voice-note">※掲載内容は個人の感想であり、効果を保証するものではありません。評価点は2025年◯◯調査の平均値です。</span>
            </div>
        </section>
        `,
  },

  'jp-badge-strip': {
    name: '実績・掲載メディア帯',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-badge-strip" aria-label="実績と掲載メディア">
            <div class="lp-content-wrapper">
                <div class="lp-jp-badge-row lp-jp-bleed-up" role="list" aria-label="受賞・実績バッジ">
                    <div class="lp-jp-badge" role="listitem" data-motion="scale">
                        <span class="lp-jp-badge-label">顧客満足度</span>
                        <span class="lp-jp-badge-value">No.1</span>
                        <span class="lp-jp-badge-ref">※1</span>
                    </div>
                    <div class="lp-jp-badge" role="listitem" data-motion="scale" data-motion-delay="90">
                        <span class="lp-jp-badge-label">導入社数</span>
                        <span class="lp-jp-badge-value" data-counter="3000" data-counter-suffix="社">3,000社</span>
                        <span class="lp-jp-badge-ref">突破※2</span>
                    </div>
                    <div class="lp-jp-badge" role="listitem" data-motion="scale" data-motion-delay="180">
                        <span class="lp-jp-badge-label">年間継続率</span>
                        <span class="lp-jp-badge-value" data-counter="99.2" data-counter-suffix="%">99.2%</span>
                        <span class="lp-jp-badge-ref">※2</span>
                    </div>
                    <div class="lp-jp-badge" role="listitem" data-motion="scale" data-motion-delay="270">
                        <span class="lp-jp-badge-label">SaaSアワード</span>
                        <span class="lp-jp-badge-value">受賞</span>
                        <span class="lp-jp-badge-ref">2025年※3</span>
                    </div>
                </div>
                <div class="lp-jp-badge-media" aria-label="掲載メディア" data-motion="fade" data-motion-delay="200">
                    <span class="lp-jp-badge-media-label">＼ 各種メディアで紹介されました ／</span>
                    <span class="lp-jp-media-logo lp-jp-media-logo-serif">Biz Journal</span>
                    <span class="lp-jp-media-logo lp-jp-media-logo-caps">HR TIMES</span>
                    <span class="lp-jp-media-logo lp-jp-media-logo-slab">SaaS Mag</span>
                    <span class="lp-jp-media-logo lp-jp-media-logo-round">WORK LAB</span>
                </div>
                <span class="lp-jp-note">※1 2025年◯◯総研「勤怠管理システム利用実態調査」 ※2 2025年12月時点の当社実績 ※3 ◯◯協会主催「SaaSアワード2025」業務効率化部門</span>
            </div>
        </section>
        `,
  },

  'jp-offer-box': {
    name: '特別オファー',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-offer-section" aria-labelledby="jp-offer-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-bl" data-parallax="0.12">OFFER</span>
            </div>
            <div class="lp-content-wrapper">
                <div class="lp-jp-offer-wrap lp-jp-bleed-up">
                    <span class="lp-jp-float-chip" aria-hidden="true">先着50社限定</span>
                    <div class="lp-jp-offer" data-motion="up">
                        <p class="lp-jp-offer-deadline">
                            <span aria-hidden="true">＼</span>7月31日（金）お申し込み分まで<span aria-hidden="true">／</span>
                        </p>
                        <h2 id="jp-offer-title" class="lp-jp-offer-title"><span class="lp-nb">今だけ、<span class="lp-jp-marker">3つの特典</span>付きで</span><br><span class="lp-nb">スタートできます</span></h2>
                        <ul class="lp-jp-offer-benefits">
                            <li data-motion="left" data-motion-delay="80"><span class="lp-jp-offer-benefit-tag">特典1</span>初期設定代行（通常60,000円）が無料</li>
                            <li data-motion="left" data-motion-delay="160"><span class="lp-jp-offer-benefit-tag">特典2</span>無料トライアル期間を30日→60日に延長</li>
                            <li data-motion="left" data-motion-delay="240"><span class="lp-jp-offer-benefit-tag">特典3</span>「勤怠DX導入チェックリスト」PDFをプレゼント</li>
                        </ul>
                        <p class="lp-jp-offer-price-row" data-motion="scale" data-motion-delay="240">
                            <span class="lp-jp-price-label">初期設定代行</span>
                            <span class="lp-jp-price-strike">60,000円</span>
                            <span class="lp-jp-price">
                                <span class="lp-jp-price-em">0</span>
                                <span class="lp-jp-price-unit">円</span>
                                <span class="lp-jp-price-tax">（税込）</span>
                            </span>
                        </p>
                        <button type="button" class="lp-jp-btn" aria-label="特典付きで無料トライアルに申し込む">特典付きで申し込む</button>
                        <span class="lp-jp-note">※特典は期間中に新規でお申し込みいただいた法人のお客様が対象です。<br>※他のキャンペーンとの併用はできません。予告なく終了する場合があります。</span>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'jp-cta-band': {
    name: 'CTA帯（繰り返し用）',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-cta-band lp-jp-seam-top" aria-labelledby="jp-cta-band-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-center" data-parallax="0.14">START NOW</span>
            </div>
            <div class="lp-content-wrapper">
                <span class="lp-jp-cta-guarantee" data-motion="scale" data-motion-delay="240"><strong>30日間</strong>返金保証※</span>
                <p class="lp-jp-cta-urgency" data-motion="fade">今なら初期設定代行が無料（7月31日まで）</p>
                <h2 id="jp-cta-band-title" class="lp-jp-cta-copy" data-motion="up" data-motion-delay="60"><span class="lp-nb">面倒な勤怠集計は、</span><span class="lp-nb">今月で終わりにしませんか？</span></h2>
                <div class="lp-jp-cta-arrow" aria-hidden="true"></div>
                <button type="button" class="lp-jp-btn" aria-label="30日間の無料トライアルを申し込む" data-motion="up" data-motion-delay="140">30日間 無料で試してみる</button>
                <ul class="lp-jp-cta-micro" data-motion="up" data-motion-delay="220">
                    <li>お申し込みは30秒で完了</li>
                    <li>クレジットカード登録不要</li>
                    <li>いつでも解約OK</li>
                </ul>
                <span class="lp-jp-note">※返金保証は有料プラン初月分が対象です。詳細は利用規約をご確認ください。</span>
            </div>
        </section>
        `,
  },

  'jp-faq-dense': {
    name: 'FAQ（高密度）',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-faq" aria-labelledby="jp-faq-title">
            <div class="lp-jp-deco" aria-hidden="true">
                <span class="lp-jp-bg-word lp-jp-bg-word-tr" data-parallax="0.1">Q&amp;A</span>
            </div>
            <span class="lp-jp-side-label" aria-hidden="true">SECTION 07 — よくある質問</span>
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title" data-motion="up">
                    <span class="lp-jp-band-eyebrow">FAQ</span>
                    <h2 id="jp-faq-title"><span class="lp-jp-band-heading"><span class="lp-nb">よくある</span><span class="lp-nb"><span class="lp-jp-marker">ご質問</span></span></span></h2>
                    <p class="lp-jp-band-sub"><span class="lp-nb">お問い合わせの多い質問をまとめました。</span><span class="lp-nb">その他のご質問はお気軽にご相談ください。</span></p>
                </header>
                <div class="lp-jp-faq-list">
                    <div class="lp-jp-faq-item" data-motion="up">
                        <h3 class="lp-jp-faq-q">無料トライアル終了後、自動で課金されますか？</h3>
                        <p class="lp-jp-faq-a">いいえ。トライアル終了後に自動課金されることはありません。継続をご希望の場合のみ、有料プランをお申し込みください。</p>
                    </div>
                    <div class="lp-jp-faq-item" data-motion="up" data-motion-delay="60">
                        <h3 class="lp-jp-faq-q">現在使っている給与ソフトと連携できますか？</h3>
                        <p class="lp-jp-faq-a">主要20種の給与ソフトに標準対応しています。対応外のソフトでもCSV形式での出力が可能です。詳細は連携一覧をご確認ください。</p>
                    </div>
                    <div class="lp-jp-faq-item" data-motion="up" data-motion-delay="120">
                        <h3 class="lp-jp-faq-q">変形労働時間制やフレックスにも対応していますか？</h3>
                        <p class="lp-jp-faq-a">1ヶ月・1年単位の変形労働時間制、フレックスタイム制、裁量労働制など主要な勤務形態に対応しています。設定は導入時に代行いたします。</p>
                    </div>
                    <div class="lp-jp-faq-item" data-motion="up" data-motion-delay="180">
                        <h3 class="lp-jp-faq-q">最低利用人数や契約期間の縛りはありますか？</h3>
                        <p class="lp-jp-faq-a">最低利用人数は5名からで、契約は月単位です。年間契約の縛りはなく、いつでもプラン変更・解約が可能です。</p>
                    </div>
                    <div class="lp-jp-faq-item" data-motion="up" data-motion-delay="240">
                        <h3 class="lp-jp-faq-q">セキュリティ対策はどうなっていますか？</h3>
                        <p class="lp-jp-faq-a">通信は常時暗号化され、データは国内データセンターで冗長化して保管しています。ISMS（ISO/IEC 27001）認証を取得済みです。</p>
                    </div>
                    <div class="lp-jp-faq-item" data-motion="up" data-motion-delay="300">
                        <h3 class="lp-jp-faq-q">導入までにどのくらいの期間がかかりますか？</h3>
                        <p class="lp-jp-faq-a">最短で即日からご利用いただけます。就業規則が複雑な場合でも、平均2週間程度で本稼働しているお客様がほとんどです。</p>
                    </div>
                </div>
                <div class="lp-jp-faq-contact" data-motion="up" data-motion-delay="200">
                    <div class="lp-jp-faq-contact-tel">
                        <span class="lp-jp-faq-contact-label">お電話でのご相談（通話無料）</span>
                        <a class="lp-jp-faq-contact-num" href="tel:0120000000" aria-label="電話で相談する。フリーダイヤル0120-000-000">0120-000-000</a>
                        <span class="lp-jp-note">平日 9:00〜18:00（土日祝休）／導入前の相談だけでも歓迎です</span>
                    </div>
                    <div class="lp-jp-faq-contact-web">
                        <span class="lp-jp-faq-contact-copy"><span class="lp-nb">解決しなかった疑問は、</span><span class="lp-nb">専任スタッフが直接お答えします</span></span>
                        <button type="button" class="lp-jp-btn lp-jp-btn-sm" aria-label="フォームで質問する">フォームで質問する</button>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  // ============================================================
  // アワード志向リッチ表現
  // ============================================================

  'rich-hero-typo': {
    name: 'リッチヒーロー（大型タイポ）',
    category: 'rich-design',
    html: `
        <section class="lp-section lp-rich-hero" aria-labelledby="rich-hero-title">
            <span class="lp-rich-bg-word lp-rich-hero-bgword" aria-hidden="true" data-parallax="0.18">TIME</span>
            <div class="lp-rich-meta" data-motion="fade">
                <span>TIMELIGHT&reg;</span>
                <span>TOKYO — 2026</span>
                <span>WORKSTYLE PLATFORM</span>
            </div>
            <h1 id="rich-hero-title" class="lp-rich-title-xl">
                <span data-motion="up">Design</span>
                <span class="lp-rich-outline" data-motion="up" data-motion-delay="90">the Time,</span>
                <span class="lp-rich-title-accent" data-motion="up" data-motion-delay="180">Free</span>
                <span data-motion="up" data-motion-delay="270">the People.</span>
            </h1>
            <p class="lp-rich-vertical" aria-hidden="true">時間をデザインする</p>
            <div class="lp-rich-hero-footer">
                <p class="lp-rich-hero-lede" data-motion="up" data-motion-delay="200">
                    <span class="lp-nb">働く時間の一秒までを、</span><span class="lp-nb">美しく整える。</span>
                    <span class="lp-nb">タイムライトは、</span><span class="lp-nb">テクノロジーとデザインの力で</span>
                    <span class="lp-nb">「管理」を「体験」へと再定義する</span><span class="lp-nb">ワークスタイルプラットフォームです。</span>
                </p>
                <div class="lp-rich-hero-stats" aria-label="スタジオの実績" data-motion="up" data-motion-delay="300">
                    <div class="lp-rich-hero-stat">
                        <span class="lp-rich-hero-stat-num" data-counter="12">12</span>
                        <span class="lp-rich-hero-stat-label">Awards</span>
                    </div>
                    <div class="lp-rich-hero-stat">
                        <span class="lp-rich-hero-stat-num" data-counter="240">240</span>
                        <span class="lp-rich-hero-stat-label">Projects</span>
                    </div>
                    <div class="lp-rich-hero-stat">
                        <span class="lp-rich-hero-stat-num" data-counter="16">16</span>
                        <span class="lp-rich-hero-stat-label">Countries</span>
                    </div>
                </div>
                <span class="lp-rich-scroll-cue">Scroll</span>
            </div>
        </section>
        `,
  },

  'rich-marquee': {
    name: 'マーキー帯',
    category: 'rich-design',
    html: `
        <section class="lp-section lp-rich-marquee" aria-label="ブランドメッセージ（装飾）">
            <div class="lp-rich-marquee-inner">
                <div class="lp-rich-marquee-track">
                    <div class="lp-rich-marquee-group">
                        <span>Craft</span><span class="lp-rich-marquee-sep" aria-hidden="true">✦</span>
                        <span class="lp-rich-outline">Precision</span><span class="lp-rich-marquee-sep" aria-hidden="true">✦</span>
                        <span>余白の美学</span><span class="lp-rich-marquee-sep" aria-hidden="true">✦</span>
                        <span class="lp-rich-outline">Typography</span><span class="lp-rich-marquee-sep" aria-hidden="true">✦</span>
                    </div>
                    <div class="lp-rich-marquee-group" aria-hidden="true">
                        <span>Craft</span><span class="lp-rich-marquee-sep">✦</span>
                        <span class="lp-rich-outline">Precision</span><span class="lp-rich-marquee-sep">✦</span>
                        <span>余白の美学</span><span class="lp-rich-marquee-sep">✦</span>
                        <span class="lp-rich-outline">Typography</span><span class="lp-rich-marquee-sep">✦</span>
                    </div>
                </div>
            </div>
        </section>
        `,
  },

  'rich-features-editorial': {
    name: 'エディトリアル特集',
    category: 'rich-design',
    html: `
        <section class="lp-section lp-rich-editorial" aria-labelledby="rich-editorial-title">
            <span class="lp-rich-vertical lp-rich-vertical-edge" aria-hidden="true">FEATURES — 01 / 03</span>
            <header class="lp-rich-editorial-head" data-motion="up">
                <span class="lp-rich-eyebrow">Features</span>
                <h2 id="rich-editorial-title" class="lp-rich-editorial-title">機能ではなく、体験を。</h2>
            </header>
            <div class="lp-rich-offset-grid">
                <article class="lp-rich-editorial-item">
                    <span class="lp-rich-index-num" aria-hidden="true" data-parallax="0.16">01</span>
                    <div class="lp-rich-editorial-media" data-motion="left">
                        <svg class="lp-rich-art" viewBox="0 0 720 540" role="img" aria-label="つなぎ目のない流れを表す抽象アート">
                            <defs>
                                <filter id="lpg-e1"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer><feComposite operator="in" in2="SourceGraphic"/></filter>
                                <linearGradient id="lpgr-e1" x1="0" y1="0" x2="1" y2="1">
                                    <stop offset="0" stop-color="var(--lp-primary, #6366f1)"/>
                                    <stop offset="1" stop-color="#191712"/>
                                </linearGradient>
                            </defs>
                            <rect width="720" height="540" fill="#eceadf"/>
                            <path d="M0 420 C 180 300, 300 520, 480 380 S 700 260, 720 300 L 720 540 L 0 540 Z" fill="url(#lpgr-e1)" opacity="0.92"/>
                            <circle cx="500" cy="170" r="110" fill="none" stroke="#191712" stroke-width="1.5"/>
                            <circle cx="500" cy="170" r="76" fill="var(--lp-primary, #6366f1)" opacity="0.16"/>
                            <line x1="60" y1="120" x2="330" y2="120" stroke="#191712" stroke-width="1.5"/>
                            <line x1="60" y1="150" x2="270" y2="150" stroke="#191712" stroke-width="1.5" opacity="0.55"/>
                            <line x1="60" y1="180" x2="300" y2="180" stroke="#191712" stroke-width="1.5" opacity="0.3"/>
                            <rect width="720" height="540" filter="url(#lpg-e1)"/>
                        </svg>
                    </div>
                    <div class="lp-rich-editorial-copy" data-motion="right" data-motion-delay="120">
                        <span class="lp-rich-editorial-num-label">FEATURE 01</span>
                        <h3><span class="lp-nb">Seamless</span><br><span class="lp-nb">つなぎ目のない一日</span></h3>
                        <p><span class="lp-nb">出社も、リモートも、移動中も。</span><span class="lp-nb">あらゆる働く場面が</span><span class="lp-nb">ひとつの流れとして記録され、</span><span class="lp-nb">意識せずとも一日が</span><span class="lp-nb">美しく整っていきます。</span></p>
                        <a class="lp-rich-textlink" href="#feature-seamless" aria-label="Seamlessの詳細を見る">Explore</a>
                    </div>
                </article>
                <article class="lp-rich-editorial-item">
                    <span class="lp-rich-index-num" aria-hidden="true" data-parallax="0.16">02</span>
                    <div class="lp-rich-editorial-media" data-motion="right">
                        <svg class="lp-rich-art" viewBox="0 0 720 540" role="img" aria-label="時間のインサイトを表す抽象アート">
                            <defs>
                                <filter id="lpg-e2"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer><feComposite operator="in" in2="SourceGraphic"/></filter>
                            </defs>
                            <rect width="720" height="540" fill="#191712"/>
                            <line x1="80" y1="460" x2="640" y2="460" stroke="#f5f3ee" stroke-width="1.5" opacity="0.6"/>
                            <rect x="110" y="330" width="46" height="130" fill="#f5f3ee" opacity="0.28"/>
                            <rect x="186" y="260" width="46" height="200" fill="#f5f3ee" opacity="0.45"/>
                            <rect x="262" y="300" width="46" height="160" fill="#f5f3ee" opacity="0.35"/>
                            <rect x="338" y="180" width="46" height="280" fill="var(--lp-primary, #6366f1)"/>
                            <rect x="414" y="230" width="46" height="230" fill="#f5f3ee" opacity="0.55"/>
                            <rect x="490" y="120" width="46" height="340" fill="#f5f3ee" opacity="0.85"/>
                            <circle cx="513" cy="88" r="18" fill="var(--lp-primary, #6366f1)"/>
                            <rect width="720" height="540" filter="url(#lpg-e2)"/>
                        </svg>
                    </div>
                    <div class="lp-rich-editorial-copy" data-motion="left" data-motion-delay="120">
                        <span class="lp-rich-editorial-num-label">FEATURE 02</span>
                        <h3><span class="lp-nb">Insight</span><br><span class="lp-nb">時間が語りはじめる</span></h3>
                        <p><span class="lp-nb">チームの時間の使い方が、</span><span class="lp-nb">静かなグラフィックとなって立ち上がる。</span><span class="lp-nb">数字の羅列ではなく、</span><span class="lp-nb">次の意思決定を導く風景として。</span></p>
                        <a class="lp-rich-textlink" href="#feature-insight" aria-label="Insightの詳細を見る">Explore</a>
                    </div>
                </article>
                <article class="lp-rich-editorial-item">
                    <span class="lp-rich-index-num" aria-hidden="true" data-parallax="0.16">03</span>
                    <div class="lp-rich-editorial-media" data-motion="left">
                        <svg class="lp-rich-art" viewBox="0 0 720 540" role="img" aria-label="静けさを表す余白の多い抽象アート">
                            <defs>
                                <filter id="lpg-e3"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer><feComposite operator="in" in2="SourceGraphic"/></filter>
                            </defs>
                            <rect width="720" height="540" fill="#f0eee4"/>
                            <line x1="0" y1="270" x2="720" y2="270" stroke="#191712" stroke-width="1" opacity="0.25"/>
                            <line x1="360" y1="0" x2="360" y2="540" stroke="#191712" stroke-width="1" opacity="0.25"/>
                            <circle cx="360" cy="270" r="54" fill="var(--lp-primary, #6366f1)"/>
                            <circle cx="360" cy="270" r="92" fill="none" stroke="#191712" stroke-width="1" opacity="0.4"/>
                            <rect width="720" height="540" filter="url(#lpg-e3)"/>
                        </svg>
                    </div>
                    <div class="lp-rich-editorial-copy" data-motion="right" data-motion-delay="120">
                        <span class="lp-rich-editorial-num-label">FEATURE 03</span>
                        <h3><span class="lp-nb">Quiet</span><br><span class="lp-nb">静けさという機能</span></h3>
                        <p><span class="lp-nb">通知は少なく、</span><span class="lp-nb">意味のあるものだけを。</span><span class="lp-nb">プロダクトが沈黙している時間こそが、</span><span class="lp-nb">集中というもっとも贅沢な体験を</span><span class="lp-nb">つくります。</span></p>
                        <a class="lp-rich-textlink" href="#feature-quiet" aria-label="Quietの詳細を見る">Explore</a>
                    </div>
                </article>
            </div>
        </section>
        `,
  },

  'rich-showcase-scroll': {
    name: '横スクロールショーケース',
    category: 'rich-design',
    html: `
        <section class="lp-section lp-rich-showcase" aria-labelledby="rich-showcase-title">
            <span class="lp-rich-bg-word lp-rich-showcase-bgword" aria-hidden="true" data-parallax="0.12">WORKS</span>
            <header class="lp-rich-showcase-head" data-motion="up">
                <h2 id="rich-showcase-title" class="lp-rich-showcase-title">Selected Works</h2>
                <span class="lp-rich-hscroll-hint" aria-hidden="true">Drag / Scroll →</span>
            </header>
            <div class="lp-rich-hscroll" role="region" aria-label="ショーケースギャラリー（横にスクロールできます）" tabindex="0">
                <figure class="lp-rich-hscroll-item" data-motion="up">
                    <svg class="lp-rich-art" viewBox="0 0 640 800" role="img" aria-label="Aurora Identityのキービジュアル">
                        <defs>
                            <filter id="lpg-s1"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer><feComposite operator="in" in2="SourceGraphic"/></filter>
                            <linearGradient id="lpgr-s1" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0" stop-color="var(--lp-primary, #6366f1)"/>
                                <stop offset="1" stop-color="#191712"/>
                            </linearGradient>
                        </defs>
                        <rect width="640" height="800" fill="#eceadf"/>
                        <path d="M0 800 A 320 320 0 0 1 640 800 Z" fill="url(#lpgr-s1)"/>
                        <circle cx="320" cy="300" r="140" fill="none" stroke="#191712" stroke-width="1.5"/>
                        <circle cx="320" cy="300" r="8" fill="#191712"/>
                        <rect width="640" height="800" filter="url(#lpg-s1)"/>
                    </svg>
                    <figcaption class="lp-rich-hscroll-caption">
                        <div><h3>Aurora Identity</h3><p>Brand / Web</p></div>
                        <span class="lp-rich-hscroll-index">01</span>
                    </figcaption>
                </figure>
                <figure class="lp-rich-hscroll-item" data-motion="up" data-motion-delay="80">
                    <svg class="lp-rich-art" viewBox="0 0 640 800" role="img" aria-label="Monolith Appのキービジュアル">
                        <defs>
                            <filter id="lpg-s2"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer><feComposite operator="in" in2="SourceGraphic"/></filter>
                        </defs>
                        <rect width="640" height="800" fill="#191712"/>
                        <rect x="200" y="140" width="240" height="520" fill="#f5f3ee"/>
                        <rect x="200" y="140" width="240" height="130" fill="var(--lp-primary, #6366f1)"/>
                        <line x1="240" y1="330" x2="400" y2="330" stroke="#191712" stroke-width="2"/>
                        <line x1="240" y1="370" x2="370" y2="370" stroke="#191712" stroke-width="2" opacity="0.5"/>
                        <line x1="240" y1="410" x2="390" y2="410" stroke="#191712" stroke-width="2" opacity="0.3"/>
                        <rect width="640" height="800" filter="url(#lpg-s2)"/>
                    </svg>
                    <figcaption class="lp-rich-hscroll-caption">
                        <div><h3>Monolith App</h3><p>Product / UI</p></div>
                        <span class="lp-rich-hscroll-index">02</span>
                    </figcaption>
                </figure>
                <figure class="lp-rich-hscroll-item" data-motion="up" data-motion-delay="160">
                    <svg class="lp-rich-art" viewBox="0 0 640 800" role="img" aria-label="Paper and Pixelのキービジュアル">
                        <defs>
                            <filter id="lpg-s3"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer><feComposite operator="in" in2="SourceGraphic"/></filter>
                        </defs>
                        <rect width="640" height="800" fill="#f0eee4"/>
                        <circle cx="320" cy="400" r="230" fill="none" stroke="#191712" stroke-width="1"/>
                        <circle cx="320" cy="400" r="170" fill="none" stroke="#191712" stroke-width="1" opacity="0.6"/>
                        <circle cx="320" cy="400" r="110" fill="none" stroke="#191712" stroke-width="1" opacity="0.35"/>
                        <circle cx="320" cy="400" r="52" fill="var(--lp-primary, #6366f1)"/>
                        <line x1="320" y1="60" x2="320" y2="740" stroke="#191712" stroke-width="1" opacity="0.2"/>
                        <rect width="640" height="800" filter="url(#lpg-s3)"/>
                    </svg>
                    <figcaption class="lp-rich-hscroll-caption">
                        <div><h3>Paper &amp; Pixel</h3><p>Editorial</p></div>
                        <span class="lp-rich-hscroll-index">03</span>
                    </figcaption>
                </figure>
                <figure class="lp-rich-hscroll-item" data-motion="up" data-motion-delay="240">
                    <svg class="lp-rich-art" viewBox="0 0 640 800" role="img" aria-label="Void Galleryのキービジュアル">
                        <defs>
                            <filter id="lpg-s4"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer><feComposite operator="in" in2="SourceGraphic"/></filter>
                        </defs>
                        <rect width="640" height="800" fill="#eceadf"/>
                        <g fill="#191712" opacity="0.85">
                            <circle cx="160" cy="200" r="4"/><circle cx="280" cy="200" r="4"/><circle cx="400" cy="200" r="4"/><circle cx="520" cy="200" r="4"/>
                            <circle cx="160" cy="320" r="4"/><circle cx="280" cy="320" r="4"/><circle cx="400" cy="320" r="4"/><circle cx="520" cy="320" r="4"/>
                            <circle cx="160" cy="440" r="4"/><circle cx="280" cy="440" r="4"/><circle cx="400" cy="440" r="4"/><circle cx="520" cy="440" r="4"/>
                            <circle cx="160" cy="560" r="4"/><circle cx="280" cy="560" r="4"/><circle cx="400" cy="560" r="4"/><circle cx="520" cy="560" r="4"/>
                        </g>
                        <rect x="340" y="380" width="180" height="180" fill="var(--lp-primary, #6366f1)"/>
                        <rect x="120" y="620" width="400" height="1.5" fill="#191712"/>
                        <rect width="640" height="800" filter="url(#lpg-s4)"/>
                    </svg>
                    <figcaption class="lp-rich-hscroll-caption">
                        <div><h3>Void Gallery</h3><p>Spatial / Motion</p></div>
                        <span class="lp-rich-hscroll-index">04</span>
                    </figcaption>
                </figure>
                <figure class="lp-rich-hscroll-item" data-motion="up" data-motion-delay="320">
                    <svg class="lp-rich-art" viewBox="0 0 640 800" role="img" aria-label="Kinetic Typeのキービジュアル">
                        <defs>
                            <filter id="lpg-s5"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="0.05"/></feComponentTransfer><feComposite operator="in" in2="SourceGraphic"/></filter>
                        </defs>
                        <rect width="640" height="800" fill="#191712"/>
                        <text x="320" y="520" font-family="'Noto Serif JP', 'Noto Serif CJK JP', serif" font-size="420" font-weight="700" fill="#f5f3ee" text-anchor="middle">余</text>
                        <rect x="80" y="640" width="480" height="1.5" fill="#f5f3ee" opacity="0.6"/>
                        <circle cx="540" cy="140" r="26" fill="var(--lp-primary, #6366f1)"/>
                        <rect width="640" height="800" filter="url(#lpg-s5)"/>
                    </svg>
                    <figcaption class="lp-rich-hscroll-caption">
                        <div><h3>Kinetic Type</h3><p>Poster / Type</p></div>
                        <span class="lp-rich-hscroll-index">05</span>
                    </figcaption>
                </figure>
            </div>
        </section>
        `,
  },

  'rich-statement': {
    name: 'ステートメント',
    category: 'rich-design',
    html: `
        <section class="lp-section lp-rich-statement" aria-labelledby="rich-statement-title">
            <span class="lp-rich-statement-kanji lp-rich-serif" aria-hidden="true" data-parallax="0.1">間</span>
            <span class="lp-rich-eyebrow" data-motion="fade">Statement</span>
            <h2 id="rich-statement-title" class="lp-rich-statement-copy lp-rich-serif" data-motion="up" data-motion-delay="80">
                <span class="lp-nb">時間は、削るものではなく、</span><br>
                <span class="lp-nb"><em>研ぎ澄ます</em>ものだと思う。</span><br>
                <span class="lp-nb">私たちは、働くことの余白に</span><br>
                <span class="lp-nb">美しさを取り戻すために、</span><br>
                <span class="lp-nb">つくり続けます。</span>
            </h2>
            <span class="lp-rich-statement-sign lp-rich-serif" data-motion="fade" data-motion-delay="240">TIMELIGHT DESIGN PRINCIPLES</span>
        </section>
        `,
  },

  'rich-cta-full': {
    name: 'フルブリードCTA',
    category: 'rich-design',
    html: `
        <section class="lp-section lp-rich-cta-full" aria-labelledby="rich-cta-title">
            <div class="lp-rich-cta-glow" aria-hidden="true" data-parallax="0.22"></div>
            <span class="lp-rich-eyebrow" data-motion="fade">Get Started</span>
            <h2 id="rich-cta-title" class="lp-rich-cta-title">
                <span data-motion="up">Let&#39;s Make</span>
                <span class="lp-rich-outline" data-motion="up" data-motion-delay="100">Something</span>
                <span data-motion="up" data-motion-delay="200">Beautiful.</span>
            </h2>
            <button type="button" class="lp-rich-btn" aria-label="プロジェクトの相談を始める" data-motion="scale" data-motion-delay="280">Start a Project</button>
            <span class="lp-rich-cta-note" data-motion="fade" data-motion-delay="360">HELLO@TIMELIGHT.DESIGN</span>
        </section>
        `,
  },
};

// Merge with existing templates
if (typeof sectionTemplates !== 'undefined') {
  Object.assign(sectionTemplates, archetypeTemplates);
}

window.archetypeTemplates = archetypeTemplates;
