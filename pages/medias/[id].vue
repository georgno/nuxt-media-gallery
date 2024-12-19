<script setup lang="ts">

const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)

</script>


<template>
  <div>
    <div class="flex align-middle pb-3">
      <div class="flex flex-1">
        <UButton color="gray" variant="ghost" to="/" icon="i-heroicons-arrow-left" iconPosition="left" class="mb-3">Back</UButton>
        <h1 class="ps-4 text-3xl">View Media</h1>
      </div>
      <div class="flex">
        <UButton color="green" icon="i-heroicons-pencil-square" iconPosition="left" class="mb-3 me-3">Edit</UButton>
        <UButton color="red" icon="i-heroicons-trash" iconPosition="left" class="mb-3">Delete</UButton>
      </div>
    </div>

    <div class="flex">
      <div class="flex flex-row w-40">
        <MediaImage :media="media"></MediaImage>
      </div>
      <div class="flex flex-1 flex-col">
        <div class="">
          <h1 class="text-2xl">title</h1>
          <h2 class="text-sm text-gray-500">alt</h2>
        </div>
      </div>
    </div>

    <p>Media ID: {{ route.params.id }}</p>
  </div>
</template>

<style scoped>

</style>