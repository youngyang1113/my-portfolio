import { motion } from 'framer-motion'
import { FiDownload } from 'react-icons/fi'
import { easeOut, resumeHref } from './data'

export default function AboutHero() {
  return (
    <header className="relative mx-auto max-w-5xl px-5 md:px-8">
      <div className="pointer-events-none absolute -right-4 top-0 h-72 w-72 rounded-full bg-primary/[0.07] blur-[100px] md:right-0" />
      <div className="pointer-events-none absolute -left-20 top-32 h-64 w-64 rounded-full bg-secondary/[0.05] blur-[90px]" />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent"
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: easeOut }}
        className="relative pt-6 md:pt-10"
      >
        <p className="font-mono text-sm font-medium uppercase tracking-[0.38em] text-zinc-400 md:text-base md:tracking-[0.42em]">
          About
        </p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.12] tracking-tight text-white">
          你好，我是
          <span className="bg-gradient-to-r from-zinc-100 via-white to-zinc-400 bg-clip-text text-transparent">
            {' '}
            杨渊博
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          计算机专业在读。健身、摄影、旅游爱好者
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm">
            全栈 · 开发
          </span>
          <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm">
            陕西师范大学
          </span>
          <a
            href={resumeHref}
            download
            className="inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-primary/50 hover:bg-primary/25"
          >
            <FiDownload className="text-base" aria-hidden />
            Resume（PDF）
          </a>
        </div>
      </motion.div>

      {/* 科技感底纹：细线网格 + 微光 */}
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] -z-10 h-[min(420px,50vh)] w-[min(100%,720px)] -translate-x-1/2 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black, transparent)',
        }}
        aria-hidden
      />
    </header>
  )
}
