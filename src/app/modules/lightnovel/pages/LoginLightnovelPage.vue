<template>
  <v-container class="mt-8">
    <v-row justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="6" class="pa-6">
          <v-card-title class="text-h5">
            Login
          </v-card-title>

          <form @submit.prevent="handleLogin">
            <v-card-text>
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                required
              />
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                required
              />
            </v-card-text>

            <v-card-actions class="justify-end">
              <v-btn color="primary" :loading="loading" type="submit">
                Login
              </v-btn>
            </v-card-actions>
          </form>

          <v-alert v-if="errorMessage" type="error" class="mt-4">
            {{ errorMessage }}
          </v-alert>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { login } from '@/app/modules/lightnovel/services/authService'

const router = useRouter()
const route = useRoute()
const lightnovelId = Number(route.params.id)

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  loading.value = true
  errorMessage.value = ''
  try {
    await login(email.value, password.value)
    router.push('/lightnovels')
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Login failed'
  } finally {
    loading.value = false
  }
}
</script>
