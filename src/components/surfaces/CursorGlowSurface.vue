<script setup lang="ts">
import { useCursorGlow } from '@/composables/useCursorGlow'

defineProps<{
  color?: string
  radius?: string
}>()

const { setRef } = useCursorGlow()
</script>

<template>
  <div :ref="setRef" class="glow-surface" :style="`--glow-color: ${color ?? 'rgba(139,92,246,0.18)'}; --glow-radius: ${radius ?? '320px'}`">
    <div class="glow-layer" aria-hidden="true" />
    <slot />
  </div>
</template>

<style scoped>
.glow-surface {
  position: relative;
  --mouse-x: -999px;
  --mouse-y: -999px;
}

.glow-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    var(--glow-radius) circle at var(--mouse-x) var(--mouse-y),
    var(--glow-color),
    transparent 40%
  );
  z-index: 0;
  border-radius: inherit;
}

.glow-surface > :not(.glow-layer) {
  position: relative;
  z-index: 1;
}
</style>
