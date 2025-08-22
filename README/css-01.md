- [position:fixed 和 position：sticky 的区别？](#positionfixed-和-positionsticky-的区别)
- [粘性定位失效的原因的可能有哪些？](#粘性定位失效的原因的可能有哪些)
- [如何实现水平垂直居中布局？](#如何实现水平垂直居中布局)
- [实现响应式布局的方式有哪些？](#实现响应式布局的方式有哪些)
- [css 选择器的优先级？](#css-选择器的优先级)

## position:fixed 和 position：sticky 的区别？

position:fixed 是固定定位

1. 相对浏览器的视口进行定位。
2. 固定定位会脱离文档流。
3. 固定定位始终固定在页面的某个位置，不会随着页面的滚动而滚动，常见的如网页中的返回顶部按钮。

position：sticky 是粘性定位

1. 粘性定位是相对最近的滚动容器进行定位（默认是 viewport，但受父元素影响）。
2. 粘性定位不会脱离文档流动。
3. 粘性定位在特定范围内固定，超出范围后恢复流动。

上面的定位方式都支持设置 top left right bottom 的值

## 粘性定位失效的原因的可能有哪些？
1. ​​父容器或祖先元素设置了 overflow: hidden / overflow: scroll / overflow: auto.
2. sticky 元素是否处于一个​​可滚动的容器内​​？页面/父容器是否能滚动？
3. 检查sticky的z-index是否是否比较低，被其他元素遮挡。
4. 元素没有设置top、left、bottom、right值。


## 如何实现水平垂直居中布局？

1. flex 布局： 父元素设置 display:flex; justify-content:center; align-items:center; (适用于多行或者单行，元素可以是任意类型)
2. grid 布局： 父元素设置 display:grid; place-items:center; 或者 display:grid; justify-items:center; align-items:center;
3. 绝对定位 + transform: 父元素相对定位 position:relative; 子元素 position:absolute; left:50%; top:50%; transform: translate(-50%,-50%);
4. 绝对定位 + margin:auto: 父元素相对定位 position:relative; 子元素 position:absolute; left:0; right:0; top:0; bottom:0; margin:auto;
5. 单行文本或者行里元素行内块元素居中: text-align:center; height:x; line-height:x; 高度和行高相等。

## 实现响应式布局的方式有哪些？

1. 媒体查询@media：特点是基于不同的断点定义不同的样式。

```css
/* 默认样式（pc优先） */
.container {
  width: 100%;
}
/* 平板及以下 */
@media (max-width: 768px) {
  .container {
    width: 750px;
  }
}
```

2. flex 布局：一维布局。
3. grid 布局：二维布局。
4. 使用视口单位进行布局：比如 rem、em、vw、wh。
5. 百分比布局：依赖父元素的宽度进行变化。

总结：开发过程中常常采用多种布局方式的融合，比如网站可以采用媒体查询 + vw + 百分比布局

## css 选择器的优先级？

1. 元素选择器（div、p）：权重 1
2. 类、伪类（.class、:hover）：权重 10
3. ID 选择器（#id）：权重 100
4. 行内样式（style="color:red;"）：权重 1000
5. !important：最高优先级，覆盖所有样式（但不推荐滥用）
