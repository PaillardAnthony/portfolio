import { SectionHeading } from './SectionHeading'
import type { SectionMeta } from '@/data/sections'
import styles from './Section.module.css'

type SectionProps = {
  meta: SectionMeta
  kicker: string
  title: string
  children: React.ReactNode
  className?: string
}

export function Section({ meta, kicker, title, children, className }: SectionProps) {
  return (
    <section id={meta.id} className={[styles.section, className].filter(Boolean).join(' ')}>
      <SectionHeading index={meta.index} file={meta.file} kicker={kicker} title={title} />
      {children}
    </section>
  )
}
