<template>
  <div class="project-page">
    <!-- Private work sits behind the same soft gate as the Work section -->
    <section v-if="isLocked" class="gate" aria-labelledby="gate-title">
      <!-- Same link, same spot as the case study's "Back to projects" once the company is stuck -->
      <div class="gate-nav wide">
        <a href="/#work" class="text-link">
          <WorkIcon name="arrow-left" />
          Back to projects
        </a>
      </div>
      <div class="gate-content container">
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
      <!-- Hero: full bleed picture or video at the very top (no site header on case studies) -->
      <div class="hero">
        <video
          v-if="isVideo(hero.src)"
          :src="hero.src"
          :poster="heroPoster"
          :aria-label="hero.alt"
          :width="hero.width"
          :height="hero.height"
          autoplay
          loop
          muted
          playsinline
        />
        <img v-else :src="hero.src" :alt="hero.alt" :width="hero.width" :height="hero.height" decoding="async">
      </div>

      <!--
        Left column runs the whole layout so both of its blocks can stick:
        the company sticks first (a back link fades in above it), then the
        summary scrolls up to it and sticks right below.
      -->
      <!-- "Back to top" lands here, past the video, see scroll-margin-top -->
      <div id="top" ref="layout" class="case-layout wide">
        <aside class="rail rail-left">
          <div ref="brand" class="brand" :class="{ stuck: brandStuck }">
            <a href="/#work" class="text-link brand-back" :inert="!brandStuck">
              <WorkIcon name="arrow-left" />
              Back to projects
            </a>
            <img
              v-if="caseStudy.logo"
              :src="caseStudy.logo.src"
              :alt="project.title"
              :width="caseStudy.logo.width"
              :height="caseStudy.logo.height"
              class="company-logo"
            >
            <p v-else class="company-name">{{ project.title }}</p>
          </div>

          <nav
            v-if="summary.length"
            class="summary"
            aria-label="Summary"
            :style="summaryOffset == null ? null : { marginTop: `${summaryOffset}px` }"
          >
            <ol class="summary-list">
              <li v-for="section in summary" :key="section.id">
                <a
                  :href="`#${section.id}`"
                  class="summary-link"
                  :class="{ active: section.id === activeId }"
                  :aria-current="section.id === activeId ? 'true' : null"
                >
                  <span class="summary-index" aria-hidden="true">{{ section.number }}</span>
                  <span class="summary-title">{{ section.display }}</span>
                </a>
              </li>
            </ol>
          </nav>
        </aside>

        <!-- Info row: timeline, role, team, scope… next to the company -->
        <dl v-if="caseStudy.facts" class="meta">
          <div v-for="fact in caseStudy.facts" :key="fact.label" class="fact">
            <dt class="eyebrow">{{ fact.label }}</dt>
            <dd>{{ fact.text }}</dd>
          </div>
        </dl>

        <div ref="content" class="case-content">
          <header class="intro">
            <h1 class="page-title">{{ title }}</h1>
          </header>

          <!-- Sections: big title + title + text + images, all optional -->
          <section
            v-for="(section, index) in sections"
            :id="section.id"
            :key="index"
            class="section"
            :class="{ continued: section.continued }"
            :aria-labelledby="section.display ? `${section.id}-title` : null"
          >
            <div v-if="section.columns.length" class="split columns" :style="{ '--columns': section.columns.length }">
              <div v-for="(column, i) in section.columns" :key="i" class="body">
                <p v-if="column.title" class="lead">{{ column.title }}</p>
                <p v-for="(paragraph, j) in [column.text ?? []].flat()" :key="j" class="text muted">{{ paragraph }}</p>
              </div>
            </div>
            <div v-else-if="section.display || section.title || section.paragraphs.length" class="split">
              <h2 v-if="section.display" :id="`${section.id}-title`" class="display-title">{{ section.display }}</h2>
              <div v-if="section.title || section.paragraphs.length" class="body">
                <p v-if="section.title" class="lead">
                  <template v-for="(part, i) in section.title.split('*')" :key="i">
                    <em v-if="i % 2">{{ part }}</em><template v-else>{{ part }}</template>
                  </template>
                </p>
                <p v-for="(paragraph, i) in section.paragraphs" :key="i" class="text muted">{{ paragraph }}</p>
              </div>
            </div>

            <!-- KPIs: the same metrics as the project intro, so both stay in sync -->
            <ul v-if="section.metrics && project.metrics?.length" class="closing-metrics">
              <li v-for="metric in project.metrics" :key="metric.label" class="closing-metric">
                <span class="closing-metric-value">{{ metric.value }}</span>
                <span class="closing-metric-label">{{ metric.label }}</span>
              </li>
            </ul>

            <template v-for="(row, i) in section.media" :key="i">
              <div v-if="row.layout === 'bleed'" class="band">
                <CaseFigure v-for="figure in row.figures" :key="figure.src" :figure="figure" elevated />
              </div>
              <div v-else :class="{ pair: row.layout === 'pair' }">
                <CaseFigure v-for="figure in row.figures" :key="figure.src" :figure="figure" />
              </div>
            </template>
          </section>
        </div>

        <aside class="rail rail-right">
          <a href="#top" class="text-link to-top">
            Back to top
            <WorkIcon name="arrow-up" />
          </a>
        </aside>
      </div>

      <!-- Previous / next; a neighbour still in progress shows as a disabled card, not a link -->
      <footer v-if="adjacent.length" class="page-footer">
        <div class="container">
          <nav class="adjacent" aria-label="More projects">
            <component
              :is="item.disabled ? 'div' : 'a'"
              v-for="item in adjacent"
              :key="item.direction"
              class="adjacent-link"
              :class="[item.direction, item.disabled ? 'disabled' : 'secondary']"
              v-bind="item.disabled ? {} : { href: item.href, ...(item.external ? { target: '_blank', rel: 'noopener' } : {}) }"
            >
              <span class="eyebrow adjacent-direction">
                <WorkIcon v-if="item.direction === 'previous'" name="arrow-left" />
                {{ item.label }}
                <template v-if="item.disabled"> · Coming soon</template>
                <WorkIcon v-if="item.direction === 'next'" :name="item.disabled ? 'clock' : item.external ? 'external-link' : 'arrow-right'" />
              </span>
              <span class="adjacent-title">{{ item.project.headline }}</span>
              <span v-if="item.external && !item.disabled" class="visually-hidden">(opens in a new tab)</span>
            </component>
          </nav>
        </div>
      </footer>
    </template>
  </div>
