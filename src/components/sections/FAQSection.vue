<script setup lang="ts">
import { ref } from 'vue'
import type { FAQItem } from '@/types/content'
import Container from '@/components/common/Container.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

defineProps<{
  items: FAQItem[]
  title?: string
  eyebrow?: string
}>()

const open = ref<number | null>(0)

function toggle(idx: number) {
  open.value = open.value === idx ? null : idx
}
</script>

<template>
  <section class="faq-section">
    <Container>
      <SectionHeader
        v-if="title"
        :eyebrow="eyebrow"
        :title="title"
        align="center"
      />
      <dl class="faq-list">
        <RevealOnScroll
          v-for="(item, idx) in items"
          :key="idx"
          as="div"
          :delay="idx * 60"
          class="faq-item"
          :class="{ 'is-open': open === idx }"
        >
          <dt>
            <button
              class="faq-question"
              :aria-expanded="open === idx"
              :aria-controls="`faq-answer-${idx}`"
              :id="`faq-btn-${idx}`"
              @click="toggle(idx)"
            >
              <span>{{ item.question }}</span>
              <span class="faq-icon" aria-hidden="true">{{ open === idx ? '−' : '+' }}</span>
            </button>
          </dt>
          <dd
            :id="`faq-answer-${idx}`"
            :aria-labelledby="`faq-btn-${idx}`"
            class="faq-answer"
          >
            <p>{{ item.answer }}</p>
          </dd>
        </RevealOnScroll>
      </dl>
    </Container>
  </section>
</template>

<style scoped>
.faq-section { padding-block: 72px; }

@media (min-width: 1024px) { .faq-section { padding-block: 120px; } }

.section-header { margin-bottom: 56px; }

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 760px;
  margin-inline: auto;
  margin-top: 56px;
}

.faq-item {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--motion-fast) ease;
}

.faq-item.is-open {
  border-color: rgba(139, 92, 246, 0.3);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 22px 24px;
  font-size: 16px;
  font-weight: 600;
  color: var(--color-primary);
  font-family: var(--font-heading);
  text-align: left;
  cursor: pointer;
  background: transparent;
  border: none;
  gap: 16px;
  transition: color var(--motion-fast) ease;
}

.faq-question:hover { color: #c4b5fd; }

.faq-icon {
  font-size: 22px;
  font-weight: 300;
  color: var(--color-muted);
  flex-shrink: 0;
  transition: transform var(--motion-base) var(--ease-out-expo), color var(--motion-fast) ease;
}

.faq-item.is-open .faq-icon {
  color: #8B5CF6;
}

.faq-answer {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--motion-slow) var(--ease-out-expo);
}

.faq-item.is-open .faq-answer {
  grid-template-rows: 1fr;
}

.faq-answer > p {
  overflow: hidden;
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-secondary);
  padding: 0 24px 22px;
}
</style>
