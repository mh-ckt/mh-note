- [如何让图片始终自适应铺满全屏？](##1)

## 如何让图片始终自适应铺满全屏？

1. 背景图片 + background-size: cover;

```css
body {
  margin: 0;
  height: 100vh;
  background-size: cover; /* 等比例缩放图片覆盖容器，图片不会变形 */
  background-position: center;
  background-repeat: no-repeat;
  background-image: url('');
}
```

2. img 标签 + object-fit:cover;

```css
img {
  position: fixed; /* 相对浏览器的视口进行定位 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1; /* 置于内容下方 */
}
```
