import type { MarketingPageContent } from '@/types/content'

export const marketingPage: MarketingPageContent = {
  seo: {
    title: 'Marketing Services | PPC, SEO & Paid Social | Antvertize',
    description: 'Performance marketing services including Google Ads, Meta Ads, LinkedIn, SEO, email marketing, and programmatic advertising. Grow smarter.',
    canonical: 'https://antvertize.com/marketing-services',
  },
  hero: {
    eyebrow: 'Marketing Services',
    title: 'Growth that\'s predictable, measurable, and scalable.',
    subtitle: 'We build customer acquisition systems that combine precision paid media with compounding organic strategies—delivering sustainable growth at every stage of the funnel.',
    primaryCta: { label: 'Get a Marketing Strategy', action: 'modal' },
    secondaryCta: { label: 'Our Channels', action: 'scroll', href: '#channels' },
    highlights: ['Google Ads', 'Meta Ads', 'LinkedIn Ads', 'SEO', 'Email Marketing'],
  },
  sections: [
    {
      type: 'stat-grid',
      items: [
        { value: '£180M+', title: 'Ad Spend Managed', description: 'Annual ad spend under management across Google, Meta, LinkedIn, and programmatic channels.' },
        { value: '3.8×', title: 'Average ROAS', description: 'Average return on ad spend across our managed accounts, benchmarked quarterly.' },
        { value: '-42%', title: 'Avg. CPA Reduction', description: 'Average reduction in cost per acquisition in the first 90 days of campaign management.' },
        { value: '220+', title: 'Active Campaigns', description: 'Live campaigns across paid search, paid social, programmatic, SEO, and email channels.' },
      ],
    },
    {
      type: 'service-detail-list',
      items: [
        {
          id: 'ppc',
          label: 'Paid Search',
          title: 'PPC Advertising',
          body: [
            'Pay-per-click advertising, done properly, is the fastest route to qualified demand. Our PPC practice combines rigorous keyword strategy, compelling ad creative, and conversion-optimised landing pages to deliver leads and sales that justify every penny spent.',
          ],
          bullets: ['Search and shopping campaign management', 'Keyword strategy and negative keyword discipline', 'Ad copy testing and creative optimisation', 'Bid strategy and smart bidding implementation'],
          layout: 'left',
        },
        {
          id: 'google-ads',
          label: 'Google',
          title: 'Google Ads',
          body: [
            'As a Google Premier Partner, we manage Google Ads accounts across Search, Display, Shopping, YouTube, and Performance Max. Our certified specialists design campaigns that capture intent and convert at every stage of the customer journey.',
          ],
          bullets: ['Search, Display, Shopping and YouTube', 'Performance Max strategy and execution', 'Google Merchant Centre management', 'Conversion tracking and attribution setup'],
          layout: 'right',
        },
        {
          id: 'paid-social',
          label: 'Paid Social',
          title: 'Paid Social',
          body: [
            'Paid social is no longer just awareness. With the right creative, targeting, and funnel architecture, platforms like Meta, LinkedIn, and TikTok are some of the most powerful customer acquisition channels available.',
          ],
          bullets: ['Campaign strategy and audience architecture', 'Creative strategy and ad production', 'Funnel-stage targeting and retargeting', 'Platform-specific performance benchmarking'],
          layout: 'left',
        },
        {
          id: 'meta-ads',
          label: 'Meta',
          title: 'Meta Ads',
          body: [
            'Meta\'s ad platform—spanning Facebook, Instagram, and the Audience Network—remains unmatched for reach, targeting depth, and bottom-of-funnel performance. Our Meta specialists manage accounts with a rigorous creative-first approach.',
          ],
          bullets: ['Facebook and Instagram campaign management', 'Advantage+ campaign optimisation', 'Custom and lookalike audience development', 'Creative testing frameworks (static, video, carousels)'],
          layout: 'right',
        },
        {
          id: 'linkedin-ads',
          label: 'LinkedIn',
          title: 'LinkedIn Ads',
          body: [
            'For B2B brands, LinkedIn Ads is the highest-quality demand channel available. We build LinkedIn campaigns that reach exact decision-makers, drive qualified pipeline, and deliver measurable pipeline impact.',
          ],
          bullets: ['Sponsored Content and Message Ads', 'Account-based marketing (ABM) campaigns', 'Lead Gen Form and conversion optimisation', 'LinkedIn Insight Tag and attribution'],
          layout: 'left',
        },
        {
          id: 'programmatic',
          label: 'Programmatic',
          title: 'Programmatic Advertising',
          body: [
            'Programmatic display and video advertising gives you access to premium inventory at scale with audience precision that was previously only available to enterprise brands. We manage programmatic campaigns that build awareness, drive consideration, and support retargeting strategies.',
          ],
          bullets: ['DSP-managed programmatic campaigns', 'Audience data and DMP integration', 'Premium publisher direct deals', 'Brand safety and viewability management'],
          layout: 'right',
        },
        {
          id: 'seo',
          label: 'Organic',
          title: 'SEO',
          body: [
            'SEO is the most durable growth channel available—and the most frequently misunderstood. Our SEO practice combines technical excellence, content strategy, and authority building to deliver sustainable organic growth that compounds over time.',
          ],
          bullets: ['Technical SEO audit and remediation', 'On-page optimisation and content strategy', 'Link building and digital PR', 'Local SEO and Google Business Profile management'],
          layout: 'left',
        },
        {
          id: 'social-media',
          label: 'Social',
          title: 'Social Media Marketing',
          body: [
            'Organic social builds the community and credibility that paid media can\'t buy. We create and manage social media strategies across LinkedIn, Instagram, X, and TikTok—content that educates, entertains, and converts.',
          ],
          bullets: ['Social media strategy and channel planning', 'Content calendar and copywriting', 'Creative production (graphics, video, reels)', 'Community management and engagement'],
          layout: 'right',
        },
        {
          id: 'email',
          label: 'Email',
          title: 'Email Marketing',
          body: [
            'Email remains the highest-ROI marketing channel when done right. We design, build, and manage email programmes that nurture leads, retain customers, and drive repeat revenue—from welcome sequences to advanced lifecycle automations.',
          ],
          bullets: ['Email strategy and list segmentation', 'Campaign design and copywriting', 'Automation and drip sequence development', 'Deliverability management and A/B testing'],
          layout: 'left',
        },
      ],
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'Marketing Strategy',
        title: 'Start growing with data-driven marketing.',
        description: 'We\'ll audit your current marketing performance and show you exactly where the biggest opportunities lie.',
        primaryCta: { label: 'Request a Free Audit', action: 'modal' },
      },
    },
  ],
}
