import axios from "axios";

const API_KEY = "31630114-541891e344088f225cf30f54b";

const form = document.querySelector('.search-form');
const gallery = document.querySelector(".gallery")


form.addEventListener('input', onInput);
form.addEventListener('click', onSearch)

function onInput() {
    console.log(form.searchQuery.value)
}

function onSearch(evt) {
    evt.preventDefault();
    const images = getImage(form.searchQuery.value)

    if(images) {

    const createMarcup = images.hits.map((image => {
        `<img src="${image.userImageURL}" alt="">`
    })).join("")

    gallery.insertAdjacentHTML('beforebegin', createMarcup)
}
}


async function getImage(value) {
    try {
      const response = await axios.get(`https://pixabay.com/api/?key=${API_KEY}&q=${value}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

