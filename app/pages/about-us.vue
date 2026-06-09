<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <!-- 文案重构：桑拿品牌主题 -->
          <h1 class="hero-title">Our Story</h1>
          <p class="hero-subtitle">Crafting Wellness Since 2008</p>
          <p class="hero-text">
            <strong>Sipher Sauna</strong> brings over 18 years of expertise in designing and manufacturing premium sauna rooms. Born from a passion for Nordic wellness traditions and Chinese craftsmanship, we create sauna experiences that blend authentic design with modern innovation. From sustainably sourced Nordic spruce to precision-engineered heating systems, every detail reflects our commitment to quality.
          </p>
        </div>
        <div class="hero-image">
          <img
            src="/images/about-us/factory.png"
            alt="现代化桑拿设备工厂 - 匠心制造的桑拿房"
            class="factory-image"
          >
        </div>
      </div>
    </section>

    <!-- Strengths Section -->
    <section class="strengths-section">
      <div class="strengths-container">
        <h2 class="section-title">Why Choose Sipher</h2>
        <div class="strengths-grid">
          <div class="strength-card">
            <div class="strength-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <div class="strength-number">18+</div>
            <h3 class="strength-title">Years of Excellence</h3>
            <p class="strength-desc">Nearly two decades perfecting sauna craftsmanship, serving clients across 50+ countries with consistent quality.</p>
          </div>
          <div class="strength-card">
            <div class="strength-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div class="strength-number">15K+</div>
            <h3 class="strength-title">Workshop & Factory</h3>
            <p class="strength-desc">15,000 square meters of production capacity in Zhejiang, equipped with German precision machinery for flawless craftsmanship.</p>
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
            <h3 class="strength-title">Global Reach</h3>
            <p class="strength-desc">Trusted by wellness brands, hotel chains, and private clients worldwide. Exporting premium sauna rooms to Europe, North America, and Asia.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Craftsmanship Section -->
    <section class="manufacturing-section">
      <div class="manufacturing-container">
        <h2 class="section-title" style="color: #F5F1EB;">Artisan Craftsmanship</h2>
        <p class="manufacturing-text">
          Every Sipher sauna begins with carefully selected wood—Nordic spruce, Canadian hemlock, and premium red cedar—sourced from sustainable forests. Our master craftsmen combine time-honored joinery techniques with modern precision engineering to create sauna rooms that exceed international standards for durability, safety, and thermal performance.
        </p>
        <div class="services-grid">
          <div class="service-item">
            <div class="service-badge">OEM</div>
            <p>Custom manufacturing for brands seeking distinctive sauna solutions with flexible MOQ and comprehensive quality assurance.</p>
          </div>
          <div class="service-item">
            <div class="service-badge">ODM</div>
            <p>Full-service design and development partnership, from conceptualization to mass production with complete regulatory compliance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Certifications Section -->
    <section class="certifications-section">
      <div class="certifications-container">
        <h2 class="section-title">Quality & Compliance</h2>
        <p class="certifications-intro">
          Sipher Sauna maintains rigorous quality standards verified by leading international certification bodies. Every product undergoes comprehensive testing for structural integrity, electrical safety, and environmental compliance.
        </p>
        <div class="certificates-badges">
          <div class="certificate-badge">
            <strong>ISO 9001</strong>
            <span>Quality Management System</span>
          </div>
          <div class="certificate-badge">
            <strong>BSCI</strong>
            <span>Social Compliance</span>
          </div>
          <div class="certificate-badge">
            <strong>CE</strong>
            <span>European Conformity</span>
          </div>
          <div class="certificate-badge">
            <strong>UL</strong>
            <span>Safety Certification</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Global Presence Section -->
    <section class="global-section">
      <div class="global-container">
        <h2 class="section-title" style="color: #F5F1EB;">Our Global Presence</h2>
        <p class="global-intro">
          From our home base in Foshan, China, Sipher Sauna reaches clients across six continents. Our premium sauna solutions are trusted by wellness brands, hospitality groups, and discerning homeowners worldwide.
        </p>
        <div class="map-wrapper">
          <SharedWorldMapFlylines />
        </div>
        <div class="map-legend">
          <div class="legend-item">
            <span class="legend-dot hq"></span>
            <span>Headquarters: Foshan, China</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot target"></span>
            <span>Partner Cities: 50+ cities across 6 continents</span>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="cta-container">
        <h2 class="cta-title">Experience the Sipher Difference</h2>
        <p class="cta-text">
          Whether you're envisioning a private home wellness sanctuary or outfitting a commercial spa, Sipher Sauna delivers exceptional craftsmanship backed by dedicated customer support. Let us help you create the perfect sauna experience.
        </p>
        <p class="cta-closing">
          <strong>Elevate Your Wellness Journey with Sipher</strong>
        </p>
        <NuxtLink to="/contact" class="cta-button">
          Contact Us Today
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Our Story | Sipher Sauna - Premium Wellness Experience',
  meta: [
    {
      name: 'description',
      content: 'Sipher Sauna - 18 years of excellence in crafting premium outdoor and indoor sauna rooms. Nordic design meets Chinese craftsmanship.',
    },
  ],
})
</script>

<style lang="less" scoped>
// 品牌暖色调色板 - 木质与自然元素
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

