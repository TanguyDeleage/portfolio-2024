<template>
  <div class="project-page">
    <!-- Private work sits behind the same soft gate as the Work section -->
    <section v-if="isLocked" class="gate container" aria-labelledby="gate-title">
      <a href="/#work" class="btn secondary small back-link">
        <WorkIcon name="arrow-left" />
        Back to projects
      </a>
      <div class="gate-content">
        <p class="eyebrow">{{ project.title }} · Private case study</p>
        <h1 id="gate-title" class="page-title">{{ title }}</h1>
        <p class="text muted">This project is confidential. Enter the password to read the full case study.</p>
        <button type="button" class="btn primary" @click="$refs.unlockDialog.open()">
          Unlock projects
          <WorkIcon name="lock-open" />
        </button>
      </div>
      <UnlockDialog ref="unlockDialog" />
    </section>

    <template v-else>
      <!-- Intro -->
      <header id="top" class="intro container">
        <a href="/#work" class="btn secondary small back-link">
          <WorkIcon name="arrow-left" />
          Back to projects
        </a>
        <p class="eyebrow intro-meta">
          <template v-for="(item, index) in meta" :key="item">
            <span v-if="index" aria-hidden="true">·</span>
            <span>{{ item }}</span>
          </template>
        </p>
        <h1 class="page-title">{{ title }}</h1>
        <ul v-if="stats.length" class="stats intro-stats">
          <li v-for="stat in stats" :key="stat.label" class="stat">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </li>
        </ul>
      </header>

      <div class="hero wide">
        <img :src="hero.src" :alt="hero.alt" :width="hero.width" :height="hero.height" decoding="async">
      </div>

      <!-- Role & team -->
      <dl v-if="caseStudy.facts" class="facts container">
        <div v-for="fact in caseStudy.facts" :key="fact.label" class="fact">
          <dt class="eyebrow">{{ fact.label }}</dt>
          <dd>{{ fact.text }}</dd>
        </div>
      </dl>

      <!-- Context -->
      <section v-if="context" id="context" class="section container" aria-labelledby="context-title">
        <div class="split">
          <div class="heading">
            <p class="eyebrow">{{ eyebrows.context }}</p>
            <h2 id="context-title" class="section-title">{{ context.title }}</h2>
          </div>
          <div class="body">
            <p v-for="(paragraph, index) in context.text" :key="index" class="text" :class="{ muted: index > 0 }">{{ paragraph }}</p>
          </div>
        </div>
        <CaseFigure v-if="context.figure" :figure="context.figure" class="section-figure" />
      </section>

      <!-- Challenge -->
      <section v-if="challenge" id="challenge" class="section container" aria-labelledby="challenge-title">
        <div class="heading">
          <p class="eyebrow">{{ eyebrows.challenge }}</p>
          <h2 id="challenge-title" class="section-title narrow">{{ challenge.title }}</h2>
          <p v-if="challenge.text" class="text muted measure">{{ challenge.text }}</p>
        </div>
      </section>

      <!-- Research -->
      <section v-if="research" id="research" class="section container" aria-labelledby="research-title">
        <div class="split">
          <div class="heading">
            <p class="eyebrow">{{ eyebrows.research }}</p>
            <h2 id="research-title" class="section-title">{{ research.title }}</h2>
            <p v-if="research.text" class="text muted">{{ research.text }}</p>
          </div>
          <ul v-if="research.stats" class="stat-cards">
            <li v-for="stat in research.stats" :key="stat.label" class="stat stat-card">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ stat.label }}</span>
            </li>
          </ul>
        </div>
        <figure v-if="research.quote" class="quote">
          <blockquote>
            <p>“{{ research.quote.text }}”</p>
          </blockquote>
          <figcaption>{{ research.quote.source }}</figcaption>
        </figure>
        <CaseFigure v-if="research.figure" :figure="research.figure" :class="{ 'section-figure': !research.quote }" />
      </section>

      <!-- Problem: inverted band -->
      <section v-if="problem" id="problem" class="problem" aria-labelledby="problem-title">
        <div class="container">
          <div class="heading">
            <p class="eyebrow">{{ eyebrows.problem }}</p>
            <h2 id="problem-title" class="problem-title">{{ problem.title }}</h2>
          </div>
          <ul v-if="problem.points" class="points">
            <li v-for="point in problem.points" :key="point.title" class="point">
              <h3 class="point-title">{{ point.title }}</h3>
              <p class="point-text">{{ point.text }}</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- Solution -->
      <section v-if="solution" id="solution" class="section container" aria-labelledby="solution-title">
        <div class="heading">
          <p class="eyebrow">{{ eyebrows.solution }}</p>
          <h2 id="solution-title" class="section-title narrow">{{ solution.title }}</h2>
          <p v-if="solution.text" class="text muted measure">{{ solution.text }}</p>
        </div>

        <ol v-if="solution.features" class="features">
          <li v-for="(feature, index) in solution.features" :key="feature.title" class="feature">
            <span class="feature-index" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="feature-title">{{ feature.title }}</span>
            <span class="feature-text">{{ feature.text }}</span>
          </li>
        </ol>

        <div v-if="solution.comparison" class="subsection">
          <h3 class="subsection-title">{{ solution.comparison.title }}</h3>
          <div class="pair">
            <CaseFigure :figure="solution.comparison.before" label="Before" />
            <CaseFigure :figure="solution.comparison.after" label="After" />
          </div>
        </div>
      </section>

      <!-- Gallery: tinted full-width band -->
      <section v-if="gallery" class="gallery" :aria-labelledby="gallery.title ? 'gallery-title' : null">
        <div v-if="gallery.title" class="container">
          <h3 id="gallery-title" class="subsection-title">{{ gallery.title }}</h3>
        </div>
        <div class="gallery-band">
          <div class="gallery-grid wide">
            <CaseFigure v-if="gallery.featured" :figure="gallery.featured" elevated />
            <div v-if="gallery.figures" class="pair">
              <CaseFigure v-for="figure in gallery.figures" :key="figure.src" :figure="figure" elevated />
            </div>
          </div>
        </div>
      </section>

      <!-- Impact -->
      <section v-if="impact" id="impact" class="section container" aria-labelledby="impact-title">
        <div class="heading">
          <p class="eyebrow">{{ eyebrows.impact }}</p>
          <h2 id="impact-title" class="section-title narrow">{{ impact.title }}</h2>
        </div>
        <ul v-if="impact.stats" class="impact-stats">
          <li v-for="stat in impact.stats" :key="stat.label" class="stat impact-stat">
            <span class="stat-value">{{ stat.value }}</span>
            <span class="stat-label">{{ stat.label }}</span>
          </li>
        </ul>
        <p v-if="impact.text" class="text muted measure impact-text">{{ impact.text }}</p>
      </section>

      <!-- Previous / next -->
      <footer class="page-footer">
        <div class="container">
          <nav v-if="adjacent.length" class="adjacent" aria-label="More projects">
            <a
              v-for="item in adjacent"
              :key="item.direction"
              :href="item.href"
              class="adjacent-link secondary"
              :class="item.direction"
              v-bind="item.external ? { target: '_blank', rel: 'noopener' } : {}"
            >
              <span class="eyebrow adjacent-direction">
                <WorkIcon v-if="item.direction === 'previous'" name="arrow-left" />
                {{ item.label }}
                <WorkIcon v-if="item.direction === 'next'" :name="item.external ? 'external-link' : 'arrow-right'" />
              </span>
              <span class="adjacent-title">{{ item.project.headline }}</span>
              <span v-if="item.project.description" class="adjacent-text">{{ item.project.description }}</span>
              <span v-if="item.external" class="visually-hidden">(opens in a new tab)</span>
            </a>
          </nav>

          <div class="footer-actions">
            <a href="/#work" class="btn secondary small">
              <WorkIcon name="arrow-left" />
              Back to projects
            </a>
            <a href="#top" class="btn secondary small">
              Back to top
              <WorkIcon name="arrow-up" />
            </a>
          </div>
        </div>
      </footer>
    </template>
  </div>
