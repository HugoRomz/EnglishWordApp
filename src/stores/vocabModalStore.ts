//STORE: vocabModalStore.ts
import type { Database } from '@/types/database.types'
import { defineStore } from 'pinia'

export type Word = Database['public']['Tables']['vocabularies']['Row']
export type modalMode = 'single' | 'bulk' | 'edit'

interface HSOverlayType {
  open(modalEl: HTMLElement): void
  close(modalEl: HTMLElement): void
}
declare const HSOverlay: HSOverlayType

export const useVocabModalStore = defineStore('vocabModal', {
  state: () => ({
    isModalOpen: false,
    modalMode: 'single' as modalMode,
    editingWord: null as Word | null,
    words: [] as Word[],
  }),
  actions: {
    openSingle() {
      this.modalMode = 'single'
      this.editingWord = null
      this.isModalOpen = true
      this.openDOMModal()
    },

    openBulk() {
      this.modalMode = 'bulk'
      this.editingWord = null
      this.isModalOpen = true
      this.openDOMModal()
    },

    openEdit(word: Word) {
      this.modalMode = 'edit'
      this.editingWord = { ...word }
      this.isModalOpen = true
      this.openDOMModal()
    },

    closeModal() {
      this.isModalOpen = false
      this.modalMode = 'single'
      this.editingWord = null
      this.closeDOMModal()
    },

    openDOMModal() {
      const modalEl = document.getElementById('hs-basic-modal')
      if (modalEl && typeof HSOverlay !== 'undefined') {
        HSOverlay.open(modalEl)
      }
    },

    closeDOMModal() {
      const modalEl = document.getElementById('hs-basic-modal')
      if (modalEl && typeof HSOverlay !== 'undefined') {
        HSOverlay.close(modalEl)
      }
    },
  },
})
