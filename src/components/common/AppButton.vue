<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import type { CTA } from '@/types/content'

const props = defineProps<{
  cta: CTA
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}>()

const emit = defineEmits<{
  modalOpen: []
}>()

const router = useRouter()

const variant = computed(() => props.variant ?? 'primary')
const size = computed(() => props.size ?? 'md')

function handleClick() {
  const { action, href } = props.cta
  if (action === 'route' && href) {
    router.push(href)
  } else if (action === 'external' && href) {
    window.open(href, props.cta.target ?? '_blank', 'noopener,noreferrer')
  } else if (action === 'scroll' && href) {
    const target = document.querySelector(href)
    target?.scrollIntoView({ behavior: 'smooth' })
  } else if (action === 'modal') {
    emit('modalOpen')
  }
}

const isLink = computed(() =>
  (props.cta.action === 'route' || props.cta.action === 'external') && !!props.cta.href
)
</script>

<template>
  <a
    v-if="isLink && cta.action === 'external'"
    :href="cta.href"
    :target="cta.target ?? '_blank'"
    rel="noopener noreferrer"
    class="app-btn"
    :class="[variant, size]"
  >
    <slot>{{ cta.label }}</slot>
  </a>
  <RouterLink
    v-else-if="isLink && cta.action === 'route'"
    :to="cta.href!"
    class="app-btn"
    :class="[variant, size]"
  >
    <slot>{{ cta.label }}</slot>
  </RouterLink>
  <button
    v-else
    type="button"
    class="app-btn"
    :class="[variant, size]"
    @click="handleClick"
  >
    <slot>{{ cta.label }}</slot>
  </button>
</template>

<style scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  font-family: var(--font-body);
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  border: none;
  text-decoration: none;
  transition: transform var(--motion-base) var(--ease-out-expo),
              box-shadow var(--motion-base) var(--ease-out-expo),
              opacity var(--motion-fast) ease;
  position: relative;
  overflow: hidden;
}

.app-btn.sm { padding: 10px 18px; font-size: 14px; }
.app-btn.md { padding: 14px 24px; font-size: 15px; }
.app-btn.lg { padding: 17px 32px; font-size: 16px; }

/* Primary */
.app-btn.primary {
  background: linear-gradient(135deg, #8B5CF6 0%, #22D3EE 100%);
  color: #fff;
  box-shadow: 0 12px 32px rgba(139, 92, 246, 0.28);
}
.app-btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(139, 92, 246, 0.38);
  opacity: 0.92;
}
.app-btn.primary:active { transform: translateY(0); }

/* Secondary */
.app-btn.secondary {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: var(--color-primary);
  box-shadow: none;
}
.app-btn.secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
}

/* Ghost */
.app-btn.ghost {
  background: transparent;
  color: var(--color-secondary);
  border: 1px solid transparent;
}
.app-btn.ghost:hover {
  color: var(--color-primary);
  border-color: var(--glass-border);
}
</style>
