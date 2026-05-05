import type { MarketingPageContent } from '@/types/content'

export const servicesPage: MarketingPageContent = {
  seo: {
    title: 'Digital Advertising Services | Antvertize',
    description: 'Programmatic, PPC, paid social, display, retargeting, and video advertising services that drive measurable results.',
    canonical: 'https://antvertize.com/services',
  },
  hero: {
    eyebrow: 'Our Services',
    title: 'Digital Advertising Services That Drive Results',
    subtitle: 'Five integrated capabilities, one outcome: more qualified pipeline at a lower cost per acquisition.',
    primaryCta: { label: 'Get Free Audit', action: 'route', href: '/contact' },
    secondaryCta: { label: 'Book a Strategy Call', action: 'mailto', href: 'mailto:hello@antvertize.com' },
    highlights: ['Programmatic', 'PPC', 'Paid Social', 'Display & Retargeting', 'Video'],
    visual: 'services-channels',
  },
  sections: [
    {
      type: 'service-detail-list',
      items: [
        {
          id: 'programmatic',
          label: 'Programmatic',
          title: 'Programmatic Advertising',
          subtitle: 'DV360 · The Trade Desk · Real-Time Bidding',
          body: [
            'Reach the right audience at the right time with precision targeting on Display & Video 360 and The Trade Desk. We turn programmatic infrastructure into a measurable growth channel\u2014managed end-to-end.',
          ],
          bullets: [
            'Audience segmentation across first- and third-party data',
            'Real-time bidding optimization tuned for ROAS',
            'Cross-channel campaign execution and attribution',
          ],
          metrics: [
            { value: '3.2×', label: 'Avg. ROAS Lift' },
            { value: '38%', label: 'CPM Reduction' },
            { value: '2 DSPs', label: 'DV360 + TTD' },
            { value: '24/7', label: 'Real-Time Bidding' },
          ],
          cta: { label: 'Get a Programmatic Audit', action: 'route', href: '/contact' },
          layout: 'left',
        },
        {
          id: 'ppc',
          label: 'PPC',
          title: 'PPC (Pay-Per-Click) Advertising',
          subtitle: 'Google Ads · Microsoft Ads · Search & Shopping',
          body: [
            'Maximize ROI with high-converting Google Ads campaigns engineered around buyer intent. We design search and shopping programs that capture demand at the moment of decision\u2014and turn it into revenue.',
          ],
          bullets: [
            'Keyword research and intent-tiered targeting',
            'Ad copy and landing-page testing for higher Quality Score',
            'Conversion tracking and full-funnel attribution',
          ],
          metrics: [
            { value: '42%', label: 'Avg. CPA Reduction' },
            { value: '2.1×', label: 'Conversion Rate Lift' },
            { value: '<7 days', label: 'Optimization Cycle' },
            { value: 'Q-Score 9+', label: 'Avg. Quality Score' },
          ],
          cta: { label: 'Get a PPC Audit', action: 'route', href: '/contact' },
          layout: 'right',
        },
        {
          id: 'social',
          label: 'Paid Social',
          title: 'Social Media Advertising',
          subtitle: 'Meta · Instagram · Facebook',
          body: [
            'Turn scrolling into sales with creative-first Meta Ads campaigns. Sharp audience design, rigorous creative testing, and funnel-stage strategies that drive measurable revenue\u2014not just impressions.',
          ],
          bullets: [
            'Audience architecture from cold traffic to retargeting',
            'Creative testing across static, video, and carousel formats',
            'Funnel optimization aligned to revenue, not vanity metrics',
          ],
          metrics: [
            { value: '4.8×', label: 'Avg. ROAS' },
            { value: '12+', label: 'Creative Variants / Mo' },
            { value: '31%', label: 'CPL Reduction' },
            { value: 'Full Funnel', label: 'Awareness → Buy' },
          ],
          cta: { label: 'Get a Social Audit', action: 'route', href: '/contact' },
          layout: 'left',
        },
        {
          id: 'display',
          label: 'Display & Retargeting',
          title: 'Display & Retargeting',
          subtitle: 'Banner · Dynamic · Behavioral',
          body: [
            'Stay top-of-mind and bring back lost visitors. We build display and retargeting programs that re-engage high-intent users and move them through consideration into conversion.',
          ],
          bullets: [
            'Branded and dynamic banner ad design',
            'Behavioral retargeting tied to on-site signals',
            'Brand-safe inventory across premium publishers',
          ],
          metrics: [
            { value: '58%', label: 'Return-Visitor Rate' },
            { value: '12 sec', label: 'Avg. Engagement' },
            { value: '8 segments', label: 'Audience Slices' },
            { value: 'Brand Safe', label: 'Inventory Filtered' },
          ],
          cta: { label: 'Get a Retargeting Audit', action: 'route', href: '/contact' },
          layout: 'right',
        },
        {
          id: 'video',
          label: 'Video',
          title: 'Video Advertising',
          subtitle: 'YouTube · In-Stream · Out-Stream',
          body: [
            'Tell your brand story through impactful video campaigns. From YouTube to in-stream and out-stream placements, we plan, produce, and optimize video ads for measurable performance\u2014not just views.',
          ],
          bullets: [
            'YouTube TrueView, Shorts, and connected-TV placements',
            'In-stream and out-stream creative cut-downs',
            'View-through and performance tracking',
          ],
          metrics: [
            { value: '78%', label: 'Avg. View-Through' },
            { value: '24%', label: 'CPV Reduction' },
            { value: '6 / 15 / 30s', label: 'Cut-Down Variants' },
            { value: 'YouTube + CTV', label: 'Cross-Surface' },
          ],
          cta: { label: 'Get a Video Audit', action: 'route', href: '/contact' },
          layout: 'left',
        },
      ],
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'One team. Every channel.',
        title: 'Ready to scale your ads profitably?',
        description: 'Get a free, no-obligation audit of your current campaigns with the three highest-impact opportunities to lift ROI.',
        primaryCta: { label: 'Get Free Audit', action: 'route', href: '/contact' },
        secondaryCta: { label: 'Book a Strategy Call', action: 'mailto', href: 'mailto:hello@antvertize.com' },
      },
    },
  ],
}
