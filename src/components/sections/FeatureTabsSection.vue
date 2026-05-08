<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import type { FeatureTabsData } from '@/types/content'
import Container from '@/components/common/Container.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

const props = defineProps<FeatureTabsData>()

const tabs = computed(() => props.tabs ?? [])
const autoplayMs = computed(() => props.autoplayMs ?? 6500)

const activeIndex = ref(0)
const progress = ref(0)
const isHovering = ref(false)
const isVisible = ref(false)
const direction = ref<'forward' | 'backward'>('forward')

const sectionRef = ref<HTMLElement | null>(null)
const railRef = ref<HTMLElement | null>(null)
const railItemRefs = ref<HTMLElement[]>([])

const prefersReducedMotion = ref(false)

let rafId: number | null = null
let lastTs: number | null = null
let observer: IntersectionObserver | null = null

function setActive(index: number, fromUser = false) {
  const max = tabs.value.length
  if (max === 0) return
  if (index < 0) index = max - 1
  if (index >= max) index = 0
  direction.value = index >= activeIndex.value || (activeIndex.value === max - 1 && index === 0)
    ? 'forward'
    : 'backward'
  activeIndex.value = index
  progress.value = 0
  lastTs = null
  if (fromUser) {
    nextTick(() => scrollRailItemIntoView(index))
  }
}

function scrollRailItemIntoView(index: number) {
  const el = railItemRefs.value[index]
  const list = railRef.value
  if (!el || !list) return
  const elRect = el.getBoundingClientRect()
  const listRect = list.getBoundingClientRect()
  const isHorizontal = window.matchMedia('(max-width: 1023px)').matches
  if (isHorizontal) {
    if (elRect.left < listRect.left || elRect.right > listRect.right) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
    }
  }
}

function tick(ts: number) {
  if (prefersReducedMotion.value) return
  if (!isVisible.value || isHovering.value || document.hidden) {
    lastTs = ts
    rafId = window.requestAnimationFrame(tick)
    return
  }
  if (lastTs == null) lastTs = ts
  const delta = ts - lastTs
  lastTs = ts
  progress.value += (delta / autoplayMs.value) * 100
  if (progress.value >= 100) {
    setActive(activeIndex.value + 1)
  }
  rafId = window.requestAnimationFrame(tick)
}

function onKeyDown(e: KeyboardEvent) {
  const goNext = ['ArrowDown', 'ArrowRight'].includes(e.key)
  const goPrev = ['ArrowUp', 'ArrowLeft'].includes(e.key)
  if (goNext) {
    e.preventDefault()
    setActive(activeIndex.value + 1, true)
  } else if (goPrev) {
    e.preventDefault()
    setActive(activeIndex.value - 1, true)
  } else if (e.key === 'Home') {
    e.preventDefault()
    setActive(0, true)
  } else if (e.key === 'End') {
    e.preventDefault()
    setActive(tabs.value.length - 1, true)
  }
}

let touchStartX = 0
let touchStartY = 0
function onTouchStart(e: TouchEvent) {
  const t = e.touches[0]
  if (!t) return
  touchStartX = t.clientX
  touchStartY = t.clientY
}
function onTouchEnd(e: TouchEvent) {
  const t = e.changedTouches[0]
  if (!t) return
  const dx = t.clientX - touchStartX
  const dy = t.clientY - touchStartY
  if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return
  setActive(activeIndex.value + (dx < 0 ? 1 : -1), true)
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  if (sectionRef.value) {
    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry) isVisible.value = entry.isIntersecting
      },
      { threshold: 0.2 },
    )
    observer.observe(sectionRef.value)
  }
  if (!prefersReducedMotion.value) {
    rafId = window.requestAnimationFrame(tick)
  }
})

onBeforeUnmount(() => {
  if (rafId != null) cancelAnimationFrame(rafId)
  observer?.disconnect()
})

watch(activeIndex, (i) => {
  nextTick(() => scrollRailItemIntoView(i))
})

const activeTab = computed(() => tabs.value[activeIndex.value])
const stageEnterClass = computed(() =>
  direction.value === 'forward' ? 'stage-enter-forward' : 'stage-enter-backward',
)
const stageLeaveClass = computed(() =>
  direction.value === 'forward' ? 'stage-leave-forward' : 'stage-leave-backward',
)
</script>

