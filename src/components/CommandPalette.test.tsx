import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PaletteProvider } from '@/context/palette'
import { ToastProvider } from '@/context/toast'
import { CommandPalette } from './CommandPalette'

function Harness() {
  return (
    <PaletteProvider>
      <ToastProvider>
        <button type="button">déclencheur</button>
        <CommandPalette />
      </ToastProvider>
    </PaletteProvider>
  )
}

async function openPalette(user: ReturnType<typeof userEvent.setup>) {
  await user.keyboard('{Control>}k{/Control}')
  return screen.findByRole('dialog')
}

describe('CommandPalette', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true })
  })

  it('ouvre la palette via Ctrl+K et place le focus sur le champ', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await openPalette(user)
    const input = screen.getByRole('textbox')
    await waitFor(() => expect(input).toHaveFocus())
  })

  it('filtre les commandes selon la recherche', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await openPalette(user)
    await user.type(screen.getByRole('textbox'), 'email')

    expect(screen.getByText("Copier l'adresse email")).toBeInTheDocument()
    expect(screen.queryByText('À propos')).not.toBeInTheDocument()
  })

  it('exécute la commande sélectionnée avec Entrée', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await openPalette(user)
    await user.type(screen.getByRole('textbox'), 'copier')
    await user.keyboard('{Enter}')

    expect(await screen.findByText('Adresse email copiée')).toBeInTheDocument()
  })

  it('se ferme avec Échap et restaure le focus sur le déclencheur', async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const trigger = screen.getByRole('button', { name: 'déclencheur' })
    trigger.focus()

    await openPalette(user)
    await user.keyboard('{Escape}')

    await waitFor(() => expect(trigger).toHaveFocus())
  })
})