</template>

<script>
import CaseFigure from './CaseFigure.vue'
import UnlockDialog from './UnlockDialog.vue'
import WorkIcon from './WorkIcon.vue'
import { projects } from '../data/projects.js'
import { caseStudies } from '../data/caseStudies.js'
import { isProjectLocked } from '../data/privateAccess.js'

// Numbered sections, in page order
const SECTION_LABELS = {
  context: 'Context',
  challenge: 'Challenge',
  research: 'Research',
  problem: 'Problem definition',
  solution: 'Solution',
  impact: 'Impact',
}

// Same destination as the project's primary CTA in the Work section
function projectLink(project) {
  return project.links?.page
    ? { href: project.links.page, external: false }
    : { href: project.links?.caseStudy, external: true }
}

export default {
  name: 'ProjectPage',
  components: { CaseFigure, UnlockDialog, WorkIcon },
  props: {
    project: { type: Object, required: true },
  },
  computed: {
    isLocked() {
      return isProjectLocked(this.project)
    },
    caseStudy() {
      return caseStudies[this.project.id] ?? {}
    },
    title() {
      return this.caseStudy.title ?? this.project.headline
    },
    meta() {
      return [this.project.title, this.caseStudy.period ?? this.project.year, this.project.tags?.[0]].filter(Boolean)
    },
    stats() {
      return this.caseStudy.stats ?? this.project.metrics ?? []
    },
    hero() {
      return this.caseStudy.hero ?? this.project.cover
    },
    context() {
      return this.caseStudy.context
    },
    challenge() {
      return this.caseStudy.challenge
    },
    research() {
      return this.caseStudy.research
    },
    problem() {
      return this.caseStudy.problem
    },
    solution() {
      return this.caseStudy.solution
    },
    gallery() {
      return this.caseStudy.gallery
    },
    impact() {
      return this.caseStudy.impact
    },
    // "01 — Context"…, numbered by the sections this project actually has
    eyebrows() {
      const present = Object.keys(SECTION_LABELS).filter(key => this.caseStudy[key])
      return Object.fromEntries(present.map((key, index) => [
        key,
        `${String(index + 1).padStart(2, '0')} — ${SECTION_LABELS[key]}`,
      ]))
    },
    adjacent() {
      const index = projects.indexOf(this.project)
      return [
        { direction: 'previous', label: 'Previous project', project: projects[index - 1] },
        { direction: 'next', label: 'Next project', project: projects[index + 1] },
      ]
        .filter(item => item.project)
        .map(item => ({ ...item, ...projectLink(item.project) }))
        .filter(item => item.href)
    },
  },
  watch: {
    title() {
      this.updateDocumentTitle()
    },
  },
  mounted() {
    this.homeTitle = document.title
    this.updateDocumentTitle()
  },
  beforeUnmount() {
    document.title = this.homeTitle
  },
  methods: {
    updateDocumentTitle() {
      document.title = `${this.title} | Tanguy DELEAGE`
    },
  },
}
</script>

