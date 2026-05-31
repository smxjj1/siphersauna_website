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
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80" alt="Sauna Rooms" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Sauna Rooms</h3>
            <p>Prebuilt & Infrared Sauna Rooms</p>
          </div>
        </div>

        <!-- Product 2: Sauna Heaters -->
        <div class="product-item">
          <div class="product-image">
            <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80" alt="Sauna Heaters" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Sauna Heaters</h3>
            <p>Electric & Wood-fired Heaters</p>
          </div>
        </div>

        <!-- Product 3: Sauna Stones -->
        <div class="product-item">
          <div class="product-image">
            <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80" alt="Sauna Stones" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Sauna Stones</h3>
            <p>Premium Peridotite Stones</p>
          </div>
        </div>

        <!-- Product 4: Smart Controllers -->
        <div class="product-item">
          <div class="product-image">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Smart Controllers" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Smart Controllers</h3>
            <p>Intelligent Temperature Control</p>
          </div>
        </div>

        <!-- Product 5: Wooden Accessories -->
        <div class="product-item">
          <div class="product-image">
            <img src="https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?w=600&q=80" alt="Wooden Accessories" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Wooden Accessories</h3>
            <p>Buckets, Ladles & Headrests</p>
          </div>
        </div>

        <!-- Product 6: Aromatherapy -->
        <div class="product-item">
          <div class="product-image">
            <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80" alt="Aromatherapy" loading="lazy" />
          </div>
          <div class="product-content">
            <h3>Aromatherapy</h3>
            <p>Essential Oils & Aromas</p>
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