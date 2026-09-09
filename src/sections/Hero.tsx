import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { TypeLine } from '@/components/TypeLine'
import { CopyButton } from '@/components/CopyButton'
import { profile, stats } from '@/data/profile'
import { fadeUp, stagger } from '@/lib/motion'
import styles from './Hero.module.css'

const lines = [
  { cmd: 'whoami', out: `${profile.name} — ${profile.role}` },
  { cmd: 'cat focus.txt', out: profile.focus },
  { cmd: 'status --now', out: `${profile.availability} · ${profile.location}` },
]

export function Hero() {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(reduced ? lines.length : 0)

  return (
    <section id="home" className={styles.section}>
      <motion.div
        className={styles.terminal}
        initial={{ opacity: 0, y: 26 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.chrome}>
          <span className={styles.traffic} data-c="r" />
          <span className={styles.traffic} data-c="y" />
          <span className={styles.traffic} data-c="g" />
          <span className={styles.path}>anthony@pau: ~/portfolio</span>
        </div>
        <div className={styles.body}>
          {lines.map((line, index) => {
            if (index > step) return null
            const typing = index === step
            return (
              <div key={line.cmd} className={styles.line}>
                <span className={styles.cmdLine}>
                  <span className={styles.prompt}>anthony@pau</span>
                  <span className={styles.sep}>~ %</span>
                  {typing ? (
                    <TypeLine text={line.cmd} onDone={() => setStep((s) => s + 1)} />
                  ) : (
                    <span>{line.cmd}</span>
                  )}
                  {typing && <span className={styles.caret} />}
                </span>
                {index < step && <span className={styles.out}>{line.out}</span>}
              </div>
            )
          })}
          {step >= lines.length && (
            <span className={styles.cmdLine}>
              <span className={styles.prompt}>anthony@pau</span>
              <span className={styles.sep}>~ %</span>
              <span className={styles.caret} />
            </span>
          )}
        </div>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" animate="show" className={styles.content}>
        <motion.h1 variants={fadeUp} className={styles.headline}>
          Développeur Web <span className={styles.accent}>Full-Stack</span>
          <br />
          <span className={styles.sub}>{profile.focus}.</span>
        </motion.h1>

        <motion.p variants={fadeUp} className={styles.intro}>
          {profile.intro}
        </motion.p>

        <motion.ul variants={stagger} className={styles.stats}>
          {stats.map((stat) => (
            <motion.li key={stat.label} variants={fadeUp} className={styles.stat}>
              <span className={styles.statLabel}>{stat.label}</span>
              <span className={styles.statValue}>{stat.value}</span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div variants={fadeUp} className={styles.actions}>
          <button
            className={styles.primary}
            onClick={() => document.getElementById('parcours')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Voir le parcours <span aria-hidden="true">↓</span>
          </button>
          <CopyButton value={profile.email} />
        </motion.div>
      </motion.div>
    </section>
  )
}
