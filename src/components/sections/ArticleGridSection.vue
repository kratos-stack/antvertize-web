<script setup lang="ts">
import type { ArticleItem } from '@/types/content'
import Container from '@/components/common/Container.vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import GlassCard from '@/components/surfaces/GlassCard.vue'
import RevealOnScroll from '@/components/common/RevealOnScroll.vue'

defineProps<{
  items: ArticleItem[]
  title?: string
  eyebrow?: string
}>()
</script>

<template>
  <section class="article-section">
    <Container>
      <SectionHeader v-if="title" :eyebrow="eyebrow" :title="title" align="center" class="section-head" />
      <ul class="article-grid" role="list">
        <RevealOnScroll v-for="(item, idx) in items" :key="item.id" as="li" :delay="idx * 80">
          <GlassCard hover class="article-card">
            <div class="article-meta">
              <span class="article-category">{{ item.category }}</span>
              <span class="article-read-time">{{ item.readTime }}</span>
            </div>
            <h3 class="article-title">{{ item.title }}</h3>
            <p class="article-excerpt">{{ item.excerpt }}</p>
            <div class="article-date">{{ item.date }}</div>
          </GlassCard>
        </RevealOnScroll>
      </ul>
    </Container>
  </section>
</template>

<style scoped>
.article-section { padding-block: 72px; }
@media (min-width: 1024px) { .article-section { padding-block: 120px; } }

.section-head { margin-bottom: 56px; }

.article-grid {
  list-style: none;
  display: grid;
  gap: 16px;
}

@media (min-width: 640px) { .article-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .article-grid { grid-template-columns: repeat(3, 1fr); } }

.article-card {
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  height: 100%;
}

.article-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.article-category {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #22D3EE;
}

.article-read-time {
  font-size: 12px;
  color: var(--color-muted);
}

.article-title {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.35;
}

.article-excerpt {
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-secondary);
  flex: 1;
}

.article-date {
  font-size: 12px;
  color: var(--color-muted);
}
</style>
