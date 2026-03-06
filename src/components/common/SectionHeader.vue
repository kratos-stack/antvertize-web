<script setup lang="ts">
import RevealOnScroll from './RevealOnScroll.vue'

defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleClass?: string
}>()
</script>

<template>
  <div class="section-header" :class="align === 'center' ? 'center' : 'left'">
    <RevealOnScroll v-if="eyebrow" as="span" :delay="0" :duration="600" direction="up" class="eyebrow">
      {{ eyebrow }}
    </RevealOnScroll>
    <RevealOnScroll as="h2" :delay="80" :duration="700" direction="up" :class="titleClass">
      {{ title }}
    </RevealOnScroll>
    <RevealOnScroll v-if="subtitle" as="p" :delay="160" :duration="700" direction="up" class="subtitle">
      {{ subtitle }}
    </RevealOnScroll>
  </div>
</template>

<style scoped>
.section-header { display: flex; flex-direction: column; gap: 16px; }
.section-header.center { align-items: center; text-align: center; }

:deep(.eyebrow) {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: rgba(139, 92, 246, 0.15);
  border: 1px solid rgba(139, 92, 246, 0.3);
  color: #c4b5fd;
  width: fit-content;
}

:deep(h2) {
  font-family: var(--font-heading);
  color: var(--color-primary);
}

:deep(.subtitle) {
  font-size: 18px;
  line-height: 1.7;
  color: var(--color-secondary);
  max-width: 580px;
}

.center :deep(.subtitle) { margin-inline: auto; }

@media (min-width: 1024px) {
  :deep(.subtitle) { font-size: 20px; }
}
</style>
