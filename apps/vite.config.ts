import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/renewal_react_v1/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    react(),
    {
      name: 'local-data-server',
      configureServer(server) {
        // apps/ 기준 한 단계 위의 data/ 폴더
        const dataDir = path.resolve(process.cwd(), '../data')
        const MIME: Record<string, string> = {
          '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
          '.gif': 'image/gif', '.webp': 'image/webp', '.svg': 'image/svg+xml',
          '.pdf': 'application/pdf',
        }
        server.middlewares.use('/renewal_react_v1/data', (req: any, res: any, next: any) => {
          const reqPath = decodeURIComponent((req.url as string) ?? '/')
          const filePath = path.resolve(dataDir, '.' + reqPath)
          // path traversal 방지
          if (!filePath.startsWith(dataDir)) { next(); return }
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase()
            res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream')
            res.setHeader('Cache-Control', 'no-cache')
            fs.createReadStream(filePath).pipe(res)
            return
          }
          next()
        })
      },
    },
  ],
  server: {
    open: true,
    browser: 'chrome',
    watch: {
      usePolling: true,
    },
    proxy: {
      '/renewal_react_v1/backend': {
        target: 'https://www.dataprotec.co.kr',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            const auth = req.headers.authorization
            if (auth) {
              proxyReq.setHeader('Authorization', auth)
            }
          })
        },
      },
      '/renewal_react_v1/data': {
        target: 'https://www.dataprotec.co.kr',
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
