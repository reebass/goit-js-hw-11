import {ImageApiService} from "./api";

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
  imageApi.query = evt.currentTarget.elements.searchQuery.value.trim();

  if(!imageApi.query) {
    return
  }
  refs.btnLoadMore.attributes.hidden = false

  clearGallery();
  imageApi.resetPage();
  fetchImages()
  
}


function onLoadMore() {
  fetchImages()
}


async function fetchImages() {
  const imagesArr = await imageApi.fetchApi()
  createMarkupGallery(imagesArr)
}


function createMarkupGallery(images) {
  console.log(images)
  const createPageGallery = images.map(image =>
    `<li><img src="${image.webformatURL}" alt="${image.tags}">
    <div>
      <p>Likes: <b>${image.likes}</b></p>
      <p>Views: <b>${image.views}</b></p>
      <p>Comments: <b>${image.comments}</b></p>
      <p>Downloads: <b>${image.downloads}</b></p>
    </div></li>`
  ).join("")

return refs.gallery.insertAdjacentHTML('beforeend', createPageGallery)
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}




