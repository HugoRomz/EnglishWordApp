<script setup lang="ts">
import WordsGrid from '@/components/WordsGrid.vue'
import { Plus, Search, Funnel } from 'lucide-vue-next'

import { onMounted, ref } from 'vue'
import { useVocabulariesStore } from '@/stores/vocabularies'

const vocabStore = useVocabulariesStore()
const loading = ref(false)
const noMore = ref(false)
const LIMIT = 6

onMounted(async () => {
  vocabStore.toggleAddModal(false)
  try {
    loading.value = true
    await vocabStore.fetchVocabularies(LIMIT)
    noMore.value = vocabStore.vocabularies.length >= vocabStore.dataStats.totalWords
  } catch (error) {
    console.error('Error fetching vocabularies:', error)
    loading.value = false
  } finally {
    loading.value = false
  }
})

async function loadMore() {
  const offset = vocabStore.vocabularies.length
  if (offset >= vocabStore.dataStats.totalWords) {
    noMore.value = true
    return
  }

  if (loading.value || noMore.value) return
  loading.value = true
  try {
    await vocabStore.fetchMoreVocabularies(offset, LIMIT)
    noMore.value = vocabStore.vocabularies.length >= vocabStore.dataStats.totalWords
  } catch (error) {
    console.error('Error fetching more vocabularies:', error)
    loading.value = false
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="flex items-center justify-between mb-12">
    <h3 class="text-xl font-semibold">My Words</h3>
    <button
      type="button"
      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-800 text-white hover:bg-gray-900 focus:outline-hidden focus:bg-gray-900 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
      aria-haspopup="dialog"
      aria-expanded="false"
      aria-controls="hs-basic-modal"
      data-hs-overlay="#hs-basic-modal"
    >
      <Plus />
      New word
    </button>
  </div>

  <section class="flex flex-col items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
    <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="relative">
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
    </div>
    <!-- Mostrar tanto de tanto -->
    <div class="flex items-center gap-x-2 w-full p-2 rounded-lg mt-2">
      <Funnel class="size-4.5 text-gray-500" />

      <span class="text-sm text-gray-500"
        >Show {{ vocabStore.vocabularies.length }} of
        {{ vocabStore.dataStats.totalWords }} words</span
      >
    </div>
  </section>

  <!-- Tu grid completo y paginación -->
  <WordsGrid :loading="loading" :LIMIT="LIMIT" :vocabularies="vocabStore.vocabularies" />

  <div class="flex items-center justify-center mt-8">
    <button
      @click="loadMore"
      :disabled="loading || noMore"
      class="py-3 px-4 inline-flex items-center border border-gray-200 gap-x-2 text-sm font-medium rounded-lg text-[#16a085] hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:font-bold"
    >
      {{ loading ? 'Loading...' : noMore ? 'Nothing more to load' : 'Load More' }}
    </button>
  </div>
  <div
    id="hs-basic-modal"
    class="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabindex="-1"
    aria-labelledby="hs-basic-modal-label"
  >
    <div class="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div
        class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto"
      >
        <div class="flex justify-between items-center py-3 px-4 border-b border-gray-200">
          <h3 id="hs-basic-modal-label" class="font-bold text-gray-800">Modal title</h3>
          <button
            type="button"
            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Close"
            data-hs-overlay="#hs-basic-modal"
          >
            <span class="sr-only">Close</span>
            <svg
              class="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
        <div class="p-4 overflow-y-auto">
          <p class="mt-1 text-gray-800">
            This is a wider card with supporting text below as a natural lead-in to additional
            content.
          </p>
        </div>
        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-overlay="#hs-basic-modal"
          >
            Close
          </button>
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
