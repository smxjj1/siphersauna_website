// Blog article data types

/**
 * 博客文章完整数据类型
 * 用于列表展示和详情页渲染
 */
export interface BlogArticle {
  /** 文章唯一标识 */
  slug: string;
  /** 文章标题 */
  title: string;
  /** 发布日期 (YYYY-MM-DD) */
  publishDate: string;
  /** 文章分类key */
  category: string;
  /** 文章标签数组 */
  tags: string[];
  /** 文章摘要/描述 */
  summary: string;
  /** 文章正文内容 (HTML格式) */
  content: string;
  /** 封面图片URL (可选) */
  coverImage?: string;
  /** 作者 (可选) */
  author?: string;
  /** 阅读量 (可选) */
  viewCount?: number;
}

/**
 * 博客分类元数据
 */
export interface BlogCategory {
  /** 分类唯一key */
  key: string;
  /** 分类名称i18n key */
  nameKey: string;
  /** 分类描述 */
  description?: string;
  /** 分类封面图 */
  coverImage?: string;
  /** 分类颜色 */
  color: string;
}

/**
 * 博客数据模块 - 每个语言一个数组
 */
export interface BlogDataModule {
  /** 英文博客数组 */
  en: BlogArticle[];
  /** 简体中文博客数组 */
  'zh-CN': BlogArticle[];
  /** 繁体中文博客数组 */
  'zh-TW': BlogArticle[];
}

/**
 * 博客列表响应类型
 */
export interface BlogListResponse {
  /** 文章列表 */
  articles: BlogArticle[];
  /** 总数 */
  total: number;
  /** 当前页码 */
  page: number;
  /** 每页数量 */
  pageSize: number;
}

/**
 * 博客详情响应类型
 */
export interface BlogDetailResponse {
  /** 文章详情 */
  article: BlogArticle | null;
  /** 相关文章 */
  relatedArticles: BlogArticle[];
}