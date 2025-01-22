<script setup lang="ts">
import { useSlideoverStore } from '~/stores/slideover';
import { useMediaStore } from '~/stores/media';
import { useModalsStore } from '~/stores/modals';
import { computed } from 'vue';

const slideoverStore = useSlideoverStore();
const mediaStore = useMediaStore();
const modalsStore = useModalsStore();

const props = defineProps<{
  buttons?: Array<{
    label: string;
    icon: string;
    click: () => void;
  }>;
}>();

const links = computed(() => {
  const currentMedia = mediaStore.getCurrentMedia;

  let menuItems = [[
    {
      label: '',
      icon: 'i-heroicons-bars-3',
      click: () => {
        slideoverStore.toggle();
      }
    },
    {
      label: currentMedia?.title || 'Media Gallery',
      to: currentMedia ? currentMedia?.id : '/',
      active: currentMedia ? true : false
    }
  ]];

  if (props.buttons && props.buttons.length > 0) {
    menuItems.push(props.buttons);
  }

  return menuItems;
});
</script>

<template>
  <div class="sticky top-0 z-10 bg-white dark:bg-gray-900">
    <UHorizontalNavigation :links="links" class="border-b px-4 border-gray-200 dark:border-gray-800"></UHorizontalNavigation>
  </div>
</template>

<style scoped>
</style>
