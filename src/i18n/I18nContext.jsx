import { createContext, useContext, useState, useCallback } from 'react'
import { locales, localeNames } from './locales'

const I18nContext = createContext()

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('lang') || 'zh'
    }
    return 'zh'
  })

  const toggleLang = useCallback(() => {
    setLang((l) => {
      const next = l === 'zh' ? 'en' : 'zh'
      localStorage.setItem('lang', next)
      return next
    })
  }, [])

  const t = locales[lang] || locales.zh

  return (
    <I18nContext.Provider value={{ lang, toggleLang, t, localeNames }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
