<template>
  <div class="contact-page">
    <section class="contact-hero">
      <div class="hero-container">
        <h1 class="hero-title">{{ tm('contact.heroTitle') }}</h1>
        <p class="hero-subtitle">{{ tm('contact.heroSubtitle') }}</p>
      </div>
    </section>

    <section class="contact-content">
      <div class="content-container">
        <div class="form-section">
          <h2 class="section-title">{{ tm('contact.formTitle') }}</h2>
          <p class="section-subtitle">{{ tm('contact.formSubtitle') }}</p>

          <form class="contact-form" @submit.prevent="handleSubmit" novalidate>
            <div class="form-row">
              <div class="form-group">
                <label for="name">{{ tm('contact.name') }} <span class="required">*</span></label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  :placeholder="tm('contact.namePlaceholder')"
                  :class="{ error: errors.name }"
                >
                <span v-if="errors.name" class="error-message">{{ errors.name }}</span>
              </div>
              <div class="form-group">
                <label for="email">{{ tm('contact.email') }} <span class="required">*</span></label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  :placeholder="tm('contact.emailPlaceholder')"
                  :class="{ error: errors.email }"
                >
                <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="phone">{{ tm('contact.phone') }}</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  :placeholder="tm('contact.phonePlaceholder')"
                >
              </div>
              <div class="form-group">
                <label for="company">{{ tm('contact.company') }}</label>
                <input
                  id="company"
                  v-model="form.company"
                  type="text"
                  :placeholder="tm('contact.companyPlaceholder')"
                >
              </div>
            </div>

            <div class="form-group">
              <label for="address">{{ tm('contact.address') }}</label>
              <input
                id="address"
                v-model="form.address"
                type="text"
                :placeholder="tm('contact.addressPlaceholder')"
              >
            </div>

            <div class="form-group">
              <label for="subject">{{ tm('contact.subject') }}</label>
              <select id="subject" v-model="form.subject">
                <option value="">{{ tm('contact.subjectPlaceholder') }}</option>
                <option value="home-custom">{{ tm('contact.subjectHomeCustom') }}</option>
                <option value="commercial-spa">{{ tm('contact.subjectCommercialSpa') }}</option>
                <option value="equipment-parts">{{ tm('contact.subjectEquipmentParts') }}</option>
                <option value="other">{{ tm('contact.subjectOther') }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="products">{{ tm('contact.products') }}</label>
              <input
                id="products"
                v-model="form.products"
                type="text"
                :placeholder="tm('contact.productsPlaceholder')"
              >
            </div>

            <div class="form-group">
              <label for="message">{{ tm('contact.message') }} <span class="required">*</span></label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                :placeholder="tm('contact.messagePlaceholder')"
                :class="{ error: errors.message }"
              ></textarea>
              <span v-if="errors.message" class="error-message">{{ errors.message }}</span>
            </div>

            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="!isSubmitting">{{ tm('contact.submit') }}</span>
              <span v-else>{{ tm('contact.submitting') }}</span>
            </button>

            <Transition name="fade">
              <div v-if="submitStatus === 'success'" class="form-status success">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <span>{{ tm('contact.successMessage') }}</span>
              </div>
            </Transition>

            <Transition name="fade">
              <div v-if="submitStatus === 'error'" class="form-status error">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <span>{{ tm('contact.errorMessage') }}</span>
              </div>
            </Transition>
          </form>
        </div>

        <div class="info-section">
          <div class="contact-cards">
            <h3 class="info-title">{{ tm('contact.infoTitle') }}</h3>

            <div class="info-card">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div class="info-content">
                <h4>{{ tm('contact.factoryAddressTitle') }}</h4>
                <p>{{ tm('contact.factoryAddress') }}</p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div class="info-content">
                <h4>{{ tm('contact.emailTitle') }}</h4>
                <p>info@siphersauna.com</p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div class="info-content">
                <h4>{{ tm('contact.hotlineTitle') }}</h4>
                <p>
                  <a href="tel:+8615999977665" class="contact-link">+86 159-9997-7665</a>
                  <span class="whatsapp-tag">WhatsApp</span>
                </p>
              </div>
            </div>

            <div class="info-card">
              <div class="info-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              </div>
              <div class="info-content">
                <h4>{{ tm('contact.hoursTitle') }}</h4>
                <p style="white-space: pre-line;">{{ tm('contact.hoursValue') }}</p>
              </div>
            </div>
          </div>

          <div class="mission-card">
            <h3>{{ tm('contact.commitmentTitle') }}</h3>
            <p>{{ tm('contact.commitmentText') }}</p>
          </div>

          <div class="quick-links">
            <h3>{{ tm('contact.quickLinksTitle') }}</h3>
            <div class="links-grid">
              <NuxtLink
                v-for="category in categories"
                :key="category.slug"
                :to="getCategoryLink(category.slug)"
                class="quick-link"
              >
                {{ category.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { getAllSaunaCategories } from '~/data/sauna-categories'
import { useAnalytics } from '~/composables/useAnalytics'

definePageMeta({
  layout: 'default',
})

const config = useRuntimeConfig()
const { sendContactAnalytics } = useAnalytics()
const analyticsSiteId = config.public.analyticsSiteId as string
const { tm, localePath, locale } = useI18nHelpers()

useHead({
  title: computed(() => tm('contact.seoTitle')),
  htmlAttrs: { lang: locale },
  meta: [
    { name: 'description', content: computed(() => tm('contact.seoDescription')) },
  ],
})

const categories = getAllSaunaCategories()

const getCategoryLink = (slug: string): string => {
  const linkMap: Record<string, string> = {
    'outdoor-sauna': '/products/outdoor-sauna',
    'indoor-sauna': '/products/indoor-sauna',
  }
  return localePath(linkMap[slug] || '/products')
}

const form = reactive({
  name: '',
  email: '',
  phone: '',
  company: '',
  address: '',
  subject: '',
  products: '',
  message: '',
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const validateForm = () => {
  let isValid = true
  Object.keys(errors).forEach(key => delete errors[key])

  if (!form.name.trim()) {
    errors.name = tm('contact.validation.nameRequired')
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = tm('contact.validation.emailRequired')
    isValid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = tm('contact.validation.emailInvalid')
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = tm('contact.validation.messageRequired')
    isValid = false
  }

  return isValid
}

const getApiEndpoint = () => {
  const baseUrl = config.public.analyticsBaseUrl as string
  return `${baseUrl}/api/contact`
}

const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  submitStatus.value = 'idle'

  try {
    await sendContactAnalytics({
      action: 'contact_submit_attempt',
      form: 'contact_us',
      subject: form.subject || 'other',
    })

    const response = await fetch(getApiEndpoint(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        address: form.address,
        subject: form.subject,
        products: form.products,
        message: form.message,
        website: analyticsSiteId,
      }),
    })

    if (!response.ok) {
      throw new Error('Request failed')
    }

    submitStatus.value = 'success'

    await sendContactAnalytics({
      action: 'contact_submit_success',
      form: 'contact_us',
      subject: form.subject || 'other',
    })

    Object.keys(form).forEach(key => {
      form[key as keyof typeof form] = ''
    })

    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } catch {
    submitStatus.value = 'error'
    await sendContactAnalytics({
      action: 'contact_submit_failed',
      form: 'contact_us',
      reason: 'request_failed',
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="less" scoped>
@brand-cream: #F5F1EB;
@brand-wood: #8B5A2B;
@brand-wood-light: #C4A77D;
@brand-gold: #B8860B;
@brand-dark: #2D2016;
@text-dark: #333333;
@text-light: #777777;
@white: #FFFFFF;

.contact-page { background: @brand-cream; min-height: 100vh; }

.contact-hero {
  background: linear-gradient(135deg, @brand-dark 0%, #4A3728 100%);
  padding: 80px 40px; text-align: center; position: relative;
  &::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C4A77D' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
    opacity: 0.5;
  }
  @media (max-width: 768px) { padding: 60px 20px; }
}

.hero-container { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }

.hero-title {
  font-size: 2.5rem; font-weight: 700; color: @brand-cream;
  margin: 0 0 20px; letter-spacing: -0.02em;
  @media (max-width: 768px) { font-size: 1.75rem; }
}

.hero-subtitle {
  font-size: 1.1rem; color: rgba(245, 241, 235, 0.85);
  max-width: 600px; margin: 0 auto; line-height: 1.7;
  @media (max-width: 768px) { font-size: 1rem; }
}

.contact-content {
  padding: 80px 0;
  @media (max-width: 768px) { padding: 60px 0; }
}

.content-container {
  max-width: 1200px; margin: 0 auto; padding: 0 40px;
  display: grid; grid-template-columns: 1.2fr 1fr; gap: 60px;
  @media (max-width: 992px) { grid-template-columns: 1fr; padding: 0 20px; gap: 40px; }
}

.form-section {
  background: @white; padding: 40px; border-radius: 16px;
  border: 1px solid rgba(139, 90, 43, 0.1);
  @media (max-width: 768px) { padding: 24px; }
}

.section-title { font-size: 1.5rem; font-weight: 700; color: @brand-dark; margin: 0 0 8px; }
.section-subtitle { font-size: 0.9rem; color: @text-light; margin: 0 0 32px; line-height: 1.6; }

.contact-form { display: flex; flex-direction: column; gap: 20px; }

.form-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
  @media (max-width: 600px) { grid-template-columns: 1fr; }
}

.form-group {
  display: flex; flex-direction: column; gap: 8px;
  label { font-size: 0.875rem; font-weight: 500; color: @text-dark;
    .required { color: @brand-gold; }
  }
  input, select, textarea {
    padding: 12px 16px; border: 1px solid rgba(139, 90, 43, 0.2);
    border-radius: 8px; font-size: 1rem; color: @text-dark;
    background: @white; transition: border-color 0.2s ease, box-shadow 0.2s ease;
    &::placeholder { color: @text-light; opacity: 0.6; }
    &:focus { outline: none; border-color: @brand-wood; box-shadow: 0 0 0 3px rgba(139, 90, 43, 0.1); }
    &.error { border-color: #C4644A; }
  }
  select {
    cursor: pointer; appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238B5A2B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 16px center; padding-right: 40px;
  }
  textarea { resize: vertical; min-height: 120px; }
  .error-message { font-size: 0.75rem; color: #C4644A; }
}

.submit-btn {
  padding: 14px 32px; background: @brand-wood; color: @brand-cream;
  border: none; border-radius: 8px; font-size: 1rem; font-weight: 600;
  cursor: pointer; transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover:not(:disabled) { background: @brand-dark; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(45, 32, 22, 0.2); }
  &:disabled { opacity: 0.7; cursor: not-allowed; }
}

.form-status {
  display: flex; align-items: center; gap: 12px;
  padding: 16px; border-radius: 8px; font-size: 0.9rem;
  &.success { background: #E8F5E9; color: #5A8F5E; border: 1px solid #C5E1C5; }
  &.error { background: #FFEBE6; color: #C4644A; border: 1px solid #F0D4CA; }
}

.info-section { display: flex; flex-direction: column; gap: 24px; }

.info-title { font-size: 1.25rem; font-weight: 700; color: @brand-dark; margin: 0 0 16px; }

.contact-cards {
  background: @white; padding: 24px; border-radius: 16px;
  border: 1px solid rgba(139, 90, 43, 0.1);
}

.info-card {
  display: flex; gap: 16px; padding: 16px 0;
  border-bottom: 1px solid rgba(139, 90, 43, 0.1);
  &:last-child { border-bottom: none; padding-bottom: 0; }
  &:first-child { padding-top: 0; }
}

.info-icon {
  width: 48px; height: 48px; background: @brand-cream;
  border-radius: 12px; display: flex; align-items: center;
  justify-content: center; color: @brand-wood; flex-shrink: 0;
}

.info-content {
  h4 { font-size: 0.875rem; font-weight: 600; color: @text-dark; margin: 0 0 4px; }
  p { font-size: 0.9rem; color: @text-light; margin: 0; line-height: 1.6;
    .contact-link { color: @text-light; text-decoration: none; transition: color 0.3s ease;
      &:hover { color: @brand-wood; }
    }
    .whatsapp-tag { display: inline-block; padding: 2px 8px; font-size: 11px; font-weight: 600; color: @white; background: @brand-wood; border-radius: 10px; letter-spacing: 0.3px; margin-left: 8px; }
  }
}

.mission-card {
  background: @brand-dark; padding: 24px; border-radius: 16px;
  h3 { font-size: 1.1rem; font-weight: 700; color: @brand-cream; margin: 0 0 12px; }
  p { font-size: 0.9rem; color: rgba(245, 241, 235, 0.85); margin: 0; line-height: 1.7; }
}

.quick-links {
  background: @white; padding: 24px; border-radius: 16px; border: 1px solid rgba(139, 90, 43, 0.1);
  h3 { font-size: 1rem; font-weight: 700; color: @brand-dark; margin: 0 0 16px; }
}

.links-grid { display: flex; flex-wrap: wrap; gap: 8px; }

.quick-link {
  display: inline-block; padding: 8px 16px; background: @brand-cream;
  color: @text-light; font-size: 0.85rem; text-decoration: none;
  border-radius: 6px; transition: all 0.2s ease;
  &:hover { background: @brand-wood; color: @brand-cream; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>