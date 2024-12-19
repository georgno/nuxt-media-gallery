<script setup lang="ts">
import MediaCard from "~/components/MediaCard.vue";

interface Media {
  id: number
  type: string
  path: string
  alt: string
}

const mh = mediaHandler();

console.log(mh);

</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
    <MediaCard v-for="item in mh" :key="item.id" :media="item" />
  </div>
</template>

<style scoped>
</style>