// Hero Section
.hero-section {
  background: linear-gradient(135deg, @brand-dark 0%, #4A3728 100%);
  padding: 80px 40px;
  position: relative;
  overflow: hidden;

  // 背景装饰纹理
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4A77D' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
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

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}

.hero-content {
  color: @brand-cream;

  @media (max-width: 992px) {
    order: 1;
  }
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 16px;
  letter-spacing: -0.02em;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.25rem;
  }
}

.hero-subtitle {
  font-size: 1.5rem;
  color: @brand-gold;
  margin: 0 0 24px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
}

.hero-text {
  font-size: 1.1rem;
  color: rgba(245, 241, 235, 0.9);
  line-height: 1.8;
  margin: 0;

  strong {
    color: @brand-cream;
    font-weight: 600;
  }
}

.hero-image {
  @media (max-width: 992px) {
    order: 0;
  }
}

.factory-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  object-fit: cover;
  transition: transform 0.4s ease;

  &:hover {
    transform: scale(1.02);
  }
}

// Strengths Section
.strengths-section {
  padding: 80px 40px;
  background: @white;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
}

.strengths-container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: @brand-dark;
  text-align: center;
  margin: 0 0 48px;
  position: relative;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, @brand-gold, @brand-wood-light);
    margin: 20px auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 36px;
  }
}

.strengths-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.strength-card {
  background: @brand-cream;
  border-radius: 16px;
  padding: 40px 32px;
  text-align: center;
  border: 1px solid rgba(139, 90, 43, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 16px 48px rgba(139, 90, 43, 0.15);
  }
}

.strength-icon {
  color: @brand-gold;
  margin-bottom: 20px;

  svg {
    width: 48px;
    height: 48px;
  }
}

.strength-number {
  font-size: 3.5rem;
  font-weight: 700;
  color: @brand-wood;
  margin-bottom: 8px;
  font-family: 'Playfair Display', serif;

  @media (max-width: 768px) {
    font-size: 3rem;
  }
}

.strength-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: @brand-dark;
  margin: 0 0 8px;
}

.strength-desc {
  font-size: 0.95rem;
  color: @text-light;
  margin: 0;
  line-height: 1.6;
}

// Manufacturing Section
.manufacturing-section {
  background: linear-gradient(180deg, @brand-dark 0%, #3D2A1C 100%);
  padding: 80px 40px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
}

.manufacturing-container {
  max-width: 900px;
  margin: 0 auto;
}

.manufacturing-text {
  font-size: 1.15rem;
  color: @brand-cream;
  line-height: 1.8;
  margin: 0 auto 48px;
  opacity: 0.95;
}

.services-grid {
  display: flex;
  gap: 32px;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
}

.service-item {
  background: rgba(245, 241, 235, 0.1);
  border-radius: 12px;
  padding: 32px 48px;
  text-align: center;
  border: 1px solid rgba(196, 167, 125, 0.2);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    width: 100%;
    max-width: 320px;
    padding: 24px 32px;
  }
}

.service-badge {
  display: inline-block;
  font-size: 1.5rem;
  font-weight: 700;
  color: @brand-gold;
  background: rgba(184, 134, 11, 0.2);
  padding: 8px 24px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.service-item p {
  font-size: 0.95rem;
  color: @brand-cream;
  margin: 0;
  line-height: 1.6;
  opacity: 0.9;
}

// Certifications Section
.certifications-section {
  padding: 80px 40px;
  background: @white;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
}

.certifications-container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.certificates-intro {
  font-size: 1rem;
  color: @text-light;
  max-width: 600px;
  margin: 0 auto 48px;
}

.certificates-badges {
  display: flex;
  gap: 24px;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 16px;
  }
}

.certificate-badge {
  background: @brand-cream;
  border-radius: 12px;
  padding: 24px 32px;
  text-align: center;
  border: 1px solid rgba(139, 90, 43, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(139, 90, 43, 0.1);
  }

  strong {
    display: block;
    font-size: 1.5rem;
    color: @brand-wood;
    margin-bottom: 8px;
    font-weight: 700;
  }

  span {
    font-size: 0.85rem;
    color: @text-light;
  }
}

// Global Presence Section
.global-section {
  background: #2D2016;
  padding: 80px 40px;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
}

.global-container {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.global-intro {
  font-size: 1.1rem;
  color: @brand-cream;
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto 40px;
  opacity: 0.9;
}

.map-wrapper {
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 350px;
  }
}

.map-legend {
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 24px;
  padding: 16px 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: @brand-cream;
  font-size: 0.95rem;
}

.legend-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;

  &.hq {
    background-color: #E53935;
    box-shadow: 0 0 8px rgba(229, 57, 53, 0.5);
  }

  &.target {
    background-color: @brand-wood-light;
    box-shadow: 0 0 8px rgba(196, 167, 125, 0.5);
  }
}

// CTA Section
.cta-section {
  background: linear-gradient(135deg, @brand-cream 0%, #EDE8E0 100%);
  padding: 80px 40px;
  text-align: center;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
}

.cta-container {
  max-width: 800px;
  margin: 0 auto;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: @brand-dark;
  margin: 0 0 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
}

.cta-text {
  font-size: 1.1rem;
  color: @text-light;
  line-height: 1.8;
  max-width: 600px;
  margin: 0 auto 20px;
}

.cta-closing {
  font-size: 1.25rem;
  color: @brand-gold;
  margin: 0 0 40px;
}

.cta-button {
  display: inline-block;
  padding: 16px 40px;
  background: linear-gradient(135deg, @brand-wood 0%, @brand-dark 100%);
  color: @brand-cream;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(45, 32, 22, 0.25);
  }
}
</style>