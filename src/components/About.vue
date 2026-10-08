<template>
  <section id="about">
    <div class="bento-container">
      <div class="div1 box title-box">About</div>

      <div class="div2 box"><div class="avatar"></div></div>

      <div class="div3 box">
        <div class="box-content">
          <p class="box-title">I'm Tanguy</p>
          <p class="box-text">I came to Product Design through a business degree and a full-stack bootcamp. This combination gives me both a business and technical perspective when designing complex B2B products.</p>
          <p class="box-text">I believe good design emerges from collaboration so I like bringing people into the process early, making ideas tangible and scalable.</p>
        </div>
        <a class="btn primary small" href="assets/documents/CV Tanguy DELEAGE - EN.pdf" download>Download CV</a>
      </div>

      <div class="div4 box">
        <div class="box-content">
          <p class="box-title">Using AI</p>
          <p class="box-text">A hands-on design partner, from research to functional prototypes. It helps me move faster and explore more, while product strategy, UX judgment and validation stay human-led.</p>
        </div>
        <ol class="pipeline">
          <li v-for="step in pipeline" :key="step.label" class="pipeline-step">
            <div class="pipeline-line">
              <span class="pipeline-dot" :class="{ human: step.human }"></span>
            </div>
            <p class="mono-label">{{ step.label }}</p>
            <div class="pipeline-tools">
              <span v-for="tool in step.tools" :key="tool.name" class="tool" :title="tool.name">
                <img :src="tool.src" :alt="tool.name" loading="lazy">
              </span>
            </div>
          </li>
        </ol>
      </div>

      <div class="div5 box">
        <p class="box-title">Shipping code</p>
        <div class="terminal" ref="terminal" aria-hidden="true">
          <div class="terminal-dots"><span></span><span></span><span></span></div>
          <div v-for="(line, i) in terminal.done" :key="i" class="terminal-line">
            <span v-for="(part, j) in line.parts" :key="j" :style="{ color: part.c }">{{ part.t }}</span>
          </div>
          <div class="terminal-typing">{{ terminal.typing }}<span class="caret">▍</span></div>
        </div>
      </div>

      <div class="div6 box">
        <p class="box-title">Currently</p>
        <dl class="currently">
          <div v-for="item in currently" :key="item.k">
            <dt class="mono-label">{{ item.k }}</dt>
            <dd>{{ item.v }}</dd>
          </div>
        </dl>
      </div>

      <div class="div7 box music">
        <p class="box-title">Playing on loop</p>
        <div class="disc-container">
          <div class="disc" :style="albumCover ? { backgroundImage: `url(${albumCover})` } : null"></div>
        </div>
        <div class="track">
          <p class="track-title">Birocratic</p>
          <p class="track-artist">Beets 4</p>
        </div>
      </div>

      <div class="div8 box">
        <p class="box-title">Random facts</p>
        <p class="box-text fact" aria-live="polite">{{ stories[currentStoryIndex].text }}</p>
        <div class="facts-footer">
          <button type="button" class="btn secondary small" @click="shuffleFact">Shuffle</button>
          <p class="mono-label fact-count">#{{ stories[currentStoryIndex].index }}</p>
        </div>
      </div>

      <div class="div9 box photo" :style="photo ? { backgroundImage: `url(${photo})` } : null">
        <div class="photo-tag"><span>Paris</span><span class="photo-sep">·</span><span>{{ parisTime }}</span></div>
      </div>
    </div>
  </section>
</template>

<script>
import dust from '../assets/icons/tools/dust.svg'
import dovetail from '../assets/icons/tools/dovetail.svg'
import penPaper from '../assets/icons/tools/pen-paper.svg'
import figma from '../assets/icons/tools/figma.svg'
import cursor from '../assets/icons/tools/cursor.svg'
import claude from '../assets/icons/tools/claude.svg'
import github from '../assets/icons/tools/github.svg'
import users from '../assets/icons/tools/users.svg'

