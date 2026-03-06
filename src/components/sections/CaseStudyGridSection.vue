<script setup lang="ts">
import type { CaseStudyItem } from '@/types/content'
import Container from '@/components/common/Container.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import GlassCard from '@/components/surfaces/GlassCard.vue'
import BadgePill from '@/components/common/BadgePill.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

defineProps<{
  items: CaseStudyItem[]
  title?: string
  eyebrow?: string
}>()
</script>

<template>
  <section class="case-study-section">
    <Container>
      <SectionHeader v-if="title" :eyebrow="eyebrow" :title="title" align="center" class="section-head" />
      <ul class="case-grid" role="list">
        <li v-for="(item, idx) in items" :key="item.id">
          <RevealOnScroll :delay="idx * 80" :duration="700" direction="up">
          <GlassCard hover glow class="case-card">
            <div class="case-category">{{ item.category }}</div>
            <h3 class="case-title">{{ item.title }}</h3>
            <p class="case-client">{{ item.client }}</p>
            <p class="case-summary">{{ item.summary }}</p>
            <div class="case-tags">
              <BadgePill v-for="tag in item.tags" :key="tag">{{ tag }}</BadgePill>
            </div>
          </GlassCard>
          </RevealOnScroll>
        </li>
      </ul>
    </Container>
  </section>
</template>

<style scoped>
.case-study-section { padding-block: 72px; }
@media (min-width: 1024px) { .case-study-section { padding-block: 120px; } }

.section-head { margin-bottom: 56px; }

.case-grid {
  list-style: none;
  display: grid;
  gap: 16px;
}

@media (min-width: 768px) { .case-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .case-grid { grid-template-columns: repeat(3, 1fr); } }

.case-card {
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
}

.case-category {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #8B5CF6;
}

.case-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.3;
}

.case-client {
  font-size: 14px;
  color: var(--color-muted);
  font-weight: 500;
}

.case-summary {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-secondary);
  flex: 1;
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 4px;
}
</style>
