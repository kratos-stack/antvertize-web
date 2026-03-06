import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
    },
    {
      path: '/digital-marketing-services',
      name: 'services',
      component: () => import('@/pages/ServicesPage.vue'),
    },
    {
      path: '/branding-services',
      name: 'branding',
      component: () => import('@/pages/BrandingPage.vue'),
    },
    {
      path: '/website-development-services',
      name: 'websites',
      component: () => import('@/pages/WebsitesPage.vue'),
    },
    {
      path: '/marketing-services',
      name: 'marketing',
      component: () => import('@/pages/MarketingPage.vue'),
    },
    {
      path: '/about-antvertize',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
    },
    {
      path: '/careers',
      name: 'careers',
      component: () => import('@/pages/CareersPage.vue'),
    },
    {
      path: '/privacy-policy',
      name: 'privacy',
      component: () => import('@/pages/PrivacyPage.vue'),
    },
    {
      path: '/terms-and-conditions',
      name: 'terms',
      component: () => import('@/pages/TermsPage.vue'),
    },
  ],
})

export default router
