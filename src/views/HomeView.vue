<script setup lang="ts">
import { SignInButton } from '@clerk/vue'
</script>

<template>
  <div class="absolute top-0 -z-10 h-full w-full bg-white">
    <div
      class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] translate-x-[10%] translate-y-[50%] md:-translate-x-[35%] md:translate-y-[100%] lg:-translate-x-[30%] lg:translate-y-[20%] rounded-full bg-[#16a08483] opacity-50 blur-[80px] -z-10"
    ></div>

    <div
      class="mx-auto flex flex-col lg:flex-row h-full w-9/12 items-center justify-center lg:justify-between px-4"
    >
      <div class="flex lg:w-1/2 flex-col items-center justify-center">
        <h1
          class="text-6xl md:text-8xl font-extrabold text-[#16a084] text-center uppercase tracking-wider"
        >
          Welcome
        </h1>
        <p class="text-[#16a084] text-lg md:text-2xl font-semibold">To the English Word Manager</p>
        <div class="text-center mt-2">
          <p class="text-base md:text-lg text-gray-500">
            This is a simple web application that helps you learn and manage English words.
            <br />
            You can add, edit, delete, and practice words in a fun and interactive way.
          </p>

          <SignInButton mode="modal">
            <div class="text-lg text-gray-500 mt-5">
              <button
                type="button"
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-[#16a084] text-white hover:bg-teal-600 focus:outline-hidden focus:bg-[#16a084] disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                Try Now
              </button>
            </div>
          </SignInButton>
        </div>
      </div>
      <div class="flex md:w-1/2 flex-col items-center justify-center">
        <img src="@/assets/wordWelcome.webp" alt="wordWelcome" class="lg:size-8/12 z-40" />
      </div>
    </div>
  </div>
</template>
