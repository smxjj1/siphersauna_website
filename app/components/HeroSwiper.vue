<template>
  <section class="hero-swiper">
    <div class="swiper hero-swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="/images/home/hero/LUXURY-SAUNA-SOLUTIONS.png" alt="" class="slide-image" />
        </div>
        <div class="swiper-slide">
          <img src="/images/home/hero/SAUNA-WAY.png" alt="" class="slide-image" />
        </div>
        <div class="swiper-slide">
          <img src="/images/home/hero/ULTIMATE-SAUNA-LIFESTYLE.png" alt="" class="slide-image" />
        </div>
        <div class="swiper-slide">
          <img src="/images/home/hero/WELLNESS.png" alt="" class="slide-image" />
        </div>
        <div class="swiper-slide">
          <img src="/images/home/hero/Tailored-Luxury.png" alt="" class="slide-image" />
        </div>
      </div>
      <!-- Pagination -->
      <div class="swiper-pagination"></div>
      <!-- Navigation -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import { onMounted } from 'vue'
import { useAnalytics } from '~/composables/useAnalytics'

const { sendTrackEvent } = useAnalytics()

const SLIDE_META = [
  { key: 'luxury-sauna-solutions', title: 'Luxury Sauna Solutions' },
  { key: 'sauna-way', title: 'Sauna Way' },
  { key: 'ultimate-sauna-lifestyle', title: 'Ultimate Sauna Lifestyle' },
  { key: 'wellness', title: 'Wellness' },
  { key: 'tailored-luxury', title: 'Tailored Luxury' },
]

const bannerSlidesViewed = ref(new Set<number>())

function trackBannerSlide(index: number) {
  if (bannerSlidesViewed.value.has(index))
    return
  bannerSlidesViewed.value.add(index)
  const meta = SLIDE_META[index]
  if (!meta)
    return
  void sendTrackEvent({
    eventType: 'banner_view',
    elementInfo: {
      placement: 'home_hero_swiper',
      slideIndex: index,
      slideKey: meta.key,
      title: meta.title,
    },
  })
}

onMounted(() => {
  new Swiper('.hero-swiper-container', {
    modules: [Navigation, Pagination, Autoplay],
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'slide',
    speed: 800,
    on: {
      init(sw) {
        trackBannerSlide(sw.realIndex)
      },
      slideChangeTransitionEnd(sw) {
        trackBannerSlide(sw.realIndex)
      },
    },
  })
})
</script>

<style lang="less" scoped>
.hero-swiper {
  height: calc(100vh - 36px);
  width: 100%;
  position: relative;

  .hero-swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .slide-image {
      width: 100%;
      height: 100%;
      object-position: center;
    }
  }

  // 分页器样式 - 白色线段
  .swiper-pagination {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;

    :deep(.swiper-pagination-bullet) {
      width: 30px;
      height: 3px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 2px;
      opacity: 1;
      margin: 0 8px;
      cursor: pointer;
      transition: all 0.3s ease;

      &.swiper-pagination-bullet-active {
        background: @white;
        width: 40px;
      }
    }
  }

  // 隐藏默认导航图标
  :deep(.swiper-navigation-icon) {
    display: none;
  }

  // 左右导航按钮样式
  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 60px;
    height: 60px;
    background: transparent;
    border: 2px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);

    &::after {
      display: none;
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      border-top: 2.5px solid rgba(255, 255, 255, 0.9);
      border-right: 2.5px solid rgba(255, 255, 255, 0.9);
      transition: all 0.35s ease;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.8);
      transform: scale(1.08);
    }
  }

  :deep(.swiper-button-prev) {
    left: 50px;

    &::before {
      transform: translate(-55%, -50%) rotate(-135deg);
    }
  }

  :deep(.swiper-button-next) {
    right: 50px;

    &::before {
      transform: translate(-45%, -50%) rotate(45deg);
    }
  }
}

// 响应式适配
@media (max-width: 1440px) {
  .hero-swiper {
    height: auto;

    .slide-image {
      object-fit: contain;
    }

    .swiper-pagination {
      bottom: 30px;
    }

    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
      width: 45px;
      height: 45px;
    }

    :deep(.swiper-button-prev) {
      left: 20px;
    }

    :deep(.swiper-button-next) {
      right: 20px;
    }
  }
}
</style>