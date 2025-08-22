## hash 路由和 history 路由的实现原理是？在部署方面有什么区别呢？

url 的表现形式：
1、hash 路由的 url 后面会有#号，比如：http://www.example.com/#/home。#号后面的值表示hash值，hash值不会传递给服务端，只会在浏览器中解析和处理。
2、history 路由的 url 没有#，同时http://www.example.com/home，同时这种路由的变化需要服务端和客户端同时支持。所有history路由在客户端需要配置404页面，防止服务端解析不到对应的url。

实现原理：
1、hash 路由是利用 window.location.hash 属性实现路由的跳转，当 hash 值发生变化的时候就会触发 hashchange 事件，通过监听这个事件实现页面的无刷新跳转。同时兼容性较好。
2、history 路由的实现是通过 html5 中提供的 history api 实现路由的跳转。比如常见的方法有 history.pushState()、history.replaceState()、用于增加和修改浏览器的历史记录栈。不会触发页面的跳转。同时通过监听 popState 可以用于监听用户点击浏览器的前进和后退的行为。

部署方面：由于 hash 路由不会造成 404 Not Found，所以客户端不需要部署 404 页面，而 history 会造成 404 所以需要对于不存在的地址，服务端返回 404 Not Found，前端根据返回的 404 匹配到 404 页面。

适用场景：一般对于 SEO 要求不高的后台系统建议使用 hash 路由，对于 SEO 相对要求较高，同时体验要求较高的电商系统或者新闻网站可以使用 history。
