<template>

  <header>
    <Header />
  </header>

  <main>
    <Hero />
    <Showreel />
    <Work />
    <Testimonials />
    <About />
    <Contact />
  </main>

  <!-- <footer>
  </footer> -->

</template>

<script setup>

import { defineAsyncComponent } from 'vue'

const Header = defineAsyncComponent(() =>
  import ('./components/Header.vue')
)

const Hero = defineAsyncComponent(() =>
  import('./components/Hero.vue')
);

const Showreel = defineAsyncComponent(() =>
  import('./components/Showreel.vue')
);

const Work = defineAsyncComponent(() =>
  import('./components/Work.vue')
);

const Testimonials = defineAsyncComponent(() =>
  import('./components/Testimonials.vue')
);

const About = defineAsyncComponent(() =>
  import('./components/About.vue')
);

const Contact = defineAsyncComponent(() =>
  import('./components/Contact.vue')
);

// import Hero from'./components/Hero.vue';
// import Showreel from'./components/Showreel.vue';
// import Work from'./components/Work.vue';
// import Testimonials from'./components/Testimonials.vue';
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

  /* Tablet & Mobile*/
@media screen and (max-width: 1199px) {
  .no-scroll {
        overflow: hidden;
        height: 100vh;
  }
}
  
</style>
