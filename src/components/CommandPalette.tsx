import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { sections } from '@/data/sections'
import { profile } from '@/data/profile'
import { usePalette } from '@/context/palette'
import { useClipboard } from '@/hooks/useClipboard'
import { useToast } from '@/context/toast'
import { useFocusTrap } from '@/hooks/useFocusTrap'
import styles from './CommandPalette.module.css'


type Command = {
  id: string
  label: string
  hint: string
  group: 'Navigation' | 'Contact'
  run: () => void
}

export function CommandPalette() {
  const { open, setOpen } = usePalette()
  const copy = useClipboard()
  const toast = useToast()
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useFocusTrap(panelRef, open)

  const commands = useMemo<Command[]>(() => {
    const goto = (id: string) => () => {
      setOpen(false)
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    const nav: Command[] = sections.map((s) => ({
      id: `goto-${s.id}`,
      label: s.label,
      hint: s.file,
      group: 'Navigation',
      run: goto(s.id),
    }))
    const contact: Command[] = [
      {
        id: 'copy-email',
        label: "Copier l'adresse email",
        hint: profile.email,
        group: 'Contact',
        run: async () => {
          setOpen(false)
          const ok = await copy(profile.email)
          toast(ok ? 'Adresse email copiée' : 'Copie impossible', ok ? 'success' : 'error')
        },
      },
      {
        id: 'mail',
        label: 'Écrire un email',
        hint: 'mailto',
        group: 'Contact',
        run: () => {
          setOpen(false)
          window.location.href = `mailto:${profile.email}`
        },
      },
      {
        id: 'call',
        label: 'Appeler',
        hint: profile.phone,
        group: 'Contact',
        run: () => {
          setOpen(false)
          window.location.href = profile.phoneHref
        },
      },
      {
        id: 'github',
        label: 'Ouvrir le profil GitHub',
        hint: `github.com/${profile.githubLabel}`,
        group: 'Contact',
        run: () => {
          setOpen(false)
          window.open(profile.github, '_blank', 'noopener,noreferrer')
        },
      },
    ]
    return [...nav, ...contact]
  }, [copy, setOpen, toast])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q)
    )
  }, [commands, query])

  useEffect(() => {
    if (open) {
      setQuery('')
      setCursor(0)
      const id = window.setTimeout(() => inputRef.current?.focus(), 40)
      return () => window.clearTimeout(id)
    }
  }, [open])

  useEffect(() => {
    setCursor((c) => Math.min(c, Math.max(0, results.length - 1)))
  }, [results.length])

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false)
      return
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setCursor((c) => (c + 1) % Math.max(1, results.length))
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setCursor((c) => (c - 1 + results.length) % Math.max(1, results.length))
    }
    if (event.key === 'Enter') {
      event.preventDefault()
      results[cursor]?.run()
    }
  }

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(`[data-index="${cursor}"]`)
    node?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onMouseDown={() => setOpen(false)}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Palette de commandes"
            className={styles.panel}
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onKeyDown}
          >
            <div className={styles.search}>
              <span className={styles.prompt} aria-hidden="true">
                ❯
              </span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Tapez une commande ou une section…"
                className={styles.input}
                aria-label="Rechercher une commande"
              />
              <kbd className={styles.esc}>esc</kbd>
            </div>

            <ul className={styles.list} ref={listRef}>
              {results.length === 0 && <li className={styles.empty}>Aucune commande</li>}
              {results.map((command, index) => (
                <li key={command.id}>
                  <button
                    type="button"
                    data-index={index}
                    data-active={index === cursor}
                    className={styles.item}
                    onMouseEnter={() => setCursor(index)}
                    onClick={command.run}
                  >
                    <span className={styles.itemLabel}>
                      <span className={styles.group}>{command.group}</span>
                      {command.label}
                    </span>
                    <span className={styles.itemHint}>{command.hint}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.footer}>
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> naviguer
              </span>
              <span>
                <kbd>↵</kbd> valider
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
