// src/stores/vocabularies.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useUser } from '@clerk/vue'

import type { PostgrestError } from '@supabase/supabase-js'
import { vocabulariesService } from '@/services/vocabulariesService'
import type { Database } from '@/types/database.types'

type Vocabulary = Database['public']['Tables']['vocabularies']['Row']

export const useVocabulariesStore = defineStore('vocabularies', () => {
  const vocabularies = ref<Vocabulary[]>([])
  const error = ref<PostgrestError | null>(null)
  const dataStats = ref({ totalWords: 0, newWords: 0 })
  const openAddModal = ref(false)

  const { isLoaded, user } = useUser()

  async function fetchVocabularies(limit = 6) {
    if (!isLoaded || !user.value) return

    const { data, error: err, count } = await vocabulariesService.list(user.value.id, limit)

    if (err) {
      error.value = err
      console.log(err)
    } else {
      vocabularies.value = data || []

      const now = Date.now()

      const newWordsCount = data?.filter((word) => {
        const createdAt = new Date(word.created_at).getTime()
        return now - createdAt < 1000 * 60 * 60 * 24 * 7 // 7 days
      }).length

      dataStats.value = {
        totalWords: count || 0,
        newWords: newWordsCount,
      }
    }
  }

  async function fetchMoreVocabularies(offset = 0, limit = 6) {
    if (!isLoaded || !user.value) return

    const { data, error: err } = await vocabulariesService.list(user.value.id, limit, offset)

    if (err) {
      error.value = err
    } else {
      vocabularies.value = [...vocabularies.value, ...(data || [])]
    }
  }

  const addVocabulary = async (newWord: Omit<Vocabulary, 'id' | 'created_at'>) => {
    if (!isLoaded || !user.value) return

    const { data, error: insertError } = await vocabulariesService.create({
      ...newWord,
      clerk_user_id: user.value.id,
    })

    if (insertError) {
      error.value = insertError
    } else if (data) {
      vocabularies.value.unshift(data)
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
    fetchMoreVocabularies,
    toggleAddModal,
    addVocabulary,
  }
})
