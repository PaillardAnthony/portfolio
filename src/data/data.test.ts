import { describe, expect, it } from 'vitest'
import { profile } from './profile'
import { sections } from './sections'
import { stack, stackFilters } from './stack'
import { experiences, independent } from './experiences'

describe('sections', () => {
  it('expose cinq sections avec des identifiants uniques', () => {
    const ids = sections.map((s) => s.id)
    expect(ids).toHaveLength(5)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('attribue un index ordonné à chaque section', () => {
    expect(sections.map((s) => s.index)).toEqual(['00', '01', '02', '03', '04'])
  })
})

describe('stack', () => {
  it("n'utilise que des catégories connues", () => {
    const allowed = new Set(['frontend', 'backend', 'method'])
    expect(stack.every((item) => allowed.has(item.category))).toBe(true)
  })

  it('propose un filtre par catégorie plus le filtre global', () => {
    const filterIds = stackFilters.map((f) => f.id)
    expect(filterIds[0]).toBe('all')
    for (const category of new Set(stack.map((item) => item.category))) {
      expect(filterIds).toContain(category)
    }
  })
})

describe('profile', () => {
  it('contient un email et un téléphone valides', () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    expect(profile.phoneHref.startsWith('tel:')).toBe(true)
  })
})

describe('experiences', () => {
  it('décrit au moins une expérience détaillée et des projets indépendants', () => {
    expect(experiences.length).toBeGreaterThan(0)
    expect(experiences[0].bullets.length).toBeGreaterThan(0)
    expect(independent.projects.length).toBeGreaterThan(0)
  })
})
