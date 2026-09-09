import { Reveal } from '@/components/Reveal'
import { CopyButton } from '@/components/CopyButton'
import { GitHubIcon } from '@/components/GitHubIcon'
import { profile } from '@/data/profile'
import styles from './Contact.module.css'

export function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className="shell">
        <Reveal className={styles.inner}>
          <span className={styles.kicker}># contact</span>
          <h2 className={styles.title}>Discutons de votre projet ou poste.</h2>
          <p className={styles.lead}>
            Disponible pour un échange professionnel sur {profile.location} ou à distance.
          </p>

          <div className={styles.actions}>
            <a className={styles.primary} href={`mailto:${profile.email}`}>
              <span aria-hidden="true">✉</span> {profile.email}
            </a>
            <a className={styles.secondary} href={profile.phoneHref}>
              <span aria-hidden="true">☏</span> {profile.phone}
            </a>
            <a
              className={styles.secondary}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon /> GitHub
            </a>
            <CopyButton value={profile.email} label="Copier l'email" />
          </div>

          <div className={styles.footer}>
            <span className={styles.copyright}>© {profile.name} — {profile.role}</span>
            <a className={styles.built} href={profile.github} target="_blank" rel="noreferrer">
              github.com/{profile.githubLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
