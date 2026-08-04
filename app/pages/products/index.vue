<template>
  <div class="products-page">
    <section class="products-hero">
      <div class="hero-container">
        <h1 class="hero-title">{{ tm('products.title') }}</h1>
        <p class="hero-subtitle">{{ tm('products.subtitle') }}</p>
        <div class="hero-stats">
          <span class="stat">{{ t('products.productCount', { count: totalProducts }) }}</span>
          <span class="stat">{{ t('products.categoryCount', { count: categories.length }) }}</span>
        </div>
      </div>
    </section>

    <section class="category-filter">
      <div class="filter-container">
        <button
          class="filter-btn"
          :class="{ active: activeCategory === 'all' }"
          @click="activeCategory = 'all'"
        >
          {{ tm('products.allProducts') }}
        </button>
        <button
          v-for="category in categories"
          :key="category.slug"
          class="filter-btn"
          :class="{ active: activeCategory === category.slug }"
          @click="activeCategory = category.slug"
        >
          {{ category.name }}
        </button>
      </div>
    </section>

    <section class="product-grid-section">
      <div class="grid-layout">
        <nav v-if="groupedProducts.length > 1" class="anchor-nav">
          <button
            v-for="(group, index) in groupedProducts"
            :key="group.subcategory"
            class="anchor-link"
            :class="{ active: activeAnchor === index }"
            @click="scrollToAnchor(index)"
          >
            {{ group.subcategory }}
          </button>
        </nav>

        <div class="grid-container">
          <template v-if="filteredProducts.length > 0">
            <div
              v-for="(group, groupIndex) in groupedProducts"
              :key="group.subcategory"
              :id="`anchor-${groupIndex}`"
              class="subcategory-group"
            >
              <div v-if="groupIndex > 0" class="subcategory-separator"></div>
              <div v-if="group.subcategory" class="subcategory-header">
                <h3 class="subcategory-title">{{ group.subcategory }}</h3>
                <span class="subcategory-count">{{ t('products.itemsCount', { count: group.products.length }) }}</span>
              </div>
              <div class="product-grid">
                <NuxtLink
                  v-for="product in group.products"
                  :key="product.id"
                  :to="localePath(buildProductPath(product.itemNo, product.name))"
                  class="product-card"
                >
                  <div class="card-image">
                    <img
                      v-if="product.mainImage"
                      :src="product.mainImage"
                      :alt="product.name"
                      loading="lazy"
                    >
                    <div v-else class="card-placeholder">
                      <span>{{ product.itemNo.charAt(0) }}</span>
                    </div>
                  </div>
                  <div class="card-body">
                    <h3 class="card-name">{{ product.name }}</h3>
                    <div class="card-meta">
                      <span v-if="product.material" class="meta-item">{{ formatMaterial(product.material) }}</span>
                      <span v-if="product.specs.ctnSize" class="meta-item">{{ product.specs.ctnSize }}</span>
                    </div>
                    <p class="card-item-no">{{ product.itemNo }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </template>

          <div v-else class="empty-state">
            <div class="empty-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <h3>{{ tm('products.comingSoonTitle') }}</h3>
            <p>{{ tm('products.comingSoonDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter />

    <Transition name="fade">
      <button
        v-if="showBackToTop"
        class="back-to-top"
        @click="scrollToTop"
        :aria-label="tm('products.backToTop')"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useProductCatalog } from '~/composables/useProducts'
import { useTmObject } from '~/composables/useSiteLocale'
import {
  formatSubcategoryLabel,
  normalizeSubcategoryKey,
  sortSubcategoryKeys,
} from '~/utils/productCategory'
import { buildProductPath } from '~/utils/productSlug'

definePageMeta({
  layout: 'default',
})


// 产品接口定义
interface ProductSpecs {
  pcsPerCtn?: number | null
  nw?: number | null
  gw?: number | null
  ctnSize?: string | null
  length?: number | null
  width?: number | null
  height?: number | null
  pcs20gp?: number | null
  pcs40hq?: number | null
  moq?: number | null
  hsCode?: string | null
  remark?: string | null
  totalCartons?: number | null
  totalCbm?: number | null
  [key: string]: unknown
}

interface Product {
  id: number
  itemNo: string
  name: string
  description: string
  material: string
  capacity: string
  subcategory: string
  category: string
  categorySlug: string
  mainImage: string
  gallery: string[]
  images: string[]
  specs: ProductSpecs
}

const { tm, t, localePath, locale } = useI18nHelpers()

useHead({
  title: computed(() => `${tm('products.title')} | Sipher Sauna`),
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: computed(() => `${tm('products.subtitle')}. ${tm('products.allProducts')}.`) },
  ],
})

const { products: allProducts, categories, totalProducts } = useProductCatalog()

const activeCategory = ref<string>('all')
const activeAnchor = ref(0)
const showBackToTop = ref(false)
let scrollObserver: IntersectionObserver | null = null

const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return allProducts.value
  }
  return allProducts.value.filter((p: Product) => p.categorySlug === activeCategory.value)
})

