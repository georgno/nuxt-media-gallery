<script setup lang="ts">

const route = useRoute()

// When accessing /posts/1, route.params.id will be 1
console.log(route.params.id)

// get the media from the store
const mediaStore = useMediaStore();
const media = ref<{ id: number; title: string; alt: string; path: string; longitude: number; latitude: number; } | null | undefined>(null);

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



</script>

<template>
  <div>
    <NuxtLayout name="default-with-footer-content">
        <template #content>
          <div>
            <div class="flex align-middle pb-3">
              <div class="flex flex-1">
                <h1 class="ps-4 text-2xl">View Media</h1>
              </div>
              <div class="flex">
                <UButton color="red" icon="i-heroicons-trash" iconPosition="left" class="mb-3">Delete</UButton>
              </div>
            </div>

            <div class="flex">
              <MediaImage v-if="media" :media="media"></MediaImage>
            </div>
              <div class="ps-6">
                <h1 class="text-3xl">{{ media?.title || 'Loading...' }}</h1>
                <p>Media ID: {{ route.params.id }}</p>
                <h2 class="text-sm text-gray-500">{{ media?.subtitle || 'Loading...' }}</h2>
                <small>longitude: {{ media?.longitude }}</small><br>
                <small>latitude: {{ media?.latitude }}</small>
              </div>
          </div>
        </template>
        <template #footer>
          <UButton slot="footer" color="gray" variant="ghost" to="/" icon="i-heroicons-arrow-left" iconPosition="left" class="mb-3">Back</UButton>
        </template>
    </NuxtLayout>
  </div>
</template>

<style scoped>

</style>