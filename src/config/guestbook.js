const env = import.meta.env

/** 生产环境默认 API（Render）；本地 dev 留空走 Vite proxy */
const PRODUCTION_API_BASE = 'https://my-portfolio-ns9n.onrender.com'

export const guestbookConfig = {
  apiBase: String(
    env.VITE_GUESTBOOK_API_URL || (import.meta.env.PROD ? PRODUCTION_API_BASE : ''),
  ).replace(/\/$/, ''),
}

export function getGuestbookApiUrl(path = '/api/comments') {
  const base = guestbookConfig.apiBase
  return base ? `${base}${path}` : path
}

export function isGuestbookApiAvailable() {
  return guestbookConfig.apiBase.length > 0 || import.meta.env.DEV
}
