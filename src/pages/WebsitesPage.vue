<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { websitesPage } from '@/content/websites'
import { useSeo } from '@/composables/useSeo'

useSeo(websitesPage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="websitesPage.hero" />
    <SectionRenderer :sections="websitesPage.sections" />
  </DefaultLayout>
</template>
