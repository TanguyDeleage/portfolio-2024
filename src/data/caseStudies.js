// Content of the dedicated project pages (ProjectPage.vue), keyed by project id.
// The page itself comes from the project's `links.page` in projects.js.
//
// The body is a list of sections that all share one template. Every field is
// optional, in the sections as in the page:
//
// {
//   title:    page title (defaults to the project headline)
//   hero:     image (defaults to the project cover)
//   logo:     { src, width, height }  company logo opening the meta row under the hero
//             (defaults to the project title as text)
//   facts:    [{ label, text }]  role, team, scope… on the meta row next to the company
//   sections: [{
//     display: big title on the left (e.g. 'Context'). Sections with one are
//              numbered and listed in the sticky summary on the left
//     title:   short bold lead
//     text:    string or string[] (one paragraph each)
//     media:   [{ layout, figures }]  one row of images per entry
//              layout: 'big'   (default) one image at reading width
//                      'bleed' one image on a full-width tinted band
//                      'pair'  two images side by side
//   }]
// }
//
// image: { src, alt, width, height }, figure: image + { caption }
// Videos (.mp4/.webm) work wherever an image does. Their poster is the first frame,
// <name>.poster.webp next to the video: run `npm run posters` after adding or changing one.

const AKUR8_CORE = '/assets/images/projects/akur8-core-redesign'

