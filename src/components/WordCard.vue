<script setup lang="ts">
import { usePreline } from '@/composables/UsePreline'
import { useVocabularies } from '@/composables/useVocabularies'
import { useConfirmModalStore } from '@/stores/confirmModalStore'
import { useVocabModalStore } from '@/stores/vocabModalStore'
import { useVocabStore } from '@/stores/vocabStore'
import type { Database } from '@/types/database.types'
import { formatDistance } from 'date-fns'
import { BookOpen, EllipsisVertical, Pencil, Speech } from 'lucide-vue-next'
import { inject } from 'vue'

const vocabModal = useVocabModalStore()

const vocabStore = useVocabStore()
const { deleteVocabulary } = useVocabularies()
const confirmModal = useConfirmModalStore()

interface Toast {
  open: (options: { message: string; type: 'success' | 'error' | 'warning' | 'info' }) => void
}

const toast = inject<Toast>('toast')

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

const handleDelete = () => {
  confirmModal.open({
    title: 'Confirmar eliminación',
    message: `¿Estás seguro de que quieres eliminar la palabra "${props.word.word}"?`,
    confirmText: 'Sí, eliminar',
    cancelText: 'Cancelar',
    onConfirm: async () => {
      const { error } = await deleteVocabulary(props.word.id)
      if (!error) {
        toast?.open({
          message: 'Palabra eliminada correctamente',
          type: 'success',
        })
        await vocabStore.loadWords()
      } else {
        toast?.open({
          message: error.message,
          type: 'error',
        })
      }
    },
  })
}

usePreline()
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
          <div class="hs-dropdown [--placement:bottom-right] relative inline-block">
            <button
              :id="`hs-dropdown-${word.id}`"
              type="button"
              class="hs-dropdown-toggle py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-lg text-gray-700 align-middle disabled:opacity-50 disabled:pointer-events-none transition-all text-sm hover:bg-neutral-100 cursor-pointer"
              aria-haspopup="menu"
              aria-expanded="false"
              aria-label="Dropdown"
            >
              <EllipsisVertical class="shrink-0 size-4" />
            </button>

            <div
              class="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden divide-y divide-gray-200 min-w-40 bg-white shadow-2xl rounded-lg p-2 mt-2 z-20"
              role="menu"
              aria-orientation="vertical"
              :aria-labelledby="`hs-dropdown-${word.id}`"
            >
              <div class="py-2 first:pt-0 last:pb-0">
                <span class="block py-2 px-3 text-xs font-medium uppercase text-gray-400">
                  Actions
                </span>

                <button
                  class="flex w-full items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 cursor-pointer"
                  @click="handleEdit"
                >
                  <Pencil class="size-4 text-gray-800 hover:text-black" /> Edit word
                </button>
                <router-link
                  to="/my-words"
                  class="flex items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100"
                >
                  <BookOpen class="size-4 text-gray-800 hover:text-black" />View details
                </router-link>
              </div>
              <div class="py-2 first:pt-0 last:pb-0">
                <button
                  class="flex w-full items-center gap-x-3 py-2 px-3 rounded-lg text-sm text-red-600 hover:bg-gray-100 focus:ring-1 focus:ring-red-600 cursor-pointer"
                  @click="handleDelete"
                >
                  Delete word
                </button>
              </div>
            </div>
          </div>
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
