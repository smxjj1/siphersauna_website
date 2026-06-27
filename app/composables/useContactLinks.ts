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

export function useContactLinks() {
  const config = useRuntimeConfig()
  const siteKey = (config.public.cmsSiteKey as string) || 'siphersauna.com'
  const cmsApi = ((config.public.cmsApi as string) || 'https://analytics.oyababies.com/api/public').replace(/\/$/, '')

  const { data, error, pending, refresh } = useFetch<{ success?: boolean; data?: ContactLinksPayload }>(
    () => `${cmsApi}/contact-links`,
    {
      query: { site_key: siteKey },
      key: `contact-links-${siteKey}`,
    },
  )

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
    getLocalizedProfileText,
  }
}
