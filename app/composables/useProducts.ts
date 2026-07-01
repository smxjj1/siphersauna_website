/**
 * 从 analytics CMS 拉取产品目录；API 不可用时回退到本地 sauna-products.json
 */
import fallbackSauna from '~/data/sauna-products.json'

type SaunaCatalog = typeof fallbackSauna
type SaunaProduct = SaunaCatalog['products'][number]
type SaunaCategory = SaunaCatalog['categories'][number]

interface CatalogResponse {
  generatedAt?: string
  totalProducts?: number
  categories?: SaunaCategory[]
  products?: SaunaProduct[]
}

function resolveCategorySlug(input?: string | Ref<string | undefined>): string | undefined {
  if (!input) return undefined
  if (typeof input === 'string') {
    const trimmed = input.trim()
    return trimmed && trimmed !== 'all' ? trimmed : undefined
  }
  const value = input.value?.trim()
  return value && value !== 'all' ? value : undefined
}

export function useProductCatalog(categorySlug?: string | Ref<string | undefined>) {
  const config = useRuntimeConfig()
  const siteKey = (config.public.cmsSiteKey as string) || 'siphersauna.com'
  const cmsApi = ((config.public.cmsApi as string) || 'https://analytics.oyababies.com/api/public').replace(/\/$/, '')

  const slugRef = computed(() => resolveCategorySlug(categorySlug))

  const query = computed(() => {
    const q: Record<string, string> = { site_key: siteKey }
    if (slugRef.value) {
      q.categorySlug = slugRef.value
    }
    return q
  })

  const fetchKey = computed(() => `products-${siteKey}-${slugRef.value ?? 'all'}`)

  const { data, error, pending, refresh } = useFetch<CatalogResponse>(() => `${cmsApi}/products`, {
    query,
    key: fetchKey,
  })

  const products = computed<SaunaProduct[]>(() => {
    if (!error.value && data.value?.products?.length) {
      return data.value.products as SaunaProduct[]
    }
    const list = fallbackSauna.products as SaunaProduct[]
    if (slugRef.value) {
      return list.filter(p => p.categorySlug === slugRef.value)
    }
    return list
  })

  const categories = computed<SaunaCategory[]>(() => {
    let list: SaunaCategory[]
    if (!error.value && data.value?.categories?.length) {
      list = data.value.categories as SaunaCategory[]
    }
    else {
      list = fallbackSauna.categories as SaunaCategory[]
    }
    return [...list].sort((a, b) => ((a as { sortOrder?: number }).sortOrder ?? 0) - ((b as { sortOrder?: number }).sortOrder ?? 0))
  })

  const totalProducts = computed(() => {
    if (!error.value && data.value?.totalProducts != null) {
      return data.value.totalProducts
    }
    return products.value.length
  })

  const fromCms = computed(() => !error.value && (data.value?.products?.length ?? 0) > 0)

  return {
    products,
    categories,
    totalProducts,
    error,
    pending,
    fromCms,
    refresh,
  }
}

/** @deprecated 使用 useProductCatalog */
export function useProducts(categorySlug: string) {
  return useProductCatalog(categorySlug)
}
