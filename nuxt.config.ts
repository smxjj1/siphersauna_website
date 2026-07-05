import { buildHybridRouteRules } from './shared/seo/rendering'
import { buildLlmsNotes, buildLlmsSections } from './shared/seo/llms'

const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://siphersauna.com'
const siteName = 'Sipher Sauna'
const siteDescription = 'Experience the ultimate home sauna with Sipher Sauna. Premium wood and heating technology for your wellness sanctuary.'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  modules: ['@nuxtjs/seo', 'nuxt-gtag', 'nuxt-llms'],

  css: [
    'swiper/css/bundle',
    '~/assets/css/main.less',
  ],

  site: {
    url: siteUrl,
    name: siteName,
    description: siteDescription,
    defaultLocale: 'en',
  },

  runtimeConfig: {
    public: {
      siteUrl,
      siteName,
      analyticsToken: process.env.NUXT_PUBLIC_ANALYTICS_TOKEN || '',
      analyticsBaseUrl: process.env.NUXT_PUBLIC_ANALYTICS_BASE_URL || 'https://analytics.siphersauna.com',
      analyticsSiteId: process.env.NUXT_PUBLIC_ANALYTICS_SITE_ID || 'siphersauna.com',
      /** 产品 CMS（analytics-platform /api/public） */
      cmsSiteKey: process.env.NUXT_PUBLIC_CMS_SITE_KEY || 'siphersauna.com',
      cmsApi: process.env.NUXT_PUBLIC_CMS_API || 'https://analytics.oyababies.com/api/public',
      cmsMediaBase: process.env.NUXT_PUBLIC_CMS_MEDIA_BASE || 'https://analytics.oyababies.com/media',
      /** 为 true 时不发起任何上报（如本地调试） */
      analyticsDisabled: process.env.NUXT_PUBLIC_ANALYTICS_DISABLED === 'true',
      /** 为 true 时匿名用户 ID 仅存 sessionStorage，关闭标签后重置（偏隐私） */
      analyticsSessionOnlyUser: process.env.NUXT_PUBLIC_ANALYTICS_SESSION_ONLY_USER === 'true',
      /** i18n 配置 */
      supportedLocales: ['en', 'zh-CN', 'zh-TW'],
      defaultLocale: 'en',
    },
  },

  /** Google Analytics 4（NUXT_PUBLIC_GTAG_ID 可覆盖 id） */
  gtag: {
    enabled: process.env.NUXT_PUBLIC_ANALYTICS_DISABLED !== 'true',
    id: process.env.NUXT_PUBLIC_GTAG_ID || 'G-TLD63MYJC7',
  },

  llms: {
    domain: siteUrl,
    title: siteName,
    description: siteDescription,
    sections: buildLlmsSections(),
    notes: buildLlmsNotes(siteUrl),
    full: {
      title: `${siteName} — Full Documentation`,
      description: 'Complete site overview, page summaries, and sauna product catalog for AI assistants.',
    },
  },

  /** Hybrid Rendering：首页 SSG，产品页 ISR 5 分钟，新闻页 ISR 30 分钟 */
  routeRules: buildHybridRouteRules(),

  nitro: {
    prerender: {
      routes: ['/', '/zh-CN', '/zh-TW', '/llms.txt', '/llms-full.txt'],
    },
    routeRules: {
      '/images/**': {
        headers: { 'cache-control': 'public, max-age=31536000, immutable' },
      },
    },
  },

  sitemap: {
    excludeAppSources: true,
    autoI18n: false,
    sources: ['/api/__sitemap__/urls'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.7,
    },
    xslColumns: [
      { label: 'URL', width: '50%' },
      { label: 'Last Modified', select: 'sitemap:lastmod', width: '25%' },
      { label: 'Hreflangs', select: 'count(xhtml:link)', width: '25%' },
    ],
  },

  linkChecker: {
    skipInspections: ['no-uppercase-chars', 'trailing-slash'],
  },

  robots: {
    disallow: ['/example', '/example/**', '/api/**'],
  },

  ogImage: {
    enabled: false,
  },

  schemaOrg: {
    identity: {
      type: 'Organization',
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/images/logo/logo.png`,
      description: siteDescription,
    },
  },

  app: {
    head: {
      title: 'Sipher Sauna — Premium Home Sauna Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: siteDescription },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/images/logo/logo.png',
        },
      ],
      htmlAttrs: { lang: 'en' },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "~/assets/css/variables.less";',
        },
      },
    },
  },
})
