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
  padding: 88px 20px 20px;
}

.menu-nav {
  flex: 1;
  padding-block: 16px 32px;
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
