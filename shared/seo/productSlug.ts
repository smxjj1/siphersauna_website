/**
 * 供 Nitro / sitemap 等与 Nuxt app 共享的再导出。
 * 实现见 app/utils/productSlug.ts（生产构建必须落在 srcDir 内）。
 */
export {
  buildProductPath,
  buildProductPathFromProduct,
  buildProductSlug,
  findProductByRouteSlug,
  normalizeItemNo,
  slugifyProductName,
  type ProductSlugSource,
} from '../../app/utils/productSlug'
