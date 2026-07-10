// Archetype Section Templates
// 1) 日本型・高密度LP (category: 'jp-conversion') — 通販/BtoBリード獲得型の縦長LPセクション
// 2) アワード志向リッチ表現 (category: 'rich-design') — エディトリアル/タイポグラフィ主導のブランドセクション
// スタイルは css/lp-archetypes.css に定義。サンプルコピーは勤怠管理SaaS「タイムライトクラウド」想定。

const archetypeTemplates = {
  // ============================================================
  // 日本型・高密度LP
  // ============================================================

  'jp-hero-offer': {
    name: 'JPヒーロー（オファー型）',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-hero-offer" aria-labelledby="jp-hero-offer-title">
            <div class="lp-content-wrapper">
                <div class="lp-jp-hero-grid">
                    <div class="lp-jp-hero-copy">
                        <div class="lp-jp-badge-row-inline" aria-label="実績バッジ">
                            <span class="lp-jp-badge-inline">導入社数 3,000社突破</span>
                            <span class="lp-jp-badge-inline">顧客満足度 No.1※</span>
                            <span class="lp-jp-badge-inline">継続率 99.2%</span>
                        </div>
                        <h1 id="jp-hero-offer-title" class="lp-jp-hero-title">
                            勤怠管理のムダな作業を、<br>
                            <span class="lp-jp-marker">まるごと自動化</span>する
                        </h1>
                        <p class="lp-jp-hero-lead">
                            打刻・集計・申請承認・給与連携までワンストップ。
                            タイムライトクラウドなら、毎月の締め作業が最短10分で完了します。
                        </p>
                        <ul class="lp-jp-hero-points">
                            <li>初期費用0円</li>
                            <li>最短即日で利用開始</li>
                            <li>専任サポート付き</li>
                        </ul>
                        <div class="lp-jp-hero-price-box">
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
                        <div class="lp-jp-hero-cta">
                            <span class="lp-jp-btn-caption">＼ 30日間ずっと無料で試せる ／</span>
                            <button type="button" class="lp-jp-btn" aria-label="無料トライアルを今すぐ始める">無料トライアルを始める</button>
                            <span class="lp-jp-note">※クレジットカード登録不要。期間終了後に自動課金されることはありません。<br>※顧客満足度No.1は2025年◯◯総研「勤怠管理システム利用実態調査」による。</span>
                        </div>
                    </div>
                    <div class="lp-jp-hero-visual">
                        <img src="https://placehold.co/560x640/eef1f8/5b6472?text=Product+UI" alt="タイムライトクラウドの管理画面イメージ" loading="lazy" />
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
        <section class="lp-section lp-jp-problem" aria-labelledby="jp-problem-title">
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title">
                    <span class="lp-jp-band-eyebrow">CHECK LIST</span>
                    <h2 id="jp-problem-title"><span class="lp-jp-band-heading">こんな<span class="lp-jp-marker">お悩み</span>、ありませんか？</span></h2>
                    <p class="lp-jp-band-sub">1つでも当てはまる方は、勤怠管理の見直しどきです。</p>
                </header>
                <ul class="lp-jp-checklist">
                    <li class="lp-jp-check-item">打刻漏れ・修正依頼の確認に毎月何時間もかかっている</li>
                    <li class="lp-jp-check-item">Excelの勤怠表と給与ソフトへの転記でミスが絶えない</li>
                    <li class="lp-jp-check-item">残業時間の上限超過に、月末になってから気づく</li>
                    <li class="lp-jp-check-item">有給休暇の残日数管理が属人化していて把握できない</li>
                    <li class="lp-jp-check-item">テレワークや直行直帰の勤務実態が見えない</li>
                    <li class="lp-jp-check-item">法改正のたびに就業規則との整合チェックに追われる</li>
                </ul>
                <p class="lp-jp-speech">その悩み、<span class="lp-jp-marker">タイムライトクラウド</span>がまとめて解決します！</p>
                <p class="lp-jp-speech-source">
                    <img src="https://placehold.co/56x56/6366f1/ffffff?text=T" alt="タイムライトクラウド公式キャラクター" loading="lazy" width="56" height="56" />
                    導入企業3,000社の運用ノウハウでサポートします
                </p>
            </div>
        </section>
        `,
  },

  'jp-empathy-bridge': {
    name: '共感→解決ブリッジ',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-bridge" aria-labelledby="jp-bridge-title">
            <div class="lp-content-wrapper">
                <div class="lp-jp-bridge-empathy">
                    <p>「月末月初は勤怠の締めで残業続き…」</p>
                    <p>「チェックしてもチェックしても、修正が出てくる…」</p>
                    <p>そのお気持ち、よく分かります。実は担当者の努力不足ではなく、<strong>仕組みの問題</strong>なのです。</p>
                </div>
                <div class="lp-jp-bridge-arrow" aria-hidden="true">
                    <span></span><span></span><span></span>
                </div>
                <h2 id="jp-bridge-title" class="lp-jp-bridge-answer">
                    だからこそ、<strong>集計ゼロ・転記ゼロ</strong>の<br>
                    <span class="lp-jp-marker">自動化された勤怠管理</span>が必要です。
                </h2>
                <p class="lp-jp-bridge-lead">
                    タイムライトクラウドは打刻データをリアルタイムに自動集計。
                    アラート機能が異常値をその場で検知するので、月末にまとめて確認する作業そのものがなくなります。
                </p>
            </div>
        </section>
        `,
  },

  'jp-reasons': {
    name: '選ばれる理由3選',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-reasons" aria-labelledby="jp-reasons-title">
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title">
                    <span class="lp-jp-band-eyebrow">REASON</span>
                    <h2 id="jp-reasons-title"><span class="lp-jp-band-heading">タイムライトクラウドが<span class="lp-jp-marker">選ばれる3つの理由</span></span></h2>
                </header>
                <ol class="lp-jp-reason-list">
                    <li class="lp-jp-reason">
                        <span class="lp-jp-reason-num" aria-hidden="true">1</span>
                        <img src="https://placehold.co/360x220/eef1f8/5b6472?text=Auto+Sum" alt="自動集計機能のイメージ" loading="lazy" />
                        <h3>集計・転記が完全自動</h3>
                        <p>打刻データを就業規則に沿って自動計算し、主要な給与ソフトへワンクリック連携。手作業の転記ミスをゼロにします。</p>
                    </li>
                    <li class="lp-jp-reason">
                        <span class="lp-jp-reason-num" aria-hidden="true">2</span>
                        <img src="https://placehold.co/360x220/eef1f8/5b6472?text=Alert" alt="残業アラート機能のイメージ" loading="lazy" />
                        <h3>法令リスクを事前にアラート</h3>
                        <p>残業上限や有給取得義務の未達を自動で検知して通知。月末に慌てる前に、リアルタイムで手を打てます。</p>
                    </li>
                    <li class="lp-jp-reason">
                        <span class="lp-jp-reason-num" aria-hidden="true">3</span>
                        <img src="https://placehold.co/360x220/eef1f8/5b6472?text=Support" alt="専任サポートのイメージ" loading="lazy" />
                        <h3>導入から定着まで専任伴走</h3>
                        <p>就業規則のヒアリングから初期設定、社内説明会の資料まで専任担当がサポート。導入後の定着率は99.2%※です。</p>
                    </li>
                </ol>
                <span class="lp-jp-note">※2025年12月時点、当社契約データベースにおける年間継続率。</span>
            </div>
        </section>
        `,
  },

  'jp-steps': {
    name: 'ご利用の流れ3ステップ',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-steps-section" aria-labelledby="jp-steps-title">
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title">
                    <span class="lp-jp-band-eyebrow">FLOW</span>
                    <h2 id="jp-steps-title"><span class="lp-jp-band-heading">ご利用開始まで<span class="lp-jp-marker">最短即日</span>・3ステップ</span></h2>
                </header>
                <ol class="lp-jp-steps">
                    <li class="lp-jp-step">
                        <span class="lp-jp-step-num"><span class="lp-jp-step-num-label">STEP</span><span class="lp-jp-step-num-digit">01</span></span>
                        <h3>フォームからお申し込み</h3>
                        <p>会社名とメールアドレスを入力するだけ。所要時間は約30秒、その場でアカウントが発行されます。</p>
                    </li>
                    <li class="lp-jp-step-arrow" aria-hidden="true"></li>
                    <li class="lp-jp-step">
                        <span class="lp-jp-step-num"><span class="lp-jp-step-num-label">STEP</span><span class="lp-jp-step-num-digit">02</span></span>
                        <h3>就業規則にあわせて初期設定</h3>
                        <p>専任スタッフがオンラインでヒアリングし、締め日・残業ルール・雇用区分を代行設定します。</p>
                    </li>
                    <li class="lp-jp-step-arrow" aria-hidden="true"></li>
                    <li class="lp-jp-step">
                        <span class="lp-jp-step-num"><span class="lp-jp-step-num-label">STEP</span><span class="lp-jp-step-num-digit">03</span></span>
                        <h3>その日から打刻スタート</h3>
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
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title">
                    <span class="lp-jp-band-eyebrow">COMPARISON</span>
                    <h2 id="jp-compare-title"><span class="lp-jp-band-heading">他社サービスとの<span class="lp-jp-marker">違い</span>をご覧ください</span></h2>
                </header>
                <div class="lp-jp-compare-wrap" role="region" aria-label="他社比較表（横にスクロールできます）" tabindex="0">
                    <table class="lp-jp-compare-table">
                        <thead>
                            <tr>
                                <th scope="col">項目</th>
                                <th scope="col" class="lp-jp-compare-own">タイムライト<br>クラウド</th>
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
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title">
                    <span class="lp-jp-band-eyebrow">VOICE</span>
                    <h2 id="jp-voice-title"><span class="lp-jp-band-heading">導入企業さまの<span class="lp-jp-marker">リアルな声</span></span></h2>
                </header>
                <div class="lp-jp-voice-grid">
                    <article class="lp-jp-voice-card">
                        <p class="lp-jp-stars" aria-label="5点満点中4.8点の評価">★★★★★<span class="lp-jp-stars-score">4.8</span></p>
                        <h3 class="lp-jp-voice-title">月40時間かかっていた締め作業が<span class="lp-jp-marker">半日で完了</span></h3>
                        <p class="lp-jp-voice-body">拠点ごとにバラバラだったExcel集計を廃止できました。給与ソフト連携で転記作業もなくなり、締め日直後の残業がゼロに。もっと早く入れればよかったです。</p>
                        <footer class="lp-jp-voice-meta">
                            <img src="https://picsum.photos/96/96?random=jpvoice1" alt="佐藤様の写真" loading="lazy" />
                            <p class="lp-jp-voice-name">佐藤 様（40代・総務部長）<span class="lp-jp-voice-attr">製造業／従業員320名</span></p>
                        </footer>
                    </article>
                    <article class="lp-jp-voice-card">
                        <p class="lp-jp-stars" aria-label="5点満点中4.6点の評価">★★★★★<span class="lp-jp-stars-score">4.6</span></p>
                        <h3 class="lp-jp-voice-title">残業の上限超過アラートで<span class="lp-jp-marker">労務リスクを未然に防止</span></h3>
                        <p class="lp-jp-voice-body">36協定の上限に近づくと本人と上長に自動通知が届くので、月末に慌てて調整することがなくなりました。監査対応の資料出力も助かっています。</p>
                        <footer class="lp-jp-voice-meta">
                            <img src="https://picsum.photos/96/96?random=jpvoice2" alt="田中様の写真" loading="lazy" />
                            <p class="lp-jp-voice-name">田中 様（30代・人事労務担当）<span class="lp-jp-voice-attr">IT・通信／従業員85名</span></p>
                        </footer>
                    </article>
                    <article class="lp-jp-voice-card">
                        <p class="lp-jp-stars" aria-label="5点満点中4.9点の評価">★★★★★<span class="lp-jp-stars-score">4.9</span></p>
                        <h3 class="lp-jp-voice-title">ITが苦手な現場でも<span class="lp-jp-marker">初日から迷わず打刻</span></h3>
                        <p class="lp-jp-voice-body">スマホとICカードの併用ができるので、店舗スタッフにもすぐ定着しました。導入時は専任の方が説明会用の資料まで用意してくれて心強かったです。</p>
                        <footer class="lp-jp-voice-meta">
                            <img src="https://picsum.photos/96/96?random=jpvoice3" alt="鈴木様の写真" loading="lazy" />
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
                <div class="lp-jp-badge-row" role="list" aria-label="受賞・実績バッジ">
                    <div class="lp-jp-badge" role="listitem">
                        <span class="lp-jp-badge-label">顧客満足度</span>
                        <span class="lp-jp-badge-value">No.1</span>
                        <span class="lp-jp-badge-ref">※1</span>
                    </div>
                    <div class="lp-jp-badge" role="listitem">
                        <span class="lp-jp-badge-label">導入社数</span>
                        <span class="lp-jp-badge-value">3,000社</span>
                        <span class="lp-jp-badge-ref">突破※2</span>
                    </div>
                    <div class="lp-jp-badge" role="listitem">
                        <span class="lp-jp-badge-label">年間継続率</span>
                        <span class="lp-jp-badge-value">99.2%</span>
                        <span class="lp-jp-badge-ref">※2</span>
                    </div>
                    <div class="lp-jp-badge" role="listitem">
                        <span class="lp-jp-badge-label">SaaSアワード</span>
                        <span class="lp-jp-badge-value">受賞</span>
                        <span class="lp-jp-badge-ref">2025年※3</span>
                    </div>
                </div>
                <div class="lp-jp-badge-media" aria-label="掲載メディア">
                    <span class="lp-jp-badge-media-label">＼ 各種メディアで紹介されました ／</span>
                    <img src="https://placehold.co/140x40/e2e8f0/475569?text=BIZ+NEWS" alt="掲載メディア：BIZ NEWSのロゴ" loading="lazy" />
                    <img src="https://placehold.co/140x40/e2e8f0/475569?text=HR+TIMES" alt="掲載メディア：HR TIMESのロゴ" loading="lazy" />
                    <img src="https://placehold.co/140x40/e2e8f0/475569?text=SaaS+Mag" alt="掲載メディア：SaaS Magのロゴ" loading="lazy" />
                    <img src="https://placehold.co/140x40/e2e8f0/475569?text=WORK+LAB" alt="掲載メディア：WORK LABのロゴ" loading="lazy" />
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
            <div class="lp-content-wrapper">
                <div class="lp-jp-offer">
                    <p class="lp-jp-offer-deadline">
                        <span aria-hidden="true">＼</span>7月31日（金）お申し込み分まで<span aria-hidden="true">／</span>
                    </p>
                    <h2 id="jp-offer-title" class="lp-jp-offer-title">今だけ、<span class="lp-jp-marker">3つの特典</span>付きで<br>スタートできます</h2>
                    <ul class="lp-jp-offer-benefits">
                        <li><span class="lp-jp-offer-benefit-tag">特典1</span>初期設定代行（通常60,000円）が無料</li>
                        <li><span class="lp-jp-offer-benefit-tag">特典2</span>無料トライアル期間を30日→60日に延長</li>
                        <li><span class="lp-jp-offer-benefit-tag">特典3</span>「勤怠DX導入チェックリスト」PDFをプレゼント</li>
                    </ul>
                    <p class="lp-jp-offer-price-row">
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
        </section>
        `,
  },

  'jp-cta-band': {
    name: 'CTA帯（繰り返し用）',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-cta-band" aria-labelledby="jp-cta-band-title">
            <div class="lp-content-wrapper">
                <p class="lp-jp-cta-urgency">今なら初期設定代行が無料（7月31日まで）</p>
                <h2 id="jp-cta-band-title" class="lp-jp-cta-copy">面倒な勤怠集計は、今月で終わりにしませんか？</h2>
                <div class="lp-jp-cta-arrow" aria-hidden="true"></div>
                <button type="button" class="lp-jp-btn" aria-label="30日間の無料トライアルを申し込む">30日間 無料で試してみる</button>
                <span class="lp-jp-note">※お申し込みは30秒で完了。クレジットカード登録は不要です。</span>
            </div>
        </section>
        `,
  },

  'jp-faq-dense': {
    name: 'FAQ（高密度）',
    category: 'jp-conversion',
    html: `
        <section class="lp-section lp-jp-faq" aria-labelledby="jp-faq-title">
            <div class="lp-content-wrapper">
                <header class="lp-jp-band-title">
                    <span class="lp-jp-band-eyebrow">FAQ</span>
                    <h2 id="jp-faq-title"><span class="lp-jp-band-heading">よくある<span class="lp-jp-marker">ご質問</span></span></h2>
                    <p class="lp-jp-band-sub">お問い合わせの多い質問をまとめました。その他のご質問はお気軽にご相談ください。</p>
                </header>
                <div class="lp-jp-faq-list">
                    <div class="lp-jp-faq-item">
                        <h3 class="lp-jp-faq-q">無料トライアル終了後、自動で課金されますか？</h3>
                        <p class="lp-jp-faq-a">いいえ。トライアル終了後に自動課金されることはありません。継続をご希望の場合のみ、有料プランをお申し込みください。</p>
                    </div>
                    <div class="lp-jp-faq-item">
                        <h3 class="lp-jp-faq-q">現在使っている給与ソフトと連携できますか？</h3>
                        <p class="lp-jp-faq-a">主要20種の給与ソフトに標準対応しています。対応外のソフトでもCSV形式での出力が可能です。詳細は連携一覧をご確認ください。</p>
                    </div>
                    <div class="lp-jp-faq-item">
                        <h3 class="lp-jp-faq-q">変形労働時間制やフレックスにも対応していますか？</h3>
                        <p class="lp-jp-faq-a">1ヶ月・1年単位の変形労働時間制、フレックスタイム制、裁量労働制など主要な勤務形態に対応しています。設定は導入時に代行いたします。</p>
                    </div>
                    <div class="lp-jp-faq-item">
                        <h3 class="lp-jp-faq-q">最低利用人数や契約期間の縛りはありますか？</h3>
                        <p class="lp-jp-faq-a">最低利用人数は5名からで、契約は月単位です。年間契約の縛りはなく、いつでもプラン変更・解約が可能です。</p>
                    </div>
                    <div class="lp-jp-faq-item">
                        <h3 class="lp-jp-faq-q">セキュリティ対策はどうなっていますか？</h3>
                        <p class="lp-jp-faq-a">通信は常時暗号化され、データは国内データセンターで冗長化して保管しています。ISMS（ISO/IEC 27001）認証を取得済みです。</p>
                    </div>
                    <div class="lp-jp-faq-item">
                        <h3 class="lp-jp-faq-q">導入までにどのくらいの期間がかかりますか？</h3>
                        <p class="lp-jp-faq-a">最短で即日からご利用いただけます。就業規則が複雑な場合でも、平均2週間程度で本稼働しているお客様がほとんどです。</p>
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
            <div class="lp-rich-meta">
                <span>TIMELIGHT&reg;</span>
                <span>TOKYO — 2026</span>
                <span>WORKSTYLE PLATFORM</span>
            </div>
            <h1 id="rich-hero-title" class="lp-rich-title-xl">
                <span>Design</span>
                <span class="lp-rich-outline">the Time,</span>
                <span class="lp-rich-title-accent">Free</span>
                <span>the People.</span>
            </h1>
            <p class="lp-rich-vertical" aria-hidden="true">時間をデザインする</p>
            <div class="lp-rich-hero-footer">
                <p class="lp-rich-hero-lede">
                    働く時間の一秒までを、美しく整える。
                    タイムライトは、テクノロジーとデザインの力で
                    「管理」を「体験」へと再定義するワークスタイルプラットフォームです。
                </p>
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
        </section>
        `,
  },

  'rich-features-editorial': {
    name: 'エディトリアル特集',
    category: 'rich-design',
    html: `
        <section class="lp-section lp-rich-editorial" aria-labelledby="rich-editorial-title">
            <header class="lp-rich-editorial-head">
                <span class="lp-rich-eyebrow">Features</span>
                <h2 id="rich-editorial-title" class="lp-rich-editorial-title">機能ではなく、体験を。</h2>
            </header>
            <div class="lp-rich-offset-grid">
                <article class="lp-rich-editorial-item">
                    <span class="lp-rich-index-num" aria-hidden="true">01</span>
                    <div class="lp-rich-editorial-media">
                        <img src="https://picsum.photos/720/540?random=riched1" alt="ミニマルなワークスペースの写真" loading="lazy" />
                    </div>
                    <div class="lp-rich-editorial-copy">
                        <h3>Seamless<br>— つなぎ目のない一日</h3>
                        <p>出社も、リモートも、移動中も。あらゆる働く場面がひとつの流れとして記録され、意識せずとも一日が美しく整っていきます。</p>
                        <a class="lp-rich-textlink" href="#feature-seamless" aria-label="Seamlessの詳細を見る">Explore</a>
                    </div>
                </article>
                <article class="lp-rich-editorial-item">
                    <span class="lp-rich-index-num" aria-hidden="true">02</span>
                    <div class="lp-rich-editorial-media">
                        <img src="https://picsum.photos/720/540?random=riched2" alt="データビジュアライゼーションの抽象的な写真" loading="lazy" />
                    </div>
                    <div class="lp-rich-editorial-copy">
                        <h3>Insight<br>— 時間が語りはじめる</h3>
                        <p>チームの時間の使い方が、静かなグラフィックとなって立ち上がる。数字の羅列ではなく、次の意思決定を導く風景として。</p>
                        <a class="lp-rich-textlink" href="#feature-insight" aria-label="Insightの詳細を見る">Explore</a>
                    </div>
                </article>
                <article class="lp-rich-editorial-item">
                    <span class="lp-rich-index-num" aria-hidden="true">03</span>
                    <div class="lp-rich-editorial-media">
                        <img src="https://picsum.photos/720/540?random=riched3" alt="建築的な光と影の写真" loading="lazy" />
                    </div>
                    <div class="lp-rich-editorial-copy">
                        <h3>Quiet<br>— 静けさという機能</h3>
                        <p>通知は少なく、意味のあるものだけを。プロダクトが沈黙している時間こそが、集中というもっとも贅沢な体験をつくります。</p>
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
            <header class="lp-rich-showcase-head">
                <h2 id="rich-showcase-title" class="lp-rich-showcase-title">Selected Works</h2>
                <span class="lp-rich-hscroll-hint" aria-hidden="true">Drag / Scroll →</span>
            </header>
            <div class="lp-rich-hscroll" role="region" aria-label="ショーケースギャラリー（横にスクロールできます）" tabindex="0">
                <figure class="lp-rich-hscroll-item">
                    <img src="https://picsum.photos/640/800?random=richsc1" alt="ブランドサイトのデザイン事例" loading="lazy" />
                    <figcaption class="lp-rich-hscroll-caption">
                        <div><h3>Aurora Identity</h3><p>Brand / Web</p></div>
                        <span class="lp-rich-hscroll-index">01</span>
                    </figcaption>
                </figure>
                <figure class="lp-rich-hscroll-item">
                    <img src="https://picsum.photos/640/800?random=richsc2" alt="プロダクトUIのデザイン事例" loading="lazy" />
                    <figcaption class="lp-rich-hscroll-caption">
                        <div><h3>Monolith App</h3><p>Product / UI</p></div>
                        <span class="lp-rich-hscroll-index">02</span>
                    </figcaption>
                </figure>
                <figure class="lp-rich-hscroll-item">
                    <img src="https://picsum.photos/640/800?random=richsc3" alt="エディトリアルデザインの事例" loading="lazy" />
                    <figcaption class="lp-rich-hscroll-caption">
                        <div><h3>Paper &amp; Pixel</h3><p>Editorial</p></div>
                        <span class="lp-rich-hscroll-index">03</span>
                    </figcaption>
                </figure>
                <figure class="lp-rich-hscroll-item">
                    <img src="https://picsum.photos/640/800?random=richsc4" alt="空間デザインの事例" loading="lazy" />
                    <figcaption class="lp-rich-hscroll-caption">
                        <div><h3>Void Gallery</h3><p>Spatial / Motion</p></div>
                        <span class="lp-rich-hscroll-index">04</span>
                    </figcaption>
                </figure>
                <figure class="lp-rich-hscroll-item">
                    <img src="https://picsum.photos/640/800?random=richsc5" alt="タイポグラフィ主体のポスターデザイン事例" loading="lazy" />
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
            <span class="lp-rich-eyebrow">Statement</span>
            <h2 id="rich-statement-title" class="lp-rich-statement-copy lp-rich-serif">
                時間は、削るものではなく、<br>
                <em>研ぎ澄ます</em>ものだと思う。<br>
                私たちは、働くことの余白に<br>
                美しさを取り戻すために、<br>
                つくり続けます。
            </h2>
            <span class="lp-rich-statement-sign lp-rich-serif">— TIMELIGHT DESIGN PRINCIPLES</span>
        </section>
        `,
  },

  'rich-cta-full': {
    name: 'フルブリードCTA',
    category: 'rich-design',
    html: `
        <section class="lp-section lp-rich-cta-full" aria-labelledby="rich-cta-title">
            <span class="lp-rich-eyebrow">Get Started</span>
            <h2 id="rich-cta-title" class="lp-rich-cta-title">
                Let&#39;s Make<br>
                <span class="lp-rich-outline">Something</span><br>
                Beautiful.
            </h2>
            <button type="button" class="lp-rich-btn" aria-label="プロジェクトの相談を始める">Start a Project</button>
            <span class="lp-rich-cta-note">HELLO@TIMELIGHT.DESIGN</span>
        </section>
        `,
  },
};

// Merge with existing templates
if (typeof sectionTemplates !== 'undefined') {
  Object.assign(sectionTemplates, archetypeTemplates);
}

window.archetypeTemplates = archetypeTemplates;
