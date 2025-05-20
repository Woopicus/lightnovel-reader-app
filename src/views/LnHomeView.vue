<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const book = ref<string[]>([]);
const model = defineModel()
function addBook() {
  const newItem = 'BG3';

  axios.post('http://127.0.0.1:8000/api/lightnovels', {
    name: 'Min',
    price: '3',
    description: 'kat',
    //: model.value,
  })
  .then(response => {
    console.log('POST response:', response.data);
    book.value.push(newItem);
  })
  .catch(error => {
    console.error('POST error:', error);
  });
}
</script>

<template>
  <button @click="addBook" type="button">Click Me!</button>
  <input v-model="model" />{{model}}
</template>

