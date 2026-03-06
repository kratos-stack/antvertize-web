<script setup lang="ts">
defineProps<{
  variant?: 'hero' | 'subtle' | 'cta'
}>()
</script>

<template>
  <div class="gradient-backdrop" :class="variant ?? 'hero'" aria-hidden="true">
    <div class="orb orb-1" />
    <div class="orb orb-2" />
    <div class="orb orb-3" />
    <div class="noise" />
  </div>
</template>

<style scoped>
.gradient-backdrop {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.35;
}

.hero .orb-1 {
  width: 600px; height: 600px;
  top: -200px; left: -100px;
  background: radial-gradient(circle, #8B5CF6, transparent 70%);
}

.hero .orb-2 {
  width: 500px; height: 500px;
  top: -100px; right: -100px;
  background: radial-gradient(circle, #22D3EE, transparent 70%);
  opacity: 0.22;
}

.hero .orb-3 {
  width: 400px; height: 400px;
  bottom: -150px; left: 30%;
  background: radial-gradient(circle, #3B82F6, transparent 70%);
  opacity: 0.18;
}

.subtle .orb-1 {
  width: 500px; height: 500px;
  top: -100px; left: -50px;
  background: radial-gradient(circle, #8B5CF6, transparent 70%);
  opacity: 0.2;
}

.subtle .orb-2 {
  width: 400px; height: 400px;
  bottom: 0; right: 0;
  background: radial-gradient(circle, #22D3EE, transparent 70%);
  opacity: 0.12;
}

.subtle .orb-3 { display: none; }

.cta .orb-1 {
  width: 700px; height: 700px;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, #8B5CF6, transparent 60%);
  opacity: 0.25;
}

.cta .orb-2, .cta .orb-3 { display: none; }

.noise {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.03;
}
</style>
