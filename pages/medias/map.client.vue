<script setup lang="ts">
import { onMounted, ref, watchEffect } from 'vue';
import CustomMarker from "~/pages/medias/CustomMarker.vue";

import {
  MglMap,
  MglMarker
} from '@indoorequal/vue-maplibre-gl';
import {LngLat} from "maplibre-gl";


const mediaStore = useMediaStore();

await mediaStore.fetchMedias();

function DMS2Decimal(degrees = 0, minutes = 0, seconds = 0, direction = 'N') {
  const directions = ['N', 'S', 'E', 'W'];
  if(!directions.includes(direction.toUpperCase())) return 0;
  if(!Number(minutes) || minutes < 0 || minutes > 59) return 0;
  if(!Number(seconds) || seconds < 0 || seconds > 59) return  0;
  if(!Number(degrees) || degrees < 0 || degrees > 180) return 0;

  let decimal = degrees + (minutes / 60) + (seconds / 3600);
  if (direction.toUpperCase() === 'S' || direction.toUpperCase() === 'W') decimal *= -1;
  return decimal;
}

interface Location {
  lat: number;
  lng: number;
  path: string;
  id: number;
}

const locations = ref<Location[]>([{ lat: 1, lng: 1, path: '', id: 0 }]);
const startPoint = ref([12.550343, 55.665957]);

onMounted(() => {
  const items = mediaStore.items.filter((item) => item.longitude && item.latitude);

  console.log(items);

  function parseDMSCoordinates(coordinates: number) {
    let splitted = coordinates.toString().split(' ');
    let direction = splitted[0];
    let degrees = parseFloat(splitted[1].split('°')[0]);
    let minutes = parseFloat(splitted[2].split('\'')[0]);
    let seconds = parseFloat(splitted[3].split('\"')[0]);
    return {direction, degrees, minutes, seconds};
  }

  if (items.length > 0) {
    let {direction, degrees, minutes, seconds} = parseDMSCoordinates(items[0].latitude);
    const lat = DMS2Decimal(degrees, minutes, seconds, direction);

    ({direction, degrees, minutes, seconds} = parseDMSCoordinates(items[0].longitude));
    const lng = DMS2Decimal(degrees, minutes, seconds, direction);

    startPoint.value = [lng, lat];
    locations.value = items.map((item) => {
      let {direction, degrees, minutes, seconds} = parseDMSCoordinates(item.latitude);
      const lat = DMS2Decimal(degrees, minutes, seconds, direction);

      ({direction, degrees, minutes, seconds} = parseDMSCoordinates(item.longitude));
      const lng = DMS2Decimal(degrees, minutes, seconds, direction);

      console.log(item)

      return {
        lat,
        lng,
        path: item.path,
        id: item.id,
      };
    });
  } else {
    startPoint.value = [12.550343, 55.665957];
    locations.value = [
      {
        lat: 55.665957,
        lng: 12.550343,
        path: '/placeholder.jpg',
        id: 0
      }
    ];
  }
});

const config = useRuntimeConfig()
let styleKey = config.public.mapTileApiKey;
const style = 'https://api.maptiler.com/maps/streets-v2/style.json?key=' + styleKey;
const center = startPoint as LngLat;
const zoom = 10;

definePageMeta({
  layout: false
})
</script>

<template>
  <div class="relative w-full h-full">
    <NuxtLayout name="default-with-footer-content-map">
      <template #content>
        <mgl-map
            :map-style="style"
            :center="center"
            :zoom="zoom"
            height="90vh"
        >
          <mgl-marker
              v-for="(location, index) in locations"
              :key="index"
              :coordinates="[location.lng, location.lat]"
          >
            <template v-slot:marker>
              <CustomMarker
                  :path="location.path"
                  :size="40"
                  :id="location.id"
              />
            </template>
          </mgl-marker>
        </mgl-map>
      </template>
      <template #footer>
        <UButton slot="footer" color="gray" variant="ghost" @click="$router.back()" icon="i-heroicons-arrow-left" iconPosition="left" class="mb-3">Back</UButton>
      </template>
    </NuxtLayout>
  </div>
</template>