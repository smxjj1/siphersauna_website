<template>
  <header class="navbar-wrapper">
    <!-- Top Info Bar -->
    <div class="top-info-bar">
      <div class="top-info-inner">
        <div class="contact-info">
          <a href="mailto:info@siphersauna.com" class="info-item">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
            <span>info@siphersauna.com</span>
          </a>
          <a href="tel:+8615999977665" class="info-item">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            <span>+86 159-9997-7665</span>
          </a>
        </div>
        <div class="social-links">
          <a href="https://www.instagram.com/siphersauna.terra/" target="_blank" class="social-link" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.207 2.428.418.637.212 1.175.5 1.7.945.524.444.813.982 1.025 1.7.212.637.368 1.363.418 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.207 1.79-.418 2.428-.212.637-.5 1.175-.945 1.7-.444.524-.982.813-1.7 1.025-.637.212-1.363.368-2.428.418-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.207-2.428-.418-.637-.212-1.175-.5-1.7-.945-.524-.444-.813-.982-1.025-1.7-.212-.637-.368-1.363-.418-2.428C2.01 9.056 2 8.717 2 6c0-2.717.01-3.056.06-4.122.05-1.066.207-1.79.418-2.428.212-.637.5-1.175.945-1.7.444-.524.982-.813 1.7-1.025.637-.212 1.363-.368 2.428-.418C5.944 2.01 6.283 2 9 2h3zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/></svg>
          </a>
          <a href="https://www.facebook.com/siphersauna" target="_blank" class="social-link" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
          </a>
          <a href="https://www.xiaohongshu.com/user/profile/6303a7de000000001200fd4d?m_source=pwa" target="_blank" class="social-link" aria-label="Xiaohongshu">
            <span class="social-icon-mask xiaohongshu-icon"></span>
          </a>
          <a href="https://www.threads.com/@siphersauna.terra" target="_blank" class="social-link" aria-label="Threads">
            <svg viewBox="0 0 976.98 1082" fill="currentColor"><path d="M770.347,500.347c-1.355-156.85-86.386-251.367-230.025-251.367-95.872,0-176.499,43.362-218.846,112.472l92.823,64.705c24.053-37.942,57.252-69.448,118.231-69.448,68.77,0,104.341,38.281,114.504,109.423-33.2-5.081-66.399-7.791-100.615-7.791-185.646,0-273.049,84.015-273.049,195.131,0,113.149,87.403,179.548,216.136,179.548,141.267,0,225.621-95.194,260.176-213.086,35.91,16.261,60.64,54.203,60.64,111.116,0,152.447-175.822,235.446-324.881,235.446-219.862,0-363.501-144.316-363.501-379.084,0-287.616,190.05-471.907,445.483-471.907,171.418,0,256.11,75.207,313.701,176.16l94.856-66.399C913.308,94.501,773.396,1,563.358,1,228.653,1,.999,238.478.999,583.008c0,315.057,222.911,497.992,488.507,497.992,219.523,0,441.418-128.055,441.418-347.24,0-114.504-65.721-190.389-160.577-233.413ZM485.441,718.854c-48.444,0-91.129-23.036-91.129-65.383,0-66.738,81.983-87.064,162.271-87.064,30.489,0,60.301,2.032,86.725,7.792-18.971,86.725-75.207,144.655-157.867,144.655Z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/%E7%90%B3-%E7%89%9B-4b2725414/?skipRedirect=true" target="_blank" class="social-link" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zM4 2a2 2 0 110 4 2 2 0 010-4z"/></svg>
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
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
      </nav>
    </div>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const emit = defineEmits(['scroll-state'])

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

    .social-icon-mask {
      display: block;
      height: 14px;
      width: auto;
      background-color: currentColor;
      mask-size: contain;
      mask-repeat: no-repeat;
      mask-position: center;
      -webkit-mask-size: contain;
      -webkit-mask-repeat: no-repeat;
      -webkit-mask-position: center;
    }

    .xiaohongshu-icon {
      mask-image: url('/images/logo/xiaohongshu.ico');
      -webkit-mask-image: url('/images/logo/xiaohongshu.ico');
      mask-mode: luminance;
      -webkit-mask-mode: luminance;
      width: calc(14px * 1.4);
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