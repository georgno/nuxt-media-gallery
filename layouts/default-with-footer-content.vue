<template>
  <div>
    <div class="flex flex-col h-screen">
      <Header :buttons="buttons" />

      <main class="flex-grow overflow-auto">
        <slot name="content" />
      </main>

      <footer class="border-t w-full bg-white dark:bg-gray-900">
        <div class="p-4">
          <slot name="footer" />
        </div>
      </footer>
    </div>

    <Sidebar />
  </div>
</template>

<script setup lang="ts">
import { useSlideoverStore } from '~/stores/slideover'
import { useMediaStore } from '~/stores/media'

const slideoverStore = useSlideoverStore()
const mediaStore = useMediaStore()

defineShortcuts({
  o: () => slideoverStore.toggle()
})

if (!mediaStore.isInitialized) {
  mediaStore.initializeMedia().catch(error => {
    console.error('Failed to initialize media store:', error)
  })
}

const props = defineProps<{
  buttons?: Array<{
    label: string;
    icon: string;
    click: () => void;
  }>;
}>();
</script>