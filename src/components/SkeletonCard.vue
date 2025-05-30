<template>
  <div
    class="w-full shadow-md rounded-md border border-zinc-100 transition-shadow duration-300 animate-pulse"
  >
    <div class="p-3 sm:p-4">
      <!-- Header con título y botones -->
      <div class="flex justify-between items-start mb-2">
        <div class="w-3/4">
          <div class="h-7 bg-gray-200 rounded-md w-3/4"></div>
        </div>
        <div class="flex gap-1">
          <div class="size-7 rounded bg-gray-200"></div>
          <div class="size-7 rounded bg-gray-200"></div>
        </div>
      </div>

      <!-- Pronunciación -->
      <div class="flex items-center gap-2 mt-1 mb-3">
        <div class="h-4 bg-gray-200 rounded w-24"></div>
        <div class="size-4 rounded-full bg-gray-200"></div>
        <div class="h-4 bg-gray-200 rounded w-16"></div>
      </div>

      <!-- Traducción -->
      <div class="h-5 bg-gray-200 rounded w-2/3 mb-3"></div>

      <!-- Tags -->
      <div class="flex gap-2 my-3">
        <div class="h-4 bg-gray-200 rounded-full w-16"></div>
        <div class="h-4 bg-gray-200 rounded-full w-16"></div>
      </div>

      <!-- Ejemplo -->
      <div class="space-y-2">
        <div class="h-4 bg-gray-200 rounded w-16"></div>
        <div class="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    </div>

    <!-- Footer con fecha -->
    <div class="pt-0 pb-2 px-3 sm:px-4">
      <div class="h-3 bg-gray-200 rounded w-24"></div>
    </div>
  </div>
</template>
