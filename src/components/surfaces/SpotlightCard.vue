<script setup lang="ts">
import { useCursorGlow } from '@/composables/useCursorGlow'

const { setRef } = useCursorGlow()
</script>

<template>
  <div :ref="setRef" class="spotlight-card">
    <div class="spotlight-overlay" aria-hidden="true" />
    <div class="spotlight-content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.spotlight-card {
  position: relative;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: transform var(--motion-base) var(--ease-out-expo),
              border-color var(--motion-base) ease;
  --mouse-x: 50%;
  --mouse-y: 50%;
}

.spotlight-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.18);
}

.spotlight-overlay {
  position: absolute;
  inset: 0;
  opacity: 0;
  background: radial-gradient(
    280px circle at var(--mouse-x) var(--mouse-y),
    rgba(139, 92, 246, 0.14),
    transparent 40%
  );
  transition: opacity var(--motion-base) ease;
  pointer-events: none;
  border-radius: inherit;
}

.spotlight-card:hover .spotlight-overlay {
  opacity: 1;
}

.spotlight-content {
  position: relative;
  z-index: 1;
}
</style>
