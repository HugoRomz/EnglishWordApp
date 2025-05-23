<script setup lang="ts">
import { useVocabModalStore } from '@/stores/vocabModalStore'

import { Plus } from 'lucide-vue-next'

const vocabModal = useVocabModalStore()
</script>

<template>
  <button
    @click="vocabModal.openSingle()"
    class="fixed bottom-6 right-6 z-50 size-14 md:size-16 bg-primaryColor text-white rounded-full shadow-lg hover:bg-[#16a05b] transition-colors flex items-center justify-center cursor-pointer"
  >
    <Plus class="size-9" />
  </button>
</template>
