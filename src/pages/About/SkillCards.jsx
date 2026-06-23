import { motion } from 'framer-motion'
import { easeOut, skillCategories } from './data'
import Section from './Section'
import { useI18n } from '../../i18n/I18nContext'
import { useTheme } from '../../context/ThemeContext'

export default function SkillCards() {
  const { t, lang } = useI18n()
  const { theme } = useTheme()

  return (
    <Section id="skills" eyebrow={t.about.skillsEyebrow} title={t.about.skillsTitle} subtitle={t.about.skillsSubtitle}>
      <div className="grid gap-5 sm:grid-cols-2">
        {skillCategories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: easeOut, delay: i * 0.1 }}
            whileHover={{ y: -3, transition: { duration: 0.22 } }}
            className={`group relative overflow-hidden rounded-2xl border p-6 transition-all ${
              cat.isLearning
                ? theme === 'dark'
                  ? 'border-dashed border-primary/30 bg-primary/[0.03]'
                  : 'border-dashed border-primary/30 bg-primary/[0.02]'
                : theme === 'dark'
                  ? 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
                  : 'border-gray-200 bg-white hover:border-gray-300 shadow-sm'
            }`}
          >
            {/* Header */}
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                cat.isLearning
                  ? 'bg-primary/15 text-primary'
                  : theme === 'dark'
                    ? 'bg-white/[0.06] text-zinc-400'
                    : 'bg-gray-100 text-gray-500'
              }`}>
                <cat.icon size={18} aria-hidden />
              </div>
              <div className="flex-1">
                <h3 className={`text-sm font-semibold ${theme === 'dark' ? 'text-zinc-200' : 'text-gray-800'}`}>
                  {lang === 'en' ? cat.labelEn : cat.label}
                </h3>
                <span className={`text-xs ${
                  cat.isLearning ? 'text-primary' : theme === 'dark' ? 'text-zinc-500' : 'text-gray-400'
                }`}>
                  {cat.isLearning
                    ? (lang === 'en' ? t.about.skillLearning : t.about.skillLearning)
                    : (lang === 'en' ? cat.levelEn : cat.level)
                  }
                </span>
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="flex flex-wrap gap-2">
              {cat.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                    cat.isLearning
                      ? theme === 'dark'
                        ? 'bg-primary/10 text-primary/80'
                        : 'bg-primary/10 text-primary'
                      : theme === 'dark'
                        ? 'bg-white/[0.05] text-zinc-400 group-hover:bg-white/[0.08]'
                        : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Progress bar */}
            <div className="mt-5">
              <div className={`h-1.5 w-full overflow-hidden rounded-full ${
                theme === 'dark' ? 'bg-white/[0.06]' : 'bg-gray-100'
              }`}>
                <motion.div
                  className={`h-full rounded-full ${
                    cat.isLearning
                      ? 'bg-gradient-to-r from-primary/60 to-primary/40'
                      : 'bg-gradient-to-r from-primary to-secondary'
                  }`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${cat.percent}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: easeOut, delay: 0.3 + i * 0.1 }}
                />
              </div>
            </div>

            {/* Learning badge */}
            {cat.isLearning && (
              <div className="pointer-events-none absolute right-4 top-4">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                  {lang === 'en' ? 'Learning' : '学习中'}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  )
}
