<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <NuxtLink :to="localePath('/')" class="logo">
            <img src="/images/logo/logo.png" alt="Sipher Sauna" class="logo-img">
            <span class="logo-text">Sipher Sauna</span>
          </NuxtLink>
          <p class="footer-desc">
            Premium home sauna solutions crafted with natural wood and advanced heating technology. Your wellness, our passion.
          </p>
          <ul v-if="contactLinks.length" class="footer-contact">
            <li v-for="link in contactLinks" :key="`${link.iconKey}-${link.url}`">
              <SocialIcon
                :icon-key="link.iconKey"
                :icon-source="link.iconSource"
                :icon-url="link.iconUrl"
                variant="contact"
                class="contact-icon"
              />
              <a :href="link.url">{{ getLinkDisplayText(link) }}</a>
              <span v-if="link.label" class="contact-tag">{{ link.label }}</span>
            </li>
          </ul>
          <div v-if="socialLinks.length" class="social-links">
            <a
              v-for="link in socialLinks"
              :key="`${link.iconKey}-${link.url}`"
              :href="link.url"
              class="social-link"
              :aria-label="getLinkAriaLabel(link)"
              :target="link.openInNewTab ? '_blank' : undefined"
              :rel="link.openInNewTab ? 'noopener noreferrer' : undefined"
            >
              <SocialIcon
                :icon-key="link.iconKey"
                :icon-source="link.iconSource"
                :icon-url="link.iconUrl"
                variant="social"
              />
            </a>
          </div>
        </div>

        <div class="footer-column">
          <h4 class="footer-title">{{ tm('footer.products') }}</h4>
          <ul class="footer-links">
            <li><NuxtLink :to="localePath('/products')">{{ tm('footer.saunaRooms') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/products')">{{ tm('footer.heatersStones') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/products')">{{ tm('footer.essentialOils') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/products')">{{ tm('footer.accessories') }}</NuxtLink></li>
            <li><NuxtLink :to="localePath('/products')">{{ tm('footer.bundles') }}</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4 class="footer-title">{{ tm('footer.support') }}</h4>
          <ul class="footer-links">
            <li><NuxtLink to="/installation">Installation Guide</NuxtLink></li>
            <li><NuxtLink to="/warranty">Warranty</NuxtLink></li>
            <li><NuxtLink to="/faq">FAQ</NuxtLink></li>
            <li><NuxtLink to="/shipping">Shipping & Returns</NuxtLink></li>
            <li><NuxtLink to="/about-us">About Us</NuxtLink></li>
            <li><NuxtLink :to="localePath('/news')">{{ tm('news.title') }}</NuxtLink></li>
            <li><NuxtLink to="/contact">Contact Us</NuxtLink></li>
          </ul>
        </div>

        <div class="footer-column footer-findus">
          <h4 class="footer-title">{{ tm('footer.findUs') }}</h4>
          <div class="map-wrapper">
            <iframe
              src="https://www.google.com/maps?q=汇力丰工业园+前进中路2号+南海区+佛山市+广东省&output=embed&z=15&hl=en"
              width="100%"
              height="200"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              title="Find Us on Google Maps"
            ></iframe>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>{{ tm('footer.copyright') }}</p>
        <div class="footer-bottom-links">
          <a href="#">{{ tm('footer.privacyPolicy') }}</a>
          <a href="#">{{ tm('footer.termsOfService') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { contactLinks, socialLinks, getLinkDisplayText, getLinkAriaLabel } = useContactLinks()
const { tm, localePath } = useI18nHelpers()
</script>

<style lang="less" scoped>
.site-footer {
  background-color: @sauna-dark;
  color: #fff;
  padding: 80px 0 24px;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.3fr 1fr 1fr 2.2fr;
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
    margin-bottom: 20px;
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
    overflow: hidden;

    svg,
    :deep(.social-icon svg) {
      width: 18px;
      height: 18px;
    }

    :deep(.brand-icon--wide) {
      width: calc(18px * 1.4);
      height: 18px;
    }

    .social-icon-img {
      height: 18px;
      width: auto;
      display: block;
      object-fit: contain;
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

.footer-findus {
  .map-wrapper {
    border-radius: 8px;
    overflow: hidden;

    iframe {
      display: block;
      border-radius: 8px;
    }
  }
}

@media (max-width: 992px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 20px;

  li {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #aaa;
    font-size: 14px;
    line-height: 1.5;

    .contact-icon,
    :deep(.social-icon--contact svg) {
      width: 16px;
      height: 16px;
      flex-shrink: 0;
      color: @sauna-wood-light;
    }

    a {
      color: #aaa;
      text-decoration: none;
      transition: color 0.3s ease;
      word-break: break-all;

      &:hover {
        color: @sauna-wood-light;
      }
    }

    .contact-tag {
      display: inline-block;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 600;
      color: @white;
      background: @sauna-wood;
      border-radius: 10px;
      letter-spacing: 0.3px;
      white-space: nowrap;
    }
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
}
</style>