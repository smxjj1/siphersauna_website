import { getLocaleFromPath } from '~/i18n/config'

/**
 * 全局 i18n 中间件
 * 路由策略：
 * - /en/* 或 /en → 重定向到 /* 或 /（英文用根路径）
 * - /zh-CN/* 或 /zh-CN → 保持（匹配 [locale] 文件夹）
 * - /zh-TW/* 或 /zh-TW → 保持（匹配 [locale] 文件夹）
 * - /xxx（无前缀）→ 保持（英文默认，使用根路径页面）
 */
export default defineNuxtRouteMiddleware((to) => {
  const path = to.path

  // /en 前缀：重定向到根路径（英文）
  if (path.startsWith('/en/') || path === '/en') {
    const target = path.replace(/^\/en/, '') || '/'
    return navigateTo(target, { redirectCode: 302 })
  }

  // 已带中文前缀的直接放行
  const localeInPath = getLocaleFromPath(path)
  if (localeInPath) return

  // 无前缀保持访问（英文默认，使用根路径页面）
  return
})