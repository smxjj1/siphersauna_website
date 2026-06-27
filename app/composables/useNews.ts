export type NewsCategory = 'company' | 'industry'

export interface NewsAttachment {
  id: number
  fileName: string
  url: string
  mimeType?: string | null
  sizeBytes?: number | null
}

export interface NewsArticle {
  id: number
  title: string
  category: NewsCategory
  summary?: string | null
  contentHtml: string
  viewCount: number
  publishedAt?: string | null
  attachments: NewsAttachment[]
}

function getAnalyticsSessionId(): string {
  if (!import.meta.client)
    return ''
  let value = sessionStorage.getItem('analytics_session_id')
  if (!value) {
    value = `s_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
    sessionStorage.setItem('analytics_session_id', value)
  }
  return value
}

export function useNews() {
  const config = useRuntimeConfig()
  const siteKey = (config.public.cmsSiteKey as string) || ''
  const cmsApi = ((config.public.cmsApi as string) || '').replace(/\/$/, '')

  async function fetchNews(category?: NewsCategory): Promise<NewsArticle[]> {
    if (!cmsApi || !siteKey)
      return []
    const params = new URLSearchParams({ site_key: siteKey })
    if (category)
      params.set('category', category)
    try {
      const res = await $fetch<{ success: boolean; data: NewsArticle[] }>(
        `${cmsApi}/news?${params.toString()}`,
      )
      return res.data || []
    }
    catch (err) {
      if (import.meta.dev)
        console.error('[useNews] fetchNews failed', err)
      return []
    }
  }

  async function recordNewsView(newsId: number): Promise<number | null> {
    if (!cmsApi || !siteKey || !import.meta.client)
      return null
    try {
      const res = await $fetch<{ success: boolean; data: { viewCount: number } }>(
        `${cmsApi}/news/${newsId}/view?site_key=${encodeURIComponent(siteKey)}`,
        {
          method: 'POST',
          body: { sessionId: getAnalyticsSessionId() },
        },
      )
      return res.data?.viewCount ?? null
    }
    catch {
      return null
    }
  }

  return {
    fetchNews,
    recordNewsView,
  }
}
