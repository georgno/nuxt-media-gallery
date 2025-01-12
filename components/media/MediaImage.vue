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
  <div class="bg-amber-50 rounded-lg w-full">
    <NuxtImg
      :src="media.path"
      loading="lazy"
      format="webp"
      class="w-full h-full object-cover"
      placeholder
    />
  </div>
</template>

<style scoped>

</style>