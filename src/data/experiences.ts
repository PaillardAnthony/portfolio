export type Experience = {
  role: string
  org: string
  meta: string
  period: string
  current?: boolean
  bullets: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
    role: 'Développeur Web Full-Stack',
    org: 'Orthalis',
    meta: 'Équipe produit agile (10 développeurs)',
    period: 'Avril 2022 – Novembre 2023',
    bullets: [
      "Développement et maintenance continue d'applications web métiers avec Angular, Node.js et NestJS.",
      'Intégration rigoureuse dans les rituels Scrum : Sprint Planning, Stand-up quotidien, Démo, Rétrospective.',
      'Suivi de tickets sous Jira et contrôle de version via Gitea/Git avec revues de code systématiques.',
    ],
    tags: ['Angular', 'NestJS', 'TypeScript', 'Scrum / Jira'],
  },
]

export type Project = {
  name: string
  period: string
  description: string
  tags: string[]
}

export const independent = {
  role: 'Développeur Indépendant',
  org: 'TOTEM',
  meta: "Conception d'applications & outils web sur-mesure",
  period: '2018 – 2022',
  projects: [
    {
      name: 'Webinds',
      period: '2019 – 2022',
      description: "Conception architecturale et réalisation d'une application modulable complexe.",
      tags: ['Angular', 'Symfony 4'],
    },
    {
      name: 'Update',
      period: '2018 – 2019',
      description: 'Outil de gestion automatisée de planning et de ressources RH.',
      tags: ['PHP', 'MySQL'],
    },
  ] as Project[],
}

export const education = {
  school: 'GRETA',
  title: 'Titre Professionnel Développeur Logiciel',
  detail: 'Niveau III (EQF 5 / Bac+2) — Spécialité Web & Mobile',
  mode: 'Formation continue',
}

export const complementary =
  "Mes expériences en restauration (chef de cuisine, extras) et en animation m'ont apporté une capacité avérée à travailler efficacement en équipe sous forte pression et un sens aigu du service client."
