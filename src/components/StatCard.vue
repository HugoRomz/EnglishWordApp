<script setup lang="ts">
import { Palette } from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    default: 'Total users',
  },
  value: {
    type: Number,
    default: 0,
  },
  icon: {
    type: [Object, Function],
    default: () => Palette,
  },
})
</script>

<template>
  <!-- Card -->
  <div class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
    <div class="p-4 md:p-5 flex gap-x-4">
      <div class="shrink-0 flex justify-center items-center size-12 bg-gray-100 rounded-lg">
        <component :is="props.icon" />
      </div>

      <div class="grow">
        <div class="flex items-center gap-x-2">
          <p class="text-xs uppercase text-primaryColor">{{ props.title }}</p>
        </div>
        <div class="mt-1 flex items-center gap-x-2">
          <h3 class="text-xl sm:text-2xl font-medium text-gray-800">{{ props.value }}</h3>
          <!-- <span
            class="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-green-100 text-green-900"
          >
            <TrendingUp class="size-4" />
            <span class="inline-block text-xs font-medium"> 12.5% </span>
          </span> -->
        </div>
      </div>
    </div>
  </div>
  <!-- End Card -->
</template>
