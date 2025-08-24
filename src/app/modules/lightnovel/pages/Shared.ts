import axios from 'axios'

export async function getLightnovel(lightnovelId: number) {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/lightnovels/${lightnovelId}`)
    return response.data.data
  } catch (error) {
    console.error('GET error:', error)
    throw error
  }
}

export async function createLightnovel(name: string, price: number, description: string, genre: string){
  try {
    return await axios.post('http://127.0.0.1:8000/api/lightnovels', {
      name: name,
      price: price,
      description: description,
      genre: genre
    })
  }
  catch (error) {
    console.error('POST error:', error)
  }
}

export async function editLightnovel(name: string, price: number, description: string, genre: string) {
  try {
    return await axios.put(`http://127.0.0.1:8000/api/lightnovels/${lightnovelId}`, {
      name: name,
      price: price,
      description: description,
      genre: genre
    })
  }
  catch (error) {
    console.error('Update failed:', error)
  }
}

const rules = {
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
export default rules;

