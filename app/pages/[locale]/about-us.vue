<template>
  <div class="about-page">
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">{{ tm('about.title') }}</h1>
          <p class="hero-subtitle">{{ tm('about.subtitle') }}</p>
          <p class="hero-text" v-html="tm('about.heroText')"></p>
        </div>
        <div class="hero-image">
          <img
            src="/images/about-us/factory.png"
            alt="Factory"
            class="factory-image"
          >
        </div>
      </div>
    </section>

    <section class="strengths-section">
      <div class="strengths-container">
        <h2 class="section-title">{{ tm('about.whyChooseTitle') }}</h2>
        <div class="strengths-grid">
          <div class="strength-card">
            <div class="strength-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div class="strength-number">18+</div>
            <h3 class="strength-title">{{ tm('about.strength1Title') }}</h3>
            <p class="strength-desc">{{ tm('about.strength1Desc') }}</p>
          </div>
          <div class="strength-card">
            <div class="strength-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div class="strength-number">15K+</div>
            <h3 class="strength-title">{{ tm('about.strength2Title') }}</h3>
            <p class="strength-desc">{{ tm('about.strength2Desc') }}</p>
          </div>
          <div class="strength-card">
            <div class="strength-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <div class="strength-number">50+</div>
            <h3 class="strength-title">{{ tm('about.strength3Title') }}</h3>
            <p class="strength-desc">{{ tm('about.strength3Desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="manufacturing-section">
      <div class="manufacturing-container">
        <h2 class="section-title" style="color: #F5F1EB;">{{ tm('about.craftsmanshipTitle') }}</h2>
        <p class="manufacturing-text">{{ tm('about.craftsmanshipText') }}</p>
        <div class="services-grid">
          <div class="service-item">
            <div class="service-badge">OEM</div>
            <p>{{ tm('about.oemDesc') }}</p>
          </div>
          <div class="service-item">
            <div class="service-badge">ODM</div>
            <p>{{ tm('about.odmDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="certifications-section">
      <div class="certifications-container">
        <h2 class="section-title">{{ tm('about.qualityTitle') }}</h2>
        <p class="certifications-intro">{{ tm('about.qualityIntro') }}</p>
        <div class="certificates-badges">
          <div class="certificate-badge">
            <strong>ISO 9001</strong>
            <span>{{ tm('about.certifications.iso9001') }}</span>
          </div>
          <div class="certificate-badge">
            <strong>BSCI</strong>
            <span>{{ tm('about.certifications.bsci') }}</span>
          </div>
          <div class="certificate-badge">
            <strong>CE</strong>
            <span>{{ tm('about.certifications.ce') }}</span>
          </div>
          <div class="certificate-badge">
            <strong>UL</strong>
            <span>{{ tm('about.certifications.ul') }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="global-section">
      <div class="global-container">
        <h2 class="section-title" style="color: #F5F1EB;">{{ tm('about.globalTitle') }}</h2>
        <p class="global-intro">{{ tm('about.globalIntro') }}</p>
        <div class="map-wrapper">
          <SharedWorldMapFlylines />
        </div>
        <div class="map-legend">
          <div class="legend-item">
            <span class="legend-dot hq"></span>
            <span>{{ tm('about.hqLabel') }}</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot target"></span>
            <span>{{ tm('about.partnersLabel') }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-container">
        <h2 class="cta-title">{{ tm('about.ctaTitle') }}</h2>
        <p class="cta-text">{{ tm('about.ctaText') }}</p>
        <p class="cta-closing">
          <strong>{{ tm('about.ctaClosing') }}</strong>
        </p>
        <NuxtLink :to="localePath('/contact')" class="cta-button">
          {{ tm('about.ctaButton') }}
        </NuxtLink>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
const { tm, localePath, locale } = useI18nHelpers()

definePageMeta({
  layout: 'default',
})

useHead({
  title: computed(() => tm('about.seoTitle')),
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: computed(() => tm('about.seoDescription')) },
  ],
})
</script>

<style lang="less" scoped>
@brand-cream: #F5F1EB;
@brand-wood: #8B5A2B;
@brand-wood-light: #C4A77D;
@brand-gold: #B8860B;
@brand-dark: #2D2016;
@text-dark: #333333;
@text-light: #777777;
@white: #FFFFFF;

.about-page {
  background: @brand-cream;
  min-height: 100vh;
}

.hero-section {
  background: linear-gradient(135deg, @brand-dark 0%, #4A3728 100%);
  padding: 80px 40px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4A77D' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }

  @media (max-width: 768px) { padding: 60px 20px; }
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
  z-index: 1;

  @media (max-width: 992px) { grid-template-columns: 1fr; gap: 40px; }
}

.hero-content {
  color: @brand-cream;
  @media (max-width: 992px) { order: 1; }
}

.hero-title {
  font-size: 3rem; font-weight: 700; margin: 0 0 16px; letter-spacing: -0.02em; line-height: 1.2;
  @media (max-width: 768px) { font-size: 2.25rem; }
}

.hero-subtitle {
  font-size: 1.5rem; color: @brand-gold; margin: 0 0 24px; font-weight: 500;
  @media (max-width: 768px) { font-size: 1.25rem; }
}

.hero-text {
  font-size: 1.1rem; color: rgba(245, 241, 235, 0.9); line-height: 1.8; margin: 0;
  strong { color: @brand-cream; font-weight: 600; }
}

.hero-image { @media (max-width: 992px) { order: 0; } }

.factory-image {
  width: 100%; height: auto; border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3); object-fit: cover;
  transition: transform 0.4s ease;
  &:hover { transform: scale(1.02); }
}

.strengths-section {
  padding: 80px 40px; background: @white;
  @media (max-width: 768px) { padding: 60px 20px; }
}

.strengths-container { max-width: 1200px; margin: 0 auto; }

.section-title {
  font-size: 2.5rem; font-weight: 700; color: @brand-dark; text-align: center;
  margin: 0 0 48px; position: relative;
  &::after {
    content: ''; display: block; width: 60px; height: 4px;
    background: linear-gradient(90deg, @brand-gold, @brand-wood-light);
    margin: 20px auto 0; border-radius: 2px;
  }
  @media (max-width: 768px) { font-size: 2rem; margin-bottom: 36px; }
}

.strengths-grid {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px;
  @media (max-width: 992px) { grid-template-columns: repeat(2, 1fr); }
  @media (max-width: 768px) { grid-template-columns: 1fr; gap: 24px; }
}

.strength-card {
  background: @brand-cream; border-radius: 16px; padding: 40px 32px;
  text-align: center; border: 1px solid rgba(139, 90, 43, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-8px); box-shadow: 0 16px 48px rgba(139, 90, 43, 0.15); }
}

.strength-icon {
  color: @brand-gold; margin-bottom: 20px;
  svg { width: 48px; height: 48px; }
}

.strength-number {
  font-size: 3.5rem; font-weight: 700; color: @brand-wood;
  margin-bottom: 8px; font-family: 'Playfair Display', serif;
  @media (max-width: 768px) { font-size: 3rem; }
}

.strength-title {
  font-size: 1.25rem; font-weight: 600; color: @brand-dark; margin: 0 0 8px;
}

.strength-desc {
  font-size: 0.95rem; color: @text-light; margin: 0; line-height: 1.6;
}

.manufacturing-section {
  background: linear-gradient(180deg, @brand-dark 0%, #3D2A1C 100%);
  padding: 80px 40px; text-align: center;
  @media (max-width: 768px) { padding: 60px 20px; }
}

.manufacturing-container { max-width: 900px; margin: 0 auto; }

.manufacturing-text {
  font-size: 1.15rem; color: @brand-cream; line-height: 1.8;
  margin: 0 auto 48px; opacity: 0.95;
}

.services-grid {
  display: flex; gap: 32px; justify-content: center;
  @media (max-width: 768px) { flex-direction: column; align-items: center; gap: 24px; }
}

.service-item {
  background: rgba(245, 241, 235, 0.1); border-radius: 12px; padding: 32px 48px;
  text-align: center; border: 1px solid rgba(196, 167, 125, 0.2); backdrop-filter: blur(10px);
  @media (max-width: 768px) { width: 100%; max-width: 320px; padding: 24px 32px; }
}

.service-badge {
  display: inline-block; font-size: 1.5rem; font-weight: 700; color: @brand-gold;
  background: rgba(184, 134, 11, 0.2); padding: 8px 24px; border-radius: 8px; margin-bottom: 16px;
}

.service-item p {
  font-size: 0.95rem; color: @brand-cream; margin: 0; line-height: 1.6; opacity: 0.9;
}

.certifications-section {
  padding: 80px 40px; background: @white;
  @media (max-width: 768px) { padding: 60px 20px; }
}

.certifications-container { max-width: 900px; margin: 0 auto; text-align: center; }

.certifications-intro {
  font-size: 1rem; color: @text-light; max-width: 600px; margin: 0 auto 48px;
}

.certificates-badges {
  display: flex; gap: 24px; justify-content: center; flex-wrap: wrap;
  @media (max-width: 768px) { gap: 16px; }
}

.certificate-badge {
  background: @brand-cream; border-radius: 12px; padding: 24px 32px; text-align: center;
  border: 1px solid rgba(139, 90, 43, 0.15); transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(139, 90, 43, 0.1); }
  strong { display: block; font-size: 1.5rem; color: @brand-wood; margin-bottom: 8px; font-weight: 700; }
  span { font-size: 0.85rem; color: @text-light; }
}

.global-section {
  background: #2D2016; padding: 80px 40px;
  @media (max-width: 768px) { padding: 60px 20px; }
}

.global-container { max-width: 1200px; margin: 0 auto; text-align: center; }

.global-intro {
  font-size: 1.1rem; color: @brand-cream; line-height: 1.8;
  max-width: 700px; margin: 0 auto 40px; opacity: 0.9;
}

.map-wrapper {
  width: 100%; height: 500px; border-radius: 12px; overflow: hidden;
  @media (max-width: 768px) { height: 350px; }
}

.map-legend {
  display: flex; justify-content: center; gap: 32px; margin-top: 24px; padding: 16px 0;
  @media (max-width: 768px) { flex-direction: column; gap: 12px; }
}

.legend-item {
  display: flex; align-items: center; gap: 8px; color: @brand-cream; font-size: 0.95rem;
}

.legend-dot {
  width: 12px; height: 12px; border-radius: 50%; display: inline-block;
  &.hq { background-color: #E53935; box-shadow: 0 0 8px rgba(229, 57, 53, 0.5); }
  &.target { background-color: @brand-wood-light; box-shadow: 0 0 8px rgba(196, 167, 125, 0.5); }
}

.cta-section {
  background: linear-gradient(135deg, @brand-cream 0%, #EDE8E0 100%);
  padding: 80px 40px; text-align: center;
  @media (max-width: 768px) { padding: 60px 20px; }
}

.cta-container { max-width: 800px; margin: 0 auto; }

.cta-title {
  font-size: 2.5rem; font-weight: 700; color: @brand-dark; margin: 0 0 20px;
  @media (max-width: 768px) { font-size: 2rem; }
}

.cta-text {
  font-size: 1.1rem; color: @text-light; line-height: 1.8;
  max-width: 600px; margin: 0 auto 20px;
}

.cta-closing { font-size: 1.25rem; color: @brand-gold; margin: 0 0 40px; }

.cta-button {
  display: inline-block; padding: 16px 40px;
  background: linear-gradient(135deg, @brand-wood 0%, @brand-dark 100%);
  color: @brand-cream; font-size: 1rem; font-weight: 600;
  text-decoration: none; border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(45, 32, 22, 0.25); }
}
</style>