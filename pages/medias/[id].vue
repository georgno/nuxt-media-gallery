<script setup lang="ts">

import type {Media} from "~/composables/mediaHandler";

const route = useRoute()

const mediaStore = useMediaStore();
const media = ref<Media | null>(null);

onMounted(async () => {
  const id = route.params.id as string;
  media.value = mediaStore.getMedia(Number(id));
  mediaStore.setCurrentMedia(media.value || null);
  console.log(media.value);
})

// Clean up when leaving the page
onUnmounted(() => {
  mediaStore.setCurrentMedia(null);
})

definePageMeta({
  layout: false
})

let buttons = [
  {
    label: 'Delete',
    icon: 'i-heroicons-trash',
    click: () => {
      handleDeleteClick(media);
    }
  }
]

const deleteDialog = ref(false);
const mediaToDelete = ref<Media | null>(null);

const handleDeleteClick = (media: Ref<Media | null>) => {
  if (media.value) {
    mediaToDelete.value = media.value;
    deleteDialog.value = true;
  }
};

</script>

<template>
  <div>
    <NuxtLayout name="default-with-footer-content" :buttons="buttons">
        <template #content>
          <div>
            <MediaImage v-if="media" :media="media"></MediaImage>
            <DeleteMediaModal v-model="deleteDialog" :media-to-delete="mediaToDelete" />
          </div>
        </template>
        <template #footer>
          <UButton slot="footer" color="gray" variant="ghost" @click="$router.back()" icon="i-heroicons-arrow-left" iconPosition="left" class="mb-3">Back</UButton>
        </template>
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>