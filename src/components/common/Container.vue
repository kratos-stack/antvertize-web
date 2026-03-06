<script setup lang="ts">
defineProps<{
  as?: string
}>()
</script>

<template>
  <component :is="as ?? 'div'" class="container-inner">
    <slot />
  </component>
</template>

<style scoped>
.container-inner {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 20px;
}

@media (min-width: 1024px) {
  .container-inner {
    padding-inline: 32px;
  }
}
</style>