<style scoped>
  .project-page {
    color: var(--primary-brand-highest);
  }

  /* Reading width; images and bands go wider */
  .container {
    width: 100%;
    max-width: 75rem;
    margin-inline: auto;
    padding-inline: var(--padding-h);
  }

  .wide {
    width: 100%;
    max-width: 87.5rem;
    margin-inline: auto;
  }

  /* Type */
  .eyebrow {
    font-size: 0.75rem;
    font-weight: var(--light);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #3D3D3D;
  }

  .page-title {
    font-family: 'Eklektyk';
    font-size: 5.25rem;
    font-weight: 300;
    line-height: 100%;
    max-width: 16ch;
    text-wrap: balance;
  }

  .section-title {
    font-family: 'Eklektyk';
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 120%;
    text-wrap: balance;
  }

  .section-title.narrow {
    max-width: 22ch;
  }

  .subsection-title {
    font-family: 'Eklektyk';
    font-size: 2rem;
    font-weight: 300;
    line-height: 100%;
  }

  .text {
    font-size: 1.125rem;
    font-weight: 300;
    line-height: 150%;
    text-wrap: pretty;
  }

  .text.muted {
    color: #3D3D3D;
  }

  .measure {
    max-width: 60ch;
  }

  .stat {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .stat-value {
    font-family: 'Eklektyk';
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 100%;
  }

  .stat-label {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 130%;
    color: #3D3D3D;
  }

  ul,
  ol {
    list-style: none;
    padding: 0;
  }

  /* Buttons: explicit colours, as in ProjectInfo (no blend modes against images) */
  .btn {
    font: inherit;
    font-weight: 600;
    white-space: nowrap;
  }

  .btn.primary,
  .btn.secondary {
    mix-blend-mode: normal;
    border: 1px solid var(--primary-brand-highest);
  }

  .btn.primary {
    align-self: flex-start;
    background-color: var(--primary-brand-highest);
    color: var(--primary-brand-lowest);
  }

  .btn.secondary {
    background-color: var(--primary-brand-lowest);
    color: var(--primary-brand-highest);
  }

  .back-link {
    display: inline-flex;
  }

  /* Gate */
  .gate {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    min-height: 100vh;
    padding-block: 7.5rem var(--padding-v);
  }

  .gate .back-link {
    align-self: flex-start;
  }

  .gate-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Intro */
  .intro {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-block: 7.5rem 3rem;
  }

  .intro .back-link {
    margin-bottom: 3rem;
  }

  .intro-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 2rem;
  }

  .intro-stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2rem;
    align-self: stretch;
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid #D1D1D1;
  }

  .intro-stats .stat-value {
    font-size: 3.4rem;
  }

  .hero {
    padding-inline: var(--padding-h);
  }

  .hero img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 0.5rem;
    border: 1px solid #D1D1D1;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.16);
  }

  /* Role & team */
  .facts {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 2rem;
    padding-top: 4rem;
  }

  .fact {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .fact dd {
    font-size: 0.9375rem;
    font-weight: 300;
    line-height: 150%;
  }

  /* Sections */
  .section {
    padding-top: 7.5rem;
  }

  .heading {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .heading .text {
    margin-top: 0.5rem;
  }

  .split {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6rem;
    align-items: start;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .section-figure {
    margin-top: 3.5rem;
  }

  /* Research */
  .stat-cards {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  .stat-card {
    gap: 0.75rem;
    padding: 1.75rem;
    border-radius: 0.5rem;
    background-color: #F1F0EC;
  }

  .stat-card .stat-value {
    font-size: 3.4rem;
  }

  .quote {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-block: 7.5rem;
  }

  .quote blockquote p {
    font-family: 'Eklektyk';
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 120%;
    max-width: 26ch;
    text-wrap: balance;
  }

  .quote figcaption {
    font-size: 0.875rem;
    font-weight: 300;
    color: #3D3D3D;
  }

  /* Problem */
  .problem {
    margin-top: 7.5rem;
    padding-block: 7.5rem;
    background-color: #0A0A0A;
    color: var(--primary-brand-lowest);
  }

  .problem .eyebrow {
    color: #9b9a97;
  }

  .problem-title {
    font-family: 'Eklektyk';
    font-size: 4rem;
    font-weight: 300;
    line-height: 100%;
    max-width: 20ch;
    text-wrap: balance;
  }

  .points {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2.5rem;
    margin-top: 4rem;
  }

  .point {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid #333;
  }

  .point-title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 130%;
  }

  .point-text {
    font-size: 0.9375rem;
    font-weight: 300;
    line-height: 150%;
    color: #9b9a97;
  }

  /* Solution */
  .features {
    margin-top: 3.5rem;
    border-top: 1px solid #D1D1D1;
  }

  .feature {
    display: grid;
    grid-template-columns: 3rem minmax(0, 1fr) minmax(0, 1.4fr);
    gap: 1.5rem;
    padding-block: 1.375rem;
    border-bottom: 1px solid #D1D1D1;
  }

  .feature-index {
    font-size: 0.875rem;
    font-weight: 300;
    font-variant-numeric: tabular-nums;
    color: #3D3D3D;
  }

  .feature-title {
    font-weight: 600;
  }

  .feature-text {
    font-size: 0.9375rem;
    font-weight: 300;
    line-height: 150%;
    color: #3D3D3D;
  }

  .subsection {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 7.5rem;
  }

  .pair {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  /* Gallery */
  .gallery {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-top: 7.5rem;
  }

  .gallery-band {
    padding: 3.5rem var(--padding-h);
    background-color: #FAFAFA;
  }

  .gallery-grid {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  .gallery-grid .pair {
    gap: 1.75rem;
  }

  /* Impact */
  .impact-stats {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1px;
    margin-top: 3.5rem;
    border: 1px solid #D1D1D1;
    border-radius: 0.5rem;
    background-color: #D1D1D1; /* shows through the gaps as dividers */
    overflow: hidden;
  }

  .impact-stat {
    gap: 0.75rem;
    padding: 2rem 1.75rem;
    background-color: var(--primary-brand-lowest);
  }

  .impact-stat .stat-value {
    font-size: 4rem;
  }

  .impact-text {
    margin-top: 2.5rem;
  }

  /* Previous / next */
  .page-footer {
    margin-top: 7.5rem;
    padding-block: 3.5rem 2.5rem;
    border-top: 1px solid #D1D1D1;
  }

  .adjacent {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  /* Global .secondary hover: halves slide in and invert the card, like the buttons */
  .adjacent-link {
    position: relative;
    overflow: hidden;
    isolation: isolate; /* keeps the hover blend inside the card */
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding: 2rem;
    border: none;
    border-radius: 0.5rem;
    mix-blend-mode: normal;
    background-color: var(--primary-brand-highest);
    color: var(--primary-brand-lowest);
    text-decoration: none;
  }

  /*
    The global halves don't set `left`, so they sit at their static position: fine in
    centred buttons, but in this padded column they'd start at the padding and leave a strip.
  */
  .adjacent-link::before,
  .adjacent-link::after {
    left: 0;
  }

  /* Muted greys meant for white backgrounds would disappear on black */
  .adjacent-link .eyebrow,
  .adjacent-link .adjacent-text {
    color: #9b9a97;
  }

  .adjacent-link.previous {
    grid-column: 1;
  }

  .adjacent-link.next {
    grid-column: 2;
    align-items: flex-end;
    text-align: right;
  }

  .adjacent-direction {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .adjacent-direction .work-icon {
    width: 1rem;
    height: 1rem;
  }

  .adjacent-title {
    font-family: 'Eklektyk';
    font-size: 2rem;
    font-weight: 300;
    line-height: 100%;
    text-wrap: balance;
  }

  .adjacent-text {
    max-width: 44ch;
    font-size: 0.9375rem;
    font-weight: 300;
    line-height: 150%;
    color: #3D3D3D;
    text-wrap: pretty;
  }

  .footer-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 1rem;
    margin-top: 2.5rem;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
    border: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    /* Still inverts on hover, just without the slide */
    .adjacent-link::before,
    .adjacent-link::after {
      transition: none;
    }
  }

  /* Tablet & Mobile */
  @media screen and (max-width: 1199px) {
    .page-title {
      font-size: 4rem;
    }

    .section-title,
    .quote blockquote p {
      font-size: 2rem;
    }

    .problem-title {
      font-size: 2.5rem;
    }

    .section,
    .gallery {
      padding-top: 6rem;
    }

    .problem {
      margin-top: 6rem;
      padding-block: 4rem;
    }

    .quote,
    .subsection {
      margin-block: 4rem;
    }

    .subsection {
      margin-bottom: 0;
    }

    .page-footer {
      margin-top: 6rem;
    }

    .intro {
      padding-top: 4rem;
    }

    .gate {
      padding-top: 4rem;
    }

    .split {
      grid-template-columns: minmax(0, 1fr);
      gap: 2rem;
    }

    .intro-stats,
    .facts,
    .impact-stats {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .points {
      grid-template-columns: minmax(0, 1fr);
      gap: 1.5rem;
    }

    .gallery-band {
      padding-block: 2rem;
    }

    .adjacent-link {
      padding: 1.5rem;
    }

    .adjacent-title,
    .subsection-title {
      font-size: 1.5rem;
    }

    .impact-stat .stat-value {
      font-size: 3rem;
    }

    .btn {
      font-size: 0.875rem;
    }
  }

  /* Mobile */
  @media screen and (max-width: 768px) {
    .page-title {
      font-size: 2.8rem;
    }

    .text {
      font-size: 1rem;
    }

    .intro {
      padding-top: 1rem;
    }

    .intro .back-link {
      margin-bottom: 2rem;
    }

    .intro-stats {
      margin-top: 2.5rem;
    }

    .intro-stats .stat-value,
    .stat-card .stat-value {
      font-size: 2.5rem;
    }

    .facts,
    .impact-stats,
    .pair,
    .adjacent {
      grid-template-columns: minmax(0, 1fr);
    }

    .stat-cards {
      gap: 1rem;
    }

    .stat-card {
      padding: 1.25rem;
    }

    .feature {
      grid-template-columns: 2rem minmax(0, 1fr);
      gap: 0.25rem 1rem;
    }

    .feature-text {
      grid-column: 2;
    }

    .adjacent-link.previous,
    .adjacent-link.next {
      grid-column: auto;
    }
  }
</style>
