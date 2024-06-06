import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress';
import { defaultTheme } from '@vuepress/theme-default';
import { backToTopPlugin } from '@vuepress/plugin-back-to-top'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import { docsearchPlugin } from '@vuepress/plugin-docsearch';


import sidebar from './sidebar';

export default defineUserConfig({
  title: "游离 の Blog",
  head: [
    [
      'link', {
        rel: 'icon',
        href: '/favicon.ico'
      }
    ]
  ],
  theme: defaultTheme({
    lastUpdated: 'Last Updated',
    serviceWorker: {
      updatePopup: true
    },
    sidebar,
    repo: 'liujia6/liujia6.github.io',
    repoLabel: 'GitHub',
    editLinks: true,
    editLinkText: '帮助我们改善此页面！',
    smoothScroll: true,
  }),
  bundler: viteBundler(),
  plugins: [backToTopPlugin(), catalogPlugin({
    // 你的选项
  }), docsearchPlugin()],
  extendsPage: (page) => {
    // 在 routeMeta 中设置目录信息
    page.routeMeta = {
      // 目录标题
      title: page.title,
      // ... 其他信息
    }
  },
})
