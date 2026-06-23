import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiDownload, FiEye } from 'react-icons/fi'
import { FaTimes } from 'react-icons/fa'
import { easeOut, resumeHref } from './data'
import { useI18n } from '../../i18n/I18nContext'
import { useTheme } from '../../context/ThemeContext'

export default function AboutHero() {
  const { t } = useI18n()
  const { theme } = useTheme()
  const [showPdf, setShowPdf] = useState(false)

  // ESC 关闭
  const handleEsc = useCallback((e) => {
    if (e.key === 'Escape') setShowPdf(false)
  }, [])

  useEffect(() => {
    if (showPdf) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', handleEsc)
        document.body.style.overflow = ''
      }
    }
  }, [showPdf, handleEsc])

  return (
    <>
      <header className="relative mx-auto max-w-5xl px-5 md:px-8">
        <div className="pointer-events-none absolute -right-4 top-0 h-72 w-72 rounded-full bg-primary/[0.07] blur-[100px] md:right-0" />
        <div className="pointer-events-none absolute -left-20 top-32 h-64 w-64 rounded-full bg-secondary/[0.05] blur-[90px]" />
        <div className={`pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          theme === 'dark' ? 'via-white/12' : 'via-gray-300'
        }`} aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: easeOut }}
          className="relative pt-6 md:pt-10"
        >
          <p className={`font-mono text-sm font-medium uppercase tracking-[0.38em] md:text-base md:tracking-[0.42em] ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
          }`}>
            {t.about.eyebrow}
          </p>
          <h1 className={`mt-4 max-w-4xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.12] tracking-tight ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {t.about.title}
            <span className={theme === 'dark'
              ? 'bg-gradient-to-r from-zinc-100 via-white to-zinc-400 bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-gray-800 via-gray-600 to-primary bg-clip-text text-transparent'
            }>
              {' '}{t.about.name}
            </span>
          </h1>
          <p className={`text-lg leading-relaxed md:text-xl ${
            theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'
          }`}>
            {t.about.bio}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className={`rounded-full border px-4 py-1.5 text-sm backdrop-blur-sm ${
              theme === 'dark' ? 'border-white/[0.08] bg-white/[0.03] text-zinc-400'
              : 'border-gray-200 bg-white/80 text-gray-600 shadow-sm'
            }`}>
              {t.about.badge1}
            </span>
            <span className={`rounded-full border px-4 py-1.5 text-sm backdrop-blur-sm ${
              theme === 'dark' ? 'border-white/[0.08] bg-white/[0.03] text-zinc-400'
              : 'border-gray-200 bg-white/80 text-gray-600 shadow-sm'
            }`}>
              {t.about.badge2}
            </span>
            <button
              type="button"
              onClick={() => setShowPdf(true)}
              className={`inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/15 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/25 ${theme === 'dark' ? 'text-white' : 'text-primary'}`}
            >
              <FiEye className="text-base" aria-hidden />
              {t.about.resume}
            </button>
            <a
              href={resumeHref}
              download
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors ${
                theme === 'dark'
                  ? 'border-white/[0.08] bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-white'
                  : 'border-gray-200 bg-white/80 text-gray-600 hover:border-gray-300 hover:text-gray-900 shadow-sm'
              }`}
            >
              <FiDownload className="text-base" aria-hidden />
              PDF
            </a>
          </div>
        </motion.div>

        {/* 科技感底纹 */}
        <div
          className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[min(420px,50vh)] w-[min(100%,720px)] -translate-x-1/2 opacity-[0.35]"
          style={{
            backgroundImage: theme === 'dark'
              ? `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`
              : `linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
          }}
          aria-hidden
        />
      </header>

      {/* PDF Preview Modal — Portal 到 body 避免 filter 定位问题 */}
      {createPortal(
        <AnimatePresence>
          {showPdf && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowPdf(false)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className={`relative w-full max-w-3xl max-h-[85vh] rounded-2xl border overflow-hidden shadow-2xl ${
                  theme === 'dark' ? 'bg-dark border-white/10' : 'bg-white border-gray-200'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className={`flex items-center justify-between px-6 py-4 border-b ${
                  theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-gray-100 bg-gray-50'
                }`}>
                  <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Resume / 简历</h3>
                  <div className="flex items-center gap-3">
                    <a href={resumeHref} download
                      className="px-4 py-1.5 bg-primary/15 text-primary rounded-full text-sm font-medium hover:bg-primary/25 transition-colors">
                      Download
                    </a>
                    <button onClick={() => setShowPdf(false)}
                      className={`p-1.5 rounded-full transition-colors ${
                        theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-gray-700 hover:bg-gray-100'
                      }`}>
                      <FaTimes size={18} />
                    </button>
                  </div>
                </div>
                <iframe src={resumeHref} title="Resume PDF" className="w-full h-[70vh]" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  )
}
