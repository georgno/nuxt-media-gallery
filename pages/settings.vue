<script setup lang="ts">
const colorMode = useColorMode()

// Create a computed property to handle the color mode binding
const isDarkMode = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <UCard>
      <template #header>
        <h3 class="text-xl font-medium">Settings</h3>
      </template>

      <div class="space-y-4">
        <div class="flex items-center justify-between py-2">
          <div>
            <div class="font-medium">Dark Mode</div>
            <div class="text-sm text-gray-500 dark:text-gray-400">Toggle dark mode appearance</div>
          </div>
          <UCheckbox size="xl" v-model="isDarkMode" />
        </div>
      </div>
    </UCard>
  </div>
</template>

<style scoped>

</style>