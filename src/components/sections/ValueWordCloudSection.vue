<script setup lang="ts">
import { useIntersectionReveal } from '@/composables/useIntersectionReveal'
import Container from '@/components/common/Container.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'

defineProps<{
  items: string[]
  title?: string
  eyebrow?: string
}>()

const { setRef, isVisible } = useIntersectionReveal()
const opacities = [1, 0.8, 0.6, 1, 0.7, 0.9, 0.65, 0.8]
</script>

<template>
  <section :ref="setRef" class="word-cloud-section reveal" :class="{ 'is-visible': isVisible }">
    <Container>
      <SectionHeader v-if="title" :eyebrow="eyebrow" :title="title" align="center" class="section-head" />
      <div class="word-cloud">
        <span
          v-for="(word, i) in items"
          :key="word"
          class="word"
          :style="{
            opacity: opacities[i % opacities.length],
            fontSize: `clamp(16px, ${1.2 + (i % 4) * 0.4}vw, ${20 + (i % 4) * 8}px)`,
          }"
        >{{ word }}</span>
      </div>
    </Container>
  </section>
</template>

<style scoped>
.word-cloud-section { padding-block: 72px; }
@media (min-width: 1024px) { .word-cloud-section { padding-block: 120px; } }

.section-head { margin-bottom: 56px; }

.word-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 28px;
  justify-content: center;
  max-width: 900px;
  margin-inline: auto;
}

.word {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, var(--color-primary), rgba(139, 92, 246, 0.7));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: default;
  transition: opacity var(--motion-fast) ease;
}

.word:hover { opacity: 1 !important; }
</style>
