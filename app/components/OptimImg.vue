<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  alt?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  decoding?: 'async' | 'sync' | 'auto'
  width?: number | string
  height?: number | string
}>(), {
  alt: '',
  loading: 'lazy',
  fetchpriority: 'auto',
  decoding: 'async',
})

const webpSrc = computed(() => props.src.replace(/\.(png|jpe?g)$/i, '.webp'))
</script>

<template>
  <picture class="optim-img">
    <source :srcset="webpSrc" type="image/webp">
    <img
      :src="src"
      :alt="alt"
      :loading="loading"
      :fetchpriority="fetchpriority"
      :decoding="decoding"
      :width="width"
      :height="height"
    >
  </picture>
</template>

<style scoped>
.optim-img {
  display: block;
  width: 100%;
  height: 100%;
}

.optim-img img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
