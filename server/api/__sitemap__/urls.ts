import type { SitemapUrlInput } from '#sitemap/types'
import { defineSitemapEventHandler } from '#imports'
import {
  buildHreflangAlternatives,
  localePath,
  SITE_LOCALES,
  STATIC_SITEMAP_PATHS,
} from '../../../shared/seo/rendering'
import { buildProductPath } from '../../../shared/seo/productSlug'

async function fetchProductPaths(siteKey: string, cmsApi: string): Promise<string[]> {
  try {
    const res = await fetch(`${cmsApi.replace(/\/$/, '')}/products?site_key=${encodeURIComponent(siteKey)}`)
    if (!res.ok)
      return []
    const json = await res.json() as {
      products?: { itemNo?: string; name?: string }[]
    }
    const paths: string[] = []
    for (const product of json.products || []) {
      const path = buildProductPath(product.itemNo || '', product.name || '')
      if (path)
        paths.push(path)
    }
    return [...new Set(paths)]
  }
  catch {
    return []
  }
}

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig()
  const siteUrl = String(config.public.siteUrl || 'https://siphersauna.com')
  const siteKey = String(config.public.cmsSiteKey || 'siphersauna.com')
  const cmsApi = String(config.public.cmsApi || 'https://analytics.oyababies.com/api/public')

  const productPaths = await fetchProductPaths(siteKey, cmsApi)
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

    for (const path of productPaths) {
      urls.push({
        loc: localePath(prefix, path),
        alternatives: buildHreflangAlternatives(path, siteUrl),
        changefreq: 'weekly',
        priority: 0.7,
      })
    }
  }

  return urls
})
