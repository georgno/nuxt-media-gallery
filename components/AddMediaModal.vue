<script setup lang="ts">
import { useModalsStore } from '~/stores/modals'
import { useMediaStore } from '~/stores/media'
import { onUnmounted } from 'vue'

const modalsStore = useModalsStore()
const mediaStore = useMediaStore()
const mh = mediaHandler()

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

const uploaderRef = ref<HTMLInputElement | null>(null)
const previewUrl = ref('')

const modalConfig = {
  preventClose: false,
  closeOnEscape: true,
  container: 'body',
  onClose: () => closeDialog()
}

function onFilesSelected(event: InputEvent | Event) {
  const target = event?.target as HTMLInputElement | null;
  
  let files = target?.files;
  
  if (!files && uploaderRef.value) {
    files = uploaderRef.value.files;
  }

  if (!files || files.length === 0) {
    console.log('No files found');
    return;
  }

  const file = files[0];
  media.value.file = file;
  previewUrl.value = URL.createObjectURL(file);
}

async function addMedia() {
  try {
    if (!uploaderRef.value?.files?.length) {
      console.error('No file selected');
      return;
    }

    if (!name.value) {
      const fileName = media.value.file?.name || '';
      name.value = fileName.split('.').slice(0, -1).join('.') || fileName;
    }

    media.value.title = name.value;
    media.value.subtitle = subtitle.value;

    let uploadResponse = await mh.create({
      ...media.value,
      longitude: 0,
      latitude: 0,
      created_at: new Date().toISOString()
    });
    
    mediaStore.addMedia({
      id: uploadResponse.id,
      title: uploadResponse.title,
      subtitle: uploadResponse.subtitle,
      path: uploadResponse.path,
      longitude: 0,
      latitude: 0,
      created_at: new Date().toISOString()
    });
    
    closeDialog();
  } catch (error) {
    console.error('Error adding media:', error);
  }
}

function closeDialog() {
  modalsStore.create = false
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = ''
  }
  
  // Reset form
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
}
</script>

<template>
  <UModal 
    v-model="modalsStore.create"
    v-bind="modalConfig"
  >
    <div class="p-4 space-y-4" @click.stop>
      <UCard>
        <template #header>
          <h3 class="text-xl font-medium">Add Media</h3>
        </template>

        <UFormGroup label="Title">
          <UInput
              v-model="name"
              placeholder="Type something"
              :ui="{ wrapper: 'mb-4' }"
          />
        </UFormGroup>

        <UFormGroup label="Subtitle">
          <UInput
              v-model="subtitle"
              placeholder="Type something"
              :ui="{ wrapper: 'mb-4' }"
          />
        </UFormGroup>

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
</template> 