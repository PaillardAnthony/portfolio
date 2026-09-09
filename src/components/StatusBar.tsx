import { sections, type SectionId } from '@/data/sections'
import { usePalette } from '@/context/palette'
import { useClock } from '@/hooks/useClock'
import styles from './StatusBar.module.css'

type StatusBarProps = { active: SectionId }

export function StatusBar({ active }: StatusBarProps) {
  const palette = usePalette()
  const time = useClock()
  const current = sections.find((s) => s.id === active) ?? sections[0]

  return (
    <footer className={styles.bar}>
      <div className={styles.group}>
        <span className={styles.branch}>
          <span className={styles.branchIcon} aria-hidden="true">
            ⎇
          </span>
          main
        </span>
        <span className={styles.file}>{current.file}</span>
      </div>
      <div className={styles.group}>
        <button className={styles.hint} onClick={palette.toggle}>
          ⌘K commandes
        </button>
        <span className={styles.muted}>FR</span>
        <span className={styles.muted}>UTF-8</span>
        <span className={styles.clock}>{time}</span>
      </div>
    </footer>
  )
}
