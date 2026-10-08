<template>
  <section class="work" id="work" aria-labelledby="work-title">
    <aside class="sidebar">
      <h2 class="section-title" id="work-title">Work</h2>

      <!-- Desktop: one ProjectInfo, driven by the project currently in view -->
      <Transition v-if="isDesktop" name="project-swap" mode="out-in">
        <ProjectInfo :key="activeProject.id" :project="activeProject" class="sidebar-info" />
      </Transition>
    </aside>

    <div class="projects">
      <article
        v-for="project in projects"
        :key="project.id"
        ref="projectEls"
        class="project"
        :data-project-id="project.id"
        :aria-label="isDesktop ? `${project.title}: ${project.headline}` : null"
      >
        <!-- Tablet & Mobile: each project carries its own info -->
        <ProjectInfo v-if="!isDesktop" :project="project" />
        <ProjectCover :project="project" />
      </article>
    </div>
  </section>
</template>

<script>
import { projects } from '../data/projects.js'
import ProjectInfo from './ProjectInfo.vue'
import ProjectCover from './ProjectCover.vue'

// Matches the global desktop breakpoint (see assets/base.css)
const DESKTOP_QUERY = '(min-width: 1200px)'

export default {
  name: 'Work',
  components: { ProjectInfo, ProjectCover },
  data() {
    return {
      projects,
      activeId: projects[0].id,
      isDesktop: window.matchMedia(DESKTOP_QUERY).matches,
    }
  },
  computed: {
    activeProject() {
      return this.projects.find(project => project.id === this.activeId) ?? this.projects[0]
    },
  },
  watch: {
    isDesktop() {
      // Wait for the layout to switch before (re)observing
      this.$nextTick(this.syncObserver)
    },
  },
  mounted() {
    // Non-reactive handles: no need for Vue to track these
    this.mediaQuery = window.matchMedia(DESKTOP_QUERY)
    this.mediaQuery.addEventListener('change', this.onBreakpointChange)
    this.syncObserver()
  },
  beforeUnmount() {
    this.mediaQuery.removeEventListener('change', this.onBreakpointChange)
    this.disconnectObserver()
  },
  methods: {
    onBreakpointChange(event) {
      this.isDesktop = event.matches
    },
    // Active-project detection is only needed while the sidebar exists
    syncObserver() {
      this.disconnectObserver()
      if (!this.isDesktop) return

      // The root is a thin horizontal band at the vertical centre of the viewport.
      // A project is active while it crosses that band: projects are separated by a
      // gap wider than the band, so at most one can intersect at a time, and while
      // the band sits in a gap nothing intersects and the previous project is kept.
      // That gives stable, flicker-free switching in both scroll directions, and
      // fast scrolls resolve to wherever the user lands.
      this.observer = new IntersectionObserver(this.onIntersect, {
        rootMargin: '-49% 0px -49% 0px',
        threshold: 0,
      })
      this.$refs.projectEls.forEach(el => this.observer.observe(el))
    },
    disconnectObserver() {
      this.observer?.disconnect()
      this.observer = null
    },
    onIntersect(entries) {
      // Latest entering project wins if a batch ever contains more than one
      const entering = entries.filter(entry => entry.isIntersecting).pop()
      if (entering) {
        // Same-value assignments don't trigger a re-render
        this.activeId = entering.target.dataset.projectId
      }
    },
  },
}
</script>

<style scoped>
  .work {
    display: flex;
    width: 100%;
    background-color: #FAFAFA;
  }

  .section-title {
    color: var(--primary-brand-highest);
    font-family: 'Eklektyk';
    font-size: 6rem;
    font-weight: 300;
    line-height: 120%; /* 7.2rem */
  }

  .sidebar {
    padding: var(--padding-v) var(--padding-h);
    display: flex;
    flex-direction: column;
    gap: 4rem;
  }

  .projects {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .project {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Sidebar content swap */
  .project-swap-enter-active {
    transition: opacity 0.25s ease-out, transform 0.25s ease-out;
  }

  .project-swap-leave-active {
    transition: opacity 0.12s ease-in;
  }

  .project-swap-enter-from {
    opacity: 0;
    transform: translateY(6px);
  }

  .project-swap-leave-to {
    opacity: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .project-swap-enter-active,
    .project-swap-leave-active {
      transition: opacity 0.12s linear;
    }

    .project-swap-enter-from {
      transform: none;
    }
  }

  /* Desktop */
  @media screen and (min-width: 1200px) {
    .sidebar {
      position: sticky;
      top: 0;
      align-self: flex-start;
      height: 100vh;
      width: calc((100% - 2.5rem) / 3);
      padding-inline: 2.5rem;
      overflow-y: auto; /* safety net on very short viewports */
    }

    .sidebar .section-title {
      font-size: 4.5rem;
      line-height: 100%;
    }

    .sidebar-info {
      flex: 1;
    }

    .projects {
      width: calc(100% - ((100% - 2.5rem) / 3));
      padding: 2rem;
      background-color: #0A0A0A;
    }
  }

  /* Desktop with small height: tighten, then drop the testimonial if still too short */
  @media screen and (min-width: 1200px) and (max-height: 900px) {
    .sidebar {
      gap: 2rem;
      padding-block: 2rem;
    }
  }

  @media screen and (min-width: 1200px) and (max-height: 800px) {
    .sidebar :deep(.testimonial) {
      display: none;
    }
  }

  /* Tablet & Mobile: no sidebar, self-contained projects */
  @media screen and (max-width: 1199px) {
    .work {
      flex-direction: column;
      padding: var(--padding-v) var(--padding-h);
      gap: 2rem;
    }

    .sidebar {
      padding: 0;
    }

    .projects {
      gap: 5rem;
    }

    .project :deep(.project-info) {
      max-width: 40rem;
    }
  }

  /* Mobile */
  @media screen and (max-width: 768px) {
    .section-title {
      font-size: 4rem;
    }

    .projects {
      gap: 4rem;
    }

    .project {
      gap: 1.5rem;
    }
  }
</style>
