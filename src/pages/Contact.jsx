import { motion } from 'framer-motion'
import { FaGithub, FaEnvelope, FaInstagram } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'
import GuestbookComments from '../components/GuestbookComments'
import './Contact.css'

const ease = [0.22, 1, 0.36, 1]

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
    icon: FaInstagram,
    label: 'Instagram',
    value: 'Profile',
    href: 'https://www.instagram.com/rye_yb',
  },
]

export default function Contact() {
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
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-300 transition-colors hover:border-sky-500/40 hover:text-white"
                >
                  <Icon className="text-sky-400/90" aria-hidden />
                  <span className="text-gray-500">{c.label}</span>
                  <span className="font-medium text-white/90">{c.value}</span>
                </a>
              )
            })}
          </div>
        </ScrollReveal>

        {/* 留言区：渐变高亮面板 */}
        <ScrollReveal>
          <section
            className="guestbook-panel"
            aria-labelledby="guestbook-heading"
          >
            <motion.div
              className="guestbook-panel__inner"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <motion.div className="guestbook-panel__glow" aria-hidden />

              <div className="guestbook-panel__header">
                <h2 id="guestbook-heading" className="text-lg font-semibold text-white md:text-xl">
                  写下你的留言
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  填写昵称与内容即可发表，无需登录；所有人可见，提交后自动更新列表。
                </p>
              </div>

              <GuestbookComments className="guestbook-panel__comments" />
            </motion.div>
          </section>
        </ScrollReveal>

        <p className="mt-8 text-center text-xs text-gray-500">
          留言经 Render API 写入 GitHub 仓库{' '}
          <code className="rounded bg-white/5 px-1 py-0.5 text-gray-400">data/messages.json</code>{' '}
          永久保存
        </p>
      </div>
    </div>
  )
}
