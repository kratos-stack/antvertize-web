<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import Container from '@/components/common/Container.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Privacy Policy | Antvertize',
  description: 'Read the Antvertize privacy policy. Learn how we collect, use, and protect your personal data.',
  canonical: 'https://antvertize.com/privacy-policy',
})
</script>

<template>
  <DefaultLayout>
    <section class="legal-page">
      <Container>
        <div class="legal-content">
          <h1>Privacy Policy</h1>
          <p class="last-updated">Last updated: January 2026</p>

          <h2>1. Introduction</h2>
          <p>Antvertize Digital Agency Ltd ("Antvertize", "we", "us", or "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and protect information when you visit our website or engage our services.</p>

          <h2>2. Information We Collect</h2>
          <p>We may collect the following categories of personal data:</p>
          <ul>
            <li><strong>Contact data:</strong> name, email address, phone number, company name</li>
            <li><strong>Usage data:</strong> pages visited, time spent on site, browser and device information</li>
            <li><strong>Communications data:</strong> enquiry content, correspondence with our team</li>
            <li><strong>Marketing preferences:</strong> opt-in records for email communications</li>
          </ul>

          <h2>3. How We Use Your Data</h2>
          <p>We use your personal data to:</p>
          <ul>
            <li>Respond to enquiries and provide services you have requested</li>
            <li>Send marketing communications where you have consented</li>
            <li>Improve our website and understand how visitors use it</li>
            <li>Comply with our legal obligations</li>
          </ul>

          <h2>4. Legal Basis for Processing</h2>
          <p>We process your data on the following legal bases: your consent, our legitimate business interests, performance of a contract, and compliance with legal obligations.</p>

          <h2>5. Data Sharing</h2>
          <p>We do not sell your personal data. We may share data with trusted service providers who help us operate our business (e.g., CRM, email, analytics), all of whom are contractually obligated to protect your data.</p>

          <h2>6. Data Retention</h2>
          <p>We retain personal data for as long as necessary to fulfil the purposes outlined in this policy, or as required by law. Client engagement data is typically retained for 7 years for legal and tax compliance.</p>

          <h2>7. Your Rights</h2>
          <p>You have the right to access, correct, delete, or restrict processing of your personal data. To exercise these rights, contact us at <a href="mailto:privacy@antvertize.com">privacy@antvertize.com</a>.</p>

          <h2>8. Cookies</h2>
          <p>Our website uses cookies for analytics and performance. You can manage cookie preferences via your browser settings. We use analytics cookies to understand aggregate usage patterns—no individual profiling for advertising purposes.</p>

          <h2>9. Contact Us</h2>
          <p>For privacy-related enquiries: <a href="mailto:privacy@antvertize.com">privacy@antvertize.com</a></p>
          <p>Antvertize Digital Agency Ltd, 350 Fifth Avenue, Suite 4100, New York, NY 10118</p>
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
