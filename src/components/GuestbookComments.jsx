import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPaperPlane, FaUser, FaComment, FaSpinner } from 'react-icons/fa'
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
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="group">
          <label htmlFor="guestbook-name" className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300">
            <FaUser className="text-sky-400/80" />
            昵称 *
          </label>
          <div className="relative">
            <input
              id="guestbook-name"
              name="name"
              type="text"
              required
              maxLength={40}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="你的名字"
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-gray-500 transition-all duration-300 focus:border-sky-500/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-sky-500/20 group-hover:border-white/20"
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
        <div className="group">
          <label
            htmlFor="guestbook-message"
            className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-300"
          >
            <FaComment className="text-sky-400/80" />
            留言 *
          </label>
          <div className="relative">
            <textarea
              id="guestbook-message"
              name="message"
              required
              maxLength={2000}
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="写下你的想法…"
              className="w-full resize-y rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-gray-500 transition-all duration-300 focus:border-sky-500/50 focus:bg-white/[0.08] focus:outline-none focus:ring-2 focus:ring-sky-500/20 group-hover:border-white/20"
            />
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>支持换行</span>
            <span>{message.length}/2000</span>
          </div>
        </div>
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:from-sky-400 hover:to-sky-500 hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {submitting ? (
              <>
                <FaSpinner className="animate-spin" />
                发送中…
              </>
            ) : (
              <>
                <FaPaperPlane />
                发送留言
              </>
            )}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
        </motion.button>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      <div className="mt-10 border-t border-white/10 pt-8">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-400">全部留言</h3>
          {!loading && comments.length > 0 && (
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-500">
              {comments.length} 条
            </span>
          )}
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaSpinner className="mb-3 text-2xl text-sky-400 animate-spin" />
            <p className="text-sm text-gray-500">加载留言中…</p>
          </div>
        ) : comments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.02] py-12"
          >
            <FaComment className="mb-3 text-3xl text-gray-600" />
            <p className="text-sm text-gray-500">还没有留言，来做第一个吧。</p>
            <p className="mt-1 text-xs text-gray-600">你的留言将会永久保存</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {comments.map((c, index) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05]"
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400/20 to-sky-600/20 text-sky-400">
                          <FaUser size={12} />
                        </div>
                        <div>
                          <span className="block font-semibold text-white">{c.name}</span>
                          <time className="text-xs text-gray-500" dateTime={c.createdAt}>
                            {formatTime(c.createdAt)}
                          </time>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-gray-300 pl-12">
                      {c.message}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  )
}
