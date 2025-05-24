<script setup lang="ts">
import WordCard from './WordCard.vue'
import SkeletonCard from './SkeletonCard.vue'
import type { Database } from '@/types/database.types'

type Vocabulary = Database['public']['Tables']['vocabularies']['Row']

const props = defineProps<{
  vocabularies: Vocabulary[]
  loading: boolean
  LIMIT: number
}>()
</script>

<template>
  <div class="max-w-[85rem] mx-auto">
    <div v-if="props.loading" class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <SkeletonCard v-for="n in props.LIMIT" :key="n" />
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
