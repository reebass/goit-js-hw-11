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
  imageApi.query = evt.currentTarget.elements.searchQuery.value;
  imageApi.resetPage();
  imageApi.fetchApi().then();
}


function onLoadMore() {
  imageApi.fetchApi()
}

function createGallery() {
  imageApi.fetchApi().then(data => console.log(data))

}