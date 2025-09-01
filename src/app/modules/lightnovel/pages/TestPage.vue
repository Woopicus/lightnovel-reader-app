<template>
  <div>
    <h1>Login</h1>
    <input v-model="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="submitLogin">Login</button>
    <p v-if="error">{{ error }}</p>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue"
import { login } from "@/app/modules/lightnovel/services/authService.ts"

const email = ref("")
const password = ref("")
const error = ref("")

async function submitLogin() {
  try {
    await login(email.value, password.value)
    alert("Login success!")
  } catch (err: any) {
    error.value = "Login failed: " + err.response?.data?.message
  }
}
</script>

