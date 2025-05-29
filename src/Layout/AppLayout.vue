<script setup lang="ts">
import AppTopbar from './AppTopbar.vue'
import Announcement from '../components/AnnouncementBanner.vue'
import FAB from '@/components/FAB.vue'
import VocabModal from '@/components/modals/VocabModal.vue'
import { useVocabModalStore } from '@/stores/vocabModalStore'

const vocabModal = useVocabModalStore()
</script>

<template>
  <div class="min-h-screen">
    <announcement
      mesagge="Esta app usa claves de desarrollo de Clerk, lo que implica limitaciones de seguridad, autenticación y rendimiento."
    />
    <app-topbar />

    <main class="max-w-[70rem] 2xl:max-w-[85rem] w-full mx-auto px-3 py-3 lg:py-6 lg:px-0">
      <router-view />

      <VocabModal
        :title="vocabModal.modalMode === 'edit' ? 'Editar palabra' : 'Agregar palabra'"
        @close="vocabModal.closeModal"
        @save="console.log('Guardar aún no implementado')"
      />
      <FAB />
    </main>
  </div>
</template>
