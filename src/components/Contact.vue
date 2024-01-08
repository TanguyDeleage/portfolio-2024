<template>
  <section>
    <div class="container" id="contact">
      <div class="social-links">
        <a class="social-link" v-for="link in links" :key="link" :href="link.url">
          <div><img :src=link.logo :alt=link.name></div>
        </a>
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
        <a href="/" class="brand" title="Home">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="40" height="46" viewBox="0 0 40 46" fill="none" alt="Home">
              <path v-for="path in paths" :key="path" :id="path.name" :d="path.path" class="icon-animation" :class="path.class" fill="black" :fill-rule="path.fillRule" :clip-rule="path.fillRule"/>
          </svg>
        </a>
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
            logo: "src/assets/icons/linkedin.svg",
            url : "",
          },
          {
            name: "Behance",
            logo: "src/assets/icons/behance.svg",
            url : "",
          },
          {
            name: "Figma",
            logo: "src/assets/icons/figma.svg",
            url : "",
          },
          {
            name: "Medium",
            logo: "src/assets/icons/medium.svg",
            url : "",
          },
          // {
          //   name: "Bento",
          //   logo: "",
          //   url : "",
          // },
          {
            name: "Github",
            logo: "src/assets/icons/github.svg",
            url : "",
          },
        ],
        paths: [
          {
              name: "left",
              path: "M0 10.4006H17.1429V45.4545H11.4286C7.57576 41.8182 5.45455 40 0 33.8983V10.4006Z",
              class:''
          },
          {
              name: "top",
              path: "M-6.31448e-06 3.70938C-6.31448e-06 1.66073 -3.05176e-05 -2.81334e-05 -3.05176e-05 -2.81334e-05H36.1905C38.2944 -2.81334e-05 40 -3.05176e-05 40 -3.05176e-05V5.00768H-6.31448e-06V3.70938Z",
              class:'',
          },
          {
              name: "right",
              path: "M28.5714 14.8305H27.2381V41.0246H28.5714C31.2121 38.7879 32.4242 37.8788 35.6191 33.8983V21.9568C33.0303 18.4848 31.2121 16.9697 28.5714 14.8305ZM22.8571 10.4006V45.4545H28.5714C32.7272 41.8182 34.8484 40 40 33.8983V21.9568C35.4545 16.3636 32.4242 13.0303 28.5714 10.4006H22.8571Z",
              class:'',
              fillRule: "evenodd",
          }
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

  .social-links div {
    display: flex;
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

  .arrow{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  