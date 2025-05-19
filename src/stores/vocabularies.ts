// src/stores/vocabularies.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUser, useAuth } from '@clerk/vue'
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
  const loading = ref(false)
  const dataStats = ref({ totalWords: 0, newWords: 0 })
  const isAddModalOpen = ref(false)

  const { isLoaded, user } = useUser()
  const { getToken } = useAuth()

  async function fetchVocabularies(limit = 6, offset = 0) {
    if (!isLoaded || !user.value) return

    loading.value = true
    error.value = null

    try {
      const token = await getToken.value({ template: 'supabase' })
      if (!token) {
        console.error('No token available')
        return
      }

      const {
        data,
        error: err,
        count,
      } = await vocabulariesService.list(user.value.id, limit, offset, token)

      if (err) {
        error.value = err
        console.error('Error fetching vocabularies:', err)
      } else {
        vocabularies.value = offset === 0 ? data || [] : [...vocabularies.value, ...(data || [])]

        const now = Date.now()

        const newWordsCount =
          data?.filter((word) => {
            const createdAt = new Date(word.created_at).getTime()
            return now - createdAt < 1000 * 60 * 60 * 24 * 7 // 7 days
          }).length || 0

        dataStats.value = {
          totalWords: count || 0,
          newWords: newWordsCount,
        }
      }
    } catch (e) {
      console.error('Unexpected error:', e)
    } finally {
      loading.value = false
    }
  }

  async function addVocabulary(
    newWord: Omit<VocabularyInsert, 'id' | 'created_at' | 'clerk_user_id'>,
  ) {
    if (!isLoaded || !user.value) return

    loading.value = true
    error.value = null

    const token = await getToken.value({ template: 'supabase' })
    if (!token) {
      console.error('No token available')
      return
    }

    try {
      const payload = {
        clerk_user_id: user.value.id,
        word: newWord.word ?? null,
        translate: newWord.translate ?? null,
        example: newWord.example ?? null,
        pronunciation: newWord.pronunciation ?? null,
        type: newWord.type ?? null,
      }

      const { error: insertError } = await vocabulariesService.create(payload, token)

      if (insertError) {
        error.value = insertError
        console.error('Error adding vocabulary:', insertError)
      } else {
        // Refetch vocabularies to ensure we have the latest data
        await fetchVocabularies()
        closeAddModal()
      }
    } catch (e) {
      console.error('Unexpected error:', e)
    } finally {
      loading.value = false
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
    loading,
    dataStats,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
    fetchVocabularies,
    addVocabulary,
  }
})
