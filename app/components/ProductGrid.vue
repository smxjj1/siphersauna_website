<template>
  <section class="product-grid">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">Featured Collections</span>
        <h2 class="title">Curated for Your Wellness</h2>
      </div>

      <div class="products-wrapper">
        <!-- Home Sauna Rooms -->
        <div class="product-card">
          <div class="product-image">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80" alt="Home Sauna Rooms" loading="lazy" />
            <div class="product-overlay">
              <button class="view-btn">View Details</button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">Home Sauna Rooms</h3>
            <p class="product-desc">Compact design, infinite possibilities.</p>
          </div>
        </div>

        <!-- Heaters & Stones -->
        <div class="product-card">
          <div class="product-image">
            <img src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=600&q=80" alt="Heaters & Stones" loading="lazy" />
            <div class="product-overlay">
              <button class="view-btn">View Details</button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">Heaters & Stones</h3>
            <p class="product-desc">Rapid heating, locking in the pure steam.</p>
          </div>
        </div>

        <!-- Essential Oils -->
        <div class="product-card">
          <div class="product-image">
            <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80" alt="Essential Oils" loading="lazy" />
            <div class="product-overlay">
              <button class="view-btn">View Details</button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">Essential Oils</h3>
            <p class="product-desc">Natural plant extracts for deep sensory healing.</p>
          </div>
        </div>

        <!-- Wooden Accessories -->
        <div class="product-card">
          <div class="product-image">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80" alt="Wooden Accessories" loading="lazy" />
            <div class="product-overlay">
              <button class="view-btn">View Details</button>
            </div>
          </div>
          <div class="product-info">
            <h3 class="product-name">Wooden Accessories</h3>
            <p class="product-desc">Buckets, ladles, and headrests. Details matter.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style lang="less" scoped>
.product-grid {
  padding: 120px 0;
  background-color: @white;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.subtitle {
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  color: @sauna-wood;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 12px;
}

.title {
  font-size: 42px;
  font-weight: 700;
  color: @text-color;
  margin: 0;
}

.products-wrapper {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}

.product-card {
  position: relative;

  &:hover {
    .product-image img {
      transform: scale(1.08);
    }

    .product-overlay {
      opacity: 1;
    }
  }
}

.product-image {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 320px;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
}

.product-overlay {
  position: absolute;
  inset: 0;
  background: rgba(45, 32, 22, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
  border-radius: 8px;

  .view-btn {
    background: @white;
    color: @sauna-dark;
    padding: 12px 28px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: @sauna-wood;
      color: @white;
    }
  }
}

.product-info {
  padding: 0 4px;
}

.product-name {
  font-size: 18px;
  font-weight: 600;
  color: @text-color;
  margin: 0 0 8px;
}

.product-desc {
  font-size: 14px;
  color: @light-text;
  margin: 0;
}

// 响应式适配
@media (max-width: 1200px) {
  .products-wrapper {
    grid-template-columns: repeat(2, 1fr);
  }

  .product-image img {
    height: 280px;
  }
}

@media (max-width: 768px) {
  .product-grid {
    padding: 80px 0;
  }

  .title {
    font-size: 32px;
  }

  .products-wrapper {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .product-image img {
    height: 220px;
  }
}

@media (max-width: 576px) {
  .products-wrapper {
    grid-template-columns: 1fr;
  }

  .product-image img {
    height: 260px;
  }
}
</style>