/**
 * LP Motion Runtime — スクロール演出ランタイム
 * DESIGN_CODEX.md §3 の実装。プレビューとエクスポートHTMLの両方で動作する。
 *
 * 使い方（テンプレート側のdata属性）:
 *   data-motion="up|fade|left|right|scale"  … 出現アニメーション
 *   data-motion-delay="120"                 … 遅延ms（スタッガー用）
 *   data-parallax="0.2"                     … スクロール速度差（-1〜1、負で逆方向）
 *   data-counter="3000" data-counter-suffix="社" … 数値カウントアップ
 *
 * prefers-reduced-motion 環境ではすべて即時表示・固定になる。
 */
(function (global) {
  'use strict';

  const LPMotion = {
    _observers: [],
    _parallaxEls: [],
    _rafId: null,
    _scrollTarget: null,

    /**
     * @param {Element|Document} root - 演出対象のルート
     * @param {object} [options]
     * @param {Window|Element} [options.scrollTarget] - スクロールイベント元（既定: window）
     */
    init(root, options = {}) {
      if (!root) return;
      this.destroy();

      const reduced =
        global.matchMedia && global.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // JS実行環境でのみ初期非表示CSSを有効化する（.lpm-ready [data-motion] { opacity: 0 ... }）。
      // JSが動かない環境・reduced-motion環境ではすべて即時表示のまま。
      const readyHost = root.classList ? root : root.documentElement || root.body;
      if (readyHost && !reduced) readyHost.classList.add('lpm-ready');

      const motionEls = root.querySelectorAll('[data-motion]');
      const counterEls = root.querySelectorAll('[data-counter]');
      const parallaxEls = root.querySelectorAll('[data-parallax]');

      if (reduced) {
        motionEls.forEach((el) => el.classList.add('lpm-in'));
        counterEls.forEach((el) => {
          el.textContent = this._formatCount(el, parseFloat(el.dataset.counter) || 0);
        });
        return;
      }

      // --- 出現アニメーション（スタッガード・リビール） ---
      if (motionEls.length && 'IntersectionObserver' in global) {
        const io = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const el = entry.target;
              const delay = parseInt(el.dataset.motionDelay || '0', 10);
              setTimeout(() => el.classList.add('lpm-in'), delay);
              io.unobserve(el);
            });
          },
          { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
        );
        motionEls.forEach((el) => io.observe(el));
        this._observers.push(io);
      } else {
        motionEls.forEach((el) => el.classList.add('lpm-in'));
      }

      // --- 数値カウントアップ ---
      if (counterEls.length && 'IntersectionObserver' in global) {
        const cio = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              this._runCounter(entry.target);
              cio.unobserve(entry.target);
            });
          },
          { threshold: 0.4 }
        );
        counterEls.forEach((el) => cio.observe(el));
        this._observers.push(cio);
      }

      // --- パララックス ---
      if (parallaxEls.length) {
        this._parallaxEls = Array.from(parallaxEls);
        this._scrollTarget = options.scrollTarget || global;
        this._onScroll = this._onScroll.bind(this);
        this._scrollTarget.addEventListener('scroll', this._onScroll, { passive: true });
        this._onScroll();
      }
    },

    destroy() {
      this._observers.forEach((o) => o.disconnect());
      this._observers = [];
      if (this._scrollTarget && this._onScroll) {
        this._scrollTarget.removeEventListener('scroll', this._onScroll);
      }
      this._parallaxEls = [];
      this._scrollTarget = null;
      if (this._rafId) cancelAnimationFrame(this._rafId);
      this._rafId = null;
    },

    _onScroll() {
      if (this._rafId) return;
      this._rafId = requestAnimationFrame(() => {
        this._rafId = null;
        const viewportH = global.innerHeight || 800;
        this._parallaxEls.forEach((el) => {
          const speed = parseFloat(el.dataset.parallax) || 0.2;
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height / 2 - viewportH / 2;
          el.style.transform = `translate3d(0, ${(-center * speed).toFixed(1)}px, 0)`;
        });
      });
    },

    _runCounter(el) {
      const target = parseFloat(el.dataset.counter) || 0;
      const duration = parseInt(el.dataset.counterDuration || '1400', 10);
      const start = performance.now();
      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = this._formatCount(el, target * eased);
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },

    _formatCount(el, value) {
      const decimals = (el.dataset.counter || '').includes('.')
        ? (el.dataset.counter.split('.')[1] || '').length
        : 0;
      const num = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('ja-JP');
      return `${el.dataset.counterPrefix || ''}${num}${el.dataset.counterSuffix || ''}`;
    },
  };

  global.LPMotion = LPMotion;
})(typeof window !== 'undefined' ? window : globalThis);
