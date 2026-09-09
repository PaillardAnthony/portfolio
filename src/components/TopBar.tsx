import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sections, type SectionId } from '@/data/sections'
import { profile } from '@/data/profile'
import { usePalette } from '@/context/palette'
import { useScrollProgress } from '@/hooks/useScrollProgress'
import { GitHubIcon } from './GitHubIcon'
import styles from './TopBar.module.css'

const navItems = sections.filter((s) => s.id !== 'home')

type TopBarProps = { active: SectionId }

export function TopBar({ active }: TopBarProps) {
  const palette = usePalette()
  const progress = useScrollProgress()
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (id: SectionId) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={styles.bar}>
      <div className={`shell ${styles.inner}`}>
        <button className={styles.brand} onClick={() => go('home')}>
          <span className={styles.pulse} data-on={profile.available} aria-hidden="true" />
          <span className={styles.name}>{profile.name}</span>
          <span className={styles.role}>/ dev full-stack</span>
        </button>

        <nav className={styles.nav} aria-label="Sections">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={styles.link}
              data-active={active === item.id}
              onClick={() => go(item.id)}
            >
              <span className={styles.linkIndex}>{item.index}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            className={styles.iconLink}
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="Profil GitHub (nouvel onglet)"
          >
            <GitHubIcon />
          </a>
          <button className={styles.cmd} onClick={palette.toggle} aria-label="Ouvrir la palette de commandes">
            <span>Naviguer</span>
            <kbd className={styles.kbd}>⌘K</kbd>
          </button>
          <button className={styles.menuToggle} onClick={() => setMenuOpen((v) => !v)} aria-label="Menu" aria-expanded={menuOpen}>
            <span data-open={menuOpen} />
            <span data-open={menuOpen} />
          </button>
        </div>
      </div>

      <div className={styles.progress} style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Menu mobile"
          >
            {navItems.map((item) => (
              <button key={item.id} className={styles.mobileLink} onClick={() => go(item.id)}>
                <span className={styles.linkIndex}>{item.index}</span>
                {item.label}
              </button>
            ))}
            <a
              className={styles.mobileLink}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => setMenuOpen(false)}
            >
              <GitHubIcon />
              GitHub
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
