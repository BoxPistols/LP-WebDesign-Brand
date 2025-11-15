# 🚀 Universal Landing Page Generator

モダンで美しいランディングページを簡単に作成できる、汎用的なジェネレーターツールです。コードの知識がなくても、プロフェッショナルなランディングページを数分で作成できます。

## ✨ 主な機能

### 🎨 豊富なデザインテーマ
- **Modern Blue** - モダンで洗練されたブルーグラデーション
- **Sunset** - 温かみのあるサンセットカラー
- **Ocean** - 清涼感のあるオーシャンブルー
- **Forest** - 自然を感じるグリーングラデーション
- **Dark Mode** - シックで高級感のあるダークテーマ
- **Vibrant** - エネルギッシュなカラフルテーマ

### 📦 10種類の再利用可能なセクション
1. **Hero Banner** - インパクトのあるヒーローセクション
2. **Features Grid** - 特徴や機能を魅力的に表示
3. **Pricing Table** - 料金プランを比較しやすく表示
4. **Testimonials** - お客様の声を効果的に紹介
5. **Call to Action** - 行動を促す強力なCTA
6. **Gallery** - 画像ギャラリーで作品を展示
7. **Statistics** - 数字で実績をアピール
8. **Team Members** - チームメンバーを紹介
9. **FAQ** - よくある質問で不安を解消
10. **Contact Form** - お問い合わせフォーム

### 🎯 便利な機能
- ✅ **リアルタイムプレビュー** - 変更が即座に反映
- ✅ **レスポンシブ対応** - デスクトップ、タブレット、モバイルで確認可能
- ✅ **ドラッグ&ソート** - セクションの順序を自由に変更
- ✅ **ワンクリックエクスポート** - HTMLファイルとして即座にダウンロード
- ✅ **アニメーション** - スクロールアニメーションでプロフェッショナルな印象
- ✅ **ガラスモーフィズム** - オプションで最新のデザイントレンドを適用

## 🚀 使い方

### 1. ジェネレーターを開く
```bash
# プロジェクトディレクトリで
open generator.html
# または、ローカルサーバーを起動
python -m http.server 8000
# ブラウザで http://localhost:8000/generator.html を開く
```

### 2. テーマを選択
左側のパネルから好みのカラーテーマを選択します。

### 3. セクションを追加
必要なセクションをクリックして、ランディングページに追加します。
- セクションは好きな順序で追加できます
- 各セクションにホバーすると、上下移動や削除のコントロールが表示されます

### 4. プレビューで確認
右側のプレビューエリアで、デザインをリアルタイムで確認できます。
- デバイスモード（デスクトップ/タブレット/モバイル）を切り替えて、レスポンシブ対応を確認

### 5. エクスポート
「HTMLをダウンロード」ボタンをクリックして、完成したランディングページをダウンロードします。

## 📁 プロジェクト構造

```
LP-WebDesign-Brand/
├── generator.html          # ジェネレーターのメインページ
├── index.html             # サンプルランディングページ
├── css/
│   ├── generator.css      # ジェネレーターUI用スタイル
│   ├── landing-page.css   # ランディングページ用スタイル
│   ├── base.css           # 基本スタイル
│   ├── utility.css        # ユーティリティクラス
│   └── styles.css         # カスタムスタイル
├── js/
│   ├── generator.js       # ジェネレーターのメインロジック
│   └── templates.js       # セクションテンプレート定義
└── assets/
    └── images/            # 画像リソース
```

## 🎨 カスタマイズ

### 新しいセクションを追加する
`js/templates.js` に新しいセクションテンプレートを追加できます：

```javascript
sectionTemplates['your-section'] = {
    name: 'Your Section Name',
    html: `
        <section class="lp-section">
            <!-- Your HTML here -->
        </section>
    `
};
```

### 新しいテーマを追加する
`css/landing-page.css` に新しいテーマカラーを定義：

```css
[data-theme="your-theme"] {
    --lp-primary: #yourcolor;
    --lp-secondary: #yourcolor;
    --lp-accent: #yourcolor;
    --lp-gradient: linear-gradient(135deg, #color1 0%, #color2 100%);
}
```

## 🌟 技術スタック

- **Pure HTML/CSS/JavaScript** - フレームワーク不要、すぐに使える
- **モダンCSS** - グラデーション、Flexbox、Grid、アニメーション
- **レスポンシブデザイン** - モバイルファーストアプローチ
- **Google Fonts** - Inter & Poppins フォント

## 📱 レスポンシブ対応

すべてのセクションは以下のブレークポイントで最適化されています：
- **Desktop**: 1024px以上
- **Tablet**: 768px - 1024px
- **Mobile**: 768px以下

## 🎯 使用例

### スタートアップ向けランディングページ
1. Hero Banner
2. Features Grid
3. Pricing Table
4. Testimonials
5. CTA

### ポートフォリオサイト
1. Hero Banner
2. Gallery
3. Team Members
4. Contact Form

### プロダクトページ
1. Hero Banner
2. Features Grid
3. Statistics
4. Testimonials
5. Pricing Table
6. FAQ
7. CTA

## 🔧 ブラウザサポート

- ✅ Chrome (最新版)
- ✅ Firefox (最新版)
- ✅ Safari (最新版)
- ✅ Edge (最新版)

## 📝 ライセンス

このプロジェクトはオープンソースです。自由にカスタマイズしてご利用ください。

## 🤝 コントリビューション

バグ報告や機能追加のリクエストは、GitHubのIssuesからお願いします。
プルリクエストも歓迎します！

## 🔗 リンク

- **Live Demo**: https://boxpistols.github.io/LP-WebDesign-Brand/generator.html
- **GitHub**: https://github.com/BoxPistols/LP-WebDesign-Brand

---

**Made with ❤️ for the web design community**

🌟 気に入ったらスターをお願いします！
