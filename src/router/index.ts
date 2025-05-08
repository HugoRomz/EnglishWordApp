import AppLayout from '@/Layout/AppLayout.vue'
import { useAuth } from '@clerk/vue'
import { watch } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/app',
      component: AppLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/AboutView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
        // NOT FOUND
        {
          path: '/:pathMatch(.*)*',
          name: 'not-found',
          component: () => import('@/views/NotFoundView.vue'),
          meta: {
            requiresAuth: true,
          },
        },
      ],
    },
  ],
})

// Global navigation guard to protect routes
router.beforeEach(async (to) => {
  const { isLoaded, isSignedIn } = useAuth()

  // Wait for Clerk to finish initializing
  if (!isLoaded.value) {
    await new Promise<void>((resolve) => {
      const stop = watch(
        () => isLoaded.value,
        (loaded) => {
          if (loaded) {
            stop()
            resolve()
          }
        },
      )
    })
  }

  // Si tu rute requiere autenticación y el usuario no está autenticado, redirige a la página de inicio de sesión
  if (to.meta.requiresAuth && !isSignedIn.value) {
    return { name: 'home', query: { redirect: to.fullPath } }
  }

  // Si intenta entrar a '/' y ya está logueado, redirigir al dashboard
  if (to.path === '/' && isSignedIn.value) {
    return { path: '/dashboard' }
  }
})

router.afterEach(async (to, from, failure) => {
  if (!failure) setTimeout(() => window.HSStaticMethods.autoInit(), 100)
})

export default router
