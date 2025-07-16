<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="6" class="pa-6">
          <v-card-title class="text-h5">Create Lightnovels</v-card-title>

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

            <v-btn
              color="primary"
              class="mt-6"
              type="submit"
              :loading="loading"
              :disabled="!formValid"
            >
              Create
            </v-btn>

            <v-btn
              color="primary"
              class="mt-4"
              variant="outlined"
              :to="{ name: 'lightnovel-edit-page', params: { id: 6 } }"
            >
              Update page
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const rules = {
  required: (msg = 'This field needs to be filled in') => {
    return (value: string | number) => !!value || msg
  },
  minValue: (min: number) => {
    return (value: number) => value >= min || `Must be at least ${min}`
  },
  lettersOnly: () => {
    return (value: string) =>
      /^[a-zA-Z\s]+$/.test(value) || 'Only letters and spaces allowed'
  },
  numberOnly: () => {
    return (value: string | number) =>
      /^\d+(\.\d+)?$/.test(String(value)) || 'Only numbers allowed'
  }
}

const name = ref('')
const price = ref(0)
const description = ref('')
const formRef = ref()
const loading = ref(false)

async function submit() {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  loading.value = true
  try {
    await axios.post('http://127.0.0.1:8000/api/lightnovels', {
      name: name.value,
      price: price.value,
      description: description.value
    })

    name.value = ''
    price.value = 0
    description.value = ''
  } catch (error) {
    console.error('POST error:', error)
  } finally {
    loading.value = false
  }
}
</script>
