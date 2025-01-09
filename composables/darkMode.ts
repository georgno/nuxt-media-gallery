import { useQuasar } from 'quasar'

export const useDarkMode = () => {
  const q = useQuasar()
  
  // Initialize dark mode from localStorage or default to false
  const isDark = ref(process.client ? localStorage.getItem('darkMode') === 'true' : false)
  
  // Watch for changes and update localStorage and Quasar dark mode
  watch(isDark, (newValue) => {
    if (process.client) {
      localStorage.setItem('darkMode', newValue.toString())
      q.dark.set(newValue)
    }
  })

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  // Initialize dark mode on client side
  onMounted(() => {
    q.dark.set(isDark.value)
  })

  return {
    isDark,
    toggleDarkMode
  }
} 