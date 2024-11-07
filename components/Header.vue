<script setup lang="ts">
const store = useModalsStore();

const leftMenu = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
    badge: 1
  },
  {
    label: 'Bulk',
    icon: 'i-heroicons-table-cells',
    to: '/medias/bulk-editing'
  }];

const rightMenu = [{
  label: 'Add',
  icon: 'i-heroicons-plus',
  click: () => {
    store.create = true;
  }
}];

const links = [leftMenu, rightMenu]

const state = reactive({
  file: undefined,
  name: undefined,
})

const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.file) errors.push({ path: 'file', message: 'Required' })
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  return errors
}

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
}


</script>

<template>
  <UModal v-model="store.create" class="h-48">
    <UForm :validate="validate" :state="state" class="space-y-4" @submit="onSubmit">
      <div class="p-4">
        <h1 class="text-xl font-bold mb-3">Create Media</h1>
        <UFormGroup label="Image" name="Image" required>
          <UInput type="file" size="sm" icon="i-heroicons-folder" v-model="state.file" />
        </UFormGroup>
        <UFormGroup label="Name" name="Name" required class="mt-3">
          <UInput placeholder="Name" v-model="state.name" />
        </UFormGroup>
        <UFormGroup label="Description" class="mt-3">
          <UTextarea placeholder="Description" />
        </UFormGroup>
        <UButton block type="submit" color="primary" label="Create" class="mt-3" icon="i-heroicons-plus" />
      </div>
    </UForm>
  </UModal>
  <UHorizontalNavigation :links="links" class="border-b border-gray-200 dark:border-gray-800" />
</template>

<style scoped>

</style>