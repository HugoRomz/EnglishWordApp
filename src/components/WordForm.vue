<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { modalMode, Word } from '@/stores/vocabModalStore'
import { AudioLines, AudioWaveform, Languages, TextCursorInput, WholeWord } from 'lucide-vue-next'

const props = defineProps<{
  mode: modalMode
  word: Word | null
}>()

const emit = defineEmits(['save'])

const form = ref({
  id: '', // Para el modo 'edit'
  word: '',
  translate: '',
  type: '',
  example: '',
  pronunciation: '',
  ipa_pronunciation: '',
  difficulty: 'easy', // 'easy' | 'medium' | 'hard'
})

// Estado para bulk (cuando implementes)
const bulkWords = ref('')

// Opciones para el select de tipos
const wordTypes = [
  { value: 'noun', label: 'Noun (Sustantivo)' },
  { value: 'verb', label: 'Verb (Verbo)' },
  { value: 'adjective', label: 'Adjective (Adjetivo)' },
  { value: 'adverb', label: 'Adverb (Adverbio)' },
  { value: 'preposition', label: 'Preposition (Preposición)' },
  { value: 'other', label: 'Other (Otro)' },
]

watch(
  () => props.word,
  (newWord) => {
    if (newWord && props.mode === 'edit') {
      form.value = {
        id: newWord.id || '',
        word: newWord.word || '',
        translate: newWord.translate || '',
        type: newWord.type || '',
        example: newWord.example || '',
        pronunciation: newWord.pronunciation || '',
        ipa_pronunciation: newWord.ipa_pronunciation || '',
        difficulty: newWord.difficulty || 'easy',
      }
    }
  },
  { immediate: true },
)

watch(
  () => props.mode,
  () => {
    if (props.mode !== 'edit') {
      form.value = {
        id: '',
        word: '',
        translate: '',
        type: '',
        example: '',
        pronunciation: '',
        ipa_pronunciation: '',
        difficulty: 'easy',
      }
    }
  },
)

const isValid = computed(() => {
  if (props.mode === 'bulk') {
    return bulkWords.value.trim().length > 0
  }
  return form.value.word.trim().length > 0
})

const handleSave = () => {
  if (!isValid.value) return

  if (props.mode === 'bulk') {
    const words = bulkWords.value
      .split('\n')
      .map((word) => word.trim())
      .filter((word) => word.length > 0)

    emit('save', { mode: 'bulk', data: words })
  } else {
    const formData = {
      ...form.value,
      word: form.value.word.toUpperCase(),
      ...(props.mode === 'edit' && props.word ? { id: props.word.id } : {}),
    }

    emit('save', { mode: props.mode, data: formData })
  }
}

// Expose the handleSave method to parent components
defineExpose({
  handleSave,
})
</script>

<template>
  <form @submit.prevent="handleSave" class="space-y-4">
    <div v-if="mode === 'bulk'" class="w-full space-y-3">
      <div class="grid gap-4">
        <!-- WORD -->
        <div class="grid grid-cols-1">
          <!-- BULK -->
          <div class="relative">
            <input
              v-model="bulkWords"
              type="text"
              class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-primaryColor focus:ring-primaryColor disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Enter words | (e.g. 'apple, hello, world')"
            />
            <div
              class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
            >
              <WholeWord class="shrink-0 size-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="w-full space-y-3">
      <input
        v-model="form.id"
        type="text"
        class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-primaryColor focus:ring-primaryColor disabled:opacity-50 disabled:pointer-events-none"
        placeholder="Enter word | (e.g. 'apple')"
      />
      <div class="grid gap-4">
        <!-- WORD -->
        <div class="grid grid-cols-1">
          <div class="relative">
            <input
              v-model="form.word"
              type="text"
              class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-primaryColor focus:ring-primaryColor disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Enter word | (e.g. 'apple')"
            />
            <div
              class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
            >
              <WholeWord class="shrink-0 size-5 text-gray-500" />
            </div>
          </div>
        </div>
        <!-- TRANSLATE AND TYPE -->
        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <input
              type="text"
              v-model="form.translate"
              class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-primaryColor focus:ring-primaryColor disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Enter translation | (e.g. 'manzana')"
            />
            <div
              class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
            >
              <Languages class="shrink-0 size-5 text-gray-500" />
            </div>
          </div>

          <select
            v-model="form.type"
            class="py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm text-gray-500 focus:border-primaryColor focus:ring-primaryColor disabled:opacity-50 disabled:pointer-events-none"
          >
            <option value="">Select type | (e.g. 'noun')</option>
            <option v-for="type in wordTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>
        <!--Example -->
        <div class="grid grid-cols-1">
          <div class="relative">
            <input
              v-model="form.example"
              type="text"
              class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-primaryColor focus:ring-primaryColor disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Enter example | (e.g. 'I like apples')"
            />
            <div
              class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
            >
              <TextCursorInput class="shrink-0 size-5 text-gray-500" />
            </div>
          </div>
        </div>
        <!-- PRONUNCIOACION NORMAL E IPA -->
        <div class="grid grid-cols-2 gap-4">
          <div class="relative">
            <input
              type="text"
              v-model="form.pronunciation"
              class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-primaryColor focus:ring-primaryColor disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Enter pronunciation | (e.g. 'appel')"
            />
            <div
              class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
            >
              <AudioWaveform class="shrink-0 size-4 text-gray-500" />
            </div>
          </div>

          <div class="relative">
            <input
              type="text"
              v-model="form.ipa_pronunciation"
              class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm focus:border-primaryColor focus:ring-primaryColor disabled:opacity-50 disabled:pointer-events-none"
              placeholder="Enter IPA pronunciation | (e.g. /ˈæpəl/)"
            />
            <div
              class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
            >
              <AudioLines class="shrink-0 size-5 text-gray-500" />
            </div>
          </div>
        </div>

        <!-- DIFICULTAD -->
        <div class="grid grid-cols-1">
          <div class="grid grid-cols-3 gap-2">
            <label
              for="hs-radio-on-right"
              class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-primaryColor focus:ring-primaryColor"
            >
              <span class="text-sm text-gray-500">Easy</span>
              <input
                v-model="form.difficulty"
                type="radio"
                value="easy"
                name="hs-radio-on-right difficulty"
                class="shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-emerald-600 focus:ring-primaryColor checked:border-primaryColor disabled:opacity-50 disabled:pointer-events-none"
                id="hs-radio-on-right"
              />
            </label>

            <label
              for="hs-radioradio-on-right"
              class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-primaryColor focus:ring-primaryColor"
            >
              <span class="text-sm text-gray-500">Medium</span>
              <input
                v-model="form.difficulty"
                type="radio"
                value="medium"
                name="hs-radio-on-right difficulty"
                class="shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-amber-500 focus:ring-amber-600 checked:border-amber-600 disabled:opacity-50 disabled:pointer-events-none"
                id="hs-radioradio-on-right"
              />
            </label>
            <label
              for="hs-radioradio-on-right"
              class="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-primaryColor focus:ring-primaryColor"
            >
              <span class="text-sm text-gray-500">Hard</span>
              <input
                v-model="form.difficulty"
                type="radio"
                value="hard"
                name="hs-radio-on-right difficulty"
                class="shrink-0 ms-auto mt-0.5 border-gray-200 rounded-full text-red-500 focus:ring-red-600 checked:border-red-600 disabled:opacity-50 disabled:pointer-events-none"
                id="hs-radioradio-on-right"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
