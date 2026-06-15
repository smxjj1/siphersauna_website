<template>
  <section class="lifestyle">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">Inspiration</span>
        <h2 class="title">Start Your Home Spa Journey</h2>
        <p class="desc">Create a pure land in the busy city life. Enjoy 5-star relaxation at home.</p>
      </div>
    </div>

    <div class="lifestyle-swiper-wrap">
      <div class="swiper lifestyle-swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <div class="lifestyle-card">
              <div class="lifestyle-image">
                <img src="/images/home/SaunaRooms.png" alt="Sauna Room" loading="lazy" />
              </div>
              <div class="lifestyle-content">
                <span class="tag">Indoor</span>
                <h3>Private Home Sauna</h3>
                <p>Transform any room into your personal wellness retreat</p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lifestyle-card">
              <div class="lifestyle-image">
                <img src="/images/home/OutdoorTraditionalSauna.png" alt="Outdoor Sauna" loading="lazy" />
              </div>
              <div class="lifestyle-content">
                <span class="tag">Outdoor</span>
                <h3>Garden Sanctuary</h3>
                <p>Embrace nature while enjoying the warmth of premium wood</p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lifestyle-card">
              <div class="lifestyle-image">
                <img src="/images/home/SaunaAccessories.png" alt="Aromatherapy" loading="lazy" />
              </div>
              <div class="lifestyle-content">
                <span class="tag">Aromatherapy</span>
                <h3>Sensory Healing</h3>
                <p>Elevate your session with natural essential oil blends</p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lifestyle-card">
              <div class="lifestyle-image">
                <img src="/images/home/SaunaHeaters.png" alt="Wooden Accessories" loading="lazy" />
              </div>
              <div class="lifestyle-content">
                <span class="tag">Accessories</span>
                <h3>The Finishing Touch</h3>
                <p>Handcrafted wooden details that complete the experience</p>
              </div>
            </div>
          </div>
          <div class="swiper-slide">
            <div class="lifestyle-card">
              <div class="lifestyle-image">
                <img src="/images/home/OutdoorWoodfiredHotTub.png" alt="Wellness" loading="lazy" />
              </div>
              <div class="lifestyle-content">
                <span class="tag">Wellness</span>
                <h3>Daily Ritual</h3>
                <p>Make sauna therapy a part of your everyday wellness routine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Navigation -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </section>
</template>

<script setup>
import Swiper from 'swiper'
import { Navigation, Autoplay } from 'swiper/modules'
import { onMounted } from 'vue'

onMounted(() => {
  new Swiper('.lifestyle-swiper-container', {
    modules: [Navigation, Autoplay],
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    loop: true,
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: '.lifestyle .swiper-button-next',
      prevEl: '.lifestyle .swiper-button-prev'
    },
    breakpoints: {
      1200: {
        slidesPerView: 3
      },
      768: {
        slidesPerView: 2
      },
      576: {
        slidesPerView: 1
      }
    }
  })
})
</script>

<style lang="less" scoped>
.lifestyle {
  padding: 120px 0;
  background-color: @sauna-cream;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.subtitle {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: @sauna-wood;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.title {
  font-size: 42px;
  font-weight: 700;
  color: @text-color;
  margin: 0 0 16px;
}

.desc {
  font-size: 17px;
  color: @light-text;
  margin: 0;
}

.lifestyle-swiper-wrap {
  position: relative;
  padding: 0 70px;

  .lifestyle-swiper-container {
    overflow: hidden;
  }
}

.lifestyle-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    .lifestyle-image img {
      transform: scale(1.05);
    }

    .lifestyle-content {
      transform: translateY(-8px);
    }
  }
}

.lifestyle-image {
  overflow: hidden;

  img {
    width: 100%;
    height: 380px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
}

.lifestyle-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: linear-gradient(to top, rgba(45, 32, 22, 0.75) 0%, transparent 100%);
  color: @white;
  transition: transform 0.4s ease;

  .tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 5px 12px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    margin-bottom: 12px;
  }

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 6px;
  }

  p {
    font-size: 14px;
    margin: 0;
    opacity: 0.9;
  }
}

// 导航按钮
:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  width: 50px;
  height: 50px;
  background: @white;
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  &::after {
    display: none;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-top: 2px solid @sauna-wood;
    border-right: 2px solid @sauna-wood;
    transition: all 0.3s ease;
  }

  &:hover {
    background: @sauna-wood;

    &::before {
      border-color: @white;
    }
  }
}

:deep(.swiper-button-prev) {
  left: 10px;

  &::before {
    transform: translate(-50%, -50%) rotate(-135deg);
  }
}

:deep(.swiper-button-next) {
  right: 10px;

  &::before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
}

// 响应式
@media (max-width: 992px) {
  .lifestyle {
    padding: 80px 0;
  }

  .title {
    font-size: 32px;
  }

  .lifestyle-image img {
    height: 300px;
  }
}

@media (max-width: 768px) {
  .lifestyle-swiper-wrap {
    padding: 0 50px;
  }

  .lifestyle-image img {
    height: 260px;
  }
}

@media (max-width: 576px) {
  .lifestyle-swiper-wrap {
    padding: 0 20px;
  }

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    width: 40px;
    height: 40px;
  }

  :deep(.swiper-button-prev) {
    left: 0;
  }

  :deep(.swiper-button-next) {
    right: 0;
  }

  .lifestyle-content {
    padding: 20px;

    h3 {
      font-size: 16px;
    }

    p {
      font-size: 12px;
    }
  }
}
</style>