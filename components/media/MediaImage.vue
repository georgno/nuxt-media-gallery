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
  <div class="bg-amber-50 rounded-lg">
    <NuxtImg :src="media.path" placeholder class="aspect-1 object-cover rounded-lg"/>
  </div>
</template>

<style scoped>

</style>