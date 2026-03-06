import type { MarketingPageContent } from '@/types/content'

export const servicesPage: MarketingPageContent = {
  seo: {
    title: 'Digital Marketing Services | Antvertize',
    description: 'Explore Antvertize\'s complete range of digital services: brand strategy, website development, and performance marketing—all under one roof.',
    canonical: 'https://antvertize.com/digital-marketing-services',
  },
  hero: {
    eyebrow: 'Our Services',
    title: 'Everything your brand needs to grow.',
    subtitle: 'From brand identity to paid media, we deliver integrated solutions that work together to drive measurable business growth.',
    primaryCta: { label: 'Get a Free Consultation', action: 'modal' },
  },
  sections: [
    {
      type: 'service-detail-list',
      items: [
        {
          id: 'branding-overview',
          label: 'Branding',
          title: 'Build a brand that earns trust and commands attention.',
          subtitle: 'Identity · Strategy · Voice · Architecture',
          body: [
            'Your brand is the sum of every interaction a customer has with your business. We build brand systems that are distinctive, cohesive, and built to last—giving you the foundation to grow with confidence.',
            'From brand evaluation and competitive analysis through to full identity development and messaging strategy, our brand process is thorough, collaborative, and results-driven.',
          ],
          bullets: [
            'Brand Evaluation & Competitive Analysis',
            'Visual Identity Systems (logo, typography, colour, iconography)',
            'Brand Architecture & Portfolio Strategy',
            'Brand Messaging, Voice & Tone',
            'Brand Redevelopment & Market Repositioning',
          ],
          cta: { label: 'Explore Branding Services', action: 'route', href: '/branding-services' },
          layout: 'left',
        },
        {
          id: 'websites-overview',
          label: 'Websites',
          title: 'Websites engineered to convert, not just impress.',
          subtitle: 'Design · Development · CMS · E-Commerce',
          body: [
            'A premium website should be your hardest-working sales asset. We design and build digital experiences that combine stunning visuals with intelligent architecture and conversion-focused engineering.',
            'Whether you need a brand-new web presence, a Shopify store, or a complete UX overhaul, our team delivers production-ready websites that perform.',
          ],
          bullets: [
            'UI & UX Design and Prototyping',
            'Full-Stack Web Development',
            'CMS Implementation (Webflow, WordPress, Headless)',
            'E-Commerce Development (Shopify, WooCommerce)',
            'CRO, QA & Performance Optimisation',
          ],
          cta: { label: 'Explore Website Services', action: 'route', href: '/website-development-services' },
          layout: 'right',
        },
        {
          id: 'marketing-overview',
          label: 'Marketing',
          title: 'Grow faster with data-driven marketing that compounds.',
          subtitle: 'PPC · SEO · Paid Social · Email',
          body: [
            'Marketing should be predictable, measurable, and scalable. We combine paid media precision with organic growth strategies to build customer acquisition systems that deliver sustainable results.',
            'Our integrated approach means paid and organic channels work in concert—reducing cost per acquisition while building long-term brand equity.',
          ],
          bullets: [
            'Google Ads & Microsoft Ads (Search, Display, Shopping)',
            'Meta Ads, LinkedIn Ads & Paid Social',
            'Programmatic Advertising',
            'SEO (Technical, On-Page, Link Building)',
            'Social Media Marketing & Email Marketing',
          ],
          cta: { label: 'Explore Marketing Services', action: 'route', href: '/marketing-services' },
          layout: 'left',
        },
      ],
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'One team. Every capability.',
        title: 'Ready to transform your digital presence?',
        description: 'Get a tailored proposal from our strategy team—no obligation, no templates.',
        primaryCta: { label: 'Request a Free Consultation', action: 'modal' },
      },
    },
  ],
}
