import { motion } from 'framer-motion'
import { FiZap } from 'react-icons/fi'
import { listItemReveal } from './data'
import Section from './Section'

export default function IntroSection() {
  return (
    <Section
      id="intro"
      eyebrow="简介"
      title="我喜欢多做少说"
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
  )
}
