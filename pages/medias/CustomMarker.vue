<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps<{
  path: string;
  size?: number;
  id: string | number;
}>();

const navigateToMedia = () => {
  router.push(`/medias/${props.id}`);
};
</script>

<template>
  <div class="marker-container" @click="navigateToMedia" role="button" tabindex="0">
    <div class="marker-pin">
      <img
          :src="path"
          :style="{ width: `${size || 40}px`, height: `${size || 40}px` }"
          class="rounded-full object-cover"
          alt="Location marker"
      />
    </div>
    <div class="marker-stem"></div>
  </div>
</template>

<style scoped>
.marker-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -100%);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.marker-container:hover {
  transform: translate(-50%, -100%) scale(1.05);
}

.marker-pin {
  background: white;
  border: 2px solid white;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
}

.marker-stem {
  width: 20px;
  height: 16px;
  background: transparent;
  margin-top: -1px;
  position: relative;
}

.marker-stem::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-left: 20px solid transparent;
  border-right: 20px solid transparent;
  border-top: 30px solid white;
}
</style>