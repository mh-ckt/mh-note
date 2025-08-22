- [刷新浏览器之后，vuex 的数据是否存在？如何解决？](##01)
- [Vue-Router 的原理是什么?](##02)

## 刷新浏览器之后，vuex 的数据是否存在？如何解决？

解释：刷新浏览器会导致 vuex 中的数据丢失，这是由于 vuex 中存储的数据是存储在内存中的，刷新浏览器会导致整个页面重新刷新，所以 vuex 中的数据会重新初始化。解决方案是使用本地存储。

## Vue-Router 的原理是什么?

1. vue-router 是通过 url 映射对应的组件，通过监听 url 的变化去渲染不同的组件。
2. vue-router 有两种模式，第一种是 hash 模式，第二种是 history 模式。hash 模式在域名中添加#，通过监听 window.onhashchange 事件拿到对应的#后面的内容实现跳转。
3. history 模式是通过监听 HTML5 中 History API 监听路由的变化，例如：pushState、replaceState 等。
4. 简易的 hash 路由实现。

```html
<nav>
  <a href="#/home">Home</a>
  <a href="#/about">About</a>
</nav>
<div id="route-view"></div>
<script>
  const routelist = [
    {
      path: '/home',
      component: 'home pages',
    },
    {
      path: '/about',
      component: 'about pages',
    },
  ]
  const routeView = document.getElementById('route-view')
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.substring(1) || '/'
    let items = routelist.find((item) => item.path === hash)
    routeView.innerHTML = items.component
  })
</script>
```

4. 简易的 history 路由实现。

```html
<nav>
  <a href="/home">Home</a>
  <a href="/about">About</a>
</nav>
<div id="route-view"></div>

<script>
  const routelist = [
    {
      path: '/home',
      component: 'home pages',
    },
    {
      path: '/about',
      component: 'about pages',
    },
  ]

  const routeView = document.getElementById('route-view')
  // 拦截所有 <a> 标签点击事件，使用 History API 替换默认跳转
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault() // 阻止默认跳转
      const href = link.getAttribute('href')
      history.pushState({}, '', href) // 更新 URL（不刷新页面）
      let items = routelist.find((item) => item.path === href)
      routeView.innerHTML = items.component
    })
  })
</script>
```
