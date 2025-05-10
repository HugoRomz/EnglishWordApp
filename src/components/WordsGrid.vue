<script setup lang="ts">
import WordCard from './WordCard.vue'

const data = [
  {
    word: 'Hello',
    translate: 'Hola',
    example: 'Hello, how are you?',
  },
  {
    word: 'Goodbye',
    translate: 'Adiós',
    example: 'Goodbye, see you later!',
  },
  {
    word: 'Please',
    translate: 'Por favor',
    example: 'Please, can you help me?',
  },
  {
    word: 'Thank you',
    translate: 'Gracias',
    example: 'Thank you for your help!',
  },
  {
    word: 'Sorry',
    translate: 'Lo siento',
    example: 'Sorry for being late.',
  },
  {
    word: 'Help',
    translate: 'Ayuda',
    example: 'Can you help me with this?',
  },
]
</script>

<template>
  <!-- Card Section -->
  <div class="max-w-[85rem] mx-auto">
    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <WordCard
        v-for="(word, index) in data"
        :key="index"
        :word="word.word"
        :translate="word.translate"
        :example="word.example"
      />
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Card Section -->
</template>
