// src/lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'
import { useAuth } from '@clerk/vue'
import type { Database } from '@/types/database.types'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Cliente anónimo básico
const supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Función para obtener el cliente de Supabase con autorización
export const getSupabase = async () => {
  const auth = useAuth()

  try {
    // Obtener token de sesión de Clerk para Supabase
    // Accedemos a getToken como un valor de ComputedRef
    const supabaseAccessToken = await auth.getToken.value({ template: 'supabase' })

    if (supabaseAccessToken) {
      // Crear nuevo cliente con el token de sesión
      return createClient<Database>(supabaseUrl, supabaseAnonKey, {
        global: {
          headers: {
            Authorization: `Bearer ${supabaseAccessToken}`,
          },
        },
      })
    }
  } catch (error) {
    console.error('Error al obtener token de Supabase:', error)
  }

  return supabaseClient
}

// Exportar el cliente básico para uso general
export const supabase = supabaseClient
