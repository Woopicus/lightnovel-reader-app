
<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="10">
        <v-card class="pa-4" elevation="6">
          <v-row
            class="justify-center align-center flex-column-reverse flex-md-row"
          >
            <v-col cols="12" md="6">
              <h1 class="text-h1 mb-8">Bart v D</h1>
              <h3 class="text-h3 mb-8 font-weight-thin">Web Developer?</h3>
              <v-btn class="elevation-4 rounded-xl mb-4" color="primary">
                Contact Me
              </v-btn>
            </v-col>
            <v-col class="text-center" cols="12" md="6">
              <v-avatar :size="300" class="elevation-12 mx-auto mb-8">
                <v-img src="https://imgur.com/a/sp7Az5U.jpg"></v-img>
              </v-avatar>
            </v-col>
          </v-row>

          <v-img
            :width="300"
            aspect-ratio="16/9"
            cover
            src="http://127.0.0.1:8000/api/lightnovels/10/images"
          </v-img>

          <v-card-title class="text-h5">
            All Lightnovels
            <v-spacer />
          </v-card-title>

          <v-card-text>
            <v-file-input
              v-model="file"
              @change="request.image=file"
              label="Upload File"
              :multiple="false"
            >
            </v-file-input>

            <v-btn
              @click="uploadImage"
              text="Upload"
              :loading="loading"
            >
            </v-btn>
          </v-card-text>

          <v-divider class="my-4" />
          <v-btn
            :to="{ name: 'lightnovel-create-page' }"
            color="secondary"
            variant="outlined"
            class="mt-2"
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
              <v-card
                class="hoverable"
                variant="tonal"
                color="primary"
              >
                <v-card-title class="text-h6">
                  {{ lightnovel.name }}
                </v-card-title>

                <v-card-subtitle>
                  {{ lightnovel.description }}
                </v-card-subtitle>

                <v-card-text>
                  <strong>Price:</strong>€{{ lightnovel.price }}
                </v-card-text>

                <v-card-actions>
                  <v-btn
                    :to="{ name: 'lightnovel-details-page', params: { id: lightnovel.id } }"
                    color="primary"
                    variant="tonal"
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

<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { serialize } from 'object-to-formdata'

const lightnovels = ref<{ name: string; description: string; price: number; id: number }[]>([])
const request = {image:null}
const loading = ref(false)


getLightnovels()

function getLightnovels() {
  axios
    .get('http://127.0.0.1:8000/api/lightnovels')
    .then((response) => {
      lightnovels.value = response.data.data
    })
    .catch((error) => {
      console.error('API error:', error)
    })
}

function uploadImage() {
  loading.value = true
  const formData = serialize(request);

  axios.post(`http://127.0.0.1:8000/api/lightnovels/${lightnovelId}/images`, formData, {
    headers:{
      'Content-Type': 'multipart/form-data'
    } })

    .then(() => {
      loading.value = false
    })
    .catch(error => {
      console.error('POST error:', error)
    })
}
</script>
