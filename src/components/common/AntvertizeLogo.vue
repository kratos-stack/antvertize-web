<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Pixel height of the rendered logo. Width auto-scales. */
  height?: number
  /** Animate on mount / when scrolled into view. */
  animate?: boolean
  /** Replay the morph animation when the user hovers. */
  replayOnHover?: boolean
  /** `full` shows the wordmark; `mark` shows only the ant→a glyph. */
  variant?: 'full' | 'mark'
  /** Wordmark color. Defaults to currentColor for theming. */
  wordColor?: string
}>(), {
  height: 32,
  animate: true,
  replayOnHover: true,
  variant: 'full',
  wordColor: 'currentColor',
})

const root = ref<HTMLElement | null>(null)
const playKey = ref(0)
const uid = Math.random().toString(36).slice(2, 9)
const gradientId = `avgrad-${uid}`

let observer: IntersectionObserver | null = null
let hasPlayed = false

function play() {
  playKey.value = Date.now()
}

function onHover() {
  if (props.replayOnHover) play()
}

onMounted(() => {
  if (!props.animate || !root.value) return
  if (typeof IntersectionObserver === 'undefined') {
    play()
    return
  }
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !hasPlayed) {
          hasPlayed = true
          play()
          observer?.disconnect()
        }
      }
    },
    { threshold: 0.4 },
  )
  observer.observe(root.value)
})

onUnmounted(() => observer?.disconnect())

const viewBox = computed(() =>
  props.variant === 'mark' ? '0 0 32 40' : '0 0 200 40',
)
</script>

