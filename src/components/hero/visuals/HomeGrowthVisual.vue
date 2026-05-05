<script setup lang="ts">
import FloatingBadge from '@/components/surfaces/FloatingBadge.vue'
</script>

<template>
  <div class="visual-shell" aria-hidden="true">
    <div class="visual-card">
      <div class="visual-glow" />
      <div class="metric-row">
        <FloatingBadge value="Performance" label="First Approach" variant="violet" icon="↑" />
        <FloatingBadge value="Predictable" label="Growth" variant="cyan" icon="↓" />
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
      <div class="visual-label">Predictable Growth Trajectory</div>
    </div>
    <FloatingBadge value="10+" label="Years of Expertise" variant="emerald" icon="◆" class="badge-float-1" />
    <FloatingBadge value="Transparent" label="Reporting" variant="violet" icon="★" class="badge-float-2" />
  </div>
</template>

<style scoped>
.visual-shell {
  position: relative;
}

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
</style>
