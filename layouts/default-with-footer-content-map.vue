<template>
  <div>
    <div class="min-h-screen">
      <Header :buttons="buttons" />

      <main class="">
        <slot name="content"/>
      </main>

      <footer class="border-t fixed bottom-0 w-full bg-white dark:bg-gray-900">
        <div class="p-4">
          <slot name="footer" />
        </div>
      </footer>

      <Sidebar />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMediaStore } from '~/stores/media'
import Sidebar from "~/components/Sidebar.vue";


const mediaStore = useMediaStore()

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