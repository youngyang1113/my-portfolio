import { motion } from 'framer-motion'
import { easeOut, facts } from './data'
import Section from './Section'
import { useI18n } from '../../i18n/I18nContext'
import { useTheme } from '../../context/ThemeContext'

export default function IntroSection() {
  const { t, lang } = useI18n()
  const { theme } = useTheme()

  return (
    <Section id="intro" eyebrow={t.about.introEyebrow} title={t.about.introTitle} subtitle={t.about.introSubtitle}>
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
        {/* 左侧：个人介绍 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className={`space-y-5 lg:col-span-3 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'}`}
        >
          <p className="text-base leading-[1.8] md:text-[17px] md:leading-[1.8]">
            {t.about.introP1}
          </p>
          <p className="text-base leading-[1.8] md:text-[17px] md:leading-[1.8]">
            {t.about.introP2}
          </p>
          <p className={`text-base leading-[1.8] md:text-[17px] md:leading-[1.8] font-medium ${
            theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'
          }`}>
            {t.about.introP3}
          </p>
        </motion.div>

        {/* 右侧：事实卡片 */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.15 }}
          className="lg:col-span-2 grid grid-cols-2 gap-3"
        >
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeOut, delay: 0.1 + i * 0.08 }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              className={`group rounded-xl border p-4 transition-colors ${
                theme === 'dark'
                  ? 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]'
                  : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
              }`}
            >
              <span className="text-2xl" role="img" aria-hidden>{fact.icon}</span>
              <p className={`mt-2 text-sm font-medium ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}>
                {lang === 'en' ? fact.labelEn : fact.label}
              </p>
              <p className={`mt-0.5 text-xs ${theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'}`}>
                {lang === 'en' ? fact.detailEn : fact.detail}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
