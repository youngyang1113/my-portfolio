import { motion } from 'framer-motion'
import { skills, listItemReveal } from './data'
import Section from './Section'

/* 技能熟练度百分比 — 与 skills 数组顺序对应 */
const proficiency = [85, 75, 70, 72]

export default function SkillCards() {
  return (
    <Section
      id="skills"
      eyebrow="核心技能"
      title="能力地图，用卡片收束。"
      subtitle="每项都是正在加深的方向。"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s, idx) => {
          const pct = proficiency[idx] || 70
          const circumference = 2 * Math.PI * 22 // r=22
          const dashOffset = circumference - (pct / 100) * circumference

          return (
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
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 420, damping: 28 }}
                className="group relative h-full rounded-2xl border border-white/[0.08] bg-white/[0.025] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset] backdrop-blur-sm transition-all duration-300 hover:border-primary/25 hover:shadow-[0_8px_30px_-12px_rgba(108,99,255,0.2)]"
              >
                {/* 鼠标追光 */}
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

                <div className="relative flex items-start justify-between">
                  {/* 图标 */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary/20 group-hover:text-primary">
                    <s.icon className="text-xl" />
                  </div>

                  {/* 熟练度环 */}
                  <svg
                    className="h-12 w-12 -rotate-90"
                    viewBox="0 0 48 48"
                    aria-label={`${s.label} 熟练度 ${pct}%`}
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="rgba(255,255,255,0.06)"
                      strokeWidth="3"
                    />
                    <motion.circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="url(#skill-gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      initial={{ strokeDashoffset: circumference }}
                      whileInView={{ strokeDashoffset: dashOffset }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: idx * 0.15 }}
                    />
                    <defs>
                      <linearGradient id="skill-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6C63FF" />
                        <stop offset="100%" stopColor="#FF6B6B" />
                      </linearGradient>
                    </defs>
                    <text
                      x="24"
                      y="26"
                      textAnchor="middle"
                      className="fill-white text-[10px] font-medium"
                      style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}
                    >
                      {pct}%
                    </text>
                  </svg>
                </div>

                <p className="relative mt-5 font-medium text-white">{s.label}</p>
                <p className="relative mt-2 text-base text-zinc-500">{s.hint}</p>

                {/* 底部渐变装饰条 */}
                <div className="relative mt-5 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: idx * 0.15 + 0.3 }}
                  />
                </div>
              </motion.div>
            </motion.li>
          )
        })}
      </ul>
    </Section>
  )
}
