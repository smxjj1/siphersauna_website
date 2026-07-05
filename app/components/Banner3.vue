<template>
  <section class="banner-3">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">{{ tm('banner3.subtitle') }}</span>
        <h2 class="title">{{ tm('banner3.title') }}</h2>
        <p class="desc">{{ tm('banner3.desc') }}</p>
      </div>

      <div class="scenarios-grid">
        <div class="scenario-card home">
          <div class="scenario-bg">
            <OptimImg src="/images/home/FAMILY& VILLA-SAUNA.png" alt="" loading="lazy" />
          </div>
          <div class="scenario-content">
            <span class="scenario-tag">{{ tm('banner3.scenarios.home.tag') }}</span>
            <h3>{{ tm('banner3.scenarios.home.title') }}</h3>
            <p>{{ tm('banner3.scenarios.home.desc') }}</p>
          </div>
        </div>

        <div class="scenario-card hotel">
          <div class="scenario-bg">
            <OptimImg src="/images/home/HOTEL&RESORT-SPA-CENTER.png" alt="" loading="lazy" />
          </div>
          <div class="scenario-content">
            <span class="scenario-tag">{{ tm('banner3.scenarios.hotel.tag') }}</span>
            <h3>{{ tm('banner3.scenarios.hotel.title') }}</h3>
            <p>{{ tm('banner3.scenarios.hotel.desc') }}</p>
          </div>
        </div>

        <div class="scenario-card fitness">
          <div class="scenario-bg">
            <OptimImg src="/images/home/GYM&FITNESS-CLUBS.png" alt="" loading="lazy" />
          </div>
          <div class="scenario-content">
            <span class="scenario-tag">{{ tm('banner3.scenarios.fitness.tag') }}</span>
            <h3>{{ tm('banner3.scenarios.fitness.title') }}</h3>
            <p>{{ tm('banner3.scenarios.fitness.desc') }}</p>
          </div>
        </div>

        <div class="scenario-card spa">
          <div class="scenario-bg">
            <OptimImg src="/images/home/IndoorDry&SteamRoom.png" alt="" loading="lazy" />
          </div>
          <div class="scenario-content">
            <span class="scenario-tag">{{ tm('banner3.scenarios.spa.tag') }}</span>
            <h3>{{ tm('banner3.scenarios.spa.title') }}</h3>
            <p>{{ tm('banner3.scenarios.spa.desc') }}</p>
          </div>
        </div>
      </div>

      <div class="cta-wrapper">
        <NuxtLink :to="localePath('/products')" class="cta-btn">{{ tm('banner3.viewSolutions') }}</NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm, localePath } = useI18nHelpers()
</script>

<style lang="less" scoped>
.banner-3 {
  padding: 100px 0;
  background: linear-gradient(135deg, @sauna-cream 0%, #EDE7DD 100%);
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

.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 50px;
}

.scenario-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 380px;
  cursor: pointer;

  &:hover .scenario-bg :deep(img) {
    transform: scale(1.1);
  }
}

.scenario-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;

  :deep(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
  }
}

.scenario-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 34px;
  background: linear-gradient(to top, rgba(45, 32, 22, 0.95) 0%, transparent 100%);
  color: @white;
  z-index: 1;

  .scenario-tag {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 26px;
    font-weight: 700;
    margin: 0 0 10px;
  }

  p {
    font-size: 18px;
    margin: 0;
    opacity: 0.85;
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

@media (max-width: 1200px) {
  .scenarios-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 992px) {
  .banner-3 {
    padding: 80px 0;
  }

  .title {
    font-size: 42px;
  }

  .desc {
    font-size: 18px;
  }

  .scenario-card {
    height: 320px;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
  }

  .desc {
    font-size: 16px;
  }

  .scenarios-grid {
    grid-template-columns: 1fr;
  }

  .scenario-card {
    height: 280px;
  }
}
</style>