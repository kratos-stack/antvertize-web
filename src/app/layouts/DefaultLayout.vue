<script setup lang="ts">
import SiteHeader from '@/components/navigation/SiteHeader.vue'
import SiteFooter from '@/components/navigation/SiteFooter.vue'
</script>

<template>
  <div class="default-layout">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <SiteHeader />
    <main id="main-content" tabindex="-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.default-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#main-content {
  flex: 1;
}
</style>
