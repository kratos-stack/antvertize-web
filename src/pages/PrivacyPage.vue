<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import Container from '@/components/common/Container.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Privacy Policy | Antvertize',
  description: 'Read the Antvertize privacy policy. Learn how we collect, use, and protect your personal data.',
  canonical: 'https://antvertize.com/privacy-policy',
})

const lastUpdated = 'May 2026'
</script>

<template>
  <DefaultLayout>
    <section class="legal-page">
      <Container>
        <div class="legal-content">
          <h1>Privacy Policy</h1>
          <p class="last-updated">Last updated: {{ lastUpdated }}</p>

          <h2>1. Introduction</h2>
          <p>Antvertize ("Antvertize", "we", "us", or "our") is a performance digital advertising agency. This Privacy Policy explains how we collect, use, share, and protect personal data when you visit our website or engage our services.</p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following categories of personal data:</p>
          <ul>
            <li><strong>Contact data:</strong> name, email address, business name, monthly ad spend range, and any details you choose to share when requesting an audit or consultation.</li>
            <li><strong>Usage data:</strong> pages visited, time spent on site, browser and device information.</li>
            <li><strong>Communications data:</strong> enquiry content and correspondence with our team.</li>
            <li><strong>Marketing preferences:</strong> consent records for email communications.</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>We use your personal data to:</p>
          <ul>
            <li>Respond to audit requests and consultation enquiries.</li>
            <li>Provide the digital advertising services you have engaged us for.</li>
            <li>Send marketing communications where you have consented.</li>
            <li>Improve our website and understand how visitors use it.</li>
            <li>Comply with our legal obligations.</li>
          </ul>

          <h2>4. Advertising Platforms</h2>
          <p>As a digital advertising agency, we operate campaigns on behalf of clients on platforms including Google Ads, Meta Ads, LinkedIn, Display & Video 360, The Trade Desk, and YouTube. When acting on behalf of a client, that client is the data controller for the personal data processed inside their advertising account; Antvertize acts as a data processor under their instructions.</p>

          <h2>5. Legal Basis for Processing</h2>
          <p>We process your data on the following legal bases: your consent, our legitimate business interests, performance of a contract, and compliance with legal obligations.</p>

          <h2>6. Data Sharing</h2>
          <p>We do not sell your personal data. We may share data with trusted service providers (CRM, email, analytics, ad platforms) who are contractually obligated to protect it, and only as necessary to deliver the services you request.</p>

          <h2>7. Data Retention</h2>
          <p>We retain personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by applicable law. Client engagement data is retained for the period required by legal and tax compliance obligations.</p>

          <h2>8. Your Rights</h2>
          <p>You have the right to access, correct, delete, or restrict processing of your personal data. To exercise these rights, contact us at <a href="mailto:hello@antvertize.com">hello@antvertize.com</a>.</p>

          <h2>9. Cookies</h2>
          <p>Our website uses cookies for analytics and performance. You can manage cookie preferences via your browser settings. We use analytics cookies to understand aggregate usage patterns; we do not run individual ad-profiling on this site.</p>

          <h2>10. Contact</h2>
          <p>For privacy-related enquiries: <a href="mailto:hello@antvertize.com">hello@antvertize.com</a>.</p>
          <p>Antvertize serves clients across the United States, Europe, and India.</p>
        </div>
      </Container>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.legal-page {
  padding-top: 140px;
  padding-bottom: 100px;
}

.legal-content {
  max-width: 720px;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

h1 {
  font-size: clamp(32px, 4vw, 52px);
  color: var(--color-primary);
  margin-bottom: 8px;
}

.last-updated {
  font-size: 14px;
  color: var(--color-muted);
  margin-top: -12px;
}

h2 {
  font-size: clamp(18px, 2vw, 24px);
  color: var(--color-primary);
  margin-top: 8px;
}

p {
  font-size: 16px;
  line-height: 1.8;
  color: var(--color-secondary);
}

ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

ul li {
  font-size: 16px;
  line-height: 1.7;
  color: var(--color-secondary);
}

a { color: #8B5CF6; }
a:hover { text-decoration: underline; }
</style>
