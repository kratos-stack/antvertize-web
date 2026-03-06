import { onUnmounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'

export function useCursorGlow() {
  let currentEl: HTMLElement | null = null
  let rafId: number | null = null
  let active = false

  function onMove(e: MouseEvent) {
    if (!currentEl || !active) return
    const rect = currentEl.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (rafId !== null) cancelAnimationFrame(rafId)
    rafId = requestAnimationFrame(() => {
      if (currentEl) {
        currentEl.style.setProperty('--mouse-x', `${x}px`)
        currentEl.style.setProperty('--mouse-y', `${y}px`)
      }
    })
  }

  function setRef(node: Element | ComponentPublicInstance | null) {
    if (currentEl) {
      window.removeEventListener('mousemove', onMove)
      active = false
    }
    currentEl = node instanceof HTMLElement ? node : null
    if (currentEl) {
      const hasPointer = window.matchMedia('(pointer: fine)').matches
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (!hasPointer || reducedMotion) return
      active = true
      window.addEventListener('mousemove', onMove, { passive: true })
    }
  }

  onUnmounted(() => {
    window.removeEventListener('mousemove', onMove)
    if (rafId !== null) cancelAnimationFrame(rafId)
  })

  return { setRef }
}
