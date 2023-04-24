import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': "http://localhost:5000",
      '/users': "http://localhost:5000",
      '/profile': "http://localhost:5000"
    }
  }
})
