<script setup lang="ts">
defineProps<{
  variant?: 'default' | 'violet' | 'cyan' | 'emerald'
}>()
</script>

<template>
  <span class="badge-pill" :class="variant ?? 'default'">
    <slot />
  </span>
</template>

<style scoped>
.badge-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-body);
  letter-spacing: 0.02em;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  color: var(--color-secondary);
  white-space: nowrap;
}

.badge-pill.violet {
  background: rgba(139, 92, 246, 0.15);
  border-color: rgba(139, 92, 246, 0.3);
  color: #c4b5fd;
}

.badge-pill.cyan {
  background: rgba(34, 211, 238, 0.12);
  border-color: rgba(34, 211, 238, 0.28);
  color: #67e8f9;
}

.badge-pill.emerald {
  background: rgba(52, 211, 153, 0.12);
  border-color: rgba(52, 211, 153, 0.28);
  color: #6ee7b7;
}
</style>