<template>
  <span
    ref="root"
    class="antvertize-logo"
    :class="{ animated: animate, 'variant-mark': variant === 'mark' }"
    :style="{ height: height + 'px', '--word-color': wordColor }"
    @mouseenter="onHover"
  >
    <svg
      :key="playKey"
      :viewBox="viewBox"
      preserveAspectRatio="xMinYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Antvertize"
      focusable="false"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B5CF6" />
          <stop offset="100%" stop-color="#22D3EE" />
        </linearGradient>
      </defs>

      <!--
        Group order: outer "walk" handles the entrance translation across the
        wordmark area; inner "bob" gives a subtle vertical wobble while walking.

        Inside, the ant is split into two paint layers so the head details
        (mandibles, antennae) draw on top of the head circle while the rest
        (legs, thorax, petiolar node, gaster) sit beside it. Both fade together
        into the head when the morph fires; the head circle then transitions
        from a filled ant head to the hollow bowl of the letter "a"; the stem
        strokes in to complete the "a". Wordmark "ntvertize" reveals last.
      -->
      <g class="walk">
        <g class="bob" :style="{ '--grad': `url(#${gradientId})` }">
          <!-- Ant body: parts behind/beside the head (drawn first). -->
          <g class="body body-rear">
            <!-- Jointed legs (3 in profile view, each with a clear knee) -->
            <g class="legs">
              <path d="M 22 22 L 18.5 25 L 16.5 31.5" />
              <path d="M 24 22 L 23 26.5 L 24 32" />
              <path d="M 26.5 22 L 30 26 L 32.5 31.5" />
            </g>

            <!-- Thorax (mesosoma) — small and slightly humped -->
            <ellipse class="thorax" cx="24" cy="21.2" rx="3.4" ry="3.6" />

            <!-- Petiolar node — the signature narrow ant waist with a bump -->
            <circle class="petiole" cx="29" cy="22.5" r="1.5" />

            <!-- Gaster (abdomen) — egg-shaped, slightly pointed at the rear -->
            <path
              class="gaster"
              d="M 30.5 22 C 30.5 17 35 16.2 36.5 16.2 C 40.2 16.2 41.6 19 41.6 22 C 41.6 25 40.2 27.8 36.5 27.8 C 35 27.8 30.5 27 30.5 22 Z"
            />
          </g>

          <!-- Head / 'a' bowl. Same circle through the whole animation;
               only its fill/stroke change at the morph moment. -->
          <circle class="bowl" cx="14" cy="22" r="8" />

          <!-- Ant body: parts on the head (drawn on top of bowl). -->
          <g class="body body-face">
            <!-- Elbowed antennae (the ant's signature feature) -->
            <path class="antenna" d="M 11 14.2 L 8 8.5 L 9 2.5" />
            <path class="antenna" d="M 17 14.2 L 20 8.5 L 19 2.5" />

            <!-- Mandibles — small forward-pointing pincers (ant faces left) -->
            <path class="mandible" d="M 7 21.5 Q 4 20 2.5 18.5" />
            <path class="mandible" d="M 7 23 Q 4 24.5 2.5 26" />
          </g>

          <!-- 'a' stem with a small bottom flick — drawn after the morph. -->
          <path
            class="stem"
            d="M 22 14 L 22 28.5 Q 22 30 23.6 30"
            pathLength="100"
          />
        </g>
      </g>

      <!-- Wordmark: "ntvertize" — reveals after the morph completes. -->
      <g v-if="variant === 'full'" class="wordmark">
        <text
          x="25"
          y="30"
          font-family="'Sora', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-weight="700"
          font-size="24"
          letter-spacing="-0.4"
        >ntvertize</text>
      </g>
    </svg>
  </span>
</template>

<style scoped>
.antvertize-logo {
  display: inline-flex;
  align-items: center;
  line-height: 0;
  user-select: none;
}

.antvertize-logo svg {
  display: block;
  height: 100%;
  width: auto;
  overflow: visible;
}

/* Brand-gradient strokes/fills for ant + glyph parts. */
.body .antenna,
.body .legs > path {
  fill: none;
  stroke: var(--grad);
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.body .mandible {
  fill: none;
  stroke: var(--grad);
  stroke-width: 1.2;
  stroke-linecap: round;
}

.body .thorax,
.body .gaster,
.body .petiole {
  fill: var(--grad);
}

.bowl {
  fill: var(--grad);
  fill-opacity: 1;
  stroke: var(--grad);
  stroke-width: 0;
}

.stem {
  fill: none;
  stroke: var(--grad);
  stroke-width: 2.6;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}

.wordmark text {
  fill: var(--word-color);
}

/* ────── Animation timeline (only when .animated is set) ──────
   Runs at 75% speed (every duration/delay scaled by ~1.333×).
   0.00s  ant enters from the right, walking left across the area
   1.87s  walk completes; head sits at final position
   2.07s  body, legs, antennae collapse into the head
   2.07s  head fill→stroke transition (becomes "a" bowl)
   2.47s  stem strokes in from top to bottom
   2.67s  wordmark fades in with a small horizontal slide
   ───────────────────────────────────────────────────────────── */

.animated:not(.variant-mark) .walk {
  animation: av-walk 1.87s cubic-bezier(0.22, 1, 0.36, 1) both;
  transform-box: fill-box;
}

.animated:not(.variant-mark) .bob {
  animation: av-bob 0.293s ease-in-out 0s 6 both;
  transform-origin: center;
  transform-box: fill-box;
}

/* In mark mode there's no room to walk across — skip straight to the morph. */
.animated.variant-mark .body { display: none; }

.animated .body {
  animation: av-body-vanish 0.6s cubic-bezier(0.4, 0, 0.6, 1) 2.07s forwards;
  transform-origin: 14px 22px;
  transform-box: view-box;
}

.animated .bowl {
  animation: av-bowl-morph 0.6s cubic-bezier(0.4, 0, 0.6, 1) 2.07s forwards;
}

.animated .stem {
  animation: av-stem-draw 0.67s cubic-bezier(0.4, 0, 0.2, 1) 2.47s forwards;
}

.animated .wordmark {
  opacity: 0;
  animation: av-word-reveal 0.8s cubic-bezier(0.22, 1, 0.36, 1) 2.67s forwards;
  transform-origin: left center;
  transform-box: fill-box;
}

/* Subtle leg/antenna life while walking. */
.animated .body .legs > path {
  animation: av-leg-step 0.293s ease-in-out 0s 6 both;
  transform-origin: top center;
  transform-box: fill-box;
}
.animated .body .legs > path:nth-child(2) {
  animation-delay: 0.147s;
}
.animated .body .antenna {
  animation: av-antenna-wave 0.67s ease-in-out 0s 3 both;
  transform-origin: bottom center;
  transform-box: fill-box;
}

/* Static (non-animated) presentation: show the final logo immediately. */
:not(.animated) .body { display: none; }
:not(.animated) .bowl { fill-opacity: 0; stroke-width: 2.6; }
:not(.animated) .stem { stroke-dashoffset: 0; }
:not(.animated) .wordmark { opacity: 1; }

/* Keyframes */
@keyframes av-walk {
  0%   { transform: translateX(170px); opacity: 0; }
  6%   { opacity: 1; }
  100% { transform: translateX(0); opacity: 1; }
}

@keyframes av-bob {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-1px); }
}

@keyframes av-leg-step {
  0%, 100% { transform: rotate(-6deg); }
  50%      { transform: rotate(6deg); }
}

@keyframes av-antenna-wave {
  0%, 100% { transform: rotate(-3deg); }
  50%      { transform: rotate(3deg); }
}

@keyframes av-body-vanish {
  0%   { opacity: 1; transform: scale(1) translateX(0); }
  60%  { opacity: 0.6; }
  100% { opacity: 0; transform: scale(0.4) translateX(-6px); }
}

@keyframes av-bowl-morph {
  0%   { fill-opacity: 1; stroke-width: 0; }
  100% { fill-opacity: 0; stroke-width: 2.6; }
}

@keyframes av-stem-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes av-word-reveal {
  0%   { opacity: 0; transform: translateX(-6px); }
  100% { opacity: 1; transform: translateX(0); }
}

/* Respect users who prefer reduced motion: jump to the final state. */
@media (prefers-reduced-motion: reduce) {
  .animated .walk,
  .animated .bob,
  .animated .body,
  .animated .bowl,
  .animated .stem,
  .animated .wordmark,
  .animated .body .legs > path,
  .animated .body .antenna {
    animation: none;
  }
  .animated .body { display: none; }
  .animated .bowl { fill-opacity: 0; stroke-width: 2.6; }
  .animated .stem { stroke-dashoffset: 0; }
  .animated .wordmark { opacity: 1; }
}
</style>
