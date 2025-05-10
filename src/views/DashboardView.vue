<script setup lang="ts">
import StatsGrid from '@/components/StatsGrid.vue'
import WordsGrid from '@/components/WordsGrid.vue'
import { useUser } from '@clerk/vue'

import { supabase } from '@/lib/supabaseClient'
import { onMounted, ref } from 'vue'
import type { PostgrestError } from '@supabase/supabase-js'
import type { UUID } from 'crypto'

interface Vocabulary {
  id: UUID
  word: string
  meaning: string
  example: string
  created_at: string
}

const { isSignedIn, user, isLoaded } = useUser()

const vocabularies = ref<Vocabulary[]>([])
const error = ref<PostgrestError | null>(null)

const dataStats = ref({
  totalWords: 0,
  newWords: 0,
})

async function fetchVocabularies() {
  if (!isLoaded || !user) return

  const {
    data,
    error: err,
    count,
  } = await supabase
    .from('vocabularies')
    .select('*', { count: 'exact' })
    .limit(6)
    .eq('clerk_user_id', user.value?.id)

  if (err) {
    console.error(err)

    error.value = err
  } else {
    vocabularies.value = data
    // obtener el total de recien agregados segun su created_at
    const newWordsCount = data.filter((vocabulary) => {
      const createdAt = new Date(vocabulary.created_at)
      const now = new Date()
      const diffInDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 3600 * 24))
      return diffInDays <= 2
    }).length

    dataStats.value = {
      totalWords: count || 0,
      newWords: newWordsCount,
    }
  }
}

onMounted(fetchVocabularies)
</script>

<template>
  <main>
    <div v-if="!isLoaded">
      <p class="text-2xl font-semibold mb-6">Loading...</p>
    </div>
    <h2 v-else-if="isSignedIn" class="text-2xl font-semibold mb-6 mt-2">
      Welcome, {{ user?.fullName }}!
    </h2>
    <div v-else>Not signed in</div>

    <StatsGrid :stats="dataStats" />

    <div class="flex items-center justify-between mt-10 mb-4">
      <h3 class="text-xl font-semibold">Your Vocabulary</h3>
      <router-link
        to="/my-words"
        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
      >
        View All
      </router-link>
    </div>

    <WordsGrid :vocabularies="vocabularies" />
  </main>
</template>
