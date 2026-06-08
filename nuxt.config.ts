// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: [
    // Swiper CSS - 核心 + 所有模块样式
    'swiper/css',
    'swiper/css/bundle',
    '~/assets/css/main.less'
  ],

  runtimeConfig: {
    public: {
      analyticsToken: process.env.NUXT_PUBLIC_ANALYTICS_TOKEN || '',
      analyticsBaseUrl: process.env.NUXT_PUBLIC_ANALYTICS_BASE_URL || 'https://analytics.siphersauna.com',
      analyticsSiteId: process.env.NUXT_PUBLIC_ANALYTICS_SITE_ID || 'siphersauna.com',
      /** 为 true 时不发起任何上报（如本地调试） */
      analyticsDisabled: process.env.NUXT_PUBLIC_ANALYTICS_DISABLED === 'true',
      /** 为 true 时匿名用户 ID 仅存 sessionStorage，关闭标签后重置（偏隐私） */
      analyticsSessionOnlyUser: process.env.NUXT_PUBLIC_ANALYTICS_SESSION_ONLY_USER === 'true',
    },
  },

  app: {
    head: {
      title: 'Sipher Sauna — Premium Home Sauna Solutions',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Experience the ultimate home sauna with Sipher Sauna. Premium wood and heating technology for your wellness sanctuary.' }
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=League+Spartan:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "~/assets/css/variables.less";'
        }
      }
    }
  }
})