<template>
  <section id="about">
    <div class="bento-container">
      <div class="div1 box">About</div>
      <div class="div2 box"><div class="avatar"></div></div>
      <div class="div3 box">
        <p class="box-title">I'm Tanguy</p>
        <p>A blend of business knowledge and technical skills that I combine to create unique experiences. I’m also a musician, I always have a lot of travel story to share. I love peanut butter and backpacks.</p>
      </div>
      <div class="div4 box"> <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/1h9jfUmHvGBY8bT1IxP2iC?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
      <div class="div5 box">CV</div>
      <div class="div6 box">PDF <span class="small-display">Portfolio</span></div>
      <div class="div7 box"></div>
      <div class="div8 box">
        <p class="box-title">Random facts</p>
        <div class="stories" v-for="story in stories" :key="story">
          <p>{{ story.description }}</p>
          <p>{{story.index}}/</p>
        </div>
      </div>
      <div class="div9 box"> </div>
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
          description: "I hitchhicked +2000km in Australia, 2020, It’s equivalent to Paris-Kiev. I was helped by 24 drivers over 3 weeks. For a car to stop I waited between 4 seconds and 4 hours."
        }
      ]
    }
  }
}
</script>
  
<style scoped>
/* Your styles go here */
.bento-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}

.div1 { grid-area: 1 / 1 / 2 / 2; }
.div2 { grid-area: 1 / 2 / 2 / 3; }
.div3 { grid-area: 1 / 3 / 2 / 5; }
.div4 { grid-area: 2 / 1 / 3 / 3; }
.div5 { grid-area: 2 / 3 / 3 / 4; }
.div6 { grid-area: 2 / 4 / 3 / 5; }
.div7 { grid-area: 3 / 1 / 4 / 2; }
.div8 { grid-area: 3 / 2 / 4 / 4; }
.div9 { grid-area: 3 / 4 / 4 / 5; }


section {
  padding: 4rem;
  background: #000;
}
.box {
  display: flex;
  padding: 4.5rem 2.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  background: #0A0A0A;
  aspect-ratio: 1;
  overflow: hidden;
  max-width: 100%;
}

.div3, .div4, .div8 {
  aspect-ratio: 2;
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
  height: 100%;
  filter: grayscale(1);
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
  /* inverser intro (en dessoius) et le mettre sur le title, comme ça je peux grouper la couleur du texte avec une classe que j'attribue aussi sur la 8ème box */
}

.box-title {
  color: var(--primary-brand-lowest);
  font-weight: 600;
}

.div5, .div6 {
  color: #606060;
  font-size: 6.5rem;
  font-weight: 800;
  line-height: 140%; /* 9.1rem */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.small-display {
  color: #606060;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 140%; /* 3.5rem */
}

.div7 {
  background-image: url(../assets/icons/figma.svg);
  background-repeat: no-repeat;
  background-size: contain;
}

.div9 {
  background-image: url(../assets/icons/medium.svg);
  background-repeat: no-repeat;
  background-size: contain;
}

/* @media (max-width: 768px) {
  .box {
    height: calc((100vw - 40px - 8rem) / 4);
  }
} */
</style>
