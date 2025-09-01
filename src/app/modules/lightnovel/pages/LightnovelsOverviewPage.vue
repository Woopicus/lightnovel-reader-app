<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-4" elevation="6">

          <div class="text-center">
            <v-menu open-on-hover>
              <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props">
                  Genres
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  :value="index"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>

          <v-img
            class="mb-6 rounded-lg"
            height="300"
            width="500"
            src="http://127.0.0.1:8000/api/lightnovels/7/images"
            style="object-fit: cover;"
          />

          <v-row class="justify-center align-center flex-column-reverse flex-md-row">
            <v-col cols="12" md="6">
              <h1 class="text-h1 mb-8">Bart v D</h1>
              <h3 class="text-h3 mb-8 font-weight-thin">Web Developer?</h3>
              <v-btn class="elevation-4 rounded-xl mb-4" color="primary">
                Contact Me
              </v-btn>
            </v-col>
            <v-col class="text-center" cols="12" md="6">
              <v-avatar :size="300" class="elevation-12 mx-auto mb-8" />
            </v-col>
          </v-row>

          <v-card-title class="text-h5">
            All Lightnovels
            <v-spacer />
          </v-card-title>

          <v-divider class="my-4" />

          <v-btn
            :to="{ name: 'lightnovel-create-page' }"
            color="secondary"
            variant="outlined"
            class="mt-2 mb-6"
          >
            Create lightnovel
          </v-btn>

          <v-row>
            <v-col
              v-for="lightnovel in lightnovels"
              :key="lightnovel.id"
              cols="12"
              md="6"
              lg="4"
            >
              <v-card class="hoverable" variant="tonal" color="primary">
                <v-img
                  height="200px"
                  class="rounded-t-lg"
                  :src="`http://127.0.0.1:8000/api/lightnovels/${lightnovel.id}/images?ts=${Date.now()}`"
                  @error="(e) => (e.target.src = '/no-image.png')"
                />

                <v-card-title class="text-h6">
                  {{ lightnovel.name }}
                </v-card-title>

                <v-card-subtitle>
                  {{ lightnovel.description }}
                </v-card-subtitle>

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
                    Upload Image
                  </v-btn>
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    :to="{ name: 'lightnovel-details-page', params: { id: lightnovel.id } }"
                    color="primary"
                    variant="tonal"
                    block
                  >
                    View Details
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
          <v-text-field
            v-model="exampleName"
            label="Example Name"
            :rules="[rules.required(), rules.lettersOnly()]"
            class="mt-4"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, shallowRef } from 'vue'
import axios from 'axios'
import { api, rules } from '@/app/modules/lightnovel/shared/Shared'

const lightnovels = ref([])
const uploadImages = ref({})
const loading = ref(false)
const selection = shallowRef([])
const items = [
  { title: 'Action' },
  { title: 'Thriller' },
  { title: 'Horror' },
  { title: 'Magic' },
]
const exampleName = ref('')

getLightnovels()
async function getLightnovels() {
  try {
    const response = await api.get('/lightnovels')
    lightnovels.value = response.data.data ?? response.data
    console.log('Loaded lightnovels:', lightnovels.value)
  } catch (error) {
    console.error('API error:', error)
  }
}

async function uploadImage(lightnovelId) {
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
