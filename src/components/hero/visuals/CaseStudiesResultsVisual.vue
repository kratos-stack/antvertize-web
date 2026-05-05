<script setup lang="ts">
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'

const results = [
  { id: 'roi',   value: '2.5×', label: 'Increase in ROI',   caption: 'Case Study 1', trend: 'up' as const },
  { id: 'reach', value: '3×',   label: 'Increase in Reach', caption: 'Case Study 2', trend: 'up' as const },
  { id: 'cpc',   value: '35%', label: 'Lower CPC',         caption: 'Case Study 3', trend: 'down' as const },
]
</script>

<template>
  <div class="visual-shell" aria-hidden="true">
    <div class="visual-card">
      <div class="visual-glow" />

      <div class="metric-row">
        <FloatingBadge label="Real Results" variant="violet" icon="◆" />
        <FloatingBadge label="Real Growth" variant="cyan" icon="✦" />
      </div>

      <ul class="result-stack" role="list">
        <li
          v-for="(r, i) in results"
          :key="r.id"
          class="result-tile"
          :style="{ '--delay': `${i * 110}ms` } as Record<string, string>"
        >
          <div class="tile-left">
            <span class="value">{{ r.value }}</span>
            <span class="label">{{ r.label }}</span>
          </div>
          <div class="tile-right">
            <span class="caption">{{ r.caption }}</span>
            <svg
              v-if="r.trend === 'up'"
              class="spark up"
              viewBox="0 0 64 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M2 22 L14 16 L24 19 L36 10 L46 12 L62 4" stroke="url(#spark-up)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <defs>
                <linearGradient id="spark-up" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#8B5CF6" />
                  <stop offset="100%" stop-color="#22D3EE" />
                </linearGradient>
              </defs>
            </svg>
            <svg
              v-else
              class="spark down"
              viewBox="0 0 64 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M2 4 L14 8 L24 6 L36 14 L46 11 L62 22" stroke="url(#spark-down)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <defs>
                <linearGradient id="spark-down" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stop-color="#22D3EE" />
                  <stop offset="100%" stop-color="#34D399" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </li>
      </ul>

      <div class="visual-label">Recent Outcomes</div>
    </div>

    <FloatingBadge label="Lower CPA" variant="emerald" icon="↓" class="badge-float-1" />
    <FloatingBadge label="Higher ROI" variant="violet" icon="↑" class="badge-float-2" />
  </div>
</template>

<style scoped>
.visual-shell { position: relative; }

.visual-card {
  background: rgba(11, 16, 32, 0.7);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.visual-glow {
  position: absolute;
  top: -60px; right: -60px;
  width: 240px; height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.28), transparent 70%);
  pointer-events: none;
}

.metric-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }

.result-stack {
  list-style: none;
  margin: 0 0 16px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-tile {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 14px;
  opacity: 0;
  transform: translateY(8px);
  animation: tile-in 0.6s var(--ease-out-expo) forwards;
  animation-delay: var(--delay);
}

.result-tile:hover {
  border-color: rgba(139, 92, 246, 0.5);
}

@keyframes tile-in {
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .result-tile { opacity: 1; transform: none; animation: none; }
}

.tile-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.value {
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #F8FAFC, rgba(196, 181, 253, 0.95));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
}

.label {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.tile-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.caption {
  font-size: 12px;
  color: var(--color-secondary);
  white-space: nowrap;
}

.spark {
  width: 64px;
  height: 24px;
  display: block;
}

.visual-label {
  font-size: 12px;
  font-weight: 500;
  color: var(--color-muted);
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
}

.badge-float-1 { position: absolute; bottom: -24px; left: -32px; }
.badge-float-2 { position: absolute; top: 20%; right: -40px; }
</style>