export const caseStudies = {
  'akur8-core-redesign': {
    title: 'Rebuild a core product from scratch to enable the company’s end-to-end vision',
    hero: {
      src: `${AKUR8_CORE}/intro.mp4`,
      alt: 'Rebuilt Rate product showing a model block coefficient table',
      width: 1920,
      height: 1080,
    },
    facts: [
      { label: 'Timeline', text: 'Sept. 2025 - Nov. 2026' },
      { label: 'Role', text: 'Product Designer' },
      { label: 'Team', text: '3x Squads: PM + PrD + [4, 6] Engineers' },
      { label: 'Scope', text: 'Owned the Model block, the most critical and complex piece. Initiated patterns for all squads.' },
    ],
    sections: [
      {
        display: 'Context',
        title: 'Actuaries need both power and transparency, and Akur8 is built to give them both.',
        text: 'Actuaries are insurance experts who price risk using statistics and machine learning. They need power: ML algorithms that automate their work. And they need transparency: a traceable solution that holds up to audits in a heavily regulated field.',
        media: [
          {
            figures: [{
              src: `${AKUR8_CORE}/pricing-approaches.png`,
              alt: 'Comparison of the traditional approach, generic ML algorithms and Akur8 on automation and transparency',
              width: 3632,
              height: 702,
              caption: 'Traditional approach, generic ML and Akur8: only Akur8 is both automatic and fully transparent.',
            }],
          },
        ],
      },
      {
        continued: true,
        columns: [
          {
            title: 'The end-to-end ecosystem is our edge, but one critical product held it back.',
            text: 'Akur8’s products cover the whole actuarial journey. While Deploy was built to fit complex uses, Rate couldn’t handle the same level of complexity. It started as a simple aggregation feature, then grew by piling feature on feature until it became messy and impossible to scale.',
          },
          {
            title: 'The consequences were real.',
            text: 'Deals at risk with users who weren’t fully satisfied, lost ground to more mature competitors, and a hard time upselling existing clients without stickiness across products.',
          },
        ],
        media: [
          {
            figures: [{
              src: `${AKUR8_CORE}/product-ecosystem.png`,
              alt: 'Akur8 product ecosystem from 2022 to 2025: Data, Risk, Demand, Rate, Optim, Repository and Deploy, with Rate at the centre',
              width: 2646,
              height: 1105,
              caption: 'The actuarial journey: Rate connects every product, including Repository and Deploy.',
            }],
          },
        ],
      },
      {
        display: 'Discovery',
        title: 'First, understand the actuary’s job: fitting and scoring a model.',
        text: 'Actuaries learn a model from historical data, then run new quotes through it to price them.',
        media: [
          {
            figures: [{
              src: `${AKUR8_CORE}/model-fitting.png`,
              alt: 'Historical data with age, car, region and claims goes into a model such as a GLM, which estimates a multiplicative effect for each variable level',
              width: 2720,
              height: 1040,
              caption: 'Fitting a model: historical claims become an estimated effect for each variable.',
            }],
          },
        ],
      },
      {
        continued: true,
        columns: [
          {
            title: 'Then, score the model to quote new clients.',
            text: 'A second database holds the quotes. Each row, a prospect, goes through the rating structure: fitted models combined with business rules, across different coverages. Out comes the price offered to that client.',
          },
          {
            title: 'Rate is where that rating structure is built.',
            text: 'Rate is the existing product where fitted models turn into a price. Before the rebuild, it covered three jobs: building the structure, iterating with scenarios, and analysing the outcomes.',
          },
        ],
        media: [
          {
            figures: [{
              src: `${AKUR8_CORE}/rate-before-rebuild.png`,
              alt: 'Rate before the rebuild: a technical premium structure combining frequency and severity models',
              width: 1184,
              height: 678,
              caption: 'Rate before the rebuild: models and operations combined into one structure.',
            }],
          },
        ],
      },
      {
        continued: true,
        columns: [
          {
            title: 'Build a structure.',
            text: 'Combine models and operations into one structure that a single database flows through.',
          },
          {
            title: 'Iterate with scenarios.',
            text: 'Each block can have variants, and scenarios combine variants to test alternatives.',
          },
          {
            title: 'Analyse and report.',
            text: 'Compare the outcomes of scenarios: premiums, loss ratios, rate changes and KPIs.',
          },
        ],
      },
      {
        display: 'Problem definition',
        title: 'Rate doesn’t support the complexity our users need.',
        text: 'Validated through 26 interviews with internal actuarial experts and 10 with clients.',
      },
      {
        continued: true,
        columns: [
          {
            title: 'Users are limited.',
            text: 'The intercept isn’t visible, interactions stop at 2 dimensions, variables cap at 256 levels, and coefficients aren’t easy to edit.',
          },
          {
            title: 'Iterating is slow.',
            text: 'Large structures are painful to iterate on: every added level of complexity doubles compute time.',
          },
          {
            title: 'Pushing a rater to production is painful.',
            text: 'Going through Deploy requires a lot of manual work.',
          },
        ],
      },
      {
        display: 'Solution',
        title: 'Change Rate’s foundations, starting with the Model block.',
        text: 'The Model block handles all the complexity, and everything else depends on it.',
        media: [
          {
            figures: [{
              src: `${AKUR8_CORE}/user-journey.png`,
              alt: 'Model block user journey: Import from Risk, Demand, files or the UI; Inspect in table and graph views; Update coefficients, intercept and variables; Export to Rate Repository and Deploy. Each step has its own challenge.',
              width: 3840,
              height: 742,
            }],
          },
        ],
      },

      // TODO: Pillar 1 — dense, split into sub-sections (each: title + paragraph + video)
      {
        continued: true,
        title: 'Pillar 1 — Users are limited',
        text: 'The challenge: one layout, infinite complexity. It had to let users see and edit the intercept, surface levels that exist in the data but not in the model, handle several match types per variable, and represent interactions across three or more variables.',
      },
      {
        continued: true,
        media: [{ figures: [{
          src: `${AKUR8_CORE}/inspect.mp4`,
          alt: 'Inspecting a model block, from simple coefficients to multi-way interactions',
          width: 1920,
          height: 1080,
          caption: 'Inspect: the table as the primary view. Regulators require exact coefficients to be visible.',
        }] }, {
          figures: [{
            src: `${AKUR8_CORE}/edit.mp4`,
            alt: 'Editing coefficients directly in the model block table',
            width: 1920,
            height: 1080,
            caption: 'Edit: Power and control through table for scalability and graph for trends visualization.',
          }],
        }],
      },

      // TODO: Pillar 2 — title + 1-2 paragraphs + video or picture
      {
        continued: true,
        title: 'Pillar 2 — Iterating is slow',
        text: 'A rating structure is made of blocks, and each block can have variants: alternative versions of a model. The old approach turned every combination of variants into its own scenario. With structures of 1,000+ blocks and N variants each, the work multiplied and split across scenarios. And since any variant could be edited, no one could tell which one was the original.',
        media: [{ figures: [{
          src: `${AKUR8_CORE}/scenarios-variants.png`,
          alt: 'Old approach: two blocks with two variants each produce four scenarios, one per combination. New approach: only the two scenarios needed are built, each associating one variant to each block.',
          width: 3692,
          height: 1116,
          caption: 'Old vs new: a scenario is now simply a choice of one variant per block. The imported variant stays read-only as the source of truth.',
        }] }],
      },

      // TODO: Pillar 3 — title + 1-2 paragraphs + video or picture
      {
        continued: true,
        title: 'Pillar 3 — Pushing a rater to production is painful',
        text: 'Errors are now caught in Rate, so everything pushed to Deploy is correct by design. Models export in an API-ready format, checks run before anything reaches Deploy, and every version is tracked.',
        media: [{ figures: [{
          src: `${AKUR8_CORE}/export.png`,
          alt: 'Export dialog for a model block, with value and decimal separators, the variant to export and format options',
          width: 1880,
          height: 1070,
        }] }],
      },
      {
        display: 'Impact',
        // *word* is shown emphasised
        title: 'Rate *does* support the complexity our users need.',
        text: [
          'Computations are 10× faster on average, large projects compute in under a minute, and variables now support up to 500K levels, up from 256.',
          'While the new Rate’s impact is hard to quantify precisely, the project was clearly instrumental in unlocking broader product growth, alongside its own.',
        ],
        // Shows the project's metrics (from projects.js) between the text and the picture
        metrics: true,
        media: [
          {
            figures: [{
              src: `${AKUR8_CORE}/impact.png`,
              alt: 'Business impact: 60–200k$ churn avoided per Rate deal each year, upsells of 60–200k$ per Rate deal and 300–400k$ per Deploy deal, new business from 100k$ per deal from Risk to Deploy. Revenue grows from 31M$ in 2024 to 45M$ in 2025, 70M$ in 2026, and a projected 104M$ in 2027 and 145M$ in 2028.',
              width: 3460,
              height: 1728,
            }],
          },
        ],
      },
    ],
  },

  // TODO: 'akur8-agentic-mvp' content. Until then its page shows the intro,
  // built from projects.js (headline, cover).
}
