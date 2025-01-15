import { defineStore } from 'pinia'

export const useSlideoverStore = defineStore('slideover', {
  state: () => ({
    isOpen: false
  }),
  actions: {
    toggle() {
      this.isOpen = !this.isOpen
    },
    close() {
      this.isOpen = false
    },
    open() {
      this.isOpen = true
    }
  }
})