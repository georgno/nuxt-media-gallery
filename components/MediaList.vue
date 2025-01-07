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
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <MediaCard v-for="item in medias" :key="item.id" :media="item" />
  </div>
</template>

<style scoped>
</style>