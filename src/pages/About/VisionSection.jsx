import { motion } from 'framer-motion'
import { easeOut, visionItems } from './data'
import Section from './Section'
import { useI18n } from '../../i18n/I18nContext'
import { useTheme } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'
import { FaGithub, FaEnvelope } from 'react-icons/fa'
import { FiMessageSquare } from 'react-icons/fi'

export default function VisionSection() {
  const { t, lang } = useI18n()
  const { theme } = useTheme()

  return (
    <Section id="vision" eyebrow={t.about.visionEyebrow} title={t.about.visionTitle} subtitle={t.about.visionSubtitle}>
      <div className="space-y-12">
        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: easeOut, delay: 0.12 }}
          whileHover={{ y: -2, transition: { duration: 0.28, ease: easeOut } }}
          className={`relative overflow-hidden rounded-2xl border p-8 shadow-[0_0_80px_-40px_rgba(108,99,255,0.2)] backdrop-blur-md md:p-10 ${
            theme === 'dark' ? 'border-white/[0.08] bg-white/[0.03]' : 'border-gray-200 bg-white shadow-sm'
          }`}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-to-br from-primary/15 to-transparent blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-48 w-48 rounded-full bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl" />
          <div className={`relative max-w-2xl space-y-6 ${theme === 'dark' ? 'text-zinc-300' : 'text-gray-600'}`}>
            <p className="text-base leading-relaxed md:text-[17px] md:leading-[1.75]">{t.about.visionP}</p>
            <ul className="grid gap-4 sm:grid-cols-3">
              {visionItems.map((item) => (
                <li
                  key={item.text}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-base ${
                    theme === 'dark'
                      ? 'border-white/[0.05] bg-black/20 text-zinc-400'
                      : 'border-gray-100 bg-gray-50 text-gray-500'
                  }`}
                >
                  <item.icon className="mt-0.5 shrink-0 text-zinc-500" aria-hidden />
                  <span>{lang === 'en' ? item.textEn : item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: easeOut }}
          className={`rounded-2xl border p-8 text-center md:p-10 ${
            theme === 'dark'
              ? 'border-white/[0.06] bg-white/[0.02]'
              : 'border-gray-200 bg-white shadow-sm'
          }`}
        >
          <h3 className={`text-xl font-semibold md:text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            {t.about.ctaTitle}
          </h3>
          <p className={`mt-3 text-sm leading-relaxed md:text-base ${theme === 'dark' ? 'text-zinc-400' : 'text-gray-500'}`}>
            {t.about.ctaSubtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:youngyb0109@gmail.com"
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <FaEnvelope size={14} aria-hidden />
              {t.about.ctaEmail}
            </a>
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all hover:scale-105 ${
                theme === 'dark'
                  ? 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10 hover:text-white'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <FiMessageSquare size={14} aria-hidden />
              {t.about.ctaGuestbook}
            </Link>
            <a
              href="https://github.com/youngyang1113"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40"
            >
              <FaGithub size={14} aria-hidden />
              {t.about.ctaGithub}
            </a>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
