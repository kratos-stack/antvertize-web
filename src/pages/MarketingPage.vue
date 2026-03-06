<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { marketingPage } from '@/content/marketing'
import { useSeo } from '@/composables/useSeo'

useSeo(marketingPage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="marketingPage.hero" />
    <SectionRenderer :sections="marketingPage.sections" />
  </DefaultLayout>
</template>
