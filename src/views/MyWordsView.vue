<script setup lang="ts">
import { onMounted } from 'vue'
import { Plus, Search } from 'lucide-vue-next'
import { useVocabModalStore } from '@/stores/vocabModalStore'
import { useVocabStore } from '@/stores/vocabStore'
import PaginationWord from '@/components/PaginationWord.vue'
import WordsGrid from '@/components/WordsGrid.vue'

const vocabModal = useVocabModalStore()
const storeWords = useVocabStore()

onMounted(async () => {
  await storeWords.loadWords()
})

const goToPage = (page: number) => {
  storeWords.goToPage(page)
}

const nextPage = () => {
  storeWords.nextPage()
}

const prevPage = () => {
  storeWords.prevPage()
}
</script>
<template>
  <div class="bg-white border border-gray-200 shadow-2xs rounded-xl p-4 mb-5">
    <div class="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
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
    <div class="flex flex-col sm:flex-row sm:justify-between items-center gap-4">
      <div class="mt-4 flex items-center text-sm text-gray-500">
        <!-- AQUJI IRA ALGO  -->
      </div>
    </div>
    <PaginationWord
      v-if="storeWords.totalItems > storeWords.itemsPerPage"
      :current-page="storeWords.currentPage"
      :total-pages="Math.ceil(storeWords.totalItems / storeWords.itemsPerPage)"
      @page-changed="goToPage"
      @next-page="nextPage"
      @prev-page="prevPage"
    />
  </div>

  <WordsGrid :vocabularies="storeWords.words" />
</template>
