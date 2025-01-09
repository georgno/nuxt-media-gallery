import {defineStore} from 'pinia'
import type {Media} from '~/composables/mediaHandler'

export const useMediaStore = defineStore('media', {
  state: () => ({
    items: [] as Media[],
    loading: false
  }),
  actions: {
    async initializeMedia() {
      if (this.loading || Object.keys(this.items).length > 0) return
      
      this.loading = true
      try {
        await this.fetchMedias()

      } catch (error) {
        console.error('Failed to initialize media:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchMedias() {
      const mh = mediaHandler()
      this.items = await mh.getAllMedias()
    },
    addMedia(media: Media) {
      this.items.push(media)
    },
    deleteMedia(id: number) {
        this.items = this.items.filter(item => item.id !== id);
    },
    getMedia(id: number) {
      console.log('all items', this.items)
      console.log('getMedia', id)
      return this.items.find(item => item.id === id)
    },
    updateMedia(media: Media) {
      this.items = this.items.map(m => 
        m.id === media.id ? media : m
      );
    }
  }
})
