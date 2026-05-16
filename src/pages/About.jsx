import { motion } from 'framer-motion'
import {
  FiCpu,
  FiLayers,
  FiTrendingUp,
  FiZap,
  FiCode,
  FiDatabase,
  FiLayout,
  FiGitBranch,
  FiDownload,
} from 'react-icons/fi'

const easeOut = [0.22, 1, 0.36, 1]

/** 整块进入视口后：标题区与内容区依次上浮显现 */
const sectionRootVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.06 },
  },
}

const sectionBlockVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: easeOut },
  },
}

const listItemReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: easeOut, delay: i * 0.1 },
  }),
}

function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`scroll-mt-28 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px -8% 0px', amount: 0.12 }}
      variants={sectionRootVariants}
    >
      <motion.div variants={sectionBlockVariants} className="mb-12 md:mb-16 lg:mb-20">
        {eyebrow && (
          <p className="mb-4 md:mb-5 font-mono text-sm font-medium uppercase tracking-[0.38em] text-zinc-400/95 md:text-base md:tracking-[0.42em]">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.5rem] lg:leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 md:mt-5 md:text-lg md:leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
      <motion.div variants={sectionBlockVariants}>{children}</motion.div>
    </motion.section>
  )
}

const skills = [
  { label: '前端与交互', icon: FiLayout, hint: 'React · 响应式 · 动效' },
  { label: '工程化', icon: FiGitBranch, hint: 'Vite · 组件化 · 可维护结构' },
  { label: '数据与脚本', icon: FiDatabase, hint: 'Python · 采集与分析' },
  { label: '视觉与信息', icon: FiLayers, hint: '版式 · 数据可视化' },
]

const projects = [
  {
    period: '2024',
    title: '个人作品集站点',
    summary: 'React + Vite 搭建，强调可读布局与轻量动效，作为长期迭代的展示入口。',
    tags: ['React', 'Vite', 'Tailwind'],
  },
  {
    period: '2023 — 2024',
    title: '数据驱动的网页作品',
    summary: '从整理数据到页面呈现，练习把复杂信息压缩成一眼能懂的层次。',
    tags: ['Python', 'Web', '可视化'],
  },
  {
    period: '课余',
    title: '小型工具与实验页',
    summary: '用短周期原型验证想法：表单、图表、交互状态——能跑、能改、能复用。',
    tags: ['原型', 'UX'],
  },
]

/** 与 `public/resume.pdf` 对应（构建后由 Vite 注入 base） */
const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`.replace(/\/{2,}/g, '/')

const growthTimeline = [
  {
    period: ' 2005',
    title: '出生',
    place: '宁夏',
    line: '在家乡成长，从小习惯把好奇拆成「能问出口的问题」和「能动手试的小步骤」。',
  },
  {
    period: '2011 — 2017',
    title: '小学与初中',
    place: '本地就读',
    line: '课业之外接触电脑与网络，学会用搜索与教程自学，把兴趣慢慢变成可持续的练习。',
  },
  {
    period: '2017 — 2020',
    title: '初高中衔接',
    place: '宁夏',
    line: '理科基础打牢，也开始认真思考长期方向：更想把时间花在能做出东西来的路径上。',
  },
  {
    period: '2020 — 2023',
    title: '高中阶段',
    place: '宁夏六盘山高级中学',
    line: '参与学生工作与活动组织，锻炼表达与协作；对「用技术解决问题」的兴趣变得更具体。',
  },
  {
    period: '2023 — 至今',
    title: '计算机科学与技术 · 本科在读',
    place: '陕西师范大学',
    line: '系统学习计算机基础；同时把更多时间花在动手做作品与自学前端、数据相关技术上。',
  },
]

