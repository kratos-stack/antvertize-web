import { siteConfig } from './site.config'

export const footerContent = {
  tagline: siteConfig.tagline,
  serviceLine: `Serving clients across the ${siteConfig.regions.join(', ')}.`,
  navLinks: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Contact', href: '/contact' },
  ],
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ],
  social: [
    { label: 'LinkedIn', href: siteConfig.social.linkedin, icon: 'in' },
    { label: 'Twitter / X', href: siteConfig.social.twitter, icon: 'X' },
    { label: 'Instagram', href: siteConfig.social.instagram, icon: 'Ig' },
  ],
  email: siteConfig.email,
  copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`,
}
