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

/** Prefer WebP-only delivery to avoid downloading large PNG/JPEG fallbacks. */
const displaySrc = computed(() => props.src.replace(/\.(png|jpe?g)$/i, '.webp'))
</script>

<template>
  <img
    :src="displaySrc"
    :alt="alt"
    :loading="loading"
    :fetchpriority="fetchpriority"
    :decoding="decoding"
    :width="width"
    :height="height"
    class="optim-img"
  >
</template>

<style scoped>
.optim-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
