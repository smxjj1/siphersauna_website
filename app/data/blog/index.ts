import type { BlogArticle, BlogDataModule, BlogListResponse, BlogDetailResponse } from './types';

import { blogEn, blogDataModuleEn } from './en';
import { blogZhCN, blogDataModuleZhCN } from './zh-CN';
import { blogZhTW, blogDataModuleZhTW } from './zh-TW';

// 导出类型
export type {
  BlogArticle,
  BlogDataModule,
  BlogListResponse,
  BlogDetailResponse,
} from './types';

// Combined blog data - each module has all languages
const blogData: Record<string, BlogDataModule> = {
  'en': blogDataModuleEn,
  'zh-CN': blogDataModuleZhCN,
  'zh-TW': blogDataModuleZhTW,
};

// Locale 映射表
const localeMap: Record<string, string> = {
  'en': 'en',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
  'zhCN': 'zh-CN',
  'zhTW': 'zh-TW',
};

/**
 * 获取当前语言对应的博客数据
 * @param locale 语言代码
 */
export function getBlogData(locale: string): BlogArticle[] {
  const mappedLocale = localeMap[locale] || 'en';
  const module = blogData[mappedLocale];

  if (!module) {
    return [];
  }

  return module[mappedLocale as keyof BlogDataModule] || [];
}

/**
 * 获取所有博客文章（所有语言）
 */
export function getAllBlogArticles(): BlogArticle[] {
  return [...blogEn, ...blogZhCN, ...blogZhTW];
}

/**
 * 根据 slug 和语言获取单篇文章
 * @param slug 文章 slug
 * @param locale 语言代码
 */
export function getBlogArticleBySlug(slug: string, locale: string): BlogArticle | null {
  const data = getBlogData(locale);
  return data.find(article => article.slug === slug) || null;
}

/**
 * 根据分类获取相关文章
 * @param slug 当前文章 slug
 * @param category 分类
 * @param locale 语言代码
 * @param limit 返回数量限制
 */
export function getRelatedArticles(
  slug: string,
  category: string,
  locale: string,
  limit = 3,
): BlogArticle[] {
  const data = getBlogData(locale);
  return data
    .filter(article => article.category === category && article.slug !== slug)
    .slice(0, limit);
}

/**
 * 获取博客列表响应数据
 * @param locale 语言代码
 * @param page 页码
 * @param pageSize 每页数量
 */
export function getBlogListResponse(
  locale: string,
  page = 1,
  pageSize = 10,
): BlogListResponse {
  const articles = getBlogData(locale);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    articles: articles.slice(start, end),
    total: articles.length,
    page,
    pageSize,
  };
}

/**
 * 获取博客详情响应数据
 * @param slug 文章 slug
 * @param locale 语言代码
 */
export function getBlogDetailResponse(
  slug: string,
  locale: string,
): BlogDetailResponse {
  const article = getBlogArticleBySlug(slug, locale);
  const relatedArticles = article
    ? getRelatedArticles(slug, article.category, locale, 3)
    : [];

  return {
    article,
    relatedArticles,
  };
}

/**
 * 获取博客分类列表
 */
export function getBlogCategories(): { key: string; nameKey: string; color: string }[] {
  return [
    { key: 'selectionDimension', nameKey: 'blogPage.categories.selectionDimension', color: '#E67020' },
    { key: 'materialProcess', nameKey: 'blogPage.categories.materialProcess', color: '#059669' },
    { key: 'installationTroubleshooting', nameKey: 'blogPage.categories.installationTroubleshooting', color: '#D97706' },
    { key: 'projectCases', nameKey: 'blogPage.categories.projectCases', color: '#7C3AED' },
  ];
}

/**
 * 检查文章是否存在（任意语言）
 * @param slug 文章 slug
 */
export function articleExists(slug: string): boolean {
  return getAllBlogArticles().some(article => article.slug === slug);
}