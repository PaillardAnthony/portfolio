export const profile = {
  name: 'Anthony Paillard',
  role: 'Développeur Web Full-Stack',
  focus: 'orienté architecture & méthodes agiles',
  location: 'Pau (64)',
  available: true,
  availability: 'Disponible pour opportunités',
  email: 'paillard.anthony@gmail.com',
  phone: '06 25 33 77 43',
  phoneHref: 'tel:0625337743',
  github: 'https://github.com/PaillardAnthony',
  githubLabel: 'PaillardAnthony',
  intro:
    "Diplômé du Titre Professionnel Développeur Logiciel. J'associe la rigueur du développement TypeScript (Angular, NestJS) à une expérience concrète du travail en équipe Scrum.",
} as const

export const stats = [
  { label: 'Expérience', value: '1,5 an en Scrum (10 dev)' },
  { label: 'Diplôme', value: 'Titre Pro Bac+2 (GRETA)' },
  { label: 'Stack principale', value: 'Angular · NestJS · Symfony' },
  { label: 'Localisation', value: 'Pau (64) · remote' },
] as const

export const about = {
  paragraphs: [
    "Mon parcours dans le développement logiciel repose sur la recherche constante de clarté, de maintenabilité et de pragmatisme. Formé au GRETA pour l'obtention du Titre Professionnel Développeur Logiciel, j'ai acquis des fondations solides en conception de bases de données et en développement orienté objet.",
    "Au sein de l'entreprise Orthalis, j'ai évolué au cœur d'une équipe produit de 10 développeurs fonctionnant sous la méthode Scrum. Cette expérience m'a appris l'importance des cérémonies agiles, des revues de code rigoureuses et d'un versionnage propre via Git et Gitea.",
    "Auparavant, la gestion de ma structure indépendante TOTEM m'a apporté une réelle autonomie dans la conduite de projets de A à Z : analyse du besoin client, choix d'architecture (Angular + Symfony), et livraison d'applications sur-mesure.",
  ],
  principles: [
    {
      title: 'Rigueur agile',
      body: 'Suivi précis des sous-tâches sur Jira et communication constante.',
    },
    {
      title: 'Polyvalence stack',
      body: "À l'aise sur l'UI (Angular, CSS) comme sur le back-end REST API (NestJS, Symfony).",
    },
    {
      title: 'Esprit de synthèse',
      body: 'Traduire un besoin métier complexe en code lisible et modulaire.',
    },
  ],
} as const
