import { localePath, SITE_LOCALES, STATIC_SITEMAP_PATHS } from './rendering'

export interface LlmsLink {
  title: string
  description?: string
  href: string
}

export interface LlmsSection {
  title: string
  description?: string
  links: LlmsLink[]
}

const PAGE_LABELS: Record<string, string> = {
  '/': 'Home',
  '/about-us': 'About Us',
  '/contact': 'Contact',
  '/products': 'Products',
  '/news': 'News',
}

export function buildLlmsSections(): LlmsSection[] {
  const sections: LlmsSection[] = [
    {
      title: 'Main Pages',
      description: 'Primary English pages (default locale).',
      links: STATIC_SITEMAP_PATHS.map(path => ({
        title: PAGE_LABELS[path] || path,
        href: path,
      })),
    },
  ]

  for (const { code, prefix } of SITE_LOCALES) {
    if (!prefix) {
      continue
    }
    sections.push({
      title: `${code} Pages`,
      description: `Localized pages (${code}).`,
      links: STATIC_SITEMAP_PATHS.map(path => ({
        title: PAGE_LABELS[path] || path,
        href: localePath(prefix, path),
      })),
    })
  }

  return sections
}

export function buildLlmsNotes(siteUrl: string): string[] {
  return [`Sitemap: ${siteUrl.replace(/\/$/, '')}/sitemap.xml`]
}
