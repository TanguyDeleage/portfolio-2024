<template>
  <section>
    <div class="container" id="contact">
      <div class="social-links">
        <a class="social-link" v-for="link in links" :key="link" :href="link.url" :title=link.name target="_blank">
          <div><img :src=link.logo :alt=link.name loading="lazy"></div>
        </a>
      </div>
      <div class="main">
        <h3 class="text-display">Contact</h3>
        <p class="subtitle">Need someone who can own the problem, not just the interface?</p>
        <div class="cta">
          <button type="button" class="btn primary copy-email" @click="copyEmail">
            <span aria-live="polite">{{ emailCopied ? 'Email copied' : 'Copy email' }}</span>
            <svg v-if="emailCopied" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 25" fill="none" aria-hidden="true">
              <path d="M22 7.5L13.03 13.2C12.7213 13.3934 12.3643 13.496 12 13.496C11.6357 13.496 11.2787 13.3934 10.97 13.2L2 7.5M4 4.5H20C21.1046 4.5 22 5.39543 22 6.5V18.5C22 19.6046 21.1046 20.5 20 20.5H4C2.89543 20.5 2 19.6046 2 18.5V6.5C2 5.39543 2.89543 4.5 4 4.5Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <!-- <a href="https://calendly.com/tdeleage/hello" target="_blank" class="btn secondary">Book a free call</a> -->
        </div>
      </div>
      <div class="arrow">
        <a href="#hero" class="brand" title="Scroll to top">
          <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="40" height="60" viewBox="0 0 40 46" fill="none" alt="Home" loading="lazy">
              <path v-for="path in paths" :key="path" :id="path.name" :d="path.path" class="icon-animation" :class="path.class" fill="black" :fill-rule="path.fillRule" :clip-rule="path.fillRule"/>
          </svg>
        </a>
      </div>
    </div>
    <footer class="footer">
      <p class="footer-copyright">© {{ currentYear }} Tanguy Deléage</p>
      <div class="footer-deploy" :title="`Last deployed on ${buildDate}`">
        <div class="deploy-counter" aria-hidden="true">
          <span v-for="(digit, index) in daysSinceDeploy" :key="index">{{ digit }}</span>
        </div>
        <p>
          <span class="visually-hidden">{{ daysSinceDeploy }}</span>
          Days since last <s>incident</s> update
        </p>
      </div>
      <p class="footer-email">{{ email }}</p>
    </footer>
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
            logo: "assets/icons/linkedin.svg",
            url : "https://www.linkedin.com/in/tanguy-deleage/",
          },
          {
            name: "Behance",
            logo: "assets/icons/behance.svg",
            url : "https://www.behance.net/tanguy-deleage",
          },
          {
            name: "Figma",
            logo: "assets/icons/figma.svg",
            url : "https://www.figma.com/@tanguydeleage",
          },
          // {
          //   name: "Medium",
          //   logo: "assets/icons/medium.svg",
          //   url : "",
          // },
          // {
          //   name: "Bento",
          //   logo: "assets/icons/bento.svg",
          //   url : "https://bento.me/tanguy-deleage",
          // },
          {
            name: "Github",
            logo: "assets/icons/github.svg",
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
        email: "contact@tanguydeleage.com",
        emailCopied: false,
        copyTimeout: null,
        heightThreshold: {
          mobile: 1000,
          tablet: 800,
          desktop: 600,
        },
      }
    },
    computed: {
      currentYear() {
        return new Date().getFullYear();
      },
      buildDate() {
        return new Date(__BUILD_TIME__).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
      },
      daysSinceDeploy() {
        const days = Math.floor((Date.now() - new Date(__BUILD_TIME__)) / 86400000);
        return String(Math.min(Math.max(days, 0), 999)).padStart(3, '0');
      },
    },
    mounted() {
      window.addEventListener('scroll', this.logoArrow);
    },
    beforeUnmount() {
      clearTimeout(this.copyTimeout);
      window.removeEventListener('scroll', this.logoArrow);
    },
    methods: {
      async copyEmail() {
        try {
          await navigator.clipboard.writeText(this.email);
        } catch {
          window.location.href = `mailto:${this.email}`;
          return;
        }
        this.emailCopied = true;
        clearTimeout(this.copyTimeout);
        this.copyTimeout = setTimeout(() => {
          this.emailCopied = false;
        }, 2000);
      },
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
    gap: 7.5rem;
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

  .copy-email {
    font-family: inherit;
    cursor: pointer;
  }

  .copy-email svg {
    width: 1.25rem;
    height: 1.25rem;
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
    font-size: 1.25rem;
    font-weight: 300;
    line-height: 140%; /* 2.8rem */
    margin-bottom: 2rem;
  }

  .footer {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: "copyright deploy email";
    align-items: end;
    gap: 1rem;
    font-weight: 300;
  }

  .footer-copyright {
    grid-area: copyright;
  }

  .footer-email {
    grid-area: email;
    text-align: right;
  }

  .footer-deploy {
    grid-area: deploy;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    text-align: center;
    opacity: 0.8;
  }

  .deploy-counter {
    display: flex;
    border: 1px solid var(--primary-brand-highest);
  }

  .deploy-counter span {
    width: 1.5rem;
    line-height: 1.5rem;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  .deploy-counter span + span {
    border-left: 1px solid var(--primary-brand-highest);
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
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

    .footer {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "deploy deploy"
        "copyright email";
      row-gap: 3rem;
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

    .footer {
      grid-template-columns: 1fr;
      grid-template-areas:
        "deploy"
        "email"
        "copyright";
      justify-items: center;
      row-gap: 0.5rem;
    }

    .footer-deploy {
      margin-bottom: 2.5rem;
    }

    .subtitle {
      text-align: center;
      font-size: 1rem;
    }
  }
  </style>
  