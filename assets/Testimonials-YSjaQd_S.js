import{_ as l}from"./_plugin-vue_export-helper-x3n3nnut.js";import{o as a,c as o,a as e,F as d,r as c,t as i,p as h,d as p}from"./index-BsMs0f3i.js";const u={name:"Testimonials",data(){return{isMobile:window.innerWidth<=768,reviews:[{text:"I really want to thank you for the 6 months you've spent working with the IA team. I truly appreciated not only your human qualities but also your open-mindedness, agility, responsiveness, rigor, and solidarity.",author:"Patrice",job:"Lead Product Owner AI @Orange",avatar:"assets/images/testimonials/patrice.jpg"},{text:"He acquired in-depth knowledge of the newly available Figma variables and brilliantly led his very first team workshop, applying these variables to prototypes projecting the full potential of this new feature on our product.",author:"Vanessa",job:"Head of Design @Canal+",avatar:"assets/images/testimonials/vanessa.jpg"},{text:"Extremely efficient and very helpful! Well done!",author:"Olivier",job:"Lead Developer @Orange",avatar:"assets/images/testimonials/olivier.png"}]}},computed:{displayedReviews(){return this.isMobile?this.reviews.slice(0,3):this.duplicatedReviews},duplicatedReviews(){return Array.from({length:2},()=>this.reviews).flat()}},mounted(){window.addEventListener("resize",this.updateIsMobile),this.updateIsMobile()},methods:{updateIsMobile(){this.isMobile=window.innerWidth<=768}},beforeUnmount(){window.removeEventListener("resize",this.updateIsMobile)}},m=t=>(h("data-v-3d4520bc"),t=t(),p(),t),v={id:"reviews"},w=m(()=>e("div",{class:"description"},[e("h3",null,"Tested and approved"),e("p",null,"At the end of each assignment, we ask you what you thought of our collaboration and how we can improve things."),e("div",{class:"cta"},[e("a",{href:"https://calendly.com/tdeleage/hello",target:"_blank",class:"btn primary"},"Book a free call"),e("a",{href:"mailto:contact@tanguydeleage.com",class:"btn secondary"},"Send an email")])],-1)),_={class:"reviews-container"},g={class:"reviews"},y={class:"review"},f={class:"source"},b=["src","alt"],I={class:"author"},k={class:"job"};function j(t,x,M,S,O,n){return a(),o("section",v,[w,e("div",_,[e("ul",g,[(a(!0),o(d,null,c(n.displayedReviews,(s,r)=>(a(),o("li",{class:"highway-car",key:r},[e("div",y,[e("p",null,'"'+i(s.text)+'"',1),e("div",f,[e("img",{src:s.avatar,alt:s.author,loading:"lazy"},null,8,b),e("div",null,[e("p",I,i(s.author),1),e("p",k,i(s.job),1)])])])]))),128))])])])}const T=l(u,[["render",j],["__scopeId","data-v-3d4520bc"]]);export{T as default};
