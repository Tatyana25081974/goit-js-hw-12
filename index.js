import{a as b,S as q,i as a}from"./assets/vendor-tnUJPedx.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();const E="48210883-f70532ba3d786d958e1d4920f",P="https://pixabay.com/api/";async function m(r,o=1,i=15){try{const s={key:E,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:i};return(await b.get(P,{params:s})).data}catch(s){throw console.error("Error fetching images:",s),s}}function p(r){const o=document.querySelector(".gallery"),i=r.map(({webformatURL:s,largeImageURL:e,tags:t,likes:c,views:w,comments:v,downloads:S})=>`
      <div class="photo-card">
        <a href="${e}" class="gallery-item">
          <img src="${s}" alt="${t}" loading="lazy" />
          </a>
          <div class="info">
            <p>
                <span>Likes</span>
                <span>${c}</span>
                
            </p>
            <p>
                <span>Views</span>
                <span>${w}</span>
                
            </p>
            <p>
                
                <span>Comments</span>
                <span>${v}</span>
            </p>
            <p>
                
                <span>Downloads</span>
                <span>${S}</span>
            </p>
          </div>
        </div>
      `).join("");o.insertAdjacentHTML("beforeend",i)}function $(){const r=document.querySelector(".gallery");r.innerHTML=""}const A=document.querySelector(".search-form"),u=document.querySelector(".load-more"),H=document.querySelector(".gallery"),g=document.querySelector(".loader");let d="",n=1;const f=15;let l=0;const h=new q(".gallery a");function y(){g.classList.remove("hidden")}function L(){g.classList.add("hidden")}A.addEventListener("submit",async r=>{if(r.preventDefault(),d=r.currentTarget.elements.searchQuery.value.trim(),!d){a.warning({title:"Warning",message:"Please enter a search query."});return}n=1,$(),u.classList.add("hidden"),y();try{const o=await m(d,n,f);if(l=o.totalHits,l===0){a.info({title:"Info",message:"Sorry, no images match your search query. Please try again."});return}p(o.hits),h.refresh(),a.success({title:"Success",message:`Hooray! We found ${l} images.`}),n*f<l&&u.classList.remove("hidden")}catch(o){a.error({title:"Error",message:"An error occurred while fetching images. Please try again."}),console.error("Error during search:",o)}finally{L()}});u.addEventListener("click",async()=>{n+=1,y();try{const r=await m(d,n,f);p(r.hits),h.refresh(),n*f>=l?(u.classList.add("hidden"),a.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})):I()}catch(r){a.error({title:"Error",message:"An error occurred while loading more images."}),console.error("Error loading more images:",r)}finally{L()}});function I(){const{height:r}=H.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
