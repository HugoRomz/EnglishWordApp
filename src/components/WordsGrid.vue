<script setup lang="ts">
import WordCard from './WordCard.vue'
import SkeletonCard from './SkeletonCard.vue'
import type { Database } from '@/types/database.types'
import { useVocabStore } from '@/stores/vocabStore'

type Vocabulary = Database['public']['Tables']['vocabularies']['Row']

const store = useVocabStore()

const props = defineProps<{
  vocabularies: Vocabulary[]
}>()
</script>

<template>
  <div class="max-w-[85rem] mx-auto">
    <div v-if="store.isLoadingWords" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SkeletonCard v-for="n in store.itemsPerPage" :key="n" />
    </div>

    <div
      v-else-if="props.vocabularies.length > 0"
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <WordCard
        v-for="vocabulary in props.vocabularies"
        :key="vocabulary.id"
        :word="vocabulary || ''"
      />
    </div>

    <div v-else class="text-center text-gray-500 mt-8">No hay palabras registradas aún.</div>
  </div>
</template>
