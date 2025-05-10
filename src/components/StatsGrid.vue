<script setup lang="ts">
import StatCard from '@/components/StatCard.vue'
import { WholeWord, ClockPlus } from 'lucide-vue-next'

const props = defineProps({
  stats: {
    type: Object,
  },
})
</script>

<template>
  <!-- Card Section -->
  <div class="max-w-[85rem] mx-auto">
    <!-- Grid -->
    <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <StatCard title="Total words" :value="props.stats?.totalWords" :icon="WholeWord" />
      <StatCard title="Recently Added" :value="props.stats?.newWords" :icon="ClockPlus" />
    </div>
    <!-- End Grid -->
  </div>
  <!-- End Card Section -->
</template>
