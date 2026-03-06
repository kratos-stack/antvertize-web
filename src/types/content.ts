export type CTA = {
  label: string
  href?: string
  action?: 'route' | 'scroll' | 'modal' | 'external' | 'submit'
  target?: '_self' | '_blank'
}

export type SeoMeta = {
  title: string
  description: string
  canonical?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  robots?: string
}

export type HeroContent = {
  eyebrow?: string
  title: string
  subtitle?: string
  primaryCta?: CTA
  secondaryCta?: CTA
  media?: {
    type: 'image' | 'video' | 'illustration'
    src: string
    alt: string
  }
  highlights?: string[]
}

export type StatItem = {
  value: string
  title: string
  description: string
}

export type ServiceItem = {
  id: string
  label?: string
  title: string
  subtitle?: string
  body: string[]
  bullets?: string[]
  cta?: CTA
  media?: {
    src: string
    alt: string
  }
  layout?: 'left' | 'right'
}

export type FAQItem = {
  question: string
  answer: string
}

export type CaseStudyItem = {
  id: string
  title: string
  client: string
  category: string
  summary: string
  tags: string[]
  href?: string
}

export type ArticleItem = {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  href?: string
}

export type CardItem = {
  id: string
  icon?: string
  title: string
  body: string
  cta?: CTA
}

export type CTABannerData = {
  eyebrow?: string
  title: string
  description?: string
  primaryCta?: CTA
  secondaryCta?: CTA
}

export type TextColumnsData = {
  eyebrow?: string
  title: string
  columns: { heading: string; body: string }[]
}

export type PageSection =
  | { type: 'stat-grid'; items: StatItem[] }
  | { type: 'service-detail-list'; items: ServiceItem[] }
  | { type: 'card-grid'; title?: string; eyebrow?: string; items: CardItem[] }
  | { type: 'case-study-grid'; title?: string; eyebrow?: string; items: CaseStudyItem[] }
  | { type: 'article-grid'; title?: string; eyebrow?: string; items: ArticleItem[] }
  | { type: 'faq'; title?: string; eyebrow?: string; items: FAQItem[] }
  | { type: 'marquee'; items: string[] }
  | { type: 'cta-banner'; data: CTABannerData }
  | { type: 'value-word-cloud'; title?: string; eyebrow?: string; items: string[] }
  | { type: 'text-columns'; data: TextColumnsData }

export type MarketingPageContent = {
  seo: SeoMeta
  hero: HeroContent
  sections: PageSection[]
}
