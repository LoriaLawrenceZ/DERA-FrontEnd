import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/chat': {
        target: 'https://dera-backend.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
