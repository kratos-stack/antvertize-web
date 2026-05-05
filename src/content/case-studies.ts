import type { MarketingPageContent } from '@/types/content'

export const caseStudiesPage: MarketingPageContent = {
  seo: {
    title: 'Case Studies | Real Results, Real Growth | Antvertize',
    description: 'Real campaigns. Real numbers. See how Antvertize lifted ROI, lowered CPA, and scaled reach for clients across industries.',
    canonical: 'https://antvertize.com/case-studies',
  },
  hero: {
    eyebrow: 'Case Studies',
    title: 'Real Results. Real Growth.',
    subtitle: 'A small selection of the campaigns we have built, restructured, and scaled. Different industries, different goals\u2014one common outcome: profitable growth.',
    primaryCta: { label: 'Get Free Audit', action: 'route', href: '/contact' },
    secondaryCta: { label: 'Book a Strategy Call', action: 'mailto', href: 'mailto:hello@antvertize.com' },
    visual: 'case-studies-results',
  },
  sections: [
    {
      type: 'service-detail-list',
      items: [
        {
          id: 'case-1',
          label: 'Case Study 1',
          title: 'High ad spend, low conversions \u2192 +2.5\u00d7 ROI lift',
          subtitle: 'Full-funnel restructuring + retargeting',
          body: [
            'A high-traffic brand was spending heavily on paid media, but conversions had plateaued and cost per acquisition kept rising every month.',
            'We restructured the entire funnel\u2014from prospecting audiences through middle-funnel education to retargeting\u2014and rebuilt creative around each stage of intent.',
          ],
          bullets: [
            '+2.5\u00d7 increase in return on ad spend',
            '\u221240% reduction in cost per acquisition',
            'Funnel architecture rebuilt top to bottom',
          ],
          metrics: [
            { value: '+2.5×', label: 'ROI Lift' },
            { value: '−40%', label: 'CPA Reduction' },
            { value: 'Full-Funnel', label: 'Restructure' },
            { value: 'Retargeting', label: 'Layer' },
          ],
          layout: 'left',
        },
        {
          id: 'case-2',
          label: 'Case Study 2',
          title: 'Low brand visibility \u2192 +3\u00d7 reach, +60% higher engagement',
          subtitle: 'Programmatic + video ads strategy',
          body: [
            'A category challenger had a strong product but limited awareness in its core market\u2014traffic was flat and brand searches were not growing.',
            'We layered programmatic display with a YouTube and in-stream video strategy aligned to a single brand narrative, then expanded into new lookalike audiences using the engagement data.',
          ],
          bullets: [
            '+3\u00d7 increase in monthly reach',
            '+60% higher engagement across surfaces',
            'Sustained lift in branded search demand',
          ],
          metrics: [
            { value: '+3×', label: 'Reach Increase' },
            { value: '+60%', label: 'Engagement Rate' },
            { value: 'Programmatic', label: 'Display Layer' },
            { value: 'Video', label: 'Strategy' },
          ],
          layout: 'right',
        },
        {
          id: 'case-3',
          label: 'Case Study 3',
          title: 'Poor PPC performance \u2192 \u221235% lower CPC, +2\u00d7 conversion rate',
          subtitle: 'Keyword restructuring + ad optimization',
          body: [
            'An established brand was wasting paid search budget on broad, low-intent keywords with weak landing-page alignment\u2014and cost per click kept climbing.',
            'We rebuilt the keyword tree around buyer intent, rewrote ad copy to match each query cluster, and tightened the landing-page experience for conversion.',
          ],
          bullets: [
            '\u221235% lower cost per click',
            '+2\u00d7 conversion rate on the same traffic',
            'Cleaner, more profitable account structure',
          ],
          metrics: [
            { value: '−35%', label: 'CPC Reduction' },
            { value: '+2×', label: 'Conversion Rate' },
            { value: 'Keyword', label: 'Restructure' },
            { value: 'Ad Copy', label: 'Optimization' },
          ],
          layout: 'left',
        },
      ],
    },
    {
      type: 'cta-banner',
      data: {
        eyebrow: 'Your numbers next',
        title: 'Want results like these in your account?',
        description: 'Get a free performance audit of your current campaigns and we\u2019ll show you exactly where the gains are hiding.',
        primaryCta: { label: 'Get Free Audit', action: 'route', href: '/contact' },
        secondaryCta: { label: 'Book a Strategy Call', action: 'mailto', href: 'mailto:hello@antvertize.com' },
      },
    },
  ],
}
