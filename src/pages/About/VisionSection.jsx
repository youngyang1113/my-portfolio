import { motion } from 'framer-motion'
import { easeOut, visionItems } from './data'
import Section from './Section'

export default function VisionSection() {
  return (
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
            {visionItems.map((item) => (
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
  )
}
