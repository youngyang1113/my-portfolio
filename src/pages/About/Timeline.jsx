import { motion } from 'framer-motion'
import { easeOut, growthTimeline } from './data'
import Section from './Section'
import { useI18n } from '../../i18n/I18nContext'
import { useTheme } from '../../context/ThemeContext'

export default function Timeline() {
  const { t, lang } = useI18n()
  const { theme } = useTheme()

  return (
    <Section id="timeline" eyebrow={t.about.timelineEyebrow} title={t.about.timelineTitle} subtitle={t.about.timelineSubtitle}>
      <div className="relative">
        {/* 连接线 */}
        <div className={`absolute left-[18px] top-2 bottom-2 w-px md:left-[22px] ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-primary/40 via-white/10 to-transparent'
            : 'bg-gradient-to-b from-primary/30 via-gray-200 to-transparent'
        }`} />

        <div className="space-y-8">
          {growthTimeline.map((item, i) => (
            <motion.div
              key={item.period + item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, ease: easeOut, delay: i * 0.08 }}
              className="relative flex gap-5 md:gap-8"
            >
              {/* 节点 */}
              <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center md:h-11 md:w-11">
                <div className={`absolute inset-0 rounded-full ${
                  i === growthTimeline.length - 1
                    ? 'bg-primary/20 animate-pulse'
                    : theme === 'dark' ? 'bg-white/[0.06]' : 'bg-gray-100'
                }`} />
                <div className={`relative h-2.5 w-2.5 rounded-full ${
                  i === growthTimeline.length - 1
                    ? 'bg-primary shadow-lg shadow-primary/40'
                    : theme === 'dark' ? 'bg-zinc-500' : 'bg-gray-400'
                }`} />
              </div>

              {/* 内容 */}
              <div className={`flex-1 rounded-xl border p-5 transition-colors md:p-6 ${
                i === growthTimeline.length - 1
                  ? theme === 'dark'
                    ? 'border-primary/20 bg-primary/[0.04]'
                    : 'border-primary/20 bg-primary/[0.02]'
                  : theme === 'dark'
                    ? 'border-white/[0.05] bg-white/[0.015] hover:border-white/[0.1]'
                    : 'border-gray-100 bg-white hover:border-gray-200 shadow-sm'
              }`}>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className={`font-mono text-xs font-medium tracking-wider ${
                    i === growthTimeline.length - 1
                      ? 'text-primary'
                      : theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'
                  }`}>
                    {item.period}
                  </span>
                  <h3 className={`text-base font-semibold ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}>
                    {lang === 'en' ? item.titleEn : item.title}
                  </h3>
                </div>
                <p className={`mt-1 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`}>
                  {lang === 'en' ? item.placeEn : item.place}
                </p>
                <p className={`mt-3 text-sm leading-relaxed ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
                  {lang === 'en' ? item.lineEn : item.line}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  )
}
