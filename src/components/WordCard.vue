<script setup lang="ts">
import { useVocabModalStore } from '@/stores/vocabModalStore'
import type { Database } from '@/types/database.types'
import { formatDistance } from 'date-fns'
import { BookOpen, Pencil, Speech } from 'lucide-vue-next'

const vocabModal = useVocabModalStore()

const props = defineProps<{
  word: Vocabulary
}>()

type Vocabulary = Database['public']['Tables']['vocabularies']['Row']

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-100 text-green-800 ',
  medium: 'bg-amber-100 text-amber-800 ',
  hard: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800',
}

const typeColors: Record<string, string> = {
  noun: 'bg-blue-100 text-blue-800',
  verb: 'bg-purple-100 text-purple-800',
  adjective: 'bg-indigo-100 text-indigo-800',
  adverb: 'bg-teal-100 text-teal-800',
  preposition: 'bg-pink-100 text-pink-800',
  default: 'bg-gray-100 text-gray-800',
}

const getDifficultyColor = (difficulty: string | null): string => {
  if (!difficulty) return 'bg-gray-100 text-gray-800'

  const normalizedDifficulty = difficulty.toLowerCase().trim()
  return difficultyColors[normalizedDifficulty] || 'bg-gray-100 text-gray-800'
}

const getTypeColor = (type: string | null): string => {
  if (!type) return 'bg-slate-100 text-slate-800'

  const normalizedType = type.toLowerCase().trim()
  return typeColors[normalizedType] || 'bg-slate-100 text-slate-800'
}

const formatDate = (date: string | null): string => {
  if (!date) return 'undefined'

  const now = new Date()
  const formattedDate = formatDistance(new Date(date), now, {
    addSuffix: true,
    includeSeconds: true,
  })

  return formattedDate
}

const handleEdit = () => {
  vocabModal.openEdit(props.word)
}
</script>

<template>
  <div
    class="w-full shadow-md hover:shadow-lg rounded-md border border-zinc-100 transition-shadow duration-300"
  >
    <div class="p-3 sm:p-4">
      <div class="flex justify-between items-start">
        <div class="w-full">
          <h2 class="text-xl font-bold capitalize">{{ word.word }}</h2>
        </div>
        <div class="flex gap-1">
          <router-link
            to="/my-words"
            class="size-7 rounded hover:bg-neutral-100 flex items-center justify-center transition"
            ><BookOpen class="size-4 text-gray-800 hover:text-black"
          /></router-link>
          <button
            @click="handleEdit"
            class="size-7 rounded-lg hover:bg-neutral-100 flex items-center justify-center transition"
          >
            <Pencil class="size-4 text-gray-800 hover:text-black" />
          </button>
        </div>
      </div>
      <div
        class="flex flex-col sm:flex-row sm:items-center gap-1 mt-0.5 text-xs text-zinc-500 mb-2"
      >
        <div class="flex items-center gap-1">
          <span class="font-mono">/{{ word.ipa_pronunciation }}/</span>
          <Speech class="size-4" />
          <span class="italic">({{ word.pronunciation }})</span>
        </div>
      </div>
      <p class="text-sm">{{ word.translate }}</p>

      <div class="flex flex-wrap gap-1.5 my-2">
        <span
          class="text-xs px-1.5 py-0 rounded-full font-semibold text-center"
          :class="getDifficultyColor(word.difficulty)"
        >
          {{ word.difficulty || 'undefined' }}</span
        >
        <span
          class="text-xs px-1.5 py-0 rounded-full font-semibold text-center"
          :class="getTypeColor(word.type)"
        >
          {{ word.type || 'undefined' }}
        </span>
      </div>
      <!-- #717A8F -->
      <div class="text-xs">
        <p class="text-gray-500 font-medium">Ejemplo:</p>
        <p class="italic line-clamp-2">{{ word.example }}</p>
      </div>
    </div>
    <div class="pt-0 pb-2 px-3 sm:px-4">
      <p class="text-xs text-gray-500">{{ formatDate(word.created_at) }}</p>
    </div>
  </div>
</template>
