<template>
  <div class="project-cover" :class="{ locked: isLocked }">
    <p v-if="isLocked" class="lock-badge">
      <WorkIcon name="lock" />
      Locked
    </p>

    <!-- Unlocked covers stay clickable for mouse users; keyboard/AT users get the CTA link -->
    <component
      :is="coverLink ? 'a' : 'div'"
      class="mockup"
      v-bind="coverLink ? { href: coverLink, tabindex: -1, 'aria-hidden': 'true', ...(isExternal && { target: '_blank', rel: 'noopener' }) } : {}"
    >
      <img
        :src="coverImage.src"
        :alt="isLocked ? `Blurred preview: ${project.cover.alt} (case study locked)` : project.cover.alt"
        :width="coverImage.width"
        :height="coverImage.height"
        loading="lazy"
        decoding="async"
      >
    </component>

    <ul class="project-tags" aria-label="Tags">
      <li v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</li>
    </ul>
  </div>
</template>

<script>
import WorkIcon from './WorkIcon.vue'
import { isProjectLocked } from '../data/privateAccess.js'

export default {
  name: 'ProjectCover',
  components: { WorkIcon },
  props: {
    project: { type: Object, required: true },
  },
  computed: {
    isLocked() {
      return isProjectLocked(this.project)
    },
    // Locked projects show a pre-blurred file so the real image is never downloaded
    coverImage() {
      return this.isLocked && this.project.cover.blurred ? this.project.cover.blurred : this.project.cover
    },
    // Mirrors the primary CTA: dedicated page when there is one, case study otherwise
    coverLink() {
      if (this.isLocked) return null
      return this.project.links?.page ?? this.project.links?.caseStudy
    },
    isExternal() {
      return !this.project.links?.page
    },
  },
}
</script>

<style scoped>
  .project-cover {
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 1.5rem;
    width: 100%;
    padding: 2rem;
    border-radius: 0.5rem;
    background-color: #1F1F1F;
    color: var(--primary-brand-lowest);
    overflow: hidden;
  }

  .lock-badge {
    grid-row: 1;
    justify-self: start;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.7);
    background-color: rgba(255, 255, 255, 0.2);
    font-size: 1rem;
    font-weight: 600;
    line-height: 140%;
  }

  .mockup {
    grid-row: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
  }

  .mockup img {
    display: block;
    max-width: 85%;
    height: auto;
    transition: transform 0.4s ease-out;
  }

  a.mockup:hover img {
    transform: scale(1.02);
  }

  .locked .mockup img {
    user-select: none;
    pointer-events: none;
  }

  .project-tags {
    grid-row: 3;
    list-style: none;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.75rem;
  }

  .project-tag {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: 1px solid var(--primary-brand-lowest);
    background-color: #0A0A0A;
    font-size: 1rem;
    font-weight: 600;
    line-height: 140%;
  }

  /* Desktop: each project roughly fills the viewport so one clearly dominates */
  @media screen and (min-width: 1200px) {
    .project-cover {
      min-height: calc(100vh - 4rem);
    }

    .mockup img {
      max-height: calc(100vh - 16rem);
      width: auto;
    }
  }

  /* Tablet & Mobile */
  @media screen and (max-width: 1199px) {
    .project-cover {
      padding: 1.5rem;
      gap: 1rem;
    }

    .mockup img {
      max-width: 100%;
    }

    .lock-badge,
    .project-tag {
      font-size: 0.875rem;
      padding: 0.25rem 0.75rem;
    }

    .project-tags {
      justify-content: flex-start;
      gap: 0.5rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .mockup img {
      transition: none;
    }

    a.mockup:hover img {
      transform: none;
    }
  }
</style>
