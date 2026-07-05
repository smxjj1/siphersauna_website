import enMessages from '~/i18n/locales/en.json'
import zhCNMessages from '~/i18n/locales/zh-CN.json'
import zhTWMessages from '~/i18n/locales/zh-TW.json'
import { DEFAULT_LOCALE, isValidLocale, type Locale } from '~/i18n/config'

const messagesMap: Record<Locale, Record<string, any>> = {
  'en': enMessages,
  'zh-CN': zhCNMessages,
  'zh-TW': zhTWMessages,
}

function resolveByPath(obj: Record<string, any>, path: string): any {
  if (!obj) return undefined
  return path.split('.').reduce<any>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in acc) {
      return acc[segment]
    }
    return undefined
  }, obj)
}

/**
 * 从 URL 路径检测 locale
 */
function detectFromUrl(path: string): Locale {
  const m = path.match(/^\/(zh-CN|zh-TW)(\/|$)/)
  if (m && isValidLocale(m[1])) {
    return m[1] as Locale
  }
  return DEFAULT_LOCALE
}

/**
 * 获取当前 locale - 基于请求 URL 动态检测
 */
export function useLocale() {
  try {
    const route = useRoute()
    const path = route.path
    const detected = detectFromUrl(path)
    return ref(detected) as any
  } catch {
    return ref(DEFAULT_LOCALE) as any
  }
}

/**
 * 切换语言并持久化（仅客户端有效）
 */
export function setLocale(newLocale: Locale) {
  if (!isValidLocale(newLocale)) return
  if (import.meta.client) {
    try { localStorage.setItem('sipher-locale', newLocale) }
    catch { /* ignore */ }
  }
}

/**
 * 获取当前语言的所有消息
 */
export function useAllMessages() {
  const locale = useLocale()
  return computed(() => {
    const l = locale.value
    return messagesMap[l] ?? messagesMap[DEFAULT_LOCALE] ?? {}
  })
}

/**
 * 读取字符串翻译
 */
export function useTmObject(key: string): string {
  const msgs = useAllMessages()
  const val = resolveByPath(msgs.value, key)
  return typeof val === 'string' ? val : key
}

/**
 * 读取数组翻译
 */
export function useTmArray(key: string): any[] {
  const msgs = useAllMessages()
  const val = resolveByPath(msgs.value, key)
  return Array.isArray(val) ? val : []
}

/**
 * 翻译 + 占位插值
 */
export function useT(key: string, params?: Record<string, string | number>): string {
  const raw = useTmObject(key)
  if (!params) return raw
  return raw.replace(/\{(\w+)\}/g, (_, n) => {
    const v = params[n]
    return v === undefined || v === null ? `{${n}}` : String(v)
  })
}

/**
 * 生成语言前缀路径
 * - 英语不带前缀：useLocalePath('/products') => '/products'
 * - 中文带前缀：useLocalePath('/products') => '/zh-CN/products'
 */
export function useLocalePath(path: string): string {
  const locale = useLocale()
  const norm = path.startsWith('/') ? path : `/${path}`
  if (locale.value === 'en') return norm
  return `/${locale.value}${norm}`
}

/**
 * 去掉路径中的语言前缀
 */
export function useStrippedPath(path: string): string {
  const stripped = path.replace(/^\/(zh-CN|zh-TW)/, '')
  return stripped.startsWith('/') ? stripped : `/${stripped}`
}

/** 从 localStorage 读取 */
export function getStoredLocale(): Locale | undefined {
  if (!import.meta.client) return undefined
  try {
    const s = localStorage.getItem('sipher-locale')
    return isValidLocale(s) ? s : undefined
  } catch { return undefined }
}

/** 从 navigator.language 推断 */
export function getBrowserLocale(): Locale | undefined {
  if (!import.meta.client) return undefined
  const lang = navigator?.language
  if (!lang) return undefined
  if (lang.startsWith('zh')) {
    return lang.toLowerCase().includes('tw') || lang.toLowerCase().includes('hk') ? 'zh-TW' : 'zh-CN'
  }
  if (lang.startsWith('en')) return 'en'
  return undefined
}
