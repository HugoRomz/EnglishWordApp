<script setup lang="ts">
import StatsGrid from '@/components/StatsGrid.vue'
import WordsGrid from '@/components/WordsGrid.vue'
import { useVocabStore } from '@/stores/vocabStore'
import { useUser } from '@clerk/vue'
import { computed, onMounted } from 'vue'

const LIMIT = 8

const { isSignedIn, user, isLoaded } = useUser()

const store = useVocabStore()

onMounted(async () => {
  await store.loadWords({ limit: LIMIT })
  await store.loadStats()
})

const recentWords = computed(() => store.recentWords)
const stats = computed(() => store.stats)
</script>

<template>
  <div v-if="!isLoaded">
    <p class="text-2xl font-semibold mb-6">Loading...</p>
  </div>
  <h2 v-else-if="isSignedIn" class="text-2xl font-semibold mb-6 mt-2">
    Welcome, {{ user?.firstName ? user.firstName : 'Unnamed user' }}!
  </h2>
  <div v-else>Not signed in</div>

  <StatsGrid :stats="stats ?? { total: 0, pending: 0, recent: 0, complete: 0 }" />

  <div class="flex items-center justify-between mt-10 mb-4">
    <h3 class="text-xl font-semibold">Recently added words</h3>
    <router-link
      to="/my-words"
      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
    >
      View All
    </router-link>
  </div>

  <WordsGrid :LIMIT="LIMIT" :vocabularies="recentWords" />
</template>
