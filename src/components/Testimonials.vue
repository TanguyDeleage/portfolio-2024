<template>
  <section>
    <div class="description">
      <h3>Tested and approuved</h3>
      <p>Chaque fin de mission est l'occasion de vous demander ce que vous avez pensé de notre collaboration et de comment améliorer les choses</p>
      <div class="cta">
        <button class="btn primary">Book a free 30' call</button>
        <button class="btn secondary">Send an email</button>
      </div>
      

    </div>
    <div class="reviews">
      <div class="review" v-for="review in reviews" :key="review">
        <p>"{{ review.text }}"</p>
        <div>
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
            job:"Head of Design@Canal+",
            avatar: "",
          },
          {
            text: "Tout s’est très bien passé, je recommande Tanguy qui nous a fournit un très bon travail tant sur la qualité de ses livrables que sur l’accompagnement lors de l’intégrations.",
            author:"Kévin",
            job:"Co-founder @Aisty",
            avatar: "",
          }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  /* Your styles go here */
  section {
    background-color: #F5F5F5;
    display: flex;
    width: 100%;
    padding: 5rem 4rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 4rem;
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
    line-height: 1.5rem; /* 50% */
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
    /* height: 14.5185rem; */
    justify-content: flex-end;
    align-items: flex-start;
    gap: 3rem;
  }
  .review{
    display: flex;
    width: 100%;
    height: 14.5185rem;
    padding: 1rem 2rem;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border-radius: 0.5rem;
    border: 1px solid #B1B1B1;
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
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 140%; /* 1.225rem */
    height: 100%;
    display: flex;
    align-items: center;
  }

  </style>
  