import { useEffect, useMemo, useState } from 'react'
import { PaletteContext, type PaletteApi } from './palette-context'

export function PaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const api = useMemo<PaletteApi>(
    () => ({ open, setOpen, toggle: () => setOpen((prev) => !prev) }),
    [open]
  )

  return <PaletteContext.Provider value={api}>{children}</PaletteContext.Provider>
}
