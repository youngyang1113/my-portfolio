import { useCallback, useEffect, useState } from 'react'
import { getGuestbookApiUrl, isGuestbookApiAvailable } from '../config/guestbook'

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleString('zh-CN', {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return iso
  }
}

export default function GuestbookComments({ className = '' }) {
  const apiReady = isGuestbookApiAvailable()
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')

  const loadComments = useCallback(async () => {
    if (!apiReady) {
      setLoading(false)
      return
    }
    setError('')
    try {
      const res = await fetch(getGuestbookApiUrl())
      if (!res.ok) throw new Error('加载留言失败')
      const data = await res.json()
      setComments(Array.isArray(data) ? data : [])
    } catch {
      setError('无法加载留言，请稍后再试')
      setComments([])
    } finally {
      setLoading(false)
    }
  }, [apiReady])

  useEffect(() => {
    loadComments()
  }, [loadComments])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch(getGuestbookApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          message: message.trim(),
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || '提交失败')
      setMessage('')
      await loadComments()
    } catch (err) {
      setError(err.message || '提交失败')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="guestbook-name" className="mb-1.5 block text-xs font-medium text-gray-400">
            昵称 *
          </label>
          <input
            id="guestbook-name"
            name="name"
            type="text"
            required
            maxLength={40}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="你的名字"
            className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/30"
          />
        </div>
        <div>
          <label
            htmlFor="guestbook-message"
            className="mb-1.5 block text-xs font-medium text-gray-400"
          >
            留言 *
          </label>
          <textarea
            id="guestbook-message"
            name="message"
            required
            maxLength={2000}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="写下你的想法…"
            className="w-full resize-y rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-sky-500/50 focus:outline-none focus:ring-1 focus:ring-sky-500/30"
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-sky-500/90 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? '发送中…' : '发送留言'}
        </button>
        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
      </form>

      <div className="mt-8 border-t border-white/8 pt-6">
        <h3 className="mb-4 text-sm font-medium text-gray-400">全部留言（最新在上）</h3>
        {loading ? (
          <p className="text-center text-sm text-gray-500">加载中…</p>
        ) : comments.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-500">还没有留言，来做第一个吧。</p>
        ) : (
          <ul className="space-y-0 divide-y divide-white/8">
            {comments.map((c) => (
              <li key={c.id} className="py-4 first:pt-0">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  <span className="font-semibold text-white">{c.name}</span>
                  <time className="text-xs text-gray-500" dateTime={c.createdAt}>
                    {formatTime(c.createdAt)}
                  </time>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-gray-300">
                  {c.message}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
