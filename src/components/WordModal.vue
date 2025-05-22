<script setup lang="ts">
import { Languages, Lightbulb, Speech, X } from 'lucide-vue-next'
import { useVocabulariesStore } from '@/stores/vocabularies'

import { WholeWord } from 'lucide-vue-next'
import { reactive } from 'vue'

const vocabStore = useVocabulariesStore()

const formData = reactive({
  word: '',
  translate: '',
  example: '',
  pronunciation: '',
})

const handleSubmit = async () => {
  const { word, translate, example, pronunciation } = formData

  if (!word || !translate || !example || !pronunciation) {
    // Puedes mostrar un mensaje de error aquí si lo deseas
    return
  }

  await vocabStore.addVocabulary({
    word: formData.word,
    translate: formData.translate || null,
    example: formData.example || null,
    pronunciation: formData.pronunciation || null,
  })

  // Limpiar los campos del formulario
  formData.word = ''
  formData.translate = ''
  formData.example = ''
  formData.pronunciation = ''

  // Cerrar el modal
  vocabStore.closeAddModal()
}
</script>

<template>
  <div
    id="hs-basic-modal"
    class="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabindex="-1"
    aria-labelledby="hs-basic-modal-label"
    aria-modal="true"
  >
    <div class="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div
        class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto"
      >
        <div class="flex justify-between items-center py-3 px-4 border-b border-gray-200">
          <h3 id="hs-basic-modal-label" class="font-bold text-gray-800">Add new word</h3>
          <button
            type="button"
            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-500 hover:text-black hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            aria-label="Close"
            @click="vocabStore.closeAddModal()"
          >
            <span class="sr-only">Close</span>
            <X class="size-5" />
          </button>
        </div>
        <div class="overflow-y-auto">
          <!-- Card -->
          <div class="p-4 relative z-10">
            <form>
              <div class="mb-4 sm:mb-8 flex flex-col gap-2">
                <!-- INPUT FOR WORD -->
                <label for="input-word" class="block text-sm font-medium">Word</label>
                <div class="relative">
                  <input
                    type="text"
                    id="input-word"
                    v-model="formData.word"
                    class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Enter word | e.g. apple"
                  />
                  <div
                    class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                  >
                    <WholeWord class="size-5 text-gray-500" />
                  </div>
                </div>

                <!-- INPUT FOR MEANING -->
                <label for="input-translate" class="block text-sm font-medium"
                  >Meaning in Spanish</label
                >
                <div class="relative">
                  <input
                    type="text"
                    id="input-translate"
                    v-model="formData.translate"
                    class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Enter meaning | e.g. manzana"
                  />
                  <div
                    class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                  >
                    <Languages class="size-5 text-gray-500" />
                  </div>
                </div>

                <!-- INPUT FOR EXAMPLE -->
                <label for="input-example" class="block text-sm font-medium">Example</label>
                <div class="relative">
                  <input
                    type="text"
                    id="input-example"
                    v-model="formData.example"
                    class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Enter example | e.g. Apple is a fruit"
                  />
                  <div
                    class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                  >
                    <Lightbulb class="size-5 text-gray-500" />
                  </div>
                </div>
                <!-- INPUT FOR PRONUNCIATION -->
                <label for="input-pronunciation" class="block text-sm font-medium"
                  >Pronunciation</label
                >
                <div class="relative">
                  <input
                    type="text"
                    id="input-pronunciation"
                    v-model="formData.pronunciation"
                    class="peer py-2.5 sm:py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg sm:text-sm disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Enter pronunciation | e.g.  /A·pl/"
                  />
                  <div
                    class="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4 peer-disabled:opacity-50 peer-disabled:pointer-events-none"
                  >
                    <Speech class="size-5 text-gray-500" />
                  </div>
                </div>
                <!-- INPUT FOR TYPE
                <label for="input-pronunciation" class="block text-sm font-medium">Example</label>
                <div class="relative">
                  <select
                    class="py-3 px-4 pe-9 block w-full bg-gray-100 border-transparent rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <option selected="true">Open this select menu</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div> -->
              </div>
            </form>
          </div>
          <!-- End Card -->
        </div>
        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            @click="vocabStore.closeAddModal()"
          >
            Close
          </button>
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primaryColor text-white hover:bg-primaryColor/90 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            @click="handleSubmit"
            :disabled="
              !formData.word || !formData.translate || !formData.example || !formData.pronunciation
            "
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
