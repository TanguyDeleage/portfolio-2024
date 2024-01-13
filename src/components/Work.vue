<template>
  <section class="work" id="work">
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
          <ul class="items">
            <li class="item" v-for="item in service.items" :key="item"> {{ item }}</li>
          </ul>
        </div>
      </div>
    </aside>

    <div class="projects">
      <div class="project" v-for="project in projects" :key="project">
        <div class="thumbnail">
          <div class="project-index"><img :src=project.index alt=""></div>
          <div class="mockup"><img :src=project.mockup alt=""></div>
        </div>
        <div class="content">
          <div class="information">
            <ul class="project-tags">
              <li v-for="tag in project.tags" :key="tag" class="project-tag">{{ tag }}</li>
            </ul>
            <div class="project-header">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-description">{{ project.description }}</p>
            </div>
          </div>
          <a :href=project.link target="_blank" class="button">
            <p>View project</p>
            <img :src="('src/assets/icons/chevron-right.svg')">
          </a>
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
          mockup: '../src/assets/images/work/canal.png',
          index: '../src/assets/images/work/index-1.svg',
          link: "https://www.behance.net/gallery/179911807/Download-Offline-Content-MyCANAL"
        },
        {
          title: 'Kuartz',
          description : 'Transforming energy contracts : from paperwork to digital efficiency',
          tags: ["UX Design", "Desktop", "SaaS"],
          mockup: '../src/assets/images/work/kuartz.png',
          index: '../src/assets/images/work/index-2.svg',
          link: "https://www.behance.net/gallery/182420717/Kuartz-Freelance-mission-in-energy-sector?tracking_source=project_owner_other_projects"
        },
        {
          title: 'Matematch',
          description : '10 days to help foreign students live a deeper exchange experience',
          tags: ["Product Design", "Mobile", "WebApp"],
          mockup: '../src/assets/images/work/matematch.png',
          index: '../src/assets/images/work/index-3.svg',
          link: "https://www.behance.net/gallery/175709177/Matematch-Mobile-App-for-foreign-students-Le-Wagon?tracking_source=project_owner_other_projects"
        },
        {
          title: 'Aisty',
          description : 'Lorem ipsum dolor sit amet',
          tags: ["UI Design", "Responsive", "WebApp"],
          mockup: '../src/assets/images/work/aisty.png',
          index: '../src/assets/images/work/index-4.svg',
          link: ""
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
    padding: var(--padding-v) var(--padding-h);
    display: flex;
    flex-direction: column;
    gap: 2rem;
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

  .mockup img{
    width: 100%
  }

  .project-index img {
    width: 100%;
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

  .service {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
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
    padding-inline-start: 0;
  }

  .services > .service:nth-child(3) .items {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    align-content: flex-start;
    gap: 0.5rem;
    align-self: stretch;
    flex-wrap: wrap;
  }

  .items {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .item {
    color: #000;
    font-size: 1rem;
    font-weight: 300;
    line-height: 140%;
  }

  .services > .service:last-child .items li {
    display: flex;
    padding: 0.25rem 1rem;
    align-items: flex-start;
    border-radius: 1.5rem;
    border: 1px solid #000;
  }


  .projects {
    background-color: #000;
    display: flex;
    flex-direction: column;
    gap: 12rem;
    color: white;
    padding: 4rem 1rem;
  }

  .project{
    width: 100%;
  }

  .thumbnail {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
  }
  .project-index {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .mockup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .project-title {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 140%; /* 2.1rem */
    text-transform: uppercase;
  }

  .project-description {
    font-size: 0.875rem;
    font-weight: 300;
    line-height: 150%; /* 1.3125rem */
  }

  .project-tags {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
  }
  .project-tag {
    color: #CFCFCF;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 150%; /* 1.3125rem */
    display: flex;
    padding: 0.25rem 0.5rem;
    align-items: flex-start;
    border-radius: 2rem;
    border: 1px solid #D1D1D1;
  }

  .content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
  }

  .information {
    display: flex;
    flex-direction: Column;
    gap: 1.5rem;
  }

  .button {
    color: var(--primary-brand-lowest);
    text-decoration: none;
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
  }

  /* desktop */
  @media screen and (min-width: 1200px) {
    aside {
      height: 100vh;
      width: calc((100% - 2.5rem)/ 3)
    }

    .projects {
      width: calc(100% - ((100% - 2.5rem)/ 3))
    }

    .mockup {
      width: 49.375rem;
      height: 41.875rem;
    }

    .project-index {
      width: 46.82569rem;
      height: 34.80225rem;
    }

    .thumbnail {
      height: 45rem;
    }
  }

  /* Tablet */
  @media screen and (min-width: 769px) and (max-width: 1199px) {
    .work {
      flex-direction: column;
    }

    aside {
      width: 100%;
      z-index: 0;
    }

    .services {
      flex-direction: row;
      width: 100%;
      gap: 4rem;
      height: fit-content;
    }

    .service {
      height: fit-content;
    }

    .projects {
      width: 100%;
      z-index: 1;
    }

    .project-index, .mockup {
      width: 100%;
    }

    .project-index img {
      width: 100%;
    }

    .mockup img {
      width: 100%;
    }

    .project-tags {
      flex-wrap: wrap;
      justify-content: center;
    }

    .thumbnail {
      height: calc(100vw - 10rem);
    }

    .content {
      flex-direction: column;
      gap: 4rem;
    }

    .project-header {
      text-align: center;
    }
  }


  /* Mobile */
  @media screen and (max-width: 768px) {
    .work {
      flex-direction: column;
    }

    aside {
      width: 100%;
      z-index: 0;
    }

    .projects {
      gap: 8rem;
    }

    .services {
      flex-direction: row;
      width: 100%;
      gap: 2rem;
      flex-wrap: wrap;
      height: fit-content;
    }

    .service {
      height: fit-content;
    }

    .projects {
      width: 100%;
      z-index: 1;
    }

    .project-index, .mockup {
      width: 100%;
    }

    .project-index img {
      width: 100%;
    }

    .mockup img {
      width: 100%;
    }

    .project-tags {
      flex-wrap: wrap;
      justify-content: center;
    }

    .thumbnail {
      height: calc(100vw);
    }

    .content {
      flex-direction: column;
      gap: 4rem;
    }

    .project-header {
      text-align: center;
    }
  }
</style>
