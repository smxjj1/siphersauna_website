<template>
  <div class="home-page">
    <HeroSwiper />
    <LazyBanner2 />
    <LazyBanner3 />
    <LazyBanner4 />
    <LazyBanner5 />
    <LazyBanner6 />
    <LazyBanner7 />
    <LazyBanner8 />
    <LazyBanner9 />
    <SiteFooter />
  </div>
</template>

<script setup>
const { tm, locale } = useI18nHelpers()

definePageMeta({
  layout: 'default',
})

useHead({
  title: computed(() => tm('home.seoTitle')),
  htmlAttrs: { lang: locale },
  link: [
    {
      rel: 'preload',
      as: 'image',
      href: '/images/home/hero/LUXURY-SAUNA-SOLUTIONS.webp',
      type: 'image/webp',
      fetchpriority: 'high',
    },
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: computed(() => tm('home.seoDescription')) },
  ],
})
</script>

<style lang="less" scoped>
.home-page {
  overflow-x: hidden;
}
</style>