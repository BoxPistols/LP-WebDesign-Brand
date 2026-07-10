# 🎨 Universal Web Design Generator

**ノーコードでランディングページとダッシュボードを作成できる、AI支援つきWebデザインジェネレーター**

Pure HTML/CSS/JavaScript製（ビルド不要）。コードの知識がなくても、ブラウザだけでプロフェッショナルなWebデザインを作成・編集・エクスポートできます。

![Version](https://img.shields.io/badge/version-2.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## 🚀 2つのジェネレーター

### 📄 Landing Page Generator

マーケティングサイト・プロダクトページ向け — [generator.html で起動](./generator.html)

- **60種類のセクションコンポーネント**（Hero / Features / Pricing / Testimonials / CTA / FAQ ほか12カテゴリ）
- **10種類のカラーテーマ** + カスタムカラー・フォント・余白・角丸の調整
- **セクション検索**とカテゴリ別アコーディオンで素早く構成
- **インライン編集**（ダブルクリックでテキスト編集、クリックで画像差し替え）
- **undo / redo**（ツールバーボタン + Ctrl+Z / Ctrl+Shift+Z）
- **プロジェクト保存・自動保存・JSON入出力**（編集内容・デザイン設定・SEO設定を含む完全な往復）
- **エクスポート**: HTML（CSSインライン・単体で動作）/ HTML+外部CSS / CSS単体 / Tailwind / React (TSX) / Vue / shadcn/ui / MUI / JSON

### 📊 Dashboard Generator

管理画面・SaaSダッシュボード向け — [dashboard-generator.html で起動](./dashboard-generator.html)

- 14種類のダッシュボードコンポーネント、3種類のレイアウト
- アナリティクス / CRM / Eコマース テンプレート

## 🤖 AIアシスト（BYOK方式）

APIキーを持ち込むだけで、生成・カスタマイズをAIが支援します。サーバー不要・キーはブラウザ内のみで使用（デフォルトはセッション保存）。

| プロバイダ | Draftモデル（最安） | Qualityモデル（2番目） |
|-----------|--------------------|--------------------|
| OpenAI | `gpt-5.4-nano` | `gpt-5.4-mini` |
| Google Gemini | `gemini-2.5-flash-lite` | `gemini-3.1-flash-lite` |
| Ollama（ローカルLLM） | 任意 | 任意 |

- **自動ルーティング**: コピー生成・リライトは低コストなDraftモデル、構成プラン・デザインシステム・レビューはQualityモデルへ自動振り分け
- **機能**: セクションのAIカスタマイズ / 新規セクション生成 / フルページ生成（構成プラン→セクション逐次生成）/ カラーパレット生成 / デザインレビュー / フリーフォーム指示
- **実行前にコスト目安を表示**（モデル別単価から推定）
- ※モデルと価格は変動します。`js/ai/ai-service.js` の `PROVIDERS` 定義を最新の公式価格に合わせて更新してください

## 🚀 使い方

```bash
npm install
npm run dev   # http://localhost:8001
# または: python3 -m http.server 8001
```

1. **構成タブ**: 検索またはカテゴリからセクションを追加、ドラッグ&ドロップで並び替え
2. **デザインタブ**: カラーテーマ・フォント・余白・角丸・カスタムカラーを調整
3. **プレビュー**: ダブルクリックでテキスト編集、画像クリックで差し替え、デバイス切替・ズーム
4. **公開タブ**: SEO設定 → プロジェクト保存 → 形式を選んでエクスポート

## 📁 プロジェクト構造

```
LP-WebDesign-Brand/
├── generator.html              # LPジェネレーター
├── dashboard-generator.html    # ダッシュボードジェネレーター
├── index.html                  # デモ用ランディングページ
├── css/
│   ├── design-system.css       # デザイントークン・テーマ
│   ├── generator.css           # ジェネレーターUI
│   ├── landing-page.css        # 生成LP用スタイル
│   ├── advanced-components.css # 拡張コンポーネント
│   ├── dashboard-*.css         # ダッシュボード用
│   ├── ai-panel.css            # AIパネル
│   ├── grid-system.css / base.css / utility.css
├── js/
│   ├── generator.js            # LPジェネレーター本体
│   ├── templates.js            # セクションテンプレート
│   ├── advanced-templates.js   # 拡張テンプレート
│   ├── common-editor.js        # インライン編集・ストレージ共通層
│   ├── image-manager.js        # 画像差し替え
│   ├── dashboard-generator.js / dashboard-templates.js
│   └── ai/
│       ├── ai-service.js       # マルチプロバイダAPI層（2ティアルーティング）
│       ├── ai-prompt-engine.js # プロンプト構築
│       ├── ai-stream-handler.js# ストリーミング処理
│       └── ai-ui-controller.js # AIパネルUI
└── docs/
    ├── REDESIGN_PLAN.md        # 再設計プランニング設計書
    └── TEST_ARCHITECTURE.md    # テスト設計（構想）
```

## 🔧 開発

```bash
npm run lint    # ESLint
npm run format  # Prettier
npm run fix     # 両方
```

## 🗺️ ロードマップ

中長期の再設計方針（JSONデータモデル化・ブリーフファーストUX・3ペインエディタなど）は
[docs/REDESIGN_PLAN.md](./docs/REDESIGN_PLAN.md) を参照してください。

## 📝 ライセンス

MIT License

## 🔗 リンク

- **Live Demo**: https://boxpistols.github.io/LP-WebDesign-Brand/generator.html
- **GitHub**: https://github.com/BoxPistols/LP-WebDesign-Brand
