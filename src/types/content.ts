export type CTA = {
  label: string
  href?: string
  action?: 'route' | 'scroll' | 'modal' | 'external' | 'submit' | 'mailto'
  target?: '_self' | '_blank'
}

export type TrustBrandLogoId = 'google-ads' | 'meta-ads' | 'dv360' | 'trade-desk'

export type TrustBarItem = {
  name: string
  logo?: TrustBrandLogoId
}

export type TrustBarData = {
  eyebrow?: string
  items: Array<string | TrustBarItem>
}

export type BulletListItem = {
  id: string
  title: string
  description?: string
}

export type BulletListData = {
  eyebrow?: string
  title?: string
  intro?: string
  items: BulletListItem[]
  variant?: 'check' | 'numbered' | 'icon'
  columns?: 1 | 2 | 3
}

export type FeatureTab = {
  id: string
  label: string
  icon?: string
  heading?: string
  items: string[]
}

export type FeatureTabsData = {
  eyebrow?: string
  title?: string
  intro?: string
  tabs: FeatureTab[]
  autoplayMs?: number
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

export type HeroVisualKey =
  | 'home-growth'
  | 'services-channels'
  | 'about-decade'
  | 'case-studies-results'
  | 'contact-audit'

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
  layout?: 'split' | 'centered'
  /** Which visual composition to render in the right column (split layout only). */
  visual?: HeroVisualKey
}

export type StatItem = {
  value: string
  title: string
  description: string
}

export type ServiceMetric = {
  value: string
  label: string
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
  metrics?: ServiceMetric[]
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
  | { type: 'trust-bar'; data: TrustBarData }
  | { type: 'bullet-list'; data: BulletListData }
  | { type: 'feature-tabs'; data: FeatureTabsData }
  | { type: 'contact-form' }

export type MarketingPageContent = {
  seo: SeoMeta
  hero: HeroContent
  sections: PageSection[]
}
