import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaHome, FaProjectDiagram, FaUser, FaEnvelope } from 'react-icons/fa'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navItems = [
    { path: '/', label: '首页', icon: <FaHome /> },
    { path: '/projects', label: '项目', icon: <FaProjectDiagram /> },
    { path: '/about', label: '关于', icon: <FaUser /> },
    { path: '/contact', label: '联系', icon: <FaEnvelope /> },
  ]

  return (
    <motion.nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-dark/85 shadow-lg shadow-black/20 backdrop-blur-xl' : 'border-b border-transparent bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between py-4 md:h-20">
          <Link to="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-primary via-white to-secondary bg-clip-text text-transparent">
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
                    active ? 'text-white' : 'text-gray-400 hover:text-white'
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
          </div>

          <button type="button" className="text-white md:hidden" onClick={() => setMobileMenuOpen((o) => !o)} aria-expanded={mobileMenuOpen}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div
            className="mb-4 overflow-hidden rounded-2xl border border-white/10 bg-dark/95 p-2 shadow-2xl backdrop-blur-xl md:hidden"
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
                    active ? 'bg-primary/20 text-primary' : 'text-gray-300 hover:bg-white/5'
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
