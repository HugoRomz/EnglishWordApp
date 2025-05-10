<script setup lang="ts">
import StatsGrid from '@/components/StatsGrid.vue'
import WordsGrid from '@/components/WordsGrid.vue'
import { useUser } from '@clerk/vue'

const { isSignedIn, user, isLoaded } = useUser()
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

    <StatsGrid />

    <div class="flex items-center justify-between mt-10 mb-4">
      <h3 class="text-xl font-semibold">Your Vocabulary</h3>
      <router-link
        to="/my-words"
        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
      >
        View All
      </router-link>
    </div>

    <WordsGrid />
  </main>
</template>
