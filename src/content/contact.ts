import type { MarketingPageContent } from '@/types/content'

export const contactPage: MarketingPageContent = {
  seo: {
    title: 'Contact Antvertize | Free Performance Audit',
    description: 'Get a free performance audit of your current ad campaigns. Tell us about your business and our team will be in touch.',
    canonical: 'https://antvertize.com/contact',
  },
  hero: {
    eyebrow: 'Contact',
    title: 'Let\u2019s Grow Your Business',
    subtitle: 'Ready to scale your advertising performance? Fill out the form below and get a free audit of your current campaigns.',
    primaryCta: { label: 'Get My Free Audit', action: 'scroll', href: '#contact-form' },
    secondaryCta: { label: `Or email hello@antvertize.com`, action: 'mailto', href: 'mailto:hello@antvertize.com' },
    visual: 'contact-audit',
  },
  sections: [
    {
      type: 'contact-form',
    },
  ],
}
