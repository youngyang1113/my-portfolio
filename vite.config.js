import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

/**
 * GitHub Pages 子路径：站点在 https://用户名.github.io/仓库名/
 * 构建产物里的 JS/CSS 路径必须与之一致，否则主脚本 404 → 白屏。
 *
 * 优先读工作流写入的 GITHUB_PAGES_BASE；否则在 GitHub Actions 内用 GITHUB_REPOSITORY 推导。
 * 本地开发（无 GITHUB_ACTIONS）始终为 "/"。
 */
function resolveBase() {
  const fromEnv = process.env.GITHUB_PAGES_BASE?.trim()
  if (fromEnv) {
    return fromEnv.endsWith('/') ? fromEnv : `${fromEnv}/`
  }

  if (process.env.GITHUB_ACTIONS === 'true' && process.env.GITHUB_REPOSITORY?.includes('/')) {
    const [owner, repoName] = process.env.GITHUB_REPOSITORY.split('/')
    if (repoName === `${owner}.github.io`) {
      return '/'
    }
    return `/${repoName}/`
  }

  return '/'
}

export default defineConfig({
  base: resolveBase(),
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
})
