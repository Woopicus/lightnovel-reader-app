
Regex with typeof
const rules = {
  required: (msg = 'This field needs to be filled in') => {
    return (value: string | number) => !!value || msg
  },
  lettersOnly: () => {
    return (value: unknown) => {
      if (typeof value === 'string'){
        return true
      }
      return 'Only letters and spaces allowed'
      // return /^[a-zA-Z\s]+$/.test(value) || 'Only letters and spaces allowed'
    }
  },
  numberOnly: () => {
    return (value: string | number) => /^\d+(\.\d+)?$/.test(String(value)) || 'Only numbers allowed'
  },
  minValue: (min: number) => {
    return (value: number) => value >= min || `Must be at least ${min}`
  },
}

