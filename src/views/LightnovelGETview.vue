<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card elevation="6" class="pa-6">
          <v-card-title class="text-h5">
            {{ lightnovel?.name }}
          </v-card-title>
          <v-img
              :width="300"
              aspect-ratio="16/9"
              cover
              src="http://127.0.0.1:8000/api/lightnovels/10/images"

          </v-img>
          <v-divider class="my-2" />

          <v-card-text>
            <div class="mb-4">
              <strong>Description:</strong>
              <p>{{ lightnovel?.description }}</p>
            </div>

            <div>
              <strong>Price:</strong>
              <p>€{{ lightnovel?.price }}</p>
            </div>
          </v-card-text>

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

<!--            <v-btn>-->
<!--            <div>-->
<!--              <label for="file-input" class="btn">Upload File</label>-->
<!--              <input-->
<!--                id="file-input"-->
<!--                type="file"-->
<!--                v-model="files"-->
<!--                :multiple="multiple"-->
<!--                @change="handleFileSelect"-->
<!--                hidden-->
<!--              />-->
<!--              <ul>-->
<!--                <li v-for="(file, index) in files" :key="file.name">-->
<!--                  {{ file.name }} <button @click="uploadImage(index)">Upload</button>-->
<!--                </li>-->
<!--              </ul>-->
<!--            </div>-->
<!--            </v-btn>-->
          </v-card-text>

          <v-divider class="my-4" />

          <v-card-actions class="justify-space-between">
            <v-btn
              color="primary"
              variant="outlined"
              :to="{ name: 'lnUpdate', params: {id: lightnovelId} }"
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
import { serialize } from 'object-to-formdata';

const route = useRoute()
const router = useRouter()

const lightnovelId = route.params.id as string
const lightnovel = ref(null)
const file = ref<File>(null);
// const form = new FormData();
const request = {image:null}
const loading = ref(false)

getLightnovel()

function getLightnovel() {
  axios.get(`http://127.0.0.1:8000/api/lightnovels/${lightnovelId}`)
    .then(response => {
      lightnovel.value = response.data.data
    })
    .catch(error => {
      console.error('API error:', error)
    })
}

function deleteLightnovel() {
  axios.delete(`http://127.0.0.1:8000/api/lightnovels/${lightnovelId}`)
    .then(() => {
      console.log('Deleted')
      router.push('/ln5')
    })
    .catch(error => {
      console.error('Delete error:', error)
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

