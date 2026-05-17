import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import DynamicGradientBackground from './components/DynamicGradientBackground'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Contact from './pages/Contact'
import './App.css'

export default function App() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="app">
      <DynamicGradientBackground />
      <ParticleBackground />
      <AnimatePresence mode="wait">
        {loading ? (
          <LoadingScreen key="loading" />
        ) : (
          <motion.div
            key="content"
            className="app-inner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45 }}
          >
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/message" element={<Navigate to="/contact" replace />} />
              </Routes>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
