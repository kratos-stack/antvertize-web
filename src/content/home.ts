import type { MarketingPageContent } from '@/types/content'

export const homePage: MarketingPageContent = {
  seo: {
    title: 'Antvertize — Turn Ad Spend Into Predictable Growth',
    description: 'Antvertize delivers performance-driven digital advertising backed by consultants with 10+ years of expertise across programmatic, PPC, social, and video campaigns.',
    canonical: 'https://antvertize.com/',
    ogTitle: 'Antvertize — Performance Digital Advertising Agency',
    ogDescription: 'Programmatic, PPC, paid social, display, and video campaigns engineered to scale ROI.',
  },
  hero: {
    eyebrow: 'Performance Digital Advertising',
    title: 'Turn Ad Spend Into Predictable Growth',
    subtitle: 'Antvertize delivers performance-driven digital advertising backed by consultants with 10+ years of expertise across programmatic, PPC, social, and video campaigns.',
    primaryCta: { label: 'Get Free Audit', action: 'route', href: '/contact' },
    secondaryCta: { label: 'Book a Strategy Call', action: 'mailto', href: 'mailto:hello@antvertize.com' },
    highlights: ['Programmatic', 'PPC', 'Paid Social', 'Display', 'Video'],
    visual: 'home-growth',
  },
  sections: [
    {
      type: 'trust-bar',
      data: {
        eyebrow: 'Trusted across leading platforms',
        items: ['Google Ads', 'Meta Ads Manager', 'Display & Video 360', 'The Trade Desk'],
      },
    },
    {
      type: 'card-grid',
      eyebrow: 'What We Do',
      title: 'We help brands scale profitably through data-driven advertising. No guesswork. No wasted spend.',
      items: [
        {
          id: 'programmatic',
          icon: 'programmatic',
          title: 'Programmatic Advertising',
          body: 'Reach the right audience at the right time using DV360 and The Trade Desk. Real-time bidding, audience segmentation, and cross-channel execution\u2014done right.',
          cta: { label: 'Learn More \u2192', action: 'route', href: '/services#programmatic' },
        },
        {
          id: 'ppc',
          icon: 'ppc',
          title: 'PPC Campaign Management',
          body: 'Maximize ROI with high-converting Google Ads campaigns built around buyer intent. Keyword strategy, ad-copy testing, and conversion tracking, handled end-to-end.',
          cta: { label: 'Learn More \u2192', action: 'route', href: '/services#ppc' },
        },
        {
          id: 'social',
          icon: 'social',
          title: 'Social Media Advertising',
          body: 'Turn scrolling into sales with creative-first Meta Ads campaigns. Sharp audience design, rigorous testing, and full-funnel optimization that drives revenue.',
          cta: { label: 'Learn More \u2192', action: 'route', href: '/services#social' },
        },
        {
          id: 'display',
          icon: 'display',
          title: 'Display & Retargeting',
          body: 'Stay top-of-mind and bring back lost visitors. Branded banners, dynamic retargeting, and behavioral targeting that re-engages high-intent buyers.',
          cta: { label: 'Learn More \u2192', action: 'route', href: '/services#display' },
        },
        {
          id: 'video',
          icon: 'video',
          title: 'Video Advertising',
          body: 'Tell your brand story through impactful YouTube and in-stream video. We plan, produce, and optimize for measurable performance\u2014not just views.',
          cta: { label: 'Learn More \u2192', action: 'route', href: '/services#video' },
        },
      ],
    },
    {
      type: 'feature-tabs',
      data: {
        eyebrow: 'Why Antvertize',
        title: 'No guesswork. No wasted spend.',
        intro: 'We help brands scale profitably through data-driven advertising. Five reasons clients pick us\u2014and stay.',
        autoplayMs: 6500,
        tabs: [
          {
            id: 'expertise',
            label: 'Our Expertise',
            icon: '◆',
            heading: 'Our expertise.',
            items: [
              '10+ years of hands-on experience',
              'Performance-first approach',
              'Transparent reporting',
              'Custom strategies, not templates',
            ],
          },
          {
            id: 'difference',
            label: 'What Sets Us Apart',
            icon: '✦',
            heading: 'What sets us apart.',
            items: [
              'Data-first decision making, not guesswork',
              'Continuous optimization for maximum ROI',
              'Full-funnel strategy from awareness to conversion',
              'Platform-agnostic expertise (Google, Meta, DSPs & more)',
            ],
          },
          {
            id: 'results',
            label: 'Results You Can Expect',
            icon: '↑',
            heading: 'Results you can expect.',
            items: [
              'Higher conversion rates with smarter targeting',
              'Lower cost per acquisition (CPA)',
              'Scalable campaigns that grow with your business',
              'Clear insights you can actually act on',
            ],
          },
          {
            id: 'approach',
            label: 'Our Approach',
            icon: '◉',
            heading: 'Our approach.',
            items: [
              'Deep audience and competitor research',
              'Custom campaign architecture tailored to your goals',
              'Ongoing testing (creative, audiences, bidding)',
              'Real-time adjustments based on performance data',
            ],
          },
          {
            id: 'retention',
            label: 'Why Clients Stay',
            icon: '★',
            heading: 'Why clients stay.',
            items: [
              'Dedicated account management',
              'Fast, transparent communication',
              'No long-term lock-ins\u2014just results that speak',
              'A true growth partner, not just a service provider',
            ],
          },
        ],
      },
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'Ready to scale your ads?',
        title: 'Get your free performance audit today.',
        description: 'Get a no-obligation analysis of your current campaigns and the highest-impact opportunities to improve ROI.',
        primaryCta: { label: 'Get Free Audit', action: 'route', href: '/contact' },
        secondaryCta: { label: 'Book a Strategy Call', action: 'mailto', href: 'mailto:hello@antvertize.com' },
      },
    },
  ],
}
