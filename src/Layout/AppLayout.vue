<script setup lang="ts">
import AppTopbar from './AppTopbar.vue'
import Announcement from '../components/AnnouncementBanner.vue'
import WordModal from '@/components/WordModal.vue'
</script>

<template>
  <div class="min-h-screen">
    <announcement
      mesagge="Esta app usa claves de desarrollo de Clerk, lo que implica limitaciones de seguridad, autenticación y rendimiento."
    />
    <app-topbar />

    <main class="max-w-[70rem] 2xl:max-w-[85rem] w-full mx-auto px-3 py-3 lg:py-6 lg:px-0">
      <router-view />
      <WordModal />
    </main>
  </div>
</template>
