import axios from "axios"

const API_URL = "http://localhost:8000/api"

export async function login(email: string, password: string) {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  localStorage.setItem("token", response.data.token)
  return response.data
}

export function getToken() {
  return localStorage.getItem("token")
}

export function logout() {
  localStorage.removeItem("token")
}
