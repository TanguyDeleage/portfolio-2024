<template>
  <section id="reviews">
    <div class="description">
      <h3>Tested and approuved</h3>
      <p>Chaque fin de mission est l'occasion de vous demander ce que vous avez pensé de notre collaboration et de comment améliorer les choses</p>
      <div class="cta">
        <a href="https://calendly.com/tdeleage/hello" target="_blank" class="btn primary">Book a free call</a>
        <a href="mailto:contact@tanguydeleage.com" class="btn secondary">Send an email</a>
      </div>
      

    </div>
    <div class="reviews">
      <div class="review" v-for="review in displayedReviews" :key="review">
        <p>"{{ review.text }}"</p>
        <div class="source">
          <img :src="review.avatar" alt="">
          <div>
            <p class="author">{{ review.author }}</p>
            <p class="job">{{ review.job }}</p>
          </div>
        </div>
      </div>

      
    </div>
  </section>
</template>
  
<script>
  export default {
    name: 'Testimonials',
    data() {
      return {
        isMobile: window.innerWidth <= 768,
        reviews: [
          {
            text: "Tanguy a apporté une contribution significative à notre équipe en repensant notre approche en matière de conception et en améliorant notre façon de travailler.",
            author:"Romain",
            job:"COO @Kuartz",
            avatar: "",
          },
          {
            text: "He acquired in-depth knowledge of the newly available Figma variables and brilliantly led his very first team workshop, applying these variables to prototypes projecting the full potential of this new feature on our product.",
            author:"Vanessa",
            job:"Head of Design @Canal+",
            avatar: "src/assets/images/testimonials/vanessa.jpg",
          },
          {
            text: "Tout s’est très bien passé, je recommande Tanguy qui nous a fournit un très bon travail tant sur la qualité de ses livrables que sur l’accompagnement lors de l’intégrations.",
            author:"Kévin",
            job:"Co-founder @Aisty",
            avatar: "",
          },
        ]
      }
    },
    computed: {
      displayedReviews() {
        // Return only the first three reviews for mobile
        return this.isMobile ? this.reviews.slice(0, 3) : this.reviews;
      },
    },

    mounted() {
      // Add event listener to check for resize and update isMobile accordingly
      window.addEventListener('resize', this.updateIsMobile);
      this.updateIsMobile();
    },

    methods: {
      updateIsMobile() {
        // Update isMobile property based on window width
        this.isMobile = window.innerWidth <= 768;
      },
    },

    beforeUnmount() {
      // Remove event listener when the component is destroyed
      window.removeEventListener('resize', this.updateIsMobile);
    },
  };

  </script>
  
  <style scoped>
  /* Your styles go here */
  section {
    background-color: #F5F5F5;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    padding: var(--padding-v) var(--padding-h);
    overflow-x: hidden;
  }

  .description {
    display: flex;
    width: 28rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }

  .description h3 {
    font-family: 'Eklektyk';
    font-size: 3rem;
    font-weight: 300;
  }

  .description p {
    text-align: center;
  }

  .cta {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }

  .reviews {
    display: flex;
    justify-content: center;
    align-items: stretch;
    gap: 3rem;
  }
  .review{
    display: flex;
    width: 24rem;
    padding: 1rem 2rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 0.5rem;
    border: 1px solid #B1B1B1;
    background-color: var(--primary-brand-lowest);
    gap: 1rem;
  }

  .review img {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 50%;
  }

  .source {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .author {
    font-size: 0.875rem;
    font-weight: 700;
    line-height: 140%; /* 1.225rem */
  }

  .job {
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 1.225rem */
  }

  .review p {
    height: 100%;
    display: flex;
    align-items: center;
  }

  /* Desktop */
  @media screen and (min-width: 1200px) {
    .reviews {
      width: 100%;
    }

    .description h3 {
      line-height: 1.5rem; /* 50% */
    }
  }

  /* Tablet */
  @media screen and (min-width: 769px) and (max-width: 1199px) {
  }

  /* Mobile */
  @media screen and (max-width: 768px) {
    .reviews {
      flex-direction: column;
      width: 100%;
      gap: 2rem;
    }

    .review {
      width: 100%;
    }

    .description {
      width: 100%;
      text-align: center;
    }

    .description h3 {
      line-height: normal;
    }
  }


  </style>
  