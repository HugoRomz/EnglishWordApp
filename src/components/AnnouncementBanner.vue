<script setup lang="ts">
import { ref } from 'vue'

import { X, Info } from 'lucide-vue-next'

const props = defineProps({
  mesagge: {
    type: String,
    default: 'This is an informational message.',
  },
})

const showBanner = ref(true)

function closeBanner() {
  showBanner.value = false
}
</script>

<template>
  <div
    v-if="showBanner"
    class="bg-blue-50 text-blue-800 px-4 py-3 cursor-pointer"
    @click="closeBanner"
  >
    <div class="max-w-[85rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
      <p class="flex sm:items-center gap-2 text-sm text-left">
        <Info class="size-5 shrink-0 text-blue-800" />
        {{ props.mesagge }}
      </p>
      <div class="flex items-center gap-4">
        <X class="size-5 text-blue-800 hover:text-blue-700 focus:outline-none" aria-label="Close" />
      </div>
    </div>
  </div>
</template>
