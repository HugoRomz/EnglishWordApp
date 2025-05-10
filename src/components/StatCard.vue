<script setup lang="ts">
import { Palette } from 'lucide-vue-next'

const props = defineProps({
  title: {
    type: String,
    default: 'Total users',
  },
  value: {
    type: String,
    default: '72,540',
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
      <div class="shrink-0 flex justify-center items-center size-11 bg-gray-100 rounded-lg">
        <component :is="props.icon" />
      </div>

      <div class="grow">
        <div class="flex items-center gap-x-2">
          <p class="text-xs uppercase text-[#16a085]">{{ props.title }}</p>
        </div>
        <div class="mt-1 flex items-center gap-x-2">
          <h3 class="text-xl sm:text-2xl font-medium text-gray-800">{{ props.value }}</h3>
          <!-- <span
            class="inline-flex items-center gap-x-1 py-0.5 px-2 rounded-full bg-green-100 text-green-900"
          >
            <svg
              class="inline-block size-4 self-center"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
              <polyline points="16 7 22 7 22 13" />
            </svg>
            <span class="inline-block text-xs font-medium"> 12.5% </span>
          </span> -->
        </div>
      </div>
    </div>
  </div>
  <!-- End Card -->
</template>
