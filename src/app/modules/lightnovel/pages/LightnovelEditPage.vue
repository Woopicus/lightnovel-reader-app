<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="6" class="pa-6">
          <v-card-title class="text-h5">Update Lightnovel</v-card-title>

          <v-card-title class="text-h5">
            <v-spacer />
            <v-btn color="secondary" :to="{ name: 'lightnovel-overview-page' }" variant="outlined">
              Back to Home
            </v-btn>
          </v-card-title>

          <v-form ref="formRef" v-model="formValid" validate-on="input" @submit.prevent="submit">
            <v-text-field
              v-model="name"
              label="Name"
              :rules="[rules.required(), rules.lettersOnly()]"
              class="mt-4"
            ></v-text-field>

            <v-text-field
              v-model="price"
              label="Price"
              type="number"
              :rules="[rules.required(), rules.minValue(0), rules.numberOnly()]"
              class="mt-4"
            ></v-text-field>

            <v-text-field
              v-model="description"
              label="Description"
              :rules="[rules.required(), rules.lettersOnly()]"
              class="mt-4"
            ></v-text-field>

            <v-text-field
              v-model="genre"
              label="Genre"
              :rules="[rules.required(), rules.lettersOnly()]"
              class="mt-4"
            ></v-text-field>

            <v-btn
              color="primary"
              class="mt-6"
              @click="submit"
              :disabled="!formValid"
            >
              Update
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
import { useRoute } from 'vue-router'

const name = ref('')
const price = ref(0)
const description = ref('')
const genre = ref('')
const formRef = ref()
const route = useRoute()
const lightnovelId = Number(route.params.id)

const rules = {
  required: (msg = 'This field needs to be filled in') => {
    return (value: string | number) => !!value || msg
  },
  lettersOnly: () => {
    return (value: string) =>
      /^[a-zA-Z\s]+$/.test(value) || 'Only letters and spaces allowed'
  },
  numberOnly: () => {
    return (value: string | number) =>
      /^\d+(\.\d+)?$/.test(String(value)) || 'Only numbers allowed'
  },
  minValue: (min: number) => {
    return (value: number) => value >= min || `Must be at least ${min}`
  }
}

function getLightnovel() {
  axios.get(`http://127.0.0.1:8000/api/lightnovels/${lightnovelId}`)
    .then(response => {
      const data = response.data.data
      name.value = data.name
      price.value = data.price
      description.value = data.description
      genre.value = data.genre
    })
    .catch(error => {
      console.error('GET error:', error)
    })
}

async function submit() {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  axios.put(`http://127.0.0.1:8000/api/lightnovels/${lightnovelId}`, {
    name: name.value,
    price: price.value,
    description: description.value,
    genre: genre.value
  })
    .then(() => {
    })
    .catch(error => {
      console.error('Update failed:', error)
    })
}
</script>
