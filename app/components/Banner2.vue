<template>
  <section class="banner-2">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">Product Catalog</span>
        <h2 class="title">Complete Sauna Products & Supporting Accessories Collection</h2>
        <p class="desc">Our product range covers prebuilt sauna rooms, infrared sauna rooms, heating equipment, intelligent temperature control systems, wooden sauna tools, aroma accessories and decorative parts. One-stop procurement for all home and commercial sauna scenarios.</p>
      </div>

      <div class="products-grid">
        <!-- Product 1: Sauna Rooms -->
        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/SaunaRooms.png" alt="Sauna Rooms" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Sauna Rooms</h3>
            <p>Prebuilt & Infrared Sauna Rooms</p>
          </div>
        </div>

        <!-- Product 2: Sauna Heaters -->
        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/SaunaHeaters.png" alt="Sauna Heaters" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Sauna Heaters</h3>
            <p>Electric & Wood-fired Heaters</p>
          </div>
        </div>

        <!-- Product 3: Sauna Stones -->
        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/SaunaAccessories.png" alt="Sauna Stones" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Sauna Accessories</h3>
            <p>Complete Your Sauna Experience.</p>
          </div>
        </div>

        <!-- Product 4: Outdoor Wood-fired Hot Tub -->
        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/OutdoorWoodfiredHotTub.png" alt="Outdoor Wood-fired Hot Tub" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Outdoor Wood-fired Hot Tub</h3>
            <p>Immerse in Nature. Relax in Warmth.</p>
          </div>
        </div>

        <!-- Product 5: Indoor Dry & Steam Room -->
        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/IndoorDry&SteamRoom.png" alt="Indoor Dry & Steam Room" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Indoor Dry & Steam Room</h3>
            <p>Cleanse. Relax. Rejuvenate.</p>
          </div>
        </div>

        <!-- Product 6: Outdoor Traditional Sauna -->
        <div class="product-item">
          <div class="product-image">
            <img src="/images/home/OutdoorTraditionalSauna.png" alt="Outdoor Traditional Sauna" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Outdoor Traditional Sauna</h3>
            <p>Embrace Tradition. Elevate Wellness.</p>
          </div>
        </div>
      </div>

      <div class="cta-wrapper">
        <a href="#" class="cta-btn">View All Products</a>
      </div>
    </div>
  </section>
</template>

<script setup>
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