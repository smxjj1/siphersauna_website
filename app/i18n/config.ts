/**
 * i18n 配置：支持的语言与默认语言
 */
export const SUPPORTED_LOCALES = ['en', 'zh-CN', 'zh-TW'] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

export const LOCALE_LABELS: Record<Locale, string> = {
  'en': 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
}

/**
 * 从 URL 路径前缀中提取语言代码；未匹配返回 undefined
 */
export function getLocaleFromPath(path: string): Locale | undefined {
  const match = path.match(/^\/(zh-CN|zh-TW)(\/|$)/)
  return match?.[1] as Locale | undefined
}

/**
 * 判断一个 locale 是否合法
 */
export function isValidLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (SUPPORTED_LOCALES as readonly string[]).includes(value)
}