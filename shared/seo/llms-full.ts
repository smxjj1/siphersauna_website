import fallbackCatalog from '../../app/data/sauna-products.json'
import { localePath, SITE_LOCALES, STATIC_SITEMAP_PATHS } from './rendering'

interface CatalogCategory {
  name?: string
  slug?: string
  count?: number
  subcategories?: string[]
}

interface CatalogProduct {
  name?: string
  itemNo?: string
  categorySlug?: string
  description?: string
}

interface ProductCatalog {
  totalProducts?: number
  categories?: CatalogCategory[]
  products?: CatalogProduct[]
}

const PAGE_SUMMARIES: Record<string, string> = {
  '/': 'Homepage with hero carousel, product highlights, FAQ, and wellness brand story.',
  '/about-us': 'Company story, manufacturing strengths, and sauna craftsmanship.',
  '/contact': 'Contact form and business inquiry for home and commercial sauna projects.',
  '/products': 'Full product catalog with outdoor and indoor sauna categories from CMS.',
  '/news': 'Company news and home sauna industry updates.',
}

function absoluteUrl(domain: string, path: string): string {
  const base = domain.replace(/\/$/, '')
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`
}

async function loadCatalog(): Promise<ProductCatalog> {
  const siteKey = process.env.NUXT_PUBLIC_CMS_SITE_KEY || 'siphersauna.com'
  const cmsApi = (process.env.NUXT_PUBLIC_CMS_API || 'https://analytics.oyababies.com/api/public').replace(/\/$/, '')

  try {
    const res = await fetch(`${cmsApi}/products?site_key=${encodeURIComponent(siteKey)}`)
    if (res.ok) {
      const data = await res.json() as ProductCatalog
      if (data.categories?.length) {
        return data
      }
    }
  }
  catch {
    // CMS 不可用时使用本地 catalog
  }

  return fallbackCatalog as ProductCatalog
}

function buildPageSection(domain: string, path: string, title: string, summary: string): string {
  return [
    `### ${title}`,
    `- URL: ${absoluteUrl(domain, path)}`,
    `- Summary: ${summary}`,
  ].join('\n')
}

export async function buildLlmsFullContents(
  domain: string,
  title: string,
  description: string,
): Promise<string[]> {
  const catalog = await loadCatalog()
  const contents: string[] = [
    `# ${title}`,
    `> ${description}`,
    [
      '## Site Information',
      `- Canonical domain: ${domain.replace(/\/$/, '')}`,
      '- Languages: English (default), zh-CN, zh-TW',
      `- Total products: ${catalog.totalProducts ?? catalog.products?.length ?? 0}`,
      `- Product categories: ${catalog.categories?.length ?? 0}`,
    ].join('\n'),
    [
      '## Main Pages (English)',
      ...STATIC_SITEMAP_PATHS.map(path => buildPageSection(
        domain,
        path,
        path === '/' ? 'Home' : path.slice(1).replace(/-/g, ' '),
        PAGE_SUMMARIES[path] || 'Site page.',
      )),
    ].join('\n\n'),
  ]

  for (const { code, prefix } of SITE_LOCALES) {
    if (!prefix) {
      continue
    }
    contents.push([
      `## ${code} Pages`,
      ...STATIC_SITEMAP_PATHS.map(path => buildPageSection(
        domain,
        localePath(prefix, path),
        `${code} — ${path === '/' ? 'Home' : path.slice(1)}`,
        PAGE_SUMMARIES[path] || 'Localized site page.',
      )),
    ].join('\n\n'))
  }

  const productsBySlug = new Map<string, CatalogProduct[]>()
  for (const product of catalog.products ?? []) {
    const slug = product.categorySlug?.trim()
    if (!slug) {
      continue
    }
    const list = productsBySlug.get(slug) ?? []
    if (list.length < 12) {
      list.push(product)
      productsBySlug.set(slug, list)
    }
  }

  const categorySections = (catalog.categories ?? []).map((category) => {
    const slug = category.slug?.trim()
    if (!slug) {
      return ''
    }
    const products = productsBySlug.get(slug) ?? []
    const lines = [
      `### ${category.name || slug}`,
      `- URL: ${absoluteUrl(domain, '/products')} (filter: ${slug})`,
      `- Product count: ${category.count ?? products.length}`,
    ]
    if (category.subcategories?.length) {
      lines.push(`- Subcategories: ${category.subcategories.join(', ')}`)
    }
    if (products.length) {
      lines.push('- Sample products:')
      for (const product of products) {
        const label = product.itemNo ? `${product.itemNo} — ${product.name}` : product.name
        lines.push(`  - ${label}`)
      }
    }
    return lines.join('\n')
  }).filter(Boolean)

  if (categorySections.length) {
    contents.push(['## Product Categories', ...categorySections].join('\n\n'))
  }

  contents.push([
    '## Related Files',
    `- llms.txt: ${absoluteUrl(domain, '/llms.txt')}`,
    `- Sitemap: ${absoluteUrl(domain, '/sitemap.xml')}`,
  ].join('\n'))

  return contents
}
