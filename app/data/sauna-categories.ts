/**
 * Sauna 产品分类定义
 * 基于 products.xlsx 数据生成的分类配置
 */

export interface SaunaCategory {
  slug: string
  name: string
  title: string
  description: string
  hero: {
    headline: string
    subheadline: string
  }
  imageFolder: string
}

/**
 * 定义产品分类的辅助函数
 */
export function defineSaunaCategory(category: SaunaCategory): SaunaCategory {
  return category
}

/**
 * Sauna 产品分类配置
 */
export const saunaCategories = {
  'outdoor-sauna': defineSaunaCategory({
    slug: 'outdoor-sauna',
    name: 'Outdoor Sauna',
    title: 'Outdoor Sauna Rooms | Premium Wooden Design',
    description: 'Discover our premium outdoor sauna rooms. Crafted from high-quality spruce, hemlock, and red cedar wood with customizable configurations.',
    hero: {
      headline: 'Premium Outdoor Sauna Experience',
      subheadline: 'Transform your outdoor space into a wellness sanctuary. Our sauna rooms feature premium wood construction, multiple heating options, and complete accessory sets.',
    },
    imageFolder: 'outdoor-sauna',
  }),

  'indoor-sauna': defineSaunaCategory({
    slug: 'indoor-sauna',
    name: 'Indoor Sauna',
    title: 'Indoor Sauna Rooms | Traditional & Far-Infrared',
    description: 'Explore our indoor sauna collection including traditional sauna rooms and far-infrared lightwave rooms. Compact designs perfect for home installation.',
    hero: {
      headline: 'Home Wellness Solutions',
      subheadline: 'Bring the sauna experience indoors. From traditional Finnish-style rooms to modern far-infrared technology, find the perfect fit for your space.',
    },
    imageFolder: 'indoor-sauna',
  }),
}

export type SaunaCategorySlug = keyof typeof saunaCategories

/**
 * 获取所有分类
 */
export function getAllSaunaCategories() {
  return Object.values(saunaCategories)
}

/**
 * 根据 slug 获取分类
 */
export function getSaunaCategoryBySlug(slug: string) {
  return saunaCategories[slug as SaunaCategorySlug]
}

/**
 * 验证分类 slug 是否有效
 */
export function isValidSaunaCategorySlug(slug: string): slug is SaunaCategorySlug {
  return slug in saunaCategories
}

/**
 * 获取所有分类 slug
 */
export function getAllSaunaCategorySlugs(): string[] {
  return Object.keys(saunaCategories)
}