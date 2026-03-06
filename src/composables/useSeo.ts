import { useHead } from '@vueuse/head'
import type { SeoMeta } from '@/types/content'

export function useSeo(meta: SeoMeta) {
  useHead({
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { name: 'robots', content: meta.robots ?? 'index, follow' },
      { property: 'og:title', content: meta.ogTitle ?? meta.title },
      { property: 'og:description', content: meta.ogDescription ?? meta.description },
      ...(meta.ogImage ? [{ property: 'og:image', content: meta.ogImage }] : []),
      { property: 'og:type', content: 'website' },
    ],
    link: meta.canonical ? [{ rel: 'canonical', href: meta.canonical }] : [],
  })
}
