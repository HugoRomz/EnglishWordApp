// src/stores/confirmModalStore.ts
import { defineStore } from 'pinia'

interface HSOverlayType {
  open(modalEl: HTMLElement): void
  close(modalEl: HTMLElement): void
}
declare const HSOverlay: HSOverlayType

export const useConfirmModalStore = defineStore('confirmModal', {
  state: () => ({
    isOpen: false,
    title: '',
    message: '',
    confirmText: '',
    cancelText: '',
    callback: () => {},
  }),

  actions: {
    open(params: {
      title: string
      message: string
      confirmText?: string
      cancelText?: string
      onConfirm: () => void
    }) {
      this.title = params.title
      this.message = params.message
      this.confirmText = params.confirmText || 'Confirm'
      this.cancelText = params.cancelText || 'Cancel'
      this.callback = params.onConfirm
      this.isOpen = true
      this.openDOMModal()
    },

    close() {
      this.isOpen = false
      this.closeDOMModal()
    },

    confirm() {
      this.callback()
      this.close()
    },

    openDOMModal() {
      const modalEl = document.getElementById('hs-danger-alert')
      if (modalEl && typeof HSOverlay !== 'undefined') {
        HSOverlay.open(modalEl)
      }
    },

    closeDOMModal() {
      const modalEl = document.getElementById('hs-danger-alert')
      if (modalEl && typeof HSOverlay !== 'undefined') {
        HSOverlay.close(modalEl)
      }
    },
  },
})
