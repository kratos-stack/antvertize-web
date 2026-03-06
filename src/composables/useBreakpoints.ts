import { ref, onMounted, onUnmounted } from 'vue'

export function useBreakpoints() {
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  function update() {
    const w = window.innerWidth
    isMobile.value = w < 768
    isTablet.value = w >= 768 && w < 1024
    isDesktop.value = w >= 1024
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { isMobile, isTablet, isDesktop }
}
