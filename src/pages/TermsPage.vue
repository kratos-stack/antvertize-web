<script setup lang="ts">
import DefaultLayout from '@/app/layouts/DefaultLayout.vue'
import Container from '@/components/common/Container.vue'
import { useSeo } from '@/composables/useSeo'

useSeo({
  title: 'Terms & Conditions | Antvertize',
  description: 'Read the Antvertize terms and conditions governing use of our website and services.',
  canonical: 'https://antvertize.com/terms-and-conditions',
})
</script>

<template>
  <DefaultLayout>
    <section class="legal-page">
      <Container>
        <div class="legal-content">
          <h1>Terms & Conditions</h1>
          <p class="last-updated">Last updated: January 2026</p>

          <h2>1. Agreement to Terms</h2>
          <p>By accessing or using the Antvertize website (antvertize.com) or engaging our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our website or services.</p>

          <h2>2. Our Services</h2>
          <p>Antvertize Digital Agency Ltd provides brand strategy, web design and development, and digital marketing services. Specific service terms are governed by individual client agreements or statements of work.</p>

          <h2>3. Intellectual Property</h2>
          <p>All content on this website—including text, graphics, logos, and design—is the property of Antvertize Digital Agency Ltd and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.</p>
          <p>Work product developed for clients is transferred to client ownership upon full payment, as outlined in the applicable service agreement.</p>

          <h2>4. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Antvertize will not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or services. Our total liability shall not exceed the fees paid for the specific service in question.</p>

          <h2>5. Third-Party Links</h2>
          <p>Our website may contain links to third-party websites. We are not responsible for the content, privacy practices, or terms of those sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.</p>

          <h2>6. Disclaimer of Warranties</h2>
          <p>Our website is provided on an "as is" basis. We make no warranties, express or implied, regarding the accuracy, completeness, or fitness for a particular purpose of website content. Marketing results depend on many factors outside our control, and no specific outcomes are guaranteed.</p>

          <h2>7. Governing Law</h2>
          <p>These terms are governed by the laws of the State of New York, USA. Any disputes shall be resolved in the courts of New York County, and you consent to the exclusive jurisdiction of those courts.</p>

          <h2>8. Changes to Terms</h2>
          <p>We reserve the right to update these terms at any time. Continued use of our website after updates constitutes acceptance of the revised terms. We will post the date of the most recent revision at the top of this page.</p>

          <h2>9. Contact</h2>
          <p>Legal enquiries: <a href="mailto:legal@antvertize.com">legal@antvertize.com</a></p>
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