const GREEN = 'oklch(0.78 0.15 150)'
const RED = 'oklch(0.7 0.16 25)'
const MUTED = '#8a8986'
const TEXT = '#cfcecb'

// Lines with `cmd` are typed char by char, the others print as a whole after a short delay
const TERMINAL_SCRIPT = [
  { cmd: '$ gh pr list --mine' },
  { parts: [{ t: '#12 ', c: MUTED }, { t: 'user search+filters ', c: TEXT }, { t: '  3w', c: MUTED }] },
  { parts: [{ t: '  + useFilters.ts ', c: GREEN }, { t: '− search.js', c: RED }] },
  { parts: [{ t: '#19 ', c: MUTED }, { t: 'tooltip & copy pass ', c: TEXT }, { t: '  9d', c: MUTED }] },
  { parts: [{ t: '  − "Submit" ', c: RED }, { t: '+ "Save changes"', c: GREEN }] },
  { parts: [{ t: '#27 ', c: MUTED }, { t: 'tokens → design sys ', c: TEXT }, { t: '  2d', c: MUTED }] },
  { parts: [{ t: '  − #3B82F6 ', c: RED }, { t: '+ brand.500', c: GREEN }] },
  { parts: [{ t: '#35 ', c: MUTED }, { t: 'this tile           ', c: TEXT }, { t: '12min', c: MUTED }] },
  { parts: [{ t: '▁▂▃▅▇ ', c: GREEN }, { t: 'and counting', c: MUTED }] },
].map(line => line.cmd ? { ...line, parts: [{ t: line.cmd, c: '#e6e5e1' }] } : line)

const PRINT_DELAY = 6 // ticks before a printed line appears
const LINE_GAP = 4 // ticks between two lines
const END_PAUSE = 60 // ticks before the loop restarts
const TICK_MS = 55
const lineCost = line => line.cmd ? line.cmd.length : PRINT_DELAY
const TERMINAL_LENGTH = TERMINAL_SCRIPT.reduce((n, line) => n + lineCost(line) + LINE_GAP, 0) + END_PAUSE

export default {
  name: 'About',
  data() {
    return {
      albumCover: 'assets/images/about/album.png',
      photo: 'assets/images/about/paris.jpg',
      pipeline: [
        { label: '01 Research', tools: [{ name: 'Dust', src: dust }, { name: 'Dovetail', src: dovetail }] },
        { label: '02 Explore', tools: [{ name: 'Pen & paper', src: penPaper }, { name: 'Figma', src: figma }, { name: 'Cursor', src: cursor }] },
        { label: '03 Prototype', tools: [{ name: 'Figma', src: figma }, { name: 'Claude', src: claude }, { name: 'GitHub', src: github }] },
        { label: '04 Validate · human', human: true, tools: [{ name: 'Users & team', src: users }] },
      ],
      // TODO: fill with real content
      currently: [
        { k: 'Learning', v: 'AI’s potential & boundaries' },
        { k: 'Building', v: 'Graphic novel tracker' },
        { k: 'Reading', v: "Shangri-La · Bablet" },
      ],
      // `index` is a fake fact number, shown to suggest there are many more
      stories: [
        { index: '113', text: "In 2020, I hitchhiked over 2000 km in Australia, equivalent to the distance between Paris and Kiev. It required the help of 24 drivers over 3 weeks. On average, a car stopped after 30 minutes, with 4 seconds being the minimum and 4 hours the maximum." },
        { index: '241', text: "I know how to do a backflip on the ground, execute a spin on a trampoline, perform a 180° on a skateboard, boulder 7A+ routes, and ride every kind of boards." },
        { index: '087', text: "In 2023, I traveled more than 40,000 km by train, surpassing the distance of a world tour. I now have knowledge of every western train company and have become a specialist in night trains." },
        { index: '306', text: "I went up to Lapland and back by train to see the northern lights. I'll never forget the feeling of falling asleep in Stockholm and waking up in the middle of nowhere, surrounded by snow." },
        { index: '172', text: "When I'm bored, I make music, playing the piano, bass, ukulele, and Computer Assisted Music. Currently, I have over 100 instrumentals sitting on my computer, waiting for me to do something with them." },
      ],
      currentStoryIndex: 0,
      tick: 0,
      now: new Date(),
    }
  },
  computed: {
    parisTime() {
      return new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit', hour12: false }).format(this.now);
    },
    terminal() {
      let k = this.tick % TERMINAL_LENGTH;
      const done = [];
      let typing = '';
      for (const line of TERMINAL_SCRIPT) {
        const cost = lineCost(line);
        if (k < cost) {
          typing = line.cmd ? line.cmd.slice(0, k) : '';
          break;
        }
        done.push(line);
        k -= cost + LINE_GAP;
        if (k < 0) break;
      }
      return { done, typing };
    },
  },
  methods: {
    shuffleFact() {
      const next = Math.floor(Math.random() * (this.stories.length - 1));
      this.currentStoryIndex = next >= this.currentStoryIndex ? next + 1 : next;
    },
    startTerminal() {
      if (!this.terminalInterval) this.terminalInterval = setInterval(() => this.tick++, TICK_MS);
    },
    stopTerminal() {
      clearInterval(this.terminalInterval);
      this.terminalInterval = null;
    },
  },
  mounted() {
    this.clockInterval = setInterval(() => { this.now = new Date() }, 15000);

    // Reduced motion: show the full log without typing
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.tick = TERMINAL_LENGTH - END_PAUSE;
      return;
    }

    // Only animate the terminal while it's visible
    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting ? this.startTerminal() : this.stopTerminal();
    });
    this.observer.observe(this.$refs.terminal);
  },
  beforeUnmount() {
    clearInterval(this.clockInterval);
    this.stopTerminal();
    this.observer?.disconnect();
  },
}
</script>

