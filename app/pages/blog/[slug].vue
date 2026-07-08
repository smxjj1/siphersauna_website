<script setup lang="ts">
/**
 * 博客文章详情页
 */

defineOptions({
  name: 'BlogDetailPage',
});

import { getBlogArticleBySlug, getRelatedArticles } from '~/data/blog';

definePageMeta({
  layout: 'default',
});

const route = useRoute();
const { tm, t, locale, localePath } = useI18nHelpers();
const slug = route.params.slug as string;

// ============================================================
// 数据获取
// ============================================================
const blogDetailKey = computed(() => `blog-detail-${slug}-${locale.value}`);

const { data: articleData, pending: isLoading } = await useAsyncData(
  blogDetailKey.value,
  async () => {
    const currentArticle = getBlogArticleBySlug(slug, locale.value);
    const related = currentArticle
      ? getRelatedArticles(slug, currentArticle.category, locale.value, 3)
      : [];

    return { article: currentArticle, relatedArticles: related };
  },
  {
    server: true,
    lazy: false,
  },
);

const article = computed(() => articleData.value?.article || null);
const relatedArticles = computed(() => articleData.value?.relatedArticles || []);

// ============================================================
// SEO配置
// ============================================================
useHead({
  title: computed(() => article.value ? `${article.value.title} | ${tm('nav.blog')}` : tm('blogDetail.articleNotFound')),
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: computed(() => article.value?.summary || '') },
  ],
});

// ============================================================
// 工具函数
// ============================================================
function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = {
    'en': 'en-US',
    'zh-CN': 'zh-CN',
    'zh-TW': 'zh-TW',
  };
  return date.toLocaleDateString(localeMap[locale.value] || 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const getArticleUrl = (slug: string) => localePath(`/blog/${slug}`);

const getCategoryName = (category: string) => {
  const categoryMap: Record<string, string> = {
    'saunaSelection': 'blogPage.categories.saunaSelection',
    'healthWellness': 'blogPage.categories.healthWellness',
  };
  const key = categoryMap[category];
  return key ? tm(key) : category;
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'saunaSelection': '#E67020',
    'healthWellness': '#059669',
  };
  return colors[category] || '#E67020';
};

function getReadTime(content: string) {
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 200);
  return `${minutes} ${tm('blogDetail.readTime')}`;
}

// ============================================================
// 锚点目录
// ============================================================
interface TocItem {
  id: string;
  text: string;
  level: number;
}

const tocItems = computed<TocItem[]>(() => {
  if (!article.value?.content) return [];

  const headingRegex = /<h([23])[^>]*>([^<]*)<\/h[23]>/gi;
  const items: TocItem[] = [];
  let match;

  match = headingRegex.exec(article.value.content);
  while (match !== null) {
    const level = Number.parseInt(match[1]);
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/(^-|-$)/g, '');
    items.push({ id, level, text });
    match = headingRegex.exec(article.value.content);
  }

  return items;
});

const activeAnchor = ref('');

