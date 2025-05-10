<script setup lang="ts">
import AppTopbar from './AppTopbar.vue'
import Announcement from '../components/AnnouncementBanner.vue'
</script>

<template>
  <div class="min-h-screen">
    <announcement />
    <app-topbar />

    <main class="max-w-[85rem] w-full mx-auto px-3 py-3 lg:py-6 lg:px-0">
      <router-view />
    </main>
  </div>
</template>
