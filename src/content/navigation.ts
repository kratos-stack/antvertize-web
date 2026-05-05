import type { CTA } from '@/types/content'

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact', href: '/contact' },
]

export const navCta: CTA = {
  label: 'Get Free Audit',
  action: 'route',
  href: '/contact',
}
