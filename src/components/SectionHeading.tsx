import { Reveal } from './Reveal'
import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  index: string
  file: string
  kicker: string
  title: string
}

export function SectionHeading({ index, file, kicker, title }: SectionHeadingProps) {
  return (
    <Reveal className={styles.wrap}>
      <div className={styles.tab}>
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.file}>{file}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.index} aria-hidden="true">
          {index}
        </span>
        <div>
          <span className={styles.kicker}>{kicker}</span>
          <h2 className={styles.title}>{title}</h2>
        </div>
      </div>
    </Reveal>
  )
}
