import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaEnvelope, FaWeixin } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'
import GuestbookComments from '../components/GuestbookComments'
import './Contact.css'

const ease = [0.22, 1, 0.36, 1]

export default function Contact() {
  const [showWechat, setShowWechat] = useState(false)

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
      icon: FaWeixin,
      label: '微信',
      value: 'yb1113y',
      onClick: () => setShowWechat((prev) => !prev),
    },
  ]

  return (
    <div className="contact-page min-h-screen px-5 pb-32 pt-24 md:px-8 md:pt-28">
      <div className="mx-auto max-w-3xl">
        {/* 页眉 */}
        <header className="mb-10 text-center md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease }}
          >
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.28em] text-sky-400/90">
              Contact &amp; Comments
            </p>
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white md:text-5xl">
              留言板
            </h1>
            <p className="mx-auto max-w-lg text-base leading-relaxed text-gray-400 md:text-lg">
              欢迎留言、提问或反馈。留言会公开显示，按时间排序
            </p>
          </motion.div>
        </header>

        {/* 快捷联系 */}
        <ScrollReveal className="mb-10">
          <div className="flex flex-wrap justify-center gap-3">
            {channels.map((c) => {
              const Icon = c.icon
              const isLink = !!c.href
              return isLink ? (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={`${c.label}: ${c.value}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition-colors hover:border-sky-500/40 hover:text-white"
                >
                  <Icon className="text-sky-400/90" aria-hidden />
                  <span className="text-gray-500">{c.label}</span>
                  <span className="font-medium text-white/90">{c.value}</span>
                </a>
              ) : (
                <button
                  key={c.label}
                  type="button"
                  onClick={c.onClick}
                  aria-label={`${c.label}: ${c.value}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition-colors hover:border-sky-500/40 hover:text-white"
                >
                  <Icon className="text-sky-400/90" aria-hidden />
                  <span className="text-gray-500">{c.label}</span>
                  <span className="font-medium text-white/90">{c.value}</span>
                </button>
              )
            })}
          </div>

          {/* 微信二维码弹窗 */}
          <AnimatePresence>
            {showWechat && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.25, ease }}
                className="mx-auto mt-6 w-fit rounded-2xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md"
              >
                <p className="mb-3 text-center text-sm text-gray-400">扫码添加微信</p>
                <img
                  src={`${import.meta.env.BASE_URL}wechatcode.jpg`}
                  alt="微信二维码"
                  className="mx-auto h-48 w-48 rounded-lg object-contain"
                />
                <p className="mt-3 text-center text-sm font-medium text-white">微信号：yb1113y</p>
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollReveal>

        {/* 留言区：渐变高亮面板 */}
        <ScrollReveal>
          <section
            className="guestbook-panel"
            aria-labelledby="guestbook-heading"
          >
            <motion.div
              className="guestbook-panel__inner"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <motion.div className="guestbook-panel__glow" aria-hidden />

              <div className="guestbook-panel__header">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-sky-600/20 border border-sky-500/20">
                    <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h2 id="guestbook-heading" className="text-xl font-semibold text-white md:text-2xl">
                      写下你的留言
                    </h2>
                    <p className="mt-0.5 text-sm text-gray-400">
                      无需登录，所有人可见
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed">
                  填写昵称与内容即可发表，提交后自动更新列表。欢迎留下你的想法、建议或问候！
                </p>
              </div>

              <GuestbookComments className="guestbook-panel__comments" />
            </motion.div>
          </section>
        </ScrollReveal>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>留言将写入 GitHub 仓库</span>
          <code className="rounded-md bg-white/5 px-2 py-1 text-gray-400 font-mono">data/messages.json</code>
          <span>永久保存</span>
        </div>
      </div>
    </div>
  )
}
