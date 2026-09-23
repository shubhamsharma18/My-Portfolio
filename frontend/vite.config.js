import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'      // ← Zaroori
import tailwindcss from '@tailwindcss/vite'
import path from 'path'                        // ← Aliases ke liye

export default defineConfig({
  plugins: [
    react(),           // ← JSX + Fast Refresh
    tailwindcss(),     // ← Tailwind v4
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})