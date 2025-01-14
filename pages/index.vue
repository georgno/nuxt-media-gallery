<script setup lang="ts">
import MediaList from '@/components/MediaList.vue';
import { useModalsStore } from '~/stores/modals'

definePageMeta({
  key: 'home',
  keepalive: true,
})

const modalsStore = useModalsStore()

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

const uploaderRef = ref<HTMLInputElement | null>(null)
const previewUrl = ref('')

function onFilesSelected(event: InputEvent | Event) {
  console.log('onFilesSelected')
  const target = event?.target as HTMLInputElement | null;
  
  // Try to get files from UInput's native event
  let files = target?.files;
  
  // If no files found, try to get them from the input ref directly
  if (!files && uploaderRef.value) {
    files = uploaderRef.value.files;
  }

  if (!files || files.length === 0) {
    console.log('No files found');
    return;
  }

  const file = files[0];
  console.log('File selected:', file);
  media.value.file = file;
  media.value.title = name.value;
  media.value.subtitle = subtitle.value;
  
  // Create and set preview URL
  previewUrl.value = URL.createObjectURL(file);
  console.log('Preview URL:', previewUrl.value);
}

async function addMedia() {
  try {
    if (!uploaderRef.value?.files?.length) {
      console.error('No file selected');
      return;
    }

    let uploadResponse = await mh.create(media.value);
    mediaStore.addMedia({
      id: uploadResponse.id,
      title: uploadResponse.title,
      subtitle: uploadResponse.subtitle,
      path: uploadResponse.path,
      longitude: 0,
      latitude: 0,
      created_at: new Date().toISOString()
    });
    
    modalsStore.create = false;
    
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
      uploaderRef.value.value = '';
    }
  } catch (error) {
    console.error('Error adding media:', error);
  }
}

function openDialog() {
  modalsStore.create = true
}

function closeDialog() {
  modalsStore.create = false
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }
}
</script>

<template>
  <div>
    <UModal v-model="modalsStore.create">
      <div class="p-4 space-y-4">
        <UCard>
          <template #header>
            <h3 class="text-xl font-medium">Add Media</h3>
          </template>

          <UFormGroup label="Title" required>
            <UInput
                v-model="name"
                placeholder="Type something"
                :ui="{ wrapper: 'mb-4' }"
                required
            />
          </UFormGroup>

          <UFormGroup label="Subtitle">
            <UInput
                v-model="subtitle"
                placeholder="Type something"
                :ui="{ wrapper: 'mb-4' }"
            />
          </UFormGroup>

          <UCheckbox
              v-model="right"
              label="Add geo location"
              :ui="{ wrapper: 'mb-4' }"
          />

          <UFormGroup label="Upload Images">
            <input
              ref="uploaderRef"
              type="file"
              accept=".jpg, image/*"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              @change="onFilesSelected"
            />
          </UFormGroup>

          <img 
            :src="previewUrl" 
            v-if="previewUrl" 
            class="mt-4 max-w-full h-auto max-h-[100px] rounded-lg"
          >
          <p v-else class="mt-4 text-gray-500">No image...</p>

          <template #footer>
            <div class="flex justify-end gap-3">
              <UButton
                  color="gray"
                  variant="solid"
                  @click="closeDialog"
              >
                Close
              </UButton>
              <UButton
                  color="primary"
                  variant="solid"
                  @click="addMedia"
              >
                Upload
              </UButton>
            </div>
          </template>
        </UCard>
      </div>
    </UModal>

    <MediaList />
  </div>
</template>

<style scoped>
</style>