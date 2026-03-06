<script setup lang="ts">
import { computed } from 'vue'
import { useScrollReveal } from '@/composables/useScrollReveal'
import type { RevealDirection } from '@/composables/useScrollReveal'

const props = withDefaults(defineProps<{
  as?: string
  delay?: number
  duration?: number
  distance?: number
  direction?: RevealDirection
  once?: boolean
  threshold?: number
  rootMargin?: string
}>(), {
  as: 'div',
  delay: 0,
  duration: 700,
  distance: 24,
  direction: 'up',
  once: true,
  threshold: 0.1,
  rootMargin: '0px',
})

const { setRef, isVisible, prefersReducedMotion } = useScrollReveal({
  threshold: props.threshold,
  rootMargin: props.rootMargin,
  once: props.once,
})

const initialTransform = computed(() => {
  if (prefersReducedMotion || props.direction === 'none') return 'none'
  const d = props.distance
  switch (props.direction) {
    case 'up':    return `translate3d(0, ${d}px, 0)`
    case 'down':  return `translate3d(0, -${d}px, 0)`
    case 'left':  return `translate3d(${d}px, 0, 0)`
    case 'right': return `translate3d(-${d}px, 0, 0)`
    default:      return 'none'
  }
})

const inlineStyle = computed(() => ({
  '--rv-duration': `${props.duration}ms`,
  '--rv-delay': `${props.delay}ms`,
  '--rv-transform': initialTransform.value,
}))
</script>

<template>
  <component
    :is="as"
    :ref="setRef"
    :style="inlineStyle"
    class="scroll-reveal"
    :class="isVisible ? 'scroll-reveal--visible' : 'scroll-reveal--hidden'"
  >
    <slot />
  </component>
</template>

<style>
/* Global so child elements aren't affected by scoped hash */
.scroll-reveal {
  transition:
    opacity var(--rv-duration, 700ms) var(--ease-out-expo, cubic-bezier(0.22, 1, 0.36, 1)) var(--rv-delay, 0ms),
    transform var(--rv-duration, 700ms) var(--ease-out-expo, cubic-bezier(0.22, 1, 0.36, 1)) var(--rv-delay, 0ms),
    filter var(--rv-duration, 700ms) var(--ease-out-expo, cubic-bezier(0.22, 1, 0.36, 1)) var(--rv-delay, 0ms);
}

.scroll-reveal--hidden {
  opacity: 0;
  transform: var(--rv-transform, translate3d(0, 24px, 0));
  filter: blur(4px);
}

.scroll-reveal--visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
  filter: blur(0px);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-reveal {
    transition: none !important;
  }
  .scroll-reveal--hidden {
    opacity: 1 !important;
    transform: none !important;
    filter: none !important;
  }
}
</style>
