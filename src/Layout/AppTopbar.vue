<script setup lang="ts">
import { BookOpenText, Menu, X, Settings, House, Plus, BookOpen } from 'lucide-vue-next'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'

import { useRoute } from 'vue-router'
const route = useRoute()

const navLinks = [
  { name: 'Home', path: '/dashboard', icon: House },
  { name: 'My Words', path: '/my-words', icon: BookOpen },
  { name: 'Add Word', path: '/add-word', icon: Plus },
  { name: 'Settings', path: '/settings', icon: Settings },
  // Puedes agregar más aquí sin tocar el template
]

const isActive = (path: string) => route.path === path
</script>

<template>
  <!-- ========== HEADER ========== -->
  <header
    class="bg-white border-b border-gray-200 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full"
  >
    <nav
      class="relative max-w-[85rem] w-full md:flex md:items-center md:justify-between md:gap-3 mx-auto px-4 sm:px-6 lg:px-8 py-3"
    >
      <!-- Logo w/ Collapse Button -->
      <div class="flex items-center justify-between w-full">
        <router-link
          to="/dashboard"
          class="flex font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 justify-center items-center gap-2"
          href="#"
          aria-label="Brand"
        >
          <BookOpenText class="text-[#16a085]" />
          Lexarium
        </router-link>

        <!-- Collapse Button -->
        <div class="md:hidden">
          <button
            type="button"
            class="hs-collapse-toggle relative size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
            id="hs-header-classic-collapse"
            aria-expanded="false"
            aria-controls="hs-header-classic"
            aria-label="Toggle navigation"
            data-hs-collapse="#hs-header-classic"
          >
            <Menu class="hs-collapse-open:hidden size-4 text-gray-600" />
            <X class="hs-collapse-open:block shrink-0 hidden size-4 text-gray-600" />

            <span class="sr-only">Toggle navigation</span>
          </button>
        </div>
        <!-- End Collapse Button -->
      </div>
      <!-- End Logo w/ Collapse Button -->

      <!-- Collapse -->
      <div
        id="hs-header-classic"
        class="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block w-full"
        aria-labelledby="hs-header-classic-collapse"
      >
        <div
          class="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300"
        >
          <div
            class="py-2 md:py-0 flex flex-col md:flex-row md:items-center md:justify-center gap-0.5 md:gap-1"
          >
            <!-- Nav Links -->
            <router-link
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              class="p-2 flex items-center text-sm"
              :class="
                isActive(link.path)
                  ? 'text-[#16a085] font-semibold'
                  : 'text-gray-900 hover:text-gray-500 '
              "
            >
              <component :is="link.icon" class="shrink-0 size-4 me-3 md:me-2 block" />
              {{ link.name }}
            </router-link>

            <!-- Button Group -->
            <hr class="border-gray-200 md:hidden" />
            <div
              class="relative flex flex-wrap items-center justify-end gap-x-1.5 md:ps-2.5 mt-1 md:mt-0 md:ms-1.5 before:block before:absolute before:top-1/2 before:-start-px before:w-px before:h-4 before:bg-gray-300 before:-translate-y-1/2 md:hidden"
            >
              <SignedOut>
                <SignInButton
                  mode="modal"
                  class="px-4 py-2 justify-center items-center text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                />
              </SignedOut>
              <SignedIn>
                <UserButton showName />
              </SignedIn>
            </div>
            <!-- End Button Group -->
          </div>
        </div>
      </div>
      <!-- End Collapse -->
      <!-- Button Group -->
      <div class="relative flex-wrap justify-end w-full md:flex hidden">
        <SignedOut>
          <SignInButton
            mode="modal"
            class="px-4 py-2 justify-center items-center text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          />
        </SignedOut>
        <SignedIn>
          <UserButton showName />
        </SignedIn>
      </div>
      <!-- End Button Group -->
    </nav>
  </header>
  <!-- ========== END HEADER ========== -->
</template>
