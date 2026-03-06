<script setup lang="ts">
import SiteHeader from '@/components/navigation/SiteHeader.vue'
import SiteFooter from '@/components/navigation/SiteFooter.vue'
</script>

<template>
  <div class="default-layout">
    <SiteHeader />
    <main id="main-content">
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