<style scoped>

section {
  padding: var(--padding-v) var(--padding-h);
  background: #0A0A0A;
  container-type: inline-size;
}

.bento-container {
  display: grid;
  gap: 20px;
}

.box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.75rem;
  border-radius: 0.5rem;
  background: #1F1F1F;
  color: #f2f1ee;
  min-width: 0;
  overflow: hidden;
}

.box-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.box-title {
  font-size: 1.25rem;
  font-weight: 600;
}

.box-text {
  font-size: 0.9375rem;
  line-height: 1.55;
  color: #9b9a97;
  text-wrap: pretty;
  max-width: 32.5rem;
}

.mono-label {
  font: 500 0.6875rem 'JetBrains Mono', monospace;
  color: #8a8986;
}

.btn {
  align-self: flex-start;
}

/* About */
.title-box {
  justify-content: center;
  align-items: center;
  font-family: "Eklektyk";
  font-size: 5.25rem;
  letter-spacing: -0.04em;
  line-height: 1;
}

/* Portrait */
.div2 {
  justify-content: center;
  align-items: center;
  padding: 2.75rem;
}

.avatar {
  background-image: url(../assets/images/hero-picture.webp);
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  width: 100%;
  max-width: 12.5rem;
  aspect-ratio: 1/1;
}

/* How I use AI */
.pipeline {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.pipeline-step {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pipeline-line {
  display: flex;
  align-items: center;
}

.pipeline-line::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #333;
}

.pipeline-step:last-child .pipeline-line::after {
  background: transparent;
}

.pipeline-dot {
  flex: none;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #555;
}

.pipeline-dot.human {
  background: oklch(0.78 0.15 150);
}

.pipeline-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tool {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background: #2a2a2a;
}

.tool img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  filter: grayscale(1);
  transition: filter 0.3s ease-out;
}

/* Terminal */
.terminal {
  flex: 1;
  min-height: 0;
  /* Content must not size the grid row, otherwise the tile grows as lines print */
  contain: size;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2px;
  padding: 0.875rem;
  background: #121212;
  border: 1px solid #2a2a2a;
  border-radius: 6px;
  font: 0.6875rem/1.4 'JetBrains Mono', monospace;
  color: #a9a8a4;
  overflow: hidden;
}

