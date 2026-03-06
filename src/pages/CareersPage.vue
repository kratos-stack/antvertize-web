<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { careersPage } from '@/content/careers'
import { useSeo } from '@/composables/useSeo'

useSeo(careersPage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="careersPage.hero" />
    <SectionRenderer :sections="careersPage.sections" />
  </DefaultLayout>
</template>
