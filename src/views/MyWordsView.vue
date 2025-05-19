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
    await vocabStore.fetchVocabularies(LIMIT, offset)
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
      @click="vocabStore.openAddModal()"
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
      class="py-3 px-4 inline-flex items-center border border-gray-200 gap-x-2 text-sm font-medium rounded-lg text-primaryColor hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none cursor-pointer hover:font-bold"
    >
      {{ loading ? 'Loading...' : noMore ? 'Nothing more to load' : 'Load More' }}
    </button>
  </div>
</template>
