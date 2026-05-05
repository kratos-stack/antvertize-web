<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import HeroMarketing from '@/components/hero/HeroMarketing.vue'
import SectionRenderer from '@/components/sections/SectionRenderer.vue'
import { contactPage } from '@/content/contact'
import { useSeo } from '@/composables/useSeo'

useSeo(contactPage.seo)
</script>

<template>
  <DefaultLayout>
    <HeroMarketing v-bind="contactPage.hero" />
    <SectionRenderer :sections="contactPage.sections" />
  </DefaultLayout>
</template>
