<template>
  <section class="banner-9">
    <div class="banner-9-bg">
      <div class="container">
        <div class="banner-9-content">
          <span class="tag">Get Your Free Quote</span>
          <h2 class="title">Looking for a Reliable Sauna Products & Accessories Supplier?</h2>
          <p class="description">We provide cost-effective solutions and exclusive quotations for personal purchase, store wholesale, foreign trade bulk order and large-scale engineering customization.</p>
          <div class="cta-buttons">
            <a href="#" class="cta-btn primary">Get Free Solution & Quote</a>
            <a href="#" class="cta-btn secondary">Contact Us</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style lang="less" scoped>
.banner-9 {
  .banner-9-bg {
    background: linear-gradient(135deg, @sauna-dark 0%, #1a1410 100%);
    padding: 100px 0;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('/images/home/SaunaRooms.png') center/cover;
      opacity: 0.15;
    }
  }
}

.banner-9-content {
  position: relative;
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