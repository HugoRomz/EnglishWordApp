import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client: ReturnType<typeof createClient<Database>> | null = null
let currentToken: string | undefined

export const getSupabase = async (token?: string) => {
  // Si ya existe un cliente y el token es el mismo, retornar el cliente existente
  if (client && token === currentToken) {
    return client
  }

  // Actualizar el token actual
  currentToken = token

  // Configuración del cliente
  const config = token
    ? {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    : undefined

  // Crear o actualizar el cliente
  client = createClient<Database>(supabaseUrl, supabaseAnonKey, config)

  return client
}
