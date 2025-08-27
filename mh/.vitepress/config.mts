import { defineConfig } from 'vitepress'
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "1",
  description: "1",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
    ],

    sidebar: [
      {
        text: 'nuxt文档',
        items: [
          { text: 'WASM的介绍', link: '/views/nuxt/wasm' },
          { text: '错误处理', link: '/views/nuxt/error-handling' },
          { text: 'JSX/TSX语法', link: '/views/nuxt/tsx-jsx' }
        ]
      },
      {
        text: '工程化实践',
        items: [
          { text: '代码提交校验及提交规范', link: '/views/issue-tracker/code-submission' },
          { text: 'react中全局配置less', link: '/views/issue-tracker/configure-less' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'react文档',
        items: [
          { text: 'useState', link: '/views/react/use-state' },
          { text: 'useRef', link: '/views/react/use-ref' },
          { text: 'useCallback', link: '/views/react/use-callback' },
          { text: 'useContext', link: '/views/react/use-context' },
          { text: 'useEffect', link: '/views/react/use-effect' },
          { text: 'useLayoutEffect', link: '/views/react/use-layout-effect' },
          { text: 'useMemo', link: '/views/react/use-memo' },
          { text: 'useReducer', link: '/views/react/use-reducer' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
