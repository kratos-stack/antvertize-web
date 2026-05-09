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
      path: '/services',
      name: 'services',
      component: () => import('@/pages/ServicesPage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/AboutPage.vue'),
    },
    {
      path: '/case-studies',
      name: 'case-studies',
      component: () => import('@/pages/CaseStudiesPage.vue'),
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/pages/ContactPage.vue'),
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

    { path: '/digital-marketing-services', redirect: '/services' },
    { path: '/branding-services', redirect: '/services' },
    { path: '/website-development-services', redirect: '/services' },
    { path: '/marketing-services', redirect: '/services' },
    { path: '/about-antvertize', redirect: '/about' },
    { path: '/careers', redirect: '/about' },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
    },
  ],
})

export default router
