<script setup lang="ts">
import { useMediaStore } from '~/stores/media';
import { Media } from '~/composables/mediaHandler';

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

// New refs for edit dialog
const editDialog = ref(false);
const editTitle = ref('');
const editSubtitle = ref('');

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

    // Update store with new values
    mediaStore.updateMedia({
      ...media,
      title: editTitle.value,
      subtitle: editSubtitle.value,
    });

    // Close dialog
    editDialog.value = false;
  } catch (error) {
    console.error('Error updating media:', error);
  }
};

const handleDeleteClick = (media: Media) => {
  console.log(media);
  mh.deleteItem(media.id);
  mediaStore.deleteMedia(media.id);
};

const cardAction = (media: Media) => {
  router.push({
    path: `/medias/${media.id}`,
  });
};
</script>

<template>
  <q-card class="my-card" @click="cardAction(media)" :class="$q.dark.isActive ? 'bg-white' : 'bg-grey-9'">
    <q-img :src="media.path" style="height: 250px;" position="top">
      <div class="absolute-bottom">
        <div class="text-h6">{{ media.title }}</div>
        <div class="text-subtitle2">{{ media.subtitle }}</div>
      </div>
    </q-img>

    <q-card-actions align="right">
      <q-btn flat icon="edit" @click.stop="handleEditClick(media)" :class="$q.dark.isActive ? 'text-black' : 'text-white'" />
      <q-btn flat icon="delete" @click.stop="handleDeleteClick(media)"
        :class="$q.dark.isActive ? 'text-black' : 'text-white'" />
    </q-card-actions>

    <!-- New Edit Dialog -->
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
  </q-card>
</template>