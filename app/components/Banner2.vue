<template>
  <section class="banner-2">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">{{ tm('banner2.subtitle') }}</span>
        <h2 class="title">{{ tm('banner2.title') }}</h2>
        <p class="desc">{{ tm('banner2.desc') }}</p>
      </div>

      <div class="products-grid">
        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/SaunaRooms.png" alt="Sauna Rooms" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>{{ tm('banner2.products.saunaRooms.title') }}</h3>
            <p>{{ tm('banner2.products.saunaRooms.desc') }}</p>
          </div>
        </div>

        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/SaunaHeaters.png" alt="Sauna Heaters" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>{{ tm('banner2.products.saunaHeaters.title') }}</h3>
            <p>{{ tm('banner2.products.saunaHeaters.desc') }}</p>
          </div>
        </div>

        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/SaunaAccessories.png" alt="Sauna Stones" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>{{ tm('banner2.products.saunaAccessories.title') }}</h3>
            <p>{{ tm('banner2.products.saunaAccessories.desc') }}</p>
          </div>
        </div>

        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/OutdoorWoodfiredHotTub.png" alt="Outdoor Wood-fired Hot Tub" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>{{ tm('banner2.products.outdoorHotTub.title') }}</h3>
            <p>{{ tm('banner2.products.outdoorHotTub.desc') }}</p>
          </div>
        </div>

        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/IndoorDry&SteamRoom.png" alt="Indoor Dry & Steam Room" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>{{ tm('banner2.products.indoorDrySteam.title') }}</h3>
            <p>{{ tm('banner2.products.indoorDrySteam.desc') }}</p>
          </div>
        </div>

        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/OutdoorTraditionalSauna.png" alt="Outdoor Traditional Sauna" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>{{ tm('banner2.products.outdoorTraditional.title') }}</h3>
            <p>{{ tm('banner2.products.outdoorTraditional.desc') }}</p>
          </div>
        </div>
      </div>

      <div class="cta-wrapper">
        <a href="#" class="cta-btn">{{ tm('banner2.viewAll') }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
const { tm } = useI18nHelpers()
</script>

<style lang="less" scoped>
.banner-2 {
  padding: 100px 0;
  background-color: @white;
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

.products-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 50px;
}

.product-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    .product-image img {
      transform: scale(1.08);
    }

    .product-content {
      background: @sauna-wood;
    }
  }
}

.product-image {
  overflow: hidden;
  height: 280px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
}

.product-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 30px;
  background: rgba(45, 32, 22, 0.9);
  transition: background 0.4s ease;

  h3 {
    font-size: 24px;
    font-weight: 700;
    color: @white;
    margin: 0 0 8px;
  }

  p {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.8);
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
  .banner-2 {
    padding: 80px 0;
  }

  .title {
    font-size: 42px;
  }

  .desc {
    font-size: 18px;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
  }

  .desc {
    font-size: 16px;
  }

  .products-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .product-image {
    height: 220px;
  }
}
</style>