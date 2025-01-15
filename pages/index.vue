<script setup lang="ts">
import MediaList from '@/components/MediaList.vue';
import { useModalsStore } from '~/stores/modals'

definePageMeta({
  key: 'home',
})

const modalsStore = useModalsStore()

function openDialog() {
  modalsStore.create = true
}
</script>

<template>
  <div class="h-full">
    <AddMediaModal />
    <MediaList />
    <UButton
        icon="i-heroicons-plus"
        size="xl"
        color="primary"
        square
        variant="solid"
        :ui="{ rounded: 'rounded-full' }"
        class="fixed bottom-4 right-4"
        @click="modalsStore.toggleCreate()"
        />
  </div>
</template>

<style scoped>
</style>