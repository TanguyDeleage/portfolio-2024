<template>
  <section>
    <div class="container" id="contact">
      <div class="social-links">
        <a class="social-link" v-for="link in links" :key="link" :href="link.url" :title=link.name target="_blank">
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
        <a href="#hero" class="brand" title="Scroll to top">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 40 46" fill="none" alt="Home">
              <path v-for="path in paths" :key="path" :id="path.name" :d="path.path" class="icon-animation" :class="path.class" fill="black" :fill-rule="path.fillRule" :clip-rule="path.fillRule"/>
          </svg>
        </a>
      </div>
    </div>
    <div class="flex">
      <a href="mailto:contact@tanguydeleage.com" class="last-link">contact@tanguydeleage.com</a>
    </div>
  </section>
</template>
  
<script>
  export default {
    name: 'Contact',
    data() {
      return {
        links: [
          {
            name: "Linkedin",
            logo: "../assets/icons/linkedin.svg",
            url : "https://www.linkedin.com/in/tanguy-deleage/",
          },
          {
            name: "Behance",
            logo: "@/assets/icons/behance.svg",
            url : "https://www.behance.net/tanguy-deleage",
          },
          {
            name: "Figma",
            logo: "/src/assets/icons/figma.svg",
            url : "https://www.figma.com/@tanguydeleage",
          },
          // {
          //   name: "Medium",
          //   logo: "src/assets/icons/medium.svg",
          //   url : "",
          // },
          {
            name: "Bento",
            logo: "src/assets/icons/bento.svg",
            url : "https://bento.me/tanguy-deleage",
          },
          {
            name: "Github",
            logo: "src/assets/icons/github.svg",
            url : "https://github.com/TanguyDeleage",
          },
        ],
        paths: [
          {
              name: "left",
              path: "M0 10.4006H17.1429V45.4545H11.4286C7.57576 41.8182 5.45455 40 0 33.8983V10.4006Z",
              class:'move-left-start'
          },
          {
              name: "top",
              path: "M-6.31448e-06 3.70938C-6.31448e-06 1.66073 -3.05176e-05 -2.81334e-05 -3.05176e-05 -2.81334e-05H36.1905C38.2944 -2.81334e-05 40 -3.05176e-05 40 -3.05176e-05V5.00768H-6.31448e-06V3.70938Z",
              class:'move-top-start',
          },
          {
              name: "right",
              path: "M28.5714 14.8305H27.2381V41.0246H28.5714C31.2121 38.7879 32.4242 37.8788 35.6191 33.8983V21.9568C33.0303 18.4848 31.2121 16.9697 28.5714 14.8305ZM22.8571 10.4006V45.4545H28.5714C32.7272 41.8182 34.8484 40 40 33.8983V21.9568C35.4545 16.3636 32.4242 13.0303 28.5714 10.4006H22.8571Z",
              class:'move-right-start',
              fillRule: "evenodd",
          }
        ],
        heightThreshold: {
          mobile: 1000,
          tablet: 800,
          desktop: 600,
        },
      }
    },
    mounted() {
      window.addEventListener('scroll', this.logoArrow);
    },
    methods: {
      logoArrow() {
        const arrow = document.querySelector('.arrow')
        const rect = arrow.getBoundingClientRect();
        const distanceToTop = rect.top;

        const leftPart = document.querySelector('.move-left-start')
        const rightPart = document.querySelector('.move-right-start')
        const topPart = document.querySelector('.move-top-start')

        let threshold;
        if (window.innerWidth < 640) {
            threshold = this.heightThreshold.mobile;
        } else if (window.innerWidth < 980) {
            threshold = this.heightThreshold.tablet;
        } else {
            threshold = this.heightThreshold.desktop;
        }

        if (distanceToTop < threshold) {
            leftPart.classList.add('move-left');
            rightPart.classList.add('move-right');
            topPart.classList.add('move-top');
        }
      },
    }
  }
  </script>
  
  <style scoped>
  /* Your styles go here */
  section {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: var(--padding-v) var(--padding-h) calc(var(--padding-v) / 2) var(--padding-h);
  }

  .container {
    display: flex;
  }

  .icon {
    scale: 1.5;
  }

  .social-links {
    display: flex;
    gap: 1.25rem;
  }

  .social-link {
    border-radius: 0.5rem;
  }

  .social-links div {
    display: flex;
  }

  .social-link div {
    width: 100%;
    height: 100%;
  }

  .social-link div img{
    width: 100%;
    height: 100%;
    filter: grayscale(1);
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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


  .moving-icon {
      overflow: initial;
      cursor: pointer;
  }

  .move-left {
      animation: 1.3s moveArrowLeft 2.2s ease-out forwards;
  }

  .move-right {
      animation: 1.3s moveArrowRight 2.2s ease-out forwards;
  }

  .move-top {
      animation: 1.3s moveArrowTop 2.2s ease-out forwards;
  }

  .flex {
    display: flex;
    width: 100%;
    justify-content: right;
  }

  @keyframes moveArrowLeft {
      0% {
          transform: translateY(0) translateX(0) rotate(0);
      }

      100% {
          transform: translateY(-0.6rem) translateX(1.7rem) rotate(45deg);
      }
  }

  @keyframes moveArrowRight {
      0% {
          transform: translateY(0) translateX(0) rotate(0);
      }

      100% {
          transform: translateY(1.25rem) translateX(-0.9rem) rotate(-45deg);
      }
  }

  @keyframes moveArrowTop {
      0% {
          transform: translateY(0) translateX(0) rotate(0);
      }

      100% {
          transform: rotate(90deg) translateY(-1.45rem) translateX(1.35rem);
      }
  }


  /* Desktop */
  @media screen and (min-width: 1200px) {
    .container {
      flex-direction: row;
      justify-content: space-between;
    }

    .social-links {
      flex-direction: column;
    }

    .main {
      width: 100%;
    }

    .last-link::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: var(--primary-brand-highest);
      bottom: -5px;
      left: 0;
      transform: scaleX(0);
      transform-origin: left center;
      transition: transform 0.3s ease-in-out;
    }

    .last-link:hover:after {
        transform: scaleX(1);
    }

    .last-link{
        position: relative;
        display: flex;
        width: fit-content;
    }

    .icon {
      transition: 0.5s ease-out;
    }

    .icon:hover {
      transform: translateY(-0.5rem);
    }
  }

  /* Tablet */
  @media screen and (min-width: 769px) and (max-width: 1199px) {
    
    section {
      gap: 6rem;
      justify-content: center;
    }
    .container {
      flex-direction: row;
      gap: 4rem;
      justify-content: space-between;
    }

    .social-links {
      flex-direction: column;
      justify-content: center;
      gap: 0.5rem;
    }

    .social-link {
      width: 3rem;
      height: 3rem;
    }

    .social-link img {
      max-width: 2rem;
      max-height: 2rem;
    }

    .text-display {
      font-size: 6rem;
    }

    .last-link {
      justify-content: right;
    }

    .subtitle {
      text-align: center;
      font-size: 1rem;
    }
  }

  /* Mobile */
  @media screen and (max-width: 768px) {
    
    section {
      gap: 6rem;
      justify-content: center;
    }
    .container {
      flex-direction: column;
      gap: 4rem;
    }

    .social-links {
      flex-direction: row;
      justify-content: center;
      order: 3;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .social-link {
      width: 3rem;
      height: 3rem;
    }

    .social-link img {
      max-width: 2rem;
      max-height: 2rem;
    }

    .main {
      order: 1;
    }

    .arrow {
      order: 2;
    }

    .text-display {
      font-size: 6rem;
    }

    .last-link {
      justify-content: center;
    }

    .subtitle {
      text-align: center;
      font-size: 1rem;
    }
  }
  </style>
  