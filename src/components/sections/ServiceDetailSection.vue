<script setup lang="ts">
import type { ServiceItem } from '@/types/content'
import Container from '@/components/common/Container.vue'
import AppButton from '@/components/common/AppButton.vue'
import GradientBackdrop from '@/components/surfaces/GradientBackdrop.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

defineProps<{ items: ServiceItem[] }>()

function isReversed(item: ServiceItem, idx: number) {
  return item.layout === 'right' || (item.layout === undefined && idx % 2 !== 0)
}
</script>

<template>
  <section class="service-detail-section">
    <Container>
      <div
        v-for="(item, idx) in items"
        :id="item.id"
        :key="item.id"
        class="service-item"
        :class="{ reversed: isReversed(item, idx) }"
      >
        <div class="item-grid">
          <!-- Text column -->
          <RevealOnScroll
            :direction="isReversed(item, idx) ? 'right' : 'left'"
            :distance="32"
          >
            <div class="service-text">
              <span v-if="item.label" class="service-label">{{ item.label }}</span>
              <h2 class="service-title">{{ item.title }}</h2>
              <p v-if="item.subtitle" class="service-subtitle">{{ item.subtitle }}</p>
              <p v-for="(para, i) in item.body" :key="i" class="service-body">{{ para }}</p>
              <ul v-if="item.bullets?.length" class="service-bullets">
                <li v-for="bullet in item.bullets" :key="bullet">
                  <span class="bullet-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                  {{ bullet }}
                </li>
              </ul>
              <AppButton v-if="item.cta" :cta="item.cta" variant="secondary" />
            </div>
          </RevealOnScroll>

          <!-- Visual column -->
          <RevealOnScroll
            :direction="isReversed(item, idx) ? 'left' : 'right'"
            :distance="32"
            :delay="100"
          >
            <div class="service-media">
              <div class="media-panel">
                <GradientBackdrop variant="subtle" />

                <!-- KPI tiles when metrics are present -->
                <div v-if="item.metrics?.length" class="metrics-grid">
                  <div v-for="(m, i) in item.metrics" :key="i" class="metric-tile">
                    <span class="metric-value">{{ m.value }}</span>
                    <span class="metric-label">{{ m.label }}</span>
                  </div>
                </div>

                <!-- Fallback when no metrics provided: icon-led visual, never just empty space -->
                <div v-else class="media-fallback" aria-hidden="true">
                  <svg class="fb-glyph" viewBox="0 0 80 80" fill="none">
                    <defs>
                      <linearGradient id="fb-grad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stop-color="#8B5CF6" />
                        <stop offset="100%" stop-color="#22D3EE" />
                      </linearGradient>
                    </defs>
                    <circle cx="40" cy="40" r="34" stroke="url(#fb-grad)" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.6" />
                    <circle cx="40" cy="40" r="22" stroke="url(#fb-grad)" stroke-width="1.5" opacity="0.85" />
                    <circle cx="40" cy="40" r="6" fill="url(#fb-grad)" />
                  </svg>
                  <span class="fb-label">{{ item.label || item.title }}</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.service-detail-section {
  padding-block: 72px;
}

@media (min-width: 1024px) {
  .service-detail-section { padding-block: 96px; }
}

.service-item {
  padding-block: 56px;
  border-bottom: 1px solid var(--divider);
  scroll-margin-top: 100px;
}

.service-item:first-child { padding-top: 0; }
.service-item:last-child { border-bottom: none; padding-bottom: 0; }

.item-grid {
  display: grid;
  gap: 40px;
  align-items: center;
}

.service-item.reversed .item-grid {
  direction: rtl;
}

.service-item.reversed .item-grid > * {
  direction: ltr;
}

@media (min-width: 1024px) {
  .item-grid {
    grid-template-columns: 1fr 1fr;
    gap: 80px;
  }
}

.service-text {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.service-label {
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #c4b5fd;
  width: fit-content;
}

.service-title {
  font-size: clamp(26px, 3vw, 40px);
  line-height: 1.15;
  letter-spacing: -0.01em;
  color: var(--color-primary);
}

.service-subtitle {
  font-size: 15px;
  color: var(--color-muted);
  font-weight: 500;
  letter-spacing: 0.02em;
}

.service-body {
  font-size: 16px;
  line-height: 1.75;
  color: var(--color-secondary);
}

.service-bullets {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  margin: 4px 0 0;
}

.service-bullets li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 15px;
  color: var(--color-secondary);
  line-height: 1.6;
}

.bullet-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(34, 211, 238, 0.18));
  border: 1px solid rgba(139, 92, 246, 0.4);
  color: #c4b5fd;
  flex-shrink: 0;
  margin-top: 2px;
}

.service-media { order: -1; }

@media (min-width: 1024px) {
  .service-media { order: unset; }
}

.media-panel {
  position: relative;
  height: 320px;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background: var(--color-elevated);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

@media (min-width: 1024px) {
  .media-panel { height: 420px; padding: 36px; }
}

/* KPI tiles */
.metrics-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 12px;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  align-content: center;
}

.metric-tile {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 6px;
  padding: 20px 22px;
  border-radius: 16px;
  background: rgba(11, 16, 32, 0.55);
  border: 1px solid rgba(139, 92, 246, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform var(--motion-base) var(--ease-out-expo), border-color var(--motion-fast) ease;
}

.metric-tile:hover {
  transform: translateY(-2px);
  border-color: rgba(139, 92, 246, 0.45);
}

.metric-value {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: clamp(22px, 2.4vw, 32px);
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #F8FAFC, rgba(196, 181, 253, 0.95));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.metric-label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--color-muted);
  text-transform: uppercase;
}

/* Fallback when no metrics array is supplied. */
.media-fallback {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  text-align: center;
}

.fb-glyph {
  width: 96px;
  height: 96px;
  filter: drop-shadow(0 8px 24px rgba(139, 92, 246, 0.28));
  animation: fb-spin 18s linear infinite;
}

@keyframes fb-spin {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .fb-glyph { animation: none; }
}

.fb-label {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-muted);
}
</style>
