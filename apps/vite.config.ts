import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/renewal_react_v1/' : '/',
  plugins: [react()],
  server: {
    open: true,
    browser: 'chrome',
    watch: {
      usePolling: true,
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
}))
