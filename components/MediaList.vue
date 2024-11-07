<script setup lang="ts">

import MediaCard from "~/components/MediaCard.vue";

const items = [
  {
    'id': 1,
    'title': 'First item',
    'description': 'This is the first item',
    'image': 'https://picsum.photos/1'
  },
]

</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 m-4">
    <MediaCard v-for="item in items" :key="item.id" :media="item" />
  </div>
</template>

<style scoped>

</style>