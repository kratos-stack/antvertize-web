import type { MarketingPageContent } from '@/types/content'

export const aboutPage: MarketingPageContent = {
  seo: {
    title: 'About Antvertize | Premium Digital Agency',
    description: 'Learn about Antvertize—the team, the values, and the philosophy behind one of the world\'s most trusted premium digital agencies.',
    canonical: 'https://antvertize.com/about-antvertize',
  },
  hero: {
    eyebrow: 'About Antvertize',
    title: 'We build the brands that define their categories.',
    subtitle: 'Antvertize is a premium digital agency with 12+ years of experience turning ambitious businesses into market leaders through strategy, design, and performance.',
    primaryCta: { label: 'Work With Us', action: 'modal' },
    highlights: ['12+ Years', '250+ Clients', '4 Continents'],
  },
  sections: [
    {
      type: 'stat-grid',
      items: [
        { value: '12+', title: 'Years in Business', description: 'Founded in 2013, Antvertize has grown to become a trusted partner for ambitious businesses worldwide.' },
        { value: '42', title: 'Team Members', description: 'Strategists, designers, developers, and marketers—united by a shared obsession with quality and results.' },
        { value: '4', title: 'Global Offices', description: 'New York, London, Dubai, and Singapore—close to the clients and markets that matter.' },
        { value: '250+', title: 'Clients Served', description: 'From venture-backed startups to FTSE 250 enterprises, we\'ve earned the trust of the best.' },
      ],
    },
    {
      type: 'value-word-cloud',
      eyebrow: 'Our Values',
      title: 'What drives everything we do.',
      items: [
        'Excellence', 'Integrity', 'Impact', 'Craft', 'Precision',
        'Ambition', 'Partnership', 'Clarity', 'Boldness', 'Rigour',
        'Creativity', 'Accountability', 'Curiosity', 'Generosity',
      ],
    },
    {
      type: 'text-columns',
      data: {
        eyebrow: 'Our Philosophy',
        title: 'Why we\'re different—and why it matters.',
        columns: [
          {
            heading: 'Beyond Ordinary',
            body: 'We refuse to be average. Every brief is an opportunity to do something exceptional. This isn\'t just a tagline—it\'s a standard that every member of our team holds themselves to, every single day.',
          },
          {
            heading: 'Creative Brains, Analytical Backbone',
            body: 'Beautiful work that doesn\'t deliver results is decoration. Data without creativity is spreadsheets. We combine right-brain creativity with left-brain rigour to produce work that\'s both brilliant and effective.',
          },
          {
            heading: 'Big Ideas, Real Impact',
            body: 'We don\'t do small thinking. We work with clients who want to redefine their category, capture their market, and build something that lasts. Our ideas are ambitious because your ambitions deserve nothing less.',
          },
          {
            heading: 'A Framework That Works',
            body: 'Twelve years of work across every sector and market size has given us something valuable: a proven framework. We know what works, we iterate on what doesn\'t, and we share our thinking openly with every client.',
          },
          {
            heading: 'From Hidden Gem to Household Name',
            body: 'The businesses we\'re most proud of didn\'t start as household names. They were exceptional products with unclear stories and unrealised potential. Helping them realise that potential is exactly what we do.',
          },
        ],
      },
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'Join Our Clients',
        title: 'Ready to build something great together?',
        description: 'We work with a select number of clients each quarter to ensure every project gets the attention and quality it deserves.',
        primaryCta: { label: 'Start a Conversation', action: 'modal' },
        secondaryCta: { label: 'View Our Services', action: 'route', href: '/digital-marketing-services' },
      },
    },
  ],
}
