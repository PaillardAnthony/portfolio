import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { about } from '@/data/profile'
import { sections } from '@/data/sections'
import styles from './About.module.css'

const meta = sections.find((s) => s.id === 'about')!

export function About() {
  return (
    <Section meta={meta} kicker="Présentation" title="Méthodologie & vision">
      <div className={styles.grid}>
        <Reveal className={styles.prose}>
          {about.paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </Reveal>

        <Reveal className={styles.panel} delay={0.1}>
          <h3 className={styles.panelTitle}>
            <span className={styles.hash}>#</span> principes
          </h3>
          <ul className={styles.principles}>
            {about.principles.map((principle) => (
              <li key={principle.title} className={styles.principle}>
                <span className={styles.bullet} aria-hidden="true">
                  —
                </span>
                <div>
                  <strong>{principle.title}</strong>
                  <p>{principle.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}
