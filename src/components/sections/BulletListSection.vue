<script setup lang="ts">
import { computed } from 'vue'
import type { BulletListData } from '@/types/content'
import Container from '@/components/common/Container.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

const props = defineProps<BulletListData>()

const columnCount = computed(() => props.columns ?? 2)
const variant = computed(() => props.variant ?? 'check')
</script>

<template>
  <section class="bullet-list-section">
    <Container>
      <SectionHeader v-if="title" :eyebrow="eyebrow" :title="title" align="center" class="section-head" />
      <RevealOnScroll v-if="intro" :delay="40">
        <p class="intro">{{ intro }}</p>
      </RevealOnScroll>
      <ul
        class="bullet-grid"
        role="list"
        :class="[`cols-${columnCount}`, `variant-${variant}`]"
      >
        <li v-for="(item, idx) in items" :key="item.id" class="bullet-item">
          <RevealOnScroll :delay="idx * 60" :duration="600" direction="up">
            <div class="bullet-inner">
              <span class="bullet-icon" aria-hidden="true">
                <template v-if="variant === 'numbered'">{{ idx + 1 }}</template>
                <template v-else-if="variant === 'icon'">✦</template>
                <template v-else>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7l3 3 5-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </template>
              </span>
              <div class="bullet-text">
                <span class="bullet-title">{{ item.title }}</span>
                <p v-if="item.description" class="bullet-desc">{{ item.description }}</p>
              </div>
            </div>
          </RevealOnScroll>
        </li>
      </ul>
    </Container>
  </section>
</template>

<style scoped>
.bullet-list-section { padding-block: 72px; }
@media (min-width: 1024px) { .bullet-list-section { padding-block: 120px; } }

.section-head { margin-bottom: 32px; }

.intro {
  font-size: 17px;
  line-height: 1.7;
  color: var(--color-secondary);
  text-align: center;
  max-width: 720px;
  margin: 0 auto 40px;
}

.bullet-grid {
  list-style: none;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
  margin: 0;
  padding: 0;
  max-width: 980px;
  margin-inline: auto;
}

@media (min-width: 640px) {
  .cols-2 { grid-template-columns: 1fr 1fr; }
  .cols-3 { grid-template-columns: repeat(3, 1fr); }
}

.bullet-item { list-style: none; }

.bullet-inner {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 22px 24px;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg, 16px);
  height: 100%;
  transition: border-color var(--motion-fast) ease, transform var(--motion-base) var(--ease-out-expo);
}

.bullet-inner:hover {
  border-color: rgba(139, 92, 246, 0.4);
  transform: translateY(-2px);
}

.bullet-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(34, 211, 238, 0.15));
  border: 1px solid rgba(139, 92, 246, 0.4);
  color: #c4b5fd;
  flex-shrink: 0;
  font-size: 13px;
  font-weight: 700;
}

.variant-numbered .bullet-icon {
  font-family: var(--font-heading);
  font-size: 14px;
  color: #fff;
  background: linear-gradient(135deg, #8B5CF6, #22D3EE);
  border-color: transparent;
}

.bullet-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.bullet-title {
  font-family: var(--font-heading);
  font-size: 17px;
  font-weight: 600;
  color: var(--color-primary);
  line-height: 1.35;
}

.bullet-desc {
  font-size: 14px;
  line-height: 1.65;
  color: var(--color-muted);
}
</style>
