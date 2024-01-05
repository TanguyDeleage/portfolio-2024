<template>
  <section>
    <div class="container">
      <div class="social-links">
        <div class="social-link" v-for="link in links" :key="link">
          <a :href=link.url><img :src=link.logo :alt=link.name></a>
        </div>
      </div>
      <div class="main">
        <h3 class="text-display">Contact</h3>
        <p class="subtitle">Interested in working together ?</p>
        <div class="cta">
          <a href="mailto:contact@tanguydeleage.com" class="btn primary">Send an email</a>
          <a href="https://calendly.com/tdeleage/hello" target="_blank" class="btn secondary">Book a free call</a>
        </div>
      </div>
      <div class="arrow">

      </div>
    </div>
    <a href="mailto:contact@tanguydeleage.com" class="last-link">contact@tanguydeleage.com</a>
  </section>
</template>
  
<script>
  export default {
    name: 'Contact',
    data() {
      return {
        links: [
          {
            name: "linkedin",
            logo: "",
            url : "",
          },
          // {
          //   name: "Behance",
          //   logo: "",
          //   url : "",
          // },
          {
            name: "Figma",
            logo: "",
            url : "",
          },
          {
            name: "Medium",
            logo: "",
            url : "",
          },
          {
            name: "Bento",
            logo: "",
            url : "",
          },
          {
            name: "Github",
            logo: "",
            url : "",
          },
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  /* Your styles go here */
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 5rem 4rem 2.5rem 4rem;
  }

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .social-links {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    /* gap: 2rem; */
  }

  .cta {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .text-display {
    font-size: 7.5rem;
    font-family: "Eklektyk";
    line-height: 140%;
  }

  .subtitle {
    font-size: 2rem;
    font-weight: 500;
    line-height: 140%; /* 2.8rem */
    margin-bottom: 2rem;
  }

  .last-link{
    width: 100%;
    display: flex;
    justify-content: right;
    color: var(--primary-brand-highest);
    text-decoration: none;
  }
  </style>
  