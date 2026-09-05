export default function useDefault() {
  const isBookSessionModalOpen = ref(false)
  const isMenuModalOpen = ref(false)

  function openBookSessionModal() {
    isBookSessionModalOpen.value = true
  }

  function closeBookSessionModal() {
    isBookSessionModalOpen.value = false
  }

  return {
    isBookSessionModalOpen,
    isMenuModalOpen,
    openBookSessionModal,
    closeBookSessionModal
  }
}