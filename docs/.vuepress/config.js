
const sidebar = require('./sidebar')
module.exports = {
  title: "游离 の Blog",
  displayAllHeaders: false,
  head: [
    [
      'link', {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  themeConfig: {
    lastUpdated: 'Last Updated',
    serviceWorker: {
      updatePopup: true
    },
    sidebar,
    repo: 'vuejs/vuepress',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'GitHub',
    editLinks: true,
    // 默认为 "Edit this page"
    editLinkText: '帮助我们改善此页面！',
    smoothScroll: true,
  },
  plugins: [
    'vuepress-plugin-mermaidjs',
    // [
    // 'vuepress-plugin-comment',
    // {
    //   choosen: 'valine', 
    //   // options选项中的所有参数，会传给Valine的配置
    //   options: {
    //     el: '#valine-vuepress-comment',
    //     appId: 'MEr0RNOHEJqJmtIqbEpS6uOi-gzGzoHsz',
    //     appKey: 'udUk8RVK1CWR7OIvCzDvT2zk'
    //   }
    // }
    // ],
    // 'autobar',
    '@vuepress/back-to-top',
    '@vuepress/pwa', {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: "New content is available.",
          buttonText: "Refresh"
        },
        '/zh/': {
          message: "发现新内容可用",
          buttonText: "刷新"
        }
      }
    }
  ]
}
