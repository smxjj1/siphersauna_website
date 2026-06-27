<template>
  <header class="navbar-wrapper">
    <!-- Top Info Bar -->
    <div v-if="contactLinks.length || socialLinks.length" class="top-info-bar">
      <div class="top-info-inner">
        <div v-if="contactLinks.length" class="contact-info">
          <a
            v-for="link in contactLinks"
            :key="`${link.iconKey}-${link.url}`"
            :href="link.url"
            class="info-item"
          >
            <SocialIcon
              :icon-key="link.iconKey"
              :icon-source="link.iconSource"
              :icon-url="link.iconUrl"
              variant="contact"
            />
            <span>{{ getLinkDisplayText(link) }}</span>
          </a>
        </div>
        <div v-if="socialLinks.length" class="social-links">
          <a
            v-for="link in socialLinks"
            :key="`${link.iconKey}-${link.url}`"
            :href="link.url"
            class="social-link"
            :aria-label="getLinkAriaLabel(link)"
            :target="link.openInNewTab ? '_blank' : undefined"
            :rel="link.openInNewTab ? 'noopener noreferrer' : undefined"
          >
            <SocialIcon
              :icon-key="link.iconKey"
              :icon-source="link.iconSource"
              :icon-url="link.iconUrl"
              variant="social"
            />
          </a>
        </div>
      </div>
    </div>
    <!-- Main Navbar -->
    <nav class="navbar" :class="navbarClass">
    <div class="navbar-inner">
      <NuxtLink to="/" class="logo">
        <img src="/images/logo/logo.png" alt="Sipher Sauna" class="logo-img">
        <span class="logo-text">Sipher Sauna</span>
      </NuxtLink>
      <nav class="nav-links">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
        <NuxtLink to="/about-us" class="nav-link">About Us</NuxtLink>
        <NuxtLink to="/news" class="nav-link">News</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
      </nav>
    </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const emit = defineEmits(['scroll-state'])
const { contactLinks, socialLinks, getLinkDisplayText, getLinkAriaLabel } = useContactLinks()

const isScrolled = ref(false)

// 响应式检测当前路由
const route = useRoute()
const isHomePage = computed(() => route.path === '/')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  emit('scroll-state', { isScrolled: isScrolled.value })
}

// 非首页始终贴边，首页滚动后贴边
const navbarClass = computed(() => {
  if (!isHomePage.value || isScrolled.value) {
    return { 'navbar--scrolled': true }
  }
  return {}
})

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  // 初始化时触发一次
  emit('scroll-state', { isScrolled: isScrolled.value })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
  }

  .info-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    transition: color 0.3s ease;

    svg {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
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
  margin: 12px auto 0; // 未滚动时距离 top-info-bar 12px
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

// 滚动状态 - 隐藏顶部信息栏，背景贴边，内容居中靠拢
.navbar--scrolled {
  background: #2D2016; // 不透明的深色背景
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  max-width: 100%;
  margin-top: 0; // 滚动后贴边

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

// 响应式适配
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
  .navbar {
    .navbar-inner {
      gap: 16px;
      padding: 12px 20px;
    }

    .logo .logo-img {
      height: 28px;
    }

    .nav-links {
      gap: 4px;

      .nav-link {
        font-size: 12px;
        padding: 6px 10px;
      }
    }
  }
}

@media (max-width: 768px) {
  .top-info-bar {
    .top-info-inner {
      padding: 6px 16px;
      font-size: 12px;

      .contact-info {
        gap: 12px;
      }

      .social-links {
        gap: 8px;

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
    padding: 10px 4%;

    .navbar-inner {
      padding: 10px 16px;
      gap: 10px;
    }

    .nav-links {
      display: none;
    }
  }
}

@media (max-width: 480px) {
  .top-info-bar {
    .top-info-inner {
      padding: 4px 12px;
      flex-wrap: wrap;
      gap: 8px;

      .contact-info {
        gap: 8px;

        .info-item {
          font-size: 11px;
          gap: 4px;

          svg {
            width: 12px;
            height: 12px;
          }
        }
      }

      .social-links {
        gap: 6px;
      }
    }
  }

  .navbar {
    padding: 8px 3%;

    .navbar-inner {
      padding: 8px 12px;
    }

    .logo .logo-img {
      height: 24px;
    }
  }
}
</style>