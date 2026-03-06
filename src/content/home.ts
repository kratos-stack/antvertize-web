import type { MarketingPageContent } from '@/types/content'

export const homePage: MarketingPageContent = {
  seo: {
    title: 'Antvertize — Premium Digital Agency | Brand, Web & Growth',
    description: 'Award-winning digital agency specialising in brand strategy, website development, and performance marketing. Transform your brand into a growth engine.',
    canonical: 'https://antvertize.com/',
    ogTitle: 'Antvertize — Premium Digital Agency',
    ogDescription: 'Brand, website, and growth services for modern businesses ready to lead their market.',
  },
  hero: {
    eyebrow: 'The Growth Agency',
    title: 'Build a brand experience that performs across every touchpoint.',
    subtitle: 'We combine strategy, design, websites, and performance marketing into a single premium growth engine trusted by 250+ ambitious businesses worldwide.',
    primaryCta: { label: 'Get a Free Consultation', action: 'modal' },
    secondaryCta: { label: 'View Our Services', action: 'route', href: '/digital-marketing-services' },
    highlights: ['Brand Strategy', 'Digital Marketing', 'Website Development', 'AI-Powered Growth'],
  },
  sections: [
    {
      type: 'stat-grid',
      items: [
        { value: '12+', title: 'Years of Expertise', description: 'Deep digital experience across strategy, design, and execution across multiple industries.' },
        { value: '250+', title: 'Global Clients', description: 'Businesses across four continents trust Antvertize to grow their digital presence.' },
        { value: '10x', title: 'Average ROI', description: 'Our integrated approach delivers measurable returns that compound over time.' },
        { value: '98%', title: 'Client Retention', description: 'We build long-term partnerships, not transactional projects.' },
      ],
    },
    {
      type: 'marquee',
      items: ['Brand Strategy', 'Web Design', 'Performance Marketing', 'SEO', 'PPC', 'UI/UX Design', 'Branding Identity', 'Email Marketing', 'Social Media', 'CRO'],
    },
    {
      type: 'card-grid',
      eyebrow: 'What We Do Best',
      title: 'Every capability you need. Under one roof.',
      items: [
        {
          id: 'branding',
          icon: '◆',
          title: 'Brand Identity & Strategy',
          body: 'We craft distinctive brand systems—from positioning and messaging to visual identity and design language—that make your business impossible to ignore.',
          cta: { label: 'Explore Branding', action: 'route', href: '/branding-services' },
        },
        {
          id: 'websites',
          icon: '◉',
          title: 'Website Design & Development',
          body: 'Premium websites engineered for conversion. From UI/UX design to full-stack development, CMS, and e-commerce—we build digital homes that perform.',
          cta: { label: 'Explore Web Services', action: 'route', href: '/website-development-services' },
        },
        {
          id: 'marketing',
          icon: '✦',
          title: 'Performance Marketing',
          body: 'Data-driven paid and organic growth campaigns. PPC, paid social, SEO, email, and programmatic—integrated to acquire customers at scale.',
          cta: { label: 'Explore Marketing', action: 'route', href: '/marketing-services' },
        },
      ],
    },
    {
      type: 'case-study-grid',
      eyebrow: 'Case Studies',
      title: 'Results that speak for themselves.',
      items: [
        {
          id: 'cs-1',
          title: 'Rebranding Drives 3× Revenue Growth',
          client: 'NovaTech Solutions',
          category: 'Brand Strategy',
          summary: 'A complete brand overhaul repositioned NovaTech from a regional IT firm to a nationally recognised technology consultancy, tripling revenue in 18 months.',
          tags: ['Branding', 'Website', 'Strategy'],
        },
        {
          id: 'cs-2',
          title: '420% Increase in Qualified Leads via PPC',
          client: 'Luxe Property Group',
          category: 'Paid Media',
          summary: 'A precision-targeted Google and Meta ad strategy, supported by conversion-optimised landing pages, delivered a 420% lift in qualified enquiries.',
          tags: ['PPC', 'Landing Pages', 'CRO'],
        },
        {
          id: 'cs-3',
          title: 'E-Commerce Launch Hits $2M in First Year',
          client: 'Aura Wellness',
          category: 'Web Development',
          summary: 'We designed and built a premium Shopify-based storefront paired with an email and social strategy that drove $2M GMV in year one.',
          tags: ['E-Commerce', 'Email Marketing', 'Brand'],
        },
      ],
    },
    {
      type: 'article-grid',
      eyebrow: 'Insights',
      title: 'Ideas worth reading.',
      items: [
        {
          id: 'art-1',
          title: 'Why Brand Positioning Is the Most Underestimated Growth Lever',
          excerpt: 'Most businesses focus on channels. The ones that win focus on positioning. Here\'s why the shift in thinking changes everything.',
          date: 'Feb 2026',
          category: 'Brand Strategy',
          readTime: '5 min read',
        },
        {
          id: 'art-2',
          title: 'The 2026 Playbook for B2B Paid Social',
          excerpt: 'LinkedIn and Meta algorithms have shifted dramatically. These are the frameworks generating the strongest B2B pipeline results right now.',
          date: 'Jan 2026',
          category: 'Paid Media',
          readTime: '7 min read',
        },
        {
          id: 'art-3',
          title: 'How AI Is Changing Website Personalisation',
          excerpt: 'AI-powered personalisation is no longer a luxury for enterprise brands. Here\'s how mid-market businesses are using it to compete.',
          date: 'Jan 2026',
          category: 'Web & Technology',
          readTime: '4 min read',
        },
      ],
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'Ready to grow?',
        title: 'Let\'s build your next growth engine together.',
        description: 'Strategy, design, development, and marketing—all aligned behind one goal: your growth.',
        primaryCta: { label: 'Get Your Free Consultation', action: 'modal' },
        secondaryCta: { label: 'View All Services', action: 'route', href: '/digital-marketing-services' },
      },
    },
  ],
}
