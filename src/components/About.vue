<template>
  <section id="about">
    <div class="bento-container">
      <div class="div1 box">About</div>
      <div class="div2 box"><div class="avatar"></div></div>
      <div class="div3 box">
        <p class="box-title">I'm Tanguy</p>
        <p>A blend of business knowledge and technical skills that I combine to create unique experiences. I'm also a musician, I always have a lot of travel stories to share. I love peanut butter and backpacks.</p>
      </div>
      <div class="div4 box icon-container">
        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/1h9jfUmHvGBY8bT1IxP2iC?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        <p class="icon">I also play some music</p>
      </div>
      <a href="" download class="div5 box icon-container" @mouseenter="cvHover" @mouseleave="resetHover">
        <p class="text">CV</p>
        <img class="document" src="../assets/images/about/cv.jpg" alt="">
        <span class="icon"><img src="../assets/icons/download.svg" alt=""></span>
      </a>
      <a href="" download class="div6 box icon-container" @mouseenter="pdfHover" @mouseleave="resetHover2">
        <p class="text2">PDF</p>
        <img class="document2" src="../assets/images/about/cv.jpg" alt="">
        <span class="small-display">Portfolio</span>
        <span class="icon"><img src="../assets/icons/download.svg" alt=""></span>
      </a>
      <a href="https://www.figma.com/@tanguydeleage" target="_blank" class="div7 box icon-container">
        <img src="../assets/icons/figma.svg" alt="" class="box-picture">
        <img class="icon" src="../assets/icons/external-link.svg" alt="">
      </a>
      <div class="div8 box icon-container">
        <p class="box-title">Random facts</p>
        <div class="stories">
          <p>{{ currentStory.description }}</p>
          <p class="icon">{{currentStoryIndex + 1}} / {{ totalStories }}</p>
        </div>
      </div>
      <a href="" target="_blank" class="div9 box icon-container">
        <img src="../assets/icons/medium-big.svg" alt="" class="box-picture">
        <img class="icon" src="../assets/icons/external-link.svg" alt="">
      </a>
    </div>
  </section>
</template>
  
<script>
export default {
  name: 'About',
  data() {
    return {
      stories: [
        {
          description: "I hitchhicked +2000km in Australia, 2020, It’s equivalent to Paris-Kiev. I was helped by 24 drivers over 3 weeks. For a car to stop I waited between 4 seconds and 4 hours.",
        },
        {
          description: "I traveled +40000km by train in 2023. It’s more than a world tour. I did a lot of travels for jobs and holidays including day and night train mainly through France but also through Europe (Germany, Austria).",
        },
        {
          description: "I had 2 skate injuries making me go to the hospital in only 1 week. The nurse recognised me and asked me if it was again because of skating... I guess I’m just getting old.",
        },
      ],
      currentStoryIndex: 0,
    }
  },
  computed: {
    totalStories() {
      return this.stories.length;
    },
    currentStory() {
      return this.stories[this.currentStoryIndex];
    },
  },
  methods: {
    cvHover() {
      const text = document.querySelector('.text');
      const doc = document.querySelector('.document');

      text.style.transform = 'translateY(200%)';
      doc.style.transform = 'translateX(0)';
    },

    pdfHover() {
      const text = document.querySelector('.text2');
      const textBig = document.querySelector('.small-display');
      const doc = document.querySelector('.document2');

      text.style.transform = 'translateY(200%)';
      textBig.style.transform = 'translateY(350%)';
      doc.style.transform = 'translateX(0)';
    },

    resetHover() {
      const text = document.querySelector('.text');
      const doc = document.querySelector('.document');

      text.style.transform = 'translateY(0)';
      doc.style.transform = 'translateX(-200%) skew(-30deg, 20deg)';
    },

    resetHover2() {
      const text = document.querySelector('.text2');
      const textBig = document.querySelector('.small-display');
      const doc = document.querySelector('.document2');

      text.style.transform = 'translateY(0)';
      textBig.style.transform = 'translateY(0)';
      doc.style.transform = 'translateX(-200%) skew(-30deg, 20deg)';
    },

    switchStory() {
      this.currentStoryIndex = (this.currentStoryIndex + 1) % this.totalStories;
    },
  },
  mounted() {
    // Start the interval when the component is mounted
    this.storyInterval = setInterval(() => {
      this.switchStory();
    }, 8000); // Switch story every 8 seconds
  },
  beforeUnmount() {
    // Clear the interval when the component is about to be destroyed
    clearInterval(this.storyInterval);
  },
}
</script>
  
