<script setup lang="ts">
import { Bell, CircleUser, LogOut, Info } from 'lucide-vue-next'
</script>

<template>
  <!-- ========== HEADER ========== -->
  <header class="relative flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm">
    <nav
      class="max-w-[85rem] w-full mx-auto px-4 py-3 sm:flex sm:items-center sm:justify-between border-b-1 border-gray-200"
    >
      <div class="w-full flex items-center ms-auto justify-between gap-x-1 md:gap-x-3">
        <div class="flex">
          <a
            class="flex-none text-xl font-bold tracking-wider focus:outline-hidden focus:opacity-80 text-[#E67D22]"
            href="#"
            aria-label="Brand"
          >
            VocaManager
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

          <!-- Dropdown -->
          <div class="hs-dropdown [--placement:bottom-right] relative inline-flex">
            <button
              id="hs-dropdown-account"
              type="button"
              class="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <CircleUser class="size-6" />
            </button>

            <div
              class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-60 bg-white shadow-md rounded-lg mt-2 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="hs-dropdown-account"
            >
              <div class="py-3 px-5 bg-gray-100 rounded-t-lg">
                <p class="text-sm text-gray-500">Sesión Iniciada</p>
                <p class="text-sm font-medium text-gray-800">estacionamiento@park.com</p>
              </div>
              <div class="p-1.5 space-y-0.5">
                <a
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                  href="#"
                >
                  <Info class="size-5" />
                  About
                </a>

                <!-- Exit -->
                <a
                  class="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                  href="#"
                >
                  <LogOut class="size-5" />
                  Salir
                </a>
              </div>
            </div>
          </div>
          <!-- End Dropdown -->
        </div>
      </div>
    </nav>
  </header>
</template>
