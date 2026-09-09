import { createContext, useContext } from 'react'

export type PaletteApi = {
  open: boolean
  setOpen: (value: boolean) => void
  toggle: () => void
}

export const PaletteContext = createContext<PaletteApi | null>(null)

export function usePalette(): PaletteApi {
  const ctx = useContext(PaletteContext)
  if (!ctx) throw new Error('usePalette must be used within PaletteProvider')
  return ctx
}
