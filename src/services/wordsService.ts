// src/services/vocabulariesService.ts
import { getSupabase } from '@/lib/supabaseClient'

import type { Database } from '@/types/database.types'

export type Word = Database['public']['Tables']['vocabularies']['Row']
type VocabularyInsert = Database['public']['Tables']['vocabularies']['Insert']
type VocabularyUpdate = Database['public']['Tables']['vocabularies']['Update']

export type VocabularyStatus = 'new' | 'pending' | 'complete'
export type VocabularyFilter = {
  status?: VocabularyStatus | VocabularyStatus[]
  search?: string
  type?: string
  limit?: number
  offset?: number
}

export type WordStats = {
  total: number
  recent: number
  pending: number
  complete?: number
  today?: number
  this_month?: number
}

export const vocabulariesService = {
  /**
   * Listar vocabularios con opciones de filtrado y paginación
   * @param userId ID del usuario
   * @param filter Opciones de filtrado
   * @param token Token de autenticación opcional
   */
  list: async (userId: string, filter: VocabularyFilter = {}, token?: string) => {
    const { limit = 10, offset = 0, status, search, type } = filter
    const supabase = await getSupabase(token)

    let query = supabase
      .from('vocabularies')
      .select('*', { count: 'exact' })
      .eq('clerk_user_id', userId)
      .order('created_at', { ascending: false })

    // Aplicar filtros si existen
    if (status) {
      if (Array.isArray(status)) {
        query = query.in('status', status)
      } else {
        query = query.eq('status', status)
      }
    }

    if (search) {
      query = query.or(`word.ilike.%${search}%,translate.ilike.%${search}%`)
    }

    if (type) {
      query = query.eq('type', type)
    }

    // Aplicar paginación
    query = query.range(offset, offset + limit - 1)

    return await query
  },

  // OBTENER PALABRAS PENDIENTES
  getPendingWords: async (userId: string, token?: string) => {
    const supabase = await getSupabase(token)
    return await supabase
      .from('vocabularies')
      .select('*')
      .eq('clerk_user_id', userId)
      .in('status', ['new', 'pending'])
      .order('created_at', { ascending: true })
  },

  // OBTENER PALABRAS POR ID
  getById: async (userId: string, id: string, token?: string) => {
    const supabase = await getSupabase(token)
    return await supabase
      .from('vocabularies')
      .select('*')
      .eq('clerk_user_id', userId)
      .eq('id', id)
      .single()
  },

  //   CREATE y CREATE BULK
  // YA EXISTE UN TRIGGER DE INSERT Y UPDATE PARA MANEJAR LOS ESTADOS
  create: async (
    data: Omit<VocabularyInsert, 'id' | 'created_at'>,
    userId: string,
    token?: string,
  ) => {
    const supabase = await getSupabase(token)

    return await supabase
      .from('vocabularies')
      .insert(data)
      .eq('clerk_user_id', userId)
      .select()
      .single()
  },

  // CREATE bulk
  createBulk: async (
    words: string[], // Array de palabras simples ['DOG', 'CAT', 'CAR', 'WASH']
    userId: string,
    token?: string,
  ) => {
    const supabase = await getSupabase(token)

    const wordsData = words
      .map((word) => word.trim()) // Limpiar espacios
      .filter((word) => word.length > 0)
      .map((word) => ({
        word: word.toUpperCase(),
        clerk_user_id: userId,
      }))

    return await supabase.from('vocabularies').insert(wordsData).select()
  },
  //  UPDATE
  update: async (id: string, data: Omit<VocabularyUpdate, 'id' | 'created_at'>, token?: string) => {
    const supabase = await getSupabase(token)
    return await supabase.from('vocabularies').update(data).eq('id', id).select().single()
  },

  // DELETE
  delete: async (id: string, token?: string) => {
    const supabase = await getSupabase(token)
    return await supabase.from('vocabularies').delete().eq('id', id)
  },

  // OBTENER STATS DEL USUARIO
  stats: async (
    userId: string,
    token?: string,
  ): Promise<{ data: WordStats | null; error: unknown }> => {
    const supabase = await getSupabase(token)

    const { data, error } = await supabase.rpc('get_user_vocabulary_stats', { user_id: userId })

    return {
      data: data as WordStats | null,
      error,
    }
  },
}
