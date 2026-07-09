/**
 * 从 analytics CMS 拉取博客；API 不可用或无数据时回退到本地 app/data/blog
 */
import type { BlogArticle } from '~/data/blog/types'
import {
  getBlogData,
  getBlogArticleBySlug,
} from '~/data/blog'

export type { BlogArticle }

interface PublicBlogResponse {
  success: boolean
  data: BlogArticle | BlogArticle[]
  error?: string
}

const localeMap: Record<string, string> = {
  en: 'en',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  zhCN: 'zh-CN',
  zhTW: 'zh-TW',
}

function normalizeLocale(locale: string): string {
  return localeMap[locale] || 'en'
}

function normalizeArticle(raw: BlogArticle, mediaBase: string): BlogArticle {
  const tags = Array.isArray(raw.tags)
    ? raw.tags.map(t => String(t).trim()).filter(Boolean)
    : []

  let coverImage = raw.coverImage || undefined
  if (coverImage) {
    if (coverImage.startsWith('http://') || coverImage.startsWith('https://')) {
      // absolute CMS / CDN URL
    }
    else if (coverImage.startsWith('/images/')) {
      // local static asset
    }
    else if (coverImage.startsWith('/media/')) {
      coverImage = `${mediaBase.replace(/\/media\/?$/, '')}${coverImage}`
    }
    else if (!coverImage.startsWith('/')) {
      coverImage = `${mediaBase.replace(/\/$/, '')}/${coverImage}`
    }
  }

  return {
    slug: raw.slug,
    title: raw.title,
    publishDate: (raw.publishDate || '').slice(0, 10),
    category: raw.category,
    tags,
    summary: raw.summary || '',
    content: raw.content || '',
    coverImage,
    author: raw.author,
    viewCount: raw.viewCount,
  }
}

function pickRelatedArticles(
  article: BlogArticle,
  list: BlogArticle[],
  limit = 6,
): BlogArticle[] {
  const others = list.filter(a => a.slug !== article.slug)
  if (!others.length)
    return []

  const dedupe = (items: BlogArticle[]) => {
    const seen = new Set<string>()
    return items.filter((item) => {
      if (seen.has(item.slug))
        return false
      seen.add(item.slug)
      return true
    })
  }

  // Pillar：自动列出各 Cluster（非 pillar），再补其他 Pillar
  if (article.category === 'pillar') {
    const clusters = others.filter(a => a.category !== 'pillar')
    const otherPillars = others.filter(a => a.category === 'pillar')
    return dedupe([...clusters, ...otherPillars]).slice(0, limit)
  }

  // Cluster / 普通文：同分类 → Pillar 回链 → 其他
  const sameCategory = others.filter(a => a.category === article.category)
  const pillars = others.filter(a => a.category === 'pillar')
  const rest = others.filter(
    a => a.category !== article.category && a.category !== 'pillar',
  )
  return dedupe([...sameCategory, ...pillars, ...rest]).slice(0, limit)
}

export function useBlog() {
  const config = useRuntimeConfig()
  const siteKey = (config.public.cmsSiteKey as string) || 'siphersauna.com'
  const cmsApi = ((config.public.cmsApi as string) || 'https://analytics.oyababies.com/api/public').replace(/\/$/, '')
  const mediaBase = ((config.public.cmsMediaBase as string) || 'https://analytics.oyababies.com/media').replace(/\/$/, '')

  async function fetchBlogList(locale: string, category?: string): Promise<BlogArticle[]> {
    const mappedLocale = normalizeLocale(locale)

    // CMS 成功响应（含空列表）以 CMS 为准：后台隐藏/下架后前台应不显示，不再回退本地静态稿
    if (cmsApi && siteKey) {
      try {
        const params = new URLSearchParams({
          site_key: siteKey,
          locale: mappedLocale,
        })
        if (category)
          params.set('category', category)

        const res = await $fetch<PublicBlogResponse>(`${cmsApi}/blog?${params.toString()}`)
        if (res.success) {
          const list = Array.isArray(res.data) ? res.data : []
          return list.map(item => normalizeArticle(item, mediaBase))
        }
      }
      catch (err) {
        if (import.meta.dev)
          console.error('[useBlog] fetchBlogList failed, fallback to local', err)
      }
    }

    const local = getBlogData(mappedLocale)
    if (category)
      return local.filter(a => a.category === category)
    return local
  }

  async function fetchBlogBySlug(slug: string, locale: string): Promise<BlogArticle | null> {
    const mappedLocale = normalizeLocale(locale)

    if (cmsApi && siteKey && slug) {
      try {
        const params = new URLSearchParams({
          site_key: siteKey,
          locale: mappedLocale,
        })
        const res = await $fetch<PublicBlogResponse>(
          `${cmsApi}/blog/${encodeURIComponent(slug)}?${params.toString()}`,
        )
        if (res.success && res.data && !Array.isArray(res.data)) {
          return normalizeArticle(res.data, mediaBase)
        }
        // CMS 明确无此文（或未发布）→ 不回退本地
        return null
      }
      catch (err: unknown) {
        const status = (err as { statusCode?: number; status?: number })?.statusCode
          ?? (err as { status?: number })?.status
        // 404 = 后台已隐藏/不存在，不回退本地
        if (status === 404)
          return null
        if (import.meta.dev)
          console.error('[useBlog] fetchBlogBySlug failed, fallback to local', err)
      }
    }

    return getBlogArticleBySlug(slug, mappedLocale)
  }

  async function fetchBlogDetail(
    slug: string,
    locale: string,
    relatedLimit = 6,
  ): Promise<{ article: BlogArticle | null; relatedArticles: BlogArticle[] }> {
    const mappedLocale = normalizeLocale(locale)
    const article = await fetchBlogBySlug(slug, mappedLocale)

    if (!article) {
      return { article: null, relatedArticles: [] }
    }

    const list = await fetchBlogList(mappedLocale)
    const related = pickRelatedArticles(article, list, relatedLimit)
    if (related.length > 0)
      return { article, relatedArticles: related }

    // API 列表为空时，用本地 helper（同样走增强逻辑）
    return {
      article,
      relatedArticles: pickRelatedArticles(
        article,
        getBlogData(mappedLocale),
        relatedLimit,
      ),
    }
  }

  return {
    fetchBlogList,
    fetchBlogBySlug,
    fetchBlogDetail,
    pickRelatedArticles,
  }
}
