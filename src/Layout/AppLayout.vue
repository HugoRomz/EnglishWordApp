<script setup lang="ts">
import AppNavbar from './AppNavbar.vue'
import AppTopbar from './AppTopbar.vue'
</script>

<template>
  <div class="min-h-screen">
    <app-topbar />
    <app-navbar />

    <main class="max-w-[85rem] w-full mx-auto px-3 py-3 lg:py-6 lg:px-0">
      <router-view />
    </main>
  </div>
</template>
