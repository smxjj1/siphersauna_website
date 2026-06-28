/**
 * i18n 辅助 composables（保持稳定的对外 API）
 * 真正的实现位于 useI18n.ts，这里提供简洁别名
 */
export function useI18nHelpers() {
  return {
    tm: useTmObject,
    tma: useTmArray,
    t: useT,
    localePath: useLocalePath,
    // 延迟解析 locale，避免在 composable 初始化时调用
    get locale() {
      return useLocale()
    },
  }
}