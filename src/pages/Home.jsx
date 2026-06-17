import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaArrowRight, FaCode, FaWeixin } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'
import gsap from 'gsap'

const Home = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      '.hero-element',
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2,
        ease: "power3.out"
      }
    )
  }, [])

  const skills = [
    'React', 'Vue.js', 'Node.js', 'Python', 
    'TypeScript', 'Docker', 'AWS', 'MongoDB',
    'GraphQL', 'Next.js', 'Tailwind CSS', 'Git'
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* 背景层 */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark to-secondary/20" />
        
        {/* 点阵网格背景 */}
        <div className="absolute inset-0 hero-grid opacity-40" />

        {/* 大面积光晕装饰 */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/[0.05] rounded-full blur-[100px] pointer-events-none" />

        <div ref={heroRef} className="text-center relative z-10 max-w-4xl mx-auto">
          {/* 头像区域 */}
          <motion.div
            className="hero-element mb-8"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative w-36 h-36 mx-auto">
              {/* 外层旋转光环 */}
              <div className="absolute inset-[-8px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow opacity-60" />
              {/* 头像主体 */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-secondary p-[3px]">
                <div className="w-full h-full rounded-full bg-dark flex items-center justify-center">
                  {/* 替换下方 src 为你的照片 */}
                  {/* <img src="/images/avatar.jpg" alt="Rye Young" className="w-full h-full rounded-full object-cover" /> */}
                  <span className="text-4xl font-bold bg-gradient-to-br from-primary via-white to-secondary bg-clip-text text-transparent select-none">
                    RY
                  </span>
                </div>
              </div>
              {/* 底部发光 */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-primary/30 rounded-full blur-xl" />
            </div>
          </motion.div>

          <h1 className="hero-element text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              你好，我是
            </span>
            <br />
            <TypeAnimation
              sequence={[
                '渊博 杨',
                2000,
                'Web 开发者',
                2000,
                '前端与数据可视化',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            />
          </h1>

          <p className="hero-element text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            做可读、可用的界面，把数据和交互讲清楚。
          </p>

          <div className="hero-element flex items-center justify-center space-x-4 mb-12">
            <Link
              to="/projects"
              className="group px-8 py-3 bg-gradient-to-r from-primary to-secondary rounded-full font-semibold hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center space-x-2"
            >
              <span>查看项目</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-gray-600 rounded-full font-semibold hover:border-primary hover:text-primary transition-all duration-300"
            >
              联系我
            </Link>
          </div>

          <div className="hero-element flex items-center justify-center space-x-6">
            <a
              href="https://github.com/youngyang1113"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 个人主页"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <FaGithub size={24} />
            </a>
            <span
              className="text-gray-400 hover:text-green-400 transition-colors transform hover:scale-110 cursor-default flex items-center space-x-1"
              title="微信号: yb1113y"
            >
              <FaWeixin size={24} />
              <span className="text-sm">yb1113y</span>
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400/50 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-gradient-to-b from-primary to-secondary rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12 md:text-4xl">
              技术栈
            </h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <ScrollReveal key={skill}>
                <motion.div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center hover:border-primary/50 transition-all duration-300 cursor-default"
                  whileHover={{ scale: 1.05, rotate: [-1, 1, -1, 0] }}
                >
                  <FaCode className="mx-auto mb-3 text-primary" size={24} />
                  <h3 className="text-base font-semibold md:text-lg">{skill}</h3>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Preview */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl font-bold text-center mb-12 md:text-4xl">
              精选项目
            </h2>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <ScrollReveal>
              <a href="https://github.com/youngyang1113/official-live-page" target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="screenshot-frame h-48 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop" 
                      alt="Official Live Page"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">Official Live Page</h3>
                    <p className="mb-4 text-base leading-relaxed text-gray-400">
                      基于 React + Vite 构建的官方直播页面，支持响应式布局与流畅交互体验。
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
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="screenshot-frame h-48 overflow-hidden relative">
                    <img 
                      src="https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop" 
                      alt="AI 化学虚拟实验室"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">AI 化学虚拟实验室</h3>
                    <p className="mb-4 text-base leading-relaxed text-gray-400">
                      智能化学实验模拟平台，支持拖拽试剂、实时反应动画与教师控制台。
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
              <span>查看所有项目</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home