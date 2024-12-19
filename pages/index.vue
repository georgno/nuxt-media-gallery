<script setup lang="ts">
import MediaList from '@/components/MediaList.vue';

definePageMeta({
  key: 'home',
  keepalive: true,
})

const store = useModalsStore();

let randomGreeting = '';

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
  <div>
<!--    <h1 class="text-5xl font-bold mt-3 mb-6" v-text="randomGreeting"></h1>-->
    <MediaList />
  </div>
</template>

<style scoped>
</style>