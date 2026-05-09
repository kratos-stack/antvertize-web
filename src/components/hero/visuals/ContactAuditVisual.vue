<script setup lang="ts">
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'
import VisualCard from './VisualCard.vue'

const audit = [
  'Account Structure',
  'Targeting & Audiences',
  'Creative & Copy',
  'Conversion Tracking',
] as const

// Progress ring math: r=11, circumference ≈ 69.115
const RING_RADIUS = 11
const RING_CIRC = 2 * Math.PI * RING_RADIUS
</script>

<template>
  <VisualCard glow-color="violet" label="Free Audit of Your Current Campaigns">
    <div class="metric-row">
      <FloatingBadge value="Free" label="Performance Audit" variant="violet" icon="✦" />
      <FloatingBadge label="No Obligation" variant="cyan" icon="✓" />
    </div>

    <header class="checklist-head">
      <svg
        class="progress-ring"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#22D3EE" />
          </linearGradient>
        </defs>
        <circle
          class="ring-track"
          cx="16"
          cy="16"
          :r="RING_RADIUS"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          stroke-width="2.5"
        />
        <circle
          class="ring-fill"
          cx="16"
          cy="16"
          :r="RING_RADIUS"
          fill="none"
          stroke="url(#ring-grad)"
          stroke-width="2.5"
          stroke-linecap="round"
          :stroke-dasharray="RING_CIRC"
          :stroke-dashoffset="RING_CIRC"
          transform="rotate(-90 16 16)"
        />
        <path
          class="ring-check"
          d="M11 16.5l3.2 3.2L21 13"
          stroke="url(#ring-grad)"
          stroke-width="2.2"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill="none"
        />
      </svg>
      <span>Your Free Audit Includes</span>
    </header>

    <ul class="checklist" role="list">
      <li
        v-for="(item, i) in audit"
        :key="item"
        class="check-item"
        :style="{ '--delay': `${i * 160}ms` } as Record<string, string>"
      >
        <span class="check-circle" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <span class="check-text">{{ item }}</span>
      </li>
    </ul>

    <!-- One-shot scan-line sweep on reveal — evokes an audit running. -->
    <div class="scan-line" aria-hidden="true" />

    <template #floating>
      <FloatingBadge label="Programmatic · PPC" variant="emerald" icon="◆" class="badge-float-1" />
      <FloatingBadge label="Social · Display · Video" variant="violet" icon="✦" class="badge-float-2" />
    </template>
  </VisualCard>
</template>

<style scoped>
.metric-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }

.checklist-head {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-primary);
  margin-bottom: 16px;
}

.progress-ring { display: block; flex-shrink: 0; }

.ring-fill {
  /* circumference is 2πr ≈ 69.115 — use as dasharray + animate offset to 0. */
  animation: ring-fill 1.5s var(--ease-out-expo) 0.2s forwards;
}

@keyframes ring-fill {
  /* dashoffset 69.115 → 0 to fully fill the ring. */
  to { stroke-dashoffset: 0; }
}

.ring-check {
  stroke-dasharray: 18;
  stroke-dashoffset: 18;
  animation: ring-check 0.5s var(--ease-out-expo) 1.6s forwards;
  opacity: 0;
}

@keyframes ring-check {
  0%   { stroke-dashoffset: 18; opacity: 0; }
  20%  { opacity: 1; }
  100% { stroke-dashoffset: 0;  opacity: 1; }
}

.checklist {
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 10px;
  opacity: 0;
  transform: translateX(-8px);
  animation: check-in 0.5s var(--ease-out-expo) forwards;
  animation-delay: var(--delay);
}

@keyframes check-in {
  to { opacity: 1; transform: translateX(0); }
}

.check-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #22D3EE);
  flex-shrink: 0;
  transform: scale(0);
  animation: pop-in 0.5s var(--ease-out-expo) forwards;
  animation-delay: calc(var(--delay) + 200ms);
}

@keyframes pop-in {
  to { transform: scale(1); }
}

.check-text {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-secondary);
}

/* Scan-line sweep — runs once on mount, then settles. */
.scan-line {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(34, 211, 238, 0.0) 30%,
    rgba(34, 211, 238, 0.18) 50%,
    rgba(34, 211, 238, 0.0) 70%,
    transparent 100%
  );
  transform: translateY(-100%);
  animation: scan-sweep 2.6s var(--ease-out-expo) 0.4s 1 forwards;
  z-index: 3;
  mix-blend-mode: screen;
}

@keyframes scan-sweep {
  0%   { transform: translateY(-80px); opacity: 0; }
  20%  { opacity: 1; }
  90%  { opacity: 1; }
  100% { transform: translateY(640px); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .check-item   { opacity: 1; transform: none; animation: none; }
  .check-circle { animation: none; transform: scale(1); }
  .ring-fill    { stroke-dashoffset: 0; animation: none; }
  .ring-check   { stroke-dashoffset: 0; opacity: 1; animation: none; }
  .scan-line    { display: none; }
}

.badge-float-1 { position: absolute; bottom: -24px; left: -32px; }
.badge-float-2 { position: absolute; top: 20%; right: -40px; }
</style>
