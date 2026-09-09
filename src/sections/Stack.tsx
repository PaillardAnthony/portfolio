import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Section } from '@/components/Section'
import { stack, stackFilters, type StackCategory } from '@/data/stack'
import { sections } from '@/data/sections'
import styles from './Stack.module.css'

const meta = sections.find((s) => s.id === 'stack')!

export function Stack() {
  const [filter, setFilter] = useState<StackCategory | 'all'>('all')
  const items = filter === 'all' ? stack : stack.filter((item) => item.category === filter)

  return (
    <Section meta={meta} kicker="Compétences" title="Environnement technique">
      <div className={styles.filters} role="tablist" aria-label="Filtrer par catégorie">
        {stackFilters.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={filter === item.id}
            className={styles.pill}
            data-active={filter === item.id}
            onClick={() => setFilter(item.id)}
          >
            {filter === item.id && (
              <motion.span layoutId="pill" className={styles.pillBg} transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />
            )}
            <span className={styles.pillText}>{item.label}</span>
          </button>
        ))}
      </div>

      <motion.div layout className={styles.grid}>
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.article
              key={item.name}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className={styles.card}
            >
              <div className={styles.cardHead}>
                <h3 className={styles.cardName}>{item.name}</h3>
                <span className={styles.cardTag}>{item.label}</span>
              </div>
              <p className={styles.cardDesc}>{item.description}</p>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  )
}
