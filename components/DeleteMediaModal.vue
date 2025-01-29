<script setup lang="ts">
import type { Media } from "~/composables/mediaHandler";
import { useMediaStore } from "~/stores/media";

const router = useRouter()


const props = defineProps<{
  modelValue: boolean,
  mediaToDelete: Media | null
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>();

const mh = mediaHandler();
const mediaStore = useMediaStore();

const handleConfirmDelete = async () => {
  if (!props.mediaToDelete) return;

  try {
    await mh.deleteItem(String(props.mediaToDelete.id));
    mediaStore.deleteMedia(props.mediaToDelete.id);
    emit('update:modelValue', false);
    router.push('/');
  } catch (error) {
    console.error('Error deleting media:', error);
  }
};
</script>

<template>
  <UModal
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
  >
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
              @click="emit('update:modelValue', false)"
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
</template>