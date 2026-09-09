import { motion } from 'framer-motion'
import { fadeUp, viewportOnce } from '@/lib/motion'

type RevealProps = {
  children: React.ReactNode
  as?: 'div' | 'section' | 'li' | 'article'
  delay?: number
  className?: string
}

export function Reveal({ children, as = 'div', delay = 0, className }: RevealProps) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </Tag>
  )
}
