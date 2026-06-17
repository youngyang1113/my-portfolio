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
  )
}
