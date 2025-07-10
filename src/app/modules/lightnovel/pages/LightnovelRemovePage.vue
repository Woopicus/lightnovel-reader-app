<template>
  <div>
    <button @click="deleteLightnovel(novel.id)">delete</button>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const lightnovels = ref([])

function deleteLightnovel() {
  axios.delete(`http://127.0.0.1:8000/api/lightnovels/${id}`)
    .then(() => {
      lightnovels.value = lightnovels.value.filter()
    })
    .catch(error => {
      console.error('API error:', error)
    })
}
</script>

