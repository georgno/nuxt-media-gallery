<script setup lang="ts">
import { useMediaStore } from '~/stores/media';

 defineProps({
   media: {
     type: Object,
     required: true,
     default: () => ({
       id: 0,
       title: '',
       description: '',
       type: '',
       path: '',
       alt: '',
     })
   }})

  const mh = mediaHandler();

  const mediaStore = useMediaStore();

  const handleEditClick = (media) => {
    router.push({
      path: `/medias/update/${media.id}`,
    });
  }

  const handleDeleteClick = (media) => {
    console.log(media);
    mh.deleteItem(media.id);
    mediaStore.deleteMedia(media.id);
  }

 const router = useRouter();

 const cardAction = (media) => {
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
        <div class="text-subtitle2">{{ media.alt }}</div>
      </div>
    </q-img>

    <q-card-actions align="right">
      <q-btn flat icon="edit" @click.stop="handleEditClick(media)" :class="$q.dark.isActive ? 'text-black' : 'text-white'"/>
      <q-btn flat icon="delete" @click.stop="handleDeleteClick(media)" :class="$q.dark.isActive ? 'text-black' : 'text-white'"/>
    </q-card-actions>
  </q-card>
</template>