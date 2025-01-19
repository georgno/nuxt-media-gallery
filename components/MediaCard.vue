<script setup lang="ts">
import { useMediaStore } from '~/stores/media';
import type { Media } from '~/composables/mediaHandler';

const props = defineProps({
  media: {
    type: Object as () => Media,
    required: true,
    default: () => ({
      id: 0,
      title: '',
      subtitle: '',
      path: '',
    })
  }
});

const mh = mediaHandler();
const mediaStore = useMediaStore();
const router = useRouter();

const editDialog = ref(false);
const editTitle = ref('');
const editSubtitle = ref('');

const deleteDialog = ref(false);
const mediaToDelete = ref<Media | null>(null);

const items = [
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['Ctrl', 'E'],
    click: () => handleEditClick(props.media)
  }], [{
    label: 'Delete',
    icon: 'i-heroicons-trash-20-solid',
    shortcuts: ['Ctrl', 'D'],
    click: () => handleDeleteClick(props.media)
  }
]]

defineShortcuts({
  meta_e: () => handleEditClick(props.media),
  meta_d: () => handleDeleteClick(props.media)
});

const handleEditClick = (media: Media) => {
  editTitle.value = media.title;
  editSubtitle.value = media.subtitle;
  editDialog.value = true;
};

const handleUpdateMedia = async (media: Media) => {
  console.log(media);

  console.log('updating media with id', media.id);

  try {
    let apiResponse = await mh.updateInfo(media.id, {
      title: editTitle.value,
      subtitle: editSubtitle.value,
      id: media.id
    });

    console.log(apiResponse);

    let data = {
      ...media,
      title: editTitle.value,
      subtitle: editSubtitle.value,
    };

    console.log(data);

    mediaStore.updateMedia(data);

    editDialog.value = false;
  } catch (error) {
    console.error('Error updating media:', error);
  }
};

const handleDeleteClick = (media: Media) => {
  mediaToDelete.value = media;
  deleteDialog.value = true;
};

const handleConfirmDelete = async () => {
  if (!mediaToDelete.value) return;
  
  try {
    await mh.deleteItem(String(mediaToDelete.value.id));
    mediaStore.deleteMedia(mediaToDelete.value.id);
    deleteDialog.value = false;
  } catch (error) {
    console.error('Error deleting media:', error);
  }
};

const cardAction = (media: Media) => {
  router.push({
    path: `/medias/${media.id}`,
  });
};
</script>

<template>
  <UCard 
    class="my-card" 
    @click="cardAction(media)"
    :ui="{ base: 'overflow-hidden', background: $colorMode.value === 'dark' ? 'bg-gray-900' : 'bg-white' }"
  >
    <div class="flex">
        <div class="content-center aspect-square w-20">
          <NuxtImg
              :src="media.path"
              :alt="media.title"
              width="100"
              height="100"
              fit="cover" />
        </div>

      <!-- Content section -->
      <div class="flex-grow p-4">
        <h5 class="text-xl font-bold">{{ media.title }}</h5>
        <p class="text-lg">{{ media.subtitle }}</p>
        <p>{{ media.created_at }}</p>
      </div>

      <!-- Actions section -->
      <div class="flex items-center justify-center px-2">
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }" @click.stop>
          <UButton icon="i-heroicons-ellipsis-vertical" variant="ghost" />
        </UDropdown>
      </div>
    </div>

    <!-- Edit Dialog -->
    <UModal v-model="editDialog">
      <UCard>
        <template #header>
          <h3 class="text-xl font-bold">Edit Media</h3>
        </template>

        <div class="space-y-4">
          <UFormGroup label="Title" required>
            <UInput
              v-model="editTitle"
              placeholder="Enter title"
              :rules="[{ required: true, message: 'Title is required' }]"
            />
          </UFormGroup>

          <UFormGroup label="Subtitle">
            <UInput
              v-model="editSubtitle"
              placeholder="Enter subtitle"
            />
          </UFormGroup>
        </div>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton 
              icon="i-heroicons-trash" 
              color="red" 
              variant="ghost" 
              @click="handleDeleteClick(media)"
            />
            <UButton 
              label="Update" 
              color="primary" 
              @click="handleUpdateMedia(media)"
            />
            <UButton 
              label="Close" 
              variant="ghost" 
              @click="editDialog = false"
            />
          </div>
        </template>
      </UCard>
    </UModal>

    <!-- Delete Dialog -->
    <UModal v-model="deleteDialog">
      <UCard>
        <template #header>
          <h3 class="text-xl font-bold">Confirm Delete</h3>
        </template>

        <p>Are you sure you want to delete "{{ mediaToDelete?.title }}"?</p>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton 
              label="Cancel" 
              variant="ghost" 
              @click="deleteDialog = false"
            />
            <UButton 
              label="Delete" 
              color="red" 
              @click="handleConfirmDelete"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </UCard>
</template>