import { useEffect, useState } from 'react'

function format(date: Date): string {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function useClock(): string {
  const [time, setTime] = useState(() => format(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => setTime(format(new Date())), 1000)
    return () => window.clearInterval(id)
  }, [])

  return time
}
