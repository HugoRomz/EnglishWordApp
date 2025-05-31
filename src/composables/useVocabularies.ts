// composables/useVocabularies.ts
import { ref, computed } from 'vue'
import { vocabulariesService, type VocabularyFilter, type WordStats } from '@/services/wordsService'
import { useAuth } from '@clerk/vue'
import type { PostgrestError } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

export type VocabularyInsert = Database['public']['Tables']['vocabularies']['Insert']
export type VocabularyUpdate = Database['public']['Tables']['vocabularies']['Update']

export const useVocabularies = () => {
  const { getToken, userId } = useAuth()

  // Estados locales del composable
  const loading = ref(false)
  const error = ref<string | null>(null)

  const handleError = (err: unknown) => {
    const errorObj = err as PostgrestError
    console.error('Vocabulary error:', errorObj)
    error.value = errorObj.message || 'Error desconocido'
    return { data: null, error: errorObj, count: 0 }
  }

  //   LISTADO DE PALABRAS
  const fetchList = async (filter: VocabularyFilter = {}) => {
    if (!userId.value) throw new Error('Usuario no autenticado')

    loading.value = true
    error.value = null

    try {
      const token = await getToken.value({ template: 'supabase' })
      if (!token) throw new Error('Token no disponible')

      const result = await vocabulariesService.list(userId.value, filter, token)

      if (result.error) throw result.error

      return { data: result.data, error: null, count: result.count || 0 } as const
    } catch (err) {
      return handleError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchPendingWords = async () => {
    if (!userId.value) throw new Error('Usuario no autenticado')

    loading.value = true
    error.value = null

    try {
      const token = await getToken.value({ template: 'supabase' })
      if (!token) throw new Error('Token no disponible')

      const result = await vocabulariesService.getPendingWords(userId.value, token)

      if (result.error) throw result.error

      return { data: result.data, error: null }
    } catch (err) {
      return handleError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchById = async (id: string) => {
    if (!userId.value) throw new Error('Usuario no autenticado')

    loading.value = true
    error.value = null

    try {
      const token = await getToken.value({ template: 'supabase' })
      if (!token) throw new Error('Token no disponible')

      const result = await vocabulariesService.getById(userId.value, id, token)

      if (result.error) throw result.error

      return { data: result.data, error: null }
    } catch (err) {
      return handleError(err)
    } finally {
      loading.value = false
    }
  }

  const createVocabulary = async (
    data: Omit<VocabularyInsert, 'id' | 'created_at' | 'clerk_user_id'>,
  ) => {
    if (!userId.value) throw new Error('Usuario no autenticado')

    loading.value = true
    error.value = null

    try {
      const token = await getToken.value({ template: 'supabase' })
      if (!token) throw new Error('Token no disponible')

      const result = await vocabulariesService.create(data, userId.value, token)

      if (result.error) throw result.error

      return { data: result.data, error: null }
    } catch (err) {
      return handleError(err)
    } finally {
      loading.value = false
    }
  }

  const createBulk = async (words: string[]) => {
    if (!userId.value) throw new Error('Usuario no autenticado')

    loading.value = true
    error.value = null

    try {
      const token = await getToken.value({ template: 'supabase' })
      if (!token) throw new Error('Token no disponible')

      const result = await vocabulariesService.createBulk(words, userId.value, token)

      if (result.error) throw result.error

      return { data: result.data, error: null }
    } catch (err) {
      return handleError(err)
    } finally {
      loading.value = false
    }
  }

  const updateVocabulary = async (id: string, data: VocabularyUpdate) => {
    loading.value = true
    error.value = null

    try {
      const token = await getToken.value({ template: 'supabase' })
      if (!token) throw new Error('Token no disponible')

      const result = await vocabulariesService.update(id, data, token)

      if (result.error) throw result.error

      return { data: result.data, error: null }
    } catch (err) {
      return handleError(err)
    } finally {
      loading.value = false
    }
  }

  const deleteVocabulary = async (id: string) => {
    loading.value = true
    error.value = null

    try {
      const token = await getToken.value({ template: 'supabase' })
      if (!token) throw new Error('Token no disponible')

      const result = await vocabulariesService.delete(id, token)

      if (result.error) throw result.error

      return { data: result.data, error: null }
    } catch (err) {
      return handleError(err)
    } finally {
      loading.value = false
    }
  }

  const fetchStats = async (): Promise<{ data: WordStats | null; error: unknown }> => {
    if (!userId.value) throw new Error('Usuario no autenticado')

    loading.value = true
    error.value = null

    try {
      const token = await getToken.value({ template: 'supabase' })
      if (!token) throw new Error('Token no disponible')

      const result = await vocabulariesService.stats(userId.value, token)

      if (result.error) throw result.error

      return { data: result.data, error: null }
    } catch (err) {
      return handleError(err)
    } finally {
      loading.value = false
    }
  }

  // Estados computados
  const isLoading = computed(() => loading.value)
  const hasError = computed(() => error.value !== null)

  // Función para limpiar errores
  const clearError = () => {
    error.value = null
  }

  return {
    // Estados
    loading: isLoading,
    error: computed(() => error.value),
    hasError,

    // Métodos CRUD
    fetchList,
    fetchPendingWords,
    fetchById,
    createVocabulary,
    createBulk,
    updateVocabulary,
    deleteVocabulary,
    fetchStats,

    // Utilidades
    clearError,
  }
}
