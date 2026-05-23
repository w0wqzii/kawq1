// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,  // автоматическое открытие браузера
    port: 5173,
    host: true   // позволяет открывать на всех интерфейсах
  }
})