</template>

<script>
import CaseFigure from './CaseFigure.vue'
import UnlockDialog from './UnlockDialog.vue'
import WorkIcon from './WorkIcon.vue'
import { projects, projectLink } from '../data/projects.js'
import { caseStudies } from '../data/caseStudies.js'
import { isProjectLocked } from '../data/privateAccess.js'
import { isVideo, videoPoster } from '../utils/videoPoster.js'

function slugify(text) {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Same destination as the project's primary CTA in the Work section

export default {
  name: 'ProjectPage',
  components: { CaseFigure, UnlockDialog, WorkIcon },
  props: {
    project: { type: Object, required: true },
  },
  data() {
    return {
      // Summary entry of the section being read
      activeId: null,
      // Company has reached its sticky spot: reveal the back link above it
      brandStuck: false,
      // Space above the summary so it starts level with the content (px, desktop only)
      summaryOffset: null,
    }
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
    hero() {
      return this.caseStudy.hero ?? this.project.cover
    },
    // First-frame poster, so the swap to the playing video is seamless. When the hero falls back
    // to the cover, the cover's own poster (made for the Work card) is not used here
    heroPoster() {
      return videoPoster(this.caseStudy.hero ?? { src: this.hero.src })
    },
    sections() {
      return (this.caseStudy.sections ?? []).map((section, index) => ({
        ...section,
        id: section.display ? slugify(section.display) : `section-${index + 1}`,
        paragraphs: [section.text ?? []].flat(),
        media: section.media ?? [],
        columns: section.columns ?? [],
      }))
    },
    // "01 Context"…, numbered by the sections that have a big title
    summary() {
      return this.sections
        .filter(section => section.display)
        .map((section, index) => ({ ...section, number: String(index + 1).padStart(2, '0') }))
    },
    // A neighbour with nowhere to go stays visible as a disabled card
    adjacent() {
      const index = projects.indexOf(this.project)
      return [
        { direction: 'previous', label: 'Previous project', project: projects[index - 1] },
        { direction: 'next', label: 'Next project', project: projects[index + 1] },
      ]
        .filter(item => item.project)
        .map(item => {
          const link = projectLink(item.project)
          return { ...item, ...link, disabled: !link }
        })
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
    window.addEventListener('scroll', this.onScroll, { passive: true })
    window.addEventListener('resize', this.onScroll, { passive: true })
    // Info row and fonts change heights without a window resize
    this.resizeObserver = new ResizeObserver(this.onScroll)
    this.observeLayout()
    this.onScrollFrame()
  },
  updated() {
    // Sections appear after unlock
    this.observeLayout()
    this.onScrollFrame()
  },
  beforeUnmount() {
    document.title = this.homeTitle
    window.removeEventListener('scroll', this.onScroll)
    window.removeEventListener('resize', this.onScroll)
    cancelAnimationFrame(this.scrollFrame)
    this.resizeObserver.disconnect()
  },
  methods: {
    isVideo,
    onScroll() {
      cancelAnimationFrame(this.scrollFrame)
      this.scrollFrame = requestAnimationFrame(this.onScrollFrame)
    },
    onScrollFrame() {
      this.updateSummaryOffset()
      this.updateActiveSection()
      this.updateBrandStuck()
    },
    observeLayout() {
      const layout = this.$refs.layout
      if (layout && layout !== this.observedLayout) {
        this.resizeObserver.disconnect()
        this.resizeObserver.observe(layout)
        this.observedLayout = layout
      }
    },
    // The summary sits in the same column as the company, but starts level with the content
    updateSummaryOffset() {
      const { brand, content } = this.$refs
      const summary = brand?.nextElementSibling
      let offset = null
      if (brand && content && summary && getComputedStyle(summary).position === 'sticky') {
        // Measured from the column, not the brand: once stuck, the brand's box moves
        const column = brand.parentElement.getBoundingClientRect()
        offset = Math.max(0, Math.round(content.getBoundingClientRect().top - column.top - brand.offsetHeight))
      }
      if (offset !== this.summaryOffset) this.summaryOffset = offset
    },
    updateBrandStuck() {
      const brand = this.$refs.brand
      if (!brand) return
      const style = getComputedStyle(brand)
      // Not sticky (tablet & mobile): the back link just stays visible
      const stuck = style.position !== 'sticky' || brand.getBoundingClientRect().top <= parseFloat(style.top) + 1
      if (stuck !== this.brandStuck) this.brandStuck = stuck
    },
    // Active = last summarised section whose top has passed a line a third of the way down
    updateActiveSection() {
      const line = window.innerHeight / 3
      let activeId = null
      for (const { id } of this.summary) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= line) activeId = id
      }
      // At the very bottom, the last section is the one being read even if it's short
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom && this.summary.length) activeId = this.summary.at(-1).id
      if (activeId !== this.activeId) this.activeId = activeId
    },
    updateDocumentTitle() {
      document.title = `${this.title} | Tanguy DELEAGE`
    },
  },
}
</script>

