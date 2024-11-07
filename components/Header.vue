<script setup lang="ts">

const links = [[
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    badge: 1
  }], [{
  label: 'Add',
  icon: 'i-heroicons-plus',
  click: () => {
    console.log('Add clicked')
  }
}]]
</script>

<template>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

<style scoped>

</style>