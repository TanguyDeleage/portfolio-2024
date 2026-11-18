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
//   links:       { caseStudy?, overview?, page? }  (page: dedicated project page, /work/<id>, content in caseStudies.js;
//                caseStudy: external case study, "View project" opens it while there's no released page)
//   inProgress:  optional boolean, the dedicated page is still being written: its CTA shows as
//                disabled with a tooltip (unless caseStudy is set), /work/<id> is only served in dev, and other pages'
//                previous/next footer shows it as a disabled card in prod. Delete the flag to release the page.
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
      quote: "He is always curious about new technologies and ways of working, and consistently looks for ways to improve both the product and the design process. He is a great collaborator, takes real ownership of his work and brings a high level of quality to everything he does.",
      author: 'Piotr Kwiatkowski',
      job: 'Head of Design',
      avatar: null,
    },
    tags: ['B2B SaaS', 'Insurtech', 'Machine learning'],
    cover: {
      src: '/assets/images/projects/akur8-core-redesign/intro.mp4',
      poster: '/assets/images/projects/akur8-core-redesign/hero.png',
      alt: 'Rebuilt Rate product showing a model block coefficient table',
      width: 1920,
      height: 1080,
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
      quote: 'I had the pleasure of collaborating with Tanguy on several projects, including the initial setup of Akur8 agents on our platform. He took a problem with no established patterns and turned it into clear, usable workflows.',
      author: 'Lukas Wenzl',
      job: 'Engineering manager',
      avatar: null, // TODO: add assets/images/testimonials/piotr.jpg
    },
    tags: ['B2B SaaS', 'Insurtech', 'Agentic'],
    cover: {
      src: '/assets/images/work/node.mp4',
      poster: '/assets/images/work/node.webp',
      alt: 'Node-based canvas with an AI assistant panel proposing coefficient changes',
      width: 1280,
      height: 720,
      blurred: { src: '/assets/images/work/agent-blur.webp', width: 1472, height: 932 },
    },
    access: { locked: true },
    inProgress: true,
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
      avatar: '/assets/images/testimonials/romain.webp'
    },
    tags: ['B2B SaaS', 'Fintech', 'Startup'],
    cover: {
      src: '/assets/images/work/kls.webp',
      alt: 'KLS notification settings screens on desktop and mobile',
      width: 1800,
      height: 1378,
    },
    access: { locked: false },
    inProgress: true,
    links: {
      // Behance is the one way in until the dedicated page ships
      caseStudy: 'https://www.behance.net/gallery/200784759/KLS-Notification-settings',
      page: '/work/kls-notification-settings', // TODO: case study content in caseStudies.js
    },
  },
]

// Where "View project" leads: the dedicated page once released, the external case study
// otherwise, or nowhere (null) while the page is in progress with nothing else to show
export function projectLink(project) {
  if (project.links?.page && !project.inProgress) return { href: project.links.page, external: false }
  if (project.links?.caseStudy) return { href: project.links.caseStudy, external: true }
  return null
}
