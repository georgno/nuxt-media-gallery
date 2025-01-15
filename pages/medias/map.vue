<script setup lang="ts">
import { ref, onMounted } from 'vue';

const map = ref(null) as any;
let L: any = null;

// Create locations data (20 locations around Nantes)
const locations = [
  { name: 'Nantes', lat: 47.218371, lng: -1.553621 },
  { name: 'Saint-Nazaire', lat: 47.273018, lng: -2.213733 },
  { name: 'La Baule', lat: 47.286835, lng: -2.393108 },
  { name: 'Pornic', lat: 47.112, lng: -2.102 },
  { name: 'Guérande', lat: 47.328, lng: -2.429 },
  { name: 'Clisson', lat: 47.087, lng: -1.276 },
  { name: 'Ancenis', lat: 47.366, lng: -1.176 },
  { name: 'Châteaubriant', lat: 47.716, lng: -1.376 },
  { name: 'Redon', lat: 47.652, lng: -2.084 },
  { name: 'Pontchâteau', lat: 47.433, lng: -2.117 },
  { name: 'Savenay', lat: 47.327, lng: -1.952 },
  { name: 'Rezé', lat: 47.183, lng: -1.55 },
  { name: 'Vertou', lat: 47.166, lng: -1.466 },
  { name: 'Carquefou', lat: 47.283, lng: -1.5 },
  { name: 'Orvault', lat: 47.283, lng: -1.633 },
  { name: 'Saint-Herblain', lat: 47.216, lng: -1.65 },
  { name: 'Sainte-Luce-sur-Loire', lat: 47.233, lng: -1.483 },
  { name: 'Bouguenais', lat: 47.183, lng: -1.583 },
  { name: 'Saint-Sébastien-sur-Loire', lat: 47.183, lng: -1.483 },
  { name: 'Basse-Goulaine', lat: 47.2, lng: -1.483 }
];

onMounted(async () => {
  try {
    // Dynamically import Leaflet only on client side
    L = (await import('leaflet')).default;
    console.log(L);
  } catch (error) {
    console.error('Error initializing map:', error);
  }
});

const onMapReady = () => {
  console.log('Map is ready');
  if (!map.value?.leafletObject) {
    console.warn('Map leaflet object not ready');
    return;
  }
  
  useLMarkerCluster({
    leafletObject: map.value.leafletObject,
    markers: locations
  });
}

definePageMeta({
  layout: false
})
</script>

<template>
    <div class="relative w-full h-full">
      <NuxtLayout name="default-with-footer-content">
        <template #content>
          <ClientOnly>
            <LMap
                ref="map"
                :zoom="6"
                :max-zoom="18"
                :center="[47.21322, -1.559482]"
                :use-global-leaflet="true"
                @ready="onMapReady"
                style="height: 90vh"
                class="absolute inset-0 z-0 top-12 overflow-clip"
            >
              <LTileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                  layer-type="base"
                  name="OpenStreetMap"
              />
            </LMap>
          </ClientOnly>
        </template>
        <template #footer>
          <UButton slot="footer" color="gray" variant="ghost" to="/" icon="i-heroicons-arrow-left" iconPosition="left" class="mb-3 relative z-10">Back</UButton>
        </template>
      </NuxtLayout>
    </div>
</template>
