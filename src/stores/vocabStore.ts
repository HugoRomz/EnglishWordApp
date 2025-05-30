import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useVocabularies } from '@/composables/useVocabularies'
import type { VocabularyFilter, WordStats, Word } from '@/services/wordsService'

export const useVocabStore = defineStore('vocabStore', () => {
  const { fetchList, fetchPendingWords, fetchStats } = useVocabularies()

  const words = ref<Word[]>([])
  const stats = ref<WordStats | null>(null)
  const pendingWords = ref<Word[]>([])

  const isLoadingWords = ref(false)
  const isLoadingStats = ref(false)

  //  PAGINACIÓN
  const currentPage = ref(1)
  const itemsPerPage = ref(8)
  const totalItems = ref(0)

  // GETTERS
  const totalWords = computed(() => words.value.length)
  const hasWords = computed(() => words.value.length > 0)
  const recentWords = computed(() => words.value.slice(0, itemsPerPage.value))

  const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value))
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)

  const loadWords = async (filter: VocabularyFilter = {}) => {
    isLoadingWords.value = true

    try {
      const offset = (currentPage.value - 1) * itemsPerPage.value

      const { data, error, count } = await fetchList({
        ...filter,
        limit: itemsPerPage.value,
        offset: offset,
      })

      if (error) {
        console.error('Error loading words:', error)
        return { success: false, error }
      }

      words.value = data || []
      totalItems.value = count

      return { success: true, data }
    } catch (err) {
      console.log('Error loading words:', err)
      return { success: false, error: err }
    } finally {
      isLoadingWords.value = false
    }
  }

  // 📄 FUNCIONES DE PAGINACIÓN
  const nextPage = async (filter: VocabularyFilter = {}) => {
    if (hasNextPage.value) {
      currentPage.value++
      await loadWords(filter)
    }
  }

  const prevPage = async (filter: VocabularyFilter = {}) => {
    if (hasPrevPage.value) {
      currentPage.value--
      await loadWords(filter)
    }
  }

  const goToPage = async (page: number, filter: VocabularyFilter = {}) => {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
      await loadWords(filter)
    }
  }

  const resetPagination = () => {
    currentPage.value = 1
    totalItems.value = 0
  }

  // 📈 FETCH PARA STATS (Solo Dashboard)
  const loadStats = async () => {
    isLoadingStats.value = true

    try {
      const { data, error } = await fetchStats()

      if (error) {
        console.error('Error loading stats:', error)
        return { success: false, error }
      }

      stats.value = data
      return { success: true, data }
    } catch (err) {
      console.error('Error in loadStats:', err)
      return { success: false, error: err }
    } finally {
      isLoadingStats.value = false
    }
  }

  // 🔄 FETCH PARA PENDING (Por si acaso)
  const loadPendingWords = async () => {
    try {
      const { data, error } = await fetchPendingWords()

      if (error) {
        console.error('Error loading pending words:', error)
        return { success: false, error }
      }

      pendingWords.value = data || []
      return { success: true, data }
    } catch (err) {
      console.error('Error in loadPendingWords:', err)
      return { success: false, error: err }
    }
  }

  return {
    //  Estado
    words,
    stats,
    pendingWords,

    //  Estados de carga
    isLoadingWords,
    isLoadingStats,

    //  estados Paginación
    currentPage,
    itemsPerPage,
    totalItems,

    //  Getters
    totalWords,
    hasWords,
    recentWords,

    //  Métodos de carga (FETCHS)
    loadWords,
    loadStats,
    loadPendingWords,

    //  Paginación
    nextPage,
    prevPage,
    goToPage,
    resetPagination,
  }
})
