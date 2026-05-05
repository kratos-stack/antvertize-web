<script setup lang="ts">
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'

/**
 * SVG viewBox: 0 0 480 200.
 * Decorative milestones sit on a smooth Catmull-Rom-derived cubic Bezier so
 * dots are always exactly on the curve. No specific dates are claimed —
 * the visual represents a decade of growth without inventing a timeline.
 */
const milestones = [
  { id: 'm1', x: 24,  y: 170 },
  { id: 'm2', x: 168, y: 150 },
  { id: 'm3', x: 312, y: 85  },
  { id: 'm4', x: 456, y: 35  },
] as const

// Smooth cubic-bezier path passing exactly through all four milestones.
const linePath = 'M 24 170 C 48 167, 120 164, 168 150 C 216 136, 264 104, 312 85 C 360 66, 432 43, 456 35'

const areaPath = `${linePath} L 456 200 L 24 200 Z`
</script>

<template>
  <div class="visual-shell" aria-hidden="true">
    <div class="visual-card">
      <div class="visual-glow" />

      <div class="metric-row">
        <FloatingBadge value="10+" label="Years of Experience" variant="violet" icon="◆" />
        <FloatingBadge label="Performance-First" variant="cyan" icon="↑" />
      </div>

      <!-- SVG decade trajectory -->
      <svg
        class="trajectory"
        viewBox="0 0 480 200"
        preserveAspectRatio="none"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="line-grad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stop-color="#8B5CF6" />
            <stop offset="100%" stop-color="#22D3EE" />
          </linearGradient>
          <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="rgba(139,92,246,0.34)" />
            <stop offset="100%" stop-color="rgba(34,211,238,0.0)" />
          </linearGradient>
        </defs>

        <!-- Baseline grid -->
        <line x1="0" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.07)" stroke-width="1" />
        <line x1="0" y1="105" x2="480" y2="105" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="3 4" />

        <!-- Filled area below the curve -->
        <path
          class="area"
          :d="areaPath"
          fill="url(#area-grad)"
        />

        <!-- Trajectory line -->
        <path
          class="line"
          :d="linePath"
          stroke="url(#line-grad)"
          stroke-width="2.5"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          vector-effect="non-scaling-stroke"
        />

        <!-- Decorative dots on the curve — no dates claimed -->
        <g v-for="(m, i) in milestones" :key="m.id">
          <circle
            class="dot-halo"
            :cx="m.x"
            :cy="m.y"
            r="11"
            fill="rgba(139, 92, 246, 0.18)"
            :style="{ animationDelay: `${300 + i * 140}ms` } as Record<string, string>"
          />
          <circle
            class="dot"
            :cx="m.x"
            :cy="m.y"
            r="5.5"
            fill="#0B1020"
            stroke="url(#line-grad)"
            stroke-width="2"
            vector-effect="non-scaling-stroke"
            :style="{ animationDelay: `${i * 140}ms` } as Record<string, string>"
          />
        </g>
      </svg>

      <div class="visual-label">A Decade of Performance Advertising</div>
    </div>

    <FloatingBadge label="Transparent Reporting" variant="emerald" icon="◆" class="badge-float-1" />
    <FloatingBadge label="Custom Strategies" variant="violet" icon="★" class="badge-float-2" />
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
  top: -80px; right: -60px;
  width: 240px; height: 240px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%);
  pointer-events: none;
}

.metric-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }

/* Lock the SVG to its native viewBox aspect-ratio so dots stay circular
   and the curve doesn't get squashed when the column gets wider/narrower. */
.trajectory {
  display: block;
  width: 100%;
  aspect-ratio: 480 / 200;
  height: auto;
  margin-bottom: 4px;
}

.line {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw-line 1.6s var(--ease-out-expo) 0.2s forwards;
}

@keyframes draw-line {
  to { stroke-dashoffset: 0; }
}

.area {
  opacity: 0;
  animation: area-in 1.4s var(--ease-out-expo) 0.6s forwards;
}

@keyframes area-in {
  to { opacity: 1; }
}

.dot {
  opacity: 0;
  transform-origin: center;
  animation: dot-in 0.45s var(--ease-out-expo) forwards;
}

.dot-halo {
  opacity: 0;
  transform-origin: center;
  animation: halo-in 0.6s var(--ease-out-expo) forwards;
}

@keyframes dot-in {
  from { opacity: 0; transform: scale(0.4); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes halo-in {
  from { opacity: 0; transform: scale(0.4); }
  to   { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .line { stroke-dashoffset: 0; animation: none; }
  .area { opacity: 1; animation: none; }
  .dot, .dot-halo { opacity: 1; transform: none; animation: none; }
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
