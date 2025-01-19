export function renderImageGallery(images) {
  const gallery = document.querySelector('.gallery');
  
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <div class="photo-card">
        <a href="${largeImageURL}" class="gallery-item">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p>
                <span>Likes</span>
                <span>${likes}</span>
                
            </p>
            <p>
                <span>Views</span>
                <span>${views}</span>
                
            </p>
            <p>
                
                <span>Comments</span>
                <span>${comments}</span>
            </p>
            <p>
                
                <span>Downloads</span>
                <span>${downloads}</span>
            </p>
          </div>
        </div>
      `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}