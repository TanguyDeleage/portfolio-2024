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
//   cover:       { src, alt, width, height }
//   access:      { locked: boolean }
//   links:       { caseStudy?, overview? }
// }

export const projects = [
  {
    id: 'akur8-core-redesign',
    title: 'Akur8',
    role: 'Product Designer',
    year: '2025',
    headline: 'Rebuilding a product from scratch to enable an E2E workflow',
    description: 'Redesigned Akur8’s core product to establish a new ecosystem-based business model, coordinating work across 3 squads on overlapping topics to keep alignment and deliver at high speed in under 9 months.',
    // TODO: confirm metrics (taken from the design mockup)
    metrics: [
      { value: '+35%', label: 'users' },
      { value: '+23%', label: 'acquisition' },
      { value: '+$2M', label: 'CARR' },
    ],
    testimonial: {
      quote: 'He is always curious about new technologies and ways of working, and consistently looks for ways to improve both the product and the design process. He is a great collaborator, takes real ownership of his work and brings a high level of quality to everything he does.',
      author: 'Piotr Kwiatkowski',
      job: 'Head of Design',
      avatar: null, // TODO: add assets/images/testimonials/piotr.jpg
    },
    tags: ['B2B SaaS', 'Insurtech', 'Machine learning'],
    cover: {
      src: 'assets/images/work/graph.png',
      alt: 'Akur8 modelling workspace showing a coefficient table and chart',
      width: 6000,
      height: 4500,
    },
    access: { locked: true },
    links: {
      overview: 'https://www.behance.net/gallery/255945815/Confidential-Rebuilding-a-product-from-scratch',
    },
  },
  {
    id: 'akur8-agentic-mvp',
    title: 'Akur8',
    role: 'Product Designer',
    year: '2026',
    headline: 'MVP: Demonstrating power of agentic workflows in 3 months',
    description: 'Delivered an embedded AI agent MVP by designing its foundational flows, layout, guardrails, and component system.',
    tags: ['B2B SaaS', 'Insurtech', 'Artificial intelligence'],
    cover: {
      src: 'assets/images/work/node.png',
      alt: 'Node-based canvas with an AI assistant panel proposing coefficient changes',
      width: 2462,
      height: 1739,
    },
    access: { locked: true },
    links: {
      overview: 'https://www.behance.net/gallery/256089095/Building-Agentic-flows-in-3-months',
    },
  },
  {
    id: 'kls-notification-settings',
    title: 'KLS',
    role: 'Product Designer',
    year: '2024',
    headline: 'Allowing Agents to manage notification settings',
    tags: ['B2B SaaS', 'Fintech', 'Web responsive'],
    cover: {
      src: 'assets/images/work/kls.png',
      alt: 'KLS notification settings screens on desktop and mobile',
      width: 4488,
      height: 3434,
    },
    access: { locked: false },
    links: {
      caseStudy: 'https://www.behance.net/gallery/200784759/KLS-Notification-settings',
    },
  },
  {
    id: 'kuartz-energy-contracts',
    title: 'Kuartz',
    role: 'Freelance Product Designer',
    year: '2023',
    headline: 'Transforming energy contracts: from paperwork to digital efficiency',
    tags: ['B2B SaaS', 'Energy', 'Web responsive'],
    cover: {
      src: 'assets/images/work/kuartz.png',
      alt: 'Kuartz energy contract management interface',
      width: 4328,
      height: 3179,
    },
    access: { locked: false },
    links: {
      caseStudy: 'https://www.behance.net/gallery/182420717/Kuartz-Freelance-mission-in-energy-sector',
    },
  },
]
