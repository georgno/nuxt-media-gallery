<script setup lang="ts">
import { useMediaStore } from '~/stores/media';
import type { Media } from '~/composables/mediaHandler';

defineProps({
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

const handleEditClick = (media: Media) => {
  editTitle.value = media.title;
  editSubtitle.value = media.subtitle;
  editDialog.value = true;
};

const handleUpdateMedia = async (media: Media) => {
  try {
    await mh.updateInfo(media.id, {
      title: editTitle.value,
      subtitle: editSubtitle.value,
      id: media.id
    });

    mediaStore.updateMedia({
      ...media,
      title: editTitle.value,
      subtitle: editSubtitle.value,
    });

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
  <q-card class="my-card" @click="cardAction(media)" :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-white'">
    <q-img :src="media.path" style="height: 250px;" position="top">
      <div class="absolute-bottom">
        <div class="text-h6">{{ media.title }}</div>
        <div class="text-subtitle2">{{ media.subtitle }}</div>
      </div>
    </q-img>

    <q-card-actions align="right">
      <q-btn flat icon="edit" @click.stop="handleEditClick(media)" 
        :class="$q.dark.isActive ? 'text-white' : 'text-black'" />
      <q-btn flat icon="delete" @click.stop="handleDeleteClick(media)"
        :class="$q.dark.isActive ? 'text-white' : 'text-black'" />
    </q-card-actions>

    <q-dialog v-model="editDialog" :backdrop-filter="'sepia(80%) blur(3px)'" style="color: black">
      <q-card>
        <q-card-section class="row items-center q-pb-none text-h6">
          Edit Media
        </q-card-section>

        <q-card-section>
          <q-input filled v-model="editTitle" label="Title *" hint="Type something" lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type something']" class="pb-10" />

          <q-input filled v-model="editSubtitle" label="Subtitle" hint="Type something" class="pb-10" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Update" color="primary" @click="handleUpdateMedia(media)" style="font-weight: bold" />
          <q-btn flat label="Close" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialog" :backdrop-filter="'sepia(80%) blur(3px)'" style="color: black">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Confirm Delete</div>
        </q-card-section>

        <q-card-section>
          Are you sure you want to delete "{{ mediaToDelete?.title }}"?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="handleConfirmDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>