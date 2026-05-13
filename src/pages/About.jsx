import React from 'react'
import { motion } from 'framer-motion'
import { FaBriefcase, FaGraduationCap, FaHeart, FaCode } from 'react-icons/fa'
import ScrollReveal from '../components/ScrollReveal'

const About = () => {
  const experiences = [
    {
      type: 'work',
      icon: <FaBriefcase />,
      title: '高级前端工程师',
      company: '科技公司 A',
      period: '2022 - 至今',
      description: '负责核心产品的前端架构设计和开发，带领团队完成多个重要项目',
    },
    {
      type: 'work',
      icon: <FaBriefcase />,
      title: '全栈开发工程师',
      company: '科技公司 B',
      period: '2020 - 2022',
      description: '参与多个大型 Web 应用的开发，使用 React 和 Node.js 技术栈',
    },
    {
      type: 'education',
      icon: <FaGraduationCap />,
      title: '计算机科学 硕士',
      company: '某知名大学',
      period: '2018 - 2020',
      description: '研究方向：人工智能与机器学习',
    },
    {
      type: 'education',
      icon: <FaGraduationCap />,
      title: '软件工程 学士',
      company: '某知名大学',
      period: '2014 - 2018',
      description: 'GPA: 3.8/4.0，获得优秀毕业生称号',
    },
  ]

  return (
    <div className="min-h-screen px-4 pb-24 pt-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="mb-4 text-5xl font-bold md:text-6xl">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              关于我
            </span>
          </h1>
          <p className="text-lg text-gray-400">技术、经历与一点个人态度</p>
        </motion.div>

        <div className="mb-20 grid gap-12 md:grid-cols-2">
          <ScrollReveal>
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">你好！👋</h2>
              <p className="text-lg leading-relaxed text-gray-400">
                我是一名充满激情的全栈开发者，拥有超过 5 年的 Web 开发经验。我热爱将创意转化为现实，通过代码构建优雅、高效的数字产品。
              </p>
              <p className="text-lg leading-relaxed text-gray-400">
                在工作之余，我喜欢参与开源项目、分享技术博客，以及探索最新的技术趋势。我相信持续学习是保持竞争力的关键。
              </p>
              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <FaHeart className="text-secondary" />
                  <span className="text-gray-400">开源</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaCode className="text-primary" />
                  <span className="text-gray-400">编码</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-[0_0_40px_-12px_rgba(108,99,255,0.35)] backdrop-blur-md">
              <h3 className="mb-6 text-2xl font-bold">能力雷达</h3>
              <div className="space-y-4">
                {[
                  { name: '前端开发', level: 95, color: 'from-primary to-primary' },
                  { name: '后端开发', level: 85, color: 'from-primary to-secondary' },
                  { name: 'UI/UX 设计', level: 75, color: 'from-secondary to-primary' },
                  { name: 'DevOps', level: 70, color: 'from-secondary to-secondary' },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>{skill.name}</span>
                      <span className="text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.15 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <h2 className="mb-12 text-center text-3xl font-bold">经历时间线</h2>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-primary via-secondary to-primary/30 md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ScrollReveal key={`${exp.title}-${exp.period}`}>
                <div
                  className={`flex flex-col items-center gap-6 md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div
                    className={`hidden w-1/2 md:block ${index % 2 === 0 ? 'pr-12 text-right' : 'pl-12 text-left'}`}
                  />

                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary/60 bg-dark shadow-[0_0_20px_rgba(108,99,255,0.5)] md:absolute md:left-1/2 md:-translate-x-1/2">
                    <span className="text-primary">{exp.icon}</span>
                  </div>

                  <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-14 md:text-right' : 'md:pl-14 md:text-left'}`}>
                    <motion.div
                      className="inline-block rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md transition-shadow hover:shadow-[0_0_30px_-8px_rgba(108,99,255,0.4)]"
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`mb-2 flex flex-wrap items-center gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                        <span className="text-primary">{exp.icon}</span>
                        <span className="text-sm text-gray-400">{exp.period}</span>
                      </div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="mt-1 text-sm text-primary/90">{exp.company}</p>
                      <p className="mt-3 text-gray-400">{exp.description}</p>
                    </motion.div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
