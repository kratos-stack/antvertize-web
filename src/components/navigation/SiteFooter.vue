<script setup lang="ts">
import Container from '@/components/common/Container.vue'
import AppLink from '@/components/common/AppLink.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'
import { footerContent } from '@/content/footer'
import { navItems } from '@/content/navigation'
</script>

<template>
  <footer class="site-footer">
    <Container>
      <!-- Top: logo + nav columns -->
      <RevealOnScroll as="div" class="footer-top">
        <div class="footer-brand">
          <RouterLink to="/" class="logo">
            <span class="logo-mark" aria-hidden="true">P</span>
            <span class="logo-text">Antvertize</span>
          </RouterLink>
          <p class="brand-desc">
            Premium brand, website, and growth services for modern businesses ready to lead their market.
          </p>
        </div>

        <nav class="footer-nav" aria-label="Footer navigation">
          <div class="nav-col">
            <span class="nav-heading">Services</span>
            <ul role="list">
              <li v-for="item in navItems" :key="item.href">
                <AppLink :href="item.href">{{ item.label }}</AppLink>
              </li>
            </ul>
          </div>
          <div class="nav-col">
            <span class="nav-heading">Company</span>
            <ul role="list">
              <li><AppLink href="/about-antvertize">About Us</AppLink></li>
              <li><AppLink href="/careers">Careers</AppLink></li>
            </ul>
          </div>
        </nav>
      </RevealOnScroll>

      <!-- City presence -->
      <p class="city-line" aria-label="Our locations">{{ footerContent.cityLine }}</p>

      <!-- Divider -->
      <div class="divider" role="separator" />

      <!-- Bottom bar -->
      <RevealOnScroll as="div" class="footer-bottom" :delay="80">
        <p class="address">{{ footerContent.address }}</p>
        <div class="footer-links">
          <AppLink v-for="link in footerContent.links" :key="link.href" :href="link.href">
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
        <p class="copyright">{{ footerContent.copyright }}</p>
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
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1024px) {
  .footer-top {
    grid-template-columns: 1.5fr 1fr;
  }
}

.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  width: fit-content;
}

.logo-mark {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: linear-gradient(135deg, #8B5CF6, #22D3EE);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 16px;
  color: #fff;
  flex-shrink: 0;
}

.logo-text {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 18px;
  color: var(--color-primary);
}

.brand-desc {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-muted);
  max-width: 340px;
}

.footer-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

.nav-col {
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

.nav-col ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nav-col ul li a {
  font-size: 14px;
  color: var(--color-muted);
}

.city-line {
  font-size: 13px;
  color: var(--color-muted);
  letter-spacing: 0.04em;
  margin-bottom: 32px;
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

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
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

.copyright {
  font-size: 13px;
  color: var(--color-muted);
  width: 100%;
}
</style>
