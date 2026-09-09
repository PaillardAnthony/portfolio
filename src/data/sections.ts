export type SectionId = 'home' | 'about' | 'stack' | 'parcours' | 'contact'

export type SectionMeta = {
  id: SectionId
  label: string
  file: string
  index: string
}

export const sections: SectionMeta[] = [
  { id: 'home', label: 'Accueil', file: '~/home.tsx', index: '00' },
  { id: 'about', label: 'À propos', file: '~/about.md', index: '01' },
  { id: 'stack', label: 'Stack', file: '~/stack.json', index: '02' },
  { id: 'parcours', label: 'Parcours', file: '~/parcours.log', index: '03' },
  { id: 'contact', label: 'Contact', file: '~/contact.sh', index: '04' },
]
