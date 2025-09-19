<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="6" class="pa-6">
          <v-card-title class="text-h5">Create Lightnovel</v-card-title>

          <v-form
            ref="formRef"
            v-model="formValid"
            validate-on="input"
            @submit.prevent="submit"
          >
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
              type="submit"
              :loading="loading"
              :disabled="!formValid"
            >
              Create
            </v-btn>

            <v-btn
              color="secondary"
              class="mt-4"
              variant="outlined"
              :to="{ name: 'lightnovel-overview-page' }"
            >
              Back to Overview
            </v-btn>

            <v-alert v-if="successMessage" type="success" class="mt-4" closable>
              {{ successMessage }}
            </v-alert>

            <v-alert v-if="errorMessage" type="error" class="mt-4" closable>
              {{ errorMessage }}
            </v-alert>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createLightnovel, rules } from '@/app/modules/lightnovel/shared/Shared'

const formRef = ref()
const formValid = ref(false)

const name = ref('')
const price = ref(0)
const description = ref('')
const genre = ref('')
const loading = ref(false)

const successMessage = ref('')
const errorMessage = ref('')

async function submit() {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  loading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    await createLightnovel(name.value, price.value, description.value, genre.value)

    successMessage.value = 'Lightnovel created successfully.'

    name.value = ''
    price.value = 0
    description.value = ''
    genre.value = ''
  } catch (error) {
    console.error('Create error:', error)
    errorMessage.value = 'Failed to create lightnovel.'
  } finally {
    loading.value = false
  }
}
</script>
