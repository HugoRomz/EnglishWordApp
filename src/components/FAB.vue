<script setup lang="ts">
import { useVocabulariesStore } from '@/stores/vocabularies'

const vocabStore = useVocabulariesStore()
</script>

<template>
  <button
    @click="vocabStore.openAddModal()"
    class="fixed bottom-6 right-6 z-50 size-14 md:size-16 bg-primaryColor text-white rounded-full shadow-lg hover:bg-[#16a05b] transition-colors flex items-center justify-center cursor-pointer"
  >
    <!-- Icono de "plus" -->
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
    </svg>
  </button>
</template>