// 按子分类分组（顺序来自 CMS 白名单）
const groupedProducts = computed(() => {
  const groupMap = new Map<string, Product[]>()

  for (const product of filteredProducts.value) {
    const subcat = normalizeSubcategoryKey(product.subcategory)
    if (!groupMap.has(subcat)) {
      groupMap.set(subcat, [])
    }
    groupMap.get(subcat)!.push(product)
  }

  const activeCategoryMeta = categories.value.find(c => c.slug === activeCategory.value)
  const preferredOrder = activeCategory.value === 'all'
    ? categories.value.flatMap(c => (c as { subcategories?: string[] }).subcategories || [])
    : ((activeCategoryMeta as { subcategories?: string[] } | undefined)?.subcategories || [])

  const orderedKeys = sortSubcategoryKeys([...groupMap.keys()], preferredOrder)

  return orderedKeys.map(subcategory => ({
    subcategory: getSubcategoryDisplay(subcategory),
    products: groupMap.get(subcategory)!,
  }))
})

const getSubcategoryDisplay = (subcategory: string): string => {
  const translated = useTmObject(`products.subcategory.${subcategory}`)
  if (translated !== `products.subcategory.${subcategory}`) return translated
  return formatSubcategoryLabel(subcategory)
}

// 格式化材质
const formatMaterial = (material: string): string => {
  const woods = material.split('/').filter(w => w.trim())
  if (woods.length === 0) return ''
  if (woods.length === 1) return woods[0]
  return woods.slice(0, 2).join('/') + '...'
}

const scrollToAnchor = (index: number) => {
  activeAnchor.value = index
  const element = document.getElementById(`anchor-${index}`)
  if (element) {
    const headerOffset = 80
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleScroll = () => {
  showBackToTop.value = window.pageYOffset > 300
}

const setupScrollObserver = () => {
  if (groupedProducts.value.length <= 1) return
  if (scrollObserver) {
    scrollObserver.disconnect()
  }

  scrollObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries.filter(entry => entry.isIntersecting)
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        const mostVisible = visibleEntries[0]
        const anchorIndex = parseInt(mostVisible.target.id.replace('anchor-', ''))
        if (!isNaN(anchorIndex)) {
          activeAnchor.value = anchorIndex
        }
      }
    },
    { root: null, rootMargin: '-100px 0px -30% 0px', threshold: [0, 0.25, 0.5] },
  )

  groupedProducts.value.forEach((_, index) => {
    const element = document.getElementById(`anchor-${index}`)
    if (element && scrollObserver) {
      scrollObserver.observe(element)
    }
  })
}


onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  nextTick(() => {
    setupScrollObserver()
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (scrollObserver) {
    scrollObserver.disconnect()
  }
})
</script>

<style lang="less" scoped>
@import '~/assets/css/variables.less';

.products-page { background: @sauna-cream; min-height: 100vh; }

