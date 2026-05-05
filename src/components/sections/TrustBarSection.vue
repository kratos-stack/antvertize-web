<script setup lang="ts">
import type { TrustBarData } from '@/types/content'
import Container from '@/components/common/Container.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

defineProps<TrustBarData>()
</script>

<template>
  <section class="trust-bar-section" aria-label="Trusted across leading platforms">
    <Container>
      <RevealOnScroll direction="up" :duration="600">
        <div class="trust-inner">
          <span v-if="eyebrow" class="trust-eyebrow">{{ eyebrow }}</span>
          <ul class="trust-list" role="list">
            <li v-for="(item, idx) in items" :key="item" class="trust-item">
              <span class="trust-dot" aria-hidden="true" />
              <span class="trust-label">{{ item }}</span>
              <span v-if="idx < items.length - 1" class="trust-sep" aria-hidden="true">•</span>
            </li>
          </ul>
        </div>
      </RevealOnScroll>
    </Container>
  </section>
</template>

<style scoped>
.trust-bar-section {
  padding-block: 56px;
  background: var(--color-elevated);
  border-top: 1px solid var(--divider);
  border-bottom: 1px solid var(--divider);
}

@media (min-width: 1024px) {
  .trust-bar-section { padding-block: 72px; }
}

.trust-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  text-align: center;
}

.trust-eyebrow {
  display: inline-flex;
  padding: 6px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.5;
  text-transform: uppercase;
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.28);
  color: #c4b5fd;
}

.trust-list {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 14px 18px;
  margin: 0;
  padding: 0;
}

.trust-item {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: clamp(15px, 1.5vw, 18px);
  letter-spacing: 0.01em;
  color: var(--color-primary);
}

.trust-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(135deg, #8B5CF6, #22D3EE);
  flex-shrink: 0;
}

.trust-label { white-space: nowrap; }

.trust-sep {
  color: var(--color-muted);
  font-size: 14px;
  opacity: 0.5;
}

@media (max-width: 640px) {
  .trust-sep { display: none; }
  .trust-list { flex-direction: column; gap: 14px; }
}
</style>
