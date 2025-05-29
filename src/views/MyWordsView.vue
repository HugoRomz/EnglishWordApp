<script setup lang="ts">
import { Plus, Search } from 'lucide-vue-next'
import { useVocabModalStore } from '@/stores/vocabModalStore'
// import WordsGrid from '@/components/WordsGrid.vue'
// import { useVocabStore } from '@/stores/vocabStore'
// import { computed, onMounted } from 'vue'

const vocabModal = useVocabModalStore()
// const storeWords = useVocabStore()

// onMounted(async () => {
//   // Cargar con paginación
//   await storeWords.loadWords({
//     limit: 20,
//     offset: 0,
//   })
// })

// Solo palabras, NO stats
// const words = computed(() => storeWords.words)
</script>
<template>
  <div
    class="flex flex-col sm:flex-row sm:justify-between items-center gap-4 mb-12 bg-white border border-gray-200 shadow-2xs rounded-xl p-4"
  >
    <div class="relative w-full sm:w-72">
      <input
        type="text"
        class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-white border border-gray-300 rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none"
        placeholder="Search for words"
        aria-label="Search for words"
      />
      <div
        class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
      >
        <Search class="size-4 text-gray-400" />
      </div>
    </div>
    <div class="flex gap-3 w-full sm:w-auto">
      <button
        @click="vocabModal.openSingle()"
        type="button"
        class="w-full sm:w-auto py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-green-800 text-green-800 hover:border-primaryColor hover:text-primaryColor focus:outline-hidden focus:border-primaryColor focus:text-primaryColor disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      >
        <Plus class="size-4" />
        Add single
      </button>
      <button
        @click="vocabModal.openBulk()"
        type="button"
        class="w-full sm:w-auto py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-400 text-gray-600 hover:border-primaryColor hover:text-primaryColor focus:outline-hidden focus:border-primaryColor focus:text-primaryColor disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      >
        <Plus class="size-4" />
        Add multiple
      </button>
    </div>
  </div>
  <!-- <WordsGrid :words="words" /> -->
</template>
