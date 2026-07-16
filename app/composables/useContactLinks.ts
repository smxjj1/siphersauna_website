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

  const { data, error, pending, refresh } = useFetch<{ success?: boolean; data?: ContactLinksPayload }>(
    () => `${cmsApi}/contact-links`,
    {
      query: { site_key: siteKey },
      key: `contact-links-${siteKey}`,
      // 绕过浏览器对公开 API 的 HTTP 缓存；仍保留 SSR/SSG payload 供首屏展示
      cache: 'no-store',
    },
  )

  // 每次完整进入页面后，在客户端再拉一次，避免 SSG 冻住旧数据
  const didClientRefresh = useState(`contact-links-client-refresh-${siteKey}`, () => false)
  onMounted(() => {
    if (didClientRefresh.value)
      return
    didClientRefresh.value = true
    void refresh()
  })

  const payload = computed<ContactLinksPayload>(() => {
    if (error.value || !data.value?.success || !data.value.data) {
      return EMPTY_PAYLOAD
    }
    return {
      ...data.value.data,
      profile: data.value.data.profile || EMPTY_PROFILE,
    }
  })

  const contactLinks = computed(() => payload.value.contact)
  const socialLinks = computed(() => payload.value.social)
  const contactProfile = computed(() => payload.value.profile || EMPTY_PROFILE)
  const hasLinks = computed(() => payload.value.links.length > 0)

  return {
    contactLinks,
    socialLinks,
    contactProfile,
    hasLinks,
    pending,
    error,
    refresh,
    getLinkDisplayText,
    getLinkAriaLabel,
    getContactLinkAriaLabel,
    getLocalizedProfileText,
    getMapEmbedQuery,
    buildGoogleMapEmbedUrl,
  }
}
