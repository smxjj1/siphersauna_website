<template>
  <div class="layout-wrapper" :class="layoutClass">
    <Navbar @scroll-state="handleScrollState" />
    <div class="page-content">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
const route = useRoute()
const isHomePage = computed(() => route.path === '/')

const scrollState = ref({
  isScrolled: false
})

const handleScrollState = (state) => {
  scrollState.value = state
}

// 首页首屏用 home-initial，其他都用 not-home（服务端判断路由，客户端只需判断滚动状态）
const layoutClass = computed(() => {
  if (isHomePage.value && !scrollState.value.isScrolled) {
    return { 'home-initial': true }
  }
  return { 'not-home': true }
})
</script>

<style lang="less">
.layout-wrapper {
  // 默认：非首页
  padding-top: 84px;
}

// 首页首屏：只有 top-info-bar 高度
.layout-wrapper.home-initial {
  padding-top: 24px;
}

// 非首页/滚动后：navbar-wrapper 高度
.layout-wrapper.not-home {
  padding-top: 80px;
}

// 响应式适配
@media (max-width: 768px) {
  .layout-wrapper {
    padding-top: 50px;
  }

  .layout-wrapper.home-initial {
    padding-top: 20px;
  }

  .layout-wrapper.not-home {
    padding-top: 50px;
  }
}
</style>