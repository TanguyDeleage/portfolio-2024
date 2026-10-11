// Content of the dedicated project pages (ProjectPage.vue), keyed by project id.
// The page itself comes from the project's `links.page` in projects.js.
//
// Every field is optional: a missing section is skipped, and section numbers
// (01 — Context, 02 — Challenge…) follow the sections actually present.
//
// Shape:
// {
//   title:     page title (defaults to the project headline)
//   period:    shown in the intro line (defaults to the project year)
//   stats:     [{ value, label }] intro key figures (default to the project metrics)
//   hero:      image (defaults to the project cover)
//   facts:     [{ label, text }]  role, team, scope…
//   context:   { title, text: string[], figure }
//   challenge: { title, text }
//   research:  { title, text, stats: [{ value, label }], quote: { text, source }, figure }
//   problem:   { title, points: [{ title, text }] }
//   solution:  { title, text, features: [{ title, text }], comparison: { title, before: figure, after: figure } }
//   gallery:   { title, featured: figure, figures: figure[] }
//   impact:    { title, stats: [{ value, label }], text }
// }
//
// image: { src, alt, width, height }, figure: image + { caption }

const AKUR8_CORE = '/assets/images/projects/akur8-core-redesign'

export const caseStudies = {
  'akur8-core-redesign': {
    title: 'Rebuilding our core product from scratch to enable the end-to-end vision',
    period: '2025 – 2026',
    stats: [
      { value: '3', label: 'Squads' },
      { value: '12', label: 'Months' },
      { value: '$M', label: 'Revenue growth targeted' },
      { value: '350+', label: 'Clients migrated' },
    ],
    hero: {
      src: `${AKUR8_CORE}/hero.png`,
      alt: 'Rebuilt Rate product showing a model block coefficient table',
      width: 1214,
      height: 758,
    },
    facts: [
      { label: 'Role', text: 'Product Designer, Ratings squad. Sole mid-level designer on a senior-heavy project.' },
      { label: 'Team', text: '3 squads, each PM + PD + 4–6 engineers: Inputs, Ratings, Analysis.' },
      { label: 'Scope', text: 'Initiated patterns for all squads. Owned the Model block, the most critical and complex piece.' },
      { label: 'Timeline', text: '12 months, MVP to production-ready.' },
    ],
    context: {
      title: 'Akur8, the transparent AI pricing platform',
      text: [
        'Akur8 helps insurance actuaries make better pricing decisions, faster. It sits between manual Excel work (transparent but slow) and generic ML tools (automatic but a black box): automated, and fully traceable.',
        'The product ecosystem covers the whole actuarial journey, from data to deployment. That end-to-end vision is the competitive advantage, but one product was holding it back.',
      ],
      figure: {
        src: `${AKUR8_CORE}/rate-before-rebuild.png`,
        alt: 'Rate before the rebuild, with a node-based structure',
        width: 1184,
        height: 678,
        caption: 'Rate before the rebuild: a node-based structure combining models and operations.',
      },
    },
    challenge: {
      title: 'Rate: the weak link in our end-to-end vision',
      text: 'Rate started as a simple aggregation feature and grew into a pile of features that couldn’t support the vision. Deploy could generate 3× higher revenue than Rate, but Rate couldn’t handle the same level of complexity.',
    },
    research: {
      title: 'Interviews to understand and prioritise',
      text: 'Research focused each feature on a real user need and tested the direction early, even with limited meeting time. We demoed hi-fi prototypes with instructions.',
      stats: [
        { value: '26', label: 'Internal SMEs (actuarial data scientists)' },
        { value: '10', label: 'External clients (design partners, at-risk accounts)' },
      ],
      quote: {
        text: 'Structures can have 1000+ blocks, and each block can have N variants.',
        source: 'Actuarial data scientist, internal interview',
      },
      figure: {
        src: `${AKUR8_CORE}/level-management.png`,
        alt: 'Cloned projects used to manage variable levels by hand',
        width: 1106,
        height: 634,
        caption: 'Level management: projects can’t handle multiple databases, so users clone them and handle levels by hand.',
      },
    },
    problem: {
      title: 'Rate doesn’t support the complexity our users need',
      points: [
        { title: 'Users are limited', text: 'They need 2+ dimension interactions and variables with more than 256 levels.' },
        { title: 'Iterating is slow', text: 'When complexity increases by 1, compute time doubles.' },
        { title: 'Shipping is painful', text: 'Pushing a rater to production through Deploy is slow and manual.' },
      ],
    },
    solution: {
      title: 'Rate must change its foundations, starting with the Model block',
      text: 'The Model block is the central piece: it handles all the complexity, and everything else depends on it. Its journey runs Import → Inspect → Update → Export.',
      features: [
        { title: 'Table view as default', text: 'Best representation for a list of editable coefficients, and required by regulators.' },
        { title: 'Data-agnostic architecture', text: 'Each block contains its own coefficients.' },
        { title: 'Flexible models', text: 'Edit intercept and coefficients, add or delete variables, edit pure premium.' },
        { title: 'Multi-way interactions', text: 'More than 2-way interactions, with unlimited levels.' },
        { title: 'Simpler scenarios', text: 'One central place to tag scenarios. Imported variants stay read-only.' },
        { title: 'Import / export complete models', text: 'Excel-friendly formats, no JSON required.' },
      ],
      comparison: {
        title: 'Import: from file upload to guided flow',
        before: {
          src: `${AKUR8_CORE}/import-before.png`,
          alt: 'Previous import screen based on a file upload',
          width: 901,
          height: 514,
          caption: 'Constrained import, manual JSON, strict header rules.',
        },
        after: {
          src: `${AKUR8_CORE}/import-after.png`,
          alt: 'New guided import flow',
          width: 822,
          height: 514,
          caption: 'UI-guided definition, flexible header matching, XLSX support.',
        },
      },
    },
    gallery: {
      title: 'Inspect, edit, compare, export',
      featured: {
        src: `${AKUR8_CORE}/graph-view.png`,
        alt: 'Model block graph view next to the coefficient table',
        width: 891,
        height: 556,
        caption: 'Graph view: table shows exact values, graph shows patterns. Both stay in sync in real time.',
      },
      figures: [
        {
          src: `${AKUR8_CORE}/edit.png`,
          alt: 'Editing coefficients with inline warnings',
          width: 1214,
          height: 758,
          caption: 'Edits with 10+ info, 20+ warning and 8 error states.',
        },
        {
          src: `${AKUR8_CORE}/compare.png`,
          alt: 'Current and indicated factors compared side by side',
          width: 890,
          height: 556,
          caption: 'Comparing current and indicated factors side by side.',
        },
        {
          src: `${AKUR8_CORE}/export.png`,
          alt: 'Export options for a model block',
          width: 948,
          height: 543,
          caption: 'Export to CSV, JSON, PMML or straight to Deploy.',
        },
        {
          src: `${AKUR8_CORE}/migration.png`,
          alt: 'Migrated project linked to its previous version',
          width: 1058,
          height: 661,
          caption: 'Migration of 350+ clients, keeping a link to the old project.',
        },
      ],
    },
    impact: {
      title: 'From low-stickiness product to ecosystem lock-in',
      stats: [
        { value: '10×', label: 'Faster computations on average' },
        { value: '<1 min', label: 'Compute time for large projects' },
        { value: '500K', label: 'Levels per variable (256 max before)' },
        { value: '+145M$', label: 'Revenue unlocked across the pricing suite' },
      ],
      text: 'Rate became the place to build a production rater and test its impact quickly. Users can now represent complex structures, iterate fast, and push to production through Deploy.',
    },
  },

  // TODO: 'akur8-agentic-mvp' content. Until then its page shows the intro,
  // built from projects.js (headline, metrics, cover).
}
