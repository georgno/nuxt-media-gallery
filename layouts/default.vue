<template>
  <div>
    <div class="h-screen flex flex-col">
      <Header/>
      <main class="p-4 flex-grow">
        <slot />
      </main>

      <footer>
        <div class="p-4">
        </div>
      </footer>
      <USlideover v-model="slideoverStore.isOpen" side="left" :width="140">
        <div class="p-4">
          <h1 class="pb-3 text-xl">Media Gallery</h1>
          <UVerticalNavigation :links="menuList" />
        </div>
      </USlideover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSlideoverStore } from '~/stores/slideover'

const slideoverStore = useSlideoverStore()

defineShortcuts({
  o: () => slideoverStore.toggle()
})

const mediaStore = useMediaStore()

const menuList = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog',
    to: '/settings'
  }
]

onMounted(async () => {
  await mediaStore.initializeMedia()
})
</script>