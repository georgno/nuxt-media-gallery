<script setup lang="ts">
import MediaCard from "~/components/MediaCard.vue";

const mediaStore = useMediaStore();

await mediaStore.fetchMedias();

const medias = computed(() => {
  console.log('Media items:', mediaStore.items);
  return mediaStore.items.filter(item => item && item.id);
});

</script>

<template>
  <div :class="medias.length ? 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3' : 'flex items-center justify-center h-full'">    <MediaCard v-for="item in medias" :key="item.id" :media="item" />

    <div v-if="!medias.length" class="text-center font-bold text-gray-300 dark:text-gray-500" style="font-size: 1.2rem">
      No media yet. <br>
      Maybe you should add some? :-)
    </div>
  </div>
</template>

<style scoped>
</style>