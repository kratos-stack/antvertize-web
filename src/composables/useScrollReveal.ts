import { ref, onUnmounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'

export type RevealDirection = 'up' | 'down' | 'left' | 'right' | 'none'

export interface ScrollRevealOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options

  const isVisible = ref(false)
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  let observer: IntersectionObserver | null = null

  function setRef(node: Element | ComponentPublicInstance | null) {
    if (observer) {
      observer.disconnect()
      observer = null
    }

    const el = node instanceof Element ? node : null
    if (!el) return

    // Skip observer entirely in reduced-motion — reveal immediately
    if (prefersReducedMotion) {
      isVisible.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          isVisible.value = true
          if (once) observer?.disconnect()
        } else if (!once) {
          isVisible.value = false
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(el)
  }

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { setRef, isVisible, prefersReducedMotion }
}
