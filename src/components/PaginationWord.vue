<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed, ref } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  pageChanged: [page: number]
  nextPage: []
  prevPage: []
}>()

// Para el input "Go to page"
const goToPageInput = ref<number>()

const goToPage = (page: number) => {
  emit('pageChanged', page)
}

const goToPrev = () => {
  emit('prevPage')
}

const goToNext = () => {
  emit('nextPage')
}

const handleGoToPage = () => {
  if (goToPageInput.value && goToPageInput.value >= 1 && goToPageInput.value <= props.totalPages) {
    goToPage(goToPageInput.value)
    goToPageInput.value = undefined
  }
}

// Computed properties para la lógica de paginación
const visiblePages = computed(() => {
  const pages = []
  const maxVisible = 3 // Número máximo de páginas visibles en el medio

  // Si hay pocas páginas, mostrar todas excepto la primera y última
  if (props.totalPages <= 6) {
    for (let i = 2; i < props.totalPages; i++) {
      pages.push(i)
    }
    return pages
  }

  // Lógica para páginas intermedias
  let start = Math.max(2, props.currentPage - Math.floor(maxVisible / 2))
  let end = Math.min(props.totalPages - 1, props.currentPage + Math.floor(maxVisible / 2))

  // Ajustar si estamos cerca del inicio
  if (props.currentPage <= 3) {
    start = 2
    end = Math.min(4, props.totalPages - 1)
  }

  // Ajustar si estamos cerca del final
  if (props.currentPage >= props.totalPages - 2) {
    start = Math.max(2, props.totalPages - 3)
    end = props.totalPages - 1
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const showLeftEllipsis = computed(() => {
  return props.totalPages > 6 && props.currentPage > 4
})

const showRightEllipsis = computed(() => {
  return props.totalPages > 6 && props.currentPage < props.totalPages - 3
})
</script>

<template>
  <!-- Pagination Wrapper -->
  <div class="grid justify-center sm:flex sm:items-center gap-2">
    <!-- Pagination -->
    <nav class="flex items-center gap-x-1" aria-label="Pagination">
      <button
        type="button"
        @click="goToPrev"
        :disabled="currentPage <= 1"
        class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Previous"
      >
        <ChevronLeft class="shrink-0 size-3.5" />
        <span class="sr-only">Previous</span>
      </button>

      <div class="flex items-center gap-x-1">
        <!-- Primera página -->
        <button
          @click="goToPage(1)"
          :class="[
            'min-h-9.5 min-w-9.5 flex justify-center items-center border text-gray-800 py-2 px-3 text-sm rounded-full focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
            currentPage === 1
              ? 'border-primaryColor bg-gray-50'
              : 'border-transparent hover:bg-gray-100 focus:bg-gray-100',
          ]"
        >
          1
        </button>

        <span v-if="showLeftEllipsis" class="px-2 text-gray-500 text-sm">...</span>

        <button
          v-for="page in visiblePages"
          :key="page"
          @click="goToPage(page)"
          :class="[
            'min-h-9.5 min-w-9.5 flex justify-center items-center border text-gray-800 py-2 px-3 text-sm rounded-full focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
            currentPage === page
              ? 'border-primaryColor bg-gray-50'
              : 'border-transparent hover:bg-gray-100 focus:bg-gray-100',
          ]"
        >
          {{ page }}
        </button>

        <span v-if="showRightEllipsis" class="px-2 text-gray-500 text-sm">...</span>

        <button
          v-if="totalPages > 1"
          @click="goToPage(totalPages)"
          :class="[
            'min-h-9.5 min-w-9.5 flex justify-center items-center border text-gray-800 py-2 px-3 text-sm rounded-full focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
            currentPage === totalPages
              ? 'border-primaryColor bg-gray-50'
              : 'border-transparent hover:bg-gray-100 focus:bg-gray-100',
          ]"
        >
          {{ totalPages }}
        </button>
      </div>

      <button
        type="button"
        @click="goToNext"
        :disabled="currentPage >= totalPages"
        class="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        aria-label="Next"
      >
        <span class="sr-only">Next</span>
        <ChevronRight class="shrink-0 size-3.5" />
      </button>
    </nav>
    <!-- End Pagination -->

    <div class="flex justify-center items-center gap-x-5">
      <!-- Go To Page -->
      <div class="flex items-center gap-x-2">
        <span class="text-sm text-gray-800 whitespace-nowrap">Go to</span>
        <input
          v-model.number="goToPageInput"
          @keyup.enter="handleGoToPage"
          type="number"
          :min="1"
          :placeholder="`1-${totalPages}`"
          :max="totalPages"
          class="min-h-9.5 py-2 px-2.5 block w-12 border-gray-200 rounded-lg text-sm text-center focus:border-primaryColor focus:ring-primaryColor [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50 disabled:pointer-events-none"
          style="-moz-appearance: textfield"
        />
        <span class="text-sm text-gray-800 whitespace-nowrap">page</span>
      </div>
      <!-- End Go To Page -->
    </div>
  </div>
  <!-- End Pagination Wrapper -->
</template>
