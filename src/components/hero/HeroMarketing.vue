<script setup lang="ts">
import { useCursorGlow } from '@/composables/useCursorGlow'
import type { HeroContent } from '@/types/content'
import AppButton from '@/components/common/AppButton.vue'
import BadgePill from '@/components/common/BadgePill.vue'
import GradientBackdrop from '@/components/surfaces/GradientBackdrop.vue'
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'
import Container from '@/components/common/Container.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

defineProps<HeroContent>()

const { setRef } = useCursorGlow()
</script>

<template>
  <section :ref="setRef" class="hero-section">
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

        <!-- Right column: visual -->
        <RevealOnScroll class="hero-visual" direction="right" :delay="200" :duration="800" :threshold="0" :distance="40" aria-hidden="true">
          <div class="visual-card">
            <div class="visual-glow" />
            <div class="metric-row">
              <FloatingBadge value="10x" label="Average ROI" variant="violet" icon="↑" />
              <FloatingBadge value="98%" label="Client Retention" variant="cyan" icon="★" />
            </div>
            <div class="visual-grid">
              <div class="grid-col">
                <div class="bar bar-tall" />
                <div class="bar bar-mid" />
                <div class="bar bar-sm" />
              </div>
              <div class="grid-col">
                <div class="bar bar-sm" />
                <div class="bar bar-tall" />
                <div class="bar bar-mid" />
              </div>
              <div class="grid-col">
                <div class="bar bar-mid" />
                <div class="bar bar-sm" />
                <div class="bar bar-tall" />
              </div>
              <div class="grid-col">
                <div class="bar bar-xl" />
                <div class="bar bar-mid" />
                <div class="bar bar-sm" />
              </div>
            </div>
            <div class="visual-label">Brand Growth Projection</div>
          </div>
          <FloatingBadge value="250+" label="Global Clients" variant="emerald" icon="◆" class="badge-float-1" />
          <FloatingBadge value="12+" label="Years of Excellence" variant="violet" icon="◉" class="badge-float-2" />
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

.hero-visual {
  position: relative;
  display: none;
}

.visual-card {
  background: rgba(11, 16, 32, 0.7);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 32px;
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.visual-glow {
  position: absolute;
  top: -60px; right: -60px;
  width: 220px; height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%);
  pointer-events: none;
}

.metric-row { display: flex; gap: 12px; margin-bottom: 32px; flex-wrap: wrap; }

.visual-grid {
  display: flex; gap: 10px; align-items: flex-end;
  height: 140px; margin-bottom: 16px;
}

.grid-col {
  flex: 1; display: flex; flex-direction: column;
  gap: 6px; align-items: stretch; justify-content: flex-end;
}

.bar {
  border-radius: 6px;
  background: linear-gradient(180deg, rgba(139, 92, 246, 0.6), rgba(34, 211, 238, 0.4));
}

.bar-xl { height: 100px; }
.bar-tall { height: 72px; }
.bar-mid { height: 48px; }
.bar-sm { height: 28px; }

.visual-label { font-size: 12px; font-weight: 500; color: var(--color-muted); text-align: center; }

.badge-float-1 { position: absolute; bottom: -24px; left: -32px; }
.badge-float-2 { position: absolute; top: 20%; right: -40px; }

@media (min-width: 768px) { .hero-visual { display: block; } }

@media (min-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr 1fr; gap: 80px; }
}
</style>
