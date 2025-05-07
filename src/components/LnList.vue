<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';

const book = ref<string[]>([]);

axios.get('http://127.0.0.1:8000/api/api/books')
  .then(response => {
    console.log(response.data);
    book.value = response.data.lol || [];
  })
  .catch(error => {
    console.error('API error:', error);
  });

function addBook() {
  book.value.push('BG3');
}
</script>

<template>
  <button @click="addBook" type="button">Click Me!</button>
  <p>hello-world</p>
  <div v-for="(item, index) in book" :key="index">
    {{ item }}
  </div>
</template>
