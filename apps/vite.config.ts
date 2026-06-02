import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/renewal_react_v1/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [react()],
  server: {
    open: true,
    browser: 'chrome',
    watch: {
      usePolling: true,
    },
    proxy: {
      '/renewal_react_v1/backend': {
        target: 'https://dataprotec.co.kr',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  build: {
    chunkSizeWarningLimit: 1000,
  },
}))
