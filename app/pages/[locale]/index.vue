<template>
  <div class="home-page">
    <HeroSwiper />
    <Banner2 />
    <Banner3 />
    <Banner4 />
    <Banner5 />
    <Banner6 />
    <Banner7 />
    <Banner8 />
    <Banner9 />
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