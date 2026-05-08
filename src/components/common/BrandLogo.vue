<script setup lang="ts">
import { computed } from 'vue'

export type BrandLogoId = 'google-ads' | 'meta-ads' | 'dv360' | 'trade-desk'

const props = withDefaults(defineProps<{
  name: BrandLogoId
  label: string
  size?: number
}>(), {
  size: 24,
})

const sizePx = computed(() => `${props.size}px`)
</script>

<template>
  <span class="brand-logo" :style="{ '--brand-size': sizePx }" :title="label">
    <svg
      v-if="name === 'google-ads'"
      class="brand-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3" y="3" width="6" height="18" rx="3" fill="currentColor" opacity="0.55" transform="rotate(-22 6 12)" />
      <rect x="15" y="3" width="6" height="18" rx="3" fill="currentColor" transform="rotate(22 18 12)" />
    </svg>

    <svg
      v-else-if="name === 'meta-ads'"
      class="brand-svg"
      viewBox="0 0 32 16"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <path
        d="M3 8c0-3 2-5 4.5-5s4 2 5.5 4l3 4c1.5 2 3 4 5.5 4s4.5-2 4.5-5-2-5-4.5-5-4 2-5.5 4l-3 4c-1.5 2-3 4-5.5 4S3 11 3 8Z"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <svg
      v-else-if="name === 'dv360'"
      class="brand-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
    >
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" stroke-width="2" />
      <path d="M10 8.4 15.2 12 10 15.6Z" fill="currentColor" />
    </svg>

    <svg
      v-else-if="name === 'trade-desk'"
      class="brand-svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
    >
      <rect x="3" y="14" width="4" height="7" rx="1.2" opacity="0.5" />
      <rect x="10" y="9" width="4" height="12" rx="1.2" opacity="0.78" />
      <rect x="17" y="4" width="4" height="17" rx="1.2" />
    </svg>

    <span class="visually-hidden">{{ label }}</span>
  </span>
</template>

<style scoped>
.brand-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--brand-size, 24px);
  height: var(--brand-size, 24px);
  flex-shrink: 0;
  color: currentColor;
}

.brand-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
