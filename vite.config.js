import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    
    proxy: {
      '/api': {
        target: ['http://localhost:8080','https://tech-avinya-backend.onrender.com'],
        changeOrigin: true,
        secure: false, 
      },
    },
  },
})
