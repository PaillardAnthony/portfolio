import { TopBar } from '@/components/TopBar'
import { StatusBar } from '@/components/StatusBar'
import { CommandPalette } from '@/components/CommandPalette'
import { Hero } from '@/sections/Hero'
import { About } from '@/sections/About'
import { Stack } from '@/sections/Stack'
import { Parcours } from '@/sections/Parcours'
import { Contact } from '@/sections/Contact'
import { PaletteProvider } from '@/context/palette'
import { ToastProvider } from '@/context/toast'
import { useActiveSection } from '@/hooks/useActiveSection'
import type { SectionId } from '@/data/sections'
import styles from './App.module.css'

const ids: SectionId[] = ['home', 'about', 'stack', 'parcours', 'contact']

export default function App() {
  const active = useActiveSection(ids, 'home')

  return (
    <PaletteProvider>
      <ToastProvider>
        <TopBar active={active} />
        <main className={styles.main}>
          <div className={`shell ${styles.content}`}>
            <Hero />
            <About />
            <Stack />
            <Parcours />
          </div>
          <Contact />
        </main>
        <StatusBar active={active} />
        <CommandPalette />
      </ToastProvider>
    </PaletteProvider>
  )
}
