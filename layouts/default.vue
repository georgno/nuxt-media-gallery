<template>
  <div>
    <q-layout view="hHh Lpr lff" class="shadow-2 rounded-borders">
      <q-header elevated :class="$q.dark.isActive ? 'bg-secondary' : 'bg-black'">
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title></q-toolbar-title>
          <q-btn flat round dense :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'" @click="$q.dark.toggle()" />
        </q-toolbar>
      </q-header>
      <q-drawer
          v-model="drawer"
          :width="200"
          :breakpoint="500"
          overlay
          bordered
          :class="$q.dark.isActive ? 'bg-gray-50' : 'bg-black'"
      >
        <q-scroll-area class="fit">
          <q-list>

            <template v-for="(menuItem, index) in menuList" :key="index">
              <q-item 
                clickable 
                :to="menuItem.to"
                :active="$route.path === menuItem.to" 
                v-ripple
              >
                <q-item-section avatar :class="$q.dark.isActive ? 'text-black' : 'text-white'">
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section :class="$q.dark.isActive ? 'text-black' : 'text-white'">
                  {{ menuItem.label }}
                </q-item-section>
              </q-item>
              <q-separator :key="'sep' + index" v-if="menuItem.separator" />
            </template>

          </q-list>
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <q-page padding class="px-5 py-4">
        <slot />
      </q-page>
    </q-page-container>
    </q-layout>
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { ref } from 'vue'
const $q = useQuasar()
const drawer = ref(false)
$q.dark.toggle()
watch(() => $q.dark.isActive, val => {
  console.log(val ? 'On dark mode' : 'On light mode')
})

const menuList = [
  {
    icon: 'home',
    label: 'Home',
    separator: true,
    to: '/'
  },
  {
    icon: 'map',
    label: 'Map',
    separator: true,
    to: 'medias/map'
  }
]

const mediaStore = useMediaStore()

onMounted(async () => {
  await mediaStore.initializeMedia()
})

</script>