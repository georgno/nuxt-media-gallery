import {defineStore} from 'pinia'
import type {Media} from '~/composables/mediaHandler'

export const useMediaStore = defineStore('media', {
  state: () => ({
    medias: [] as Media[],
    currentMedia: null as Media | null,
    loading: false,
    isInitialized: false
  }),
  
  getters: {
    getCurrentMedia: (state) => state.currentMedia,
    items: (state) => state.medias,
  },
  
  actions: {
    setCurrentMedia(media: Media | null) {
      this.currentMedia = media
    },
    async initializeMedia() {
      if (this.loading || this.medias.length > 0) return
      
      this.loading = true
      try {
        await this.fetchMedias()
        this.isInitialized = true
      } catch (error) {
        console.error('Failed to initialize media:', error)
      } finally {
        this.loading = false
      }
    },
    async fetchMedias() {
      const mh = mediaHandler()
      this.medias = await mh.getAllMedias()
    },
    addMedia(media: Media) {
      this.medias.push(media)
    },
    deleteMedia(id: number) {
        this.medias = this.medias.filter(item => item.id !== id);
    },
    getMedia(id: number) {
      return this.medias.find(item => item.id === id)
    },
    updateMedia(media: Media) {
      this.medias = this.medias.map(m => 
        m.id === media.id ? media : m
      );
    }
  }
})
