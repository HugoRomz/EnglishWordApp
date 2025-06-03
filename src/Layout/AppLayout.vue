<script setup lang="ts">
import { ref } from 'vue'
import { inject } from 'vue'

import AppTopbar from './AppTopbar.vue'
import Announcement from '../components/AnnouncementBanner.vue'
import FAB from '@/components/FAB.vue'
import VocabModal from '@/components/modals/VocabModal.vue'
import WordForm from '@/components/WordForm.vue'
import ConfirmModal from '@/components/modals/ConfirmModal.vue'

import { useVocabModalStore, type FormPayload } from '@/stores/vocabModalStore'
import { useVocabStore } from '@/stores/vocabStore'
import { useVocabularies } from '@/composables/useVocabularies'
import { useConfirmModalStore } from '@/stores/confirmModalStore'

const vocabModal = useVocabModalStore()
const vocabStore = useVocabStore()
const confirmModal = useConfirmModalStore()
const { createVocabulary, createBulk, updateVocabulary } = useVocabularies()

const formRef = ref()

interface Toast {
  open: (options: { message: string; type: 'success' | 'error' | 'warning' | 'info' }) => void
}

const toast = inject<Toast>('toast')

// Cuando el modal emite save, llamamos al handleSave del formulario
const handleModalSave = () => {
  if (formRef.value) {
    formRef.value.handleSave()
  }
}

const handleFormSave = async (payload: FormPayload) => {
  let response = null
  try {
    if (payload.mode === 'bulk') {
      response = await createBulk(payload.data)
      toast?.open({
        message: `${payload.data.length} palabras guardadas correctamente`,
        type: 'success',
      })
    } else if (payload.mode === 'edit' && payload.data.id) {
      response = await updateVocabulary(payload.data.id, payload.data)
      toast?.open({
        message: 'Palabra actualizada correctamente',
        type: 'success',
      })
    } else {
      response = await createVocabulary(payload.data)
      toast?.open({
        message: 'Palabra agregada correctamente',
        type: 'success',
      })
    }

    if (response?.error) {
      toast?.open({
        message: response.error.message,
        type: 'error',
      })
      return
    }
    await vocabStore.loadWords()

    vocabModal.closeModal()
  } catch (error) {
    console.error('Error saving:', error)
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
      <ConfirmModal
        :title="confirmModal.title"
        :message="confirmModal.message"
        :confirm-text="confirmModal.confirmText"
        :cancel-text="confirmModal.cancelText"
        @close="confirmModal.close"
        @confirm="confirmModal.confirm"
      />
      <FAB />
    </main>
  </div>
</template>
