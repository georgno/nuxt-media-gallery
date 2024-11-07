<script setup lang="ts">
import Header from '@/components/Header.vue';
import MediaList from '@/components/MediaList.vue';

const store = useModalsStore();

let randomGreeting = '';

// based on the current time, we will display a different greeting
const currentTime = new Date().getHours();
if (currentTime < 12) {
  randomGreeting = 'Good morning! 😊';
} else if (currentTime < 18) {
  randomGreeting = 'Good afternoon 🥱';
} else {
  randomGreeting = 'Good evening 🌙';
}



</script>

<template>
  <DefaultLayout>
    <h1 class="text-5xl font-bold mt-3 mb-6" v-text="randomGreeting"></h1>
    <MediaList />
  </DefaultLayout>
</template>

<style scoped>
</style>