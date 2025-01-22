<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const slideoverStore = useSlideoverStore()
slideoverStore.setupRouteWatcher()
</script>