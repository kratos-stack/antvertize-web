<script setup lang="ts">
import { useIntersectionReveal } from '@/composables/useIntersectionReveal'
import type { TextColumnsData } from '@/types/content'
import Container from '@/components/common/Container.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import GlassCard from '@/components/surfaces/GlassCard.vue'

defineProps<TextColumnsData>()

const { setRef, isVisible } = useIntersectionReveal()
</script>

<template>
  <section :ref="setRef" class="text-cols-section reveal" :class="{ 'is-visible': isVisible }">
    <Container>
      <SectionHeader v-if="title" :eyebrow="eyebrow" :title="title" align="center" class="section-head" />
      <div class="cols-grid stagger" :class="{ 'is-visible': isVisible }">
        <GlassCard v-for="col in columns" :key="col.heading" hover glow class="col-card">
          <h3 class="col-heading">{{ col.heading }}</h3>
          <p class="col-body">{{ col.body }}</p>
        </GlassCard>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.text-cols-section { padding-block: 72px; }
@media (min-width: 1024px) { .text-cols-section { padding-block: 120px; } }

.section-head { margin-bottom: 56px; }

.cols-grid {
  display: grid;
  gap: 16px;
}

@media (min-width: 640px) { .cols-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .cols-grid { grid-template-columns: repeat(3, 1fr); } }

.col-card {
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.col-heading {
  font-size: 20px;
  font-weight: 700;
  color: var(--color-primary);
}

.col-body {
  font-size: 15px;
  line-height: 1.75;
  color: var(--color-secondary);
}
</style>
