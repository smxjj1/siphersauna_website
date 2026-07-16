<template>
  <div class="layout-wrapper" :class="layoutClass">
    <Navbar @scroll-state="handleScrollState" />
    <main id="main-content" class="page-content">
      <NuxtPage />
    </main>
    <InquiryListFab contact-path="/contact" />
  </div>
</template>

<script setup>
const route = useRoute()
const currentLocale = useLocale()

const strippedPath = computed(() => route.path.replace(/^\/(zh-CN|zh-TW)/, '') || '/')
const isHomePage = computed(() => strippedPath.value === '/')

const scrollState = ref({
  isScrolled: false
})

const handleScrollState = (state) => {
  scrollState.value = state
}

const layoutClass = computed(() => {
  if (isHomePage.value && !scrollState.value.isScrolled) {
    return { 'home-initial': true }
  }
  return { 'not-home': true }
})
</script>

<style lang="less">
.layout-wrapper {
  /* 顶栏 36 + 导航约 52–64，统一预留，避免 fixed 导航遮挡轮播 */
  padding-top: 96px;
}

.layout-wrapper.home-initial,
.layout-wrapper.not-home {
  padding-top: 96px;
}

@media (max-width: 992px) {
  .layout-wrapper,
  .layout-wrapper.home-initial,
  .layout-wrapper.not-home {
    padding-top: 88px;
  }
}

@media (max-width: 768px) {
  .layout-wrapper,
  .layout-wrapper.home-initial,
  .layout-wrapper.not-home {
    padding-top: 88px;
  }
}
</style>