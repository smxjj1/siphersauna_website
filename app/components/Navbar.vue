<template>
  <header class="navbar-wrapper">
    <div v-if="contactLinks.length || socialLinks.length" class="top-info-bar">
      <div class="top-info-inner">
        <div v-if="contactLinks.length" class="contact-info">
          <a
            v-for="link in contactLinks"
            :key="`${link.iconKey}-${link.url}`"
            :href="link.url"
            class="info-item"
            :aria-label="getContactLinkAriaLabel(link)"
          >
            <SocialIcon
              :icon-key="link.iconKey"
              :icon-source="link.iconSource"
              :icon-url="link.iconUrl"
              variant="contact"
            />
            <span class="info-text" aria-hidden="true">{{ getLinkDisplayText(link) }}</span>
          </a>
        </div>
        <div class="right-cluster">
          <LanguageSwitcher />
          <div v-if="socialLinks.length" class="social-links">
            <a v-for="link in socialLinks" :key="`${link.iconKey}-${link.url}`" :href="link.url" class="social-link"
              :aria-label="getLinkAriaLabel(link)" :target="link.openInNewTab ? '_blank' : undefined"
              :rel="link.openInNewTab ? 'noopener noreferrer' : undefined">
              <SocialIcon :icon-key="link.iconKey" :icon-source="link.iconSource" :icon-url="link.iconUrl"
                variant="social" />
            </a>
          </div>
        </div>
      </div>
    </div>

    <nav class="navbar" :class="navbarClass">
      <div class="navbar-inner">
        <NuxtLink :to="localePath('/')" class="logo" @click="closeMenu">
          <img src="/images/logo/logo.png" alt="Sipher Sauna" class="logo-img" width="48" height="48">
          <span class="logo-text">Sipher Sauna</span>
        </NuxtLink>

        <nav class="nav-links" :class="{ 'nav-open': isMenuOpen }">
          <NuxtLink :to="localePath('/')" class="nav-link" @click="closeMenu">{{ tm('nav.home') }}</NuxtLink>
          <NuxtLink :to="localePath('/products')" class="nav-link" @click="closeMenu">{{ tm('nav.products') }}</NuxtLink>
          <NuxtLink :to="localePath('/about-us')" class="nav-link" @click="closeMenu">{{ tm('nav.aboutUs') }}</NuxtLink>
          <NuxtLink :to="localePath('/blog')" class="nav-link" @click="closeMenu">{{ tm('nav.blog') }}</NuxtLink>
          <NuxtLink :to="localePath('/news')" class="nav-link" @click="closeMenu">{{ tm('nav.news') }}</NuxtLink>
          <NuxtLink :to="localePath('/contact')" class="nav-link nav-link--contact" @click="closeMenu">{{ tm('nav.contact') }}</NuxtLink>
        </nav>

        <button
          type="button"
          class="menu-toggle"
          :aria-expanded="isMenuOpen"
          aria-label="Toggle menu"
          @click="toggleMenu"
        >
          <span class="menu-icon" :class="{ 'menu-icon-open': isMenuOpen }" />
        </button>
      </div>
    </nav>

    <div
      v-if="isMenuOpen"
      class="mobile-nav-backdrop"
      aria-hidden="true"
      @click="closeMenu"
    />
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const emit = defineEmits(['scroll-state'])
const { contactLinks, socialLinks, getLinkDisplayText, getLinkAriaLabel, getContactLinkAriaLabel } = useContactLinks()

const isScrolled = ref(false)
const isMenuOpen = ref(false)
const route = useRoute()
const { tm, localePath } = useI18nHelpers()

const strippedPath = computed(() => route.path.replace(/^\/(zh-CN|zh-TW)/, '') || '/')
const isHomePage = computed(() => strippedPath.value === '/')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  emit('scroll-state', { isScrolled: isScrolled.value })
}

const navbarClass = computed(() => {
  const classes = {}
  if (!isHomePage.value || isScrolled.value || isMenuOpen.value) {
    classes['navbar--scrolled'] = true
  }
  if (isMenuOpen.value) {
    classes['navbar--menu-open'] = true
  }
  return classes
})

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(() => route.path, closeMenu)

watch(isMenuOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  emit('scroll-state', { isScrolled: isScrolled.value })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style lang="less" scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
}

.top-info-bar {
  width: 100%;
  min-height: 36px;
  box-sizing: border-box;
  background: #1A1510;
  color: rgba(255, 255, 255, 0.85);
  font-size: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.top-info-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 4px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  .contact-info {
    display: flex;
    align-items: center;
    gap: 24px;
    min-width: 0;
  }

  .right-cluster {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-shrink: 0;
  }

  .info-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    transition: color 0.3s ease;
    min-width: 0;

    svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
    }

    .info-text {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &:hover {
      color: @white;
    }
  }

  .social-links {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .social-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    transition: all 0.3s ease;

    svg {
      width: 14px;
      height: 14px;
    }

    .social-icon-img {
      height: 14px;
      width: auto;
      display: block;
      object-fit: contain;
    }

    :deep(.brand-icon--wide) {
      width: calc(14px * 1.4);
      height: 14px;
    }

    &:hover {
      color: @white;
      transform: translateY(-1px);
    }
  }
}

