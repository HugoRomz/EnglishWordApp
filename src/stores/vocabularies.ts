// src/stores/vocabularies.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { useUser } from '@clerk/vue'

import type { PostgrestError } from '@supabase/supabase-js'
import { vocabulariesService } from '@/services/vocabulariesService'
import type { Database } from '@/types/database.types'

type Vocabulary = Database['public']['Tables']['vocabularies']['Row']
type VocabularyInsert = Database['public']['Tables']['vocabularies']['Insert']

interface HSOverlayType {
  open(modalEl: HTMLElement): void
  close(modalEl: HTMLElement): void
}
declare const HSOverlay: HSOverlayType

export const useVocabulariesStore = defineStore('vocabularies', () => {
  const vocabularies = ref<Vocabulary[]>([])
  const error = ref<PostgrestError | null>(null)
  const dataStats = ref({ totalWords: 0, newWords: 0 })
  const isAddModalOpen = ref(false)

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

  async function addVocabulary(
    newWord: Omit<VocabularyInsert, 'id' | 'created_at' | 'clerk_user_id'>,
  ) {
    if (!isLoaded || !user.value) return

    const payload: VocabularyInsert = {
      clerk_user_id: user.value.id,
      word: newWord.word ?? null,
      translate: newWord.translate ?? null,
      example: newWord.example ?? null,
      pronunciation: newWord.pronunciation ?? null,
      type: newWord.type ?? null,
    }

    const { data, error: insertError } = await vocabulariesService.create(payload)
    if (insertError) {
      error.value = insertError
    } else if (data) {
      vocabularies.value.unshift(data)
      // (Opcional) actualizar dataStats.totalWords++
      dataStats.value.totalWords++
    }
  }

  function openAddModal() {
    isAddModalOpen.value = true
    const modalEl = document.getElementById('hs-basic-modal')
    if (modalEl && typeof HSOverlay !== 'undefined') {
      HSOverlay.open(modalEl)
    }
  }
  function closeAddModal() {
    isAddModalOpen.value = false
    const modalEl = document.getElementById('hs-basic-modal')
    if (modalEl && typeof HSOverlay !== 'undefined') {
      HSOverlay.close(modalEl)
    }
  }

  return {
    vocabularies,
    error,
    dataStats,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    fetchVocabularies,
    fetchMoreVocabularies,
    addVocabulary,
  }
})
