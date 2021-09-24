# web-platform-rkuapl

[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/web-platform-rkuapl)

Code:
https://jsfiddle.net/StyleEye/8zxdram7/143/

改修箇所：

- 並べている 4 枚自体の Gallery にしていた -> その４枚は Gallery のクリックトリガーとし、実際の Gallery の複数写真は内部的に HTML で持っておく
- Grid を FlexBox で微妙な調整をしていたため、CSS Grid でシンプルに簡略化
- Gallery 作動中の写真タイトルの表示オプション追加
  写真個別にタイトルがある場合
  `<a class="spotlight" data-title="title Name" href="https://picsum.photos/1200/800/?image=1071"></a>`
  グループ共通の名前で良い場合
  `<div class="spotlight-group" data-title="共通タイトル">`

Capture:
https://i.gyazo.com/d3c99be7d01d67fa27751ecd5eb67614.mp4
