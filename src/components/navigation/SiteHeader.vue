<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Container from '@/components/common/Container.vue'
import AppButton from '@/components/common/AppButton.vue'
import MobileMenu from './MobileMenu.vue'
import { navItems, navCta } from '@/content/navigation'

const route = useRoute()
const scrolled = ref(false)
const mobileOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
})
</script>

<template>
  <header class="site-header" :class="{ scrolled }">
    <Container>
      <nav class="nav-inner" aria-label="Main navigation">
        <!-- Logo -->
        <RouterLink to="/" class="logo" aria-label="Antvertize home">
          <span class="logo-mark" aria-hidden="true">P</span>
          <span class="logo-text">Antvertize</span>
        </RouterLink>

        <!-- Desktop nav -->
        <ul class="nav-links" role="list">
          <li v-for="item in navItems" :key="item.href">
            <RouterLink :to="item.href" class="nav-link" :class="{ active: route.path === item.href }">
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>

        <!-- Desktop CTA -->
        <div class="nav-cta">
          <AppButton :cta="navCta" variant="primary" size="sm" />
        </div>

        <!-- Mobile hamburger -->
        <button
          class="hamburger"
          :class="{ open: mobileOpen }"
          aria-label="Toggle mobile menu"
          :aria-expanded="mobileOpen"
          @click="mobileOpen = !mobileOpen"
        >
          <span /><span /><span />
        </button>
      </nav>
    </Container>
  </header>

  <MobileMenu :open="mobileOpen" @close="mobileOpen = false" />
</template>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background var(--motion-base) ease, box-shadow var(--motion-base) ease;
  padding-block: 20px;
}

.site-header.scrolled {
  background: rgba(6, 8, 22, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 var(--divider);
  padding-block: 14px;
}

.nav-inner {
  display: flex;
  align-items: center;
  gap: 32px;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  flex-shrink: 0;
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
}

.logo-text {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 18px;
  color: var(--color-primary);
}

.nav-links {
  display: none;
  list-style: none;
  align-items: center;
  gap: 4px;
  flex: 1;
  margin-left: 16px;
}

.nav-link {
  display: block;
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-secondary);
  text-decoration: none;
  transition: color var(--motion-fast) ease, background var(--motion-fast) ease;
}

.nav-link:hover, .nav-link.active {
  color: var(--color-primary);
  background: var(--glass-bg);
}

.nav-cta {
  display: none;
  margin-left: auto;
}

.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 44px;
  height: 44px;
  padding: 8px;
  margin-left: auto;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 8px;
  cursor: pointer;
}

.hamburger span {
  display: block;
  height: 2px;
  background: var(--color-secondary);
  border-radius: 2px;
  transition: transform var(--motion-base) var(--ease-out-expo), opacity var(--motion-fast) ease;
}

.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

@media (min-width: 1024px) {
  .nav-links { display: flex; }
  .nav-cta { display: block; }
  .hamburger { display: none; }
}
</style>
