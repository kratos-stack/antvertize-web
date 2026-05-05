import type { MarketingPageContent } from '@/types/content'

export const aboutPage: MarketingPageContent = {
  seo: {
    title: 'About Antvertize | Performance Digital Advertising Agency',
    description: 'Antvertize is a performance-driven digital advertising agency with 10+ years of experience helping businesses grow through smarter media buying.',
    canonical: 'https://antvertize.com/about',
  },
  hero: {
    eyebrow: 'About Antvertize',
    title: 'Who We Are',
    subtitle: 'Antvertize is a performance-driven digital advertising agency with over a decade of experience helping businesses grow through smarter media buying. We combine strategy, data, and creativity to deliver campaigns that don\u2019t just generate clicks, but real business results.',
    primaryCta: { label: 'Get Free Audit', action: 'route', href: '/contact' },
    secondaryCta: { label: 'Book a Strategy Call', action: 'mailto', href: 'mailto:hello@antvertize.com' },
    visual: 'about-decade',
  },
  sections: [
    {
      type: 'bullet-list',
      data: {
        eyebrow: 'Our Approach',
        title: 'We don\u2019t believe in one-size-fits-all campaigns.',
        intro: 'Every strategy is built around:',
        columns: 3,
        variant: 'check',
        items: [
          { id: 'goals', title: 'Your business goals' },
          { id: 'audience', title: 'Your audience behaviour' },
          { id: 'growth', title: 'Your growth targets' },
        ],
      },
    },
    {
      type: 'bullet-list',
      data: {
        eyebrow: 'Our Expertise',
        title: 'With 10+ years in digital advertising, we\u2019ve mastered:',
        columns: 2,
        variant: 'check',
        items: [
          { id: 'programmatic', title: 'Programmatic ecosystems' },
          { id: 'paid-search', title: 'Paid search strategies' },
          { id: 'social', title: 'Social ad scaling' },
          { id: 'cro', title: 'Conversion optimization' },
        ],
      },
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'Ready to scale your ads?',
        title: 'Get your free performance audit today.',
        primaryCta: { label: 'Get Free Audit', action: 'route', href: '/contact' },
        secondaryCta: { label: 'Book a Strategy Call', action: 'mailto', href: 'mailto:hello@antvertize.com' },
      },
    },
  ],
}
