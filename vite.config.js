import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'process'
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), checker({ typescript: true }),],
  build: {
    outDir: 'dist'
  },
  server: {
    port: process.env.PORT || 5173,
    host: '0.0.0.0'
  },
  preview: {
    port: process.env.PORT || 4173,
    host: '0.0.0.0'
  }
})
