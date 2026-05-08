<script setup lang="ts">
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'
import VisualCard from './VisualCard.vue'

/**
 * SVG viewBox: 0 0 480 200.
 * Decorative milestones sit on a smooth Catmull-Rom-derived cubic Bezier so
 * dots are always exactly on the curve. A "comet" pulse loops along the path
 * after the initial draw to suggest a journey-in-progress.
 */
const milestones = [
  { id: 'm1', x: 24,  y: 170 },
  { id: 'm2', x: 168, y: 150 },
  { id: 'm3', x: 312, y: 85  },
  { id: 'm4', x: 456, y: 35  },
] as const

const linePath = 'M 24 170 C 48 167, 120 164, 168 150 C 216 136, 264 104, 312 85 C 360 66, 432 43, 456 35'
const areaPath = `${linePath} L 456 200 L 24 200 Z`
</script>

<template>
  <VisualCard glow-color="violet" label="A Decade of Performance Advertising">
    <div class="metric-row">
      <FloatingBadge value="10+" label="Years of Experience" variant="violet" icon="◆" />
      <FloatingBadge label="Performance-First" variant="cyan" icon="↑" />
    </div>

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
        <radialGradient id="comet-grad" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stop-color="#F8FAFC" stop-opacity="1" />
          <stop offset="40%" stop-color="#22D3EE" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#22D3EE" stop-opacity="0" />
        </radialGradient>
        <path id="trajectory-path" :d="linePath" />
      </defs>

      <!-- Background grid (vertical) — fades in left→right with the curve -->
      <g class="grid-lines">
        <line x1="120" y1="20" x2="120" y2="190" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="2 6" />
        <line x1="240" y1="20" x2="240" y2="190" stroke="rgba(255,255,255,0.05)" stroke-width="1" stroke-dasharray="2 6" />
        <line x1="360" y1="20" x2="360" y2="190" stroke="rgba(255,255,255,0.06)" stroke-width="1" stroke-dasharray="2 6" />
      </g>

      <!-- Baseline grid (horizontal) -->
      <line x1="0" y1="170" x2="480" y2="170" stroke="rgba(255,255,255,0.07)" stroke-width="1" />
      <line x1="0" y1="105" x2="480" y2="105" stroke="rgba(255,255,255,0.04)" stroke-width="1" stroke-dasharray="3 4" />

      <!-- Filled area below the curve -->
      <path class="area" :d="areaPath" fill="url(#area-grad)" />

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

      <!-- Comet pulse looping along the path -->
      <g class="comet-group">
        <circle r="9" fill="url(#comet-grad)" opacity="0.55">
          <animateMotion dur="5.5s" repeatCount="indefinite" begin="2s" rotate="auto">
            <mpath href="#trajectory-path" />
          </animateMotion>
        </circle>
        <circle r="3" fill="#F8FAFC">
          <animateMotion dur="5.5s" repeatCount="indefinite" begin="2s" rotate="auto">
            <mpath href="#trajectory-path" />
          </animateMotion>
        </circle>
      </g>

      <!-- Milestones on the curve -->
      <g
        v-for="(m, i) in milestones"
        :key="m.id"
        class="milestone"
        :style="{ animationDelay: `${i * 140}ms` } as Record<string, string>"
      >
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

    <template #floating>
      <FloatingBadge label="Transparent Reporting" variant="emerald" icon="◆" class="badge-float-1" />
      <FloatingBadge label="Custom Strategies" variant="violet" icon="★" class="badge-float-2" />
    </template>
  </VisualCard>
</template>

<style scoped>
.metric-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }

.trajectory {
  display: block;
  width: 100%;
  aspect-ratio: 480 / 200;
  height: auto;
  margin-bottom: 4px;
  overflow: visible;
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

.grid-lines line {
  opacity: 0;
  animation: fade-in 0.8s var(--ease-out-expo) forwards;
}
.grid-lines line:nth-child(1) { animation-delay: 0.5s; }
.grid-lines line:nth-child(2) { animation-delay: 0.7s; }
.grid-lines line:nth-child(3) { animation-delay: 0.9s; }

@keyframes fade-in { to { opacity: 1; } }

.dot {
  opacity: 0;
  transform-origin: center;
  animation: dot-in 0.45s var(--ease-out-expo) forwards;
  transition: r 320ms var(--ease-out-expo), filter 320ms var(--ease-out-expo);
}

.dot-halo {
  opacity: 0;
  transform-origin: center;
  animation: halo-in 0.6s var(--ease-out-expo) forwards;
  transition: r 320ms var(--ease-out-expo), opacity 320ms var(--ease-out-expo);
}

.milestone:hover .dot {
  r: 7;
  filter: drop-shadow(0 0 8px rgba(34, 211, 238, 0.7));
}

.milestone:hover .dot-halo {
  r: 16;
  opacity: 0.6;
}

@keyframes dot-in {
  from { opacity: 0; transform: scale(0.4); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes halo-in {
  from { opacity: 0; transform: scale(0.4); }
  to   { opacity: 1; transform: scale(1); }
}

.comet-group {
  filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.6));
}

@media (prefers-reduced-motion: reduce) {
  .line { stroke-dashoffset: 0; animation: none; }
  .area { opacity: 1; animation: none; }
  .dot, .dot-halo { opacity: 1; transform: none; animation: none; }
  .grid-lines line { opacity: 1; animation: none; }
  .comet-group { display: none; }
}

.badge-float-1 { position: absolute; bottom: -24px; left: -32px; }
.badge-float-2 { position: absolute; top: 20%; right: -40px; }
</style>
