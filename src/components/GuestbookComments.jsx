import { useCallback, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaPaperPlane, FaUser, FaComment, FaSpinner } from 'react-icons/fa'
import { getGuestbookApiUrl, isGuestbookApiAvailable } from '../config/guestbook'
import { useI18n } from '../i18n/I18nContext'
import { useTheme } from '../context/ThemeContext'

function formatTime(iso) {
  try {
    return new Date(iso).toLocaleString('zh-CN', { dateStyle: 'medium', timeStyle: 'short' })
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
  const { t } = useI18n()
  const { theme } = useTheme()

  const mutedText = theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
  const inputCls = theme === 'dark'
    ? 'border-white/10 bg-white/[0.05] text-white placeholder:text-gray-500 focus:border-sky-500/50 focus:bg-white/[0.08] focus:ring-sky-500/20 group-hover:border-white/20'
    : 'border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:border-sky-500/50 focus:ring-sky-500/20 group-hover:border-gray-300'

  const loadComments = useCallback(async () => {
    if (!apiReady) { setLoading(false); return }
    setError('')
    try {
      const res = await fetch(getGuestbookApiUrl())
      if (!res.ok) throw new Error('Failed')
      const data = await res.json()
      setComments(Array.isArray(data) ? data : [])
    } catch {
      setError('无法加载留言，请稍后再试')
      setComments([])
    } finally {
      setLoading(false)
    }
  }, [apiReady])

  useEffect(() => { loadComments() }, [loadComments])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const res = await fetch(getGuestbookApiUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
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
          <label htmlFor="guestbook-name" className={`mb-2 flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <FaUser className="text-sky-400/80" />{t.contact.nameLabel}
          </label>
          <div className="relative">
            <input id="guestbook-name" name="name" type="text" required maxLength={40} value={name}
              onChange={(e) => setName(e.target.value)} placeholder={t.contact.namePlaceholder}
              className={`w-full rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${inputCls}`} />
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
        </div>
        <div className="group">
          <label htmlFor="guestbook-message" className={`mb-2 flex items-center gap-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            <FaComment className="text-sky-400/80" />{t.contact.messageLabel}
          </label>
          <div className="relative">
            <textarea id="guestbook-message" name="message" required maxLength={2000} rows={4} value={message}
              onChange={(e) => setMessage(e.target.value)} placeholder={t.contact.messagePlaceholder}
              className={`w-full resize-y rounded-xl border px-4 py-3 text-sm transition-all duration-300 focus:outline-none focus:ring-2 ${inputCls}`} />
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className={`mt-2 flex justify-between text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
            <span>{t.lang === 'zh' ? '支持换行' : 'Line breaks supported'}</span>
            <span>{message.length}/2000</span>
          </div>
        </div>
        <motion.button type="submit" disabled={submitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          className="relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:from-sky-400 hover:to-sky-500 hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-60">
          <span className="relative z-10 flex items-center justify-center gap-2">
            {submitting ? <><FaSpinner className="animate-spin" />{t.contact.submitting}</> : <><FaPaperPlane />{t.contact.submit}</>}
          </span>
        </motion.button>
        <AnimatePresence>
          {error && (
            <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="rounded-lg bg-red-500/10 border border-red-500/20 px-4 py-2.5 text-sm text-red-400" role="alert">{error}</motion.p>
          )}
        </AnimatePresence>
      </form>

      <div className={`mt-10 border-t pt-8 ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
        <div className="mb-6 flex items-center justify-between">
          <h3 className={`text-sm font-medium ${mutedText}`}>{t.contact.allMessages}</h3>
          {!loading && comments.length > 0 && (
            <span className={`rounded-full px-3 py-1 text-xs ${theme === 'dark' ? 'bg-white/5 text-gray-500' : 'bg-gray-100 text-gray-400'}`}>
              {comments.length} {t.contact.count}
            </span>
          )}
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <FaSpinner className="mb-3 text-2xl text-sky-400 animate-spin" />
            <p className={`text-sm ${mutedText}`}>{t.contact.loading}</p>
          </div>
        ) : comments.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className={`flex flex-col items-center justify-center rounded-2xl border border-dashed py-12 ${
              theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-gray-200 bg-gray-50'
            }`}>
            <FaComment className={`mb-3 text-3xl ${theme === 'dark' ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={`text-sm ${mutedText}`}>{t.contact.emptyTitle}</p>
            <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}>{t.contact.emptyHint}</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {comments.map((c, index) => (
                <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative rounded-xl border p-5 transition-all duration-300 ${
                    theme === 'dark' ? 'border-white/[0.06] bg-white/[0.03] hover:border-white/10 hover:bg-white/[0.05]'
                    : 'border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm'
                  }`}>
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-500/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-sky-400/20 to-sky-600/20 text-sky-400">
                          <FaUser size={12} />
                        </div>
                        <div>
                          <span className={`block font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{c.name}</span>
                          <time className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`} dateTime={c.createdAt}>{formatTime(c.createdAt)}</time>
                        </div>
                      </div>
                    </div>
                    <p className={`mt-3 whitespace-pre-wrap text-sm leading-relaxed pl-12 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{c.message}</p>
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
