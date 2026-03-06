<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { brandingPage } from '@/content/branding'
import { useSeo } from '@/composables/useSeo'

useSeo(brandingPage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="brandingPage.hero" />
    <SectionRenderer :sections="brandingPage.sections" />
  </DefaultLayout>
</template>
