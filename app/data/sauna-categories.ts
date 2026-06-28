/**
 * Sauna 产品分类定义
 * 基于 products.xlsx 数据生成的分类配置
 */

export interface SaunaCategory {
  slug: string
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
    imageFolder: 'outdoor-sauna',
  }),

  'indoor-sauna': defineSaunaCategory({
    slug: 'indoor-sauna',
    imageFolder: 'indoor-sauna',
  }),
}

export type SaunaCategorySlug = keyof typeof saunaCategories

/**
 * 获取所有分类（每个分类附带 i18n 文本字段）
 */
export function getAllSaunaCategories() {
  const messagesByLocale = {
    'en': {
      'outdoor-sauna': {
        name: 'Outdoor Sauna',
        title: 'Outdoor Sauna Rooms | Premium Wooden Design',
        description: 'Discover our premium outdoor sauna rooms. Crafted from high-quality spruce, hemlock, and red cedar wood with customizable configurations.',
        heroHeadline: 'Premium Outdoor Sauna Experience',
        heroSubheadline: 'Transform your outdoor space into a wellness sanctuary. Our sauna rooms feature premium wood construction, multiple heating options, and complete accessory sets.',
      },
      'indoor-sauna': {
        name: 'Indoor Sauna',
        title: 'Indoor Sauna Rooms | Traditional & Far-Infrared',
        description: 'Explore our indoor sauna collection including traditional sauna rooms and far-infrared lightwave rooms. Compact designs perfect for home installation.',
        heroHeadline: 'Home Wellness Solutions',
        heroSubheadline: 'Bring the sauna experience indoors. From traditional Finnish-style rooms to modern far-infrared technology, find the perfect fit for your space.',
      },
    },
    'zh-CN': {
      'outdoor-sauna': {
        name: '户外桑拿',
        title: '户外桑拿房 | 优质木制设计',
        description: '探索我们的优质户外桑拿房系列。采用高品质云杉、铁杉和红雪松木材打造，支持多种定制配置。',
        heroHeadline: '尊贵户外桑拿体验',
        heroSubheadline: '将您的户外空间打造成养生秘境。我们的桑拿房采用优质木材打造，提供多种加热选项和完整的配件套装。',
      },
      'indoor-sauna': {
        name: '室内桑拿',
        title: '室内桑拿房 | 传统与远红外',
        description: '探索我们的室内桑拿系列，包括传统桑拿房和远红外光波房。紧凑设计，完美适配家居安装。',
        heroHeadline: '家居健康解决方案',
        heroSubheadline: '将桑拿体验带入室内。从传统芬兰式桑拿房到现代远红外科技，为您的空间找到完美之选。',
      },
    },
    'zh-TW': {
      'outdoor-sauna': {
        name: '戶外桑拿',
        title: '戶外桑拿房 | 優質木製設計',
        description: '探索我們的優質戶外桑拿房系列。採用高品質雲杉、鐵杉和紅雪松木材打造，支援多種訂製配置。',
        heroHeadline: '尊貴戶外桑拿體驗',
        heroSubheadline: '將您的戶外空間打造成養生秘境。我們的桑拿房採用優質木材打造，提供多種加熱選項和完整的配件套裝。',
      },
      'indoor-sauna': {
        name: '室內桑拿',
        title: '室內桑拿房 | 傳統與遠紅外',
        description: '探索我們的室內桑拿系列，包括傳統桑拿房和遠紅外光波房。緊湊設計，完美適配家居安裝。',
        heroHeadline: '家居健康解決方案',
        heroSubheadline: '將桑拿體驗帶入室內。從傳統芬蘭式桑拿房到現代遠紅外科技，為您的空間找到完美之選。',
      },
    },
  }

  const slugMap = messagesByLocale
  const result: any[] = []
  for (const key of Object.keys(saunaCategories) as Array<keyof typeof saunaCategories>) {
    const en = slugMap.en[key]
    const zhCN = slugMap['zh-CN'][key]
    const zhTW = slugMap['zh-TW'][key]
    result.push({
      slug: key,
      imageFolder: saunaCategories[key].imageFolder,
      name: en.name,
      title: en.title,
      description: en.description,
      hero: { headline: en.heroHeadline, subheadline: en.heroSubheadline },
      i18n: {
        en: { name: en.name, title: en.title, description: en.description, hero: { headline: en.heroHeadline, subheadline: en.heroSubheadline } },
        'zh-CN': { name: zhCN.name, title: zhCN.title, description: zhCN.description, hero: { headline: zhCN.heroHeadline, subheadline: zhCN.heroSubheadline } },
        'zh-TW': { name: zhTW.name, title: zhTW.title, description: zhTW.description, hero: { headline: zhTW.heroHeadline, subheadline: zhTW.heroSubheadline } },
      },
    })
  }
  return result
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