<script setup lang="ts">
import { X } from 'lucide-vue-next'
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
        <div class="flex justify-between items-center py-3 px-4 border-b border-gray-200">
          <h3 id="hs-basic-modal-label" class="font-bold text-gray-800">Modal title</h3>
          <button
            type="button"
            class="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Close"
            data-hs-overlay="#hs-basic-modal"
          >
            <span class="sr-only">Close</span>
            <X />
          </button>
        </div>
        <div class="p-4 overflow-y-auto">
          <!-- Card -->
          <div class="p-4 relative z-10">
            <form>
              <div class="mb-4 sm:mb-8">
                <label for="hs-feedback-post-comment-name-1" class="block mb-2 text-sm font-medium"
                  >Full name</label
                >
                <input
                  type="text"
                  id="hs-feedback-post-comment-name-1"
                  class="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Full name"
                />
              </div>

              <div class="mb-4 sm:mb-8">
                <label for="hs-feedback-post-comment-email-1" class="block mb-2 text-sm font-medium"
                  >Email address</label
                >
                <input
                  type="email"
                  id="hs-feedback-post-comment-email-1"
                  class="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                  placeholder="Email address"
                />
              </div>

              <div>
                <label
                  for="hs-feedback-post-comment-textarea-1"
                  class="block mb-2 text-sm font-medium"
                  >Comment</label
                >
                <div class="mt-1">
                  <textarea
                    id="hs-feedback-post-comment-textarea-1"
                    name="hs-feedback-post-comment-textarea-1"
                    rows="3"
                    class="py-2.5 sm:py-3 px-4 block w-full border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                    placeholder="Leave your comment here..."
                  ></textarea>
                </div>
              </div>

              <div class="mt-6 grid">
                <button
                  type="submit"
                  class="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <!-- End Card -->
        </div>
        <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 focus:outline-hidden focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
            data-hs-overlay="#hs-basic-modal"
          >
            Close
          </button>
          <button
            type="button"
            class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
