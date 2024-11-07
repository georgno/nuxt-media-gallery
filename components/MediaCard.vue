<script setup lang="ts">
 defineProps({
   media: {
     type: Object,
     required: true,
     default: () => ({
       id: 0,
       title: '',
       description: '',
       image: ''
     })
   }})
</script>

<template>
  <UCard>
    <template #header>
      <h1>{{ media.title }}</h1>
    </template>

    <img :src="media.image" :alt="media.title" class="w-full h-48 object-cover" />

    <template #footer>
      <div class="flex justify-end">
        <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="primary"
            variant="solid"
            label="Edit"
            :trailing="false"
            :class="['mr-2']"
        />
        <UButton
            icon="i-heroicons-trash"
            size="sm"
            color="red"
            variant="outline"
            label="Delete"
            :trailing="false"
        />
      </div>
    </template>
  </UCard>
</template>



<style scoped>

</style>