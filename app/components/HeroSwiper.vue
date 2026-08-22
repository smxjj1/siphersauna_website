<template>
  <section class="hero-swiper">
    <div class="swiper hero-swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(slide, index) in HERO_SLIDES"
          :key="slide.file"
          class="swiper-slide"
        >
          <OptimImg
            v-if="shouldLoadSlideImage(index)"
            :src="slide.src"
            :alt="slide.alt"
            class="slide-image"
            width="1899"
            height="828"
            :loading="index === 0 ? 'eager' : 'lazy'"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
          />
        </div>
      </div>
      <div class="swiper-pagination" />
      <div class="swiper-button-prev" />
      <div class="swiper-button-next" />
    </div>
  </section>
</template>

<script setup lang="ts">
import Swiper from 'swiper'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { onMounted, ref } from 'vue'
import { useAnalytics } from '~/composables/useAnalytics'

const { sendTrackEvent } = useAnalytics()
const currentIndex = ref(0)
const preloadAdjacentSlides = ref(false)

function shouldLoadSlideImage(index: number) {
  if (!preloadAdjacentSlides.value)
    return index === currentIndex.value

  const total = HERO_SLIDES.length
  if (total <= 1)
    return index === 0

  const prev = (currentIndex.value - 1 + total) % total
  const next = (currentIndex.value + 1) % total
  return index === currentIndex.value || index === prev || index === next
}

const HERO_SLIDES = [
  { file: 'LUXURY-SAUNA-SOLUTIONS.webp', alt: 'Luxury Sauna Solutions' },
  { file: 'SAUNA-WAY.webp', alt: 'Sauna Way' },
  { file: 'ULTIMATE-SAUNA-LIFESTYLE.webp', alt: 'Ultimate Sauna Lifestyle' },
].map(slide => ({
  ...slide,
  src: `/images/home/hero/${slide.file}?v=1899`,
}))

const SLIDE_META = [
  { key: 'luxury-sauna-solutions', title: 'Luxury Sauna Solutions' },
  { key: 'sauna-way', title: 'Sauna Way' },
  { key: 'ultimate-sauna-lifestyle', title: 'Ultimate Sauna Lifestyle' },
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
  const enableAdjacent = () => {
    preloadAdjacentSlides.value = true
  }
  if ('requestIdleCallback' in window)
    requestIdleCallback(enableAdjacent, { timeout: 4000 })
  else
    setTimeout(enableAdjacent, 2500)

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
        currentIndex.value = sw.realIndex
        trackBannerSlide(sw.realIndex)
      },
      slideChangeTransitionEnd(sw) {
        currentIndex.value = sw.realIndex
        trackBannerSlide(sw.realIndex)
      },
    },
  })
})
</script>

<style lang="less" scoped>
.hero-swiper {
  /* 按原图比例限制高度，避免 100vh 全屏拉伸导致发糊 */
  width: 100%;
  position: relative;
  height: min(64vh, 680px, calc(100vw * 828 / 1899));
  background: @sauna-dark;
  overflow: hidden;

  .hero-swiper-container {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: @sauna-dark;

    :deep(.slide-image),
    :deep(.optim-img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
    }
  }

  .swiper-pagination {
    position: absolute;
    bottom: 28px;
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

  :deep(.swiper-navigation-icon) {
    display: none;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 52px;
    height: 52px;
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
    left: 28px;

    &::before {
      transform: translate(-55%, -50%) rotate(-135deg);
    }
  }

  :deep(.swiper-button-next) {
    right: 28px;

    &::before {
      transform: translate(-45%, -50%) rotate(45deg);
    }
  }
}

@media (max-width: 992px) {
  .hero-swiper {
    height: min(52vh, 480px, calc(100vw * 828 / 1899));

    .swiper-pagination {
      bottom: 20px;
    }

    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
      width: 42px;
      height: 42px;
    }

    :deep(.swiper-button-prev) {
      left: 12px;
    }

    :deep(.swiper-button-next) {
      right: 12px;
    }
  }
}

@media (max-width: 768px) {
  .hero-swiper {
    height: calc(100vw * 828 / 1899);

    .swiper-pagination {
      bottom: 14px;

      :deep(.swiper-pagination-bullet) {
        width: 22px;
        margin: 0 5px;
      }
    }

    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
      display: none;
    }
  }
}
</style>
