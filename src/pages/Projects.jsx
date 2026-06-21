import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'

const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const projects = [
    {
      id: 1,
      title: 'Official Live Page',
      description: '基于 React + Vite 构建的官方直播页面，支持响应式布局与流畅交互体验',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      category: 'frontend',
      technologies: ['React', 'Vite', 'JavaScript', 'CSS'],
      github: 'https://github.com/youngyang1113/official-live-page',
      demo: 'https://youngyang1113.github.io/official-live-page/',
      featured: true
    },
    {
      id: 2,
      title: 'AI 化学虚拟实验室',
      description: '智能化学实验模拟平台，支持拖拽试剂到反应池、实时反应动画（气泡/沉淀）、教师控制台记录与任务模式',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop',
      category: 'ai',
      technologies: ['HTML', 'CSS', 'JavaScript', 'AI'],
      github: 'https://github.com/youngyang1113/ChemistryLab',
      demo: 'https://youngyang1113.github.io/ChemistryLab/',
      featured: true
    },
    {
      id: 3,
      title: '家教辅导平台',
      description: '在线家教匹配与辅导平台，支持师生匹配、课程管理、在线辅导等功能',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      github: 'https://github.com/youngyang1113/tutor_platform',
      demo: '',
      featured: true
    },
    {
      id: 4,
      title: '电商平台',
      description: '基于微服务架构的下一代电商解决方案，支持高并发、实时数据处理',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
      category: 'fullstack',
      technologies: ['React', 'Node.js', 'MongoDB', 'Docker'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      id: 5,
      title: 'AI 聊天应用',
      description: '集成 GPT 模型的智能对话系统，提供个性化用户体验',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
      category: 'ai',
      technologies: ['Python', 'TensorFlow', 'React', 'WebSocket'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      id: 6,
      title: '数据可视化仪表盘',
      description: '实时监控和分析平台，提供直观的数据展示和报表功能',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      category: 'frontend',
      technologies: ['Vue.js', 'D3.js', 'Express', 'PostgreSQL'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      id: 7,
      title: '移动端社交应用',
      description: '跨平台移动社交应用，支持即时通讯、动态分享等功能',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop',
      category: 'mobile',
      technologies: ['React Native', 'Firebase', 'Node.js'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    }
  ]

  const categories = [
    { key: 'all', label: '全部' },
    { key: 'frontend', label: '前端' },
    { key: 'ai', label: 'AI' },
    { key: 'fullstack', label: '全栈' }
  ]

  const filteredProjects = projects.filter(project => {
    const matchesCategory = filter === 'all' || project.category === filter
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen pt-20 px-4 pb-20">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              我的项目
            </span>
          </h1>
          <p className="text-lg text-gray-400 md:text-xl">
            按类别浏览，或搜索关键词。
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setFilter(cat.key)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === cat.key
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="搜索项目..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:border-primary transition-colors w-64"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ScrollReveal>
                  <motion.div
                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
                    whileHover={{ y: -5 }}
                    onClick={() => {
                      if (project.demo) {
                        window.open(project.demo, '_blank', 'noopener,noreferrer')
                      } else if (project.github) {
                        window.open(project.github, '_blank', 'noopener,noreferrer')
                      }
                    }}
                  >
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r from-primary to-secondary rounded-full text-sm font-semibold">
                        精选
                      </div>
                    )}
                    
                    <div className="screenshot-frame h-48 overflow-hidden relative">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      {/* hover 渐变遮罩 */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* 点击提示 */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="px-4 py-2 bg-black/60 rounded-full text-sm text-white backdrop-blur-sm">
                          {project.demo ? '点击访问演示' : '点击访问仓库'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="mb-4 text-base leading-relaxed text-gray-400">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map(tech => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <FaGithub />
                          <span>源码</span>
                        </a>
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center space-x-2 text-gray-400 hover:text-primary transition-colors"
                          >
                            <FaExternalLinkAlt />
                            <span>演示</span>
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
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-2xl text-gray-400">没有找到相关项目</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Projects