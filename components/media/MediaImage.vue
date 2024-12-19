<script setup lang="ts">
defineProps({
  media: {
    type: Object,
    required: true,
    default: () => ({
      id: 0,
      title: '',
      description: '',
      type: '',
      path: '',
      alt: '',
    })
  }})
</script>

<template>
  <div class="flex-1">
    <img :src="`http://garden2.test:8212${media.path}`" :alt="media.id" class="w-full aspect-1 object-cover rounded-md" />
    <i class="i-heroicons-image text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
  </div>
</template>

<style scoped>

</style>