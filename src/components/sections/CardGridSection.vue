<script setup lang="ts">
import type { CardItem } from '@/types/content'
import Container from '@/components/common/Container.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import SpotlightCard from '@/components/surfaces/SpotlightCard.vue'
import AppButton from '@/components/common/AppButton.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'
import ServiceIcon from '@/components/common/ServiceIcon.vue'

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
        <li v-for="(item, idx) in items" :key="item.id" class="card-cell">
          <RevealOnScroll :delay="idx * 80" :duration="700" direction="up" class="reveal-cell">
            <SpotlightCard class="card-inner">
              <!-- Icon block: distinct visual area, generous space below -->
              <div v-if="item.icon" class="card-icon-block">
                <span class="card-icon">
                  <ServiceIcon :name="item.icon" />
                </span>
              </div>

              <!-- Content group: tighter rhythm between title / body / cta -->
              <div class="card-content">
                <h3 class="card-title">{{ item.title }}</h3>
                <p class="card-body">{{ item.body }}</p>
                <AppButton
                  v-if="item.cta"
                  :cta="item.cta"
                  variant="ghost"
                  size="sm"
                  class="card-cta"
                />
              </div>
            </SpotlightCard>
          </RevealOnScroll>
        </li>
      </ul>
    </Container>
  </section>
</template>

<style scoped>
.card-grid-section {
  padding-block: 72px 56px;
}

@media (min-width: 1024px) {
  .card-grid-section { padding-block: 100px 72px; }
}

.section-head { margin-bottom: 48px; }

.card-grid {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 16px;
  margin: 0;
  padding: 0;
}

.card-cell {
  flex: 1 1 280px;
  max-width: 360px;
  display: flex;
  align-items: stretch;
}

.reveal-cell {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
}

.card-inner {
  padding: 32px 28px 28px;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  width: 100%;
}

/* ─── Icon block — own row, separated by extra space below ─── */
.card-icon-block {
  margin-bottom: 28px;
}

.card-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.32), rgba(34, 211, 238, 0.18));
  border: 1px solid rgba(139, 92, 246, 0.5);
  color: #fff;
  box-shadow:
    0 8px 22px rgba(139, 92, 246, 0.22),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
}

/* ─── Content group — tight rhythm ─── */
.card-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
}

.card-title {
  font-family: var(--font-heading);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.005em;
  color: var(--color-primary);
  line-height: 1.25;
}

.card-body {
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--color-secondary);
  flex: 1;
}

.card-cta {
  align-self: flex-start;
  margin-top: 4px;
  padding-inline: 0 !important;
  color: #c4b5fd;
}

.card-cta:hover {
  color: #fff;
  border-color: transparent !important;
  transform: translateX(2px);
}
</style>
