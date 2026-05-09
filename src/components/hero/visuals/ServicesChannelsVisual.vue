<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'
import VisualCard from './VisualCard.vue'

const channels = [
  { id: 'programmatic', label: 'Programmatic',          hue: 'violet', width: 78 },
  { id: 'ppc',          label: 'PPC Campaign Management', hue: 'cyan',   width: 92 },
  { id: 'social',       label: 'Social Media Advertising', hue: 'violet', width: 68 },
  { id: 'display',      label: 'Display & Retargeting',    hue: 'cyan',   width: 84 },
  { id: 'video',        label: 'Video Advertising',        hue: 'violet', width: 71 },
] as const

const activeIndex = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  if (typeof window === 'undefined') return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  intervalId = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % channels.length
  }, 2400)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <VisualCard glow-color="cyan" label="Integrated Channel Mix">
    <div class="metric-row">
      <FloatingBadge value="Integrated" label="Channel Mix" variant="violet" icon="◆" />
      <FloatingBadge value="Unified" label="Strategy" variant="cyan" icon="✦" />
    </div>

    <ul class="channel-list" role="list">
      <li
        v-for="(c, i) in channels"
        :key="c.id"
        :class="['channel-row', { active: activeIndex === i }]"
        :style="{
          '--delay': `${i * 90}ms`,
          '--bar-width': `${c.width}%`,
          '--sheen-delay': `${i * 0.45}s`,
        } as Record<string, string>"
      >
        <span class="dot" :class="`dot-${c.hue}`" />
        <span class="name">{{ c.label }}</span>
        <span class="bar-track">
          <span class="bar-fill">
            <span class="sheen" />
          </span>
        </span>
      </li>
    </ul>

    <template #floating>
      <FloatingBadge value="Performance" label="First Approach" variant="emerald" icon="↑" class="badge-float-1" />
      <FloatingBadge value="Transparent" label="Reporting" variant="violet" icon="★" class="badge-float-2" />
    </template>
  </VisualCard>
</template>

<style scoped>
.metric-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }

.channel-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.channel-row {
  display: grid;
  grid-template-columns: 8px minmax(0, 1.4fr) minmax(0, 2fr);
  align-items: center;
  gap: 12px;
  opacity: 0;
  transform: translateX(-8px);
  animation: slide-in 0.7s var(--ease-out-expo) forwards;
  animation-delay: var(--delay);
  transition: filter 320ms var(--ease-out-expo);
  filter: brightness(0.85) saturate(0.85);
}

.channel-row.active {
  filter: brightness(1.15) saturate(1.15);
}

@keyframes slide-in {
  to { opacity: 1; transform: translateX(0); }
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  transition: box-shadow 320ms var(--ease-out-expo), transform 320ms var(--ease-out-expo);
}

.dot-violet { background: linear-gradient(135deg, #8B5CF6, #6366F1); box-shadow: 0 0 6px rgba(139, 92, 246, 0.4); }
.dot-cyan   { background: linear-gradient(135deg, #22D3EE, #3B82F6); box-shadow: 0 0 6px rgba(34, 211, 238, 0.4); }

.channel-row.active .dot {
  transform: scale(1.25);
  box-shadow: 0 0 14px rgba(139, 92, 246, 0.85), 0 0 22px rgba(34, 211, 238, 0.5);
}

.name {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-secondary);
  white-space: nowrap;
  transition: color 320ms var(--ease-out-expo);
}

.channel-row.active .name {
  color: var(--color-primary);
}

.bar-track {
  position: relative;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  overflow: hidden;
  min-width: 0;
}

.bar-fill {
  position: absolute;
  inset: 0;
  width: var(--bar-width);
  background: linear-gradient(90deg, #8B5CF6, #22D3EE);
  border-radius: 999px;
  transform-origin: left;
  transform: scaleX(0);
  animation: bar-grow 1.1s var(--ease-out-expo) forwards;
  animation-delay: var(--delay);
  overflow: hidden;
}

@keyframes bar-grow {
  to { transform: scaleX(1); }
}

/* Diagonal sheen sweeps across each fill on a stagger — reads as continuous optimisation. */
.sheen {
  position: absolute;
  top: -30%;
  bottom: -30%;
  width: 30%;
  left: -40%;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.0) 20%,
    rgba(255, 255, 255, 0.55) 50%,
    rgba(255, 255, 255, 0.0) 80%,
    transparent 100%
  );
  transform: skewX(-22deg);
  animation: sheen-sweep 3.6s linear infinite;
  animation-delay: calc(var(--delay) + var(--sheen-delay) + 1.2s);
  mix-blend-mode: screen;
  pointer-events: none;
}

@keyframes sheen-sweep {
  0%   { left: -40%; opacity: 0; }
  10%  { opacity: 1; }
  60%  { opacity: 1; }
  100% { left: 110%; opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .channel-row { opacity: 1; transform: none; animation: none; filter: none; }
  .bar-fill    { transform: scaleX(1); animation: none; transition: none; }
  .sheen       { display: none; }
  .channel-row.active .dot { transform: none; }
}

.badge-float-1 { position: absolute; bottom: -24px; left: -32px; }
.badge-float-2 { position: absolute; top: 20%; right: -40px; }
</style>
