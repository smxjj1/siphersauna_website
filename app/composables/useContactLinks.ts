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
  if (/^mailto:/i.test(url))
    return url.replace(/^mailto:/i, '')
  if (/^tel:/i.test(url))
    return url.replace(/^tel:/i, '')
  if (link.iconKey === 'phone' || link.iconKey === 'whatsapp')
    return url.replace(/^tel:/i, '')
  if (link.iconKey === 'email')
    return url.replace(/^mailto:/i, '')
  return link.label || url
}

export function getLinkAriaLabel(link: ContactLinkItem): string {
  const url = link.url || ''
  if (link.label)
    return link.label
  if (/^tel:/i.test(url) || link.iconKey === 'phone')
    return 'Phone'
  if (/wa\.me|whatsapp/i.test(url) || link.iconKey === 'whatsapp')
    return 'WhatsApp'
  if (/^mailto:/i.test(url) || link.iconKey === 'email')
    return 'Email'

  const labels: Record<string, string> = {
    instagram: 'Instagram',
    facebook: 'Facebook',
    xiaohongshu: 'Xiaohongshu',
    threads: 'Threads',
    linkedin: 'LinkedIn',
    twitter: 'Twitter',
    youtube: 'YouTube',
    tiktok: 'TikTok',
  }
  return labels[link.iconKey || ''] || link.iconKey || 'Link'
}

export function getContactLinkAriaLabel(link: ContactLinkItem): string {
  const display = getLinkDisplayText(link)
  const type = getLinkAriaLabel(link)
  return display ? `${type}: ${display}` : type
}

/**
 * 联系方式只在浏览器端拉取，不参与 SSG/SSR payload。
 * 这样后台改完刷新官网一定是最新值，也不会被预渲染旧数据盖住。
 */
export function useContactLinks() {
  const config = useRuntimeConfig()
  const siteKey = (config.public.cmsSiteKey as string) || 'siphersauna.com'
  const cmsApi = ((config.public.cmsApi as string) || 'https://analytics.oyababies.com/api/public').replace(/\/$/, '')

  const { data, error, pending, refresh } = useFetch<{ success?: boolean; data?: ContactLinksPayload }>(
    () => `${cmsApi}/contact-links`,
    {
      query: {
        site_key: siteKey,
      },
      key: `contact-links-client-${siteKey}`,
      server: false,
      lazy: false,
      default: () => ({ success: true, data: { ...EMPTY_PAYLOAD } }),
      getCachedData: () => undefined,
    },
  )

  // 每次组件挂载（含整页刷新）再强制拉一次
  onMounted(() => {
    void refresh()
  })

  const payload = computed<ContactLinksPayload>(() => {
    if (error.value || !data.value?.success || !data.value.data)
      return { ...EMPTY_PAYLOAD }
    return normalizePayload(data.value.data)
  })

  return {
    contactLinks: computed(() => payload.value.contact),
    socialLinks: computed(() => payload.value.social),
    contactProfile: computed(() => payload.value.profile || EMPTY_PROFILE),
    hasLinks: computed(() => payload.value.links.length > 0),
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
