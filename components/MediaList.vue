<script setup lang="ts">
import MediaCard from "~/components/MediaCard.vue";

interface Media {
  id: number
  type: string
  path: string
  alt: string
}

const mh = mediaHandler();

const medias = await mh.getAllMedias();

</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <MediaCard v-for="item in medias" :key="item.id" :media="item" />
  </div>
</template>

<style scoped>
</style>