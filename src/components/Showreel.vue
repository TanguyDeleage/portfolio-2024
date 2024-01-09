<template>
    <section>
        <div class="grid-container">
            <div v-for="(column, columnIndex) in columns" :key="columnIndex" class="column">
                <div v-for="(project, projectIndex) in column" :key="projectIndex" class="cell" :style="{ backgroundImage: 'url(' + project.imageUrl + ')', backgroundPosition: project.position, height: '100%', backgroundSize: project.size}">
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
          { name: 'Project 1', imageUrl: '../src/assets/images/showreel/project_1.jpg', position: "center", size: "cover", },
          { name: 'Project 2', imageUrl: '../src/assets/images/showreel/project_2.jpg', position: "top", size: "cover", },
          { name: 'Project 3', imageUrl: '../src/assets/images/showreel/project_3.jpg', position: "bottom", size: "cover", },
          { name: 'Project 4', imageUrl: '../src/assets/images/showreel/project_4.jpg', position: "bottom", size: "cover", },
          { name: 'Project 5', imageUrl: '../src/assets/images/showreel/project_5.jpg', position: "center", size: "cover", },
          { name: 'Project 6', imageUrl: '../src/assets/images/showreel/project_4.jpg', position: "top", size: "cover", },
          { name: 'Project 7', imageUrl: '../src/assets/images/showreel/project_3.jpg', position: "top", size: "contain", },
          // Add more projects as needed
        ],
        columnProjectCounts: [3, 3, 1], // Adjust the number of projects for each column
        columns: [],
      };
    },
    mounted() {
      this.setColumns();
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
    /* background-color: bisque; */
  }
  </style>
  