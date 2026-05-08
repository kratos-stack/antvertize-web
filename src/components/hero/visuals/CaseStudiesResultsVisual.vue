<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'
import VisualCard from './VisualCard.vue'

type Trend = 'up' | 'down'
interface Result {
  id: string
  target: number
  unit: 'x' | 'pct'
  prefix: '+' | '−'
  decimals: number
  label: string
  caption: string
  trend: Trend
}

const results: Result[] = [
  { id: 'roi',   target: 2.5, unit: 'x',   prefix: '+', decimals: 1, label: 'Increase in ROI',   caption: 'Case Study 1', trend: 'up'   },
  { id: 'reach', target: 3,   unit: 'x',   prefix: '+', decimals: 0, label: 'Increase in Reach', caption: 'Case Study 2', trend: 'up'   },
  { id: 'cpc',   target: 35,  unit: 'pct', prefix: '−', decimals: 0, label: 'Lower CPC',         caption: 'Case Study 3', trend: 'down' },
]

const displayed = ref<number[]>(results.map(() => 0))
const upPaths = ref<string[]>(results.map(() => ''))
const downPaths = ref<string[]>(results.map(() => ''))

function format(r: Result, value: number): string {
  const v = r.decimals > 0 ? value.toFixed(r.decimals) : Math.round(value).toString()
  return `${r.prefix}${v}${r.unit === 'x' ? '×' : '%'}`
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3)
}

let countRaf = 0
let sparkInterval: ReturnType<typeof setInterval> | null = null
let started = false

function buildPath(points: Array<[number, number]>): string {
  return points
    .map(([x, y], idx) => `${idx === 0 ? 'M' : 'L'}${x} ${y}`)
    .join(' ')
}

function basePath(trend: Trend, jitter = 0): string {
  if (trend === 'up') {
    return buildPath([
      [2,  22],
      [14, 16 + jitter],
      [24, 19 - jitter],
      [36, 10 + jitter],
      [46, 12 - jitter],
      [62, 4],
    ])
  }
  return buildPath([
    [2,  4],
    [14, 8  - jitter],
    [24, 6  + jitter],
    [36, 14 - jitter],
    [46, 11 + jitter],
    [62, 22],
  ])
}

function regenerateSparks() {
  results.forEach((r, i) => {
    const jitter = (Math.random() - 0.5) * 4
    if (r.trend === 'up') {
      upPaths.value[i] = basePath('up', jitter)
    } else {
      downPaths.value[i] = basePath('down', jitter)
    }
  })
}

function startCountUp() {
  const duration = 1600
  const start = performance.now()
  const step = (now: number) => {
    const t = Math.min(1, (now - start) / duration)
    const eased = easeOutCubic(t)
    displayed.value = results.map((r) => r.target * eased)
    if (t < 1) countRaf = requestAnimationFrame(step)
  }
  countRaf = requestAnimationFrame(step)
}

const rootEl = ref<HTMLElement | null>(null)

onMounted(() => {
  if (typeof window === 'undefined') return
  // initial spark paths
  regenerateSparks()

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduced) {
    displayed.value = results.map((r) => r.target)
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !started) {
          started = true
          startCountUp()
          // Begin periodic redraws after counts settle.
          sparkInterval = setInterval(regenerateSparks, 8000)
          observer.disconnect()
        }
      }
    },
    { threshold: 0.4 },
  )

  if (rootEl.value) observer.observe(rootEl.value)
})

onBeforeUnmount(() => {
  if (countRaf) cancelAnimationFrame(countRaf)
  if (sparkInterval) clearInterval(sparkInterval)
})
</script>

<template>
  <div ref="rootEl" class="visual-root">
    <VisualCard glow-color="cyan" label="Recent Outcomes">
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
            <span class="value">{{ format(r, displayed[i] ?? 0) }}</span>
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
              <path :d="upPaths[i]" stroke="url(#spark-up)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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
              <path :d="downPaths[i]" stroke="url(#spark-down)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
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

      <template #floating>
        <FloatingBadge label="Lower CPA" variant="emerald" icon="↓" class="badge-float-1" />
        <FloatingBadge label="Higher ROI" variant="violet" icon="↑" class="badge-float-2" />
      </template>
    </VisualCard>
  </div>
</template>

<style scoped>
.visual-root { position: relative; }

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
  transition: border-color 320ms var(--ease-out-expo), transform 320ms var(--ease-out-expo), box-shadow 320ms var(--ease-out-expo);
}

.result-tile:hover {
  border-color: rgba(139, 92, 246, 0.55);
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(139, 92, 246, 0.18);
}

@keyframes tile-in {
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .result-tile { opacity: 1; transform: none; animation: none; }
}

.tile-left { display: flex; flex-direction: column; gap: 2px; min-width: 0; }

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
  font-variant-numeric: tabular-nums;
}

.label {
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.tile-right { display: flex; align-items: center; gap: 12px; flex-shrink: 0; }

.caption { font-size: 12px; color: var(--color-secondary); white-space: nowrap; }

.spark {
  width: 64px;
  height: 24px;
  display: block;
  transition: opacity 0.6s var(--ease-out-expo);
}

.spark path {
  transition: d 0.9s var(--ease-out-expo);
}

.badge-float-1 { position: absolute; bottom: -24px; left: -32px; }
.badge-float-2 { position: absolute; top: 20%; right: -40px; }
</style>
