<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { servicesPage } from '@/content/services'
import { useSeo } from '@/composables/useSeo'

useSeo(servicesPage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="servicesPage.hero" />
    <SectionRenderer :sections="servicesPage.sections" />
  </DefaultLayout>
</template>
