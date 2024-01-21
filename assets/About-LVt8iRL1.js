import{_ as h,o as p,c as g,b as t,a as v,t as d,e as l,p as y,d as f}from"./index-aUtF-gZS.js";const w="/portfolio-2024/assets/cv-mIAfKH7P.jpg",m="data:image/svg+xml,%3csvg%20width='37'%20height='38'%20viewBox='0%200%2037%2038'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M32.375%2023.5811V29.7477C32.375%2030.5655%2032.0501%2031.3497%2031.4719%2031.928C30.8937%2032.5062%2030.1094%2032.8311%2029.2917%2032.8311H7.70833C6.89058%2032.8311%206.10632%2032.5062%205.52809%2031.928C4.94985%2031.3497%204.625%2030.5655%204.625%2029.7477V23.5811M10.7917%2015.8727L18.5%2023.5811M18.5%2023.5811L26.2083%2015.8727M18.5%2023.5811V5.08105'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",b="/portfolio-2024/assets/portfolio-iY6hPX_C.png",_="/portfolio-2024/assets/figma-oHT8ChFz.svg",u="data:image/svg+xml,%3csvg%20width='37'%20height='38'%20viewBox='0%200%2037%2038'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M27.75%2020.4977V29.7477C27.75%2030.5655%2027.4251%2031.3497%2026.8469%2031.928C26.2687%2032.5062%2025.4844%2032.8311%2024.6667%2032.8311H7.70833C6.89058%2032.8311%206.10632%2032.5062%205.52809%2031.928C4.94985%2031.3497%204.625%2030.5655%204.625%2029.7477V12.7894C4.625%2011.9716%204.94985%2011.1874%205.52809%2010.6091C6.10632%2010.0309%206.89058%209.70605%207.70833%209.70605H16.9583M23.125%205.08105H32.375M32.375%205.08105V14.3311M32.375%205.08105L15.4167%2022.0394'%20stroke='white'%20stroke-width='2'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",x="/portfolio-2024/assets/linkedin-big-Ukz8dRlv.svg",S={name:"About",data(){return{stories:[{description:"In 2020, I hitchhiked over 2000 km in Australia, equivalent to the distance between Paris and Kiev. It required the help of 24 drivers over 3 weeks. On average, a car stopped after 30 minutes, with 4 seconds being the minimum and 4 hours the maximum."},{description:"I know how to do a backflip on the ground, execute a spin on a trampoline, perform a 180° on a skateboard, boulder 7A+ routes, and ride evry kind of boards."},{description:"In 2023, I traveled more than 40,000 km by train, surpassing the distance of a world tour. I now have knowledge of every western train company and have become a specialist in night trains."},{description:"During the summer of 2023, I had two skateboard injuries in the same week and had to go to the hospital. Surprisingly, the nurse recognized me."},{description:"When I'm bored, I make music, playing the piano, bass, ukulele, and Computer Assisted Music. Currently, I have over 100 instrumentals sitting on my computer, waiting for me to do something with them."}],currentStoryIndex:0,intervalStartTime:Date.now(),loadingBarWidth:"0%",storySwitchDuration:9e3}},computed:{totalStories(){return this.stories.length},currentStory(){return this.stories[this.currentStoryIndex]}},methods:{cvHover(){const o=document.querySelector(".text"),e=document.querySelector(".document");o.style.transform="translateY(200%)",e.style.transform="translateX(0)"},pdfHover(){const o=document.querySelector(".text2"),e=document.querySelector(".small-display"),i=document.querySelector(".document2");o.style.transform="translateY(200%)",e.style.transform="translateY(350%)",i.style.transform="translateX(0)"},resetHover(){const o=document.querySelector(".text"),e=document.querySelector(".document");o.style.transform="translateY(0)",e.style.transform="translateX(-200%) skew(-30deg, 20deg)"},resetHover2(){const o=document.querySelector(".text2"),e=document.querySelector(".small-display"),i=document.querySelector(".document2");o.style.transform="translateY(0)",e.style.transform="translateY(0)",i.style.transform="translateX(-200%) skew(-30deg, 20deg)"},switchStory(){this.currentStoryIndex=(this.currentStoryIndex+1)%this.totalStories,this.intervalStartTime=Date.now(),this.loadingBarWidth="0%",this.updateLoadingBar()},updateLoadingBar(){const o=this.storySwitchDuration;this.intervalStartTime=Date.now();const e=()=>{const i=Date.now()-this.intervalStartTime,r=Math.min(i/o*100,100);this.loadingBarWidth=r+"%",r<100?requestAnimationFrame(e):this.switchStory()};e()}},watch:{intervalStartTime:function(){this.loadingBarWidth="0%",this.updateLoadingBar()}},mounted(){setInterval(()=>{this.switchStory()},this.storySwitchDuration),this.updateLoadingBar()},beforeUnmount(){clearInterval(this.storyInterval)}},n=o=>(y("data-v-9b19a9e5"),o=o(),f(),o),k={id:"about"},I={class:"bento-container"},B=l('<div class="div1 box" data-v-9b19a9e5>About</div><div class="div2 box" data-v-9b19a9e5><div class="avatar" data-v-9b19a9e5></div></div><div class="div3 box" data-v-9b19a9e5><p class="box-title" data-v-9b19a9e5>I&#39;m Tanguy</p><p data-v-9b19a9e5>Product Designer, graduated with a master&#39;s in management at Audencia and achieved a web developer bootcamp at LeWagon. My combined passions for entrepreneurship and tech brought me to this position where I can work on problems from their identification to their resolution.</p></div>',3),H=n(()=>t("div",{class:"div4 box icon-container"},[t("iframe",{style:{"border-radius":"12px"},src:"https://open.spotify.com/embed/playlist/1h9jfUmHvGBY8bT1IxP2iC?utm_source=generator",width:"100%",height:"152",frameBorder:"0",allowfullscreen:"",allow:"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",title:"Spotify playlist",loading:"lazy"}),t("p",{class:"icon"},"I also play some music")],-1)),C=n(()=>t("p",{class:"text"},"CV",-1)),D=n(()=>t("img",{class:"document",src:w,alt:"CV Tanguy Deléage",loading:"lazy"},null,-1)),M=n(()=>t("span",{class:"icon"},[t("img",{src:m,alt:"Download icon",loading:"lazy"})],-1)),q=[C,D,M],z=l('<p class="text2" data-v-9b19a9e5>PDF</p><img class="document2" src="'+b+'" alt="Portfolio Tanguy Deléage" loading="lazy" data-v-9b19a9e5><span class="small-display" data-v-9b19a9e5>Portfolio</span><span class="icon" data-v-9b19a9e5><img src="'+m+'" alt="Download icon" loading="lazy" data-v-9b19a9e5></span>',4),T=[z],L=n(()=>t("a",{href:"https://www.figma.com/@tanguydeleage",target:"_blank",class:"div7 box icon-container",title:"Figma profile"},[t("img",{src:_,alt:"Icon Figma",class:"box-picture",loading:"lazy"}),t("img",{class:"icon",src:u,alt:"External-link icon",loading:"lazy"})],-1)),A={class:"div8 box icon-container"},V=n(()=>t("p",{class:"box-title"},"Random facts",-1)),E={class:"bar-container"},P={class:"stories"},Y={class:"icon"},W=n(()=>t("a",{href:"https://www.linkedin.com/in/tanguy-deleage/",target:"_blank",class:"div9 box icon-container",title:"Linkedin profile"},[t("img",{src:x,alt:"Linkedin icon",class:"box-picture",loading:"lazy"}),t("img",{class:"icon",src:u,alt:"External link icon",loading:"lazy"})],-1));function F(o,e,i,r,c,a){return p(),g("section",k,[t("div",I,[B,H,t("a",{href:"assets/documents/CV Tanguy DELEAGE - EN.pdf",download:"",class:"div5 box icon-container",onMouseenter:e[0]||(e[0]=(...s)=>a.cvHover&&a.cvHover(...s)),onMouseleave:e[1]||(e[1]=(...s)=>a.resetHover&&a.resetHover(...s))},q,32),t("a",{href:"assets/documents/PDF Portfolio - Tanguy DELEAGE.pdf",download:"",class:"div6 box icon-container",onMouseenter:e[2]||(e[2]=(...s)=>a.pdfHover&&a.pdfHover(...s)),onMouseleave:e[3]||(e[3]=(...s)=>a.resetHover2&&a.resetHover2(...s))},T,32),L,t("div",A,[V,t("div",E,[t("div",{class:"loading-bar",ref:"loadingBar",style:v({width:c.loadingBarWidth})},null,4)]),t("div",P,[t("p",null,d(a.currentStory.description),1),t("p",Y,d(c.currentStoryIndex+1)+" / "+d(a.totalStories),1)])]),W])])}const X=h(S,[["render",F],["__scopeId","data-v-9b19a9e5"]]);export{X as default};
