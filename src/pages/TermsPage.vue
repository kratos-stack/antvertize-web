<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import Container from '@/components/common/Container.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Terms & Conditions | Antvertize',
  description: 'Read the Antvertize terms and conditions governing use of our website and services.',
  canonical: 'https://antvertize.com/terms-and-conditions',
})

const lastUpdated = 'May 2026'
</script>

<template>
  <DefaultLayout>
    <section class="legal-page">
      <Container>
        <div class="legal-content">
          <h1>Terms & Conditions</h1>
          <p class="last-updated">Last updated: {{ lastUpdated }}</p>

          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using the Antvertize website (antvertize.com) or engaging our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website or services.</p>

          <h2>2. Our Services</h2>
          <p>Antvertize provides performance digital advertising services, including programmatic, PPC, paid social, display and retargeting, and video advertising. Specific service scope, fees, and deliverables are governed by individual client agreements or statements of work.</p>

          <h2>3. Advertising Performance</h2>
          <p>Antvertize uses industry-leading tools, methods, and platforms to plan, launch, and optimize advertising campaigns. Campaign performance depends on many factors outside our control, including auction dynamics, platform policy changes, creative assets, landing pages, and product–market fit. While we work diligently to deliver strong results, no specific advertising outcomes (such as ROAS, CPA, conversion rate, or revenue) are guaranteed.</p>

          <h2>4. Intellectual Property</h2>
          <p>All content on this website—including text, graphics, logos, and design—is the property of Antvertize and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
          <p>Work product developed for clients (campaign structures, creatives, copy) is transferred to client ownership upon full payment, as outlined in the applicable service agreement.</p>

          <h2>5. Client Ad Accounts and Spend</h2>
          <p>Where Antvertize manages campaigns inside client-owned ad accounts, the client remains responsible for ad spend invoiced directly by advertising platforms (e.g. Google, Meta). Antvertize fees are separate from media spend, unless otherwise agreed in writing.</p>

          <h2>6. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Antvertize will not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our total liability shall not exceed the fees paid for the specific service in question.</p>

          <h2>7. Third-Party Links and Platforms</h2>
          <p>Our website may contain links to third-party websites and we operate inside third-party advertising platforms. We are not responsible for the content, terms, or privacy practices of those parties. Use of any third-party platform is governed by that platform's own terms.</p>

          <h2>8. Disclaimer of Warranties</h2>
          <p>Our website is provided on an "as is" basis. We make no warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of website content.</p>

          <h2>9. Governing Law</h2>
          <p>These terms are governed by applicable law in the jurisdiction of Antvertize's primary place of business. Any disputes shall be resolved in the competent courts of that jurisdiction.</p>

          <h2>10. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of our website after updates constitutes acceptance of the revised terms. We post the date of the most recent revision at the top of this page.</p>

          <h2>11. Contact</h2>
          <p>Enquiries: <a href="mailto:hello@antvertize.com">hello@antvertize.com</a>.</p>
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
