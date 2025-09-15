<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-6 elevation-6">
          <v-card-title class="text-h4 font-weight-bold mb-6">
            All Lightnovels
            <v-spacer />
            <v-btn
              :to="{ name: 'lightnovel-create-page' }"
              color="secondary"
              variant="outlined"
            >
              Create Lightnovel
            </v-btn>
          </v-card-title>

          <v-divider class="my-4" />
          <v-row dense>
            <v-col
              v-for="lightnovel in lightnovels"
              :key="lightnovel.id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card class="hoverable rounded-lg elevation-4">
                <v-img
                  height="200px"
                  :src="lightnovelsImages[lightnovel.id] || '/no-image.png'"
                  class="rounded-t-lg"
                  style="object-fit: cover;"
                  @error="(e) => (e.target.src = '/no-image.png')"
                />

                <v-card-title class="text-h6">{{ lightnovel.name }}</v-card-title>
                <v-card-subtitle>{{ lightnovel.description }}</v-card-subtitle>
                <v-card-text>
                  <strong>Price:</strong> €{{ lightnovel.price }}
                </v-card-text>

                <v-card-text>
                  <v-file-input
                    v-model="uploadImages[lightnovel.id]"
                    label="Upload Image"
                    accept="image/*"
                    density="compact"
                    hide-details
                    class="mb-2"
                  />
                  <v-btn
                    :loading="loading"
                    @click="uploadImage(lightnovel.id)"
                    color="primary"
                    block
                  >
                    Upload
                  </v-btn>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    :to="{ name: 'lightnovel-details-page', params: { id: lightnovel.id } }"
                    color="primary"
                    block
                  >
                    View Details
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { api } from '@/app/modules/lightnovel/shared/Shared'

const lightnovels = ref([])
const lightnovelsImages = ref({})
const uploadImages = ref({})
const loading = ref(false)

async function loadLightnovelImage(lightnovelId) {
  try {
    const response = await api.get(`/lightnovels/${lightnovelId}/images`, { responseType: 'blob' })
    lightnovelsImages.value[lightnovelId] = URL.createObjectURL(response.data)
  } catch (error) {
    console.error('Image load failed for', lightnovelId, error)
    lightnovelsImages.value[lightnovelId] = '/no-image.png'
  }
}

async function getLightnovels() {
  try {
    const response = await api.get('/lightnovels')
    lightnovels.value = response.data.data ?? response.data
    for (const ln of lightnovels.value) {
      await loadLightnovelImage(ln.id)
    }
  } catch (error) {
    console.error('API error:', error)
  }
}

getLightnovels()

async function uploadImage(lightnovelId) {
  const imageFile = uploadImages.value[lightnovelId]
  if (!imageFile) return

  loading.value = true
  const formData = new FormData()
  formData.append('image', imageFile)

  try {
    await api.post(`/lightnovels/${lightnovelId}/images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    await loadLightnovelImage(lightnovelId)
  } catch (error) {
    console.error('POST error:', error)
  } finally {
    loading.value = false
  }
}
</script>
