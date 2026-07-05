import type { SitemapUrlInput } from '#sitemap/types'
import { defineSitemapEventHandler } from '#imports'
import {
  buildHreflangAlternatives,
  localePath,
  SITE_LOCALES,
  STATIC_SITEMAP_PATHS,
} from '../../../shared/seo/rendering'

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl || 'https://siphersauna.com')

  const urls: SitemapUrlInput[] = []

  for (const { prefix } of SITE_LOCALES) {
    for (const page of STATIC_SITEMAP_PATHS) {
      urls.push({
        loc: localePath(prefix, page),
        alternatives: buildHreflangAlternatives(page, siteUrl),
        changefreq: page === '/news' ? 'weekly' : 'monthly',
        priority: page === '/' ? 1 : 0.8,
      })
    }
  }

  return urls
})
