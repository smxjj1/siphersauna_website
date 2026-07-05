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
  padding-top: 84px;
}

.layout-wrapper.home-initial {
  padding-top: 36px;
}

.layout-wrapper.not-home {
  padding-top: 80px;
}

@media (max-width: 768px) {
  .layout-wrapper {
    padding-top: 88px;
  }

  .layout-wrapper.home-initial {
    padding-top: 36px;
  }

  .layout-wrapper.not-home {
    padding-top: 88px;
  }
}
</style>