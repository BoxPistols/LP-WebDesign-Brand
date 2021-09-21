window.onload = () => {
  startObserve();
};

function startObserve() {
  // 見えている量が閾値を上回るか下回ったときに呼ばれる
  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio === 1) {
        // 100%見えなくなったとき
        entry.target.classList.add('active');
      } else if (!entry.isIntersecting) {
        // 見えている領域が20%を下回ったとき
        entry.target.classList.remove('active');
      }
    });
  };

  const option = {
    // 20%と100％の閾値
    threshold: [0.2, 1.0],
  };

  let observer = new IntersectionObserver(callback, option);

  let elements = document.querySelectorAll('.obs');

  for (let i = 0; i < elements.length; i++) {
    // 同じインスタンスにターゲットとなる要素を渡す
    observer.observe(elements[i]);
  }
}
//   let target = document.querySelector(".obs");
//   observer.observe(target);
// }
