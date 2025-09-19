<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="6" class="pa-6">
          <v-card-title class="text-h5">Update Lightnovel</v-card-title>

          <v-card-title class="text-h5">
            <v-spacer />
            <v-btn
              color="secondary"
              :to="{ name: 'lightnovel-overview-page' }"
              variant="outlined"
            >
              Back to Home
            </v-btn>
          </v-card-title>

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
            />

            <v-text-field
              v-model="price"
              label="Price"
              type="number"
              :rules="[rules.required(), rules.minValue(0), rules.numberOnly()]"
              class="mt-4"
            />

            <v-text-field
              v-model="description"
              label="Description"
              :rules="[rules.required(), rules.lettersOnly()]"
              class="mt-4"
            />

            <v-text-field
              v-model="genre"
              label="Genre"
              :rules="[rules.required(), rules.lettersOnly()]"
              class="mt-4"
            />

            <v-btn
              color="primary"
              class="mt-6"
              :loading="loading"
              :disabled="!formValid"
              type="submit"
            >
              Update
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getLightnovel, editLightnovel, rules } from '@/app/modules/lightnovel/shared/Shared'

const formRef = ref()
const route = useRoute()
const router = useRouter()

const lightnovelId = Number(route.params.id)

const name = ref('')
const price = ref(0)
const description = ref('')
const genre = ref('')
const loading = ref(false)

const formValid = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

onMounted(async () => {
  loading.value = true
  try {
    const data = await getLightnovel(lightnovelId)
    name.value = data.name
    price.value = data.price
    description.value = data.description
    genre.value = data.genre
  } catch (error) {
    console.error('GET error:', error)
    errorMessage.value = 'Failed to load lightnovel.'
  } finally {
    loading.value = false
  }
})

async function submit() {
  const isValid = await formRef.value?.validate()
  if (!isValid) return

  loading.value = true
  try {
    await editLightnovel(lightnovelId, name.value, price.value, description.value, genre.value)
    successMessage.value = 'Lightnovel updated successfully.'
    setTimeout(() => router.push({ name: 'lightnovel-overview-page' }), 1500)
  } catch (error) {
    console.error('Update error:', error)
    errorMessage.value = 'Failed to update lightnovel.'
  } finally {
    loading.value = false
  }
}
</script>