.navbar {
  width: 100%;
  max-width: 1200px;
  margin: 12px auto 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    padding: 8px 40px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.15);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  min-width: 0;

  .logo-img {
    height: 36px;
    width: auto;
    display: block;
  }

  .logo-text {
    font-size: 22px;
    font-weight: 700;
    color: @white;
    letter-spacing: 1px;
  }
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;

  .nav-link {
    font-weight: 500;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.9);
    padding: 8px 16px;
    border-radius: 20px;
    white-space: nowrap;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: @white;
      background: rgba(255, 255, 255, 0.15);
    }
  }
}

.menu-toggle {
  display: none;
}

.mobile-nav-backdrop {
  display: none;
}

.navbar--scrolled {
  background: #2D2016;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  max-width: 100%;
  margin-top: 0;

  .navbar-inner {
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 0;
    padding: 6px 40px;
    background: transparent;
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    border: none;
    box-shadow: none;
  }
}

@media (max-width: 1200px) {
  .navbar {
    .navbar-inner {
      gap: 24px;
      padding: 14px 28px;
    }

    .nav-links .nav-link {
      padding: 6px 12px;
      font-size: 13px;
    }
  }
}

@media (max-width: 992px) {
  .top-info-inner {
    padding: 4px 16px;
  }

  .navbar {
    margin-top: 0;
    max-width: 100%;

    .navbar-inner {
      gap: 12px;
      padding: 10px 16px;
      border-radius: 0;
    }

    .logo .logo-img {
      height: 28px;
    }

    .logo .logo-text {
      font-size: 18px;
    }
  }

  .menu-toggle {
    display: block;
    background: none;
    border: none;
    width: 30px;
    height: 24px;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
    margin-left: auto;
  }

  .menu-icon {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 2px;
    background: @white;
    transition: all 0.25s ease;
    transform: translateY(-50%);

    &::before,
    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 2px;
      background: @white;
      transition: all 0.25s ease;
    }

    &::before {
      top: -8px;
    }

    &::after {
      bottom: -8px;
    }

    &.menu-icon-open {
      background: transparent;

      &::before {
        top: 0;
        transform: rotate(45deg);
      }

      &::after {
        bottom: 0;
        transform: rotate(-45deg);
      }
    }
  }

  .nav-links {
    position: fixed;
    top: calc(36px + 52px);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 0;
    padding: 8px 0 16px;
    background: #2D2016;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
    transform: translateY(-8px);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
    z-index: 9998;
    max-height: calc(100vh - 88px);
    overflow-y: auto;

    &.nav-open {
      transform: translateY(0);
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
    }

    .nav-link {
      display: block;
      padding: 14px 20px;
      border-radius: 0;
      font-size: 16px;
      color: rgba(255, 255, 255, 0.92);
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);

      &:hover {
        background: rgba(255, 255, 255, 0.08);
      }

      &.router-link-active {
        color: @sauna-wood-light;
        background: rgba(139, 90, 43, 0.15);
      }
    }

    .nav-link--contact {
      margin: 12px 16px 0;
      border: none;
      border-radius: 8px;
      text-align: center;
      background: @sauna-wood;
      color: @white;

      &:hover {
        background: lighten(@sauna-wood, 6%);
      }
    }
  }

  .mobile-nav-backdrop {
    display: block;
    position: fixed;
    inset: 0;
    top: calc(36px + 52px);
    background: rgba(0, 0, 0, 0.35);
    z-index: 9997;
  }
}

@media (max-width: 768px) {
  .top-info-bar {
    .top-info-inner {
      padding: 6px 12px;
      font-size: 12px;

      .contact-info {
        gap: 10px;
      }

      .social-links {
        gap: 6px;

        .social-link {
          width: 20px;
          height: 20px;

          svg {
            width: 12px;
            height: 12px;
          }
        }
      }
    }
  }

  .navbar {
    padding: 0;

    .navbar-inner {
      padding: 10px 12px;
    }
  }
}

@media (max-width: 480px) {
  .top-info-bar {
    .top-info-inner {
      padding: 4px 10px;
      flex-wrap: nowrap;

      .contact-info {
        gap: 8px;

        .info-item {
          min-width: 44px;
          min-height: 44px;
          padding: 8px;
          justify-content: center;

          .info-text {
            display: none;
          }
        }
      }

      .social-links {
        display: none;
      }
    }
  }

  .navbar {
    .navbar-inner {
      padding: 8px 10px;
    }

    .logo .logo-img {
      height: 24px;
    }

    .logo .logo-text {
      font-size: 15px;
    }
  }
}
</style>
