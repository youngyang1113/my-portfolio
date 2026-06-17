import { motion } from 'framer-motion'
import { growthTimeline, listItemReveal } from './data'
import Section from './Section'

export default function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="成长时间线"
      title="从出生到现在，一条引导线串起来。"
      subtitle="我的人生"
    >
      <div className="relative pl-8 md:pl-10">
        {/* 连接线 — 渐变 + 发光 */}
        <div
          className="absolute bottom-0 left-[15px] top-0 w-px bg-gradient-to-b from-primary/30 via-primary/15 to-transparent md:left-[17px]"
          aria-hidden
        />
        {/* 线条外发光 */}
        <div
          className="absolute bottom-0 left-[14px] top-0 w-[3px] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-sm md:left-[16px]"
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
              {/* 节点 — 发光圆点 + 脉冲环 */}
              <span className="absolute left-[-5px] top-2 -translate-x-1/2 md:left-0 md:top-2.5" aria-hidden>
                {/* 外层脉冲环 */}
                <span className="absolute inset-[-6px] rounded-full bg-primary/20 animate-timeline-pulse" />
                {/* 发光圆点 */}
                <span className="relative flex h-3.5 w-3.5 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_12px_rgba(108,99,255,0.6),0_0_24px_rgba(108,99,255,0.25)]" />
              </span>

              <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-10">
                <time className="shrink-0 font-mono text-sm tracking-wide text-primary/70 md:text-zinc-400">
                  {row.period}
                </time>
                <motion.div
                  className="group min-w-0 flex-1 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.035] hover:shadow-[0_0_30px_-8px_rgba(108,99,255,0.15)] md:p-7"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  <h3 className="text-lg font-medium text-white group-hover:text-primary/90 transition-colors">
                    {row.title}
                  </h3>
                  <p className="mt-1 text-base text-zinc-500">{row.place}</p>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400">{row.line}</p>
                </motion.div>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  )
}
