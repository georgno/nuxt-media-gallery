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
          <h1 class="ps-4 text-3xl">Edit Media</h1>
        </div>
        <div class="flex">
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

      <UFormGroup label="Title" required>
        <UInput placeholder="my funny dog" />
      </UFormGroup>

      <UFormGroup label="Description" class="pt-3">
        <UTextarea placeholder="This is a funny dog" />
      </UFormGroup>
    </div>
</template>

<style scoped>

</style>