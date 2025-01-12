<script setup lang="ts">
import { useSlideoverStore } from '~/stores/slideover';
import { useMediaStore } from '~/stores/media';
import { computed } from 'vue';

const slideoverStore = useSlideoverStore()
const mediaStore = useMediaStore()

const links = computed(() => {
  const currentMedia = mediaStore.getCurrentMedia

  return [[
    {
      label: '',
      icon: 'i-heroicons-bars-3',
      click: () => {
        slideoverStore.toggle()
      }
    },
    {
      label: currentMedia?.title || 'Media Gallery',
      to: 'medias/' + currentMedia?.id ? undefined : '/',
      active: currentMedia ? true : false
    }
  ], [{
    label: 'Add',
    icon: 'i-heroicons-plus',
    click: () => {
      console.log('Add clicked')
    }
  }]]
})
</script>

<template>
  <div class="sticky top-0 z-10 bg-white dark:bg-gray-900">
    <UHorizontalNavigation :links="links" class="border-b px-4 border-gray-200 dark:border-gray-800"></UHorizontalNavigation>
  </div>
</template>

<style scoped>

</style>