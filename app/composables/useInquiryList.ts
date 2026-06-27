export interface InquiryListItem {
  itemNo: string
  name: string
  categorySlug?: string
  mainImage?: string
  addedAt: number
}

export type InquiryListAddResult =
  | { ok: true }
  | { ok: false; reason: 'duplicate' | 'limit' }

export const INQUIRY_LIST_MAX = 20

const ITEM_NO_PATTERN = /^[A-Za-z0-9\-_.]+$/

export function parseProductsQuery(value: unknown): string[] {
  if (value == null || value === '') return []
  const raw = Array.isArray(value) ? value.join(',') : String(value)
  return raw
    .split(/[,，;；]+/)
    .map((part) => part.trim())
    .filter((part) => ITEM_NO_PATTERN.test(part))
}

export function formatProductsField(itemNos: string[]): string {
  return [...new Set(itemNos.filter(Boolean))].join(', ')
}

export function mergeProductsField(existing: string, itemNos: string[]): string {
  const fromField = existing
    .split(/[,，;；]+/)
    .map((part) => part.trim())
    .filter(Boolean)
  return formatProductsField([...fromField, ...itemNos])
}

export function applyProductsQueryToField(queryValue: unknown, existingField: string): string {
  const fromQuery = parseProductsQuery(queryValue)
  if (!fromQuery.length) return existingField
  return mergeProductsField(existingField, fromQuery)
}

export function useInquiryList() {
  const config = useRuntimeConfig()
  const siteKey = (config.public.cmsSiteKey as string) || 'default'
  const storageKey = `inquiry-list:${siteKey}`
  const stateKey = `inquiry-list-state-${siteKey}`
  const feedbackKey = `inquiry-list-feedback-${siteKey}`

  const items = useState<InquiryListItem[]>(stateKey, () => [])
  const feedbackMessage = useState<string | null>(feedbackKey, () => null)
  let feedbackTimer: ReturnType<typeof setTimeout> | null = null

  const persist = () => {
    if (!import.meta.client) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(items.value))
    } catch {
      // ignore quota / private mode
    }
  }

  const hydrate = () => {
    if (!import.meta.client) return
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) {
        items.value = parsed
      }
    } catch {
      items.value = []
    }
  }

  if (import.meta.client) {
    onMounted(() => {
      if (items.value.length === 0) {
        hydrate()
      }
    })
  }

  const count = computed(() => items.value.length)

  const showFeedback = (message: string) => {
    feedbackMessage.value = message
    if (import.meta.client) {
      if (feedbackTimer) clearTimeout(feedbackTimer)
      feedbackTimer = setTimeout(() => {
        feedbackMessage.value = null
      }, 2500)
    }
  }

  const add = (product: Omit<InquiryListItem, 'addedAt'>): InquiryListAddResult => {
    if (items.value.some((item) => item.itemNo === product.itemNo)) {
      return { ok: false, reason: 'duplicate' }
    }
    if (items.value.length >= INQUIRY_LIST_MAX) {
      return { ok: false, reason: 'limit' }
    }
    items.value = [
      ...items.value,
      {
        ...product,
        addedAt: Date.now(),
      },
    ]
    persist()
    return { ok: true }
  }

  const remove = (itemNo: string) => {
    items.value = items.value.filter((item) => item.itemNo !== itemNo)
    persist()
  }

  const clear = () => {
    items.value = []
    persist()
  }

  const getItemNos = () => items.value.map((item) => item.itemNo)

  const buildProductsQuery = () => formatProductsField(getItemNos())

  return {
    items,
    count,
    feedbackMessage,
    add,
    remove,
    clear,
    getItemNos,
    buildProductsQuery,
    showFeedback,
    INQUIRY_LIST_MAX,
  }
}
