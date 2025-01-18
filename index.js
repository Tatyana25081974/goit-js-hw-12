import{a as S,S as b}from"./assets/vendor-DxnlFHFt.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const w="48210883-f70532ba3d786d958e1d4920f",q="https://pixabay.com/api/";async function p(r,o=1,n=15){try{const s={key:w,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:n};return(await S.get(q,{params:s})).data}catch(s){throw console.error("Error fetching images:",s),s}}function f(r){const o=document.querySelector(".gallery"),n=r.map(({webformatURL:s,largeImageURL:e,tags:t,likes:i,views:g,comments:L,downloads:v})=>`
      <div class="photo-card">
        <a href="${e}" class="gallery-item">
          <img src="${s}" alt="${t}" loading="lazy" />
          <div class="info">
            <p>
                <span>Likes</span>
                <span>${i}</span>
                
            </p>
            <p>
                <span>Views</span>
                <span>${g}</span>
                
            </p>
            <p>
                
                <span>Comments</span>
                <span>${L}</span>
            </p>
            <p>
                
                <span>Downloads</span>
                <span>${v}</span>
            </p>
          </div>
        </a>
      `).join("");o.insertAdjacentHTML("beforeend",n)}function E(){const r=document.querySelector(".gallery");r.innerHTML=""}const P=document.querySelector(".search-form"),d=document.querySelector(".load-more"),$=document.querySelector(".gallery"),m=document.querySelector(".loader");let c="",a=1;const u=15;let l=0;const h=new b(".gallery a");function O(){m.classList.remove("hidden")}function y(){m.classList.add("hidden")}P.addEventListener("submit",async r=>{if(r.preventDefault(),c=r.currentTarget.elements.searchQuery.value.trim(),!!c){a=1,E(),d.classList.add("hidden");try{const o=await p(c,a,u);if(l=o.totalHits,l===0){alert("Sorry, no images match your search query. Please try again.");return}f(o.hits),h.refresh(),a*u<l&&d.classList.remove("hidden")}catch(o){console.error("Error during search:",o)}finally{y()}}});d.addEventListener("click",async()=>{a+=1,O();try{const r=await p(c,a,u);f(r.hits),h.refresh(),a*u>=l?(d.classList.add("hidden"),alert("We're sorry, but you've reached the end of search results.")):H()}catch(r){console.error("Error loading more images:",r)}finally{y()}});function H(){const{height:r}=$.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
