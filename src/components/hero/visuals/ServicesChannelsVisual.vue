<script setup lang="ts">
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'

const channels = [
  { id: 'programmatic', label: 'Programmatic',          hue: 'violet' },
  { id: 'ppc', label: 'PPC Campaign Management',         hue: 'cyan' },
  { id: 'social', label: 'Social Media Advertising',     hue: 'violet' },
  { id: 'display', label: 'Display & Retargeting',       hue: 'cyan' },
  { id: 'video', label: 'Video Advertising',             hue: 'violet' },
] as const
</script>

<template>
  <div class="visual-shell" aria-hidden="true">
    <div class="visual-card">
      <div class="visual-glow" />
      <div class="metric-row">
        <FloatingBadge value="Integrated" label="Channel Mix" variant="violet" icon="◆" />
        <FloatingBadge value="Unified" label="Strategy" variant="cyan" icon="✦" />
      </div>

      <ul class="channel-list" role="list">
        <li v-for="(c, i) in channels" :key="c.id" :style="{ '--delay': `${i * 90}ms` } as Record<string, string>">
          <div class="channel-row">
            <span class="dot" :class="`dot-${c.hue}`" />
            <span class="name">{{ c.label }}</span>
            <span class="bar-track">
              <span class="bar-fill" />
            </span>
          </div>
        </li>
      </ul>

      <div class="visual-label">Integrated Channel Mix</div>
    </div>

    <FloatingBadge value="Performance" label="First Approach" variant="emerald" icon="↓" class="badge-float-1" />
    <FloatingBadge value="Transparent" label="Reporting" variant="violet" icon="↑" class="badge-float-2" />
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
  background: radial-gradient(circle, rgba(34, 211, 238, 0.3), transparent 70%);
  pointer-events: none;
}

.metric-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }

.channel-list {
  list-style: none;
  padding: 0;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.channel-list li {
  opacity: 0;
  transform: translateX(-8px);
  animation: slide-in 0.7s var(--ease-out-expo) forwards;
  animation-delay: var(--delay);
}

@keyframes slide-in {
  to { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .channel-list li { opacity: 1; transform: none; animation: none; }
  .bar-fill { transition: none !important; }
}

.channel-row {
  display: grid;
  grid-template-columns: 8px minmax(0, 1.4fr) minmax(0, 2fr);
  align-items: center;
  gap: 12px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.dot-violet { background: linear-gradient(135deg, #8B5CF6, #6366F1); box-shadow: 0 0 8px rgba(139, 92, 246, 0.5); }
.dot-cyan { background: linear-gradient(135deg, #22D3EE, #3B82F6); box-shadow: 0 0 8px rgba(34, 211, 238, 0.5); }

.name {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-secondary);
  white-space: nowrap;
}

.bar-track {
  position: relative;
  height: 8px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 999px;
  overflow: hidden;
  min-width: 0;
}

.bar-fill {
  display: block;
  height: 100%;
  background: linear-gradient(90deg, #8B5CF6, #22D3EE);
  border-radius: 999px;
  transform-origin: left;
  animation: bar-grow 1.1s var(--ease-out-expo) forwards;
  width: 0;
}

@keyframes bar-grow {
  to { width: 100%; }
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
