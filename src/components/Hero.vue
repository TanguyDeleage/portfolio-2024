<template>
  <section class="hero">

    <div class="hero-container" v-if="isDesktop">
      <div class="title">
        <h1 class="display-text">Product</h1>
        <div class="second-line">
          <div class="hero-pill">UI/UX</div>
          <div class="column">
            <div class="text-container">
              <h1 class="display-text">Designer</h1>
            </div>
            <div class="cta">
              <a class="btn primary" href="#work">Discover projects</a>
              <a class="btn secondary" href="#about">About me</a>
            </div>
          </div>
        </div>        
      </div>
      <div class="description">
        <div class="hero-picture"></div>
        <h1 class="author">Tanguy Deléage</h1>
        <p>I'm a Product passionnate with a holistic perspective from business to development. I have diverse experiences, in Big Groups, Digital agency and startup.</p>
      </div>
    </div>

    <div class="hero-container" v-if="isTablet">
      <div class="title">
        <div class="hero-wrapper">
          <h1 class="display-text">Product</h1>
          <div class="second-line">
            <div class="hero-pill">UI/UX</div>
            <div class="text-container">
              <h1 class="display-text">Designer</h1>
            </div>
          </div>
        </div>  
        <div class="cta">
          <button class="btn primary">Discover projects</button>
          <button class="btn secondary">About me</button>
        </div>
      </div>
      <div class="description">
        <div class="hero-picture"></div>
        <h1 class="author">Tanguy Deléage</h1>
        <p>I'm a Product passionnate with a holistic perspective from business to development. I have diverse experiences, in Big Groups, Digital agency and startup.</p>
      </div>
    </div>

    <div class="hero-container" v-if="isMobile">
      <div class="title">
        <div class="hero-wrapper">
          <h1 class="display-text">Product</h1>
          <div class="second-line">
            <div class="hero-pill">UI/UX</div>
            <div class="text-container">
              <h1 class="display-text">Designer</h1>
            </div>
          </div>
        </div>  
        <div class="description">
          <div class="hero-picture"></div>
          <h1 class="author">Tanguy Deléage</h1>
          <p>I'm a Product passionnate with a holistic perspective from business to development. I have diverse experiences, in Big Groups, Digital agency and startup.</p>
        </div>
        <div class="cta">
          <a href="" target="_blank" class="btn primary">Discover projects</a>
        <a href="" class="btn secondary">About me</a>
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
  gap: 1.5rem;
}
.column {
 display: flex;
 flex-direction: column;
 gap: 5rem;
}
.hero-pill {
  color: var(--Black, #000);
  font-family: 'Eklektyk';
  font-style: normal;
  font-weight: 300;
  line-height: 120%; /* 3.6rem */
  height: fit-content;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3rem;
  border: 1px solid #000;
  width: fit-content;
}
.cta {
  display: flex;

  gap: 1rem;
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
  .hero-pill {
    font-size: 2rem;
    padding: 0.5rem 1rem;
  }

  .text-container {
    height: 6rem;
  }
}

/* Tablet */
@media screen and (min-width: 769px) and (max-width: 1199px) {
  .hero {
    padding: 0rem 2rem;
    width: 100vw;
  }
  .hero-container {
    gap: 2rem;
    width: 100%;
  }
  .display-text {
    font-size: 5rem;
  }

  .hero-pill {
    font-size: 1.5rem;
    padding: 0.25rem 0.5rem;
  }

  .text-container {
    height: 3rem;
  }

  .cta {
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
  }

  .hero-container {
    width: 100%;
    padding: 0 1rem
  }

  .title {
    width: 100%;
    gap: 2rem;
  }

  .hero-wrapper {
    width: 100%;
  }

  .second-line {
    width: 100%;
    gap: 0.5rem;
  }

  .text-container {
    height: 2.5rem;
  }
  .description {
    width: 100%;
  }
  .hero-picture {
    width: 100%;
  }

  .author {
    font-size: 2.8rem;
  }
  .display-text {
    font-size: 4rem;
  }

  .hero-pill {
    font-size: 1rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>