<template>
  <section
    ref="sectionRef"
    class="feature-tabs-section"
    :data-reduced-motion="prefersReducedMotion ? 'true' : 'false'"
  >
    <Container>
      <SectionHeader
        v-if="title"
        :eyebrow="eyebrow"
        :title="title"
        align="center"
        class="section-head"
      />
      <RevealOnScroll v-if="intro" :delay="40">
        <p class="intro">{{ intro }}</p>
      </RevealOnScroll>

      <RevealOnScroll :delay="80">
        <div
          class="layout"
          @mouseenter="isHovering = true"
          @mouseleave="isHovering = false"
          @focusin="isHovering = true"
          @focusout="isHovering = false"
        >
          <!-- Rail: vertical on desktop, horizontal scroll on mobile -->
          <div
            ref="railRef"
            role="tablist"
            aria-label="Why Antvertize"
            class="rail"
            @keydown="onKeyDown"
          >
            <button
              v-for="(tab, i) in tabs"
              :key="tab.id"
              :ref="(el) => { if (el) railItemRefs[i] = el as HTMLElement }"
              role="tab"
              :id="`feature-tab-${tab.id}`"
              :aria-selected="i === activeIndex"
              :aria-controls="`feature-panel-${tab.id}`"
              :tabindex="i === activeIndex ? 0 : -1"
              type="button"
              class="rail-btn"
              @click="setActive(i, true)"
            >
              <span class="rail-indicator" aria-hidden="true">
                <span class="rail-indicator-fill" :style="i === activeIndex && !prefersReducedMotion ? { transform: `scaleY(${progress / 100})` } : {}" />
              </span>
              <span class="rail-content">
                <span class="rail-meta">
                  <span class="rail-step">{{ String(i + 1).padStart(2, '0') }}</span>
                  <span v-if="tab.icon" class="rail-icon" aria-hidden="true">{{ tab.icon }}</span>
                </span>
                <span class="rail-label">{{ tab.label }}</span>
              </span>
            </button>
          </div>

          <!-- Stage -->
          <div
            class="stage"
            @touchstart.passive="onTouchStart"
            @touchend.passive="onTouchEnd"
          >
            <Transition
              :enter-active-class="`stage-enter-active ${stageEnterClass}`"
              :leave-active-class="`stage-leave-active ${stageLeaveClass}`"
              mode="out-in"
            >
              <div
                v-if="activeTab"
                :key="activeTab.id"
                role="tabpanel"
                :id="`feature-panel-${activeTab.id}`"
                :aria-labelledby="`feature-tab-${activeTab.id}`"
                class="stage-card"
              >
                <span class="stage-glow" aria-hidden="true" />
                <div class="stage-header">
                  <span v-if="activeTab.icon" class="stage-icon" aria-hidden="true">{{ activeTab.icon }}</span>
                  <span class="stage-step">
                    {{ String(activeIndex + 1).padStart(2, '0') }} <span class="divider">/</span> {{ String(tabs.length).padStart(2, '0') }}
                  </span>
                </div>
                <h3 class="stage-title">{{ activeTab.heading ?? activeTab.label }}</h3>
                <ul class="stage-bullets" role="list">
                  <li
                    v-for="(item, j) in activeTab.items"
                    :key="j"
                    :style="{ animationDelay: `${120 + j * 80}ms` }"
                  >
                    <span class="check" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </span>
                    <span>{{ item }}</span>
                  </li>
                </ul>
                <!-- Stage progress bar (mobile) -->
                <div
                  v-if="!prefersReducedMotion"
                  class="stage-progress"
                  aria-hidden="true"
                >
                  <span class="stage-progress-fill" :style="{ width: `${progress}%` }" />
                </div>
              </div>
            </Transition>
          </div>
        </div>
      </RevealOnScroll>
    </Container>
  </section>
</template>

<style scoped>
.feature-tabs-section {
  padding-block: 32px 96px;
  position: relative;
}

@media (min-width: 1024px) {
  .feature-tabs-section { padding-block: 48px 140px; }
}

.section-head { margin-bottom: 18px; }

.intro {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-secondary);
  text-align: center;
  max-width: 720px;
  margin: 0 auto 40px;
}

.layout {
  display: grid;
  gap: 24px;
  max-width: 1100px;
  margin-inline: auto;
  align-items: stretch;
}

@media (min-width: 1024px) {
  .layout {
    grid-template-columns: minmax(280px, 360px) 1fr;
    gap: 48px;
  }
}

/* RAIL */
.rail {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 8px;
  overflow-x: auto;
  scroll-snap-type: x proximity;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  padding: 4px 4px 8px;
  margin: 0 -4px;
}
.rail::-webkit-scrollbar { display: none; }

@media (min-width: 1024px) {
  .rail {
    flex-direction: column;
    gap: 4px;
    overflow: visible;
    padding: 0;
    margin: 0;
  }
}

.rail-btn {
  display: flex;
  align-items: center;
  gap: 14px;
  width: 100%;
  text-align: left;
  padding: 14px 18px;
  border: 1px solid var(--glass-border);
  background: var(--glass-bg);
  border-radius: 14px;
  color: var(--color-secondary);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  scroll-snap-align: center;
  font: inherit;
  transition:
    color var(--motion-fast) ease,
    background var(--motion-base) var(--ease-out-expo),
    border-color var(--motion-base) var(--ease-out-expo),
    transform var(--motion-base) var(--ease-out-expo);
}

.rail-btn:hover {
  color: var(--color-primary);
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(-1px);
}

.rail-btn:focus-visible {
  outline: 2px solid #8B5CF6;
  outline-offset: 2px;
}

