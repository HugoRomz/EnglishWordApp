<script setup lang="ts">
import WordCard from './WordCard.vue'

const props = defineProps({
  vocabularies: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="max-w-[85rem] mx-auto">
    <div
      v-if="props.vocabularies.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
    >
      <WordCard
        v-for="vocabulary in props.vocabularies"
        :key="vocabulary.id || index"
        :word="vocabulary.word"
        :translate="vocabulary.meaning"
        :example="vocabulary.example"
      />
    </div>
    <div v-else class="text-center text-gray-500 mt-8">No hay palabras registradas aún.</div>
  </div>
</template>
