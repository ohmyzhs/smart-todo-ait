import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          framework: ['react', 'react-dom', '@toss/tds-mobile', '@toss/tds-mobile-ait', '@emotion/react'],
          state: ['zustand'],
        },
      },
    },
  },
})
