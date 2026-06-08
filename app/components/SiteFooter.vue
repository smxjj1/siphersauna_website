<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <!-- Brand Column -->
        <div class="footer-brand">
          <NuxtLink to="/" class="logo">
            <img src="/images/logo/logo.png" alt="Sipher Sauna" class="logo-img">
            <span class="logo-text">Sipher Sauna</span>
          </NuxtLink>
          <p class="footer-desc">
            Premium home sauna solutions crafted with natural wood and advanced heating technology. Your wellness, our passion.
          </p>
          <div class="social-links">
            <a href="#" class="social-link" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.207 2.428.418.637.212 1.175.5 1.7.945.524.444.813.982 1.025 1.7.212.637.368 1.363.418 2.428.05 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.207 1.79-.418 2.428-.212.637-.5 1.175-.945 1.7-.444.524-.982.813-1.7 1.025-.637.212-1.363.368-2.428.418-1.066.05-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.207-2.428-.418-.637-.212-1.175-.5-1.7-.945-.524-.444-.813-.982-1.025-1.7-.212-.637-.368-1.363-.418-2.428C2.01 9.056 2 8.717 2 6c0-2.717.01-3.056.06-4.122.05-1.066.207-1.79.418-2.428.212-.637.5-1.175.945-1.7.444-.524.982-.813 1.7-1.025.637-.212 1.363-.368 2.428-.418C5.944 2.01 6.283 2 9 2h3zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="Pinterest">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0a12 12 0 00-4.37 23.17c-.1-.94-.19-2.4.04-3.42.21-.92 1.36-5.77 1.36-5.77s-.35-.7-.35-1.73c0-1.62.94-2.83 2.11-2.83.99 0 1.47.74 1.47 1.65 0 1-.64 2.49-.97 3.87-.27 1.15.58 2.09 1.72 2.09 2.06 0 3.65-2.17 3.65-5.31 0-2.79-2.01-4.76-4.88-4.76-3.35 0-5.32 2.5-5.32 5.1 0 1.01.39 2.09.88 2.73.1.12.11.22.08.34-.09.38-.3 1.2-.34 1.38-.05.23-.18.28-.4.17-1.5-.7-2.44-2.89-2.44-4.66 0-3.79 2.75-7.27 7.93-7.27 4.16 0 7.4 2.96 7.4 6.93 0 4.13-2.58 7.44-6.12 7.44-1.2 0-2.3-.62-2.68-1.35l-.74 2.8c-.26 1.02-1.01 2.29-1.52 3.04A12 12 0 1012 0z"/></svg>
            </a>
            <a href="#" class="social-link" aria-label="YouTube">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer-column">
          <h4 class="footer-title">Products</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/sauna-rooms">Sauna Rooms</NuxtLink></li>
            <li><NuxtLink to="/heaters">Heaters & Stones</NuxtLink></li>
            <li><NuxtLink to="/essential-oils">Essential Oils</NuxtLink></li>
            <li><NuxtLink to="/accessories">Wooden Accessories</NuxtLink></li>
            <li><NuxtLink to="/bundles">Bundle Deals</NuxtLink></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="footer-column">
          <h4 class="footer-title">Support</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/installation">Installation Guide</NuxtLink></li>
            <li><NuxtLink to="/warranty">Warranty</NuxtLink></li>
            <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
            <li><NuxtLink to="/shipping">Shipping & Returns</NuxtLink></li>
            <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
          </ul>
        </div>

        <!-- Newsletter -->
        <div class="footer-column">
          <h4 class="footer-title">Wellness Tips</h4>
          <p class="newsletter-desc">Subscribe for sauna wellness tips, exclusive offers, and new product updates.</p>
          <form class="newsletter-form" @submit.prevent>
            <input type="email" placeholder="Your email address" class="newsletter-input" />
            <button type="submit" class="newsletter-btn">Subscribe</button>
          </form>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p>&copy; 2026 Sipher Sauna. All rights reserved.</p>
        <div class="footer-bottom-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style lang="less" scoped>
.site-footer {
  background-color: @sauna-dark;
  color: #fff;
  padding: 80px 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
}

.footer-brand {
  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    margin-bottom: 16px;

    .logo-img {
      height: 40px;
      width: auto;
      display: block;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
      color: #fff;
      letter-spacing: 1px;
    }
  }

  .footer-desc {
    color: #aaa;
    font-size: 14px;
    line-height: 1.7;
    margin-bottom: 24px;
    max-width: 280px;
  }
}

.social-links {
  display: flex;
  gap: 12px;

  .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    color: #fff;
    transition: all 0.3s ease;

    svg {
      width: 18px;
      height: 18px;
    }

    &:hover {
      background-color: @sauna-wood;
      transform: translateY(-3px);
    }
  }
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #fff;
}

.footer-links {
  li {
    margin-bottom: 12px;

    a {
      color: #aaa;
      font-size: 14px;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: @sauna-wood-light;
      }
    }
  }
}

.newsletter-desc {
  color: #aaa;
  font-size: 14px;
  line-height: 1.6;
  margin-bottom: 20px;
}

.newsletter-form {
  display: flex;
  gap: 8px;
}

.newsletter-input {
  flex: 1;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;

  &::placeholder {
    color: #777;
  }

  &:focus {
    border-color: @sauna-wood-light;
  }
}

.newsletter-btn {
  padding: 12px 20px;
  background: @sauna-wood;
  color: @white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s ease;

  &:hover {
    background: darken(@sauna-wood, 10%);
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 14px;
  color: #777;

  .footer-bottom-links {
    display: flex;
    gap: 24px;

    a {
      color: #777;
      text-decoration: none;
      transition: color 0.3s ease;

      &:hover {
        color: @sauna-wood-light;
      }
    }
  }
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 36px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .newsletter-form {
    flex-direction: column;
  }
}
</style>