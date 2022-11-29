import {ImageApiService} from "./api";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const refs = {
 form: document.querySelector('.search-form'),
 gallery: document.querySelector(".gallery"),
 btnLoadMore: document.querySelector('.js-load-more')
}





const imageApi = new ImageApiService();


refs.form.addEventListener('submit', onSearch);
refs.btnLoadMore.addEventListener('click', onLoadMore)

function onSearch(evt) {
  evt.preventDefault();
  refs.btnLoadMore.style.display = "none";
  imageApi.searchQuery = evt.currentTarget.elements.searchQuery.value.trim();
  clearGallery();
  imageApi.resetPage();

  
  fetchImages();  
}


function onLoadMore() {
  fetchImages()
}

let drawnImages = 0;
async function fetchImages() {
  try{
  const imagesFetchObject = await imageApi.fetchApi()
  drawnImages += imagesFetchObject.hits.length
  

  if(!imagesFetchObject.hits.length || !imageApi.searchQuery) {
    return Notify.info('Sorry, there are no images matching your search query. Please try again.')
  }
  
  if(imageApi.page <= 2 ) {
     Notify.info(`Hooray! We found ${imagesFetchObject.totalHits} images.`)
  }
  createMarkupGallery(imagesFetchObject.hits)
  refs.btnLoadMore.style.display = "block";

  if(drawnImages >= imagesFetchObject.totalHits){
    refs.btnLoadMore.style.display = "none";
    Notify.info("We're sorry, but you've reached the end of search results.");
  }

} catch (error) {
  Notify.failure(`${error}`);
}

}


function createMarkupGallery(images) {

  const createPageGallery = images.map(({webformatURL, tags, likes, views, comments, downloads}) => 
    `<li class="gallery-item">
    <div class="img-wrap">
    <img class="gallery-img" src="${webformatURL}" alt="${tags}">
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




