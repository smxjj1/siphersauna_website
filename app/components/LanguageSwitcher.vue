<template>
  <div class="lang-switcher" :class="{ 'is-open': open }">
    <button
      type="button"
      class="lang-switcher__toggle"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <span class="lang-switcher__current">{{ currentLocaleLabel }}</span>
      <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true">
        <path d="M2 4 L6 8 L10 4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
    <ul v-if="open" class="lang-switcher__menu" role="menu">
      <li v-for="loc in SUPPORTED_LOCALES" :key="loc" role="none">
        <button
          type="button"
          role="menuitem"
          class="lang-switcher__option"
          :class="{ 'is-active': loc === currentLocale.value }"
          @click="select(loc)"
        >
          {{ LOCALE_LABELS[loc] }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { SUPPORTED_LOCALES, LOCALE_LABELS } from '~/i18n/config'

const open = ref(false)
const route = useRoute()
const router = useRouter()
const currentLocale = useLocale()
const { tm } = useI18nHelpers()

const currentLocaleLabel = computed(() => {
  return LOCALE_LABELS[currentLocale.value] || 'English'
})

const strippedPath = computed(() => {
  return route.path.replace(/^\/(zh-CN|zh-TW)/, '') || '/'
})

function select(loc) {
  open.value = false
  currentLocale.value = loc
  if (import.meta.client) {
    try {
      localStorage.setItem('sipher-locale', loc)
    } catch {
      /* ignore */
    }
  }
  const target = loc === 'en' ? strippedPath.value : `/${loc}${strippedPath.value}`
  router.push(target)
}

function handleOutside(event) {
  if (!open.value) return
  const root = event.target?.closest?.('.lang-switcher')
  if (!root) open.value = false
}

onMounted(() => {
  document.addEventListener('click', handleOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutside)
})
</script>

<style lang="less" scoped>
.lang-switcher {
  position: relative;
  display: inline-block;
  font-size: 13px;

  &__toggle {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-height: 44px;
    min-width: 44px;
    padding: 8px 14px;
    background: transparent;
    border: none;
    border-radius: 20px;
    color: rgba(255, 255, 255, 0.9);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    svg {
      transition: transform 0.2s ease;
    }
  }

  &.is-open &__toggle svg {
    transform: rotate(180deg);
  }

  &__current {
    font-weight: 500;
    letter-spacing: 0.3px;
  }

  &__menu {
    position: absolute;
    top: calc(100% + 6px);
    right: 0;
    margin: 0;
    padding: 6px 0;
    list-style: none;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
    min-width: 140px;
    z-index: 50;
  }

  &__option {
    display: block;
    width: 100%;
    padding: 8px 16px;
    border: none;
    background: transparent;
    text-align: left;
    font-size: 13px;
    color: #2d2016;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(139, 90, 43, 0.08);
    }

    &.is-active {
      color: #8b5a2b;
      font-weight: 600;
      background: rgba(139, 90, 43, 0.06);
    }
  }
}
</style>