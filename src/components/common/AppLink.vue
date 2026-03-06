<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  href: string
  external?: boolean
}>()

const isExternal = computed(() => props.external || /^https?:\/\//.test(props.href))
</script>

<template>
  <a
    v-if="isExternal"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    class="app-link"
  >
    <slot />
  </a>
  <RouterLink v-else :to="href" class="app-link">
    <slot />
  </RouterLink>
</template>

<style scoped>
.app-link {
  color: var(--color-secondary);
  text-decoration: none;
  transition: color var(--motion-fast) ease;
}
.app-link:hover { color: var(--color-primary); }
</style>