.products-hero {
  background: linear-gradient(135deg, @sauna-dark 0%, #4A3728 100%);
  padding: 80px 40px; text-align: center; color: @white; position: relative; overflow: hidden;
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4A77D' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }
  @media (max-width: 768px) { padding: 60px 20px; }
}

.hero-container { max-width: 1200px; margin: 0 auto; }

.hero-title {
  font-size: 3rem; font-weight: 700; color: @white; margin: 0 0 20px; letter-spacing: -0.02em;
  @media (max-width: 768px) { font-size: 2rem; }
}

.hero-subtitle {
  font-size: 1.2rem; color: @sauna-wood-light; margin: 0 0 30px;
  max-width: 600px; margin-left: auto; margin-right: auto; line-height: 1.6;
}

.hero-stats { display: flex; justify-content: center; gap: 20px; }

.stat {
  font-size: 0.9rem; color: @sauna-gold; padding: 8px 20px;
  background: rgba(@sauna-gold, 0.1); border-radius: 2rem; border: 1px solid rgba(@sauna-gold, 0.3);
}

.category-filter {
  padding: 16px 40px; background: @sauna-cream;
  position: sticky; top: 80px; z-index: 100;
  border-bottom: 1px solid rgba(@sauna-gold, 0.15);
  @media (max-width: 768px) { padding: 12px 20px; top: 60px; }
}

.filter-container { max-width: 1200px; margin: 0 auto; display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }

.filter-btn {
  padding: 6px 20px; background: transparent; border: 1px solid @sauna-wood;
  color: @sauna-wood; font-size: 1rem; font-weight: 500;
  cursor: pointer; transition: all 0.3s ease; border-radius: 20px;
  &:hover { background: rgba(@sauna-wood, 0.1); }
  &.active { background: @sauna-wood; color: @white; }
  @media (max-width: 768px) { padding: 10px 20px; font-size: 0.85rem; }
}

.product-grid-section {
  padding: 60px 40px;
  @media (max-width: 768px) { padding: 40px 20px; }
}

.grid-layout {
  max-width: 1200px; margin: 0 auto; display: flex; gap: 40px; position: relative;
}

.anchor-nav {
  position: sticky; top: 150px; flex-shrink: 0; width: 180px;
  display: flex; flex-direction: column; gap: 8px; align-self: flex-start;
  @media (max-width: 992px) { display: none; }
}

.anchor-link {
  display: block; width: 100%; padding: 12px 16px; background: transparent;
  border: none; border-left: 3px solid transparent; text-align: left;
  font-size: 0.85rem; color: @light-text; cursor: pointer;
  transition: all 0.3s ease; border-radius: 0 6px 6px 0; line-height: 1.4;
  &:hover { color: @sauna-wood; background: rgba(@sauna-wood, 0.05); }
  &.active { color: @sauna-wood; border-left-color: @sauna-wood; background: rgba(@sauna-wood, 0.08); font-weight: 600; }
}

.grid-container { flex: 1; min-width: 0; }

.subcategory-group { margin-bottom: 50px; }

.subcategory-separator { height: 1px; background: rgba(@sauna-wood, 0.2); margin: 40px 0; }

.subcategory-header { display: flex; align-items: baseline; gap: 20px; margin-bottom: 30px; }

.subcategory-title { font-size: 1.5rem; font-weight: 600; color: @sauna-dark; margin: 0; }
.subcategory-count { font-size: 0.9rem; color: @light-text; }

.product-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px;
  @media (max-width: 1100px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); gap: 20px; }
  @media (max-width: 480px) { grid-template-columns: 1fr; }
}

.product-card {
  text-decoration: none;
  color: inherit;
  display: block;
  background: @white; border-radius: 12px; overflow: hidden;
  cursor: pointer; transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid rgba(@sauna-wood, 0.1);
  &:hover { transform: translateY(-6px); box-shadow: 0 12px 30px rgba(@sauna-dark, 0.15); }
}

.card-image {
  position: relative; aspect-ratio: 1; background: @sauna-cream;
  img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
  &:hover img { transform: scale(1.05); }
}

.card-placeholder {
  width: 100%; height: 100%; display: flex; align-items: center;
  justify-content: center; background: linear-gradient(135deg, @sauna-wood-light, @sauna-cream);
  span { font-size: 3rem; font-weight: 700; color: @sauna-wood; opacity: 0.3; }
}

.card-body { padding: 20px; }

.card-name {
  font-size: 1rem; font-weight: 600; color: @sauna-dark; margin: 0 0 10px; line-height: 1.4;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
}

.card-meta { display: flex; gap: 8px; margin-bottom: 10px; flex-wrap: wrap; }

.meta-item {
  font-size: 0.75rem; color: @sauna-wood; padding: 4px 10px;
  background: @sauna-cream; border-radius: 4px;
}

.card-item-no { font-size: 0.85rem; color: @light-text; margin: 0; }

.empty-state {
  text-align: center; padding: 80px 40px; background: @white; border-radius: 12px;
  .empty-icon { color: @sauna-wood; margin-bottom: 20px; }
  h3 { font-size: 1.5rem; font-weight: 600; color: @sauna-dark; margin: 0 0 10px; }
  p { color: @light-text; margin: 0; }
}

.back-to-top {
  position: fixed; bottom: 40px; right: 40px; width: 50px; height: 50px;
  background: @sauna-wood; color: @white; border: none; border-radius: 50%;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 15px rgba(@sauna-dark, 0.2); transition: all 0.3s ease; z-index: 900;
  &:hover { transform: translateY(-4px); box-shadow: 0 6px 20px rgba(@sauna-dark, 0.3); }
  @media (max-width: 768px) { bottom: 20px; right: 20px; width: 44px; height: 44px; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }


</style>