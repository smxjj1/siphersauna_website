<script setup lang="ts">
/**
 * 博客列表页面
 *
 * 数据来源：app/data/blog/
 */

import { getBlogData } from '~/data/blog';

defineOptions({
  name: 'BlogListPage',
});

definePageMeta({
  layout: 'default',
});

const { tm, t, locale, localePath } = useI18nHelpers();

// ============================================================
// SEO配置
// ============================================================
useHead({
  title: computed(() => `${tm('blogPage.pageTitle')} | Sipher Sauna`),
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: computed(() => tm('blogPage.pageDesc')) },
  ],
});

// ============================================================
// 状态管理
// ============================================================
const activeCategory = ref('all');
const searchQuery = ref('');

// ============================================================
// 数据获取
// ============================================================
const blogListKey = computed(() => `blog-list-${locale.value}`);

const { data: blogData, pending: isLoading } = await useAsyncData(
  blogListKey.value,
  async () => {
    return getBlogData(locale.value);
  },
  {
    server: true,
    lazy: false,
  },
);

const allArticles = computed(() => blogData.value || []);

const categories = computed(() => {
  const uniqueCategories = [...new Set(allArticles.value.map(a => a.category))];
  return ['all', ...uniqueCategories];
});

const filteredArticles = computed(() => {
  let filtered = [...allArticles.value];

  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(article => article.category === activeCategory.value);
  }

  if (searchQuery.value.trim()) {
    const searchLower = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      article =>
        article.title.toLowerCase().includes(searchLower)
        || article.summary.toLowerCase().includes(searchLower)
        || article.tags.some(tag => tag.toLowerCase().includes(searchLower)),
    );
  }

  return filtered;
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
</script>

<template>
  <main class="blog-list-page">
    <div class="page-container">
      <!-- 页面Banner -->
      <section class="page-banner">
        <div class="banner-inner">
          <h1 class="banner-title">{{ tm('blogPage.pageTitle') }}</h1>
          <p class="banner-desc">{{ tm('blogPage.pageDesc') }}</p>
        </div>
      </section>

      <!-- 分类Tab与搜索区 -->
      <section class="filter-section">
        <nav class="category-tabs" aria-label="Blog category navigation">
          <button
            v-for="category in categories"
            :key="category"
            class="tab-button"
            :class="{ 'tab-active': activeCategory === category }"
            :aria-selected="activeCategory === category"
            @click="activeCategory = category"
          >
            {{ category === 'all' ? tm('blogPage.all') : getCategoryName(category) }}
          </button>
        </nav>

        <div class="search-wrapper">
          <input
            v-model="searchQuery"
            type="search"
            class="search-input"
            :placeholder="tm('blogPage.searchPlaceholder')"
            aria-label="Search blog articles"
          >
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </section>

      <!-- 文章列表 -->
      <section class="articles-grid" aria-label="Blog articles list">
        <div v-if="isLoading" class="loading-state">
          <span class="loading-text">{{ tm('blogPage.loading') }}</span>
        </div>

        <div v-else-if="filteredArticles.length === 0" class="empty-state">
          <p class="empty-text">{{ tm('blogPage.empty') }}</p>
        </div>

        <article v-else v-for="article in filteredArticles" :key="article.slug" class="article-card">
          <div v-if="article.coverImage" class="card-image">
            <img :src="article.coverImage" :alt="article.title" loading="lazy" />
          </div>
          <div class="card-content">
            <span class="card-category" :style="{ color: getCategoryColor(article.category) }">
              {{ getCategoryName(article.category) }}
            </span>

            <h2 class="card-title">
              <NuxtLink :to="getArticleUrl(article.slug)" class="card-title-link">
                {{ article.title }}
              </NuxtLink>
            </h2>

            <time :datetime="article.publishDate" class="card-date">
              {{ formatDate(article.publishDate) }}
            </time>

            <p class="card-abstract">{{ article.summary }}</p>

            <ul class="card-tags" aria-label="Article tags">
              <li v-for="tag in article.tags.slice(0, 3)" :key="tag" class="tag-item">
                {{ tag }}
              </li>
            </ul>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>

<style lang="less" scoped>
@import '~/assets/css/variables.less';

.blog-list-page {
  background: @sauna-cream;
  min-height: 100vh;
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

.page-banner {
  padding: 40px 0 24px;
}

.banner-inner {
  background: rgba(@sauna-wood, 0.05);
  border-radius: 12px;
  padding: 48px 40px;
  border: 1px solid rgba(@sauna-wood, 0.15);
}

.banner-title {
  font-size: 2rem;
  font-weight: 700;
  color: @sauna-dark;
  margin: 0 0 12px;
  line-height: 1.2;
}

.banner-desc {
  font-size: 1rem;
  color: @light-text;
  margin: 0;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .page-banner {
    padding: 24px 0;
  }

  .banner-inner {
    padding: 32px 24px;
  }

  .banner-title {
    font-size: 1.5rem;
  }
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  border-bottom: 1px solid rgba(@sauna-wood, 0.15);
  gap: 24px;
}

@media (max-width: 768px) {
  .filter-section {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
}

.category-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scrollbar-width: none;
}

.category-tabs::-webkit-scrollbar {
  display: none;
}

.tab-button {
  padding: 10px 20px;
  font-size: 0.875rem;
  font-weight: 500;
  color: @sauna-wood;
  background: transparent;
  border: 1px solid @sauna-wood;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-button:hover {
  background: rgba(@sauna-wood, 0.1);
}

.tab-button.tab-active {
  background: @sauna-wood;
  color: @white;
}

.search-wrapper {
  position: relative;
  width: 240px;
}

@media (max-width: 768px) {
  .search-wrapper {
    width: 100%;
  }
}

.search-input {
  width: 100%;
  padding: 10px 40px 10px 16px;
  font-size: 0.875rem;
  color: @sauna-dark;
  background: @white;
  border: 1px solid rgba(@sauna-wood, 0.3);
  border-radius: 20px;
  outline: none;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  border-color: @sauna-wood;
}

.search-input::placeholder {
  color: @light-text;
}

.search-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: @sauna-wood;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  padding: 32px 0 80px;
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 24px;
    padding: 24px 0 60px;
  }
}

.loading-state,
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 60px 0;
}

.loading-text,
.empty-text {
  font-size: 1rem;
  color: @light-text;
}

.article-card {
  background: @white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(@sauna-wood, 0.1);
  transition: all 0.3s ease;
}

.article-card:hover {
  border-color: @sauna-wood;
  box-shadow: 0 8px 24px rgba(@sauna-dark, 0.1);
}

.card-image {
  width: 100%;
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: rgba(@sauna-wood, 0.03);
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.article-card:hover .card-image img {
  transform: scale(1.02);
}

.card-content {
  padding: 24px;
}

.card-category {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 10px;
  letter-spacing: 0.02em;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: @sauna-dark;
  margin: 0 0 10px;
  line-height: 1.3;
}

@media (max-width: 768px) {
  .card-title {
    font-size: 1.1rem;
  }
}

.card-title-link {
  color: inherit;
  text-decoration: none;
}

.card-title-link:hover {
  color: @sauna-wood;
}

.card-date {
  display: block;
  font-size: 0.875rem;
  color: @light-text;
  margin-bottom: 12px;
}

.card-abstract {
  font-size: 0.9rem;
  color: @light-text;
  line-height: 1.6;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag-item {
  font-size: 0.75rem;
  color: @sauna-wood;
  background: rgba(@sauna-wood, 0.08);
  padding: 4px 10px;
  border-radius: 4px;
}
</style>