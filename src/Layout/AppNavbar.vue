<script setup lang="ts">
import { House, ClipboardType, FileSpreadsheet } from 'lucide-vue-next'
</script>

<template>
  <div class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm">
    <div class="max-w-[85rem] w-full mx-auto sm:flex sm:items-center sm:justify-between">
      <div class="border-b-2 px-3 border-gray-200">
        <nav class="-mb-0.5 flex gap-x-6">
          <a
            class="py-3.5 px-1 inline-flex items-center gap-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600"
            href="/"
          >
            <House class="size-4.5" />
            Home
          </a>
          <a
            class="py-3.5 px-1 inline-flex items-center gap-2 border-b-2 border-blue-500 text-sm font-medium whitespace-nowrap text-blue-600 focus:outline-hidden focus:text-blue-800"
            href="/CU-Words"
            aria-current="page"
          >
            <ClipboardType class="size-4.5" />
            Word
          </a>
          <a
            class="py-3.5 px-1 inline-flex items-center gap-2 border-b-2 border-transparent text-sm whitespace-nowrap text-gray-500 hover:text-blue-600 focus:outline-hidden focus:text-blue-600"
            href="/showWords"
          >
            <FileSpreadsheet class="size-4.5" />
            View Words
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>
