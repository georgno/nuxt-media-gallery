<script setup lang="ts">
import Header from '~/components/Header.vue';
</script>

<template>
  <div>
    <Header />
    <div class="mx-3">
      <slot />
    </div>
  </div>
</template>

<style scoped>
</style>