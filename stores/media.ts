import { defineStore } from 'pinia'
import type { Media } from '~/composables/mediaHandler'

export const useMediaStore = defineStore('media', {
  state: () => ({
    items: [] as Media[]
  }),
  actions: {
    async fetchMedias() {
      const mh = mediaHandler()
      const medias = await mh.getAllMedias()
      this.items = medias
    },
    addMedia(media: Media) {
      this.items.push(media)
    },
    deleteMedia(id: number) {
        this.items = this.items.filter(item => item.id !== id);
    }
  }
})
