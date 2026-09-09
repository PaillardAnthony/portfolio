import { useClipboard } from '@/hooks/useClipboard'
import { useToast } from '@/context/toast'
import styles from './CopyButton.module.css'

type CopyButtonProps = {
  value: string
  label?: string
  className?: string
}

export function CopyButton({ value, label, className }: CopyButtonProps) {
  const copy = useClipboard()
  const toast = useToast()

  const onClick = async () => {
    const ok = await copy(value)
    if (ok) toast('Adresse email copiée dans le presse-papier', 'success')
    else toast('Copie impossible — sélectionnez manuellement', 'error')
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={[styles.button, className].filter(Boolean).join(' ')}
      aria-label={`Copier ${value}`}
    >
      <span className={styles.icon} aria-hidden="true">
        ⧉
      </span>
      {label ?? value}
    </button>
  )
}
