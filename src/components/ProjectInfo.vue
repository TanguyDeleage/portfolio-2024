<template>
  <div class="project-info">
    <div class="identity">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-role">{{ project.role }}<template v-if="project.year"> - {{ project.year }}</template></p>
    </div>

    <div class="summary">
      <p class="project-headline">{{ project.headline }}</p>
      <p v-if="project.description" class="project-description">{{ project.description }}</p>
    </div>

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
        <img v-if="project.testimonial.avatar" :src="project.testimonial.avatar" alt="" width="40" height="40" loading="lazy" decoding="async">
        <span v-else class="avatar-fallback" aria-hidden="true">{{ initials }}</span>
        <span>
          <span class="author">{{ project.testimonial.author }}</span>
          <span class="job">{{ project.testimonial.job }}</span>
        </span>
      </figcaption>
    </figure>

    <div class="cta" :class="{ 'cta-locked': isLocked }">
      <template v-if="isLocked">
        <!-- Password flow not implemented yet: the parent can listen to `unlock` -->
        <button type="button" class="btn secondary" @click="$emit('unlock', project)">
          Unlock case study
          <WorkIcon name="lock" />
        </button>
        <a v-if="project.links?.overview" :href="project.links.overview" target="_blank" rel="noopener" class="btn primary">
          Read overview
          <span class="visually-hidden">of {{ project.title }} (opens in a new tab)</span>
          <WorkIcon name="external-link" />
        </a>
      </template>
      <a v-else-if="project.links?.caseStudy" :href="project.links.caseStudy" target="_blank" rel="noopener" class="btn secondary">
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
  .project-info {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    color: var(--primary-brand-highest);
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
    gap: 0.75rem;
  }

  .project-headline {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 130%;
  }

  .project-description {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 150%;
    color: #3D3D3D;
  }

  .metrics {
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem 2rem;
  }

  .metric {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .metric-value {
    font-size: 2rem;
    font-weight: 400;
    line-height: 100%;
  }

  .metric-label {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 140%;
    color: #3D3D3D;
  }

  .testimonial {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem 2rem;
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
    width: 2.5rem;
    height: 2.5rem;
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
    font-size: 0.75rem;
    font-weight: 600;
  }

  .author {
    display: block;
    font-weight: 600;
  }

  .job {
    display: block;
  }

  .cta {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    margin-top: auto; /* pins CTAs to the bottom when the parent stretches us (desktop sidebar) */
  }

  .cta-locked .btn {
    flex: 1 1 auto;
  }

  .btn {
    font: inherit;
    font-size: 1rem;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
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
      gap: 1.5rem;
    }
  }

  /* Tablet & Mobile */
  @media screen and (max-width: 1199px) {
    .project-info {
      gap: 1.5rem;
    }

    .project-title {
      font-size: 2rem;
    }

    .project-role {
      font-size: 1rem;
    }

    .project-headline {
      font-size: 1.125rem;
    }

    .metric-value {
      font-size: 1.5rem;
    }

    .testimonial {
      padding: 1.25rem 1.5rem;
    }

    .cta {
      justify-content: flex-start;
    }

    .btn {
      font-size: 0.875rem;
    }
  }

  /* Mobile */
  @media screen and (max-width: 768px) {
    .metrics {
      gap: 1rem 2.5rem;
    }

    .cta-locked {
      flex-direction: column;
    }

    .cta-locked .btn {
      flex: none;
    }
  }
</style>
