<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import Container from '@/components/common/Container.vue'
import AppButton from '@/components/common/AppButton.vue'
import { useSeo } from '@/composables/useSeo'
import type { CTA } from '@/types/content'

useSeo({
  title: 'Page Not Found | Antvertize',
  description: 'The page you are looking for does not exist or has been moved. Head back to the Antvertize homepage to keep exploring.',
  canonical: 'https://antvertize.com/404',
  robots: 'noindex, follow',
})

const homeCta: CTA = { label: 'Back to home', href: '/', action: 'route' }
const contactCta: CTA = { label: 'Contact us', href: '/contact', action: 'route' }
</script>

<template>
  <DefaultLayout>
    <section class="not-found-page">
      <Container>
        <div class="not-found-content">
          <p class="eyebrow">404</p>
          <h1>This page took a wrong turn.</h1>
          <p class="subtitle">
            The page you are looking for does not exist, was moved, or is no longer available.
            Let's get you back on track.
          </p>
          <div class="actions">
            <AppButton :cta="homeCta" variant="primary" size="lg" />
            <AppButton :cta="contactCta" variant="secondary" size="lg" />
          </div>
        </div>
      </Container>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.not-found-page {
  padding-top: 160px;
  padding-bottom: 120px;
  min-height: 70vh;
  display: flex;
  align-items: center;
}

.not-found-content {
  max-width: 640px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
}

.eyebrow {
  font-family: var(--font-body);
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 14px;
  background: var(--gradient-cta);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

h1 {
  font-size: clamp(36px, 5vw, 64px);
  line-height: 1.1;
  color: var(--color-primary);
  margin: 0;
}

.subtitle {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-secondary);
  margin: 0;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}
</style>
