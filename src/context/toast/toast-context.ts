import { createContext, useContext } from 'react'

export type ToastTone = 'success' | 'error'

export type ToastApi = (message: string, tone?: ToastTone) => void

export const ToastContext = createContext<ToastApi | null>(null)

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
