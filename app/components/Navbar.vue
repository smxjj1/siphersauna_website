<template>
  <header class="navbar" :class="navbarClass">
    <div class="navbar-inner">
      <NuxtLink to="/" class="logo">
        <img src="/images/logo/logo.png" alt="Sipher Sauna" class="logo-img">
        <span class="logo-text">Sipher Sauna</span>
      </NuxtLink>
      <nav class="nav-links">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/products" class="nav-link">Products</NuxtLink>
        <NuxtLink to="/sauna-rooms" class="nav-link">Sauna Rooms</NuxtLink>
        <NuxtLink to="/accessories" class="nav-link">Accessories</NuxtLink>
        <NuxtLink to="/about-us" class="nav-link">About Us</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
      </nav>
      <div class="nav-icons">
        <button class="icon-btn" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </button>
        <button class="icon-btn" aria-label="Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
          </svg>
        </button>
        <button class="icon-btn" aria-label="Login">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const isScrolled = ref(false)

// 响应式检测当前路由
const route = useRoute()
const isHomePage = computed(() => route.path === '/')

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
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
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="less" scoped>
.navbar {
  position: fixed;
  z-index: 9999;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  .navbar-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 40px;
    max-width: 1200px;
    margin: 0 auto;
    padding: 16px 40px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.15);
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  top: 20px;
  padding: 0 5%;
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

.nav-icons {
  display: flex;
  align-items: center;
  gap: 8px;

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    svg {
      width: 18px;
      height: 18px;
      color: @white;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
    }
  }
}

// 滚动状态 - 背景贴边，内容居中靠拢
.navbar--scrolled {
  top: 0;
  padding: 0;
  background: #2D2016; // 不透明的深色背景
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

  .navbar-inner {
    max-width: 1200px;
    margin: 0 auto;
    border-radius: 0;
    padding: 12px 40px;
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

    .nav-icons .icon-btn {
      width: 36px;
      height: 36px;

      svg {
        width: 16px;
        height: 16px;
      }
    }
  }
}

@media (max-width: 768px) {
  .navbar {
    top: 15px;
    padding: 0 4%;

    .navbar-inner {
      padding: 10px 16px;
      gap: 10px;
    }

    .nav-links {
      display: none;
    }

    .nav-icons {
      gap: 4px;

      .icon-btn {
        width: 36px;
        height: 36px;
      }
    }
  }
}

@media (max-width: 480px) {
  .navbar {
    top: 10px;

    .navbar-inner {
      padding: 8px 12px;
    }

    .logo .logo-img {
      height: 24px;
    }
  }
}
</style>