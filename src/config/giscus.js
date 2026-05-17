/**
 * Giscus 配置：优先读 .env，未设置时使用下方默认值（与 giscus.app 一致）
 */
const env = import.meta.env

export const giscusConfig = {
  repo: env.VITE_GISCUS_REPO || 'youngyang1113/my-portfolio',
  repoId: env.VITE_GISCUS_REPO_ID || 'R_kgDOSci6YA',
  category: env.VITE_GISCUS_CATEGORY || 'General',
  categoryId: env.VITE_GISCUS_CATEGORY_ID || 'DIC_kwDOSci6YM4C9PB6',
  mapping: env.VITE_GISCUS_MAPPING || 'pathname',
  strict: env.VITE_GISCUS_STRICT === 'true' ? '1' : '0',
  reactionsEnabled: env.VITE_GISCUS_REACTIONS !== 'false' ? '1' : '0',
  emitMetadata: '0',
  inputPosition: env.VITE_GISCUS_INPUT_POSITION || 'bottom',
  lang: env.VITE_GISCUS_LANG || 'zh-CN',
  loading: 'lazy',
  theme: env.VITE_GISCUS_THEME || 'preferred_color_scheme',
}

export function isGiscusConfigured() {
  const { repo, repoId, categoryId } = giscusConfig
  return Boolean(repo && repoId && categoryId)
}