.rail-btn[aria-selected='true'] {
  color: #fff;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.18), rgba(34, 211, 238, 0.12));
  border-color: rgba(139, 92, 246, 0.55);
  box-shadow: 0 8px 28px rgba(139, 92, 246, 0.18);
}

/* Indicator on the left of each rail item: vertical bar (desktop), thin horizontal (mobile) */
.rail-indicator {
  position: relative;
  flex-shrink: 0;
  width: 3px;
  height: 28px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.rail-indicator-fill {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, #8B5CF6, #22D3EE);
  border-radius: 999px;
  transform-origin: top;
  transform: scaleY(0);
  transition: transform 80ms linear;
}

.rail-btn[aria-selected='true'] .rail-indicator { background: rgba(139, 92, 246, 0.18); }

[data-reduced-motion='true'] .rail-btn[aria-selected='true'] .rail-indicator-fill {
  transform: scaleY(1);
}

.rail-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.rail-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--color-muted);
  text-transform: uppercase;
}

.rail-step {
  font-family: var(--font-heading);
}

.rail-icon {
  font-size: 13px;
  color: #c4b5fd;
}

.rail-btn[aria-selected='true'] .rail-icon { color: #fff; }

.rail-label {
  font-family: var(--font-body);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.005em;
  color: inherit;
}

/* STAGE */
.stage {
  position: relative;
  min-height: 360px;
}

.stage-card {
  position: relative;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl, 24px);
  padding: 36px 28px 28px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;
}

@media (min-width: 768px) {
  .stage-card { padding: 48px 56px 36px; }
}

.stage-glow {
  position: absolute;
  width: 360px;
  height: 360px;
  top: -160px;
  right: -140px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.22), transparent 65%);
  pointer-events: none;
  z-index: 0;
}

.stage-header {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 14px;
}

.stage-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.3), rgba(34, 211, 238, 0.22));
  border: 1px solid rgba(139, 92, 246, 0.45);
  font-size: 22px;
  color: #fff;
  box-shadow: 0 6px 24px rgba(139, 92, 246, 0.22);
}

.stage-step {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--color-muted);
  text-transform: uppercase;
}

.stage-step .divider { opacity: 0.4; margin-inline: 4px; }

.stage-title {
  position: relative;
  z-index: 1;
  font-family: var(--font-heading);
  font-size: clamp(26px, 3vw, 38px);
  line-height: 1.2;
  letter-spacing: -0.01em;
  background: linear-gradient(135deg, #F8FAFC 0%, rgba(196, 181, 253, 0.92) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.stage-bullets {
  position: relative;
  z-index: 1;
  list-style: none;
  display: grid;
  gap: 14px;
  padding: 0;
  margin: 4px 0 0;
  grid-template-columns: 1fr;
}

@media (min-width: 768px) {
  .stage-bullets { grid-template-columns: 1fr 1fr; gap: 18px 32px; }
}

.stage-bullets li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 16px;
  line-height: 1.55;
  color: var(--color-secondary);
  opacity: 0;
  transform: translateY(6px);
  animation: bullet-in 0.55s var(--ease-out-expo) forwards;
}

@keyframes bullet-in {
  to { opacity: 1; transform: translateY(0); }
}

[data-reduced-motion='true'] .stage-bullets li {
  opacity: 1;
  transform: none;
  animation: none;
}

.check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.25), rgba(34, 211, 238, 0.2));
  border: 1px solid rgba(139, 92, 246, 0.45);
  color: #c4b5fd;
  flex-shrink: 0;
  margin-top: 1px;
}

/* Stage-level progress bar (visible on mobile where rail indicator may be off-screen) */
.stage-progress {
  position: relative;
  z-index: 1;
  margin-top: auto;
  height: 2px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  overflow: hidden;
}

.stage-progress-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #8B5CF6, #22D3EE);
  width: 0%;
  border-radius: 999px;
  transition: width 80ms linear;
}

@media (min-width: 1024px) {
  .stage-progress { display: none; }
}

/* Vue transitions
   With <Transition mode="out-in">, the leave runs to completion before the
   enter starts. To make the next panel appear "as soon as the previous timer
   is done", we keep a smooth enter (it's the part the user actually watches)
   but make the leave near-instant — a 120ms fade with no slide. */
.stage-enter-active {
  transition:
    opacity 360ms var(--ease-out-expo),
    transform 420ms var(--ease-out-expo);
}

.stage-leave-active {
  transition:
    opacity 120ms ease-out,
    transform 120ms ease-out;
}

.stage-enter-forward  { opacity: 0; transform: translateY(24px); }
.stage-enter-backward { opacity: 0; transform: translateY(-24px); }
.stage-leave-forward,
.stage-leave-backward { opacity: 0; transform: translateY(0); }

[data-reduced-motion='true'] .stage-enter-active,
[data-reduced-motion='true'] .stage-leave-active {
  transition: opacity 0.001s linear;
  transform: none !important;
}
</style>
