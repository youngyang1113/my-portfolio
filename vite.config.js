import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions 里会设置：普通仓库为 /仓库名/，username.github.io 仓库为 /
const base = process.env.GITHUB_PAGES_BASE || '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
})