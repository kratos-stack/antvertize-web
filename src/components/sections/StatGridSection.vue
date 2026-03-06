<script setup lang="ts">
import type { StatItem } from '@/types/content'
import Container from '@/components/common/Container.vue'
import SpotlightCard from '@/components/surfaces/SpotlightCard.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

defineProps<{ items: StatItem[] }>()
</script>

<template>
  <section class="stat-section">
    <Container>
      <ul class="stat-grid" role="list">
        <li v-for="(item, idx) in items" :key="item.value">
          <RevealOnScroll :delay="idx * 80" :duration="700" direction="up">
            <SpotlightCard class="stat-card">
              <span class="stat-value">{{ item.value }}</span>
              <span class="stat-title">{{ item.title }}</span>
              <p class="stat-desc">{{ item.description }}</p>
            </SpotlightCard>
          </RevealOnScroll>
        </li>
      </ul>
    </Container>
  </section>
</template>

<style scoped>
.stat-section { padding-block: 72px; }

@media (min-width: 1024px) { .stat-section { padding-block: 120px; } }

.stat-grid {
  list-style: none;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) { .stat-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .stat-grid { grid-template-columns: repeat(4, 1fr); } }

.stat-card { padding: 32px 28px; display: flex; flex-direction: column; gap: 8px; }

.stat-value {
  font-family: var(--font-heading);
  font-size: clamp(36px, 4vw, 52px);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #F8FAFC, rgba(139, 92, 246, 0.95));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.stat-title { font-size: 15px; font-weight: 600; color: var(--color-primary); }
.stat-desc { font-size: 14px; line-height: 1.6; color: var(--color-muted); }
</style>
