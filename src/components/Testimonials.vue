<template>
  <section id="reviews">
    <div class="description">
      <h3>Tested and approuved</h3>
      <p>At the end of each assignment, we ask you what you thought of our collaboration and how we can improve things.</p>
      <div class="cta">
        <a href="https://calendly.com/tdeleage/hello" target="_blank" class="btn primary">Book a free call</a>
        <a href="mailto:contact@tanguydeleage.com" class="btn secondary">Send an email</a>
      </div>
      

    </div>
    <div class="reviews-container">
      <ul class="reviews">
        <li class="highway-car" v-for="(review, index) in displayedReviews" :key="index">
          <div class="review">
            <p>"{{ review.text }}"</p>
            <div class="source">
              <img :src="review.avatar" alt="">
              <div>
                <p class="author">{{ review.author }}</p>
                <p class="job">{{ review.job }}</p>
              </div>
            </div>
          </div>
        </li>
      </ul>
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
          // {
          //   text: "Tanguy a apporté une contribution significative à notre équipe en repensant notre approche en matière de conception et en améliorant notre façon de travailler.",
          //   author:"Romain",
          //   job:"COO @Kuartz",
          //   avatar: "",
          // },
          {
            text: "I really wanted to thank you for the 6 months you've spent working with the IA team. I really appreciated your human qualities, of course, but also your open-mindedness, agility, responsiveness, rigour and solidarity.",
            author:"Patrice",
            job:"Lead Product Owner AI @Orange",
            avatar: "src/assets/images/testimonials/patrice.jpg",
          },
          {
            text: "He acquired in-depth knowledge of the newly available Figma variables and brilliantly led his very first team workshop, applying these variables to prototypes projecting the full potential of this new feature on our product.",
            author:"Vanessa",
            job:"Head of Design @Canal+",
            avatar: "src/assets/images/testimonials/vanessa.jpg",
          },
          {
            text: "Extremely efficient and very helpful! Well done!",
            author:"Olivier",
            job:"Lead Developer @Orange",
            avatar: "@/assets/images/testimonials/olivier.png",
          }
          // {
          //   text: "Tout s'est très bien passé, je recommande Tanguy qui nous a fournit un très bon travail tant sur la qualité de ses livrables que sur l’accompagnement lors de l’intégrations.",
          //   author:"Kévin",
          //   job:"Co-founder @Aisty",
          //   avatar: "",
          // },
        ]
      }
    },
    computed: {
      displayedReviews() {
        // Return only the first three reviews for mobile
        const reviewsToShow = this.isMobile ? this.reviews.slice(0, 3) : this.duplicatedReviews;
        return reviewsToShow;
      },
      duplicatedReviews() {
        const numberOfDuplicates = 2; // Adjust based on the number of times you want to repeat reviews
        return Array.from({ length: numberOfDuplicates }, () => this.reviews).flat();
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
    height: 100%;
  }

  .reviews {
    width: calc((24rem + 3rem) * 3); /* 24rem = width of 1 card | 3rem = gap between each cards | 3 the number of cards to adapt */
    display: flex;
    overflow: hidden;
    padding: 0;
    margin: 0; 
    list-style: none;
    align-items: stretch;
  }

  @keyframes translateinfinite {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(calc((-24rem - 3rem) * 3)); /* Should be the same value than the .reviews width mais en négatif */
    }
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
    li.highway-car {
      width: 24rem;
      margin-right: 3rem; /* gap between cards */
      box-sizing: content-box; /* Ensure that the margin is included within the defined width */
      animation: translateinfinite 25s linear infinite; /* Adapt the duration to the number of cards */
    }

    .description h3 {
      line-height: 1.5rem; /* 50% */
    }
  }

  /* Tablet */
  @media screen and (min-width: 769px) and (max-width: 1199px) {
    .review {
      font-size: 0.875rem;
    }

    li.highway-car {
      width: 24rem; /* Adjust the width based on your review card width */
      margin-right: 3rem; /* Adjust the margin to create the gap between cards */
      box-sizing: content-box; /* Ensure that the margin is included within the defined width */
      animation: translateinfinite 25s linear infinite; /* Adjust the duration as needed */
    }
  }

  /* Mobile */
  @media screen and (max-width: 768px) {
    .reviews {
      flex-direction: column;
      width: 100%;
      gap: 2rem;
      max-width: 380px;
    }

    .review {
      width: 100%;
      font-size: 0.875rem;
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
  