<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
  <div class="marquee-band" aria-hidden="true">
    <div class="marquee-track">
      <span v-for="(item, i) in [...items, ...items, ...items]" :key="i" class="marquee-item">
        {{ item }}
        <span class="marquee-sep" aria-hidden="true">✦</span>
      </span>
    </div>
    <div class="fade-left" aria-hidden="true" />
    <div class="fade-right" aria-hidden="true" />
  </div>
</template>

<style scoped>
.marquee-band {
  position: relative;
  overflow: hidden;
  padding-block: 20px;
  border-top: 1px solid var(--divider);
  border-bottom: 1px solid var(--divider);
  background: var(--color-elevated);
}

.marquee-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: marquee-scroll 32s linear infinite;
  gap: 0;
}

.marquee-track:hover { animation-play-state: paused; }

@keyframes marquee-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-33.333%); }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track { animation: none; }
}

.marquee-item {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding-inline: 24px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-muted);
  white-space: nowrap;
}

.marquee-sep {
  color: rgba(139, 92, 246, 0.5);
  font-size: 10px;
}

.fade-left, .fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  pointer-events: none;
  z-index: 1;
}

.fade-left {
  left: 0;
  background: linear-gradient(to right, var(--color-elevated), transparent);
}

.fade-right {
  right: 0;
  background: linear-gradient(to left, var(--color-elevated), transparent);
}
</style>
