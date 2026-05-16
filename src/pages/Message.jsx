import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaChevronLeft } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'

const inputShell =
  'rounded-xl p-px transition-all duration-300 bg-white/[0.06] focus-within:bg-gradient-to-r focus-within:from-sky-400/70 focus-within:via-indigo-400/70 focus-within:to-violet-500/70 focus-within:shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_0_28px_-6px_rgba(99,102,241,0.35)]'

const inputInner =
  'w-full rounded-[11px] border-0 bg-dark/85 px-4 py-3.5 text-base text-white placeholder:text-gray-500 outline-none ring-0'

const formCard =
  'rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8'

export default function Message() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 2600)
  }

  return (
    <div className="min-h-screen px-5 pb-32 pt-24 md:px-8 md:pt-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            to="/contact"
            className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition-colors hover:text-white md:mb-12"
          >
            <FaChevronLeft className="text-xs" aria-hidden />
            返回联系页
          </Link>
        </motion.div>

        <header className="mb-14 text-center md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <p className="mb-4 font-mono text-sm font-medium uppercase tracking-[0.24em] text-gray-500 md:text-base md:tracking-[0.28em]">
              Message
            </p>
            <h1 className="mb-5 text-4xl font-semibold tracking-tight text-white md:text-5xl md:tracking-tighter">
              留言
            </h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-gray-400 md:text-lg">
              写几句话即可。
            </p>
          </motion.div>
        </header>

        <ScrollReveal>
          <motion.form
            onSubmit={handleSubmit}
            className={`mx-auto max-w-lg ${formCard}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-500">姓名</span>
                <div className={inputShell}>
                  <input
                    required
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="怎么称呼你"
                    className={inputInner}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-500">邮箱</span>
                <div className={inputShell}>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputInner}
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-gray-500">内容</span>
                <div className={inputShell}>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="写下你的头脑风暴和想法"
                    className={`${inputInner} min-h-[160px] resize-none`}
                  />
                </div>
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.015, y: -1 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className="mt-10 w-full rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 py-3.5 text-base font-medium text-white shadow-[0_12px_40px_-16px_rgba(79,70,229,0.55)] transition-[box-shadow,filter] duration-300 hover:shadow-[0_16px_48px_-12px_rgba(99,102,241,0.5)] hover:brightness-[1.05]"
            >
              {sent ? '已收到（演示）' : '发送'}
            </motion.button>

            <p className="mt-6 text-center text-sm text-gray-500">演示表单，不会真的发出邮件。</p>
          </motion.form>
        </ScrollReveal>
      </div>
    </div>
  )
}
