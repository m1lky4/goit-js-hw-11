import axios from "axios";

const form = document.querySelector('.search-form');
const input = form.elements.searchQuery;
const btn = form.elements.submitBtn;
const gallery = document.querySelector('.gallery');


form.addEventListener('submit', onBtnSubmit);

function onBtnSubmit(e) {
       e.preventDefault();
    const inputValue = input.value;
    const API_KEY = '36186802-862f6fad69a85448277218aac';
    let page = 1;
    const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${inputValue}=&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
      axios.get(BASE_URL)
        .then(response => {
        const images = response.data.hits.map(image => ({
            webformatURL: image.webformatURL,
            largeImageURL: image.largeImageURL,
            tags: image.tags,
            likes: image.likes,
            views: image.views,
            comments: image.comments,
            downloads: image.downloads
        }));
            gallery.insertAdjacentHTML('beforeend',renderMarkup(images))
        })
}
 function renderMarkup(data) {
 return data.map(({webformatURL,tags, likes, views, comments, downloads}) => `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${downloads}
    </p>
  </div>
</div>`
 ).join('')
};

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });