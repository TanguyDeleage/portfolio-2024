<template>
  <section>
    <div class="container">
      <div class="social links">
        <div class="social-link" v-for="link in links" :key="link">
          <div><img src="" alt=""></div>
        </div>
      </div>
      <div class="main">
        <h3>Contact</h3>
        <p>Interested in working together ?</p>
        <div class="cta">
          <button class="btn primary">Email me</button>
          <button class="btn secondary">Book a free call</button>
        </div>
      </div>
      <div class="arrow">

      </div>
    </div>
    <a href="">contact@tanguydeleage.com</a>
  </section>
</template>
  
<script>
  export default {
    name: 'Contact',
  }
  </script>
  
  <style scoped>
  /* Your styles go here */

  </style>
  