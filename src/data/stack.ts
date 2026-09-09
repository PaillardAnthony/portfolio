export type StackCategory = 'frontend' | 'backend' | 'method'

export type StackItem = {
  name: string
  category: StackCategory
  label: string
  description: string
}

export const stackFilters: { id: StackCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'frontend', label: 'Front-End' },
  { id: 'backend', label: 'Back-End & BDD' },
  { id: 'method', label: 'Méthodes & Outils' },
]

export const stack: StackItem[] = [
  {
    name: 'Angular',
    category: 'frontend',
    label: 'Front-End',
    description:
      'Framework principal sur projet web métier. Composants, services, RxJS, routing, Material UI.',
  },
  {
    name: 'NestJS / Node.js',
    category: 'backend',
    label: 'Back-End',
    description:
      "Conception d'API REST modulaires, injection de dépendances, architecture TypeScript serveur.",
  },
  {
    name: 'Symfony & PHP',
    category: 'backend',
    label: 'Back-End',
    description:
      'Développement sous Symfony 4 & 5. Doctrine ORM, Twig, contrôleurs, formulaires et auth.',
  },
  {
    name: 'MySQL',
    category: 'backend',
    label: 'Bases de données',
    description:
      "Modélisation relationnelle (MCD/MLD), requêtes optimisées, jointures, gestion d'indexation.",
  },
  {
    name: 'Scrum & Jira',
    category: 'method',
    label: 'Méthodologie',
    description:
      'Pratique quotidienne en équipe de 10 dev. Sprints, Daily, sizing de tickets, rétrospectives.',
  },
  {
    name: 'Git & Gitea / GitHub',
    category: 'method',
    label: 'Outils',
    description: 'Workflows de branches, Pull Requests, code reviews, gestion de conflits, releases.',
  },
  {
    name: 'Java',
    category: 'backend',
    label: 'Back-End / Systèmes',
    description:
      'Développement et maintenance de serveurs de jeux multijoueurs, gestion multithread et sockets.',
  },
  {
    name: 'Intégration UI',
    category: 'frontend',
    label: 'Front-End',
    description: 'HTML5 sémantique, CSS responsive, Bootstrap, Angular Material, Tailwind CSS.',
  },
]
