import { defineStore } from 'pinia'
import type { DefineStoreOptions } from 'pinia'
import { useRouter } from 'vue-router'

interface SlideoverState {
  isOpen: boolean
}

type StoreOptions = Omit<DefineStoreOptions<
    'slideover',
    SlideoverState,
    {},
    {
      toggle(): void
      close(): void
      open(): void
      setupRouteWatcher(): void
    }
>, 'id'>

export const useSlideoverStore = defineStore('slideover', {
  state: (): SlideoverState => ({
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
    },
    setupRouteWatcher() {
      const router = useRouter()
      router.afterEach(() => {
        this.close()
      })
    }
  }
} satisfies StoreOptions)