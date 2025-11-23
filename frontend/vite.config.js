import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      'llm-council-production-4d78.up.railway.app,' // din Railway-domän
      'llm-council-production.up.railway.app' // din Railway-domän
    ]
  }
})
