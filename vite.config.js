import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: '127.0.0.1', // 使用 127.0.0.1 代替 localhost
    port: 5173,
  },
})
