<script setup lang="ts">
import type { CardItem } from '@/types/content'
import Container from '@/components/common/Container.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import SpotlightCard from '@/components/surfaces/SpotlightCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

defineProps<{
  items: CardItem[]
  title?: string
  eyebrow?: string
}>()
</script>

<template>
  <section class="card-grid-section">
    <Container>
      <SectionHeader v-if="title" :eyebrow="eyebrow" :title="title" align="center" class="section-head" />
      <ul class="card-grid" role="list">
        <li v-for="(item, idx) in items" :key="item.id">
          <RevealOnScroll :delay="idx * 80" :duration="700" direction="up">
            <SpotlightCard class="card-inner">
              <span v-if="item.icon" class="card-icon">{{ item.icon }}</span>
              <h3 class="card-title">{{ item.title }}</h3>
              <p class="card-body">{{ item.body }}</p>
              <AppButton v-if="item.cta" :cta="item.cta" variant="ghost" size="sm" />
            </SpotlightCard>
          </RevealOnScroll>
        </li>
      </ul>
    </Container>
  </section>
</template>

<style scoped>
.card-grid-section { padding-block: 72px; }
@media (min-width: 1024px) { .card-grid-section { padding-block: 120px; } }

.section-head { margin-bottom: 56px; }

.card-grid {
  list-style: none;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) { .card-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .card-grid { grid-template-columns: repeat(3, 1fr); } }

.card-inner { padding: 32px; display: flex; flex-direction: column; gap: 16px; height: 100%; }
.card-icon { font-size: 28px; }
.card-title { font-size: 20px; font-weight: 600; color: var(--color-primary); }
.card-body { font-size: 15px; line-height: 1.7; color: var(--color-secondary); flex: 1; }
</style>
