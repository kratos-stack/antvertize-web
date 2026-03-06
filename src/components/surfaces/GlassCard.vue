<script setup lang="ts">
defineProps<{
  hover?: boolean
  glow?: boolean
}>()
</script>

<template>
  <div class="glass-card" :class="{ 'hover-lift': hover, glow }">
    <slot />
  </div>
</template>

<style scoped>
.glass-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.glass-card.hover-lift {
  transition: transform var(--motion-base) var(--ease-out-expo),
              box-shadow var(--motion-base) var(--ease-out-expo),
              border-color var(--motion-base) ease;
}

.glass-card.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-glass);
  border-color: rgba(255, 255, 255, 0.2);
}

.glass-card.glow:hover {
  box-shadow: var(--shadow-glow), var(--shadow-glass);
}
</style>
