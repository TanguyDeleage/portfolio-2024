// Single source of truth for the Work section.
// Every field here powers both the desktop sticky sidebar and the
// self-contained project blocks on tablet/mobile.
//
// Shape:
// {
//   id:          unique, stable string (used as key + for active detection)
//   title:       company / project name
//   role, year
//   headline:    short bold summary
//   description: optional longer paragraph
//   metrics:     optional [{ value, label }]
//   testimonial: optional { quote, author, job, avatar }  (avatar optional)
//   tags:        string[]
//   cover:       { src, alt, width, height, blurred? }
//                blurred: { src, width, height }, pre-blurred image shown while the project is locked
//                (the real image is never requested until unlock)
//   access:      { locked: boolean }  (private: password-gated, see privateAccess.js)
//   links:       { caseStudy?, overview?, page? }  (page: dedicated project page, /work/<id>, content in caseStudies.js)
// }
//
// Asset paths are root-absolute so they also resolve on project pages.

export const projects = [
  {
    id: 'akur8-core-redesign',
    title: 'Akur8',
    role: 'Product Designer',
    year: '2025',
    headline: 'Rebuilding a product from scratch to enable an E2E workflow',
    description: 'Redesigned Akur8’s core product to establish a new ecosystem-based business model, coordinating work across 3 squads on overlapping topics to keep alignment and deliver at high speed in under 9 months.',
    metrics: [
      { value: '10x', label: 'faster computations' },
      { value: '+$10M', label: 'additional CARR, 1st year' },
      { value: '+$50M', label: 'CARR targeted, 3 yrs' },
    ],
    testimonial: {
      quote: "He throws himself wholeheartedly into every project, combining curiosity, dedication, and a genuine desire to create the best possible experience for users. He's a strong user advocate, an excellent communicator, and someone who always puts a great deal of care into his work.",
      author: 'Carolina Barbosa Russi',
      job: 'Senior Product Designer',
      avatar: '/assets/images/testimonials/carolina.jpg',
    },
    tags: ['B2B SaaS', 'Insurtech', 'Machine learning'],
    cover: {
      src: '/assets/images/work/graph.png',
      alt: 'Akur8 modelling workspace showing a coefficient table and chart',
      width: 6000,
      height: 4500,
      blurred: { src: '/assets/images/work/occam-blur.webp', width: 1472, height: 932 },
    },
    access: { locked: true },
    links: {
      overview: 'https://www.behance.net/gallery/255945815/Confidential-Rebuilding-a-product-from-scratch',
      page: '/work/akur8-core-redesign',
    },
  },
  {
    id: 'akur8-agentic-mvp',
    title: 'Akur8',
    role: 'Product Designer',
    year: '2026',
    headline: 'MVP: Demonstrating power of agentic workflows in 3 months',
    description: 'Delivered an embedded AI agent MVP by designing its foundational flows, layout, guardrails, and component system.',
    metrics: [
      { value: '3', label: 'agents built' },
      { value: '+80', label: 'requests/user/day (pilot)' },
      { value: '+1.3K', label: 'requests sent/month (1st month)' },
    ],
    testimonial: {
      quote: 'He is always curious about new technologies and ways of working, and consistently looks for ways to improve both the product and the design process. He is a great collaborator, takes real ownership of his work and brings a high level of quality to everything he does.',
      author: 'Piotr Kwiatkowski',
      job: 'Head of Design',
      avatar: null, // TODO: add assets/images/testimonials/piotr.jpg
    },
    tags: ['B2B SaaS', 'Insurtech', 'Agentic'],
    cover: {
      src: '/assets/images/work/node.png',
      alt: 'Node-based canvas with an AI assistant panel proposing coefficient changes',
      width: 2462,
      height: 1739,
      blurred: { src: '/assets/images/work/agent-blur.webp', width: 1472, height: 932 },
    },
    access: { locked: true },
    links: {
      overview: 'https://www.behance.net/gallery/256089095/Building-Agentic-flows-in-3-months',
      page: '/work/akur8-agentic-mvp', // TODO: case study content in caseStudies.js
    },
  },
  {
    id: 'kls-notification-settings',
    title: 'KLS',
    role: 'Product Designer',
    year: '2024',
    headline: 'Allowing multi persona to manage the same notification settings',
    description: 'In the flow of managing a file, an agent perform mass actions triggering a high volume of notifications to lenders. Allowing both side notification settings was necessary to increase notification purpose.',
    metrics: [
      { value: '-50%', label: 'notifications received' },
      { value: '+10%', label: 'improved Customer Effort Score' },
    ],
    testimonial: {
      quote: 'His mastery of Figma enabled us to produce high-quality deliverables, his autonomy and pro-activity allowed us to quickly propose improvements in terms of user flows and processes, particularly regarding our Design System.',
      author: 'Romain Giroud',
      job: 'Head of Design',
      avatar: '/assets/images/testimonials/romain.jpg'
    },
    tags: ['B2B SaaS', 'Fintech', 'Startup'],
    cover: {
      src: '/assets/images/work/kls.png',
      alt: 'KLS notification settings screens on desktop and mobile',
      width: 4488,
      height: 3434,
    },
    access: { locked: false },
    links: {
      overview: 'https://www.behance.net/gallery/200784759/KLS-Notification-settings',
      page: '/work/kls-notification-settings', // TODO: case study content in caseStudies.js
    },
  },
]
