<script setup lang="ts">
import MediaList from '@/components/MediaList.vue';

definePageMeta({
  key: 'home',
  keepalive: true,
})

const dialog = ref(false)

const mh = mediaHandler();

const mediaStore = useMediaStore();


let publicNuxtPath = '/test.jpg';

async function addMedia() {
  try {
    const nextKey = await mh.getNextKey();
    let media = await mh.create({
      id: nextKey,
      title: 'test-name',
      alt: 'test-file',
      path: publicNuxtPath
    });

    mediaStore.addMedia(media);

  } catch (error) {
    console.error('Error adding media:', error);
  }
}

function openDialog() {
  dialog.value = true
}

</script>

<template>
  <div>
    <q-dialog v-model="dialog" :backdrop-filter="'sepia(80%) blur(3px)'" style="color: black">
      <q-card>
        <q-card-section class="row items-center q-pb-none text-h6">
          Add Media
        </q-card-section>

        <q-card-section>

          <q-input
              filled
              v-model="name"
              label="Title *"
              hint="Type something"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              class="pb-10"
          />

          <q-input
              filled
              v-model="subtitle"
              label="Subtitle"
              hint="Type something"
              class="pb-10"
          />

          <q-checkbox v-model="right" label="add geo location" class="pb-10" />

          <q-uploader
              class="mx-2"
              url="localStorage solution here"
              label="Restricted to images"
              multiple
              accept=".jpg, image/*"
              @rejected="onRejected"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Upload" color="primary" @click="addMedia" style="font-weight: bold" />
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <MediaList />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" class="bg-primary text-white" @click="openDialog" />
    </q-page-sticky>
  </div>
</template>

<style scoped>
</style>