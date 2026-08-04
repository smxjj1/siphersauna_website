/**
 * 产品详情 URL：/products/{itemNo}-{name-slug}
 * 解析以完整 itemNo 匹配为准（支持 SIP-I001-2-3-4 等带连字符型号）。
 *
 * 实现放在 app/utils，避免 Nuxt 生产构建无法解析 app 外的 shared 相对路径。
 */

export type ProductSlugSource = {
  itemNo?: string | null
  name?: string | null
  categorySlug?: string | null
}

export function slugifyProductName(name: string): string {
  return name
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')
    .slice(0, 80)
}

export function normalizeItemNo(itemNo: string): string {
  return itemNo.trim().toLowerCase().replace(/\s+/g, '')
}

/** 生成路径段：sip-sq-cedar-outdoor-sauna */
export function buildProductSlug(itemNo: string, name: string): string {
  const no = normalizeItemNo(itemNo)
  if (!no)
    return ''
  const nameSlug = slugifyProductName(name || '')
  return nameSlug ? `${no}-${nameSlug}` : no
}

/** 生成站内路径（不含 locale 前缀）：/products/{slug} */
export function buildProductPath(itemNo: string, name: string): string {
  const slug = buildProductSlug(itemNo, name)
  if (!slug)
    return ''
  return `/products/${slug}`
}

export function buildProductPathFromProduct(product: ProductSlugSource): string {
  return buildProductPath(product.itemNo || '', product.name || '')
}

/**
 * 在产品列表中按路由 slug 查找。
 * 1) 完整 slug 精确匹配 2) itemNo 前缀匹配（名称改过仍能打开）
 */
export function findProductByRouteSlug<T extends ProductSlugSource>(
  products: T[],
  routeSlug: string,
): T | null {
  const slug = (routeSlug || '').trim().toLowerCase()
  if (!slug || !products?.length)
    return null

  const exact = products.find(p => buildProductSlug(p.itemNo || '', p.name || '') === slug)
  if (exact)
    return exact

  // 按 itemNo 长度降序，优先匹配更长型号（避免 SIP-I001 抢先匹配 SIP-I001-2-3-4）
  const ranked = [...products].sort(
    (a, b) => normalizeItemNo(b.itemNo || '').length - normalizeItemNo(a.itemNo || '').length,
  )

  return ranked.find((p) => {
    const no = normalizeItemNo(p.itemNo || '')
    if (!no)
      return false
    return slug === no || slug.startsWith(`${no}-`)
  }) ?? null
}
