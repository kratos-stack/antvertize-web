<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { caseStudiesPage } from '@/content/case-studies'
import { useSeo } from '@/composables/useSeo'

useSeo(caseStudiesPage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="caseStudiesPage.hero" />
    <SectionRenderer :sections="caseStudiesPage.sections" />
  </DefaultLayout>
</template>
