<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { aboutPage } from '@/content/about'
import { useSeo } from '@/composables/useSeo'

useSeo(aboutPage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="aboutPage.hero" />
    <SectionRenderer :sections="aboutPage.sections" />
  </DefaultLayout>
</template>
