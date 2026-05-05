<script setup lang="ts">
/**
 * Renders a recognizable SVG glyph for a known service key, or falls back
 * to the raw `name` as a single character / emoji. Use semantic keys in
 * content (e.g. `'programmatic'`) and this component picks the right glyph.
 *
 * All SVGs share the same stroke language so they sit consistently inside
 * a single icon container regardless of which service they represent.
 */
defineProps<{
  /** Either a known key ('programmatic' | 'ppc' | 'social' | 'display' | 'video') or any short text/emoji. */
  name: string
}>()
</script>

<template>
  <span class="service-icon" aria-hidden="true">
    <!-- Programmatic — connected nodes (pentagon hub) -->
    <svg
      v-if="name === 'programmatic'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="5" cy="5" r="2" />
      <circle cx="19" cy="5" r="2" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke-width="0" />
      <circle cx="5" cy="19" r="2" />
      <circle cx="19" cy="19" r="2" />
      <path d="M6.4 6.4 10.4 10.4 M17.6 6.4 13.6 10.4 M6.4 17.6 10.4 13.6 M17.6 17.6 13.6 13.6" />
    </svg>

    <!-- PPC — bullseye target -->
    <svg
      v-else-if="name === 'ppc'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
    >
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke-width="0" />
      <path d="M3 12 L6 12 M18 12 L21 12 M12 3 L12 6 M12 18 L12 21" />
    </svg>

    <!-- Social — chat bubble with three dots -->
    <svg
      v-else-if="name === 'social'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M4 5.5 A2 2 0 0 1 6 3.5 H18 A2 2 0 0 1 20 5.5 V14 A2 2 0 0 1 18 16 H10 L6 20 V16 H6 A2 2 0 0 1 4 14 Z" />
      <circle cx="9" cy="10" r="1" fill="currentColor" stroke-width="0" />
      <circle cx="12.5" cy="10" r="1" fill="currentColor" stroke-width="0" />
      <circle cx="16" cy="10" r="1" fill="currentColor" stroke-width="0" />
    </svg>

    <!-- Display & Retargeting — monitor with a refresh / re-engage curve -->
    <svg
      v-else-if="name === 'display'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M9 21 L15 21 M12 17 L12 21" />
      <path d="M14.5 11.5 a3 3 0 1 0 -1.7 -3.4" />
      <path d="M15 8 L13 8 L13 6" />
    </svg>

    <!-- Video — rounded screen with play triangle -->
    <svg
      v-else-if="name === 'video'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M10.4 9 L16 12 L10.4 15 Z" fill="currentColor" stroke-width="0.6" />
    </svg>

    <!-- Fallback: render the literal string -->
    <span v-else class="service-icon__text">{{ name }}</span>
  </span>
</template>

<style scoped>
.service-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.service-icon svg {
  width: 60%;
  height: 60%;
  display: block;
}

.service-icon__text {
  font-size: 22px;
  line-height: 1;
}
</style>
