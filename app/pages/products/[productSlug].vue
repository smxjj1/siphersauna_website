<template>
  <div>
    <ProductDetailPage
      v-if="product"
      :product="product"
    />
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import {
  buildProductPath,
  buildProductSlug,
  findProductByRouteSlug,
} from '~/utils/productSlug'

definePageMeta({
  layout: 'default',
})

const route = useRoute()
const config = useRuntimeConfig()
const { tm, localePath, locale } = useI18nHelpers()

const productSlug = computed(() => String(route.params.productSlug || ''))
const { products, pending } = useProductCatalog()

const product = computed(() => {
  if (pending.value)
    return null
  return findProductByRouteSlug(
    products.value as Array<{
      itemNo?: string
      name?: string
      categorySlug?: string
      [key: string]: unknown
    }>,
    productSlug.value,
  )
})

watch([pending, product, productSlug], async () => {
  if (pending.value)
    return

  if (!product.value) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }

  const canonicalSlug = buildProductSlug(
    String(product.value.itemNo || ''),
    String(product.value.name || ''),
  )
  if (canonicalSlug && productSlug.value.toLowerCase() !== canonicalSlug) {
    const path = buildProductPath(
      String(product.value.itemNo || ''),
      String(product.value.name || ''),
    )
    await navigateTo(localePath(path), { redirectCode: 301, replace: true })
  }
}, { immediate: true })

const seoTitle = computed(() => {
  if (!product.value)
    return tm('products.title')
  return `${product.value.name} (${product.value.itemNo})`
})

const seoDescription = computed(() => {
  if (!product.value)
    return ''
  const desc = String(product.value.description || '').trim()
  if (desc)
    return desc.slice(0, 160)
  const bits = [
    product.value.name,
    product.value.itemNo,
    product.value.material,
    product.value.category,
  ].filter(Boolean)
  return bits.join(' · ').slice(0, 160)
})

const canonicalPath = computed(() => {
  if (!product.value)
    return route.path
  return localePath(buildProductPath(
    String(product.value.itemNo || ''),
    String(product.value.name || ''),
  ))
})

useHead(() => {
  if (!product.value)
    return { htmlAttrs: { lang: locale } }

  const siteName = 'Sipher Sauna'
  const siteUrl = String(config.public.siteUrl || 'https://siphersauna.com').replace(/\/$/, '')
  const fullTitle = `${seoTitle.value} | ${siteName}`
  const canonicalUrl = `${siteUrl}${canonicalPath.value}`
  const images = ([
    product.value.mainImage,
    ...((product.value.gallery || product.value.images || []) as string[]),
  ].filter(Boolean) as string[])

  return {
    title: fullTitle,
    htmlAttrs: { lang: locale },
    meta: [
      { name: 'description', content: seoDescription.value },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: seoDescription.value },
      { property: 'og:type', content: 'product' },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:site_name', content: siteName },
      ...(images[0] ? [{ property: 'og:image', content: images[0] }] : []),
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: seoDescription.value },
    ],
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: product.value.name,
          sku: product.value.itemNo,
          mpn: product.value.itemNo,
          description: seoDescription.value,
          image: images,
          url: canonicalUrl,
          brand: {
            '@type': 'Brand',
            name: siteName,
          },
          category: product.value.category || 'Sauna',
        }),
      },
    ],
  }
})
</script>
