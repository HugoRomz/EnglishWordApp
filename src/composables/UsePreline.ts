import { onMounted, onUpdated } from 'vue'

export function usePreline() {
  const initPreline = () => {
    setTimeout(() => window.HSStaticMethods.autoInit(), 100)
  }

  onMounted(initPreline)
  onUpdated(initPreline)

  return {
    initPreline,
  }
}
