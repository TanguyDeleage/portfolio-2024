<script setup>
import Header from './components/Header.vue'
import Hero from './components/Hero.vue'
import Showreel from './components/Showreel.vue'
import Work from './components/Work.vue'
import Testimonials from './components/Testimonials.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
</script>

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

  <footer>
  </footer>

</template>

<style>

  html {
  scroll-behavior: smooth;
  }
  
</style>
