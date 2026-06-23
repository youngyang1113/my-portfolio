import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaArrowRight, FaCode, FaWeixin } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'
import { useI18n } from '../i18n/I18nContext'
import { useTheme } from '../context/ThemeContext'

const heroStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 },
  },
}

const heroItem = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
}

const Home = () => {
  const { t } = useI18n()
  const { theme } = useTheme()

  const skills = [
    'React', 'Vue.js', 'Node.js', 'Python', 
    'TypeScript', 'Docker', 'AWS', 'MongoDB',
    'GraphQL', 'Next.js', 'Tailwind CSS', 'Git'
  ]

  const cardBg = theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
  const cardText = theme === 'dark' ? '' : 'text-gray-800'
  const mutedText = theme === 'dark' ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? 'from-primary/20 via-dark to-secondary/20' : 'from-primary/[0.06] via-transparent to-secondary/[0.04]'}`} />
        <div className="absolute inset-0 hero-grid opacity-40" />
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none ${theme === 'dark' ? 'bg-primary/[0.07]' : 'bg-primary/[0.03]'}`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none ${theme === 'dark' ? 'bg-secondary/[0.05]' : 'bg-secondary/[0.02]'}`} />

        <motion.div
          className="text-center relative z-10 max-w-4xl mx-auto"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="mb-8" variants={heroItem}>
            <div className="relative w-36 h-36 mx-auto">
              <div className={`absolute inset-[-8px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow opacity-60`} />
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary p-[3px]">
                <div className={`w-full h-full rounded-full flex items-center justify-center ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                  <img src="/personalpic.jpg" alt={t.about.name} className="w-full h-full rounded-full object-cover" />
                </div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-primary/30 rounded-full blur-xl" />
            </div>
          </motion.div>

          <motion.h1 className="text-5xl md:text-7xl font-bold mb-6" variants={heroItem}>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t.home.greeting}
            </span>
            <br />
            <TypeAnimation
              sequence={t.home.roles}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            />
          </motion.h1>

          <motion.p className={`text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed ${mutedText}`} variants={heroItem}>
            {t.home.tagline}
          </motion.p>

          <motion.div className="flex items-center justify-center space-x-4 mb-12" variants={heroItem}>
            <Link
              to="/projects"
              className="group px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center space-x-2 text-white"
            >
              <span>{t.home.viewProjects}</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className={`px-8 py-3 border rounded-full font-semibold hover:border-primary hover:text-primary transition-all duration-300 ${
                theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
              }`}
            >
              {t.home.contactMe}
            </Link>
          </motion.div>

          <motion.div className="flex items-center justify-center space-x-6" variants={heroItem}>
            <a
              href="https://github.com/youngyang1113"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className={`${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors transform hover:scale-110`}
            >
              <FaGithub size={24} />
            </a>
            <span
              className={`${theme === 'dark' ? 'text-gray-400 hover:text-green-400' : 'text-gray-500 hover:text-green-600'} transition-colors transform hover:scale-110 cursor-default flex items-center space-x-1`}
              title="WeChat: yb1113y"
            >
              <FaWeixin size={24} />
              <span className="text-sm">yb1113y</span>
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className={`w-6 h-10 border-2 rounded-full flex justify-center ${theme === 'dark' ? 'border-gray-400/50' : 'border-gray-300 scroll-indicator'}`}>
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-primary to-secondary rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Projects Preview */}
      <section className={`py-20 px-4 bg-gradient-to-b ${theme === 'dark' ? 'from-transparent via-primary/5 to-transparent' : 'from-transparent via-primary/[0.02] to-transparent'}`}>
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className={`text-3xl font-bold text-center mb-12 md:text-4xl ${theme === 'dark' ? '' : 'text-gray-900'}`}>
              {t.home.featuredProjects}
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <ScrollReveal>
              <a href="https://github.com/youngyang1113/official-live-page" target="_blank" rel="noopener noreferrer">
                <motion.div
                  className={`${cardBg} border rounded-xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="screenshot-frame h-48 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop" 
                      alt={t.home.project1Title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${cardText}`}>{t.home.project1Title}</h3>
                    <p className={`mb-4 text-base leading-relaxed ${mutedText}`}>
                      {t.home.project1Desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Vite', 'JavaScript'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-primary/20 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </a>
            </ScrollReveal>
            <ScrollReveal>
              <a href="https://github.com/youngyang1113/easy-lab" target="_blank" rel="noopener noreferrer">
                <motion.div
                  className={`${cardBg} border rounded-xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-all duration-300`}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="screenshot-frame h-48 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop" 
                      alt={t.home.project2Title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className={`text-xl font-bold mb-2 ${cardText}`}>{t.home.project2Title}</h3>
                    <p className={`mb-4 text-base leading-relaxed ${mutedText}`}>
                      {t.home.project2Desc}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['HTML', 'CSS', 'JavaScript', 'AI'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-primary/20 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </a>
            </ScrollReveal>
          </div>
          
          <div className="text-center">
            <Link
              to="/projects"
              className="inline-flex items-center space-x-2 text-primary hover:text-secondary transition-colors"
            >
              <span>{t.home.viewAll}</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className={`text-3xl font-bold text-center mb-12 md:text-4xl ${theme === 'dark' ? '' : 'text-gray-900'}`}>
              {t.home.techStack}
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <ScrollReveal key={skill}>
                <motion.div
                  className={`${cardBg} backdrop-blur-sm border rounded-lg p-6 text-center hover:border-primary/50 transition-all duration-300 cursor-default`}
                  whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                >
                  <FaCode className="mx-auto mb-3 text-primary" size={24} />
                  <h3 className={`text-base font-semibold md:text-lg ${cardText}`}>{skill}</h3>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
