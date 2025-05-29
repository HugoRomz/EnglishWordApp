<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import { WholeWord, ClockPlus, ClockAlert, CircleCheckBig } from 'lucide-vue-next'
import type { WordStats } from '@/services/wordsService'

defineProps<{
  stats: WordStats
}>()
</script>

<template>
  <!-- Card Section -->
  <div class="max-w-[85rem] mx-auto">
    <!-- Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard title="Total words" :value="stats.total" :icon="WholeWord" />
      <StatCard title="Complete" :value="stats.complete" :icon="CircleCheckBig" />
      <StatCard title="Pending" :value="stats.pending" :icon="ClockAlert" />
      <StatCard title="Recently Added" :value="stats.recent" :icon="ClockPlus" />
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Card Section -->
</template>
