<script setup lang="ts">
import type { CTABannerData } from '@/types/content'
import Container from '@/components/common/Container.vue'
import AppButton from '@/components/common/AppButton.vue'
import GradientBackdrop from '@/components/surfaces/GradientBackdrop.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

defineProps<CTABannerData>()
</script>

<template>
  <section class="cta-section">
    <GradientBackdrop variant="cta" />
    <Container>
      <div class="cta-inner">
        <RevealOnScroll v-if="eyebrow" :delay="0">
          <span class="cta-eyebrow">{{ eyebrow }}</span>
        </RevealOnScroll>
        <RevealOnScroll :delay="80">
          <h2 class="cta-title">{{ title }}</h2>
        </RevealOnScroll>
        <RevealOnScroll v-if="description" :delay="160">
          <p class="cta-desc">{{ description }}</p>
        </RevealOnScroll>
        <RevealOnScroll :delay="240">
          <div class="cta-actions">
            <AppButton v-if="primaryCta" :cta="primaryCta" variant="primary" size="lg" />
            <AppButton v-if="secondaryCta" :cta="secondaryCta" variant="secondary" size="lg" />
          </div>
        </RevealOnScroll>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.cta-section {
  position: relative;
  padding-block: 80px;
  background: var(--color-elevated);
  border-top: 1px solid var(--divider);
  border-bottom: 1px solid var(--divider);
  overflow: hidden;
}

@media (min-width: 1024px) {
  .cta-section { padding-block: 120px; }
}

.cta-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  max-width: 720px;
  margin-inline: auto;
}

.cta-eyebrow {
  display: inline-flex;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  line-height: 1.5;
  text-transform: uppercase;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #c4b5fd;
}

.cta-title {
  font-size: clamp(28px, 4vw, 52px);
  line-height: 1.08;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #F8FAFC, rgba(139, 92, 246, 0.85));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.cta-desc {
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-secondary);
  max-width: 500px;
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding-top: 8px;
}
</style>
