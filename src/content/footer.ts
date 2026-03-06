import { siteConfig } from './site.config'

export const footerContent = {
  cityLine: `Serving clients across ${siteConfig.cities.join(' · ')}`,
  links: [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms & Conditions', href: '/terms-and-conditions' },
  ],
  social: [
    { label: 'Twitter / X', href: siteConfig.social.twitter, icon: 'X' },
    { label: 'LinkedIn', href: siteConfig.social.linkedin, icon: 'in' },
    { label: 'Instagram', href: siteConfig.social.instagram, icon: 'Ig' },
  ],
  address: `${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.state} ${siteConfig.address.zip}`,
  copyright: `© ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.`,
}
