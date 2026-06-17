import { motion } from 'framer-motion'
import { skills, listItemReveal } from './data'
import Section from './Section'

export default function SkillCards() {
  return (
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
  )
}
