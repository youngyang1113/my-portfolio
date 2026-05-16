import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaPen } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'

const glassCard =
  'group relative flex flex-col justify-between rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-all duration-300 hover:border-white/[0.14] hover:bg-white/[0.06] hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.55)]'

const Contact = () => {
  const channels = [
    {
      icon: FaEnvelope,
      label: 'Email',
      value: 'youngyb0109@gmail.com',
      href: 'mailto:youngyb0109@gmail.com',
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      value: 'Rye',
      href: 'https://github.com/youngyang1113',
    },
    {
      icon: FaLinkedin,
      label: '社交账号',
      value: 'LinkedIn',
      href: 'https://linkedin.com',
    },
  ]

  return (
    <div className="min-h-screen px-5 pb-32 pt-24 md:px-8 md:pt-28">
      <div className="mx-auto max-w-3xl">
        {/* Hero */}
        <header className="mb-20 text-center md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.24em] text-gray-500">
              Contact
            </p>
            <h1 className="mb-5 text-4xl font-semibold tracking-tight text-white md:text-5xl md:tracking-tighter">
              取得联系
            </h1>
            <p className="mx-auto max-w-md text-base leading-relaxed text-gray-400 md:text-lg">
              合作、技术交流或一句简单的问候，都很欢迎。我会尽快回复。
            </p>
          </motion.div>
        </header>

        {/* Glass cards */}
        <ScrollReveal className="mb-20 md:mb-28">
          <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {channels.map((c, i) => {
              const Icon = c.icon
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className={glassCard}
                >
                  <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] text-gray-300 transition-colors duration-300 group-hover:text-white">
                    <Icon className="text-lg" aria-hidden />
                  </div>
                  <div>
                    <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-gray-500">
                      {c.label}
                    </p>
                    <p className="text-base font-medium text-white/90 transition-colors group-hover:text-white">
                      {c.value}
                    </p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-col items-center gap-4 text-center">
            <p className="max-w-md text-base text-gray-500">需要留一段话或反馈，可前往独立留言页填写。</p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/message"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 px-8 py-3.5 text-base font-medium text-white shadow-[0_12px_40px_-16px_rgba(79,70,229,0.55)] transition-[box-shadow,filter] duration-300 hover:shadow-[0_16px_48px_-12px_rgba(99,102,241,0.5)] hover:brightness-[1.05]"
              >
                <FaPen className="text-sm opacity-90" aria-hidden />
                写留言
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default Contact
