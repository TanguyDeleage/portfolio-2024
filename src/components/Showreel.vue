  <template>
      <section>
        <div class="grid-container" v-if="isMobile">
            <div v-for="project in projects" :key="project.name" :class="{ 'scroll-animation': shouldAnimate }" class="cell" :style="{ backgroundImage: 'url(' + project.imageUrl + ')', backgroundPosition: project.position, height: '100%', backgroundSize: project.size}">
            </div>
        </div>
        <div class="grid-container" v-else>
            <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column">
              <div v-for="(project, projectIndex) in column" :key="projectIndex" :class="{ 'scroll-animation': shouldAnimate }" class="cell" :style="{ backgroundImage: 'url(' + project.imageUrl + ')', backgroundPosition: project.position, height: '100%', backgroundSize: project.size}">
              </div>
            </div>
        </div>
    </section>
  </template>
    
  <script>
    export default {
      name: 'Showreel',
      data() {
        return {
          projects: [
            { name: 'Project 1', imageUrl: 'assets/images/showreel/project_1.webp', position: "center", size: "cover", },
            { name: 'Project 2', imageUrl: 'assets/images/showreel/project_2.webp', position: "top", size: "cover", },
            { name: 'Project 3', imageUrl: 'assets/images/showreel/project_3.webp', position: "bottom", size: "cover", },
            { name: 'Project 4', imageUrl: 'assets/images/showreel/project_4.webp', position: "bottom", size: "cover", },
            { name: 'Project 5', imageUrl: 'assets/images/showreel/project_5.webp', position: "center", size: "cover", },
            { name: 'Project 6', imageUrl: 'assets/images/showreel/project_4.webp', position: "top", size: "cover", },
            { name: 'Project 7', imageUrl: 'assets/images/showreel/project_3.webp', position: "top", size: "contain", },
            // Add more projects as needed
          ],
          columnProjectCounts: [3, 3, 1], // Adjust the number of projects for each column
          columns: [],
          isDesktop: window.innerWidth >= 1200,
          isTablet: window.innerWidth >= 769 && window.innerWidth < 1200,
          isMobile: window.innerWidth < 769,
          shouldAnimate: false,
          scrollThreshold: 500,
        };
      },
      mounted() {
        this.setColumns();
        window.addEventListener('scroll', this.handleScroll);
      },
      methods: {
        setColumns() {
          let startIndex = 0;
    
          this.columnProjectCounts.forEach((count) => {
            const endIndex = startIndex + count;
            this.columns.push(this.projects.slice(startIndex, endIndex));
            startIndex = endIndex;
          });
        },
        handleResize() {
          this.isDesktop = window.innerWidth >= 1200;
          this.isTablet = window.innerWidth >= 769 && window.innerWidth < 1200;
          this.isMobile = window.innerWidth < 769;
        },
        handleScroll() {
          const scrollY = window.scrollY || window.pageYOffset;

          // Check if the animation should start
          if (scrollY > this.scrollThreshold && !this.shouldAnimate) {
            this.shouldAnimate = true;
            this.animationStart = scrollY;
          }

          // Calculate the dynamic 'to' position based on the scroll position
          const toPosition = 0.15 * (this.animationStart - scrollY);

          // Set shouldAnimate based on scroll position
          this.shouldAnimate = scrollY > this.scrollThreshold;

          // Update the CSS variable to control the 'to' position in the animation
          document.documentElement.style.setProperty('--to-position', toPosition + 'px');
        },
      },
      created() {
      // Add resize event listener to update isDesktop and isTablet on window resize
        window.addEventListener('resize', this.handleResize);
      },
      unmounted() {
        // Remove resize event listener when component is destroyed
        window.removeEventListener('resize', this.handleResize);
        window.removeEventListener('scroll', this.handleScroll);
      },
      updated() {
        window.addEventListener('scroll', this.handleScroll);
      },
    };
    </script>
    
    <style scoped>
    /* Your styles go here */

    section {
      overflow: hidden;
      max-height: 714px;
    }
    .grid-container {
      display: flex;
      gap: 1.25rem;
      background-color: var(--primary-brand-highest);
    }
    
    .column {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }

    .column:nth-child(odd) {
      margin-top: 20px;
    }

    .column:nth-child(even) {
      transform: translateY(-6rem);
    }
    
    .cell {
      width: 100%;
      padding-bottom: 66.666%;
      background-size: cover; /* Ensure the background image covers the entire cell */
      background-position: center; /* Center the background image within the cell */
    }

    .column:nth-child(even) .scroll-animation {
      animation: movedown linear forwards;
    }

    .column:nth-child(odd) .scroll-animation {
      animation: moveup linear forwards;
    }

    @keyframes moveup {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(var(--to-position));
      }
    }

    @keyframes movedown {
      from {
        transform: translateY(0);
      }
      to {
        transform: translateY(calc(-1 * var(--to-position)));
      }
    }


    /* Tablet */
    @media screen and (min-width: 769px) and (max-width: 1199px) {
      .grid-container {
        /* scale: 1.5; */
        scale: 2;
        transform: translateY(8rem);
        gap: 0.5rem;
      }

      .column {
        gap: 0.5rem;
      }
    }

    /* Mobile */
    @media screen and (max-width: 768px) {
      .grid-container {
        flex-direction: column;
        padding: 0 1rem;
      }

      .scroll-animation {
        animation: move linear forwards;
      }

      @keyframes move {
        from {
          transform: translateY(0);
        }
        to {
          transform: translateY(var(--to-position));
        }
      }
    }
    </style>
    