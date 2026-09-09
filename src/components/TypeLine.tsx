import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

type TypeLineProps = {
  text: string
  speed?: number
  startDelay?: number
  onDone?: () => void
  className?: string
}

export function TypeLine({ text, speed = 38, startDelay = 0, onDone, className }: TypeLineProps) {
  const reduced = useReducedMotion()
  const [count, setCount] = useState(reduced ? text.length : 0)

  useEffect(() => {
    if (reduced) {
      onDone?.()
      return
    }
    let index = 0
    let typingId: number
    const startId = window.setTimeout(() => {
      typingId = window.setInterval(() => {
        index += 1
        setCount(index)
        if (index >= text.length) {
          window.clearInterval(typingId)
          onDone?.()
        }
      }, speed)
    }, startDelay)

    return () => {
      window.clearTimeout(startId)
      window.clearInterval(typingId)
    }
  }, [text, speed, startDelay, onDone, reduced])

  return <span className={className}>{text.slice(0, count)}</span>
}
