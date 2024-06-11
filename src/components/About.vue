<template>
  <section id="about">
    <div class="bento-container">
      <div class="div1 box">About</div>
      <div class="div2 box"><div class="avatar"></div></div>
      <div class="div3 box">
        <p class="box-title">I'm Tanguy</p>
        <p>Product Designer, graduated with a master's in management at Audencia and achieved a web developer bootcamp at LeWagon. My combined passions for entrepreneurship and tech brought me to this position where I can work on problems from their identification to their resolution.</p>
      </div>
      <div class="div4 box icon-container">
        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/1h9jfUmHvGBY8bT1IxP2iC?utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" title="Spotify playlist" loading="lazy"></iframe>
        <p class="icon">I also play some music</p>
      </div>
      <a href="assets/documents/CV Tanguy DELEAGE - EN.pdf" download class="div5 box icon-container" @mouseenter="cvHover" @mouseleave="resetHover">
        <p class="text">CV</p>
        <img class="document" src="../assets/images/about/cv.jpg" alt="CV Tanguy Deléage" loading="lazy">
        <span class="icon"><img src="../assets/icons/download.svg" alt="Download icon" loading="lazy"></span>
      </a>
      <a href="assets/documents/PDF Portfolio - Tanguy DELEAGE.pdf" download class="div6 box icon-container" @mouseenter="pdfHover" @mouseleave="resetHover2">
        <p class="text2">PDF</p>
        <img class="document2" src="../assets/images/about/portfolio.png" alt="Portfolio Tanguy Deléage" loading="lazy">
        <span class="small-display">Portfolio</span>
        <span class="icon"><img src="../assets/icons/download.svg" alt="Download icon" loading="lazy"></span>
      </a>
      <a href="https://www.figma.com/@tanguydeleage" target="_blank" class="div7 box icon-container" title="Figma profile">
        <img src="../assets/icons/figma.svg" alt="Icon Figma" class="box-picture" loading="lazy">
        <img class="icon" src="../assets/icons/external-link.svg" alt="External-link icon" loading="lazy">
      </a>
      <div class="div8 box icon-container">
        <p class="box-title">Random facts</p>
        <div class="bar-container">
          <div class="loading-bar" ref="loadingBar" :style="{ width: loadingBarWidth }"></div>
        </div>
        <div class="stories">
          <p>{{ currentStory.description }}</p>
          <p class="icon">{{currentStoryIndex + 1}} / {{ totalStories }}</p>
        </div>
      </div>
      <a href="https://www.linkedin.com/in/tanguy-deleage/" target="_blank" class="div9 box icon-container" title="Linkedin profile">
        <img src="../assets/icons/linkedin-big.svg" alt="Linkedin icon" class="box-picture" loading="lazy">
        <img class="icon" src="../assets/icons/external-link.svg" alt="External link icon" loading="lazy">
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
          description: "In 2020, I hitchhiked over 2000 km in Australia, equivalent to the distance between Paris and Kiev. It required the help of 24 drivers over 3 weeks. On average, a car stopped after 30 minutes, with 4 seconds being the minimum and 4 hours the maximum."
        },
        {
          description: "I know how to do a backflip on the ground, execute a spin on a trampoline, perform a 180° on a skateboard, boulder 7A+ routes, and ride every kind of boards."
        },
        {
          description: "In 2023, I traveled more than 40,000 km by train, surpassing the distance of a world tour. I now have knowledge of every western train company and have become a specialist in night trains.",
        },
        // {
        //   description: "During the summer of 2023, I had two skateboard injuries in the same week and had to go to the hospital. Surprisingly, the nurse recognized me."
        // },
        {
          description: "I went up to Lapland and back by train to see the northern lights. I'll never forget the feeling of falling asleep in Stockholm and waking up in the middle of nowhere, surrounded by snow."
        },
        {
          description: "When I'm bored, I make music, playing the piano, bass, ukulele, and Computer Assisted Music. Currently, I have over 100 instrumentals sitting on my computer, waiting for me to do something with them."
        },
      ],
      currentStoryIndex: 0,
      intervalStartTime: Date.now(),
      loadingBarWidth: '0%',
      storySwitchDuration: 9000, // 9sec before next story is displayed
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
      this.intervalStartTime = Date.now(); // Update interval start time
      this.loadingBarWidth = '0%'; // Reset loading bar width
      this.updateLoadingBar(); // Call updateLoadingBar to start the next loading bar animation
    },

    updateLoadingBar() {
      const duration = this.storySwitchDuration;
      this.intervalStartTime = Date.now(); // Update interval start time

      const animate = () => {
        const currentTime = Date.now() - this.intervalStartTime;
        const percentage = Math.min((currentTime / duration) * 100, 100);

        this.loadingBarWidth = percentage + '%';

        if (percentage < 100) {
          requestAnimationFrame(animate);
        } else {
          this.switchStory();
        }
      };

      animate();
    },
  },
  watch: {
    // Watch the intervalStartTime and update loading bar width accordingly
    intervalStartTime: function () {
      this.loadingBarWidth = '0%'; // Reset loading bar width
      this.updateLoadingBar();
    },
  },
  mounted() {
    setInterval(() => {
      this.switchStory();
    }, this.storySwitchDuration);

    // Update loading bar
    this.updateLoadingBar();
  },
  beforeUnmount() {
    // Clear the interval when the component is about to be destroyed
    clearInterval(this.storyInterval);
  },
}

</script>
  
<style scoped>

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
  font-size: 1.25rem;
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

.stories {
  height: 100%;
  display: flex;
  align-items: center;
}

.loading-bar {
  height: 100%;
  background-color: #818181;
  transition: width linear;
  border-radius: 0.5rem;
}

.bar-container {
  width: 50%;
  background-color: #4d4d4d;
  height: 0.5rem;
  border-radius: 0.5rem;
  position: absolute;
  display: flex;
  bottom: calc(1rem + 6px); /* +6px to be center aligned with the index/story being 12px high */
  left: 25%;
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
    /* width: 50%; */
    position: absolute;
    transition: 0.5s ease-out;
    transform: translateX(-200%);
  }

  .document2 {
    width: 100%;
  }

  .document {
    width: 60%;
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
    height: auto;
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

  .div2, .div4, .div7, .div9 {
    filter: grayscale(1);
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

  .div2, .div4, .div7, .div9 {
    filter: grayscale(1);
  }
}
</style>
