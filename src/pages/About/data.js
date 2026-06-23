import {
  FiLayout,
  FiGitBranch,
  FiDatabase,
  FiCpu,
  FiCode,
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

/* ── About Hero ── */
export const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`.replace(/\/{2,}/g, '/')

/* ── Facts Cards ── */
export const facts = [
  { icon: '🎓', label: '计算机科学 · 本科在读', labelEn: 'CS · Undergraduate', detail: '陕西师范大学', detailEn: 'Shaanxi Normal University' },
  { icon: '📍', label: '陕西·西安', labelEn: "Xi'an, Shaanxi", detail: '开放远程 / Onsite', detailEn: 'Open to Remote / Onsite' },
  { icon: '🔧', label: '1年+ 前端实践', labelEn: '1yr+ Frontend Practice', detail: 'React 项目经验', detailEn: 'React project experience' },
  { icon: '📄', label: '简历可下载', labelEn: 'Resume Available', detail: 'PDF / 在线预览', detailEn: 'PDF / Online Preview' },
]

/* ── Skill Categories ── */
export const skillCategories = [
  {
    label: '前端与交互', labelEn: 'Frontend & Interaction',
    icon: FiLayout,
    tags: ['React', 'HTML5', 'CSS3', 'Tailwind', 'JavaScript', 'Framer Motion', 'Vite'],
    level: '进阶', levelEn: 'Advanced',
    percent: 80,
  },
  {
    label: '工程化与工具', labelEn: 'Engineering & Tools',
    icon: FiGitBranch,
    tags: ['Git', 'npm', 'Vite', 'ESLint', 'Prettier', 'GitHub Pages'],
    level: '熟练', levelEn: 'Proficient',
    percent: 65,
  },
  {
    label: '数据与脚本', labelEn: 'Data & Scripts',
    icon: FiDatabase,
    tags: ['Python', '爬虫', '数据分析', 'Pandas'],
    level: '基础+', levelEn: 'Intermediate',
    percent: 50,
  },
  {
    label: '正在学习', labelEn: 'Currently Learning',
    icon: FiCpu,
    tags: ['TypeScript', 'Node.js', '系统设计', '算法'],
    level: '入门', levelEn: 'Beginner',
    percent: 25,
    isLearning: true,
  },
]

/* ── Growth Timeline ── */
export const growthTimeline = [
  {
    period: '2023.09',
    title: '进入大学', titleEn: 'Started University',
    place: '陕西师范大学', placeEn: 'Shaanxi Normal University',
    line: '计算机科学与技术专业，系统学习 C/C++、数据结构、计算机网络基础，开始接触 Web 开发。',
    lineEn: 'CS major. Studied C/C++, data structures, networking fundamentals. First exposure to web development.',
  },
  {
    period: '2023.12',
    title: '自学前端基础', titleEn: 'Self-taught Frontend Basics',
    place: '自学', placeEn: 'Self-taught',
    line: 'HTML + CSS + JavaScript 入门，做了第一个静态页面，感受到"代码变成页面"的乐趣。',
    lineEn: 'HTML + CSS + JavaScript basics. Built first static page. Felt the joy of "code becoming a page".',
  },
  {
    period: '2024.03',
    title: '学习 React 生态', titleEn: 'Learning React Ecosystem',
    place: '自学 + 项目', placeEn: 'Self-taught + Projects',
    line: 'React + Vite + Tailwind CSS，完成第一个 SPA 项目，理解组件化和状态管理。',
    lineEn: 'React + Vite + Tailwind CSS. First SPA project. Understood component architecture and state management.',
  },
  {
    period: '2024.06',
    title: '个人作品集上线', titleEn: 'Portfolio Launched',
    place: '独立开发', placeEn: 'Independent',
    line: '搭建并部署到 GitHub Pages，把项目、技能、成长经历整理成可浏览的展示入口。',
    lineEn: 'Built and deployed to GitHub Pages. Organized projects, skills, and growth into a browsable showcase.',
  },
  {
    period: '2024.09',
    title: '数据相关实践', titleEn: 'Data-Related Practice',
    place: '课程 + 自学', placeEn: 'Coursework + Self-taught',
    line: 'Python 爬虫 + 数据可视化，尝试把后端数据展示在前端页面上。',
    lineEn: 'Python scraping + data visualization. Bridging backend data with frontend presentation.',
  },
  {
    period: '2025至今',
    title: '持续迭代与扩展', titleEn: 'Continuous Iteration',
    place: '独立', placeEn: 'Independent',
    line: '完善作品集（i18n、PWA、深浅模式），探索 TypeScript 和 Node.js，寻找实习机会。',
    lineEn: 'Enhancing portfolio (i18n, PWA, dark mode). Exploring TypeScript & Node.js. Looking for internships.',
  },
]

/* ── Vision Items ── */
export const visionItems = [
  { icon: FiCode, text: '深化工程化与组件思维', textEn: 'Deepen engineering & component thinking' },
  { icon: FiCpu, text: '补齐计算机系统基础', textEn: 'Strengthen CS systems foundations' },
  { icon: FiTrendingUp, text: '用项目反推学习节奏', textEn: 'Let projects drive learning pace' },
]
