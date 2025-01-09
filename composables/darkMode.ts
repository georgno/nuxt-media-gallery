import { useQuasar } from 'quasar'

export const useDarkMode = () => {
  const q = useQuasar()
  
  const isDark = ref(process.client ? localStorage.getItem('darkMode') === 'true' : false)
  
  watch(isDark, (newValue) => {
    if (process.client) {
      localStorage.setItem('darkMode', newValue.toString())
      q.dark.set(newValue)
    }
  })

  const toggleDarkMode = () => {
    isDark.value = !isDark.value
  }

  onMounted(() => {
    q.dark.set(isDark.value)
  })

  return {
    isDark,
    toggleDarkMode
  }
} 