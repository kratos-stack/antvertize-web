import type { MarketingPageContent } from '@/types/content'

export const websitesPage: MarketingPageContent = {
  seo: {
    title: 'Website Development Services | Web Design & Dev | Antvertize',
    description: 'Premium website design and development services. UI/UX, full-stack development, CMS, e-commerce, and CRO. Websites that convert.',
    canonical: 'https://antvertize.com/website-development-services',
  },
  hero: {
    eyebrow: 'Website Services',
    title: 'Websites that earn their place in your growth stack.',
    subtitle: 'Beautiful design is the baseline. We build websites that combine stunning UI with intelligent architecture and conversion engineering—turning visitors into customers.',
    primaryCta: { label: 'Start a Web Project', action: 'modal' },
    secondaryCta: { label: 'Our Process', action: 'scroll', href: '#process' },
    highlights: ['UI/UX Design', 'Full-Stack Development', 'E-Commerce', 'CMS', 'CRO'],
  },
  sections: [
    {
      type: 'stat-grid',
      items: [
        { value: '140+', title: 'Websites Launched', description: 'Production-ready sites across marketing, e-commerce, SaaS, and enterprise categories.' },
        { value: '92', title: 'Avg. Lighthouse Score', description: 'We build for performance—fast load times, accessibility, and technical SEO baked in from day one.' },
        { value: '2.4×', title: 'Avg. Conversion Lift', description: 'Our CRO-informed design process consistently lifts conversion rates versus clients\' prior sites.' },
        { value: '48hr', title: 'QA Turnaround', description: 'Comprehensive QA across devices and browsers completed within 48 hours of launch candidate.' },
      ],
    },
    {
      type: 'service-detail-list',
      items: [
        {
          id: 'web-design',
          label: 'Design',
          title: 'Website Design Services',
          body: [
            'We design websites that are as strategic as they are beautiful. Every layout, colour choice, and interaction is guided by user psychology and conversion principles—creating experiences that build trust and drive action.',
          ],
          bullets: ['Brand-aligned visual design', 'Conversion-focused page templates', 'Responsive design for all devices', 'Design system integration'],
          layout: 'left',
        },
        {
          id: 'ux-design',
          label: 'UX/UI',
          title: 'UI & UX Design Services',
          body: [
            'Great UX is invisible. Our UX design process maps user journeys, eliminates friction, and creates intuitive interactions that guide users toward your key conversion goals with minimal cognitive load.',
          ],
          bullets: ['User journey mapping and flow design', 'Wireframes and UX strategy', 'Interaction and micro-animation design', 'Usability testing and iteration'],
          layout: 'right',
        },
        {
          id: 'prototyping',
          label: 'Prototyping',
          title: 'Interactive Prototyping',
          body: [
            'Before a single line of code is written, we validate the experience with high-fidelity interactive prototypes. This catches UX issues early, aligns stakeholders, and accelerates the development phase significantly.',
          ],
          bullets: ['Figma-based interactive prototypes', 'Stakeholder review and approval workflow', 'User testing facilitation', 'Developer handoff specifications'],
          layout: 'left',
        },
        {
          id: 'full-stack-dev',
          label: 'Development',
          title: 'Full-Stack Website Development',
          body: [
            'Our engineering team builds websites with clean, maintainable code—using modern frameworks chosen to match your project\'s requirements for performance, scalability, and long-term maintainability.',
            'We work across Vue.js, React, Next.js, Nuxt, and bespoke full-stack solutions, always with a performance-first and accessibility-first mindset.',
          ],
          bullets: ['Modern JavaScript frameworks (Vue, React, Next.js, Nuxt)', 'Performance-first architecture', 'Accessibility to WCAG 2.1 AA', 'API integration and custom backend development'],
          layout: 'right',
        },
        {
          id: 'ia',
          label: 'Architecture',
          title: 'Information Architecture',
          body: [
            'Site structure is a growth lever. Our IA process organises your content and navigation to match how your users think and search—improving both UX and SEO performance simultaneously.',
          ],
          bullets: ['Content audit and sitemap development', 'Navigation structure and taxonomy', 'Internal linking strategy', 'SEO-informed IA planning'],
          layout: 'left',
        },
        {
          id: 'cms',
          label: 'CMS',
          title: 'CMS Implementation',
          body: [
            'We implement content management systems that give your team genuine control. Whether that\'s Webflow, WordPress, Contentful, or a headless CMS, we configure it to match your workflow and empower your editors.',
          ],
          bullets: ['Webflow, WordPress, Contentful, Sanity', 'Custom CMS templates and schemas', 'Editor training and documentation', 'Ongoing CMS support packages'],
          layout: 'right',
        },
        {
          id: 'cro',
          label: 'CRO',
          title: 'Conversion Rate Optimisation',
          body: [
            'More traffic is expensive. Better conversion is free. Our CRO service analyses your existing traffic, identifies drop-off points, and implements evidence-based improvements that convert more of the visitors you already have.',
          ],
          bullets: ['Analytics audit and funnel analysis', 'Heatmap and session recording review', 'A/B and multivariate testing', 'Landing page optimisation'],
          layout: 'left',
        },
        {
          id: 'ecommerce',
          label: 'E-Commerce',
          title: 'Ecommerce Development',
          body: [
            'We build online stores that sell. From premium Shopify themes to custom WooCommerce builds, our e-commerce practice combines conversion-optimised design with robust technical foundations.',
          ],
          bullets: ['Shopify Plus and standard builds', 'WooCommerce custom development', 'Product catalogue and UX design', 'Payment gateway and fulfilment integration'],
          layout: 'right',
        },
      ],
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'Web Projects',
        title: 'Ready to build a website that works as hard as you do?',
        description: 'Share your brief and we\'ll respond with a tailored proposal within 24 hours.',
        primaryCta: { label: 'Start a Web Project', action: 'modal' },
      },
    },
  ],
}