export default function About() {
  return (
    <div className="min-h-screen pb-28 pt-20 md:pb-36 md:pt-24">
      {/* —— Hero —— */}
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
            把想法，
            <span className="bg-gradient-to-r from-zinc-100 via-white to-zinc-400 bg-clip-text text-transparent">
              {' '}
              做成作品。
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            计算机专业在读。相信持续学习，也享受把抽象问题拆成可交付的一步步实现。
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-1.5 text-sm text-zinc-400 backdrop-blur-sm">
              前端 · 数据 · 可视化
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

      <div className="mx-auto mt-28 max-w-5xl space-y-32 px-5 md:mt-40 md:space-y-40 lg:space-y-48 md:px-8">
        {/* 个人简介 */}
        <Section
          id="intro"
          eyebrow="简介"
          title="少堆砌，多留白。"
          subtitle="更在意能否把一件事讲清楚、做出来、再迭代。"
        >
          <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,280px)] lg:gap-16">
            <motion.div
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={listItemReveal}
              className="space-y-6 text-base leading-relaxed text-zinc-400 md:text-[17px] md:leading-[1.75]"
            >
              <p>
                我喜欢把想法落成可点击的页面、可复用的脚本，或一份结构清楚的数据结论。代码对我来说不只是课内作业，也是整理思路、对外表达的方式。
              </p>
              <p>
                学习路径上我偏「问题导向」：缺什么补什么，边做边学。前端、Python、数据可视化都还在持续加深——不追求一次完美，更在意稳定进步。
              </p>
            </motion.div>
            <motion.aside
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={listItemReveal}
              className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 backdrop-blur-md"
            >
              <div>
                <p className="font-mono text-sm uppercase tracking-[0.28em] text-zinc-400 md:text-base md:tracking-[0.32em]">
                  Focus
                </p>
                <p className="mt-3 text-base leading-relaxed text-zinc-300">
                  持续学习 · 把想法做成作品 · 在细节里找质感
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3 border-t border-white/[0.06] pt-6 text-zinc-500">
                <FiZap className="shrink-0 text-primary/80" aria-hidden />
                <span className="text-base">动手优先，文档与复盘跟上。</span>
              </div>
            </motion.aside>
          </div>
        </Section>

        {/* 核心技能 */}
        <Section
          id="skills"
          eyebrow="核心技能"
          title="能力地图，用卡片收束。"
          subtitle="每项都是正在加深的方向。"
        >
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s, idx) => (
              <motion.li
                key={s.label}
                className="will-change-transform"
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25, margin: '0px 0px -8% 0px' }}
                variants={listItemReveal}
              >
                <motion.div
                  whileHover={{ y: -5 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                  className="group relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] backdrop-blur-sm"
                >
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(600px circle at var(--mx,50%) var(--my,0%), rgba(108,99,255,0.12), transparent 40%)',
                    }}
                    onMouseMove={(e) => {
                      const el = e.currentTarget.parentElement
                      if (!el) return
                      const r = el.getBoundingClientRect()
                      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
                      el.style.setProperty('--my', `${e.clientY - r.top}px`)
                    }}
                    aria-hidden
                  />
                  <s.icon className="relative text-xl text-zinc-400 transition-colors group-hover:text-zinc-200" />
                  <p className="relative mt-4 font-medium text-white">{s.label}</p>
                  <p className="relative mt-2 text-base text-zinc-500">{s.hint}</p>
                </motion.div>
              </motion.li>
            ))}
          </ul>
        </Section>


        {/* 成长时间线 */}
        <Section
          id="timeline"
          eyebrow="成长时间线"
          title="从出生到现在，一条引导线串起来。"
          subtitle="我的人生"
        >
          <div className="relative pl-8 md:pl-10">
            <div
              className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-white/20 via-primary/20 to-transparent md:left-[17px]"
              aria-hidden
            />
            <ol className="space-y-0">
              {growthTimeline.map((row, idx) => (
                <motion.li
                  key={row.period}
                  className="relative pb-14 last:pb-0 md:pb-16 md:last:pb-2"
                  custom={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.18, margin: '0px 0px -10% 0px' }}
                  variants={listItemReveal}
                >
                  <span
                    className="absolute left-[-5px] top-2 flex h-3 w-3 -translate-x-1/2 rounded-full border border-white/25 bg-zinc-950 shadow-[0_0_14px_rgba(108,99,255,0.45)] md:left-0 md:top-2.5"
                    aria-hidden
                  />
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-10">
                    <time className="shrink-0 font-mono text-sm tracking-wide text-zinc-400">{row.period}</time>
                    <div className="min-w-0 flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-sm md:p-7">
                      <h3 className="text-lg font-medium text-white">{row.title}</h3>
                      <p className="mt-1 text-base text-zinc-500">{row.place}</p>
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{row.line}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </Section>

        {/* 未来方向 */}
        <Section
          id="vision"
          eyebrow="未来方向"
          title="下一步，仍然小步快跑。"
          subtitle="目标具体、可执行即可。"
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.12 }}
            whileHover={{ y: -2, transition: { duration: 0.28, ease: easeOut } }}
            className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 shadow-[0_0_80px_-40px_rgba(108,99,255,0.2)] backdrop-blur-md md:p-10"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-primary/15 to-transparent blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl" />
            <div className="relative max-w-2xl space-y-6 text-zinc-300">
              <p className="text-base leading-relaxed md:text-[17px] md:leading-[1.75]">
                接下来继续把「能用的作品」放在第一位：更扎实的前端基础、更熟练的数据处理链路，以及更安静、更易读的界面。
              </p>
              <ul className="grid gap-4 sm:grid-cols-3">
                {[
                  { icon: FiCode, text: '深化工程化与组件思维' },
                  { icon: FiCpu, text: '补齐计算机系统基础' },
                  { icon: FiTrendingUp, text: '用项目反推学习节奏' },
                ].map((item) => (
                  <li
                    key={item.text}
                    className="flex items-start gap-3 rounded-xl border border-white/[0.05] bg-black/20 px-4 py-3 text-base text-zinc-400"
                  >
                    <item.icon className="mt-0.5 shrink-0 text-zinc-500" aria-hidden />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </Section>
      </div>
    </div>
  )
}