onMounted(() => {
  nextTick(() => {
    const contentEl = document.querySelector('.article-content');
    if (contentEl) {
      const headings = contentEl.querySelectorAll('h2, h3');
      headings.forEach((heading) => {
        const text = heading.textContent?.trim() || '';
        const id = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/(^-|-$)/g, '');
        if (!heading.id) {
          heading.id = id;
        }
      });
    }
  });

  const handleScroll = () => {
    const headings = document.querySelectorAll('.article-content h2, .article-content h3');
    let current = '';

    headings.forEach((heading) => {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 120) {
        current = heading.id;
      }
    });

    activeAnchor.value = current;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

function scrollToAnchor(id: string) {
  const element = document.getElementById(id);
  if (element) {
    const offset = 100;
    const top = element.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}
</script>

<template>
  <main class="blog-detail-page">
    <!-- 页面Banner -->
    <section class="page-banner">
      <div class="banner-inner">
        <span v-if="article" class="banner-category" :style="{ color: getCategoryColor(article.category) }">
          {{ getCategoryName(article.category) }}
        </span>
        <h1 class="banner-title">{{ article ? article.title : tm('blogDetail.articleNotFound') }}</h1>
      </div>
    </section>

    <!-- 加载状态 -->
    <div v-if="isLoading" class="loading-state">
      <span class="loading-text">{{ tm('blogDetail.loadingArticle') }}</span>
    </div>

    <!-- 文章内容 -->
    <article v-else-if="article" class="article-wrapper">
      <div class="page-container">
        <div class="article-layout">
          <!-- 文章内容主体 -->
          <div class="article-main">
            <!-- 面包屑导航 -->
            <nav class="breadcrumb" aria-label="Article breadcrumb navigation">
              <ol class="breadcrumb-list">
                <li class="breadcrumb-item">
                  <NuxtLink :to="localePath('/')" class="breadcrumb-link">{{ tm('blogDetail.home') }}</NuxtLink>
                </li>
                <li class="breadcrumb-separator" aria-hidden="true">/</li>
                <li class="breadcrumb-item">
                  <NuxtLink :to="localePath('/blog')" class="breadcrumb-link">{{ tm('nav.blog') }}</NuxtLink>
                </li>
                <li class="breadcrumb-separator" aria-hidden="true">/</li>
                <li class="breadcrumb-item active" aria-current="page">
                  <span class="breadcrumb-text">{{ article.title }}</span>
                </li>
              </ol>
            </nav>

            <!-- 文章头部区域 -->
            <header class="article-header">
              <div class="article-meta">
                <span class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <time :datetime="article.publishDate">{{ formatDate(article.publishDate) }}</time>
                </span>
                <span class="meta-item">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {{ getReadTime(article.content) }}
                </span>
              </div>
            </header>

            <!-- 文章摘要 -->
            <div class="article-summary">
              <p>{{ article.summary }}</p>
            </div>

            <!-- 文章正文内容 -->
            <div class="article-content" v-html="article.content" />

            <!-- 文章标签 -->
            <section class="article-tags" aria-label="Article tags">
              <h2 class="section-subtitle">{{ tm('blogDetail.tags') }}</h2>
              <ul class="tags-list">
                <li v-for="tag in article.tags" :key="tag" class="tag-item">{{ tag }}</li>
              </ul>
            </section>

            <!-- 咨询入口 -->
            <section class="consultation-section" aria-labelledby="consultation-heading">
              <div class="consultation-content">
                <h2 id="consultation-heading" class="consultation-title">{{ tm('blogDetail.needExpertConsultation') }}</h2>
                <p class="consultation-desc">{{ tm('blogDetail.consultationDesc') }}</p>
                <NuxtLink :to="localePath('/contact')" class="consultation-cta">
                  {{ tm('blogDetail.getInTouch') }}
                </NuxtLink>
              </div>
            </section>
          </div>

          <!-- 右侧锚点目录 -->
          <aside v-if="tocItems.length > 0" class="toc-sidebar" aria-label="Table of contents">
            <div class="toc-sticky-wrapper">
              <nav class="toc-nav">
                <h2 class="toc-title">{{ tm('blogDetail.contents') }}</h2>
                <ul class="toc-list">
                  <li
                    v-for="item in tocItems"
                    :key="item.id"
                    class="toc-item"
                    :class="{
                      'toc-sub': item.level === 3,
                      'toc-active': activeAnchor === item.id,
                    }"
                  >
                    <a :href="`#${item.id}`" class="toc-link" @click.prevent="scrollToAnchor(item.id)">
                      {{ item.text }}
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>
        </div>

        <!-- 相关文章推荐 -->
        <section v-if="relatedArticles.length > 0" class="related-section" aria-labelledby="related-heading">
          <div class="related-container">
            <h2 id="related-heading" class="related-title">{{ tm('blogDetail.relatedArticles') }}</h2>

            <div class="related-grid">
              <article v-for="related in relatedArticles" :key="related.slug" class="related-card">
                <NuxtLink :to="getArticleUrl(related.slug)" class="related-card-link">
                  <span class="related-category" :style="{ color: getCategoryColor(related.category) }">
                    {{ getCategoryName(related.category) }}
                  </span>
                  <h3 class="related-card-title">{{ related.title }}</h3>
                  <time :datetime="related.publishDate" class="related-date">
                    {{ formatDate(related.publishDate) }}
                  </time>
                </NuxtLink>
              </article>
            </div>
          </div>
        </section>
      </div>
    </article>

    <!-- 空状态 -->
    <div v-else class="empty-state">
      <p class="empty-text">{{ tm('blogDetail.articleNotFound') }}</p>
      <NuxtLink :to="localePath('/blog')" class="empty-link">{{ tm('blogDetail.backToBlog') }}</NuxtLink>
    </div>
  </main>
</template>

<style lang="less" scoped>
@import '~/assets/css/variables.less';

.blog-detail-page {
  background: @sauna-cream;
  min-height: 100vh;
}

.page-banner {
  padding: 40px 24px;
}

.banner-inner {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(@sauna-wood, 0.05);
  border-radius: 12px;
  padding: 48px 40px;
  border: 1px solid rgba(@sauna-wood, 0.15);
}

.banner-category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.banner-title {
  font-size: 2rem;
  font-weight: 700;
  color: @sauna-dark;
  margin: 0;
  line-height: 1.2;
}

@media (max-width: 768px) {
  .page-banner {
    padding: 24px 16px;
  }

  .banner-inner {
    padding: 32px 24px;
  }

  .banner-title {
    font-size: 1.5rem;
  }
}

.loading-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
}

.loading-text,
.empty-text {
  font-size: 1rem;
  color: @light-text;
}

.empty-link {
  font-size: 0.875rem;
  color: @sauna-wood;
  text-decoration: none;
}

.empty-link:hover {
  text-decoration: underline;
}

.article-wrapper {
  padding: 0 0 80px;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .page-container {
    padding: 0 24px;
  }
}

.article-layout {
  display: flex;
  gap: 40px;
}

.article-main {
  flex: 1;
  min-width: 0;
}

