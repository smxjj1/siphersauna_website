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

/* 首页：桌面端仅预留顶栏，导航条半透明浮在轮播上（设计如此） */
.layout-wrapper.home-initial {
  padding-top: 36px;
}

.layout-wrapper.not-home {
  padding-top: 80px;
}

@media (max-width: 992px) {
  /* 平板/手机导航变为全宽实底，不能再压在轮播上 */
  .layout-wrapper.home-initial {
    padding-top: 88px;
  }
}

@media (max-width: 768px) {
  .layout-wrapper {
    padding-top: 88px;
  }

  .layout-wrapper.home-initial {
    padding-top: 88px;
  }

  .layout-wrapper.not-home {
    padding-top: 88px;
  }
}
</style>