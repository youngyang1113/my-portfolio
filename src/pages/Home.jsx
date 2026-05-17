import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaInstagram, FaArrowRight, FaCode } from 'react-icons/fa'
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
      <section className="relative h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-dark to-secondary/20" />
        
        <div ref={heroRef} className="text-center relative z-10 max-w-4xl mx-auto">
          <motion.div
            className="hero-element mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-primary to-secondary p-1">
              <div className="w-full h-full rounded-full bg-dark flex items-center justify-center text-4xl">
                👨‍💻
              </div>
            </div>
          </motion.div>

          <h1 className="hero-element text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              你好，我是
            </span>
            <br />
            <TypeAnimation
              sequence={[
                'Rye Young',
                2000,
                '一个喜欢把想法变成现实的',
                2000,
                'Web 开发者',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            />
          </h1>

          <p className="hero-element text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
            做可读、可用的界面，把想法和现实连接起来。
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
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://www.instagram.com/rye_yb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white transition-colors transform hover:scale-110"
            >
              <FaInstagram size={24} />
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
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
            {[1, 2].map((item) => (
              <ScrollReveal key={item}>
                <motion.div
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-4xl">🚀</span>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">项目 {item}</h3>
                    <p className="mb-4 text-base leading-relaxed text-gray-400">
                      占位卡片，后续替换为真实项目简介。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {['React', 'Node.js', 'MongoDB'].map(tech => (
                        <span key={tech} className="px-3 py-1 bg-primary/20 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
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