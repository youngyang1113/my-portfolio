const env = import.meta.env

const DEFAULT_API_BASE = 'https://my-portfolio-ns9n.onrender.com'

export const guestbookConfig = {
  apiBase: String(env.VITE_GUESTBOOK_API_URL || DEFAULT_API_BASE).replace(/\/$/, ''),
}

export function getGuestbookApiUrl(path = '/api/comments') {
  return `${guestbookConfig.apiBase}${path}`
}

export function isGuestbookApiAvailable() {
  return guestbookConfig.apiBase.length > 0
}
