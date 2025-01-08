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
    <q-img
        :src="media.path"
        spinner-color="white"
        fit="cover"
    />
  </div>
</template>

<style scoped>

</style>