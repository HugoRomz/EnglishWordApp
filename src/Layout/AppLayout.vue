<script setup lang="ts">
import AppTopbar from './AppTopbar.vue'
import Announcement from '../components/AnnouncementBanner.vue'
import FAB from '@/components/FAB.vue'
import VocabModal from '@/components/modals/VocabModal.vue'
import { useVocabModalStore, type modalMode, type Word } from '@/stores/vocabModalStore'
import WordForm from '@/components/WordForm.vue'
import { ref } from 'vue'

const vocabModal = useVocabModalStore()

const formRef = ref()

// Cuando el modal emite save, llamamos al handleSave del formulario
const handleModalSave = () => {
  if (formRef.value) {
    formRef.value.handleSave()
  }
}

const handleFormSave = async (payload: { mode: modalMode; data: Word }) => {
  try {
    if (payload.mode === 'bulk') {
      console.log('Bulk save not implemented yet:', payload.data)

      // await createBulk(payload.data)
    } else if (payload.mode === 'edit') {
      // await updateVocabulary(payload.data.id, payload.data)
      console.log('Edit save not implemented yet:', payload.data)
    } else {
      // await createVocabulary(payload.data)
      console.log('Single save not implemented yet:', payload.data)
    }

    // Recargar datos
    // await store.loadWords()
    // Cerrar modal
    vocabModal.closeModal()
  } catch (error) {
    console.error('Error saving:', error)
    // Aquí puedes manejar errores
  }
}
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
        @save="handleModalSave"
      >
        <WordForm
          ref="formRef"
          :mode="vocabModal.modalMode"
          :word="vocabModal.editingWord"
          @save="handleFormSave"
        />
      </VocabModal>
      <FAB />
    </main>
  </div>
</template>
