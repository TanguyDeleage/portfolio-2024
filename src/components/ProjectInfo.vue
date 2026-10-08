<template>
  <div class="project-info">
    <!-- Story: who / what -->
    <div class="story">
      <div class="identity">
        <h3 class="project-title">{{ project.title }}</h3>
        <p class="project-role">{{ project.role }}<template v-if="project.year"> - {{ project.year }}</template></p>
      </div>

      <div class="summary">
        <p class="project-headline">{{ project.headline }}</p>
        <p v-if="project.description" class="project-description">{{ project.description }}</p>
      </div>
    </div>

    <!-- Proof: results + social proof -->
    <div v-if="project.metrics?.length || project.testimonial" class="proof">
      <ul v-if="project.metrics?.length" class="metrics">
        <li v-for="metric in project.metrics" :key="metric.label" class="metric">
          <span class="metric-value">{{ metric.value }}</span>
          <span class="metric-label">{{ metric.label }}</span>
        </li>
      </ul>

      <figure v-if="project.testimonial" class="testimonial">
        <blockquote>
          <p>{{ project.testimonial.quote }}</p>
        </blockquote>
        <figcaption class="source">
          <img v-if="project.testimonial.avatar" :src="project.testimonial.avatar" alt="" width="32" height="32" loading="lazy" decoding="async">
          <span v-else class="avatar-fallback" aria-hidden="true">{{ initials }}</span>
          <span class="byline">
            <span class="author">{{ project.testimonial.author }}</span>
            <span class="separator" aria-hidden="true"> · </span>
            <span class="visually-hidden">, </span>
            <span class="job">{{ project.testimonial.job }}</span>
          </span>
        </figcaption>
      </figure>
    </div>

    <div class="cta" :class="{ 'cta-locked': isLocked }">
      <template v-if="isLocked">
        <a v-if="project.links?.overview" :href="project.links.overview" target="_blank" rel="noopener" class="btn secondary">
          Read overview
          <span class="visually-hidden">of {{ project.title }} (opens in a new tab)</span>
          <WorkIcon name="external-link" />
        </a>
        <!-- Password flow not implemented yet: the parent can listen to `unlock` -->
        <button type="button" class="btn primary" @click="$emit('unlock', project)">
          Unlock projects
          <WorkIcon name="lock-open" />
        </button>
      </template>
      <a v-else-if="project.links?.caseStudy" :href="project.links.caseStudy" target="_blank" rel="noopener" class="btn primary">
        Read case study
        <span class="visually-hidden">of {{ project.title }} (opens in a new tab)</span>
        <WorkIcon name="external-link" />
      </a>
    </div>
  </div>
</template>

<script>
import WorkIcon from './WorkIcon.vue'

export default {
  name: 'ProjectInfo',
  components: { WorkIcon },
  props: {
    project: { type: Object, required: true },
  },
  emits: ['unlock'],
  computed: {
    isLocked() {
      return Boolean(this.project.access?.locked)
    },
    initials() {
      return this.project.testimonial.author
        .split(' ')
        .map(part => part[0])
        .slice(0, 2)
        .join('')
    },
  },
}
</script>

<style scoped>
  /* Spacing rhythm: tight inside a cluster, generous between clusters */
  .project-info {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    color: var(--primary-brand-highest);
  }

  .story {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .proof {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .project-title {
    font-family: 'Eklektyk';
    font-size: 2.5rem;
    font-weight: 300;
    line-height: 100%;
  }

  .project-role {
    font-size: 1.125rem;
    font-weight: 300;
    line-height: 140%;
    color: #3D3D3D;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .project-headline {
    font-size: 1rem;
    font-weight: 600;
    line-height: 130%;
  }

  .project-description {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 150%;
    color: #3D3D3D;
  }

  /* Fixed 3 columns so values line up across projects, whatever the label length */
  .metrics {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }

  .metric {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .metric-value {
    font-size: 1.75rem;
    font-weight: 400;
    line-height: 100%;
  }

  .metric-label {
    font-size: 0.75rem;
    font-weight: 300;
    line-height: 130%;
    color: #3D3D3D;
  }

  .testimonial {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    border-radius: 0.5rem;
    background-color: #F1F0EC;
    font-size: 0.875rem;
    line-height: 140%;
  }

  .source {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .source img,
  .avatar-fallback {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .source img {
    object-fit: cover;
  }

  .avatar-fallback {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--primary-brand-highest);
    color: var(--primary-brand-lowest);
    font-size: 0.6875rem;
    font-weight: 600;
  }

  .byline {
    font-size: 0.8125rem;
  }

  .author {
    font-weight: 600;
  }

  .separator,
  .job {
    color: #3D3D3D;
  }

  .cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 1rem;
    margin-top: auto; /* pins CTAs to the bottom when the parent stretches us (desktop sidebar) */
  }

  .btn {
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
  }

  /* Desktop: keep both CTAs on one line in the sidebar */
  @media screen and (min-width: 1200px) {
    .cta {
      justify-content: center;
    }

    .btn {
      font-size: 0.9375rem;
      padding: 0.75rem 1rem;
    }
  }

  /*
    Global .primary/.secondary rely on mix-blend-mode against the page, which breaks
    inside the sticky sidebar (sticky creates its own stacking context). Same look,
    explicit colours; the global hover halves still invert them.
  */
  .btn.primary,
  .btn.secondary {
    mix-blend-mode: normal;
    border: 1px solid var(--primary-brand-highest);
  }

  .btn.primary {
    background-color: var(--primary-brand-highest);
    color: var(--primary-brand-lowest);
  }

  .btn.secondary {
    background-color: var(--primary-brand-lowest);
    color: var(--primary-brand-highest);
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

  /* Desktop: sidebar is shorter than the content may need */
  @media screen and (min-width: 1200px) and (max-height: 900px) {
    .project-info {
      gap: 2rem;
    }

    .story {
      gap: 1rem;
    }

    .proof {
      gap: 1.25rem;
    }
  }

  /* Tablet & Mobile */
  @media screen and (max-width: 1199px) {
    .project-info {
      gap: 2rem;
    }

    .story {
      gap: 1rem;
    }

    .project-title {
      font-size: 2rem;
    }

    .project-role {
      font-size: 1rem;
    }

    .metric-value {
      font-size: 1.5rem;
    }

    .btn {
      font-size: 0.875rem;
    }
  }

  /* Mobile */
  @media screen and (max-width: 768px) {
    .cta-locked {
      flex-direction: column;
    }

    .cta-locked .btn {
      flex: none;
    }
  }
</style>
