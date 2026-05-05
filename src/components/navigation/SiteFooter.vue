<script setup lang="ts">
import Container from '@/components/common/Container.vue'
import AppLink from '@/components/common/AppLink.vue'
import AntvertizeLogo from '@/components/common/AntvertizeLogo.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'
import { footerContent } from '@/content/footer'
</script>

<template>
  <footer class="site-footer">
    <Container>
      <RevealOnScroll as="div" class="footer-top">
        <div class="footer-brand">
          <RouterLink to="/" class="logo" aria-label="Antvertize home">
            <AntvertizeLogo :height="32" />
          </RouterLink>
          <p class="footer-tagline">{{ footerContent.tagline }}</p>
          <p class="footer-service-line">
            <em>{{ footerContent.serviceLine }}</em>
          </p>
          <a class="footer-email" :href="`mailto:${footerContent.email}`">
            {{ footerContent.email }}
          </a>
        </div>

        <nav class="footer-nav" aria-label="Footer navigation">
          <span class="nav-heading">Sitemap</span>
          <ul role="list" class="footer-links-list">
            <li v-for="item in footerContent.navLinks" :key="item.href">
              <AppLink :href="item.href">{{ item.label }}</AppLink>
            </li>
          </ul>
        </nav>
      </RevealOnScroll>

      <div class="divider" role="separator" />

      <RevealOnScroll as="div" class="footer-bottom" :delay="80">
        <p class="copyright">{{ footerContent.copyright }}</p>
        <div class="legal-links">
          <AppLink v-for="link in footerContent.legalLinks" :key="link.href" :href="link.href">
            {{ link.label }}
          </AppLink>
        </div>
        <div class="social-links">
          <a
            v-for="s in footerContent.social"
            :key="s.href"
            :href="s.href"
            :aria-label="s.label"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >{{ s.icon }}</a>
        </div>
      </RevealOnScroll>
    </Container>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--color-elevated);
  border-top: 1px solid var(--divider);
  padding-block: 72px 40px;
}

.footer-top {
  display: grid;
  gap: 48px;
  margin-bottom: 48px;
}

@media (min-width: 768px) {
  .footer-top { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1024px) {
  .footer-top { grid-template-columns: 1.6fr 1fr; }
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.logo {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  width: fit-content;
  color: var(--color-primary);
}

.footer-tagline {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-primary);
  max-width: 380px;
  margin: 0;
}

.footer-service-line {
  font-size: 14px;
  line-height: 1.6;
  color: var(--color-muted);
  margin: 0;
}

.footer-service-line em {
  font-style: italic;
}

.footer-email {
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 500;
  color: #c4b5fd;
  text-decoration: none;
  width: fit-content;
  border-bottom: 1px solid transparent;
  transition: border-color var(--motion-fast) ease;
}

.footer-email:hover {
  border-bottom-color: rgba(196, 181, 253, 0.5);
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.nav-heading {
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted);
}

.footer-links-list {
  list-style: none;
  margin: 0;
  padding: 0;
  /* Single column on phones; wraps to 2 columns at small breakpoints,
     then 3 columns from tablet up so the sitemap reads horizontally. */
  column-count: 1;
  column-gap: 32px;
}

@media (min-width: 480px) {
  .footer-links-list { column-count: 2; }
}

@media (min-width: 768px) {
  .footer-links-list { column-count: 3; }
}

.footer-links-list li {
  break-inside: avoid;
  margin-bottom: 10px;
}

.footer-links-list li:last-child { margin-bottom: 0; }

.footer-links-list li a {
  font-size: 14px;
  color: var(--color-secondary);
}

.divider {
  height: 1px;
  background: var(--divider);
  margin-bottom: 28px;
}

.footer-bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  align-items: center;
  font-size: 13px;
  color: var(--color-muted);
}

.copyright {
  font-size: 13px;
  color: var(--color-muted);
  margin: 0;
}

.legal-links {
  display: flex;
  gap: 20px;
}

.legal-links a {
  font-size: 13px;
  color: var(--color-muted);
}

.social-links {
  display: flex;
  gap: 10px;
  margin-left: auto;
}

.social-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  color: var(--color-muted);
  text-decoration: none;
  transition: color var(--motion-fast) ease, border-color var(--motion-fast) ease;
}

.social-icon:hover {
  color: var(--color-primary);
  border-color: rgba(255, 255, 255, 0.2);
}
</style>
