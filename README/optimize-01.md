- [你如何优化一个有大量高质量图片的品牌网站？](##01)
- [一个品牌网站的首页有大量动画，导致首屏加载缓慢，你会如何优化？](##02)

## 你如何优化一个有大量高质量图片的品牌网站？

1. 响应式图片技术：使用 picture 包裹不同的 source 资源，适应不同的屏幕尺寸。

```html
<picture>
  <source media="(max-width: 828px),(orientation:portrait)" srcset="" />
  <img decoding="async" src="" />
</picture>
```

2. 使用 WebP 替代 JPG/PNG， webP 格式相对其他的格式有更小的体积和兼容性。
3. 使用 CDN 分发图片资源。
4. 压缩图片 + 对于小的图片可以使用雪碧图，减少请求压力。
5. 使用 IntersectionObserver 监听图片的加载，实现图片的懒加载。

## 一个品牌网站的首页有大量动画，导致首屏加载缓慢，你会如何优化？

1. 渐进式加载数据，先加载可见的
2. 使用 GPU 渲染 will-change: transform;
3. 减少 setInterval setTimeout
