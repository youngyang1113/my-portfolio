import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import DynamicGradientBackground from './components/DynamicGradientBackground'
import ParticleBackground from './components/ParticleBackground'
import LoadingScreen from './components/LoadingScreen'
import ScrollProgressBar from './components/ScrollProgressBar'
import './App.css'

const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))

const pageTransition = {
  initial: { opacity: 0, y: 18, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(4px)' },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const handleLoad = () => setLoading(false)

    if (document.readyState === 'complete') {
      handleLoad()
    } else {
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
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
            <ScrollProgressBar />
            <Navbar />
            <main className="main-content">
              <AnimatePresence mode="wait">
                <Suspense fallback={null}>
                  <Routes location={location} key={location.pathname}>
                    <Route
                      path="/"
                      element={
                        <motion.div {...pageTransition}>
                          <Home />
                        </motion.div>
                      }
                    />
                    <Route
                      path="/projects"
                      element={
                        <motion.div {...pageTransition}>
                          <Projects />
                        </motion.div>
                      }
                    />
                    <Route
                      path="/about"
                      element={
                        <motion.div {...pageTransition}>
                          <About />
                        </motion.div>
                      }
                    />
                    <Route
                      path="/contact"
                      element={
                        <motion.div {...pageTransition}>
                          <Contact />
                        </motion.div>
                      }
                    />
                    <Route path="/message" element={<Navigate to="/contact" replace />} />
                  </Routes>
                </Suspense>
              </AnimatePresence>
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
