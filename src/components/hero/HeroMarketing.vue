<script setup lang="ts">
import { computed } from 'vue'
import { useCursorGlow } from '@/composables/useCursorGlow'
import type { HeroContent, HeroVisualKey } from '@/types/content'
import AppButton from '@/components/common/AppButton.vue'
import BadgePill from '@/components/common/BadgePill.vue'
import GradientBackdrop from '@/components/surfaces/GradientBackdrop.vue'
import Container from '@/components/common/Container.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

import HomeGrowthVisual from './visuals/HomeGrowthVisual.vue'
import ServicesChannelsVisual from './visuals/ServicesChannelsVisual.vue'
import AboutDecadeVisual from './visuals/AboutDecadeVisual.vue'
import CaseStudiesResultsVisual from './visuals/CaseStudiesResultsVisual.vue'
import ContactAuditVisual from './visuals/ContactAuditVisual.vue'

const props = defineProps<HeroContent>()

const layoutMode = computed(() => props.layout ?? 'split')

const visualMap: Record<HeroVisualKey, ReturnType<typeof Object>> = {
  'home-growth': HomeGrowthVisual,
  'services-channels': ServicesChannelsVisual,
  'about-decade': AboutDecadeVisual,
  'case-studies-results': CaseStudiesResultsVisual,
  'contact-audit': ContactAuditVisual,
}

const visualComponent = computed(() => {
  if (layoutMode.value !== 'split') return null
  const key: HeroVisualKey = props.visual ?? 'home-growth'
  return visualMap[key] ?? HomeGrowthVisual
})

const { setRef } = useCursorGlow()
</script>

<template>
  <section :ref="setRef" class="hero-section" :class="`layout-${layoutMode}`">
    <GradientBackdrop variant="hero" />

    <Container>
      <div class="hero-inner">
        <!-- Left column: text -->
        <div class="hero-content">
          <RevealOnScroll v-if="eyebrow" as="span" :delay="0" :duration="600" :threshold="0" direction="up" class="hero-eyebrow">
            <span class="eyebrow-dot" aria-hidden="true" />
            {{ eyebrow }}
          </RevealOnScroll>

          <RevealOnScroll as="h1" :delay="100" :duration="750" :threshold="0" :distance="32" direction="up" class="hero-title">
            {{ title }}
          </RevealOnScroll>

          <RevealOnScroll v-if="subtitle" as="p" :delay="220" :duration="700" :threshold="0" direction="up" class="hero-subtitle">
            {{ subtitle }}
          </RevealOnScroll>

          <RevealOnScroll v-if="primaryCta || secondaryCta" :delay="340" :duration="700" :threshold="0" direction="up" class="hero-ctas">
            <AppButton v-if="primaryCta" :cta="primaryCta" variant="primary" size="lg" />
            <AppButton v-if="secondaryCta" :cta="secondaryCta" variant="secondary" size="lg" />
          </RevealOnScroll>

          <RevealOnScroll v-if="highlights?.length" :delay="440" :duration="700" :threshold="0" direction="up" class="hero-highlights">
            <BadgePill v-for="h in highlights" :key="h">{{ h }}</BadgePill>
          </RevealOnScroll>
        </div>

        <!-- Right column: contextual visual (split layout only) -->
        <RevealOnScroll
          v-if="visualComponent"
          class="hero-visual"
          direction="right"
          :delay="200"
          :duration="800"
          :threshold="0"
          :distance="40"
        >
          <component :is="visualComponent" />
        </RevealOnScroll>
      </div>
    </Container>

    <div class="cursor-glow-layer" aria-hidden="true" />
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-block: 140px 100px;
  overflow: hidden;
  --mouse-x: -999px;
  --mouse-y: -999px;
}

.hero-section.layout-centered {
  min-height: auto;
  padding-block: 132px 56px;
}

@media (min-width: 1024px) {
  .hero-section.layout-centered { padding-block: 168px 72px; }
}

/* Force the inner shell into a single column when centered. */
.hero-section.layout-centered .hero-inner {
  grid-template-columns: 1fr;
  gap: 0;
}

.hero-section.layout-centered .hero-content {
  align-items: center;
  text-align: center;
  max-width: 760px;
  margin-inline: auto;
}

.hero-section.layout-centered :deep(.hero-subtitle) {
  margin-inline: auto;
}

.hero-section.layout-centered :deep(.hero-ctas),
.hero-section.layout-centered :deep(.hero-highlights) {
  justify-content: center;
}

.cursor-glow-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    400px circle at var(--mouse-x) var(--mouse-y),
    rgba(139, 92, 246, 0.1),
    transparent 40%
  );
}

.hero-inner {
  display: grid;
  gap: 64px;
  align-items: center;
}

.hero-content {
  display: flex;
  flex-direction: column;
  gap: 28px;
  position: relative;
  z-index: 1;
}

:deep(.hero-eyebrow) {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.5;
  text-transform: uppercase;
  color: #c4b5fd;
  padding: 6px 16px;
  background: rgba(139, 92, 246, 0.12);
  border: 1px solid rgba(139, 92, 246, 0.28);
  border-radius: 999px;
  width: fit-content;
}

.eyebrow-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8B5CF6;
  box-shadow: 0 0 8px #8B5CF6;
  animation: pulse-dot 2.4s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.8); }
}

:deep(.hero-title) {
  font-size: clamp(38px, 5.5vw, 72px);
  line-height: 1.1;
  letter-spacing: -0.03em;
  padding-bottom: 0.12em;
  background: linear-gradient(135deg, #F8FAFC 0%, rgba(248, 250, 252, 0.72) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:deep(.hero-subtitle) {
  font-size: clamp(16px, 1.8vw, 20px);
  line-height: 1.75;
  color: var(--color-secondary);
  max-width: 520px;
}

:deep(.hero-ctas) {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

:deep(.hero-highlights) {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 4px;
}

/* Right-column visual container — visibility & layout only.
   Internal visual chrome lives in each <PageVisual> component. */
.hero-visual {
  position: relative;
  display: none;
}

@media (min-width: 768px) { .hero-visual { display: block; } }

@media (min-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr 1fr; gap: 80px; }
}
</style>
