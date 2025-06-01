// src/main.ts
import './assets/main.css'

import('preline/dist/index.js')

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { clerkPlugin } from '@clerk/vue'
import { esMX } from '@clerk/localizations'

import { useToast } from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

const $toast = useToast({
  position: 'top-right',
  duration: 5000,
  dismissible: true,
})

const app = createApp(App)

app.provide('toast', $toast)

app.use(clerkPlugin, {
  publishableKey: PUBLISHABLE_KEY,
  localization: esMX,
  signInForceRedirectUrl: import.meta.env.VITE_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
  // Añadir configuración para Supabase
  tokenCache: {
    supabase: {
      issuer: SUPABASE_URL,
    },
  },
})

app.use(createPinia())
app.use(router)

app.mount('#app')
