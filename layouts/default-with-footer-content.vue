<template>
  <div>
    <div class="min-h-screen">
      <Header>
        <template #left>
          <UButton icon="i-heroicons-bars-3" variant="ghost" @click="slideoverStore.toggle()" />
        </template>
        <template #right>
        </template>
      </Header>

      <main class="p-4 pb-24">
        <slot name="content"/>
      </main>

      <footer class="border-t fixed bottom-0 w-full bg-white dark:bg-gray-900">
        <div class="p-4">
          <slot name="footer" />
        </div>
      </footer>

      <USlideover v-model="slideoverStore.isOpen" side="left" :width="200">
        <div class="p-4">
          <h1 class="pb-3 text-xl">Medias</h1>
          <UVerticalNavigation :links="menuList" />
        </div>
      </USlideover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlideoverStore } from '~/stores/slideover'
import { useMediaStore } from '~/stores/media'

const slideoverStore = useSlideoverStore()
const mediaStore = useMediaStore()

const menuList = [
  {
    icon: 'i-heroicons-home',
    label: 'Home',
    to: '/'
  },
  {
    icon: 'i-heroicons-map',
    label: 'Map',
    to: 'medias/map'
  }
]

defineShortcuts({
  o: () => slideoverStore.toggle()
})

// Only initialize if not already initialized
if (!mediaStore.isInitialized) {
  mediaStore.initializeMedia().catch(error => {
    console.error('Failed to initialize media store:', error)
  })
}
</script>