.terminal-dots {
  display: flex;
  gap: 5px;
  margin-bottom: auto;
  padding-bottom: 6px;
}

.terminal-dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3a3a3a;
}

.terminal-line {
  white-space: pre;
}

.terminal-typing {
  color: #e6e5e1;
  white-space: pre-wrap;
}

.caret {
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0.3; }
}

/* Currently */
.currently {
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.currently div {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.currently dt {
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.currently dd {
  margin: 0;
  font-size: 0.9375rem;
  color: #e6e5e1;
}

/* Music */
.music {
  align-items: center;
}

.music .box-title {
  align-self: stretch;
}

.disc-container {
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: center;
}

.disc {
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background: #333 center / cover no-repeat;
  /* Center hole showing the tile background */
  -webkit-mask: radial-gradient(circle, transparent 17%, #000 calc(17% + 0.5px));
  mask: radial-gradient(circle, transparent 17%, #000 calc(17% + 0.5px));
  animation: spin 12s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.track {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}

.track-title {
  font-size: 0.875rem;
  font-weight: 500;
}

.track-artist {
  font-size: 0.75rem;
  color: #9b9a97;
}

/* Random facts */
.facts-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.facts-footer .btn {
  align-self: center;
}

.fact {
  font-size: 1rem;
  max-width: none;
}

.fact-count {
  font-size: 0.75rem;
}

/* Photo */
.photo {
  position: relative;
  justify-content: flex-end;
  padding: 1.375rem;
  background: repeating-linear-gradient(135deg, #262626 0 10px, #1e1e1e 10px 20px) center / cover no-repeat;
}

.photo::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 55%, rgba(0, 0, 0, .6) 100%);
}

.photo-tag {
  position: relative;
  align-self: flex-start;
  display: flex;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, .6);
  font-size: 0.75rem;
}

.photo-sep {
  opacity: 0.6;
}

@media (prefers-reduced-motion: reduce) {
  .disc, .caret {
    animation: none;
  }
}


@media screen and (min-width: 1211px) {
  .bento-container {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    /* Rows are at least one column wide so 1x1 tiles stay square, and grow if a tile needs more room */
    grid-auto-rows: minmax(calc((100cqw - 60px) / 4), auto);
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


  .div2 {
    filter: grayscale(1);
    transition: filter 0.3s ease-out;
  }

  .div2:hover, .div4:hover .tool img {
    filter: grayscale(0);
  }
}

@media screen and (min-width: 769px) and (max-width: 1210px) {
  .bento-container {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .div1 { grid-area: 1 / 1 / 2 / 2; }
  .div2 { grid-area: 1 / 2 / 2 / 3; }
  .div3 { grid-area: 2 / 1 / 3 / 3; }
  .div4 { grid-area: 3 / 1 / 4 / 3; }
  .div5 { grid-area: 4 / 1 / 5 / 2; }
  .div6 { grid-area: 4 / 2 / 5 / 3; }
  .div8 { grid-area: 5 / 1 / 6 / 3; }
  .div7 { grid-area: 6 / 1 / 7 / 2; }
  .div9 { grid-area: 6 / 2 / 7 / 3; }

  .div1, .div2, .div5, .div6, .div7, .div9 {
    aspect-ratio: 1/1;
  }

  .div2 {
    filter: grayscale(1);
  }
}

@media screen and (max-width: 768px) {
  .bento-container {
    grid-template-columns: minmax(0, 1fr);
  }

  .title-box {
    font-size: 4rem;
  }

  .div2, .div9 {
    aspect-ratio: 1/1;
  }

  .disc-container {
    flex: none;
    height: 12.5rem;
  }

  .div2 {
    filter: grayscale(1);
  }

  .div5 {
    height: 20rem;
  }

  .pipeline {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    row-gap: 1.25rem;
  }

  .pipeline-step:nth-child(2) .pipeline-line::after {
    background: transparent;
  }
}
</style>
