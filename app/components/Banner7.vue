<template>
  <section class="banner-7">
    <div class="container">
      <div class="banner-7-content">
        <div class="content-left">
          <div class="advantage-cards">
            <div class="advantage-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div class="card-text">
                <h3>{{ tm('banner7.advantages.materials.title') }}</h3>
                <p>{{ tm('banner7.advantages.materials.desc') }}</p>
              </div>
            </div>

            <div class="advantage-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div class="card-text">
                <h3>{{ tm('banner7.advantages.heating.title') }}</h3>
                <p>{{ tm('banner7.advantages.heating.desc') }}</p>
              </div>
            </div>

            <div class="advantage-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
                  <path d="M22 4L12 14.01l-3-3"/>
                </svg>
              </div>
              <div class="card-text">
                <h3>{{ tm('banner7.advantages.resistant.title') }}</h3>
                <p>{{ tm('banner7.advantages.resistant.desc') }}</p>
              </div>
            </div>

            <div class="advantage-card">
              <div class="card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
                </svg>
              </div>
              <div class="card-text">
                <h3>{{ tm('banner7.advantages.maintenance.title') }}</h3>
                <p>{{ tm('banner7.advantages.maintenance.desc') }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="content-right">
          <span class="subtitle">{{ tm('banner7.subtitle') }}</span>
          <h2 class="title">{{ tm('banner7.title') }}</h2>
          <p class="description">{{ tm('banner7.description') }}</p>
          <NuxtLink :to="localePath('/products')" class="cta-btn">{{ tm('banner7.cta') }}</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm, localePath } = useI18nHelpers()
</script>

<style lang="less" scoped>
.banner-7 {
  padding: 100px 0;
  background: linear-gradient(135deg, @sauna-cream 0%, #EDE7DD 100%);
}

.banner-7-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.content-left {
  .advantage-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
}

.advantage-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  background: @white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }

  .card-icon {
    flex-shrink: 0;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: @sauna-wood;
    border-radius: 50%;

    svg {
      width: 24px;
      height: 24px;
      color: @white;
    }
  }

  .card-text {
    h3 {
      font-size: 20px;
      font-weight: 600;
      color: @text-color;
      margin: 0 0 10px;
    }

    p {
      font-size: 18px;
      color: @light-text;
      margin: 0;
      line-height: 1.5;
    }
  }
}

.content-right {
  .subtitle {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    color: @sauna-wood;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  .title {
    font-size: 48px;
    font-weight: 700;
    color: @text-color;
    margin: 0 0 32px;
    line-height: 1.3;
  }

  .description {
    font-size: 20px;
    color: @light-text;
    line-height: 1.8;
    margin: 0 0 44px;
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
    background: @sauna-dark;
    transform: translateY(-2px);
  }
}

@media (max-width: 992px) {
  .banner-7 {
    padding: 80px 0;
  }

  .banner-7-content {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .advantage-cards {
    grid-template-columns: 1fr;
  }

  .title {
    font-size: 40px;
  }

  .description {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .advantage-card {
    padding: 20px;
  }

  .advantage-card .card-icon {
    width: 40px;
    height: 40px;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .title {
    font-size: 32px;
  }

  .description {
    font-size: 16px;
  }
}
</style>