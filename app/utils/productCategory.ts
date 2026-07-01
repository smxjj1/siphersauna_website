export interface CmsCategoryMeta {
  name: string
  slug: string
  count?: number
  sortOrder?: number
  subcategories?: string[]
  pageRoute?: string | null
}

const GENERAL_KEY = 'General'

const SUBCATEGORY_DISPLAY_ALIASES: Record<string, string> = {
  Far: 'Far-Infrared Sauna Room',
  Dry: 'Dry-Wet Steam Combination',
}

export function formatSubcategoryLabel(subcategory: string): string {
  if (subcategory === GENERAL_KEY) {
    return 'General'
  }
  return SUBCATEGORY_DISPLAY_ALIASES[subcategory] || subcategory
}

export function normalizeSubcategoryKey(subcategory: string): string {
  const trimmed = subcategory?.trim()
  return trimmed || GENERAL_KEY
}

export function sortSubcategoryKeys(keys: string[], preferredOrder: string[] = []): string[] {
  const unique = [...new Set(keys)]
  const order = preferredOrder.filter(Boolean)
  const result: string[] = []
  const seen = new Set<string>()

  for (const sub of order) {
    if (unique.includes(sub)) {
      result.push(sub)
      seen.add(sub)
    }
  }

  const rest = unique.filter(k => k !== GENERAL_KEY && !seen.has(k)).sort()
  result.push(...rest)

  if (unique.includes(GENERAL_KEY)) {
    result.push(GENERAL_KEY)
  }

  return result
}