<style scoped>
/* Your styles go here */

a {
  text-decoration: none;
}
.bento-container {
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  align-items: stretch;
}


section {
  padding: var(--padding-v) var(--padding-h);
  background: #000;
}
.box {
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  background: #0A0A0A;
  width: 100%;
  overflow: hidden;
}

.div1 {
  font-family: "Eklektyk";
  font-size: 6rem;
  color: var(--primary-brand-lowest);
}

.div2 {
  padding: 2.75rem;
}

.avatar {
  background-image: url(../assets/images/hero-picture.webp);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  width: 100%;
  aspect-ratio: 1/1;
  height: auto;
}

.div3, .div8 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  color: #818181;
  text-align: left;
  font-size: 1.5rem;
  font-weight: 300;
}

.box-title {
  color: var(--primary-brand-lowest);
  font-weight: 600;
}

.div5, .div6 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.div5 p, .div6 p{
  color: #606060;
  font-size: 6.5rem;
  font-weight: 800;
  line-height: 140%; /* 9.1rem */
}

.small-display {
  color: #606060;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 140%; /* 3.5rem */
  margin-top: -1rem;
}

.div7, .div9 {
  background-repeat: no-repeat;
  background-size: contain;
}

.box-picture {
  height: 8rem;
}

.icon-container {
  position: relative;
}

.icon {
  position: absolute;
  display: flex;
  bottom: 1rem;
  right: 1rem;
  color: #606060;
}

@media screen and (min-width: 1211px) {

  .bento-container {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(3, 1fr);
  }

  .div1 { 
    grid-area: 1 / 1 / 1 / 1;
    aspect-ratio: 1/1;
  }
  .div2 {
    grid-area: 1 / 2 / 2 / 3;
    aspect-ratio: 1/1;
  }
  .div3 {
    grid-area: 1 / 3 / 2 / 5;
    aspect-ratio: 2/1;
  }
  .div4 { grid-area: 2 / 1 / 3 / 3; }
  .div5 { grid-area: 2 / 3 / 3 / 4; }
  .div6 { grid-area: 2 / 4 / 3 / 5; }
  .div7 { grid-area: 3 / 1 / 4 / 2; }
  .div8 {
    grid-area: 3 / 2 / 4 / 4;
    aspect-ratio: 2/1;
  }
  .div9 { grid-area: 3 / 4 / 4 / 5; }


  .div7, .div9, .div2, .div4, .div9 {
    filter: grayscale(1);
    transition: 0.3s ease-out;
  }
  .div7:hover, .div2:hover, .div9:hover, .div4:hover, .div9:hover {
    filter: grayscale(0);
  }

  .document, .document2 {
    width: 50%;
    position: absolute;
    transition: 0.5s ease-out;
    transform: translateX(-200%);
  }

  .text, .text2, .small-display {
    transition: 0.5s ease-out;
  }

  .div7:hover .box-picture, .div9:hover .box-picture {
    scale: 1.2;
    transition: 0.3s ease-out;
  } 

  .div7 .box-picture, .div9 .box-picture {
    transition: 0.3s ease-out;
  } 

}

@media screen and (min-width: 769px) and (max-width: 1210px) {
  .bento-container {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(6, 1fr);
  }

  .div1 {
    grid-area: 1 / 1 / 1 / 2;
    aspect-ratio: 1/1;
  }
  .div2 {
    grid-area: 1 / 2 / 1 / 2;
    aspect-ratio: 1/1;
  }
  .div3 {
    grid-area: 2 / 1 / 2 / 3;
    aspect-ratio: 2/1;
  }
  .div4 { grid-area: 3 / 1 / 3 / 3; }
  .div5 { grid-area: 4 / 1 / 4 / 1; }
  .div6 { grid-area: 4 / 2 / 4 / 2; }
  .div7 { grid-area: 6 / 1 / 6 / 1; }
  .div8 {
    grid-area: 5 / 1 / 5 / 3;
    aspect-ratio: 2/1;
  }
  .div9 { grid-area: 6 / 2 / 6 / 2; }

  .document, .document2 {
    display: none;
  }

  .icon-container {
    padding-bottom: 4rem;
  }
}

@media screen and (max-width: 768px) {
  .div2 {
    aspect-ratio: 1/1;
  }

  .icon-container {
    padding-bottom: 4rem;
  }

  .document, .document2 {
    display: none;
  }
}
</style>
