<template>
  <section class="brand-philosophy">
    <div class="container">
      <!-- 第一个：左图右文 -->
      <div class="philosophy-item">
        <div class="philosophy-image">
          <img src="/images/home/SaunaAccessories.png" alt="Premium Wood Texture" loading="lazy" />
        </div>
        <div class="philosophy-content">
          <span class="subtitle">Our Philosophy</span>
          <h2 class="title">Defining Sauna Aesthetics</h2>
          <p class="description">
            We select top-tier global timber and heating technology to blend traditional sauna culture with modern design. Sipher Sauna is not just a product, but a private space for you to unload fatigue and return to yourself.
          </p>
          <div class="features">
            <div class="feature">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div class="feature-text">
                <h4>Premium Materials</h4>
                <p>Sourced from sustainable forests</p>
              </div>
            </div>
            <div class="feature">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
              </div>
              <div class="feature-text">
                <h4>Traditional Craft</h4>
                <p>Centuries of sauna heritage</p>
              </div>
            </div>
            <div class="feature">
              <div class="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </div>
              <div class="feature-text">
                <h4>Wellness Focus</h4>
                <p>Designed for your wellbeing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style lang="less" scoped>
.brand-philosophy {
  padding: 120px 0;
  background-color: @sauna-cream;
}

.philosophy-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.philosophy-image {
  position: relative;
  overflow: hidden;
  border-radius: 8px;

  img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    transition: transform 0.6s ease;

    &:hover {
      transform: scale(1.03);
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 20px;
    right: -20px;
    bottom: -20px;
    border: 2px solid @sauna-wood-light;
    border-radius: 8px;
    z-index: -1;
  }
}

.philosophy-content {
  padding: 20px 0;
}

.subtitle {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: @sauna-wood;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.title {
  font-size: 40px;
  font-weight: 700;
  color: @text-color;
  margin: 0 0 24px;
  line-height: 1.3;
}

.description {
  font-size: 17px;
  color: @light-text;
  line-height: 1.8;
  margin: 0 0 40px;
}

.features {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.feature {
  display: flex;
  align-items: flex-start;
  gap: 16px;

  .feature-icon {
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

  .feature-text {
    h4 {
      font-size: 16px;
      font-weight: 600;
      color: @text-color;
      margin: 0 0 4px;
    }

    p {
      font-size: 14px;
      color: @light-text;
      margin: 0;
    }
  }
}

// 响应式适配
@media (max-width: 992px) {
  .brand-philosophy {
    padding: 80px 0;
  }

  .philosophy-item {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .philosophy-image {
    img {
      height: 400px;
    }

    &::after {
      top: 15px;
      left: 15px;
      right: -15px;
      bottom: -15px;
    }
  }

  .title {
    font-size: 32px;
  }
}

@media (max-width: 576px) {
  .philosophy-image {
    img {
      height: 300px;
    }
  }

  .title {
    font-size: 26px;
  }

  .features {
    gap: 20px;
  }

  .feature {
    .feature-icon {
      width: 40px;
      height: 40px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>