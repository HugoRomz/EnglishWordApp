<script setup lang="ts">
import { Bell } from 'lucide-vue-next'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/vue'
</script>

<template>
  <!-- ========== HEADER ========== -->
  <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm">
    <nav
      class="max-w-[85rem] w-full mx-auto py-3 sm:flex sm:items-center sm:justify-between border-b-1 border-gray-200 px-3 md:px-0"
    >
      <div class="w-full flex items-center ms-auto justify-between gap-x-1 md:gap-x-3">
        <div class="flex">
          <a
            class="flex-none text-xl font-bold tracking-wider focus:outline-hidden focus:opacity-80 text-[#16a085] font-title"
            href="#"
            aria-label="Brand"
          >
            Word Manager
          </a>
        </div>

        <div class="flex flex-row items-center justify-end gap-1">
          <button
            type="button"
            class="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
          >
            <Bell class="size-5" />
            <span class="sr-only">Notifications</span>
          </button>

          <SignedOut>
            <SignInButton
              mode="modal"
              class="px-4 py-2 justify-center items-center text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            />
          </SignedOut>
          <SignedIn>
            <div class="sm:hidden">
              <UserButton />
            </div>
            <div class="hidden sm:block">
              <UserButton showName />
            </div>
          </SignedIn>
        </div>
      </div>
    </nav>
  </header>
</template>
