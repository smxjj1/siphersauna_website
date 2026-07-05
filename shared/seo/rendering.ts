/** 产品页 ISR 缓存：5 分钟 */
export const PRODUCT_ISR_SECONDS = 300

/** 博客/新闻页 ISR 缓存：30 分钟 */
export const BLOG_ISR_SECONDS = 1800

export const SITE_LOCALES = [
  { code: 'en', prefix: '', hreflang: 'en-US' },
  { code: 'zh-CN', prefix: 'zh-CN', hreflang: 'zh-CN' },
  { code: 'zh-TW', prefix: 'zh-TW', hreflang: 'zh-TW' },
] as const

/** 三语均存在的静态页 */
export const STATIC_SITEMAP_PATHS = ['/', '/about-us', '/contact', '/products', '/news'] as const

export function localePath(prefix: string, path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  if (!prefix) {
    return normalized
  }
  if (normalized === '/') {
    return `/${prefix}`
  }
  return `/${prefix}${normalized}`
}

/** 构建 Hybrid Rendering 的 routeRules */
export function buildHybridRouteRules() {
  const rules: Record<string, object> = {
    '/': { prerender: true },
    '/zh-CN': { prerender: true },
    '/zh-TW': { prerender: true },
    '/example/**': { index: false },
  }

  for (const { prefix } of SITE_LOCALES) {
    rules[localePath(prefix, '/products')] = { isr: PRODUCT_ISR_SECONDS }
    rules[localePath(prefix, '/news')] = { isr: BLOG_ISR_SECONDS }
  }

  return rules
}

export function buildHreflangAlternatives(path: string, siteUrl: string) {
  const normalizedSiteUrl = siteUrl.replace(/\/$/, '')
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  const alternatives = SITE_LOCALES.map(({ prefix, hreflang }) => ({
    hreflang,
    href: `${normalizedSiteUrl}${localePath(prefix, normalizedPath)}`,
  }))

  alternatives.push({
    hreflang: 'x-default',
    href: `${normalizedSiteUrl}${localePath('', normalizedPath)}`,
  })

  return alternatives
}
