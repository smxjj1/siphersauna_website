<template>
  <section class="banner-8">
    <div class="container">
      <div class="section-header" :class="{ 'zh-wide': isZh }">
        <span class="subtitle">{{ tm('faq.subtitle') }}</span>
        <h2 class="title">{{ tm('faq.title') }}</h2>
        <p class="desc">{{ tm('faq.desc') }}</p>
      </div>

      <div class="faq-list">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item"
          :class="{ active: activeIndex === index }"
        >
          <button class="faq-question" @click="toggleFaq(index)">
            <span class="question-number">Q{{ index + 1 }}</span>
            <span class="question-text">{{ faq.question }}</span>
            <span class="faq-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 5v14M5 12h14"/>
              </svg>
            </span>
          </button>
          <div class="faq-answer" :style="{ maxHeight: activeIndex === index ? '200px' : '0' }">
            <p>{{ faq.answer }}</p>
          </div>
        </div>
      </div>

      <div class="cta-wrapper">
        <a href="#" class="cta-btn">{{ tm('faq.viewAll') }}</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeIndex = ref(null)
const { tm } = useI18nHelpers()
const currentLocale = useLocale()
const isZh = computed(() => currentLocale.value.startsWith('zh'))

const fallbackFaqs = [
  {
    question: 'Are sauna rooms suitable for long-term daily home use?',
    answer: 'All household sauna products are specially designed for family scenarios, featuring safe constant temperature, low energy consumption and quiet operation, completely suitable for long-term daily wellness use.',
  },
  {
    question: 'Are sauna accessories universal and available for separate replacement?',
    answer: 'Most sauna accessories are universal and replaceable, including sauna heaters, temperature controllers, wooden buckets, sauna stones, backrests and more. We support retail and bulk purchase.',
  },
  {
    question: 'Do you support overseas project customization and export?',
    answer: 'We support global export, non-standard customization, international voltage adaptation and complete certification to meet commercial standards of different countries.',
  },
  {
    question: 'Do you provide installation guidance and after-sales service?',
    answer: 'We provide complete installation drawings, video guidance, lifelong technical consultation and professional after-sales maintenance service.',
  },
  {
    question: 'What are the advantages of wholesale and engineering orders?',
    answer: 'Direct factory supply without middlemen. We provide customized packaging, OEM branding, bulk discount price and stable delivery schedule for wholesale and project clients.',
  },
]

const faqs = computed(() => {
  const list = useTmArray('faq.items')
  return list.length ? list : fallbackFaqs
})

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style lang="less" scoped>
.banner-8 {
  padding: 100px 0;
  background-color: @white;
}

.section-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.section-header.zh-wide {
  max-width: 900px;
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

.faq-list {
  max-width: 900px;
  margin: 0 auto 50px;
}

.faq-item {
  border-bottom: 1px solid #e8e8e8;

  &.active {
    .faq-icon {
      svg {
        transform: rotate(45deg);
      }
    }

    .faq-question {
      color: @sauna-wood;
    }
  }
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: color 0.3s ease;

  &:hover {
    color: @sauna-wood;
  }

  .question-number {
    flex-shrink: 0;
    font-size: 18px;
    font-weight: 700;
    color: @sauna-wood;
    background: rgba(139, 90, 43, 0.1);
    padding: 6px 14px;
    border-radius: 4px;
  }

  .question-text {
    flex: 1;
    font-size: 22px;
    font-weight: 600;
    color: @text-color;
  }

  .faq-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid @sauna-wood;
    border-radius: 50%;
    transition: all 0.3s ease;

    svg {
      width: 18px;
      height: 18px;
      color: @sauna-wood;
      transition: transform 0.3s ease;
    }
  }
}

.faq-answer {
  overflow: hidden;
  transition: max-height 0.4s ease;

  p {
    padding: 0 0 30px 60px;
    font-size: 20px;
    color: @light-text;
    line-height: 1.8;
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
  .banner-8 {
    padding: 80px 0;
  }

  .title {
    font-size: 42px;
  }

  .desc {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
  }

  .desc {
    font-size: 16px;
  }

  .faq-question {
    padding: 22px 0;

    .question-text {
      font-size: 18px;
    }

    .question-number {
      display: none;
    }
  }

  .faq-answer p {
    padding-left: 0;
    font-size: 16px;
  }
}
</style>