import {
  FiLayout,
  FiGitBranch,
  FiDatabase,
  FiLayers,
  FiCode,
  FiCpu,
  FiTrendingUp,
} from 'react-icons/fi'

export const easeOut = [0.22, 1, 0.36, 1]

export const sectionRootVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.16, delayChildren: 0.06 },
  },
}

export const sectionBlockVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: easeOut },
  },
}

export const listItemReveal = {
  hidden: { opacity: 0, y: 32 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.58, ease: easeOut, delay: i * 0.1 },
  }),
}

export const skills = [
  { label: '前端与交互', icon: FiLayout, hint: 'React · 响应式 · 动效' },
  { label: '工程化', icon: FiGitBranch, hint: 'Vite · 组件化 · 可维护结构' },
  { label: '数据与脚本', icon: FiDatabase, hint: 'Python · 采集与分析' },
  { label: '视觉与信息', icon: FiLayers, hint: '版式 · 数据可视化' },
]

export const projects = [
  {
    period: '2024',
    title: '个人作品集站点',
    summary: 'React + Vite 搭建，强调可读布局与轻量动效，作为长期迭代的展示入口。',
    tags: ['React', 'Vite', 'Tailwind'],
  },
  {
    period: '2023 — 2024',
    title: '数据驱动的网页作品',
    summary: '从整理数据到页面呈现，练习把复杂信息压缩成一眼能懂的层次。',
    tags: ['Python', 'Web', '可视化'],
  },
  {
    period: '课余',
    title: '小型工具与实验页',
    summary: '用短周期原型验证想法：表单、图表、交互状态——能跑、能改、能复用。',
    tags: ['原型', 'UX'],
  },
]

export const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`.replace(/\/{2,}/g, '/')

export const growthTimeline = [
  {
    period: ' 2005',
    title: '出生',
    place: '宁夏',
    line: '在家乡成长，从小习惯把好奇拆成「能问出口的问题」和「能动手试的小步骤」。',
  },
  {
    period: '2011 — 2020',
    title: '我的小学和初中',
    place: '宁夏',
    line: '理科基础打牢，也开始认真思考长期方向：更想把时间花在能做出东西来的路径上。',
  },
  {
    period: '2020 — 2023',
    title: '高中阶段',
    place: '宁夏六盘山高级中学',
    line: '担任校学生会社团理事长，组织发表过《六盘草》校刊，参与学生工作与活动组织，锻炼表达与协作；对「用技术解决问题」的兴趣变得更具体。',
  },
  {
    period: '2023 — 至今',
    title: '计算机科学与技术 · 本科在读',
    place: '陕西师范大学',
    line: '系统学习计算机基础；同时把更多时间花在动手做作品与自学前端、数据相关技术上。',
  },
]

export const visionItems = [
  { icon: FiCode, text: '深化工程化与组件思维' },
  { icon: FiCpu, text: '补齐计算机系统基础' },
  { icon: FiTrendingUp, text: '用项目反推学习节奏' },
]
