<template>
  <section class="hero">

    <div class="hero-container" v-if="isDesktop">
      <div class="title">
        <h1 class="display-text">Product</h1>
        <div class="second-line">
          <div class="column">
            <div class="text-container">
              <h1 class="display-text">Designer</h1>
            </div>
            <div class="actions">
              <div class="status">
                <span class="status-dot" aria-hidden="true"></span>
                <div class="status-text">
                  <span class="status-label">Currently</span>
                  <span class="status-value">Building at Akur8</span>
                </div>
              </div>
              <div class="cta">
                <a class="btn primary" href="#work">Discover projects</a>
                <a class="btn secondary" href="assets/documents/CV Tanguy DELEAGE - EN.pdf" download>Download CV</a>
              </div>
            </div>
          </div>
        </div>        
      </div>
      <div class="description">
        <div class="hero-picture"></div>
        <h1 class="author">Tanguy Deléage</h1>
        <p>Specialising in complex B2B SaaS products across FinTech, InsurTech, and AI/ML. I turn data-heavy workflows and technical constraints into clear user experiences.</p>
      </div>
    </div>

    <div class="hero-container" v-if="isTablet">
      <div class="title">
        <div class="hero-wrapper">
          <h1 class="display-text">Product</h1>
          <div class="second-line">
            <div class="text-container">
              <h1 class="display-text">Designer</h1>
            </div>
          </div>
        </div>  
        <div class="actions">
          <div class="status">
            <span class="status-dot" aria-hidden="true"></span>
            <div class="status-text">
              <span class="status-label">Currently</span>
              <span class="status-value">Building at Akur8</span>
            </div>
          </div>
          <div class="cta">
            <a class="btn primary" href="#work">Discover projects</a>
            <a class="btn secondary" href="assets/documents/CV Tanguy DELEAGE - EN.pdf" download>Download CV</a>
          </div>
        </div>
      </div>
      <div class="description">
        <div class="hero-picture"></div>
        <h1 class="author">Tanguy Deléage</h1>
        <p>Specialising in complex B2B SaaS products across FinTech, InsurTech, and AI/ML. I turn data-heavy workflows and technical constraints into clear user experiences.</p>
      </div>
    </div>

    <div class="hero-container" v-if="isMobile">
      <div class="title">
        <div class="hero-wrapper">
          <h1 class="display-text">Product</h1>
          <div class="second-line">
            <div class="text-container">
              <h1 class="display-text">Designer</h1>
            </div>
          </div>
        </div>  
        <div class="description">
          <div class="hero-picture"></div>
          <h1 class="author">Tanguy Deléage</h1>
          <p>Specialising in complex B2B SaaS products across FinTech, InsurTech, and AI/ML. I turn data-heavy workflows and technical constraints into clear user experiences.</p>
        </div>
        <div class="actions">
          <div class="status">
            <span class="status-dot" aria-hidden="true"></span>
            <div class="status-text">
              <span class="status-label">Currently</span>
              <span class="status-value">Building at Akur8</span>
            </div>
          </div>
          <div class="cta">
            <a class="btn primary" href="#work">Discover projects</a>
            <a class="btn secondary" href="assets/documents/CV Tanguy DELEAGE - EN.pdf" download>Download CV</a>
          </div>
        </div>
      </div>
    </div>

      
  </section>
</template>

<script scoped>
  export default {
    name: 'Hero',
    data() {
      return {
        isDesktop: window.innerWidth >= 1200,
        isTablet: window.innerWidth >= 769 && window.innerWidth < 1200,
        isMobile: window.innerWidth < 769,
      };
    },
    created() {
    // Add resize event listener to update isDesktop and isTablet on window resize
      window.addEventListener('resize', this.handleResize);
    },
    unmounted() {
      // Remove resize event listener when component is destroyed
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        this.isDesktop = window.innerWidth >= 1200;
        this.isTablet = window.innerWidth >= 769 && window.innerWidth < 1200;
        this.isMobile = window.innerWidth < 769;
      },
    },
  }
</script>

<style scoped>

.hero-container{
  display: flex;
  justify-content: center;
}
.title {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
}
.description {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  width: min-content;
}

.description p {
  width: 100%;
}
.display-text {
  font-family: 'Eklektyk';
  font-style: normal;
  font-weight: 300;
  line-height: 120%; /* 12rem */
  color: black;
}

.text-container {
  display: flex;
  align-items: center;
}
.second-line {
  display: flex;
  flex-direction: row;
  padding-left: 7.5rem; /* keeps "Designer" indented under "Product" */
}
.column {
 display: flex;
 flex-direction: column;
 gap: 5rem;
}
.cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Status + CTAs row: a wider gap than between the buttons themselves */
.actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2.5rem;
}

.status {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-text {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.status-label {
  font-size: 0.75rem;
  font-weight: var(--light);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #3D3D3D;
}

.status-value {
  font-size: 1.125rem;
  color: black;
}

.status-dot {
  position: relative;
  flex-shrink: 0;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: #F5A05A;
}

/* Ping: a ring that expands out of the dot and fades away */
.status-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #F5A05A;
  animation: status-ping 1.6s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes status-ping {
  0% { transform: scale(1); opacity: 0.75; }
  75%, 100% { transform: scale(2.75); opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  .status-dot::after {
    animation: none;
  }
}

.hero-picture {
  background: url("../assets/images/hero-picture.webp");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  filter: grayscale(1);
  width: 20.6875rem;
  height: 21.9375rem;
}

.author {
  font-family: 'Eklektyk';
  font-size: 3.4rem;
}




/* Desktop */
@media screen and (min-width: 1200px) {
  .hero {
    padding: 6rem 11.25rem;
  }

  .hero-container {
    gap: 8.5rem;
  }

  .display-text {
    font-size: 10rem;
  }

  .text-container {
    height: 6rem;
  }
}

/* Tablet */
@media screen and (min-width: 769px) and (max-width: 1199px) {
  .hero {
    padding: var(--padding-v) var(--padding-h);
    width: 100%;
  }
  .hero-container {
    gap: 2rem;
    width: 100%;
  }
  .display-text {
    font-size: 5rem;
  }


  .text-container {
    height: 3rem;
  }

  .second-line {
    padding-left: 3.75rem;
  }

  .cta, .actions {
    justify-content: center;
  }

  .title, .description {
    width: 50%;
    align-items: center;
  }

  .title {
    gap: 3rem;
  }

  .description {
    align-items: center;
  }

  .hero-picture {
    width: 100%;
    height: 28rem;
  }
}

/* Mobile */
@media screen and (max-width: 768px) {

  .hero {
    width: 100%;
    padding: calc(var(--padding-v) * 0.25) var(--padding-h) var(--padding-v) var(--padding-h);
  }

  .hero-container {
    width: 100%;
  }

  .title {
    width: 100%;
    gap: 2rem;
  }

  .hero-wrapper {
    width: 270px;
    margin: 0 auto;
  }

  .second-line {
    width: 100%;
    padding-left: 3rem;
  }

  .text-container {
    height: 2.5rem;
  }
  .description {
    width: 100%;
    text-align: center;
  }
  .hero-picture {
    width: 100%;
    aspect-ratio: 1/1;
    height: auto;
  }

  .author {
    font-size: 2.8rem;
  }
  .display-text {
    font-size: 4rem;
  }


  .actions {
    flex-direction: column;
    gap: 1.5rem;
  }

  .cta {
    justify-content: center;
  }
}
</style>
