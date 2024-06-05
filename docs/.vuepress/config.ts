import { viteBundler } from '@vuepress/bundler-vite'
import { defineUserConfig } from 'vuepress';
import { defaultTheme } from '@vuepress/theme-default';
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
})
