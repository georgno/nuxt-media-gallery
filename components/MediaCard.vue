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

const items = [
    [{
      label: props.media.title,
      disabled: true
    }

    ],
  [{
    label: 'Edit',
    icon: 'i-heroicons-pencil-square-20-solid',
    shortcuts: ['Ctrl', 'E'],
    click: () => handleEditClick(props.media)
  }, {
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

const deleteDialog = ref(false);
const mediaToDelete = ref<Media | null>(null);

const handleDeleteClick = (media: Media) => {
  mediaToDelete.value = media;
  deleteDialog.value = true;
};

const cardAction = (media: Media) => {
  router.push({
    path: `/medias/${media.id.toString()}`,
  });
};
</script>

<template>
  <UCard
      class="my-card"
      @click="cardAction(media)"
      :ui="{
      base: 'overflow-hidden',
      background: 'bg-white dark:bg-gray-900'
    }"
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

    <DeleteMediaModal v-model="deleteDialog" :media-to-delete="mediaToDelete" />
  </UCard>
</template>