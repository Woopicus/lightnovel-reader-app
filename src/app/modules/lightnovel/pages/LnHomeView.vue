<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="6" class="pa-6">
          <v-card-title class="text-h5">Create Lightnovels</v-card-title>

          <v-form v-model="valid" lazy-validation>
            <v-text-field
              v-model="name"
              :counter="30"
              label="Name"
              :rules="nameRules"
              required
              class="mt-4"
            ></v-text-field>

            <v-text-field
              v-model="price"
              label="Price"
              type="number"
              :rules="priceRules"
              required
              class="mt-4"
            ></v-text-field>

            <v-text-field
              v-model="description"
              :counter="100"
              label="Description"
              :rules="descriptionRules"
              required
              class="mt-4"
            ></v-text-field>

            <v-btn
              color="primary"
              class="mt-6"
              @click="addLightnovel"
              :disabled="!valid"
            >
              Create
            </v-btn>

            <v-btn
              color="primary"
              class="mt-4"
              variant="outlined"
              :to="{ name: 'lnUpdate', params: { id: 1 } }"
            >
              Update page
            </v-btn>

            <v-alert
              v-if="successMessage"
              type="success"
              class="mt-4"
              closable
            >
              {{ successMessage }}
            </v-alert>

            <v-alert
              v-if="errorMessage"
              type="error"
              class="mt-4"
              closable
            >
              {{ errorMessage }}
            </v-alert>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const name = ref('')
const price = ref(0)
const description = ref('')

function addLightnovel() {
  axios.post('http://127.0.0.1:8000/api/lightnovels', {
    name: name.value,
    price: price.value,
    description: description.value
  })
    .then(response => {
      name.value = ''
      price.value = 0
      description.value = ''
    })
    .catch(error => {
      console.error('POST error:', error)
    });
}
</script>
