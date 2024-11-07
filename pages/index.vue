<script setup lang="ts">
import Header from '@/components/Header.vue';
import MediaList from '@/components/MediaList.vue';

</script>

<template>
  <div>
    <Header/>
    <MediaList />
    <UModal v-model="isAddModalOpen">
      <UFormGroup label="Email" required>
        <UInput placeholder="you@example.com" icon="i-heroicons-envelope" />
      </UFormGroup>
    </UModal>
  </div>
</template>

<style scoped>
</style>