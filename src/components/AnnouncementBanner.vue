<script setup lang="ts">
import { ref } from 'vue'

const showBanner = ref(true)

function closeBanner() {
  showBanner.value = false
}
</script>

<template>
  <div
    v-if="showBanner"
    class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 cursor-pointer"
    role="alert"
  >
    <p class="font-bold">Informational message</p>
    <p class="text-sm">Some additional text to explain said message.</p>
    <button
      @click="closeBanner"
      class="absolute top-0 right-0 mt-4 mr-4 text-blue-500 hover:text-blue-700 focus:outline-none"
      aria-label="Close"
    >
      Exite
    </button>
  </div>
</template>
