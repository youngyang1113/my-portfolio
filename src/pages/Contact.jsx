import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'

const Contact = () => {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 2800)
  }

  const channels = [
    {
      icon: <FaEnvelope className="text-xl" />,
      label: '邮箱',
      value: 'youngyb0109@gmail.com',
      href: 'mailto:youngyb0109@gmail.com',
    },
    {
      icon: <FaGithub className="text-xl" />,
      label: 'GitHub',
      value: 'Rye',
      href: 'https://github.com/youngyang1113',
    },
    {
      icon: <FaLinkedin className="text-xl" />,
      label: 'LinkedIn',
      value: '个人主页',
      href: 'https://linkedin.com',
    },
    {
      icon: <FaMapMarkerAlt className="text-xl" />,
      label: '地区',
      value: '中国·西安 可远程',
      href: null,
    },
  ]

  return (
    <div className="min-h-screen px-4 pb-24 pt-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="mb-4 text-5xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">联系我</span>
          </h1>
          <p className="text-lg text-gray-400">有合作、外包或技术交流，欢迎留言或直接写信</p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-5">
          <ScrollReveal className="lg:col-span-2">
            <div className="space-y-4">
              {channels.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm transition-all hover:border-primary/40 hover:shadow-[0_0_28px_-10px_rgba(108,99,255,0.5)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-secondary/20 text-primary">
                    {c.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-wider text-gray-500">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="block truncate font-medium text-white transition-colors group-hover:text-primary"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="font-medium text-white">{c.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-3">
            <motion.form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_50px_-20px_rgba(255,107,107,0.25)] backdrop-blur-md"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-secondary/15 blur-3xl" />

              <h2 className="relative mb-6 text-2xl font-bold">发送消息</h2>
              <div className="relative grid gap-4 sm:grid-cols-2">
                <label className="sm:col-span-1">
                  <span className="mb-1 block text-sm text-gray-400">称呼</span>
                  <input
                    required
                    type="text"
                    placeholder="怎么称呼你"
                    className="w-full rounded-xl border border-white/10 bg-dark/60 px-4 py-3 text-white outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="sm:col-span-1">
                  <span className="mb-1 block text-sm text-gray-400">邮箱</span>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    className="w-full rounded-xl border border-white/10 bg-dark/60 px-4 py-3 text-white outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="sm:col-span-2">
                  <span className="mb-1 block text-sm text-gray-400">内容</span>
                  <textarea
                    required
                    rows={5}
                    placeholder="简单说说项目类型、周期或想法…"
                    className="w-full resize-none rounded-xl border border-white/10 bg-dark/60 px-4 py-3 text-white outline-none transition focus:border-primary/60 focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary py-3.5 font-semibold text-white shadow-lg shadow-primary/25 transition hover:shadow-primary/40 sm:w-auto sm:px-10"
              >
                <FaPaperPlane />
                {sent ? '已记录（演示）' : '发送'}
              </motion.button>
              <p className="relative mt-3 text-xs text-gray-500">演示站点：提交后不会真的发信，请自行接入表单服务或后端 API。</p>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </div>
  )
}

export default Contact
