<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const book = ref<string[]>([]);
const model = defineModel()
function addBook() {
  const newItem = 'BG3';

  axios.post('http://127.0.0.1:8000/api/books', {
    item: newItem,
    worden: model.value,
  })
  .then(response => {
    console.log('POST response:', response.data);
    book.value.push(newItem); // Voeg lokaal toe als POST gelukt is
  })
  .catch(error => {
    console.error('POST error:', error);
  });
}
</script>

<template>
  <button @click="addBook" type="button">Click Me!</button>
  <label>worden</label>
  <input v-model="model" />{{model}}
</template>
