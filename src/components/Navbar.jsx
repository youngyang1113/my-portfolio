import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaProjectDiagram, FaUser, FaEnvelope, FaSun, FaMoon, FaGlobe } from 'react-icons/fa'
import { useTheme } from '../context/ThemeContext'
import { useI18n } from '../i18n/I18nContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { lang, toggleLang, t } = useI18n()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    { path: '/', label: t.nav.home, icon: <FaHome /> },
    { path: '/projects', label: t.nav.projects, icon: <FaProjectDiagram /> },
    { path: '/about', label: t.nav.about, icon: <FaUser /> },
    { path: '/contact', label: t.nav.contact, icon: <FaEnvelope /> },
  ]

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? theme === 'dark'
            ? 'border-b border-white/10 bg-dark/85 shadow-lg shadow-black/20 backdrop-blur-xl'
            : 'border-b border-gray-200 bg-white/85 shadow-lg shadow-gray-200/50 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between py-4 md:h-20">
          <Link to="/" className="text-2xl font-bold">
            <span className={theme === 'dark'
              ? 'bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-primary via-gray-800 to-secondary bg-clip-text text-transparent'
            }>
              Rye Young
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center gap-2 rounded-full px-4 py-2 text-base font-medium transition-colors ${
                    active
                      ? 'text-white dark:text-white'
                      : theme === 'dark'
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary/35 to-secondary/25 ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={active ? 'text-primary' : ''}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            })}

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`ml-2 rounded-full p-2 transition-colors ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-yellow-400 hover:bg-white/5'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }`}
              aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            >
              {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>

            {/* Language Toggle */}
            <button
              type="button"
              onClick={toggleLang}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-white/5 border border-white/10'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100 border border-gray-200'
              }`}
              aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              {lang === 'zh' ? 'EN' : '中'}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            {/* Mobile Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className={`rounded-full p-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
              aria-label={theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'}
            >
              {theme === 'dark' ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
            {/* Mobile Language Toggle */}
            <button
              type="button"
              onClick={toggleLang}
              className={`rounded-full px-2 py-1 text-xs font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
              aria-label={lang === 'zh' ? 'Switch to English' : '切换到中文'}
            >
              {lang === 'zh' ? 'EN' : '中'}
            </button>
            <button type="button" className={theme === 'dark' ? 'text-white' : 'text-gray-900'} onClick={() => setMobileMenuOpen((o) => !o)} aria-expanded={mobileMenuOpen} aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}>
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            className={`mb-4 overflow-hidden rounded-2xl border p-2 shadow-2xl backdrop-blur-xl md:hidden ${
              theme === 'dark'
                ? 'border-white/10 bg-dark/95'
                : 'border-gray-200 bg-white/95'
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {navItems.map((item) => {
              const active = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base transition-colors ${
                    active
                      ? 'bg-primary/20 text-primary'
                      : theme === 'dark'
                        ? 'text-gray-300 hover:bg-white/5'
                        : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
