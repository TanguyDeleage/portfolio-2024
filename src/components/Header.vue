<template>
    <div class="header">
       <a href="/" class="brand" title="Home">
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="40" height="46" viewBox="0 0 40 46" fill="none" alt="Home">
                <path v-for="path in paths" :key="path" :id="path.name" :d="path.path" class="icon-animation" :class="path.class" fill="black" :fill-rule="path.fillRule" :clip-rule="path.fillRule"/>
            </svg>
       </a>
       <nav class="nav-links">
            <a href="#hero" class="nav-link">
                <p class="nav-title slide-left">Home</p>
            </a>
            <a href="#work" class="nav-link">
                <p class="nav-title slide-left">Work</p>
            </a>
            <a href="#about" class="nav-link">
                <p class="nav-title slide-left">About</p>
            </a>
            <a href="#contact" class="nav-link">
                <p class="nav-title slide-left">Contact</p>
            </a>
       </nav>
       <div class="quick-links">
         <a class="header-box" href="mailto:contact@tanguydeleage.com"><img src="../assets/icons/mail.svg" alt="Mail icon"></a>
         <a class="header-box" href="https://calendly.com/tdeleage/hello" target="_blank">
            <img src="../assets/icons/google-meet.svg" alt="Google Drive icon ">
            Book a meeting
         </a>
       </div>
    </div>
</template>


<script>
    export default {
        name: 'Header',
        data() {
            return {
                paths: [
                    {
                        name: "left",
                        path: "M0 10.4006H17.1429V45.4545H11.4286C7.57576 41.8182 5.45455 40 0 33.8983V10.4006Z",
                        class:''
                    },
                    {
                        name: "top",
                        path: "M-6.31448e-06 3.70938C-6.31448e-06 1.66073 -3.05176e-05 -2.81334e-05 -3.05176e-05 -2.81334e-05H36.1905C38.2944 -2.81334e-05 40 -3.05176e-05 40 -3.05176e-05V5.00768H-6.31448e-06V3.70938Z",
                        class:'',
                    },
                    {
                        name: "right",
                        path: "M28.5714 14.8305H27.2381V41.0246H28.5714C31.2121 38.7879 32.4242 37.8788 35.6191 33.8983V21.9568C33.0303 18.4848 31.2121 16.9697 28.5714 14.8305ZM22.8571 10.4006V45.4545H28.5714C32.7272 41.8182 34.8484 40 40 33.8983V21.9568C35.4545 16.3636 32.4242 13.0303 28.5714 10.4006H22.8571Z",
                        class:'',
                        fillRule: "evenodd",
                    }
                ]
            };
        },
        methods: {
            iconHover(isHovered) {
                this.paths.forEach(path => {
                    path.class = isHovered ? `icon-${path.name}` : '';
                });
            },
            openMenu() {
                const burger = document.querySelector('.burger');
                const nav = document.querySelector('.nav-links');
                const body = document.querySelector('body');
                const navLinks = document.querySelectorAll('.nav-title')

            // Ouvre le dropdown menu et le ferme en cliquant sur l'icône
                nav.classList.toggle('nav-active');
                burger.classList.toggle('toggle');
                // Empêche de scroller sur le reste de la page quand la navbar est ouverte
                body.classList.toggle('no-scroll');
                // Animation de chaque lien 1 par 1
                navLinks.forEach((link, index) => { 
                    setTimeout(() => {
                        link.classList.toggle('slide-left')
                    }, index*100);
                });
            },
        }
    }    
</script>


<style scoped>

    .header-box {
        display: flex;
        padding: 0.75rem;
        justify-content: center;
        align-items: center;
        border-radius: 0.5rem;
        border: 1px solid var(--primary-brand-highest);
        color: var(--primary-brand-highest);
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.5rem; /* 150% */
        gap: 0.5rem;
    }

    .quick-links {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        width: 20%;
    }

    .nav-title{
        color: var(--primary-brand-highest);
        font-size: 1rem;
        font-weight: 500;
        line-height: 120%; /* 1.2rem */
        text-transform: uppercase;
    }

    .brand  {
        cursor: pointer;
        scale: 0.8;
        width: 20%;
    }

    a {
        text-decoration: none;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 2rem 4rem 1rem 4rem;
    }
    
    .nav-link{
        position: relative;
        display: inline-block;
        padding: 0.5rem;
    }

    .nav-title {
        display: inline;
    }

    .nav-links{
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 2rem;
    }

    .icon {
        overflow: initial;
    }

    .icon-animation {
        transition: ease-out 450ms;
        transform-origin: center;
    }
    
    .icon-left {
        transform: translateY(0.9rem) translateX(-0.5rem) rotate(90deg) ;
    }

    .icon-right {
        transform: translateY(0.9rem) translateX(0.4rem) rotate(-90deg) ;
    }

    .icon-top {
        transform: translateY(0.2rem) ;
    }

</style>