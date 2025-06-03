<script setup lang="ts">
import { TriangleAlert } from 'lucide-vue-next'

const emit = defineEmits(['close', 'confirm'])

defineProps<{
  title: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

const onClose = () => emit('close')
const onConfirm = () => emit('confirm')
</script>

<template>
  <div
    id="hs-danger-alert"
    class="hs-overlay hidden size-full fixed top-0 start-0 z-80 overflow-x-hidden overflow-y-auto"
    role="dialog"
    tabindex="-1"
    aria-modal="true"
    aria-labelledby="hs-danger-alert-label"
  >
    <div
      class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all md:max-w-lg md:w-full m-3 md:mx-auto"
    >
      <div
        class="relative flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl overflow-hidden"
      >
        <div class="p-4 overflow-y-auto">
          <div class="flex gap-x-4 md:gap-x-7">
            <!-- Icon -->
            <span
              class="shrink-0 inline-flex justify-center items-center size-14 rounded-full border-4 border-red-50 bg-red-100 text-red-500"
            >
              <TriangleAlert class="shrink-0 size-5" />
            </span>
            <!-- End Icon -->

            <div class="grow">
              <h3 id="hs-danger-alert-label" class="text-lg font-bold text-gray-800">
                {{ title }}
              </h3>
              <p class="text-gray-500">
                {{ message }}
              </p>
            </div>
          </div>
        </div>

        <div
          class="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t border-gray-200"
        >
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50 cursor-pointer"
            @click="onClose"
          >
            {{ cancelText || 'Cancel' }}
          </button>
          <button
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
            @click="onConfirm"
          >
            {{ confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
