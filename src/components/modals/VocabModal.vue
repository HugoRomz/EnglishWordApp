<script setup lang="ts">
import { X } from 'lucide-vue-next'

defineProps<{
  title: string
}>()

const emit = defineEmits(['close', 'save'])

const onClose = () => emit('close')
const onSave = () => emit('save')
</script>

<template>
  <div
    id="hs-basic-modal"
    class="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 hidden size-full fixed top-0 start-0 z-80 opacity-0 overflow-x-hidden transition-all overflow-y-auto pointer-events-none"
    role="dialog"
    tabindex="-1"
    aria-labelledby="hs-basic-modal-label"
    aria-modal="true"
  >
    <div class="sm:max-w-lg sm:w-full m-3 sm:mx-auto">
      <div
        class="flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto"
      >
        <!-- HEADER -->
        <div class="flex justify-between items-center py-3 px-4 border-b border-gray-200">
          <h3 id="hs-basic-modal-label" class="font-bold text-gray-800">{{ title }}</h3>
          <button
            type="button"
            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent text-gray-500 hover:text-black hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            aria-label="Close"
            @click="onClose"
          >
            <span class="sr-only">Close</span>
            <X class="size-5" />
          </button>
        </div>

        <!-- BODY -->
        <div class="overflow-y-auto">
          <div class="p-4 relative z-10">
            <slot />
          </div>
        </div>

        <!-- FOOTER -->
        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            @click="onClose"
          >
            Close
          </button>
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-primaryColor text-white hover:bg-primaryColor/90 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            @click="onSave"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
