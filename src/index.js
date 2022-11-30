import {ImageApiService} from "./api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";


const refs = {
 form: document.querySelector('.search-form'),
 gallery: document.querySelector(".gallery"),
 btnLoadMore: document.querySelector('.js-load-more')
}


let lightBoxGallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});



const imageApi = new ImageApiService();
let drawnImages = 0;

refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore)

function onSearch(evt) {
  evt.preventDefault();
  drawnImages = 0
  refs.btnLoadMore.style.display = "none";
  imageApi.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  if(!imageApi.searchQuery) {
    return Notify.info("Please enter your request.");
  }
  clearGallery();
  imageApi.resetPage();
  

  
  fetchImages();  
}


function onLoadMore() {
  fetchImages()
}


async function fetchImages() {
  try{
  const imagesFetchObject = await imageApi.fetchApi()
  drawnImages += imagesFetchObject.hits.length
  

  if(!imagesFetchObject.hits.length) {
    return Notify.info(`Sorry, there are no images matching your ${imageApi.searchQuery}. Please try again.`)
  }
  
  if(imageApi.page <= 2 ) {
     Notify.info(`Hooray! We found ${imagesFetchObject.totalHits} images.`)
  }
  createMarkupGallery(imagesFetchObject.hits)
  refs.btnLoadMore.style.display = "block";
  lightBoxGallery.refresh()

  if(drawnImages >= imagesFetchObject.totalHits){
    refs.btnLoadMore.style.display = "none";
    Notify.info("We're sorry, but you've reached the end of search results.");
  }

} catch (error) {
  Notify.failure(`${error}`);
}

}


function createMarkupGallery(images) {

  const createPageGallery = images.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => 
    `<li class="gallery-item">
    <div class="img-wrap">
    <a href="${largeImageURL}"><img class="gallery-img" src="${webformatURL}" alt="${tags}"></a>
    </div>
    <ul class="stats-wrap">
      <li><span class="stats-tittle">Likes:</span><span class="stats">${likes}</span></li>
      <li><span class="stats-tittle">Views:</span><span class="stats">${views}</span></li>
      <li><span class="stats-tittle">Comments:</span><span class="stats">${comments}</span></li>
      <li><span class="stats-tittle">Downloads:</span><span class="stats">${downloads}</span></li>
    </ul></li>`
  ).join("")

return refs.gallery.insertAdjacentHTML('beforeend', createPageGallery)
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}




