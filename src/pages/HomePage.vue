<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { homePage } from '@/content/home'
import { useSeo } from '@/composables/useSeo'

useSeo(homePage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="homePage.hero" />
    <SectionRenderer :sections="homePage.sections" />
  </DefaultLayout>
</template>
