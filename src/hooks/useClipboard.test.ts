import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useClipboard } from './useClipboard'

function setSecureContext(value: boolean) {
  Object.defineProperty(window, 'isSecureContext', { value, configurable: true })
}

describe('useClipboard', () => {
  beforeEach(() => {
    setSecureContext(true)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    Reflect.deleteProperty(navigator as object, 'clipboard')
  })

  it('utilise navigator.clipboard quand il est disponible', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })

    const { result } = renderHook(() => useClipboard())
    const ok = await result.current('hello@example.com')

    expect(ok).toBe(true)
    expect(writeText).toHaveBeenCalledWith('hello@example.com')
  })

  it("bascule sur execCommand quand l'API moderne est absente", async () => {
    setSecureContext(false)
    const execCommand = vi.fn().mockReturnValue(true)
    Object.defineProperty(document, 'execCommand', { value: execCommand, configurable: true })

    const { result } = renderHook(() => useClipboard())
    const ok = await result.current('fallback')

    expect(ok).toBe(true)
    expect(execCommand).toHaveBeenCalledWith('copy')
  })

  it('renvoie false quand la copie échoue totalement', async () => {
    setSecureContext(false)
    Object.defineProperty(document, 'execCommand', {
      value: vi.fn().mockReturnValue(false),
      configurable: true,
    })

    const { result } = renderHook(() => useClipboard())
    const ok = await result.current('nope')

    expect(ok).toBe(false)
  })
})
