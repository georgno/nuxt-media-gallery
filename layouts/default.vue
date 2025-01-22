<template>
  <div>
    <div class="h-screen flex flex-col">
      <Header :show-add-button=true />
      <main class="p-4 flex-grow">
        <slot />
      </main>

      <footer>
        <div class="p-4">
        </div>
      </footer>
    </div>
    <Sidebar />
  </div>
</template>

<script setup lang="ts">
import { useSlideoverStore } from '~/stores/slideover'
import { useRoute } from 'vue-router'

const route = useRoute()
const slideoverStore = useSlideoverStore()

watch(() => route.path, () => {
  slideoverStore.close()
})

defineShortcuts({
  o: () => slideoverStore.toggle()
})

const mediaStore = useMediaStore()

onMounted(async () => {
  await mediaStore.initializeMedia()
})
</script>