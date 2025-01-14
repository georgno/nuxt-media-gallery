import { defineStore } from 'pinia'
import { ref } from 'vue'  // Make sure to import ref

export const useSlideoverStore = defineStore('slideover', () => {
  const isOpen = ref(false)

  function toggle() {
    isOpen.value = !isOpen.value
    console.log('Slideover toggled:', isOpen.value) // Add this for debugging
  }

  return {
    isOpen,
    toggle
  }
})