// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/leaflet'
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://garden2.test:8212',
    }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  components: [{
    path: '~/components',
    pathPrefix: false
  }],
  leaflet: {
    markerCluster: true
  }
})