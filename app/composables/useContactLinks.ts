export interface ContactLinkItem {
  id?: number
  linkType: 'contact' | 'social'
  iconSource?: 'builtin' | 'upload'
  iconKey?: string | null
  iconUrl?: string | null
  label?: string | null
  url: string
  openInNewTab?: boolean
  sortOrder?: number
}

export interface ContactProfile {
  address?: string | null
  businessHours?: string | null
  addressI18n?: Record<string, string> | null
  businessHoursI18n?: Record<string, string> | null
}

export interface ContactLinksPayload {
  contact: ContactLinkItem[]
  social: ContactLinkItem[]
  links: ContactLinkItem[]
  profile?: ContactProfile | null
}

const EMPTY_PROFILE: ContactProfile = {
  address: null,
  businessHours: null,
  addressI18n: null,
  businessHoursI18n: null,
}

const EMPTY_PAYLOAD: ContactLinksPayload = {
  contact: [],
  social: [],
  links: [],
  profile: EMPTY_PROFILE,
}

function normalizePayload(data: ContactLinksPayload): ContactLinksPayload {
  return {
    contact: Array.isArray(data.contact) ? data.contact : [],
    social: Array.isArray(data.social) ? data.social : [],
    links: Array.isArray(data.links) ? data.links : [],
    profile: data.profile || EMPTY_PROFILE,
  }
}

export function getLocalizedProfileText(
  profile: ContactProfile | null | undefined,
  field: 'address' | 'businessHours',
  locale?: string,
): string {
  if (!profile) return ''
  const i18nKey = field === 'address' ? 'addressI18n' : 'businessHoursI18n'
  const i18n = profile[i18nKey]
  const normalizedLocale = locale || 'en'

  if (i18n?.[normalizedLocale]) return i18n[normalizedLocale]
  if (normalizedLocale === 'zh-TW' && i18n?.['zh-CN']) return i18n['zh-CN']
  return profile[field] || ''
}

export function getMapEmbedQuery(profile: ContactProfile | null | undefined): string {
  if (!profile) return ''
  const zhCn = profile.addressI18n?.['zh-CN']?.trim()
  if (zhCn) return zhCn
  const en = profile.addressI18n?.en?.trim()
  if (en) return en
  return (profile.address || '').replace(/[\r\n]+/g, ' ').trim()
}

export function buildGoogleMapEmbedUrl(query: string, locale?: string): string {
  const normalized = query.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim()
  if (!normalized) return ''
  const hl = locale?.startsWith('zh') ? 'zh-CN' : 'en'
  const q = encodeURIComponent(normalized).replace(/%20/g, '+')
  return `https://www.google.com/maps?q=${q}&output=embed&z=15&hl=${hl}`
}

export function getLinkDisplayText(link: ContactLinkItem): string {
  const url = link.url || ''
  if (link.iconKey === 'email') {
    return url.replace(/^mailto:/i, '')
  }
  if (link.iconKey === 'phone' || link.iconKey === 'whatsapp') {
    return url.replace(/^tel:/i, '')
  }
  return link.label || url
}

export function getLinkAriaLabel(link: ContactLinkItem): string {
  const labels: Record<string, string> = {
    email: 'Email',
    phone: 'Phone',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
    xiaohongshu: 'Xiaohongshu',
    threads: 'Threads',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    youtube: 'YouTube',
    tiktok: 'TikTok',
  }
  return link.label || labels[link.iconKey || ''] || link.iconKey || 'Link'
}

/** Accessible name for contact links (icon-only on small screens). */
export function getContactLinkAriaLabel(link: ContactLinkItem): string {
  const display = getLinkDisplayText(link)
  const type = getLinkAriaLabel(link)
  return display ? `${type}: ${display}` : type
}

export function useContactLinks() {
  const config = useRuntimeConfig()
  const siteKey = (config.public.cmsSiteKey as string) || 'siphersauna.com'
  const cmsApi = ((config.public.cmsApi as string) || 'https://analytics.oyababies.com/api/public').replace(/\/$/, '')

  // 页面实际渲染读这个；客户端 $fetch 会直接覆盖，彻底绕开 Nuxt SSG/asyncData 缓存
  const livePayload = useState<ContactLinksPayload>(
    `contact-links-live-${siteKey}`,
    () => ({ ...EMPTY_PAYLOAD }),
  )

  const { data, error, pending } = useFetch<{ success?: boolean; data?: ContactLinksPayload }>(
    () => `${cmsApi}/contact-links`,
    {
      query: { site_key: siteKey },
      key: `contact-links-${siteKey}`,
      cache: 'no-store',
    },
  )

  watch(
    data,
    (value) => {
      if (value?.success && value.data)
        livePayload.value = normalizePayload(value.data)
    },
    { immediate: true },
  )

  const didClientRefresh = useState(`contact-links-client-refresh-${siteKey}`, () => false)

  async function fetchFreshContactLinks() {
    const res = await $fetch<{ success?: boolean; data?: ContactLinksPayload }>(
      `${cmsApi}/contact-links`,
      {
        query: {
          site_key: siteKey,
          // 防止中间层按 URL 缓存
          _: String(Date.now()),
        },
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
        },
      },
    )
    if (res?.success && res.data)
      livePayload.value = normalizePayload(res.data)
    return res
  }

  onMounted(() => {
    if (didClientRefresh.value)
      return
    didClientRefresh.value = true
    void fetchFreshContactLinks().catch((err) => {
      if (import.meta.dev)
        console.error('[useContactLinks] client refresh failed', err)
    })
  })

  const contactLinks = computed(() => livePayload.value.contact)
  const socialLinks = computed(() => livePayload.value.social)
  const contactProfile = computed(() => livePayload.value.profile || EMPTY_PROFILE)
  const hasLinks = computed(() => livePayload.value.links.length > 0)

  return {
    contactLinks,
    socialLinks,
    contactProfile,
    hasLinks,
    pending,
    error,
    refresh: fetchFreshContactLinks,
    getLinkDisplayText,
    getLinkAriaLabel,
    getContactLinkAriaLabel,
    getLocalizedProfileText,
    getMapEmbedQuery,
    buildGoogleMapEmbedUrl,
  }
}
