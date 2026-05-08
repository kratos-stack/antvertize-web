<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

interface Props {
  glowColor?: 'violet' | 'cyan'
  label?: string
}

withDefaults(defineProps<Props>(), {
  glowColor: 'violet',
})

const wrapEl = ref<HTMLElement | null>(null)

const target = { rx: 0, ry: 0, mx: 50, my: 50, bx: 0, by: 0 }
const current = { rx: 0, ry: 0, mx: 50, my: 50, bx: 0, by: 0 }

let rafId = 0
let interactive = false

function tick() {
  const ease = 0.12
  current.rx += (target.rx - current.rx) * ease
  current.ry += (target.ry - current.ry) * ease
  current.mx += (target.mx - current.mx) * ease
  current.my += (target.my - current.my) * ease
  current.bx += (target.bx - current.bx) * ease
  current.by += (target.by - current.by) * ease

  const el = wrapEl.value
  if (el) {
    el.style.setProperty('--card-rx', `${current.rx.toFixed(2)}deg`)
    el.style.setProperty('--card-ry', `${current.ry.toFixed(2)}deg`)
    el.style.setProperty('--card-mx', `${current.mx.toFixed(1)}%`)
    el.style.setProperty('--card-my', `${current.my.toFixed(1)}%`)
    el.style.setProperty('--magnet-x', `${current.bx.toFixed(2)}px`)
    el.style.setProperty('--magnet-y', `${current.by.toFixed(2)}px`)
  }

  rafId = requestAnimationFrame(tick)
}

function onMove(e: PointerEvent) {
  if (!interactive || !wrapEl.value) return
  const rect = wrapEl.value.getBoundingClientRect()
  const x = (e.clientX - rect.left) / rect.width
  const y = (e.clientY - rect.top) / rect.height
  const cx = Math.max(0, Math.min(1, x))
  const cy = Math.max(0, Math.min(1, y))
  target.ry = (cx - 0.5) * 7
  target.rx = (0.5 - cy) * 5
  target.mx = cx * 100
  target.my = cy * 100
  target.bx = (cx - 0.5) * 14
  target.by = (cy - 0.5) * 10
}

function onLeave() {
  target.rx = 0
  target.ry = 0
  target.mx = 50
  target.my = 50
  target.bx = 0
  target.by = 0
}

onMounted(() => {
  if (typeof window === 'undefined') return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (reduced || !fine) return
  interactive = true
  rafId = requestAnimationFrame(tick)
})

onBeforeUnmount(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div
    ref="wrapEl"
    class="visual-shell"
    :class="`glow-${glowColor}`"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <div class="visual-card">
      <div class="conic-ring" aria-hidden="true" />
      <div class="visual-glow" aria-hidden="true" />
      <div class="visual-spotlight" aria-hidden="true" />
      <div class="visual-content">
        <slot />
        <div v-if="label" class="visual-label">{{ label }}</div>
      </div>
    </div>
    <slot name="floating" />
  </div>
</template>

<style scoped>
.visual-shell {
  position: relative;
  perspective: 1400px;
  --card-rx: 0deg;
  --card-ry: 0deg;
  --card-mx: 50%;
  --card-my: 50%;
  --magnet-x: 0px;
  --magnet-y: 0px;
}

.visual-card {
  position: relative;
  background: rgba(11, 16, 32, 0.7);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow: hidden;
  isolation: isolate;
  transform: rotateX(var(--card-rx)) rotateY(var(--card-ry));
  transform-style: preserve-3d;
  will-change: transform;
}

/* Slowly rotating conic outline ring — subtle "live data" border */
.conic-ring {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: conic-gradient(
    from var(--conic-from, 0deg),
    rgba(139, 92, 246, 0) 0deg,
    rgba(139, 92, 246, 0.55) 70deg,
    rgba(34, 211, 238, 0.55) 150deg,
    rgba(139, 92, 246, 0) 230deg,
    rgba(139, 92, 246, 0) 360deg
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  pointer-events: none;
  opacity: 0.55;
  z-index: 0;
  animation: conic-spin 12s linear infinite;
}

@property --conic-from {
  syntax: '<angle>';
  inherits: false;
  initial-value: 0deg;
}

@keyframes conic-spin {
  from { --conic-from: 0deg; }
  to   { --conic-from: 360deg; }
}

/* Breathing corner glow */
.visual-glow {
  position: absolute;
  top: -70px;
  right: -70px;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  animation: breathe 6.5s ease-in-out infinite;
  transform-origin: center;
}

.glow-violet .visual-glow {
  background: radial-gradient(circle, rgba(139, 92, 246, 0.32), transparent 70%);
}

.glow-cyan .visual-glow {
  background: radial-gradient(circle, rgba(34, 211, 238, 0.30), transparent 70%);
}

@keyframes breathe {
  0%, 100% { transform: scale(0.94); opacity: 0.85; }
  50%      { transform: scale(1.08); opacity: 1; }
}

/* Card-local cursor spotlight (separate from the section spotlight). */
.visual-spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    320px circle at var(--card-mx) var(--card-my),
    rgba(139, 92, 246, 0.18),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 380ms var(--ease-out-expo);
  z-index: 1;
  border-radius: inherit;
}

.visual-shell:hover .visual-spotlight {
  opacity: 1;
}

.visual-content {
  position: relative;
  z-index: 2;
}

.visual-label {
  margin-top: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--color-muted);
  letter-spacing: 0.06em;
  text-align: center;
  text-transform: uppercase;
}

/* Magnetic floating badges — slotted siblings of the card. */
:slotted(.badge-float-1),
:slotted(.badge-float-2) {
  transition: transform 480ms var(--ease-out-expo);
  will-change: transform;
}

.visual-shell :slotted(.badge-float-1) {
  transform: translate(calc(var(--magnet-x) * 0.4), calc(var(--magnet-y) * 0.4));
}

.visual-shell :slotted(.badge-float-2) {
  transform: translate(calc(var(--magnet-x) * -0.5), calc(var(--magnet-y) * -0.4));
}

@media (prefers-reduced-motion: reduce) {
  .visual-card { transform: none; }
  .conic-ring { animation: none; opacity: 0.4; }
  .visual-glow { animation: none; transform: scale(1); opacity: 0.9; }
  .visual-spotlight { display: none; }
  :slotted(.badge-float-1),
  :slotted(.badge-float-2) {
    transform: none !important;
    transition: none;
  }
}

/* Coarse pointer / no-hover devices — disable interactive effects, keep ambient ones. */
@media (hover: none), (pointer: coarse) {
  .visual-card { transform: none; }
  .visual-spotlight { display: none; }
  :slotted(.badge-float-1),
  :slotted(.badge-float-2) {
    transform: none !important;
  }
}
</style>
