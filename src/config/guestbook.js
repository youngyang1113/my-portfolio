const env = import.meta.env

/** 留言 API 根地址；留空则使用同源 /api/comments（本地 dev 可配合 vite proxy） */
export const guestbookConfig = {
  apiBase: String(env.VITE_GUESTBOOK_API_URL || '').replace(/\/$/, ''),
}

export function getGuestbookApiUrl(path = '/api/comments') {
  const base = guestbookConfig.apiBase
  return base ? `${base}${path}` : path
}

export function isGuestbookApiAvailable() {
  return guestbookConfig.apiBase.length > 0 || import.meta.env.DEV
}
