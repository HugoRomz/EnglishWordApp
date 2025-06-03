<script setup lang="ts">
import ConfirmModal from '@/components/modals/ConfirmModal.vue'
import { useConfirmModalStore } from '@/stores/confirmModalStore'

const confirmModal = useConfirmModalStore()

const handleDeleteClick = () => {
  confirmModal.open({
    title: 'Confirmar eliminación',
    message: '¿Estás seguro de que quieres eliminar este elemento?',
    confirmText: 'Sí, eliminar',
    cancelText: 'Cancelar',
    onConfirm: () => {
      // Aquí irá la lógica de eliminación
      console.log('Elemento eliminado')
    },
  })
}
</script>

<template>
  <div class="p-4">
    <button
      @click="handleDeleteClick"
      class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-red-500 text-red-500 hover:bg-red-50"
    >
      Probar Modal de Confirmación
    </button>

    <ConfirmModal
      :title="confirmModal.title"
      :message="confirmModal.message"
      :confirm-text="confirmModal.confirmText"
      :cancel-text="confirmModal.cancelText"
      @close="confirmModal.close"
      @confirm="confirmModal.confirm"
    />
  </div>
</template>
