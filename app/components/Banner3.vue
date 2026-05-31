<template>
  <section class="banner-3">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">Solutions</span>
        <h2 class="title">Custom Sauna Solutions for Multiple Scenarios</h2>
        <p class="desc">Tailored standard and customized sauna solutions for family relaxation, private villa, luxury hotel, commercial spa, fitness club and wellness engineering projects to fit different spaces and usage demands.</p>
      </div>

      <div class="scenarios-grid">
        <!-- Scenario 1: Home -->
        <div class="scenario-card home">
          <div class="scenario-bg" style="background-image: url('https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80')"></div>
          <div class="scenario-content">
            <span class="scenario-tag">Residential</span>
            <h3>Home & Villa Sauna</h3>
            <p>Private family wellness space</p>
          </div>
          <a href="#" class="scenario-link">View Details</a>
        </div>

        <!-- Scenario 2: Hotel -->
        <div class="scenario-card hotel">
          <div class="scenario-bg" style="background-image: url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=800&q=80')"></div>
          <div class="scenario-content">
            <span class="scenario-tag">Commercial</span>
            <h3>Hotel & Resort Spa</h3>
            <p>Luxury guest experience</p>
          </div>
          <a href="#" class="scenario-link">View Details</a>
        </div>

        <!-- Scenario 3: Fitness -->
        <div class="scenario-card fitness">
          <div class="scenario-bg" style="background-image: url('https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=800&q=80')"></div>
          <div class="scenario-content">
            <span class="scenario-tag">Wellness</span>
            <h3>Gym & Fitness Club</h3>
            <p>Premium workout recovery</p>
          </div>
          <a href="#" class="scenario-link">View Details</a>
        </div>

        <!-- Scenario 4: Spa -->
        <div class="scenario-card spa">
          <div class="scenario-bg" style="background-image: url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80')"></div>
          <div class="scenario-content">
            <span class="scenario-tag">Professional</span>
            <h3>Commercial Spa Center</h3>
            <p>High-capacity solutions</p>
          </div>
          <a href="#" class="scenario-link">View Details</a>
        </div>
      </div>

      <div class="cta-wrapper">
        <a href="#" class="cta-btn">View Solutions</a>
      </div>
    </div>
  </section>
</template>

<script setup>
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

  &:hover {
    .scenario-bg {
      transform: scale(1.1);
    }

    .scenario-link {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.scenario-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  transition: transform 0.6s ease;
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

.scenario-link {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -30%);
  padding: 16px 36px;
  background: @white;
  color: @sauna-dark;
  font-size: 18px;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  opacity: 0;
  transition: all 0.4s ease;
  z-index: 2;
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

  .scenario-link {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}
</style>