<template>
  <section class="banner-5">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">{{ tm('banner5.subtitle') }}</span>
        <h2 class="title">{{ tm('banner5.title') }}</h2>
        <p class="desc">{{ tm('banner5.desc') }}</p>
      </div>

      <div class="factory-stats">
        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 10v11M12 10v11M16 10v11"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-number">15+</span>
            <span class="stat-label">{{ tm('banner5.stats.years') }}</span>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-number">500+</span>
            <span class="stat-label">{{ tm('banner5.stats.clients') }}</span>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
              <line x1="12" y1="22.08" x2="12" y2="12"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-number">50K+</span>
            <span class="stat-label">{{ tm('banner5.stats.output') }}</span>
          </div>
        </div>

        <div class="stat-item">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <div class="stat-info">
            <span class="stat-number">ISO</span>
            <span class="stat-label">{{ tm('banner5.stats.quality') }}</span>
          </div>
        </div>
      </div>

      <div class="factory-highlights">
        <div class="highlight-card">
          <div class="highlight-image">
            <OptimImg src="/images/home/MODERN-PRODUCTION.png" alt="Production Workshop" loading="lazy" />
          </div>
          <div class="highlight-content">
            <h3>{{ tm('banner5.highlights.production.title') }}</h3>
            <p>{{ tm('banner5.highlights.production.desc') }}</p>
          </div>
        </div>

        <div class="highlight-card">
          <div class="highlight-image">
            <OptimImg src="/images/home/QUALITY-TESTING.png" alt="Quality Control" loading="lazy" />
          </div>
          <div class="highlight-content">
            <h3>{{ tm('banner5.highlights.testing.title') }}</h3>
            <p>{{ tm('banner5.highlights.testing.desc') }}</p>
          </div>
        </div>

        <div class="highlight-card">
          <div class="highlight-image">
            <OptimImg src="/images/home/WAREHOUSING&LOGISTICS.png" alt="Warehouse" loading="lazy" />
          </div>
          <div class="highlight-content">
            <h3>{{ tm('banner5.highlights.logistics.title') }}</h3>
            <p>{{ tm('banner5.highlights.logistics.desc') }}</p>
          </div>
        </div>
      </div>

      <div class="cta-wrapper">
        <NuxtLink :to="localePath('/about-us')" class="cta-btn">{{ tm('banner5.cta') }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm, localePath } = useI18nHelpers()
</script>

<style lang="less" scoped>
.banner-5 {
  padding: 100px 0;
  background-color: @sauna-cream;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.subtitle {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: @sauna-wood;
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.title {
  font-size: 52px;
  font-weight: 700;
  color: @text-color;
  margin: 0 0 28px;
  line-height: 1.3;
}

.desc {
  font-size: 20px;
  color: @light-text;
  line-height: 1.8;
  margin: 0;
}

.factory-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 60px;
  padding: 40px;
  background: @white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 20px;

  .stat-icon {
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: @sauna-wood;
    border-radius: 50%;

    svg {
      width: 28px;
      height: 28px;
      color: @white;
    }
  }

  .stat-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .stat-number {
    font-size: 44px;
    font-weight: 700;
    color: @sauna-dark;
    line-height: 1;
  }

  .stat-label {
    font-size: 18px;
    color: @light-text;
  }
}

.factory-highlights {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.highlight-card {
  border-radius: 10px;
  overflow: hidden;
  background: @white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);

  &:hover {
    .highlight-image img {
      transform: scale(1.05);
    }
  }
}

.highlight-image {
  overflow: hidden;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
}

.highlight-content {
  padding: 28px;

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: @text-color;
    margin: 0 0 12px;
  }

  p {
    font-size: 18px;
    color: @light-text;
    margin: 0;
  }
}

.cta-wrapper {
  text-align: center;
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
    background: @sauna-dark;
    transform: translateY(-2px);
  }
}

@media (max-width: 992px) {
  .banner-5 {
    padding: 80px 0;
  }

  .title {
    font-size: 42px;
  }

  .desc {
    font-size: 18px;
  }

  .factory-stats {
    grid-template-columns: repeat(2, 1fr);
    padding: 30px;
  }

  .factory-highlights {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
  }

  .desc {
    font-size: 16px;
  }

  .factory-stats {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .stat-item {
    justify-content: center;
  }
}
</style>