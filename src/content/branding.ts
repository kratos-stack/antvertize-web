import type { MarketingPageContent } from '@/types/content'

export const brandingPage: MarketingPageContent = {
  seo: {
    title: 'Branding Services | Brand Strategy & Identity | Antvertize',
    description: 'Premium branding services including brand strategy, visual identity, messaging, and brand architecture. Build a brand that leads its category.',
    canonical: 'https://antvertize.com/branding-services',
  },
  hero: {
    eyebrow: 'Branding Services',
    title: 'A brand that leads. Not follows.',
    subtitle: 'We craft premium brand systems—grounded in strategy, expressed through design—that give businesses the identity they need to dominate their market.',
    primaryCta: { label: 'Start Your Brand Project', action: 'modal' },
    secondaryCta: { label: 'View Case Studies', action: 'scroll', href: '#case-studies' },
    highlights: ['Brand Strategy', 'Visual Identity', 'Messaging & Voice', 'Brand Architecture'],
  },
  sections: [
    {
      type: 'stat-grid',
      items: [
        { value: '180+', title: 'Brands Built', description: 'From startups to established enterprises, we\'ve built brands across 20+ sectors.' },
        { value: '94%', title: 'Rebrand Success Rate', description: 'Our brand projects consistently deliver measurable lifts in brand recognition and lead quality.' },
        { value: '3×', title: 'Avg. Revenue Impact', description: 'Businesses that complete a full brand programme with Antvertize see an average 3× revenue lift in year one.' },
        { value: '6wk', title: 'Typical Brand Timeline', description: 'Our proven brand process delivers a complete brand system in as little as six weeks.' },
      ],
    },
    {
      type: 'service-detail-list',
      items: [
        {
          id: 'brand-eval',
          label: 'Discovery',
          title: 'Brand Evaluation & Analysis',
          body: [
            'Before we design anything, we understand everything. Our brand evaluation process audits your existing brand equity, competitive landscape, and customer perception to identify exactly where your brand stands—and where it should go.',
          ],
          bullets: ['Stakeholder interviews and brand workshops', 'Customer perception research', 'Competitive landscape analysis', 'Brand equity audit'],
          layout: 'left',
        },
        {
          id: 'brand-audit',
          label: 'Audit',
          title: 'Comprehensive Brand Audit',
          body: [
            'A brand audit examines every touchpoint your audience experiences—digital, physical, verbal, visual. We identify inconsistencies, gaps, and opportunities to create a stronger, more unified brand presence.',
          ],
          bullets: ['Visual consistency review', 'Messaging and tone audit', 'Digital presence analysis', 'Customer journey mapping'],
          layout: 'right',
        },
        {
          id: 'brand-identity',
          label: 'Identity',
          title: 'Branding Identity Services',
          body: [
            'Your visual identity is your brand\'s first impression and most lasting memory. We create distinctive, ownable identities—logo systems, colour palettes, typography, and visual language—that communicate your brand\'s values at a glance.',
          ],
          bullets: ['Logo design and identity system', 'Colour palette and typography', 'Iconography and illustration style', 'Brand guidelines and usage standards'],
          layout: 'left',
        },
        {
          id: 'design-systems',
          label: 'Systems',
          title: 'Design Systems',
          body: [
            'Consistency at scale requires a robust design system. We build comprehensive design systems that empower your team to execute your brand with precision across every channel and every asset.',
          ],
          bullets: ['Component library and pattern library', 'Digital-first design tokens', 'Brand application templates', 'Cross-channel implementation guides'],
          layout: 'right',
        },
        {
          id: 'brand-architecture',
          label: 'Architecture',
          title: 'Brand Architecture',
          body: [
            'For businesses with multiple products, services, or sub-brands, a clear brand architecture is essential. We create frameworks that define how your brands relate to each other—maximising equity transfer and minimising confusion.',
          ],
          bullets: ['Portfolio brand structure', 'Parent–subsidiary brand relationships', 'Sub-brand naming and positioning', 'Brand hierarchy visualisation'],
          layout: 'left',
        },
        {
          id: 'brand-messaging',
          label: 'Messaging',
          title: 'Brand Messaging & Strategy',
          body: [
            'What you say matters as much as how you look. We develop brand messaging frameworks that articulate your value proposition, positioning, and story in language that resonates deeply with your target audience.',
          ],
          bullets: ['Brand positioning statement', 'Core messaging framework', 'Value proposition development', 'Audience-specific messaging variants'],
          layout: 'right',
        },
        {
          id: 'voice-tone',
          label: 'Voice',
          title: 'Voice & Tone',
          body: [
            'A consistent brand voice builds trust and recognition. We define your brand\'s voice—its personality, character, and principles—alongside tone guidance for every context from formal proposals to social media.',
          ],
          bullets: ['Brand personality attributes', 'Voice principles and guidelines', 'Tone-of-voice spectrum', 'Writing style guide with examples'],
          layout: 'left',
        },
        {
          id: 'brand-redevelopment',
          label: 'Evolution',
          title: 'Brand Redevelopment',
          body: [
            'Sometimes a brand needs evolution, not revolution. Our brand redevelopment service modernises existing brands—preserving hard-won equity while eliminating the friction that\'s holding your business back.',
          ],
          bullets: ['Legacy equity analysis', 'Phased evolution planning', 'Asset migration strategy', 'Internal change management support'],
          layout: 'right',
        },
        {
          id: 'repositioning',
          label: 'Repositioning',
          title: 'Market Repositioning',
          body: [
            'When market conditions shift or ambitions grow, your brand\'s positioning must shift with them. We guide businesses through strategic repositioning—new audiences, new categories, new competitive spaces.',
          ],
          bullets: ['Category and competitive analysis', 'New positioning strategy', 'Narrative and proof point development', 'Launch and communication planning'],
          layout: 'left',
        },
      ],
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'Brand Projects',
        title: 'Ready to build a brand that leads?',
        description: 'Tell us about your business and we\'ll show you what\'s possible.',
        primaryCta: { label: 'Start Your Brand Project', action: 'modal' },
      },
    },
    {
      type: 'faq',
      eyebrow: 'FAQ',
      title: 'Common questions about branding.',
      items: [
        { question: 'How long does a brand project take?', answer: 'A typical brand identity project with Antvertize takes 4–8 weeks depending on scope. Complex brand architecture projects or those requiring extensive research may take 10–14 weeks. We\'ll give you a detailed timeline in your proposal.' },
        { question: 'What\'s the difference between a logo and a brand?', answer: 'A logo is one element of a brand. A brand is the complete set of associations, feelings, and expectations your audience has when they encounter your business—it includes visual identity, messaging, voice, customer experience, and values. We build complete brand systems, not just logos.' },
        { question: 'Will you work with my existing branding?', answer: 'Yes. Depending on your goals and existing equity, we can evolve your current brand rather than starting from scratch. Our brand audit process helps determine the right approach for your situation.' },
        { question: 'Do you work with startups?', answer: 'Absolutely. We work with businesses at all stages—from early-stage startups building their first brand to established enterprises repositioning for growth. Our pricing reflects the scope of work required, not the size of your business.' },
        { question: 'What do I receive at the end of a brand project?', answer: 'You\'ll receive a complete brand system including: brand strategy document, visual identity files (vector, raster, all formats), brand guidelines, messaging framework, voice and tone guide, and digital-ready assets. All deliverables are provided in editable formats.' },
      ],
    },
  ],
}
