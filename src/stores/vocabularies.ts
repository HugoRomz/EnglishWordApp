// src/stores/vocabularies.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'
import { useUser } from '@clerk/vue'
import type { UUID } from 'crypto'
import type { PostgrestError } from '@supabase/supabase-js'

interface Vocabulary {
  id: UUID
  word: string
  meaning: string
  example: string
  created_at: string
}

export const useVocabulariesStore = defineStore('vocabularies', () => {
  const vocabularies = ref<Vocabulary[]>([])
  const error = ref<PostgrestError | null>(null)
  const dataStats = ref({ totalWords: 0, newWords: 0 })
  const openAddModal = ref(false)

  const { isLoaded, user } = useUser()

  async function fetchVocabularies(limit = 6) {
    if (!isLoaded || !user.value) return

    const {
      data,
      error: err,
      count,
    } = await supabase
      .from('vocabularies')
      .select('*', { count: 'exact' })
      .limit(limit)
      .eq('clerk_user_id', user.value.id)

    if (err) {
      error.value = err
    } else {
      vocabularies.value = data || []
      const now = Date.now()
      const newWordsCount = vocabularies.value.filter((v) => {
        const created = new Date(v.created_at).getTime()
        return (now - created) / (1000 * 3600 * 24) <= 2
      }).length
      dataStats.value = {
        totalWords: count || 0,
        newWords: newWordsCount,
      }
    }
  }

  function toggleAddModal(state: boolean) {
    openAddModal.value = state
  }

  return {
    vocabularies,
    error,
    dataStats,
    openAddModal,
    fetchVocabularies,
    toggleAddModal,
  }
})
