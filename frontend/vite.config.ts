import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom', // Para simular un entorno de navegador
    setupFiles: './setupTests.ts', // Archivo de configuración adicional
  },
})
