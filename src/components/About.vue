<template>
  <section>
    <div class="bento-container">
      <div class="div1 box">About</div>
      <div class="div2 box"> </div>
      <div class="div3 box"> </div>
      <div class="div4 box"> <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/1h9jfUmHvGBY8bT1IxP2iC?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe></div>
      <div class="div5 box">CV</div>
      <div class="div6 box">PDF Portfolio</div>
      <div class="div7 box"> </div>
      <div class="div8 box"> </div>
      <div class="div9 box"> </div>
    </div>
  </section>
</template>
  
<script>
export default {
  name: 'About',
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
  padding: 4.5rem 2.75rem 4.5rem 2.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.5rem;
  background: #0A0A0A;
  height: calc((100vw - 40px - 8rem)/4);
}
</style>
