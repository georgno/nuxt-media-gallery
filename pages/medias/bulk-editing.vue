<script setup lang="ts">

const route = useRoute()

const counter = useState('counter', () => Math.round(Math.random() * 1000))

</script>


<template>
    <div>
      <h1>Bulk Editing</h1>

      <div>
        Counter: {{ counter }}
        <button @click="counter++">
          +
        </button>
        <button @click="counter--">
          -
        </button>
      </div>
    </div>
</template>

<style scoped>

</style>