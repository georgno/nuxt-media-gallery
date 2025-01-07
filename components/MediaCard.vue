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

  const mh = mediaHandler();

  const handleEditClick = (media) => {
    router.push({
      path: `/medias/update/${media.id}`,
    });
  }

  const handleDeleteClick = (media) => {
    console.log(media);
    mh.deleteItem(media.id);
  }

 const router = useRouter();

 const cardAction = (media) => {
   router.push({
     path: `/medias/${media.id}`,
   });
 };

</script>

<template>
  <UCard @click="cardAction(media)">

    <div class="flex">
      <div class="flex flex-row w-40">
          <MediaImage :media="media"></MediaImage>
      </div>
      <div class="flex flex-1 flex-col justify-between">
        <div class="ps-3">
          <h1 class="text-2xl">{{ media.title }}</h1>
          <h2 class="text-sm text-gray-500">{{ media.alt }}</h2>
        </div>

          <div class="flex justify-end">
            <UButton
                icon="i-heroicons-pencil-square"
                size="sm"
                color="primary"
                variant="solid"
                label="Edit"
                :trailing="false"
                @click.stop="handleEditClick(media)"
                class="me-2"
            />
            <UButton
                icon="i-heroicons-trash"
                size="sm"
                color="red"
                variant="outline"
                label="Delete"
                :trailing="false"
                @click.stop="handleDeleteClick(media)"
            />
          </div>
      </div>
    </div>

  </UCard>
</template>



<style scoped>

</style>