import { ref, onUnmounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'

export function useIntersectionReveal(threshold = 0.12) {
  const isVisible = ref(false)
  let observer: IntersectionObserver | null = null

  function setRef(node: Element | ComponentPublicInstance | null) {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    const el = node instanceof Element ? node : null
    if (el) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0]
          if (entry?.isIntersecting) {
            isVisible.value = true
            observer?.disconnect()
          }
        },
        { threshold }
      )
      observer.observe(el)
    }
  }

  onUnmounted(() => {
    observer?.disconnect()
  })

  return { setRef, isVisible }
}
