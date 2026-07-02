<template>
  <section class="banner-4">
    <div class="container">
      <div class="banner-4-content">
        <div class="content-left">
          <span class="subtitle">{{ tm('banner4.subtitle') }}</span>
          <h2 class="title" v-html="tm('banner4.title')"></h2>
          <p class="description">{{ tm('banner4.description') }}</p>
          <div class="features-list">
            <div class="feature-item">
              <span class="check-icon">✓</span>
              <span>{{ tm('banner4.features.dimensions') }}</span>
            </div>
            <div class="feature-item">
              <span class="check-icon">✓</span>
              <span>{{ tm('banner4.features.style') }}</span>
            </div>
            <div class="feature-item">
              <span class="check-icon">✓</span>
              <span>{{ tm('banner4.features.heating') }}</span>
            </div>
            <div class="feature-item">
              <span class="check-icon">✓</span>
              <span>{{ tm('banner4.features.smart') }}</span>
            </div>
          </div>
          <NuxtLink :to="localePath('/products')" class="cta-btn">{{ tm('banner4.cta') }}</NuxtLink>
        </div>
        <div class="content-right">
          <div class="showcase-image">
            <img src="/images/home/THE-ULTIMATESAUNA-EXPERIENCE.png" alt="The Ultimate Sauna Experience" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm, localePath } = useI18nHelpers()
</script>

<style lang="less" scoped>
.banner-4 {
  padding: 100px 0;
  background-color: @sauna-dark;
  color: @white;
}

.banner-4-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.content-left {
  .subtitle {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    color: @sauna-wood-light;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .title {
    font-size: 48px;
    font-weight: 700;
    margin: 0 0 32px;
    line-height: 1.3;
  }

  .description {
    font-size: 20px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.8;
    margin: 0 0 44px;
  }
}

.features-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 40px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);

  .check-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: @sauna-wood;
    border-radius: 50%;
    font-size: 16px;
    font-weight: 700;
  }
}

.cta-btn {
  display: inline-block;
  padding: 18px 52px;
  background: @sauna-wood;
  color: @white;
  font-size: 20px;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: @sauna-wood-light;
    color: @sauna-dark;
    transform: translateY(-2px);
  }
}

.content-right {
  .showcase-image {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    aspect-ratio: 1;

    &::before {
      content: '';
      position: absolute;
      top: -15px;
      right: -15px;
      left: 15px;
      bottom: 15px;
      border: 2px solid @sauna-wood;
      border-radius: 12px;
      z-index: -1;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }

    &:hover img {
      transform: scale(1.03);
    }
  }
}

@media (max-width: 992px) {
  .banner-4 {
    padding: 80px 0;
  }

  .banner-4-content {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .title {
    font-size: 40px;
  }

  .description {
    font-size: 18px;
  }

  .content-right .showcase-image {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
  }

  .description {
    font-size: 16px;
  }

  .feature-item {
    font-size: 18px;
  }

  .features-list {
    grid-template-columns: 1fr;
  }

  .content-right .showcase-image {
    max-width: 300px;
  }
}
</style>