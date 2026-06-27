<template>
  <component
    :is="tag"
    :class="iconClass"
    :aria-hidden="decorative ? 'true' : undefined"
    :aria-label="decorative ? undefined : ariaLabel"
  >
    <svg
      v-if="iconKey === 'email'"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
    <svg
      v-else-if="iconKey === 'phone' || iconKey === 'whatsapp'"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
    <svg
      v-else-if="iconKey === 'instagram'"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.207 2.428.418.637.212 1.175.5 1.7.945.524.444.813.982 1.025 1.7.212.637.368 1.363.418 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.207 1.79-.418 2.428-.212.637-.5 1.175-.945 1.7-.444.524-.982.813-1.7 1.025-.637.212-1.363.368-2.428.418-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.207-2.428-.418-.637-.212-1.175-.5-1.7-.945-.524-.444-.813-.982-1.025-1.7-.212-.637-.368-1.363-.418-2.428C2.01 9.056 2 8.717 2 6c0-2.717.01-3.056.06-4.122.05-1.066.207-1.79.418-2.428.212-.637.5-1.175.945-1.7.444-.524.982-.813 1.7-1.025.637-.212 1.363-.368 2.428-.418C5.944 2.01 6.283 2 9 2h3zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z" />
    </svg>
    <svg
      v-else-if="iconKey === 'facebook'"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
    <span
      v-else-if="iconKey === 'xiaohongshu'"
      class="social-icon-mask xiaohongshu-icon"
    />
    <svg
      v-else-if="iconKey === 'threads'"
      viewBox="0 0 976.98 1082"
      fill="currentColor"
    >
      <path d="M770.347,500.347c-1.355-156.85-86.386-251.367-230.025-251.367-95.872,0-176.499,43.362-218.846,112.472l92.823,64.705c24.053-37.942,57.252-69.448,118.231-69.448,68.77,0,104.341,38.281,114.504,109.423-33.2-5.081-66.399-7.791-100.615-7.791-185.646,0-273.049,84.015-273.049,195.131,0,113.149,87.403,179.548,216.136,179.548,141.267,0,225.621-95.194,260.176-213.086,35.91,16.261,60.64,54.203,60.64,111.116,0,152.447-175.822,235.446-324.881,235.446-219.862,0-363.501-144.316-363.501-379.084,0-287.616,190.05-471.907,445.483-471.907,171.418,0,256.11,75.207,313.701,176.16l94.856-66.399C913.308,94.501,773.396,1,563.358,1,228.653,1,.999,238.478.999,583.008c0,315.057,222.911,497.992,488.507,497.992,219.523,0,441.418-128.055,441.418-347.24,0-114.504-65.721-190.389-160.577-233.413ZM485.441,718.854c-48.444,0-91.129-23.036-91.129-65.383,0-66.738,81.983-87.064,162.271-87.064,30.489,0,60.301,2.032,86.725,7.792-18.971,86.725-75.207,144.655-157.867,144.655Z" />
    </svg>
    <svg
      v-else-if="iconKey === 'linkedin'"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z" />
    </svg>
    <svg
      v-else-if="iconKey === 'twitter'"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
    </svg>
    <svg
      v-else-if="iconKey === 'youtube'"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 00-1.95 2 2.78 2.78 0 00-.42 1.58v7.5a2.78 2.78 0 00.42 1.58 2.78 2.78 0 001.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.42a2.78 2.78 0 001.95-2 2.78 2.78 0 00.42-1.58v-7.5a2.78 2.78 0 00-.42-1.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
    </svg>
    <svg
      v-else-if="iconKey === 'tiktok'"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z" />
    </svg>
  </component>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  iconKey: string
  ariaLabel?: string
  variant?: 'default' | 'contact' | 'social'
  decorative?: boolean
}>(), {
  variant: 'default',
  decorative: true,
})

const tag = computed(() => 'span')
const iconClass = computed(() => ['social-icon', `social-icon--${props.variant}`])
</script>

<style scoped>
.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.social-icon svg {
  width: 100%;
  height: 100%;
  display: block;
}

.social-icon--contact svg {
  width: 14px;
  height: 14px;
}

.social-icon--social svg,
.social-icon--default svg {
  width: 14px;
  height: 14px;
}

.social-icon-mask {
  display: inline-block;
  background-color: currentColor;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
}

.xiaohongshu-icon {
  width: calc(14px * 1.4);
  height: 14px;
  mask-image: url('/images/logo/xiaohongshu.ico');
  -webkit-mask-image: url('/images/logo/xiaohongshu.ico');
}
</style>
