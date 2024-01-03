<template>
  <section class="work">
    <aside>
      <div class="header">
        <h2 class="section-title">Work</h2>
      </div>
      <div class="divider"></div>
      <div class="services">
        <div class="service" v-for="(service, index) in services" :key="index">
          <div class="header">
            <p class="index">0{{ index + 1}}</p>
            <p class="title">{{ service.title }}</p>
          </div>
          <ul>
            <li class="item" v-for="item in service.items" :key="item"> {{ item }}</li>
          </ul>
        </div>
      </div>
    </aside>

    <div class="projects">
      <div class="project" v-for="project in projects" :key="project">
        <div class="thumbnail">
          <div class="index"></div>
          <div class="mockup"></div>
        </div>
        <div class="content">
          <div class="information">
            <ul class="tags">
              <li v-for="tag in project.tags" :key="tag">{{ tag }}</li>
            </ul>
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
          </div>
          <div class="button">

          </div>
          
        </div>
      </div>
    </div>
  </section>
  
</template>
  
<script>
export default {
  name: 'Work',
  data() {
    return {
      services: [
        {
          title: 'Tools',
          items: ["Figma", "Photoshop", "Html, CSS, JS", "Vue.js"]
        },
        {
          title: 'Services',
          items: ["Product Design", "UX Design", "UI Design", "Prototyping"]
        },
        {
          title: 'Industry',
          items: ["Tech", "Entertainment", "AI", "WebApp", "SaaS", "E-commerce"]
        }
      ],

      projects: [
        {
          title: 'Canal+',
          description : 'Allowing Mac users to download offline content',
          tags: ["Product Design", "Responsive", "Streaming Platform"],
          mockup: '',
          index: ''
        }
      ]
    };
  }
}
</script>
  
<style scoped>

  .work{
    display: flex;
    width: 100%;
  }
  .header {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .section-title {
    color: var(--primary-brand-highest);
    font-family: 'Eklektyk';
    font-size: 6rem;
    font-weight: 300;
    line-height: 120%; /* 7.2rem */
  }

  aside {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100vh;
    width: calc((100vw - 2.5rem)/3 - 5px);
    position: sticky;
    top: 0;
  }

  .index {
    color: #000;
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 140%;
    text-transform: uppercase;
  }

  .divider {
    height: 1px;
    width: 100%;
    background-color: #000;
  }

  .services {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .title {
    color: #000;
    /* font-family: Inter; */
    font-size: 1rem;
    font-weight: 600;
    line-height: 140%;
    text-transform: uppercase;
  }

  ul {
    list-style: none;
  }

  .item {
    color: #000;
    font-size: 1rem;
    font-weight: 300;
    line-height: 140%;
  }

  .projects {
    background-color: #000;
    width: calc( 100vw - (100vw - 2.5rem)/3 - 5px);
    display: flex;
    flex-direction: column;
    gap: 4rem;
    color: white;
  }
</style>
