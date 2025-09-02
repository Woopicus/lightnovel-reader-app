import axios from 'axios'
import router from '@/app/core/plugins/router/index'

const API_URL = 'http://127.0.0.1:8000/api'

export const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token')
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  }
)

export async function getLightnovel(lightnovelId: number) {
  try {
    const response = await api.get(`/lightnovels/${lightnovelId}`)
    return response.data.data
  } catch (error) {
    console.error('GET error:', error)
    throw error
  }
}

export async function createLightnovel(name: string, price: number, description: string, genre: string){
  try {
    return await api.post('/lightnovels', {
      name,
      price,
      description,
      genre
    })
  } catch (error) {
    console.error('POST error:', error)
  }
}

export async function editLightnovel(lightnovelId: number, name: string, price: number, description: string, genre: string) {
  try {
    return await api.put(`/lightnovels/${lightnovelId}`, {
      name,
      price,
      description,
      genre
    })
  } catch (error) {
    console.error('Update failed:', error)
  }
}

export const rules = {
  required: (msg = 'This field needs to be filled in') => {
    return (value: string | number) => !!value || msg;
  },
  minValue: (min: number) => {
    return (value: number) => value >= min || `Must be at least ${min}`;
  },
  lettersOnly: () => {
    return (value: string) =>
      /^[a-zA-Z\s]+$/.test(value) || 'Only letters and spaces allowed';
  },
  numberOnly: () => {
    return (value: string | number) =>
      /^\d+(\.\d+)?$/.test(String(value)) || 'Only numbers allowed';
  }
};
