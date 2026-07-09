<script setup lang="ts">
/**
 * 博客列表页面 — Pillar + Cluster 结构
 *
 * 数据来源：CMS 公开 API，失败时回退 app/data/blog/
 */

defineOptions({
  name: 'BlogListPage',
});

definePageMeta({
  layout: 'default',
});

const { tm, locale, localePath } = useI18nHelpers();
const { fetchBlogList } = useBlog();

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
const { data: blogData, pending: isLoading } = await useAsyncData(
  () => `blog-list-${locale.value}`,
  () => fetchBlogList(locale.value),
  {
    server: true,
    lazy: false,
    watch: [locale],
  },
);

const allArticles = computed(() => blogData.value || []);

const pillarArticles = computed(() =>
  allArticles.value.filter(a => a.category === 'pillar'),
);

const clusterArticles = computed(() =>
  allArticles.value.filter(a => a.category !== 'pillar'),
);

const clusterTabs = computed(() => {
  const order = [
    'saunaSelection',
    'healthWellness',
    'installationDiy',
    'productReviews',
    'commercialSolutions',
    'materialsCraftsmanship',
    'industryInsights',
  ];
  const unique = [...new Set(clusterArticles.value.map(a => a.category).filter(Boolean))];
  const sorted = [
    ...order.filter(k => unique.includes(k)),
    ...unique.filter(k => !order.includes(k)),
  ];
  return ['all', ...sorted];
});

function matchesSearch(article: { title: string; summary: string; tags: string[] }, q: string) {
  return (
    article.title.toLowerCase().includes(q)
    || article.summary.toLowerCase().includes(q)
    || article.tags.some(tag => tag.toLowerCase().includes(q))
  );
}

const filteredPillars = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q)
    return pillarArticles.value;
  return pillarArticles.value.filter(a => matchesSearch(a, q));
});

const showPillarSection = computed(() => filteredPillars.value.length > 0);

const filteredClusters = computed(() => {
  let list = [...clusterArticles.value];

  if (activeCategory.value !== 'all') {
    list = list.filter(a => a.category === activeCategory.value);
  }

  const q = searchQuery.value.trim().toLowerCase();
  if (q) {
    list = list.filter(a => matchesSearch(a, q));
  }

  return list;
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
  const key = `blogPage.categories.${category}`;
  const label = tm(key);
  return label === key ? category : String(label);
};

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    pillar: '#8B5A2B',
    saunaSelection: '#E67020',
    healthWellness: '#059669',
    installationDiy: '#2563EB',
    productReviews: '#7C3AED',
    commercialSolutions: '#DC2626',
    materialsCraftsmanship: '#B45309',
    industryInsights: '#0D9488',
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

      <div v-if="isLoading" class="loading-state">
        <span class="loading-text">{{ tm('blogPage.loading') }}</span>
      </div>

      <template v-else>
        <!-- Pillar Hub -->
        <section v-if="showPillarSection" class="pillar-section" aria-label="Pillar guides">
          <div class="section-header">
            <h2 class="section-title">{{ tm('blogPage.pillarSectionTitle') }}</h2>
            <p class="section-desc">{{ tm('blogPage.pillarSectionDesc') }}</p>
          </div>

          <div class="pillar-grid">
            <article
              v-for="article in filteredPillars"
              :key="article.slug"
              class="pillar-card"
            >
              <div v-if="article.coverImage" class="pillar-card-image">
                <img :src="article.coverImage" :alt="article.title" loading="lazy">
              </div>
              <div class="pillar-card-content">
                <span class="pillar-badge">{{ getCategoryName('pillar') }}</span>
                <h3 class="pillar-card-title">
                  <NuxtLink :to="getArticleUrl(article.slug)" class="card-title-link">
                    {{ article.title }}
                  </NuxtLink>
                </h3>
                <p class="pillar-card-summary">{{ article.summary }}</p>
                <NuxtLink :to="getArticleUrl(article.slug)" class="pillar-cta">
                  {{ tm('blogPage.readPillar') }}
                </NuxtLink>
              </div>
            </article>
          </div>
        </section>

        <!-- Cluster Section -->
        <section class="cluster-section" aria-label="Topic guides">
          <div class="section-header">
            <h2 class="section-title">{{ tm('blogPage.clusterSectionTitle') }}</h2>
          </div>

          <div class="filter-section">
            <nav class="category-tabs" aria-label="Blog category navigation">
              <button
                v-for="category in clusterTabs"
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
          </div>

          <div v-if="filteredClusters.length === 0 && !showPillarSection" class="empty-state">
            <p class="empty-text">{{ tm('blogPage.empty') }}</p>
          </div>
          <div v-else-if="filteredClusters.length === 0" class="empty-state empty-state--inline">
            <p class="empty-text">{{ tm('blogPage.empty') }}</p>
          </div>
          <div v-else class="articles-grid" aria-label="Blog articles list">
            <article
              v-for="article in filteredClusters"
              :key="article.slug"
              class="article-card"
            >
              <div v-if="article.coverImage" class="card-image">
                <img :src="article.coverImage" :alt="article.title" loading="lazy">
              </div>
              <div class="card-content">
                <span class="card-category" :style="{ color: getCategoryColor(article.category) }">
                  {{ getCategoryName(article.category) }}
                </span>

                <h3 class="card-title">
                  <NuxtLink :to="getArticleUrl(article.slug)" class="card-title-link">
                    {{ article.title }}
                  </NuxtLink>
                </h3>

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
          </div>
        </section>
      </template>
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

.section-header {
  margin-bottom: 24px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: @sauna-dark;
  margin: 0 0 8px;
  line-height: 1.3;
}

.section-desc {
  font-size: 0.95rem;
  color: @light-text;
  margin: 0;
  line-height: 1.6;
}

.pillar-section {
  padding: 16px 0 40px;
  border-bottom: 1px solid rgba(@sauna-wood, 0.12);
}

.pillar-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

@media (max-width: 768px) {
  .pillar-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.pillar-card {
  display: flex;
  flex-direction: column;
  background: @white;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(@sauna-wood, 0.18);
  transition: all 0.3s ease;
}

.pillar-card:hover {
  border-color: @sauna-wood;
  box-shadow: 0 10px 28px rgba(@sauna-dark, 0.12);
}

.pillar-card-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: rgba(@sauna-wood, 0.04);
}

.pillar-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.pillar-card:hover .pillar-card-image img {
  transform: scale(1.03);
}

.pillar-card-content {
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.pillar-badge {
  display: inline-block;
  align-self: flex-start;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #8B5A2B;
  background: rgba(139, 90, 43, 0.1);
  padding: 4px 10px;
  border-radius: 4px;
  margin-bottom: 12px;
}

.pillar-card-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: @sauna-dark;
  margin: 0 0 12px;
  line-height: 1.3;
}

.pillar-card-summary {
  font-size: 0.95rem;
  color: @light-text;
  line-height: 1.65;
  margin: 0 0 20px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.pillar-cta {
  display: inline-flex;
  align-self: flex-start;
  font-size: 0.9rem;
  font-weight: 600;
  color: @sauna-wood;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.pillar-cta:hover {
  border-bottom-color: @sauna-wood;
}

.cluster-section {
  padding: 40px 0 80px;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 24px;
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
}

@media (max-width: 768px) {
  .articles-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.loading-state,
.empty-state {
  text-align: center;
  padding: 60px 0;
}

.empty-state--inline {
  padding: 40px 0;
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

  .pillar-card-title {
    font-size: 1.2rem;
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
