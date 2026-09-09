import { useCallback, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ToastContext, type ToastApi, type ToastTone } from './toast-context'
import styles from './Toast.module.css'

type ToastState = { id: number; message: string; tone: ToastTone } | null

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null)
  const timer = useRef<number>()

  const show = useCallback<ToastApi>((message, tone = 'success') => {
    window.clearTimeout(timer.current)
    setToast({ id: Date.now(), message, tone })
    timer.current = window.setTimeout(() => setToast(null), 2800)
  }, [])

  const api = useMemo(() => show, [show])

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className={styles.region} role="status" aria-live="polite">
        <AnimatePresence>
          {toast && (
            <motion.div
              key={toast.id}
              className={styles.toast}
              data-tone={toast.tone}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.98 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.glyph}>{toast.tone === 'success' ? '✓' : '!'}</span>
              <span>{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}
