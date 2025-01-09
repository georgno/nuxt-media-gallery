<script setup lang="ts">
import MediaList from '@/components/MediaList.vue';

definePageMeta({
  key: 'home',
  keepalive: true,
})

const dialog = ref(false)
const name = ref('')
const subtitle = ref('')
const right = ref(false)
const media = ref({
  id: 0,
  title: '',
  subtitle: '',
  path: '',
  file: null as File | null
})

const mh = mediaHandler();

const mediaStore = useMediaStore();


let publicNuxtPath = '/test.jpg';

const uploaderRef = ref(null)

async function onFilesSelected(files: File[]) {
  if (!files.length) return;
  
  const firstFile = files[0];
  media.value = {
    ...media.value,
    file: firstFile,
    title: name.value,
    subtitle: subtitle.value
  };
}

async function addMedia() {
  try {
    if (!uploaderRef.value?.files?.length) {
      console.error('No file selected');
      return;
    }

    const files = uploaderRef.value.files;
    await onFilesSelected(files);

    let uploadResponse = await mh.create(media.value);
    mediaStore.addMedia({
      id: uploadResponse.id,
      title: uploadResponse.title,
      subtitle: uploadResponse.subtitle,
      path: uploadResponse.path,
    });
    
    dialog.value = false;
    
    name.value = '';
    subtitle.value = '';
    media.value = {
      id: 0,
      title: '',
      subtitle: '',
      path: '',
      file: null
    };
    
    if (uploaderRef.value) {
      uploaderRef.value.reset();
    }
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

          <q-uploader
              ref="uploaderRef"
              class="mx-2"
              label="Upload Image"
              accept=".jpg, image/*"
              @rejected="onRejected"
              style="max-width: 100%"
              :auto-upload="false"
              hide-upload-btn
              @added="onFilesSelected"
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