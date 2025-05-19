// src/services/vocabulariesService.ts
import { getSupabase } from '@/lib/supabaseClient'
import type { Database } from '@/types/database.types'
import type { UUID } from 'crypto'

type Vocabulary = Database['public']['Tables']['vocabularies']['Row']
type VocabularyInsert = Database['public']['Tables']['vocabularies']['Insert']

export const vocabulariesService = {
  list: async (userId: string, limit = 6, offset = 0, token?: string) => {
    const supabase = await getSupabase(token)
    return await supabase
      .from('vocabularies')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .eq('clerk_user_id', userId)
      .range(offset, offset + limit - 1)
  },

  getById: async (userId: string, id: UUID) => {
    const supabase = await getSupabase()
    return await supabase
      .from('vocabularies')
      .select('*')
      .eq('clerk_user_id', userId)
      .eq('id', id)
      .single()
  },

  create: async (data: Omit<VocabularyInsert, 'id' | 'created_at'>, token?: string) => {
    const supabase = await getSupabase(token)
    return await supabase.from('vocabularies').insert(data)
  },

  update: async (id: UUID, data: Partial<Omit<Vocabulary, 'id' | 'created_at'>>) => {
    const supabase = await getSupabase()
    return await supabase.from('vocabularies').update(data).eq('id', id)
  },

  delete: async (id: UUID) => {
    const supabase = await getSupabase()
    return await supabase.from('vocabularies').delete().eq('id', id)
  },
}
