import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function LoadingScreen() {
  const { theme } = useTheme()

  return (
    <motion.div
      className={`fixed inset-0 z-[60] flex items-center justify-center ${
        theme === 'dark' ? 'bg-dark' : 'bg-[#faf9f7]'
      }`}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="text-center">
        <motion.div
          className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-6xl font-bold text-transparent"
          animate={{
            scale: [1, 1.15, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          &lt;/&gt;
        </motion.div>
        <motion.p
          className={`mt-4 text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          加载中…
        </motion.p>
        <div className={`mx-auto mt-8 h-1 w-48 overflow-hidden rounded-full ${
          theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'
        }`}>
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-secondary"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
