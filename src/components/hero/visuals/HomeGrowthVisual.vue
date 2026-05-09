<script setup lang="ts">
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'
import VisualCard from './VisualCard.vue'

/**
 * 4 cols × 3 rows pulsing heatmap representing campaigns running across
 * audiences. Each cell has a heat level (low/mid/high) and a wave delay so
 * the grid breathes as a diagonal pulse. A few cells fire periodic "spike"
 * pulses to suggest live conversion events.
 */
type Heat = 'low' | 'mid' | 'high'

const cells: { heat: Heat; col: number; row: number; spike?: boolean }[] = [
  { heat: 'mid',  col: 0, row: 0 },
  { heat: 'high', col: 1, row: 0 },
  { heat: 'mid',  col: 2, row: 0 },
  { heat: 'low',  col: 3, row: 0 },
  { heat: 'high', col: 0, row: 1, spike: true },
  { heat: 'mid',  col: 1, row: 1 },
  { heat: 'high', col: 2, row: 1 },
  { heat: 'mid',  col: 3, row: 1 },
  { heat: 'low',  col: 0, row: 2 },
  { heat: 'mid',  col: 1, row: 2 },
  { heat: 'high', col: 2, row: 2 },
  { heat: 'high', col: 3, row: 2, spike: true },
]
</script>

<template>
  <VisualCard glow-color="violet" label="Predictable Growth Trajectory">
    <div class="metric-row">
      <FloatingBadge value="Performance" label="First Approach" variant="violet" icon="↑" />
      <FloatingBadge value="Predictable" label="Growth" variant="cyan" icon="✓" />
    </div>

    <div class="heatmap" aria-hidden="true">
      <div
        v-for="(cell, i) in cells"
        :key="i"
        class="cell"
        :class="[`heat-${cell.heat}`, { 'has-spike': cell.spike }]"
        :style="{
          '--wave-delay': `${(cell.col + cell.row) * 0.18}s`,
          '--spike-delay': `${1.6 + cell.col * 0.7 + cell.row * 0.4}s`,
        } as Record<string, string>"
      >
        <span class="cell-bar" />
        <span v-if="cell.spike" class="spike-ring" />
      </div>
    </div>

    <template #floating>
      <FloatingBadge value="10+" label="Years of Expertise" variant="emerald" icon="◆" class="badge-float-1" />
      <FloatingBadge value="Transparent" label="Reporting" variant="violet" icon="★" class="badge-float-2" />
    </template>
  </VisualCard>
</template>

<style scoped>
.metric-row {
  display: flex;
  gap: 12px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.heatmap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 44px);
  gap: 10px;
  margin-bottom: 16px;
}

.cell {
  position: relative;
  border-radius: 10px;
  border: 1px solid rgba(139, 92, 246, 0.18);
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.10), rgba(34, 211, 238, 0.06));
  overflow: hidden;
  isolation: isolate;
  animation: heat-wave 3.6s var(--ease-out-expo) infinite;
  animation-delay: var(--wave-delay);
}

.cell::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.55), transparent 65%);
  opacity: 0;
  z-index: 0;
  transition: opacity 0.6s var(--ease-out-expo);
  pointer-events: none;
}

.heat-low    { --heat-color: rgba(139, 92, 246, 0.18); --heat-bar: 38%; }
.heat-mid    { --heat-color: rgba(99,  102, 241, 0.42); --heat-bar: 60%; }
.heat-high   { --heat-color: rgba(34,  211, 238, 0.55); --heat-bar: 86%; }

.cell-bar {
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 8px;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(90deg, #8B5CF6, #22D3EE);
  transform-origin: left;
  transform: scaleX(var(--heat-bar));
  z-index: 1;
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.35);
}

@keyframes heat-wave {
  0%, 100% { background: linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(34, 211, 238, 0.04)); }
  45%      { background: linear-gradient(135deg, var(--heat-color), rgba(34, 211, 238, 0.10)); }
}

/* Spike — periodic ring pulse on a couple of cells, suggests "conversion event" */
.spike-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  z-index: 2;
  border: 1.5px solid rgba(244, 114, 182, 0.0);
  animation: spike 5.4s var(--ease-out-expo) infinite;
  animation-delay: var(--spike-delay);
}

@keyframes spike {
  0%, 88%, 100% {
    border-color: rgba(244, 114, 182, 0);
    box-shadow: 0 0 0 0 rgba(244, 114, 182, 0);
  }
  90% {
    border-color: rgba(244, 114, 182, 0.85);
    box-shadow: 0 0 14px 2px rgba(244, 114, 182, 0.55);
  }
  96% {
    border-color: rgba(244, 114, 182, 0.0);
    box-shadow: 0 0 28px 6px rgba(244, 114, 182, 0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .cell { animation: none; background: linear-gradient(135deg, var(--heat-color), rgba(34, 211, 238, 0.08)); }
  .spike-ring { animation: none; display: none; }
}

.badge-float-1 { position: absolute; bottom: -24px; left: -32px; }
.badge-float-2 { position: absolute; top: 20%; right: -40px; }
</style>