.toc-sidebar {
  flex-shrink: 0;
  width: 200px;
}

.toc-sticky-wrapper {
  position: sticky;
  top: 140px;
}

.toc-nav {
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  scrollbar-width: thin;
}

.toc-nav::-webkit-scrollbar {
  width: 3px;
}

.toc-nav::-webkit-scrollbar-thumb {
  background: @sauna-wood-light;
  border-radius: 3px;
}

.toc-title {
  font-size: 0.75rem;
  font-weight: 600;
  color: @light-text;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.toc-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-item {
  margin-bottom: 0;
}

.toc-link {
  display: block;
  font-size: 0.8125rem;
  color: @light-text;
  text-decoration: none;
  padding: 6px 0 6px 12px;
  border-left: 2px solid rgba(@sauna-wood, 0.2);
  transition: all 0.2s ease;
  line-height: 1.4;
}

.toc-link:hover {
  color: @sauna-wood;
  border-left-color: @sauna-wood;
}

.toc-item.toc-sub .toc-link {
  padding-left: 24px;
  font-size: 0.75rem;
}

.toc-item.toc-active .toc-link {
  color: @sauna-wood;
  border-left-color: @sauna-wood;
  font-weight: 500;
}

@media (max-width: 1200px) {
  .toc-sidebar {
    display: none;
  }

  .article-layout {
    display: block;
  }
}

.breadcrumb {
  padding: 20px 0;
  border-bottom: 1px solid rgba(@sauna-wood, 0.15);
}

.breadcrumb-list {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.875rem;
  flex-wrap: wrap;
}

.breadcrumb-link {
  color: @sauna-wood;
  text-decoration: none;
  transition: color 0.2s ease;
}

.breadcrumb-link:hover {
  color: @sauna-gold;
}

.breadcrumb-separator {
  color: @light-text;
}

.breadcrumb-text {
  color: @sauna-dark;
}

.article-header {
  padding: 32px 0;
  border-bottom: 1px solid rgba(@sauna-wood, 0.15);
  margin-bottom: 32px;
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.875rem;
  color: @light-text;
}

.meta-item svg {
  color: @sauna-wood;
}

.article-summary {
  padding: 20px 24px;
  background: rgba(@sauna-wood, 0.05);
  border-left: 4px solid @sauna-wood;
  border-radius: 0 8px 8px 0;
  margin-bottom: 32px;
}

.article-summary p {
  font-size: 1rem;
  color: @sauna-dark;
  line-height: 1.6;
  margin: 0;
}

.article-content {
  font-size: 1rem;
  line-height: 1.75;
  color: @sauna-dark;
}

.article-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: @sauna-dark;
  margin: 32px 0 16px;
}

.article-content :deep(p) {
  margin: 0 0 20px;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 0 0 20px;
  padding-left: 24px;
}

.article-content :deep(li) {
  margin-bottom: 8px;
}

.article-content :deep(strong) {
  font-weight: 600;
  color: @sauna-dark;
}

.article-tags {
  padding: 32px 0;
  border-top: 1px solid rgba(@sauna-wood, 0.15);
}

.section-subtitle {
  font-size: 0.875rem;
  font-weight: 600;
  color: @sauna-dark;
  margin: 0 0 16px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag-item {
  font-size: 0.8125rem;
  color: @sauna-wood;
  background: rgba(@sauna-wood, 0.08);
  padding: 6px 12px;
  border-radius: 4px;
}

.consultation-section {
  padding: 40px;
  background: rgba(@sauna-wood, 0.05);
  border-radius: 12px;
  margin: 40px 0;
}

.consultation-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: @sauna-dark;
  margin: 0 0 12px;
}

.consultation-desc {
  font-size: 0.9375rem;
  color: @light-text;
  margin: 0 0 20px;
  line-height: 1.6;
}

.consultation-cta {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  font-size: 0.875rem;
  font-weight: 600;
  background: @sauna-wood;
  color: @white;
  text-decoration: none;
  border-radius: 8px;
  transition: background 0.2s ease;
}

.consultation-cta:hover {
  background: @sauna-gold;
}

.related-section {
  background: rgba(@sauna-wood, 0.03);
  padding: 60px 0;
}

.related-container {
  max-width: 1200px;
  margin: 0 auto;
}

.related-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: @sauna-dark;
  margin: 0 0 32px;
  text-align: center;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .related-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}

.related-card {
  background: @white;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(@sauna-wood, 0.1);
  transition: all 0.3s ease;
}

.related-card:hover {
  border-color: @sauna-wood;
  box-shadow: 0 4px 12px rgba(@sauna-dark, 0.08);
}

.related-card-link {
  display: block;
  padding: 20px;
  text-decoration: none;
}

.related-category {
  display: inline-block;
  font-size: 0.6875rem;
  font-weight: 600;
  margin-bottom: 8px;
  letter-spacing: 0.02em;
}

.related-card-title {
  font-size: 0.9375rem;
  font-weight: 600;
  color: @sauna-dark;
  margin: 0 0 12px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-date {
  font-size: 0.8125rem;
  color: @light-text;
}
</style>