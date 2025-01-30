<script setup lang="ts">

import {useSlideoverStore} from "~/stores/slideover";

const slideoverStore = useSlideoverStore()


const menuList = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/'
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog',
    to: '/settings'
  }
]
</script>

<template>
  <div>
    <USlideover v-model="slideoverStore.isOpen" side="left" :width="200">
      <div class="p-4">
        <h1 class="pb-3 text-xl">Medias</h1>
        <UVerticalNavigation :links="menuList" />
      </div>
    </USlideover>
  </div>
</template>

<style scoped>

</style>