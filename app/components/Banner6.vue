<template>
  <section class="banner-6">
    <div class="container">
      <div class="section-header">
        <span class="subtitle">Case Studies</span>
        <h2 class="title">Global Successful Sauna Project Cases</h2>
        <p class="desc">Years of experience in global sauna export business. We have completed thousands of residential saunas, commercial spa saunas, hotel and wellness center projects with mature implementation experience.</p>
      </div>

      <div class="cases-grid">
        <!-- Case 1 -->
        <div class="case-card large">
          <div class="case-image">
            <img src="/images/home/LuxuryVillaSauna.png" alt="Luxury Villa Project" loading="lazy" />
          </div>
          <div class="case-overlay">
            <span class="case-tag">Residential</span>
            <h3>Luxury Villa Sauna</h3>
            <p>Private wellness retreat</p>
          </div>
        </div>

        <!-- Case 2 -->
        <div class="case-card">
          <div class="case-image">
            <img src="/images/home/Five-StarResort.png" alt="Hotel Spa" loading="lazy" />
          </div>
          <div class="case-overlay">
            <span class="case-tag">Hotel</span>
            <h3>Five-Star Resort</h3>
            <p>Premium guest experience</p>
          </div>
        </div>

        <!-- Case 3 -->
        <div class="case-card">
          <div class="case-image">
            <img src="/images/home/PremiumFitnessClub.png" alt="Fitness Center" loading="lazy" />
          </div>
          <div class="case-overlay">
            <span class="case-tag">Gym</span>
            <h3>Premium Fitness Club</h3>
            <p>Member wellness facility</p>
          </div>
        </div>

        <!-- Case 4 -->
        <div class="case-card">
          <div class="case-image">
            <img src="/images/home/CommercialSpa.png" alt="Spa Center" loading="lazy" />
          </div>
          <div class="case-overlay">
            <span class="case-tag">Spa</span>
            <h3>Commercial Spa</h3>
            <p>High-capacity solution</p>
          </div>
        </div>

        <!-- Case 5 -->
        <div class="case-card large">
          <div class="case-image">
            <img src="/images/home/MedicalWellnessCenter.png" alt="Wellness Center" loading="lazy" />
          </div>
          <div class="case-overlay">
            <span class="case-tag">Wellness</span>
            <h3>Medical Wellness Center</h3>
            <p>Health-focused design</p>
          </div>
        </div>
      </div>

      <div class="cta-wrapper">
        <a href="#" class="cta-btn">View More Cases</a>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style lang="less" scoped>
.banner-6 {
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

.cases-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 280px);
  gap: 20px;
  margin-bottom: 50px;
}

.case-card {
  position: relative;
  border-radius: 10px;
  overflow: hidden;

  &.large {
    grid-column: span 2;
  }

  &:hover {
    .case-image img {
      transform: scale(1.08);
    }

    .case-overlay {
      background: rgba(45, 32, 22, 0.85);
    }
  }
}

.case-image {
  position: absolute;
  inset: 0;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
}

.case-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 30px;
  background: rgba(45, 32, 22, 0.65);
  transition: background 0.4s ease;
  color: @white;

  .case-tag {
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 6px 14px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
    margin-bottom: 16px;
    width: fit-content;
  }

  h3 {
    font-size: 26px;
    font-weight: 700;
    margin: 0 0 10px;
  }

  p {
    font-size: 18px;
    margin: 0;
    opacity: 0.85;
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
  .banner-6 {
    padding: 80px 0;
  }

  .title {
    font-size: 42px;
  }

  .desc {
    font-size: 18px;
  }

  .cases-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 250px);
  }

  .case-card.large {
    grid-column: span 2;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 32px;
  }

  .desc {
    font-size: 16px;
  }

  .cases-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .case-card.large {
    grid-column: span 1;
  }

  .case-card {
    height: 280px;
  }
}
</style>