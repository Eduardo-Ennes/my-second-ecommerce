import path from "path"
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
   server: {

    // configurações apenas para o dockerfile de desenvolvimento
    host: true,       // Permite acessar pelo host (0.0.0.0)
    port: 5173,       // Certifica que vai usar a porta do docker-compose
  }
})
