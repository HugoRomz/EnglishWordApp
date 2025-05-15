import { supabase } from '@/lib/supabaseClient'
import type { Database } from '@/types/database.types'
import type { UUID } from 'crypto'

type Vocabulary = Database['public']['Tables']['vocabularies']['Row']
type VocabularyInsert = Database['public']['Tables']['vocabularies']['Insert']

export const vocabulariesService = {
  list: async (userId: string, limit = 6, offset = 0) => {
    return await supabase
      .from('vocabularies')
      .select('*', { count: 'exact' })
      .eq('clerk_user_id', userId)
      .range(offset, offset + limit - 1)
  },
  getById: async (userId: string, id: UUID) =>
    supabase.from('vocabularies').select('*').eq('clerk_user_id', userId).eq('id', id).single(),

  create: (data: Omit<VocabularyInsert, 'id' | 'created_at'>) =>
    supabase.from('vocabularies').insert(data),
  update: (id: UUID, data: Partial<Omit<Vocabulary, 'id' | 'created_at'>>) =>
    supabase.from('vocabularies').update(data).eq('id', id),
  delete: (id: UUID) => supabase.from('vocabularies').delete().eq('id', id),
}
