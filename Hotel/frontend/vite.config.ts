import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: true,
    allowedHosts: 
        // [
      // 'embattled-astronaut-brick.ngrok-free.dev'
        true
    // ]
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})