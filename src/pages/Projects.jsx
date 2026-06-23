import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'
import { useI18n } from '../i18n/I18nContext'
import { useTheme } from '../context/ThemeContext'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { t } = useI18n()
  const { theme } = useTheme()

  const projects = [
    {
      id: 1,
      title: 'Official Live Page',
      description: t.lang === 'zh'
        ? '基于 React + Vite 构建的官方直播页面，支持响应式布局与流畅交互体验'
        : 'A live streaming page built with React + Vite. Responsive layout and smooth interactions.',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop',
      category: 'frontend',
      technologies: ['React', 'Vite', 'JavaScript', 'CSS'],
      github: 'https://github.com/youngyang1113/official-live-page',
      demo: 'https://youngyang1113.github.io/official-live-page/',
      featured: true
    },
    {
      id: 2,
      title: t.lang === 'zh' ? 'AI 化学虚拟实验室' : 'AI Chemistry Virtual Lab',
      description: t.lang === 'zh'
        ? '智能化学实验模拟平台，支持拖拽试剂到反应池、实时反应动画（气泡/沉淀）、教师控制台记录与任务模式'
        : 'Smart chemistry experiment simulation with drag-and-drop reagents, real-time reaction animations, and teacher console.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
      category: 'ai',
      technologies: ['HTML', 'CSS', 'JavaScript', 'AI'],
      github: 'https://github.com/youngyang1113/ChemistryLab',
      demo: 'https://youngyang1113.github.io/ChemistryLab/',
      featured: true
    },
    {
      id: 3,
      title: t.lang === 'zh' ? '家教辅导平台' : 'Tutor Platform',
      description: t.lang === 'zh'
        ? '在线家教匹配与辅导平台，支持师生匹配、课程管理、在线辅导等功能'
        : 'Online tutor matching and coaching platform with student-teacher matching, course management, and online tutoring.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/youngyang1113/tutor_platform',
      demo: '',
      featured: true
    },
  ]

  const categories = [
    { key: 'all', label: t.projects.all },
    { key: 'frontend', label: t.projects.frontend },
    { key: 'ai', label: t.projects.ai },
    { key: 'fullstack', label: t.projects.fullstack },
  ]

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const cardBg = theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200 shadow-sm'
  const cardText = theme === 'dark' ? '' : 'text-gray-800'
  const mutedText = theme === 'dark' ? 'text-gray-400' : 'text-gray-500'

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{t.projects.title}</span>
          </h1>
          <p className={`text-lg md:text-xl ${mutedText}`}>{t.projects.subtitle}</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button key={cat.key} onClick={() => setFilter(cat.key)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === cat.key ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : theme === 'dark' ? 'bg-white/5 text-gray-400 hover:bg-white/10'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>{cat.label}</button>
            ))}
          </div>
          <div className="relative">
            <FaSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${mutedText}`} />
            <input type="text" placeholder={t.projects.search} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
              className={`pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:border-primary transition-colors w-64 ${
                theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200'}`} />
          </div>
        </div>

        <motion.div className="grid md:grid-cols-2 gap-8" layout>
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div key={project.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3 }}>
                <ScrollReveal>
                  <motion.div className={`group relative ${cardBg} border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer`}
                    whileHover={{ y: -5 }}
                    onClick={() => { if (project.demo) window.open(project.demo, '_blank', 'noopener,noreferrer'); else if (project.github) window.open(project.github, '_blank', 'noopener,noreferrer'); }}>
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-semibold text-white">{t.projects.featured}</div>
                    )}
                    <div className="screenshot-frame h-48 overflow-hidden relative">
                      <img src={project.image} alt={project.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-4 py-2 bg-black/60 rounded-full text-sm text-white backdrop-blur-sm">
                          {project.demo ? t.projects.clickDemo : t.projects.clickRepo}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className={`text-xl font-bold mb-2 ${cardText}`}>{project.title}</h3>
                      <p className={`mb-4 text-base leading-relaxed ${mutedText}`}>{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map(tech => (
                          <span key={tech} className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">{tech}</span>
                        ))}
                      </div>
                      <div className="flex items-center space-x-4">
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                          className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}>
                          <FaGithub /><span>{t.projects.source}</span>
                        </a>
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                            className={`flex items-center space-x-2 ${theme === 'dark' ? 'text-gray-400 hover:text-primary' : 'text-gray-500 hover:text-primary'} transition-colors`}>
                            <FaExternalLinkAlt /><span>{t.projects.demo}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </ScrollReveal>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className={`text-2xl ${mutedText}`}>{t.projects.empty}</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Projects
