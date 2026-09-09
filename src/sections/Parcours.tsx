import { Section } from '@/components/Section'
import { Reveal } from '@/components/Reveal'
import { complementary, education, experiences, independent } from '@/data/experiences'
import { sections } from '@/data/sections'
import styles from './Parcours.module.css'

const meta = sections.find((s) => s.id === 'parcours')!

export function Parcours() {
  return (
    <Section meta={meta} kicker="Expériences" title="Parcours professionnel">
      <div className={styles.timeline}>
        {experiences.map((exp) => (
          <Reveal key={exp.org} as="article" className={styles.entry}>
            <span className={styles.node} aria-hidden="true" />
            <div className={styles.card}>
              <header className={styles.head}>
                <div>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <p className={styles.org}>
                    {exp.org} · {exp.meta}
                  </p>
                </div>
                <span className={styles.period} data-accent="true">
                  {exp.period}
                </span>
              </header>
              <ul className={styles.bullets}>
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>{bullet}</li>
                ))}
              </ul>
              <div className={styles.tags}>
                {exp.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}

        <Reveal as="article" className={styles.entry}>
          <span className={styles.node} aria-hidden="true" />
          <div className={styles.card}>
            <header className={styles.head}>
              <div>
                <h3 className={styles.role}>{independent.role}</h3>
                <p className={styles.org}>
                  {independent.org} · {independent.meta}
                </p>
              </div>
              <span className={styles.period}>{independent.period}</span>
            </header>
            <div className={styles.projects}>
              {independent.projects.map((project) => (
                <div key={project.name} className={styles.project}>
                  <div className={styles.projectHead}>
                    <span className={styles.projectName}>{project.name}</span>
                    <span className={styles.projectPeriod}>{project.period}</span>
                  </div>
                  <p className={styles.projectDesc}>{project.description}</p>
                  <div className={styles.projectTags}>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal as="article" className={styles.entry}>
          <span className={styles.node} aria-hidden="true" />
          <div className={`${styles.card} ${styles.education}`}>
            <div>
              <span className={styles.eduKicker}>Diplôme — {education.school}</span>
              <h3 className={styles.role}>{education.title}</h3>
              <p className={styles.org}>{education.detail}</p>
            </div>
            <span className={styles.mode}>{education.mode}</span>
          </div>
        </Reveal>
      </div>

      <Reveal className={styles.complementary}>
        <h3 className={styles.compTitle}>Expériences complémentaires</h3>
        <p>{complementary}</p>
      </Reveal>
    </Section>
  )
}
