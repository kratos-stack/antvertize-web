<script setup lang="ts">
defineProps<{
  label: string
  value?: string
  icon?: string
  variant?: 'violet' | 'cyan' | 'emerald'
}>()
</script>

<template>
  <div class="floating-badge" :class="variant ?? 'violet'">
    <span v-if="icon" class="icon">{{ icon }}</span>
    <div class="text">
      <span v-if="value" class="value">{{ value }}</span>
      <span class="label">{{ label }}</span>
    </div>
  </div>
</template>

<style scoped>
.floating-badge {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 18px;
  border-radius: var(--radius-md);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  font-family: var(--font-body);
  font-size: 13px;
}

.violet {
  background: rgba(139, 92, 246, 0.18);
  border: 1px solid rgba(139, 92, 246, 0.32);
}

.cyan {
  background: rgba(34, 211, 238, 0.14);
  border: 1px solid rgba(34, 211, 238, 0.28);
}

.emerald {
  background: rgba(52, 211, 153, 0.14);
  border: 1px solid rgba(52, 211, 153, 0.28);
}

.icon { font-size: 16px; }

.text { display: flex; flex-direction: column; gap: 1px; }

.value {
  font-weight: 700;
  font-size: 16px;
  color: var(--color-primary);
  line-height: 1.2;
}

.label {
  color: var(--color-secondary);
  font-size: 12px;
  font-weight: 500;
}
</style>
