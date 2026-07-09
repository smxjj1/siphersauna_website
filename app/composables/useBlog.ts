/**
 * 从 analytics CMS 拉取博客；API 不可用或无数据时回退到本地 app/data/blog
 */
import type { BlogArticle } from '~/data/blog/types'
import {
  getBlogData,
  getBlogArticleBySlug,
  getRelatedArticles,
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

export function useBlog() {
  const config = useRuntimeConfig()
  const siteKey = (config.public.cmsSiteKey as string) || 'siphersauna.com'
  const cmsApi = ((config.public.cmsApi as string) || 'https://analytics.oyababies.com/api/public').replace(/\/$/, '')
  const mediaBase = ((config.public.cmsMediaBase as string) || 'https://analytics.oyababies.com/media').replace(/\/$/, '')

  async function fetchBlogList(locale: string, category?: string): Promise<BlogArticle[]> {
    const mappedLocale = normalizeLocale(locale)

    if (cmsApi && siteKey) {
      try {
        const params = new URLSearchParams({
          site_key: siteKey,
          locale: mappedLocale,
        })
        if (category)
          params.set('category', category)

        const res = await $fetch<PublicBlogResponse>(`${cmsApi}/blog?${params.toString()}`)
        const list = Array.isArray(res.data) ? res.data : []
        if (res.success && list.length > 0) {
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
      }
      catch (err: unknown) {
        const status = (err as { statusCode?: number; status?: number })?.statusCode
          ?? (err as { status?: number })?.status
        if (status !== 404 && import.meta.dev)
          console.error('[useBlog] fetchBlogBySlug failed, fallback to local', err)
      }
    }

    return getBlogArticleBySlug(slug, mappedLocale)
  }

  async function fetchBlogDetail(
    slug: string,
    locale: string,
    relatedLimit = 3,
  ): Promise<{ article: BlogArticle | null; relatedArticles: BlogArticle[] }> {
    const mappedLocale = normalizeLocale(locale)
    const article = await fetchBlogBySlug(slug, mappedLocale)

    if (!article) {
      return { article: null, relatedArticles: [] }
    }

    // Prefer CMS list for related; fall back to local helper
    const list = await fetchBlogList(mappedLocale)
    const fromCms = list.filter(
      a => a.category === article.category && a.slug !== article.slug,
    ).slice(0, relatedLimit)

    if (fromCms.length > 0)
      return { article, relatedArticles: fromCms }

    return {
      article,
      relatedArticles: getRelatedArticles(slug, article.category, mappedLocale, relatedLimit),
    }
  }

  return {
    fetchBlogList,
    fetchBlogBySlug,
    fetchBlogDetail,
  }
}
