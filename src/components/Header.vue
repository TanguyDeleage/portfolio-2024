<template>
    <div class="header" id="hero">
        <!-- Il faut que je remette l'icon en dehors de la div, pour q'iil soit visible en mobile -->
       
        <a href="/" class="brand" title="Home">
            <svg @mouseenter="iconHover(true)" @mouseleave=iconHover(false) class="icon" xmlns="http://www.w3.org/2000/svg" width="40" height="46" viewBox="0 0 40 46" fill="none" alt="Home">
                <path v-for="path in paths" :key="path" :id="path.name" :d="path.path" class="icon-animation" :class="path.class" fill="black" :fill-rule="path.fillRule" :clip-rule="path.fillRule"/>
            </svg>
        </a>

        <nav class="nav-links" @click="openMenu()">
            <a href="#work" class="nav-link">
                <p class="nav-title slide-left">Work</p>
            </a>
            <a href="#reviews" class="nav-link">
                <p class="nav-title slide-left">Reviews</p>
            </a>
            <a href="#about" class="nav-link">
                <p class="nav-title slide-left">About</p>
            </a>
            <a href="#contact" class="nav-link">
                <p class="nav-title slide-left">Contact</p>
            </a>
        </nav>
        <div class="quick-links" @click="openMenu()">
            <a class="header-box mail" href="mailto:contact@tanguydeleage.com"><img src="../assets/icons/mail.svg" alt="Mail icon"></a>
            <a class="header-box calendly" href="https://calendly.com/tdeleage/hello" target="_blank">
                <img src="../assets/icons/google-meet.svg" alt="Google Drive icon ">
                Book a meeting
            </a>
        </div>

       <div @click="openMenu()" class="burger">
            <div class="line">
                <div class="line1"></div>
            </div>
            <div class="line">
                <div class="line2"></div>
            </div>
            <div class="line">
                <div class="line3"></div>
            </div>
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
        overflow: hidden;
    }

    .quick-links {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        width: 16rem;
        justify-content: flex-end;
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
        width: 16rem;
    }

    a {
        text-decoration: none;
    }

    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 2rem var(--padding-h) 1rem var(--padding-h);
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

    /* desktop */
    @media screen and (min-width: 1200px) {
        .burger {
            display: none;
        }

        .nav-title::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            background-color: var(--primary-brand-highest);
            bottom: -5px;
            left: 0;
            transform: scaleX(0);
            transform-origin: left center;
            transition: transform 0.3s ease-in-out;
        }

        .nav-title:hover:after {
            transform: scaleX(1);
        }

        .nav-title{
            position: relative;
            display: inline-block;
        }

        .mail:hover img {
            transform: scale(1.2);
        }
        .calendly:hover img{
            transform: scale(1.2);
        }
        .mail img {
            transition: 0.3s ease-in;
        }
        .calendly img {
            transition: 0.3s ease-out;
        }
    }

    /* Tablet & Mobile*/
    @media screen and (max-width: 1199px) {
        .nav-links, .quick-links{
        display: none;
        }
        .burger {
            display: flex;
            width: 3rem;
            padding: 0.5rem;
            flex-direction: column;
            justify-content: center;
            align-items: flex-end;
            gap: 0.75rem;
            z-index: 9999;
            overflow: hidden;
        }

        .nav-title {
            font-size: 4rem;
            font-family: 'Eklektyk';
            transition: opacity 0.5s ease-out 0.5s, transform 0.5s ease-out 0.5s;
        }

        .burger .line {
            display: flex;
            align-items: flex-start;
            align-self: stretch;
            position: relative;
        }
        .line1 {
            width: 2.5rem;
            height: 0.25rem;
            position: absolute;
            background: #000;
            transition: 0.5s ease-out;
        }
        .line2 {
            width: 2.5rem;
            height: 0.25rem;
            position: absolute;
            left: -0.25rem;
            background: #000;
            transition: 0.5s ease-out;
        }
        .line3 {
            width: 2.5rem;
            height: 0.25rem;
            position: absolute;
            left: -0.5rem;
            background: #000;
            transition: 0.5s ease-out;
        }

        /* ==== Animation menu burger ===== */

        .toggle .line1 {
            transform: rotate(-45deg) translate(-10px, 6px);
        }

        .toggle .line2 {
            transform: translateX(10rem);
        }

        .toggle .line3 {
            transform: rotate(45deg) translate(-5.5px, -11px);
        }

        .nav-links {
            display: flex;
            position: fixed;
            right: 0px;
            top: 0px;
            height: 100vh;
            background-color: var(--primary-brand-lowest);
            flex-direction: column;
            align-items: center;
            width: 100%;
            z-index: 9998;
            padding: 10rem 2rem;
            transform: translateX(100%);
            transition: all 0.7s ease-in;
            justify-content: space-between;
        }

        .brand {
            z-index: 9999;
        }

        .nav-active {
            transform: translateX(0%) !important;
            transition: all 0.5s ease-in;
        }

        .slide-left {
            opacity: 0%;
            transform: translateX(2rem);
        }
    }

</style>