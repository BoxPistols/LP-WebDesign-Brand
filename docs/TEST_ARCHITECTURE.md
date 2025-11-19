# LP-WebDesign-Brand - Test Design & Architecture Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Testing Strategy](#testing-strategy)
4. [Component Testing](#component-testing)
5. [Mobile Testing](#mobile-testing)
6. [Performance Testing](#performance-testing)
7. [Accessibility Testing](#accessibility-testing)

---

## Overview

このドキュメントでは、LP-WebDesign-Brandプロジェクトのテスト設計とアーキテクチャについて説明します。

### プロジェクト構成

```text
LP-WebDesign-Brand/
├── index.html                  # メインランディングページ
├── generator.html              # LPジェネレーター
├── dashboard-generator.html    # ダッシュボードジェネレーター
├── css/
│   ├── design-system.css      # デザインシステムの基礎
│   ├── landing-page.css       # ランディングページ専用スタイル
│   ├── generator.css          # LPジェネレータースタイル
│   ├── dashboard-generator.css # ダッシュボードジェネレータースタイル
│   └── dashboard-components.css # ダッシュボードコンポーネント
├── js/
│   ├── landing-page.js        # ランディングページロジック
│   ├── generator.js           # LPジェネレーターコア
│   ├── enhanced-generator.js  # 拡張機能（SEO、デザインカスタマイズ）
│   ├── dashboard-generator.js # ダッシュボードジェネレーターコア
│   └── dashboard-templates.js # ダッシュボードコンポーネントテンプレート
└── docs/
    ├── TEST_ARCHITECTURE.md   # このドキュメント
    └── MCP_SKILLS.md          # MCP/Skillsドキュメント
```

---

## Architecture

### Design System Architecture

デザインシステムは3層構造で構成されています：

#### 1. Foundation Layer (design-system.css)

- CSS Custom Properties（CSS変数）
- タイポグラフィシステム
- スペーシングシステム
- カラーシステム
- ブレークポイント

```css
:root {
  /* Spacing Scale */
  --space-1: 4px;
  --space-2: 8px;
  --space-6: 24px;

  /* Typography Scale */
  --text-sm: 14px;
  --text-base: 16px;
  --text-xl: 20px;

  /* Colors */
  --primary: #667eea;
  --secondary: #764ba2;
}
```

#### 2. Component Layer

- 再利用可能なコンポーネント
- 一貫したデザインパターン
- アクセシビリティ準拠

#### 3. Page Layer

- ページ固有のスタイル
- レイアウト構成
- インタラクション

### Generator Architecture

#### LP Generator

**責任範囲:**

- セクションベースのページ構築
- 19種類のコンポーネントライブラリ
- 10種類のテーマシステム
- デザインカスタマイゼーション（フォント、スペーシング、カラー）
- SEO最適化（メタタグ、OGP、Twitter Card、Schema.org）

**主要クラス:**

```javascript
class LandingPageGenerator {
    constructor() {
        this.sections = [];
        this.currentTheme = 'modern-blue';
    }

    addSection(templateId) { ... }
    reorderSections(oldIndex, newIndex) { ... }
    exportHTML() { ... }
}

class EnhancedGenerator extends LandingPageGenerator {
    constructor() {
        super();
        this.seoData = {};
        this.designSettings = {};
    }

    setupDesignCustomization() { ... }
    setupSEOEditor() { ... }
    generateSEOMetaTags() { ... }
}
```

#### Dashboard Generator

**責任範囲:**

- ドラッグ&ドロップインターフェース
- グリッドベースのレイアウト
- 14種類のダッシュボードコンポーネント
- 3種類のレイアウトシステム（sidebar-left, topbar, sidebar-top）
- リアルタイムプレビュー
- CSS埋め込みエクスポート

**主要クラス:**

```javascript
class DashboardGenerator {
    constructor() {
        this.components = [];
        this.currentLayout = 'sidebar-left';
        this.history = [];
    }

    renderCanvas() { ... }
    handleLayoutChange(layout) { ... }
    async generateFullHTML() { ... }
    exportDashboard() { ... }
}
```

---

## Testing Strategy

### 1. Manual Testing Checklist

#### Landing Page (index.html)

- [ ] ナビゲーションメニューの動作
  - [ ] デスクトップビュー
  - [ ] モバイルビュー（ハンバーガーメニュー）
  - [ ] スワイプジェスチャーでメニューを閉じる
- [ ] スクロールエフェクト
  - [ ] ヘッダーのシャドウ表示
  - [ ] スクロールトップボタンの表示/非表示
- [ ] ライトボックス機能
  - [ ] ギャラリー画像のクリック/タップで開く
  - [ ] スワイプダウンで閉じる（モバイル）
  - [ ] 背景クリックで閉じる
  - [ ] Escキーで閉じる
- [ ] スムーススクロール
  - [ ] アンカーリンクのクリック
  - [ ] ヘッダー高さを考慮したスクロール位置
- [ ] フェードインアニメーション
  - [ ] セクション単位での表示
  - [ ] Intersection Observerによる遅延表示

#### LP Generator (generator.html)

- [ ] セクション追加/削除
- [ ] ドラッグ&ドロップ並び替え
- [ ] テーマ切り替え（10種類）
- [ ] デザインカスタマイズ
  - [ ] フォントファミリー変更
  - [ ] フォントサイズスケール変更
  - [ ] スペーシングスケール変更
  - [ ] ボーダー角丸変更
  - [ ] プライマリーカラー変更
  - [ ] セカンダリーカラー変更
  - [ ] アクセントカラー変更
- [ ] SEO設定
  - [ ] ページタイトル（60文字制限）
  - [ ] ディスクリプション（160文字制限）
  - [ ] キーワード
  - [ ] OGP画像URL
  - [ ] カノニカルURL
  - [ ] 言語設定
  - [ ] Twitter Card
  - [ ] Schema.org markup
- [ ] エクスポート機能
  - [ ] HTMLダウンロード
  - [ ] SEOタグの埋め込み
  - [ ] カスタムデザインの反映

#### Dashboard Generator (dashboard-generator.html)

- [ ] コンポーネント追加
  - [ ] サイドバーからドラッグ&ドロップ
  - [ ] クイックスタートテンプレート（Analytics, CRM, Ecommerce）
- [ ] コンポーネント操作
  - [ ] ドラッグ&ドロップで並び替え
  - [ ] 上下移動ボタン
  - [ ] 削除ボタン
- [ ] レイアウト切り替え
  - [ ] sidebar-left
  - [ ] topbar
  - [ ] sidebar-top
  - [ ] レイアウトなし
- [ ] デザインカスタマイズ
  - [ ] フォントサイズ変更
  - [ ] スペーシング変更
  - [ ] ボーダー角丸変更
- [ ] プレビュー機能
  - [ ] 新規タブで開く
  - [ ] CSS埋め込み確認
  - [ ] レイアウト反映確認
- [ ] エクスポート機能
  - [ ] HTMLダウンロード
  - [ ] CSS埋め込み確認
  - [ ] スタンドアロン動作確認
- [ ] デバイスプレビュー
  - [ ] デスクトップビュー
  - [ ] タブレットビュー
  - [ ] モバイルビュー
- [ ] 履歴機能
  - [ ] Undo（元に戻す）
  - [ ] Redo（やり直し）

### 2. Automated Testing (Future Implementation)

#### Unit Tests

```javascript
// Example: Landing Page Generator
describe('LandingPageGenerator', () => {
  test('should add section correctly', () => {
    const generator = new LandingPageGenerator();
    generator.addSection('hero-section');
    expect(generator.sections.length).toBe(1);
  });

  test('should reorder sections', () => {
    const generator = new LandingPageGenerator();
    generator.addSection('hero');
    generator.addSection('features');
    generator.reorderSections(0, 1);
    expect(generator.sections[0].type).toBe('features');
  });
});

// Example: Dashboard Generator
describe('DashboardGenerator', () => {
  test('should change layout correctly', () => {
    const generator = new DashboardGenerator();
    generator.handleLayoutChange({ currentTarget: { dataset: { layout: 'topbar' } } });
    expect(generator.currentLayout).toBe('topbar');
  });

  test('should embed CSS in export', async () => {
    const generator = new DashboardGenerator();
    generator.addComponent(dashboardTemplates['stats-cards'], 'stats-cards');
    const html = await generator.generateFullHTML();
    expect(html).toContain('<style>');
    expect(html).toContain('--space-');
  });
});
```

#### Integration Tests

```javascript
describe('LP Generator Integration', () => {
  test('SEO tags should be included in export', async () => {
    const generator = new EnhancedGenerator();
    generator.seoData.title = 'Test Page';
    generator.seoData.description = 'Test Description';

    const html = generator.generateFullHTML();
    expect(html).toContain('<title>Test Page</title>');
    expect(html).toContain('Test Description');
  });
});
```

---

## Component Testing

### Testing Matrix

| Component    | Desktop | Tablet | Mobile | Touch | Keyboard | Screen Reader |
| ------------ | ------- | ------ | ------ | ----- | -------- | ------------- |
| Navigation   | ✓       | ✓      | ✓      | ✓     | ✓        | ✓             |
| Hero Section | ✓       | ✓      | ✓      | ✓     | N/A      | ✓             |
| Features     | ✓       | ✓      | ✓      | ✓     | N/A      | ✓             |
| Gallery      | ✓       | ✓      | ✓      | ✓     | ✓        | ✓             |
| Lightbox     | ✓       | ✓      | ✓      | ✓     | ✓        | ✓             |
| CTA Section  | ✓       | ✓      | ✓      | ✓     | ✓        | ✓             |
| Scroll Top   | ✓       | ✓      | ✓      | ✓     | ✓        | N/A           |

### Component-Specific Tests

#### Navigation Component

```markdown
**Desktop:**

- ホバー時にアンダーラインアニメーション
- アクティブリンクのハイライト

**Mobile:**

- ハンバーガーメニューのトグル
- メニュー開閉時のボディスクロール制御
- スワイプアップでメニューを閉じる
- メニューリンククリックで自動的に閉じる
- 外側クリックでメニューを閉じる

**Touch:**

- 44x44px以上のタッチターゲット
- タップハイライト色の設定
- ダブルタップズーム防止
```

#### Lightbox Component

```markdown
**Desktop:**

- 画像クリックで開く
- 背景クリックで閉じる
- Escキーで閉じる
- 閉じるボタンのホバーエフェクト

**Mobile:**

- 画像タップで開く
- スワイプダウンで閉じる（100px以上）
- 背景タップで閉じる
- ピンチズーム対応

**Accessibility:**

- フォーカストラップ
- ARIAラベル
- キーボードナビゲーション
```

---

## Mobile Testing

### Device Testing Matrix

| Device            | Screen Size | Test Type   | Priority |
| ----------------- | ----------- | ----------- | -------- |
| iPhone SE         | 375x667     | Real Device | High     |
| iPhone 12/13      | 390x844     | Real Device | High     |
| iPhone 14 Pro Max | 430x932     | Simulator   | Medium   |
| iPad              | 768x1024    | Real Device | High     |
| iPad Pro          | 1024x1366   | Simulator   | Medium   |
| Android Phone     | 360x740     | Real Device | High     |
| Android Tablet    | 800x1280    | Simulator   | Medium   |

### Mobile-Specific Features

#### 1. Touch Optimizations

```javascript
// Touch detection
const isTouchDevice = () => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

// Prevent double-tap zoom on buttons
document.addEventListener(
  'touchend',
  function (e) {
    if (e.target.tagName === 'BUTTON') {
      e.preventDefault();
      e.target.click();
    }
  },
  { passive: false }
);
```

#### 2. Gesture Support

- **Swipe Up:** メニューを閉じる
- **Swipe Down:** ライトボックスを閉じる
- **Pinch Zoom:** 画像拡大（ライトボックス内）

#### 3. Viewport Optimizations

```css
/* Safe area insets for notched devices */
@supports (padding: max(0px)) {
  .lp-header {
    padding-left: max(1.25rem, env(safe-area-inset-left));
    padding-right: max(1.25rem, env(safe-area-inset-right));
  }
}

/* Prevent zoom on input focus (iOS) */
input,
select,
textarea {
  font-size: 16px; /* Prevents zoom on iOS */
}
```

#### 4. Performance Optimizations

```javascript
// Passive event listeners
window.addEventListener('scroll', handleScroll, { passive: true });

// Touch event optimization
element.addEventListener('touchstart', handler, { passive: true });

// Throttled scroll handling
let scrollTimeout;
function handleScroll() {
  if (!scrollTimeout) {
    scrollTimeout = setTimeout(function () {
      actualScrollHandler();
      scrollTimeout = null;
    }, 16); // ~60fps
  }
}
```

---

## Performance Testing

### Metrics to Monitor

1. **First Contentful Paint (FCP):** < 1.8s
2. **Largest Contentful Paint (LCP):** < 2.5s
3. **Time to Interactive (TTI):** < 3.8s
4. **Total Blocking Time (TBT):** < 300ms
5. **Cumulative Layout Shift (CLS):** < 0.1

### Optimization Techniques

#### 1. CSS Optimization

- CSS変数の使用
- 不要なセレクタの削除
- モバイルファーストアプローチ
- Critical CSSのインライン化（将来的に）

#### 2. JavaScript Optimization

- パッシブイベントリスナー
- スクロールイベントのスロットリング
- Intersection Observerの使用
- 遅延ローディング（画像）

#### 3. Image Optimization

- WebP形式の使用（将来的に）
- レスポンシブ画像
- 遅延読み込み
- 適切なサイズ設定

---

## Accessibility Testing

### WCAG 2.1 Level AA Compliance

#### 1. Perceivable

- [x] テキスト代替（alt属性）
- [x] 十分なコントラスト比（4.5:1以上）
- [x] レスポンシブテキスト（ズーム対応）
- [x] タッチターゲットサイズ（44x44px以上）

#### 2. Operable

- [x] キーボードアクセシブル
- [x] フォーカス可視化
- [x] スキップリンク（将来的に）
- [x] 一時停止可能なアニメーション（prefers-reduced-motion対応）

#### 3. Understandable

- [x] 明確な言語設定（lang属性）
- [x] 一貫したナビゲーション
- [x] エラーメッセージ（フォーム）
- [x] ヘルプテキスト

#### 4. Robust

- [x] 有効なHTML
- [x] ARIAラベル
- [x] セマンティックHTML
- [x] スクリーンリーダー対応

### Testing Tools

1. **Lighthouse:** パフォーマンス、アクセシビリティスコア
2. **axe DevTools:** アクセシビリティ問題の検出
3. **WAVE:** Web accessibility evaluation tool
4. **NVDA/JAWS:** スクリーンリーダーテスト
5. **VoiceOver:** iOS/macOSスクリーンリーダー

### Keyboard Navigation Test

```markdown
Tab: 次の要素へフォーカス移動
Shift + Tab: 前の要素へフォーカス移動
Enter: ボタン/リンクの実行
Space: ボタンの実行
Escape: モーダル/ライトボックスを閉じる
Arrow Keys: メニュー内でのナビゲーション（将来的に）
```

---

## Test Execution Plan

### Phase 1: Manual Testing (Current)

1. 機能テスト（全機能の動作確認）
2. モバイルテスト（各デバイスでの確認）
3. ブラウザテスト（Chrome, Safari, Firefox, Edge）
4. アクセシビリティテスト（スクリーンリーダー、キーボード）

### Phase 2: Automated Testing (Future)

1. Unit tests setup (Jest)
2. Integration tests (Testing Library)
3. E2E tests (Playwright/Cypress)
4. Visual regression tests (Percy/Chromatic)

### Phase 3: Continuous Monitoring

1. Lighthouse CI integration
2. Performance monitoring
3. Error tracking (Sentry)
4. Analytics (Google Analytics 4)

---

## Known Issues & Limitations

### Current Limitations

1. **エクスポート機能:** CSSファイルは fetch() でロードするため、ローカルファイルシステムでは動作しない（HTTPサーバー必須）
2. **ブラウザサポート:** IE11非対応（モダンブラウザのみ）
3. **画像管理:** 画像はプレースホルダーのみ（実際の画像アップロード機能なし）

### Future Improvements

1. ユニットテストの追加
2. E2Eテストの自動化
3. CI/CDパイプラインの構築
4. パフォーマンス監視の自動化
5. A/Bテスト機能
6. 多言語対応の強化

---

## Conclusion

このドキュメントは、LP-WebDesign-Brandプロジェクトのテスト設計とアーキテクチャを包括的に説明しています。定期的にアップデートし、プロジェクトの成長に合わせて改善していきます。
