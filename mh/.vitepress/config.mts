import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '1',
  description: '1',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'css文档',
        items: [
          { text: '入门', link: '/views/css/basics' },
          { text: '进阶', link: '/views/css/advance' },
          { text: '元素', link: '/views/css/element' },
          { text: '布局', link: '/views/css/layout' },
          { text: 'css属性计算', link: '/views/css/attribute-calculation' },
          { text: '包含块', link: '/views/css/containing-block' },
        ],
      },
      {
        text: 'javascript文档',
        items: [
          { text: 'js入门', link: '/views/javascript/basics' },
          { text: 'js进阶', link: '/views/javascript/advance' },
          { text: 'this', link: '/views/javascript/this' },
          { text: '方法实现', link: '/views/javascript/method-realize' },
          { text: 'object', link: '/views/javascript/object' },
          { text: '数据处理', link: '/views/javascript/data-correlation' },
          { text: 'promise', link: '/views/javascript/es6-promise' },
          { text: 'ES6入门', link: '/views/javascript/es6-basics' },
          { text: 'ES6进阶', link: '/views/javascript/es6-advance' },
          { text: '类', link: '/views/javascript/es6-class' },
          { text: '性能优化', link: '/views/javascript/performance-optimization' },
          { text: '本地存储', link: '/views/javascript/bowser-local-storage' },
          { text: '浏览器渲染原理', link: '/views/javascript/bowser-rendering' },
          { text: '数据交互', link: '/views/javascript/browser-data-interaction' },
          { text: '浏览器其他', link: '/views/javascript/bowser-others' },
          { text: '并发请求', link: '/views/javascript/browser-erupt-request' },
          { text: '请求相关', link: '/views/javascript/browser-request' },
          { text: '文档对象模型', link: '/views/javascript/dom' },
          { text: '事件循环', link: '/views/javascript/event-loop' },
          { text: 'route相关', link: '/views/javascript/router' },
          { text: '笔试', link: '/views/javascript/written-examination' }
        ],
      },
      {
        text: 'nuxt文档',
        items: [
          { text: 'WASM的介绍', link: '/views/nuxt/wasm' },
          { text: '错误处理', link: '/views/nuxt/error-handling' },
          { text: 'JSX/TSX语法', link: '/views/nuxt/tsx-jsx' },
          { text: 'Module Extend Pages', link: '/views/nuxt/modules' },
          { text: '内置组合式函数', link: '/views/nuxt/composables' },
        ],
      },
      {
        text: '其他',
        items: [
          { text: '代码提交校验及提交规范', link: '/views/others/code-submission' },
          { text: 'react中全局配置less', link: '/views/others/configure-less' },
          { text: 'git相关', link: '/views/others/git' },
        ],
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' },
        ],
      },
      {
        text: 'react文档',
        items: [
          { text: '基础', link: '/views/react/basics' },
          { text: '进阶', link: '/views/react/advance' },
          { text: 'useState', link: '/views/react/use-state' },
          { text: 'useState', link: '/views/react/use-state' },
          { text: 'useRef', link: '/views/react/use-ref' },
          { text: 'useCallback', link: '/views/react/use-callback' },
          { text: 'useContext', link: '/views/react/use-context' },
          { text: 'useEffect', link: '/views/react/use-effect' },
          { text: 'useLayoutEffect', link: '/views/react/use-layout-effect' },
          { text: 'useMemo', link: '/views/react/use-memo' },
          { text: 'useReducer', link: '/views/react/use-reducer' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
  },
})
