<script setup lang="ts">
import type { PageSection } from '@/types/content'
import StatGridSection from './StatGridSection.vue'
import ServiceDetailSection from './ServiceDetailSection.vue'
import CardGridSection from './CardGridSection.vue'
import CaseStudyGridSection from './CaseStudyGridSection.vue'
import ArticleGridSection from './ArticleGridSection.vue'
import FAQSection from './FAQSection.vue'
import MarqueeBand from './MarqueeBand.vue'
import CTASection from './CTASection.vue'
import ValueWordCloudSection from './ValueWordCloudSection.vue'
import TextColumnsSection from './TextColumnsSection.vue'
import TrustBarSection from './TrustBarSection.vue'
import BulletListSection from './BulletListSection.vue'
import FeatureTabsSection from './FeatureTabsSection.vue'
import ContactFormSection from './ContactFormSection.vue'

defineProps<{ sections: PageSection[] }>()
</script>

<template>
  <template v-for="(section, index) in sections" :key="index">
    <StatGridSection
      v-if="section.type === 'stat-grid'"
      :items="section.items"
    />
    <ServiceDetailSection
      v-else-if="section.type === 'service-detail-list'"
      :items="section.items"
    />
    <CardGridSection
      v-else-if="section.type === 'card-grid'"
      :items="section.items"
      :title="section.title"
      :eyebrow="section.eyebrow"
    />
    <CaseStudyGridSection
      v-else-if="section.type === 'case-study-grid'"
      :items="section.items"
      :title="section.title"
      :eyebrow="section.eyebrow"
    />
    <ArticleGridSection
      v-else-if="section.type === 'article-grid'"
      :items="section.items"
      :title="section.title"
      :eyebrow="section.eyebrow"
    />
    <FAQSection
      v-else-if="section.type === 'faq'"
      :items="section.items"
      :title="section.title"
      :eyebrow="section.eyebrow"
    />
    <MarqueeBand
      v-else-if="section.type === 'marquee'"
      :items="section.items"
    />
    <CTASection
      v-else-if="section.type === 'cta-banner'"
      v-bind="section.data"
    />
    <ValueWordCloudSection
      v-else-if="section.type === 'value-word-cloud'"
      :items="section.items"
      :title="section.title"
      :eyebrow="section.eyebrow"
    />
    <TextColumnsSection
      v-else-if="section.type === 'text-columns'"
      v-bind="section.data"
    />
    <TrustBarSection
      v-else-if="section.type === 'trust-bar'"
      v-bind="section.data"
    />
    <BulletListSection
      v-else-if="section.type === 'bullet-list'"
      v-bind="section.data"
    />
    <FeatureTabsSection
      v-else-if="section.type === 'feature-tabs'"
      v-bind="section.data"
    />
    <ContactFormSection
      v-else-if="section.type === 'contact-form'"
    />
  </template>
</template>
