<script setup lang="ts">
import { BookOpen } from 'lucide-vue-next'

const props = defineProps({
  word: {
    type: String,
    required: true,
  },
  translate: {
    type: String,
    required: true,
  },
  example: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
    <div class="bg-gray-100 rounded-t-xl py-3 px-4 md:py-4 md:px-5">
      <div class="flex justify-between items-center">
        <h2 class="text-lg text-gray-900 font-semibold">{{ props.word }}</h2>
        <router-link to="/my-words"><BookOpen class="size-5 text-gray-800" /></router-link>
      </div>
      <p class="text-sm text-gray-600 italic">{{ props.translate }}</p>
    </div>
    <div class="px-4 md:px-5 py-3">
      <p class="text-sm text-gray-600">{{ props.example }}</p>
    </div>
  </div>
</template>
