import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client: ReturnType<typeof createClient<Database>> | null = null
let currentToken: string | undefined

/**
 * Devuelve un cliente de Supabase, reutilizando el existente si el token no ha cambiado.
 * @param token - Token JWT para autenticación, opcional.
 */
export const getSupabase = (token?: string) => {
  // Solo recrear el cliente si el token cambia o si es la primera llamada
  if (!client || token !== currentToken) {
    currentToken = token

    // Configuración adicional según la presencia de token
    const options: Record<string, unknown> = {
      global: {
        headers: {
          // Solo agregar Authorization si existe token
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    }

    client = createClient<Database>(supabaseUrl, supabaseAnonKey, options)
  }

  return client
}
