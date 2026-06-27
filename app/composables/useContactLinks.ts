export interface ContactLinkItem {
  id?: number
  linkType: 'contact' | 'social'
  iconKey: string
  label?: string | null
  url: string
  openInNewTab?: boolean
  sortOrder?: number
}

export interface ContactLinksPayload {
  contact: ContactLinkItem[]
  social: ContactLinkItem[]
  links: ContactLinkItem[]
}

const FALLBACK_LINKS: ContactLinkItem[] = [
  {
    linkType: 'contact',
    iconKey: 'email',
    url: 'mailto:info@siphersauna.com',
    openInNewTab: false,
    sortOrder: 0,
  },
  {
    linkType: 'contact',
    iconKey: 'phone',
    label: 'WhatsApp',
    url: 'tel:+8615999977665',
    openInNewTab: false,
    sortOrder: 1,
  },
  {
    linkType: 'social',
    iconKey: 'instagram',
    url: 'https://www.instagram.com/siphersauna.terra/',
    openInNewTab: true,
    sortOrder: 2,
  },
  {
    linkType: 'social',
    iconKey: 'facebook',
    url: 'https://www.facebook.com/siphersauna',
    openInNewTab: true,
    sortOrder: 3,
  },
  {
    linkType: 'social',
    iconKey: 'xiaohongshu',
    url: 'https://www.xiaohongshu.com/user/profile/6303a7de000000001200fd4d?m_source=pwa',
    openInNewTab: true,
    sortOrder: 4,
  },
  {
    linkType: 'social',
    iconKey: 'threads',
    url: 'https://www.threads.com/@siphersauna.terra',
    openInNewTab: true,
    sortOrder: 5,
  },
  {
    linkType: 'social',
    iconKey: 'linkedin',
    url: 'https://www.linkedin.com/in/siphersauna',
    openInNewTab: true,
    sortOrder: 6,
  },
]

function splitLinks(links: ContactLinkItem[]): ContactLinksPayload {
  return {
    contact: links.filter(item => item.linkType === 'contact'),
    social: links.filter(item => item.linkType === 'social'),
    links,
  }
}

export function getLinkDisplayText(link: ContactLinkItem): string {
  const url = link.url || ''
  if (link.iconKey === 'email') {
    return url.replace(/^mailto:/i, '')
  }
  if (link.iconKey === 'phone' || link.iconKey === 'whatsapp') {
    return url.replace(/^tel:/i, '')
  }
  return url
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
  return link.label || labels[link.iconKey] || link.iconKey
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

  const fromCms = computed(() => !error.value && (data.value?.data?.links?.length ?? 0) > 0)

  const payload = computed<ContactLinksPayload>(() => {
    if (fromCms.value && data.value?.data) {
      return data.value.data
    }
    return splitLinks(FALLBACK_LINKS)
  })

  const contactLinks = computed(() => payload.value.contact)
  const socialLinks = computed(() => payload.value.social)

  return {
    contactLinks,
    socialLinks,
    fromCms,
    pending,
    refresh,
    getLinkDisplayText,
    getLinkAriaLabel,
  }
}
