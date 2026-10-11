<template>

  <main v-if="currentProject">
    <!-- Keyed so moving between projects starts a fresh page -->
    <ProjectPage :key="currentProject.id" :project="currentProject" />
  </main>

  <template v-else>
    <header>
      <Header />
    </header>

    <main>
      <Hero />
      <Showreel />
      <Work />
      <About />
      <Contact />
    </main>
  </template>

  <!-- <footer>
  </footer> -->

</template>

<script setup>

import { computed, defineAsyncComponent } from 'vue'
import { route } from './router.js'
import { projects } from './data/projects.js'

// const Header = defineAsyncComponent(() =>
//   import ('./components/Header.vue')
// )

// const Hero = defineAsyncComponent(() =>
//   import('./components/Hero.vue')
// );

const Showreel = defineAsyncComponent(() =>
  import('./components/Showreel.vue')
);

const Work = defineAsyncComponent(() =>
  import('./components/Work.vue')
);

const About = defineAsyncComponent(() =>
  import('./components/About.vue')
);

const Contact = defineAsyncComponent(() =>
  import('./components/Contact.vue')
);

const ProjectPage = defineAsyncComponent(() =>
  import('./components/ProjectPage.vue')
);

// Project pages live at their `links.page` path; anything else shows the home page.
// Pages still in progress are only served in dev, so they can be built without being public.
const currentProject = computed(() => {
  const path = route.path.replace(/\/+$/, '')
  return projects.find(project => project.links?.page === path && (!project.inProgress || import.meta.env.DEV))
})

import Header from'./components/Header.vue';
import Hero from'./components/Hero.vue';
// import Showreel from'./components/Showreel.vue';
// import Work from'./components/Work.vue';
// import About from'./components/About.vue';
// import Contact from'./components/Contact.vue';

</script>

<style>

  @font-face {
    font-family: 'Eklektyk';
    src: url(@/assets/fonts/Eklektyk-Stencil.otf);
    font-display: swap;
  }

  html {
  scroll-behavior: smooth;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  ::-webkit-scrollbar-thumb {
    display: none;
  }

  /* Tablet & Mobile*/
@media screen and (max-width: 1199px) {
  .no-scroll {
        overflow: hidden;
        height: 100vh;
  }
}
  
</style>
