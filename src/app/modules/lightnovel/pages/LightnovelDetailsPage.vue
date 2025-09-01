<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="6" class="pa-6">
          <v-card-title class="text-h5">
            {{ lightnovel?.name }}
          </v-card-title>

          <v-divider class="my-2" />

          <v-card-text>
            <div class="mb-4">
            <div>
              <strong>Price:</strong>
              <p>€{{ lightnovel?.price }}</p>
            </div>

              <strong>Description:</strong>
              <p>{{ lightnovel?.description }}</p>
            </div>
          </v-card-text>

          <v-card-text>
            <v-file-input
              v-model="uploadImages[lightnovelId]"
              label="Upload Image"
              accept="image/*"
              density="compact"
              hide-details
              class="mb-2"
            />
            <v-btn
              :loading="loading"
              @click="uploadImage(lightnovelId)"
              color="primary"
              block
            >
              Upload Image
            </v-btn>
          </v-card-text>

          <v-divider class="my-4" />

          <v-card-actions class="justify-space-between">
            <v-btn
              color="primary"
              variant="outlined"
              :to="{ name: 'lightnovel-edit-page', params: {id: lightnovelId} }"
            >
              Update Lightnovel
            </v-btn>

            <v-btn
              color="error"
              variant="tonal"
              @click="deleteLightnovel"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { serialize } from 'object-to-formdata'
import { getLightnovel } from '@/app/modules/lightnovel/shared/Shared'

const route = useRoute()
const router = useRouter()

const lightnovelId = Number(route.params.id)
const lightnovel = ref<{ id: number, name: string, price: number, description: string } | null>(null)
const loading = ref(false)
const uploadImages = ref<Record<number, File | null>>({})

loadLightnovel()

async function loadLightnovel() {
  try {
    lightnovel.value = await getLightnovel(lightnovelId)
  } catch (error) {
    console.error('API error:', error)
  }
}

function deleteLightnovel() {
  axios.delete(`http://127.0.0.1:8000/api/lightnovels/${lightnovelId}`)
    .then(() => {
      console.log('Deleted')
      router.push('/lightnovels')
    })
    .catch(error => {
      console.error('Delete error:', error)
    })
}

async function uploadImage(lightnovelId: number) {
  const imageFile = uploadImages.value[lightnovelId]
  if (!imageFile) return

  loading.value = true
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    await axios.post(`http://127.0.0.1:8000/api/lightnovels/${lightnovelId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  } catch (error) {
    console.error('POST error:', error)
  } finally {
    loading.value = false
  }
}
</script>

