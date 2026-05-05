<script setup lang="ts">
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'

const audit = [
  'Account Structure',
  'Targeting & Audiences',
  'Creative & Copy',
  'Conversion Tracking',
] as const
</script>

<template>
  <div class="visual-shell" aria-hidden="true">
    <div class="visual-card">
      <div class="visual-glow" />

      <div class="metric-row">
        <FloatingBadge value="Free" label="Performance Audit" variant="violet" icon="✦" />
        <FloatingBadge label="No Obligation" variant="cyan" icon="↑" />
      </div>

      <header class="checklist-head">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="2" y="3" width="16" height="14" rx="2.5" stroke="url(#frame-grad)" stroke-width="1.5" />
          <path d="M6 9.5l2.4 2.4L13.5 7" stroke="url(#frame-grad)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <defs>
            <linearGradient id="frame-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#8B5CF6" />
              <stop offset="100%" stop-color="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
        <span>Your Free Audit Includes</span>
      </header>

      <ul class="checklist" role="list">
        <li
          v-for="(item, i) in audit"
          :key="item"
          class="check-item"
          :style="{ '--delay': `${i * 160}ms` } as Record<string, string>"
        >
          <span class="check-circle" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </span>
          <span class="check-text">{{ item }}</span>
        </li>
      </ul>

      <div class="visual-label">Free Audit of Your Current Campaigns</div>
    </div>

    <FloatingBadge label="Programmatic · PPC" variant="emerald" icon="◆" class="badge-float-1" />
    <FloatingBadge label="Social · Display · Video" variant="violet" icon="✦" class="badge-float-2" />
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
  background: radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent 70%);
  pointer-events: none;
}

.metric-row { display: flex; gap: 12px; margin-bottom: 28px; flex-wrap: wrap; }

.checklist-head {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: var(--color-primary);
  margin-bottom: 16px;
}

.checklist {
  list-style: none;
  margin: 0 0 18px;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.check-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(139, 92, 246, 0.2);
  border-radius: 10px;
  opacity: 0;
  transform: translateX(-8px);
  animation: check-in 0.5s var(--ease-out-expo) forwards;
  animation-delay: var(--delay);
}

@keyframes check-in {
  to { opacity: 1; transform: translateX(0); }
}

@media (prefers-reduced-motion: reduce) {
  .check-item { opacity: 1; transform: none; animation: none; }
  .check-circle { animation: none; }
}

.check-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #22D3EE);
  flex-shrink: 0;
  transform: scale(0);
  animation: pop-in 0.5s var(--ease-out-expo) forwards;
  animation-delay: calc(var(--delay) + 200ms);
}

@keyframes pop-in {
  to { transform: scale(1); }
}

.check-text {
  font-family: var(--font-body);
  font-size: 13px;
  font-weight: 500;
  color: var(--color-secondary);
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
