<template>
  <div v-if="product" class="product-detail-page">
    <nav class="detail-breadcrumb" aria-label="Breadcrumb">
      <NuxtLink :to="productsPath" class="crumb-link">
        {{ tm('products.title') }}
      </NuxtLink>
      <span class="crumb-sep" aria-hidden="true">/</span>
      <span class="crumb-current">{{ product.itemNo }}</span>
    </nav>

    <div class="detail-layout">
      <div class="detail-gallery">
        <div class="gallery-main">
          <img
            v-if="gallery.length"
            :src="gallery[galleryIndex]"
            :alt="product.name"
          >
          <div v-else class="gallery-placeholder">
            <span>{{ product.itemNo.charAt(0) }}</span>
          </div>
        </div>
        <div v-if="gallery.length > 1" class="gallery-thumbs">
          <button
            v-for="(img, i) in gallery"
            :key="i"
            type="button"
            class="thumb"
            :class="{ active: galleryIndex === i }"
            @click="galleryIndex = i"
          >
            <img :src="img" :alt="`${product.name} ${i + 1}`" loading="lazy">
          </button>
        </div>
      </div>

      <div class="detail-info">
        <h1 class="detail-name">{{ product.name }}</h1>
        <p class="detail-item-no">{{ tm('products.itemNo') }}: {{ product.itemNo }}</p>

        <div v-if="product.description" class="detail-desc">
          <h2>{{ tm('products.description') }}</h2>
          <p>{{ product.description }}</p>
        </div>

        <div class="detail-specs">
          <h2>{{ tm('products.specifications') }}</h2>
          <table class="specs-table">
            <tbody>
              <tr v-if="product.material">
                <td>{{ tm('products.woodType') }}</td>
                <td>{{ formatMaterial(product.material) }}</td>
              </tr>
              <tr v-if="product.specs?.ctnSize">
                <td>{{ tm('products.size') }}</td>
                <td>{{ product.specs.ctnSize }}</td>
              </tr>
              <tr v-if="product.specs?.nw">
                <td>{{ tm('products.netWeight') }}</td>
                <td>{{ product.specs.nw }}</td>
              </tr>
              <tr v-if="product.specs?.gw">
                <td>{{ tm('products.grossWeight') }}</td>
                <td>{{ product.specs.gw }}</td>
              </tr>
              <tr v-if="product.specs?.pcs20gp">
                <td>{{ tm('products.pcs20gp') }}</td>
                <td>{{ product.specs.pcs20gp }}</td>
              </tr>
              <tr v-if="product.specs?.pcs40hq">
                <td>{{ tm('products.pcs40hq') }}</td>
                <td>{{ product.specs.pcs40hq }}</td>
              </tr>
              <tr v-if="product.specs?.moq">
                <td>{{ tm('products.moq') }}</td>
                <td>{{ product.specs.moq }}</td>
              </tr>
              <tr v-if="product.specs?.hsCode">
                <td>{{ tm('products.hsCode') }}</td>
                <td>{{ product.specs.hsCode }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="detail-actions">
          <button type="button" class="detail-add-list" @click="handleAddToList">
            {{ tm('products.addToList') }}
          </button>
          <NuxtLink
            :to="{ path: localePath('/contact'), query: { products: product.itemNo } }"
            class="detail-cta"
          >
            {{ tm('products.contactInquiry') }}
          </NuxtLink>
        </div>

        <NuxtLink :to="productsPath" class="back-link">
          ← {{ tm('products.backToProducts') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
export interface ProductDetailSpecs {
  pcsPerCtn?: number | string | null
  nw?: number | string | null
  gw?: number | string | null
  ctnSize?: string | null
  pcs20gp?: number | string | null
  pcs40hq?: number | string | null
  moq?: number | string | null
  hsCode?: string | null
  [key: string]: unknown
}

export interface ProductDetailModel {
  id?: number
  itemNo: string
  name: string
  description?: string
  material?: string
  categorySlug?: string
  category?: string
  mainImage?: string
  gallery?: string[]
  images?: string[]
  specs?: ProductDetailSpecs
}

const props = defineProps<{
  product: ProductDetailModel
}>()

const { tm, localePath } = useI18nHelpers()
const { add, showFeedback } = useInquiryList()

const galleryIndex = ref(0)

const gallery = computed(() => {
  const list = props.product.gallery?.length
    ? props.product.gallery
    : (props.product.images?.length ? props.product.images : [])
  if (list.length)
    return list
  return props.product.mainImage ? [props.product.mainImage] : []
})

const productsPath = computed(() => localePath('/products'))

watch(() => props.product.itemNo, () => {
  galleryIndex.value = 0
})

const formatMaterial = (material: string): string => {
  const woods = material.split('/').filter(w => w.trim())
  if (woods.length === 0)
    return ''
  if (woods.length === 1)
    return woods[0]
  return `${woods.slice(0, 2).join('/')}...`
}

const handleAddToList = () => {
  const result = add({
    itemNo: props.product.itemNo,
    name: props.product.name,
    categorySlug: props.product.categorySlug || '',
    mainImage: props.product.mainImage || gallery.value[0] || '',
  })

  if (result.ok) {
    showFeedback(String(tm('products.addedToList')))
    return
  }
  if (result.reason === 'duplicate') {
    showFeedback(String(tm('products.alreadyInList')))
    return
  }
  if (result.reason === 'limit') {
    showFeedback(String(tm('products.listLimitReached')))
  }
}
</script>

<style lang="less" scoped>
.product-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1.25rem 4rem;
}

.detail-breadcrumb {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  margin-bottom: 1.75rem;
  font-size: 0.9rem;
  color: #6b7280;
}

.crumb-link {
  color: #1f4f46;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}

.crumb-sep {
  opacity: 0.5;
}

.crumb-current {
  color: #111827;
  font-weight: 600;
}

.detail-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}

.detail-gallery {
  position: sticky;
  top: 100px;

  @media (max-width: 768px) {
    position: static;
  }
}

.gallery-main {
  aspect-ratio: 1;
  border-radius: 12px;
  overflow: hidden;
  background: #f3f4f6;
  border: 1px solid #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
  }
}

.gallery-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  font-weight: 700;
  color: #1f4f46;
  opacity: 0.25;
}

.gallery-thumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.thumb {
  width: 64px;
  height: 64px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  background: #fff;

  &.active {
    border-color: #1f4f46;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.detail-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.5rem;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
}

.detail-item-no {
  margin: 0 0 1.25rem;
  color: #6b7280;
  font-size: 0.95rem;
}

.detail-desc,
.detail-specs {
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1rem;
    font-weight: 700;
    margin: 0 0 0.5rem;
    color: #111827;
  }

  p {
    margin: 0;
    line-height: 1.7;
    color: #4b5563;
  }
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  td {
    padding: 0.55rem 0.75rem;
    border-bottom: 1px solid #e5e7eb;
    vertical-align: top;
  }

  td:first-child {
    width: 42%;
    color: #6b7280;
    font-weight: 600;
  }

  td:last-child {
    color: #111827;
  }
}

.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.detail-add-list,
.detail-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.65rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  border: none;
  font-size: 0.95rem;
}

.detail-add-list {
  background: #fff;
  color: #1f4f46;
  border: 1px solid #d1d5db;
}

.detail-cta {
  background: #1f4f46;
  color: #fff;
}

.back-link {
  display: inline-block;
  color: #1f4f46;
  text-decoration: none;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
}
</style>
