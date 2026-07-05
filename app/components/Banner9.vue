<template>
  <section class="banner-9">
    <div class="banner-9-bg">
      <OptimImg
        src="/images/home/SaunaRooms.png"
        alt=""
        class="banner-9-bg-image"
        loading="lazy"
      />
      <div class="container">
        <div class="banner-9-content" :class="{ 'zh-wide': isZh }">
          <span class="tag">{{ tm('banner9.tag') }}</span>
          <h2 class="title">{{ tm('banner9.title') }}</h2>
          <p class="description">{{ tm('banner9.description') }}</p>
          <div class="cta-buttons">
            <NuxtLink :to="localePath('/contact')" class="cta-btn primary">{{ tm('banner9.primaryCta') }}</NuxtLink>
            <NuxtLink :to="localePath('/contact')" class="cta-btn secondary">{{ tm('banner9.secondaryCta') }}</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm, localePath } = useI18nHelpers()
const currentLocale = useLocale()
const isZh = computed(() => currentLocale.value.startsWith('zh'))
</script>

<style lang="less" scoped>
.banner-9 {
  .banner-9-bg {
    background: linear-gradient(135deg, @sauna-dark 0%, #1a1410 100%);
    padding: 100px 0;
    position: relative;
    overflow: hidden;

    .banner-9-bg-image {
      position: absolute;
      inset: 0;
      z-index: 0;
      opacity: 0.15;

      :deep(img) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.banner-9-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;

  .tag {
    display: inline-block;
    font-size: 13px;
    font-weight: 600;
    color: @sauna-wood-light;
    letter-spacing: 3px;
    text-transform: uppercase;
    padding: 8px 20px;
    border: 1px solid rgba(196, 167, 125, 0.4);
    border-radius: 30px;
    margin-bottom: 32px;
  }

  .title {
    font-size: 56px;
    font-weight: 700;
    color: @white;
    margin: 0 0 32px;
    line-height: 1.3;
  }

  &.zh-wide .title {
    width: max-content;
    max-width: none;
    margin-left: auto;
    margin-right: auto;
  }

  .description {
    font-size: 22px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    margin: 0 0 52px;
  }
}

.cta-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
}

.cta-btn {
  display: inline-block;
  padding: 20px 56px;
  font-size: 22px;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;

  &.primary {
    background: @sauna-wood;
    color: @white;

    &:hover {
      background: lighten(@sauna-wood, 5%);
      transform: translateY(-2px);
    }
  }

  &.secondary {
    background: transparent;
    color: @white;
    border: 2px solid rgba(255, 255, 255, 0.5);

    &:hover {
      border-color: @white;
      background: rgba(255, 255, 255, 0.1);
      transform: translateY(-2px);
    }
  }
}

@media (max-width: 992px) {
  .banner-9 {
    .banner-9-bg {
      padding: 80px 0;
    }

    .title {
      font-size: 46px;
    }

    .description {
      font-size: 20px;
    }
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 36px;
  }

  .description {
    font-size: 18px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-btn {
    width: 100%;
    max-width: 320px;
    padding: 18px 30px;
    font-size: 18px;
  }
}
</style>