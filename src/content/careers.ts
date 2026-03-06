import type { MarketingPageContent } from '@/types/content'

export const careersPage: MarketingPageContent = {
  seo: {
    title: 'Careers at Antvertize | Join Our Team',
    description: 'Join a team of world-class strategists, designers, and developers. Explore open roles at Antvertize.',
    canonical: 'https://antvertize.com/careers',
  },
  hero: {
    eyebrow: 'Careers',
    title: 'Work that challenges. People who inspire.',
    subtitle: 'We\'re building the most talented digital team in the world. If you\'re exceptional at what you do and driven by meaningful work, we\'d love to meet you.',
    primaryCta: { label: 'See Open Roles', action: 'scroll', href: '#roles' },
    highlights: ['Remote-First', 'Competitive Pay', 'Global Team', 'Real Impact'],
  },
  sections: [
    {
      type: 'text-columns',
      data: {
        eyebrow: 'Our Culture',
        title: 'A place where great work thrives.',
        columns: [
          {
            heading: 'Craft Over Quantity',
            body: 'We\'d rather do fewer things with extraordinary care than churn through mediocre work. Quality is how we measure success, not volume.',
          },
          {
            heading: 'Radical Transparency',
            body: 'No politics, no hidden agendas. We share business context openly, give honest feedback, and trust each other to handle the truth.',
          },
          {
            heading: 'Grow With Purpose',
            body: 'We invest in our team\'s growth through coaching, skills training, conference access, and meaningful work on ambitious problems.',
          },
        ],
      },
    },
    {
      type: 'card-grid',
      eyebrow: 'Open Roles',
      title: 'We\'re currently hiring.',
      items: [
        {
          id: 'role-1',
          icon: '◆',
          title: 'Senior Brand Strategist',
          body: 'Lead brand strategy engagements from discovery through delivery. 5+ years agency experience required. Remote-friendly.',
          cta: { label: 'View Role', action: 'modal' },
        },
        {
          id: 'role-2',
          icon: '◉',
          title: 'Senior Frontend Developer',
          body: 'Build premium web experiences with Vue.js or React. Strong TypeScript, CSS, and performance skills. Remote-first.',
          cta: { label: 'View Role', action: 'modal' },
        },
        {
          id: 'role-3',
          icon: '✦',
          title: 'Performance Marketing Lead',
          body: 'Manage and grow a portfolio of paid media accounts. Google and Meta expertise essential. Data-driven, creative mindset.',
          cta: { label: 'View Role', action: 'modal' },
        },
      ],
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'No Suitable Role?',
        title: 'Send us a speculative application.',
        description: 'If you\'re exceptional and align with our values, we\'ll always make time for a conversation—even if we\'re not actively hiring for your role.',
        primaryCta: { label: 'Get In Touch', action: 'modal' },
      },
    },
  ],
}