<style scoped>
  .project-page {
    --brand-top: 5.5rem; /* room for the back link above the company */
    --brand-height: 2.5rem;
    color: var(--primary-brand-highest);
    overflow-x: clip; /* full-bleed bands use 100vw, which includes any scrollbar */
  }

  .container {
    width: 100%;
    max-width: 75rem;
    margin-inline: auto;
    padding-inline: var(--padding-h);
  }

  /* Hero, meta row and the reading layout share these edges */
  .wide {
    width: 100%;
    max-width: 87.5rem;
    margin-inline: auto;
    padding-inline: var(--padding-h);
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
    font-size: 3rem;
    font-weight: 300;
    line-height: 100%;
    text-wrap: balance;
  }

  .display-title {
    font-family: 'Eklektyk';
    font-size: 4rem;
    font-weight: 300;
    line-height: 100%;
    text-wrap: balance;
  }

  .lead {
    font-size: 1.375rem;
    font-weight: var(--semi-bold);
    line-height: 140%;
    text-wrap: pretty;
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

  .btn.primary {
    align-self: flex-start;
    mix-blend-mode: normal;
    border: 1px solid var(--primary-brand-highest);
    background-color: var(--primary-brand-highest);
    color: var(--primary-brand-lowest);
  }

  /* Gate */
  .gate {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    min-height: 80vh;
    padding-bottom: var(--padding-v);
  }

  /* The link's bottom edge lands where the stuck company starts, as in .brand-back */
  .gate-nav {
    display: flex;
    align-items: flex-end;
    height: var(--brand-top);
  }

  .gate-content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Hero */
  .hero {
    position: relative;
    width: 100%;
  }

  .hero img,
  .hero video {
    display: block;
    /* Scales with the viewport width and never crops; capped to the screen height on very wide windows */
    width: 100%;
    height: auto;
    max-height: 100vh;
    max-height: 100svh;
    object-fit: contain;
  }

  /*
    Reading layout
      company + summary | info row ------------------
                        | title, sections | back to top
  */
  .case-layout {
    display: grid;
    grid-template-columns: 12rem minmax(0, 1fr) 10rem;
    gap: 6rem 3rem;
    padding-top: 3rem;
    /* Back to top stops right as the company reaches its sticky spot, so "Back to projects" fades in */
    scroll-margin-top: calc(var(--brand-top) - 3rem);
  }

  .rail-left {
    grid-column: 1;
    grid-row: 1 / span 2;
  }

  /* Info row also takes the right rail's width */
  .meta {
    grid-column: 2 / span 2;
    grid-row: 1;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: minmax(0, 1fr);
    gap: 2rem;
  }

  .case-content {
    grid-column: 2;
    grid-row: 2;
    container-type: inline-size;
  }

  .rail-right {
    grid-column: 3;
    grid-row: 2;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }

  /* Info row */
  .fact {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-top: 1.25rem;
    border-top: 1px solid #D1D1D1;
  }

  .fact dd {
    font-size: 0.9375rem;
    font-weight: 300;
    line-height: 150%;
    text-wrap: pretty;
  }

  /* Company: sticks first, the back link fades in above it */
  .brand {
    position: sticky;
    top: var(--brand-top);
    z-index: 1;
    padding-top: 1.25rem; /* level with the info row labels */
  }

  /* Tertiary link: back to projects, back to top */
  .text-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding-block: 0.25rem;
    font-size: 0.9375rem;
    color: #3D3D3D;
    text-decoration: none;
    white-space: nowrap;
    transition: color 0.15s;
  }

  .text-link:hover {
    color: var(--primary-brand-highest);
  }

  .text-link .work-icon {
    width: 1rem;
    height: 1rem;
  }

  .brand-back {
    position: absolute;
    bottom: 100%;
    left: 0;
    opacity: 0;
    transform: translateY(0.5rem);
    transition: opacity 0.25s ease-out, transform 0.25s ease-out, color 0.15s;
  }

  .brand.stuck .brand-back {
    opacity: 1;
    transform: none;
  }

  .company-name {
    font-family: 'Eklektyk';
    font-size: 2rem;
    line-height: var(--brand-height);
  }

  .company-logo {
    display: block;
    width: auto;
    max-width: 100%;
    height: var(--brand-height);
    object-fit: contain;
    object-position: left center;
  }

  /* Summary: starts level with the content (offset set in JS), then sticks under the company */
  .summary {
    position: sticky;
    top: calc(var(--brand-top) + 1.25rem + var(--brand-height) + 3rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .summary-list {
    display: flex;
    flex-direction: column;
    border-left: 1px solid #D1D1D1;
  }

  .summary-link {
    position: relative;
    display: flex;
    gap: 0.75rem;
    align-items: baseline;
    padding: 0.5rem 0 0.5rem 1rem;
    color: #6B6B6B;
    text-decoration: none;
    transition: color 0.15s;
  }

  /* Indicator over the rail line */
  .summary-link::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: -1px;
    width: 2px;
    background-color: var(--primary-brand-highest);
    transform: scaleY(0);
    transition: transform 0.2s ease-out;
  }

  .summary-link:hover,
  .summary-link.active {
    color: var(--primary-brand-highest);
  }

  .summary-link.active::before {
    transform: scaleY(1);
  }

  .summary-index {
    font-size: 0.75rem;
    font-weight: 300;
    font-variant-numeric: tabular-nums;
  }

  .summary-title {
    font-size: 0.9375rem;
    font-weight: 400;
    line-height: 130%;
  }

  .summary-link.active .summary-title {
    font-weight: var(--semi-bold);
  }

  /* Back to top: pinned to the bottom of the viewport while the content scrolls */
  .to-top {
    position: sticky;
    bottom: 2rem;
  }

  /* Sections */
  .section {
    display: flex;
    flex-direction: column;
    gap: 3.5rem;
    padding-top: 7.5rem;
    scroll-margin-top: 1.5rem;
  }

  .split {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 3rem;
    align-items: start;
    padding-top: 1.75rem;
    border-top: 1px solid #D1D1D1;
  }

  /* Without a big title, text keeps its column */
  .body {
    grid-column: 2;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /* Continuation of the previous section: no divider, closer to it */
  .section.continued {
    padding-top: 3.5rem;
  }

  .continued .split {
    padding-top: 0;
    border-top: none;
  }

  /* Text columns side by side (as many as given), each with its own title */
  .split.columns {
    grid-template-columns: repeat(var(--columns, 2), minmax(0, 1fr));
  }

  .columns .body {
    grid-column: auto;
  }

  /* Narrow reading column: big title above the text */
  @container (max-width: 46rem) {
    .split,
    .split.columns {
      grid-template-columns: minmax(0, 1fr);
      gap: 2rem;
    }

    .body {
      grid-column: auto;
    }

    .display-title {
      font-size: 3rem;
    }
  }

  /* KPIs: three big figures inside a section, between its text and its images */
  .closing-metrics {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 3rem;
  }

  .closing-metric {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .closing-metric-value {
    font-size: 3.5rem;
    font-weight: 400;
    line-height: 100%;
  }

  .closing-metric-label {
    font-size: 1.125rem;
    font-weight: 300;
    line-height: 140%;
    color: #3D3D3D;
  }

  @container (max-width: 46rem) {
    .closing-metrics {
      gap: 1.5rem;
    }

    .closing-metric-value {
      font-size: 2.25rem;
    }

    .closing-metric-label {
      font-size: 1rem;
    }
  }

  .pair {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }

  /* Full-bleed: tint spans the viewport, the image keeps the reading width */
  .band {
    margin-inline: calc(50% - 50vw);
    padding: 3.5rem calc(50vw - 50%);
    background-color: #FAFAFA;
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
  .adjacent-link .eyebrow {
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

  /* Unreleased neighbour: same footprint, dashed and muted, no hover */
  .adjacent-link.disabled {
    border: 1px dashed #8A8A8A;
    background-color: transparent;
    color: #6B6B6B;
    cursor: not-allowed;
  }

  .adjacent-link.disabled .eyebrow {
    color: #8A8A8A;
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
    .adjacent-link::after,
    .summary-link::before,
    .brand-back {
      transition: none;
    }
  }

  /* Tablet & Mobile */
  @media screen and (max-width: 1199px) {
    .page-title {
      font-size: 2.5rem;
    }

    .display-title {
      font-size: 2.5rem;
    }

    .lead {
      font-size: 1.25rem;
    }

    .section {
      padding-top: 6rem;
    }

    .page-footer {
      margin-top: 6rem;
    }

    .meta {
      grid-auto-flow: row;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    /*
      No room for the sidebar: just the main column (company, info row, content).
      The left rail dissolves so the company can sit above the info row; the
      back link and summary go away, and nothing sticks.
    */
    .case-layout {
      grid-template-columns: minmax(0, 1fr);
      gap: 0;
      padding-top: 2.5rem;
      scroll-margin-top: 0; /* nothing sticks here: land on the info strip */
    }

    .rail-left {
      display: contents;
    }

    .brand,
    .meta,
    .case-content {
      grid-column: 1;
      grid-row: auto;
    }

    .brand {
      order: 1;
      position: static;
      display: flex;
      flex-direction: column;
      padding-top: 0;
      margin-bottom: 2rem;
    }

    .brand-back,
    .summary {
      display: none;
    }

    .meta {
      order: 2;
      grid-auto-flow: row;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    /* Static, so the JS knows the summary isn't laid out next to the content */
    .summary {
      position: static;
    }

    .case-content {
      order: 3;
      margin-top: 4rem;
    }

    .rail-right {
      display: none;
    }

    .band {
      padding-block: 2rem;
    }

    .adjacent-link {
      padding: 1.5rem;
    }

    .adjacent-title {
      font-size: 1.5rem;
    }

    .btn {
      font-size: 0.875rem;
    }
  }

  /* Mobile */
  @media screen and (max-width: 768px) {
    .page-title {
      font-size: 2rem;
    }

    .text {
      font-size: 1rem;
    }

    .meta,
    .pair,
    .adjacent {
      grid-template-columns: minmax(0, 1fr);
    }

    .adjacent-link.previous,
    .adjacent-link.next {
      grid-column: auto;
    }
  }
</style>
