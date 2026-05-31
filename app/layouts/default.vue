<template>
  <div>
    <Navbar />
    <NuxtPage />
  </div>
</template>

<style lang="less">
// 确保 Hero 区域避开固定导航栏
.page-content {
  margin-top: 60px;
}
</style>