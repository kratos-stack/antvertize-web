<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import AppButton from '@/components/common/AppButton.vue'
import { navItems, navCta } from '@/content/navigation'

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{ close: [] }>()
const route = useRoute()

watch(() => route.path, () => emit('close'))

watch(() => props.open, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Transition name="menu">
    <div v-if="open" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation">
      <div class="menu-header">
        <RouterLink to="/" class="logo" @click="emit('close')">
          <span class="logo-mark">P</span>
          <span class="logo-text">Antvertize</span>
        </RouterLink>
        <button class="close-btn" aria-label="Close menu" @click="emit('close')">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <nav class="menu-nav">
        <ul role="list">
          <li v-for="item in navItems" :key="item.href">
            <RouterLink
              :to="item.href"
              class="menu-link"
              :class="{ active: route.path === item.href }"
              @click="emit('close')"
            >
              {{ item.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="menu-footer">
        <AppButton :cta="navCta" variant="primary" size="lg" />
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 99;
  background: rgba(6, 8, 22, 0.97);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--divider);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
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

.close-btn {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 10px;
  color: var(--color-secondary);
  cursor: pointer;
  transition: color var(--motion-fast) ease;
}

.close-btn:hover { color: var(--color-primary); }

.menu-nav {
  flex: 1;
  padding-block: 32px;
}

.menu-nav ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-link {
  display: block;
  padding: 14px 16px;
  font-size: 20px;
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--color-secondary);
  text-decoration: none;
  border-radius: 12px;
  transition: color var(--motion-fast) ease, background var(--motion-fast) ease;
}

.menu-link:hover, .menu-link.active {
  color: var(--color-primary);
  background: var(--glass-bg);
}

.menu-footer { padding-top: 24px; border-top: 1px solid var(--divider); }
.menu-footer .app-btn { width: 100%; justify-content: center; }

/* Transition */
.menu-enter-active, .menu-leave-active {
  transition: opacity var(--motion-base) ease, transform var(--motion-base) var(--ease-out-expo);
}
.menu-enter-from, .menu-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@media (min-width: 1024px) {
  .mobile-menu { display: none; }
}
</style>
