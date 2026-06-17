import { motion } from 'framer-motion'
import { sectionRootVariants, sectionBlockVariants } from './data'

export default function Section({ id, eyebrow, title, subtitle, children, className = '' }) {
  return (
    <motion.section
      id={id}
      className={`scroll-mt-28 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px -8% 0px', amount: 0.12 }}
      variants={sectionRootVariants}
    >
      <motion.div variants={sectionBlockVariants} className="mb-12 md:mb-16 lg:mb-20">
        {eyebrow && (
          <p className="mb-4 md:mb-5 font-mono text-sm font-medium uppercase tracking-[0.38em] text-zinc-400/95 md:text-base md:tracking-[0.42em]">
            {eyebrow}
          </p>
        )}
        <h2 className="text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-[2.5rem] lg:leading-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-400 md:mt-5 md:text-lg md:leading-relaxed">
            {subtitle}
          </p>
        )}
      </motion.div>
      <motion.div variants={sectionBlockVariants}>{children}</motion.div>
    </motion.section>
  )
}
