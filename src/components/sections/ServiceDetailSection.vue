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
                  <span class="bullet-icon" aria-hidden="true">✦</span>
                  {{ bullet }}
                </li>
              </ul>
              <AppButton v-if="item.cta" :cta="item.cta" variant="secondary" />
            </div>
          </RevealOnScroll>

          <!-- Media column -->
          <RevealOnScroll
            :direction="isReversed(item, idx) ? 'left' : 'right'"
            :distance="32"
            :delay="100"
          >
            <div class="service-media">
              <div class="media-panel">
                <GradientBackdrop variant="subtle" />
                <div class="media-inner" aria-hidden="true">
                  <span class="media-label">{{ item.title }}</span>
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
  .service-detail-section { padding-block: 120px; }
}

.service-item {
  padding-block: 64px;
  border-bottom: 1px solid var(--divider);
}

.service-item:first-child { padding-top: 0; }
.service-item:last-child { border-bottom: none; padding-bottom: 0; }

.item-grid {
  display: grid;
  gap: 48px;
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
  gap: 20px;
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
  line-height: 1.1;
  color: var(--color-primary);
}

.service-subtitle {
  font-size: 16px;
  color: var(--color-muted);
  font-style: italic;
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
  color: #8B5CF6;
  flex-shrink: 0;
  font-size: 12px;
  margin-top: 4px;
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
}

@media (min-width: 1024px) {
  .media-panel { height: 420px; }
}

.media-inner {
  position: relative;
  z-index: 1;
  text-align: center;
}

.media-label {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.2);
}
</style>
