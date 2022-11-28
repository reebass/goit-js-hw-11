import axios from "axios";

// https://pixabay.com/api/?key=31630114-541891e344088f225cf30f54b&q=cat&image_type=photo&orientation=horizontal&safesearch=true



export class ImageApiService {
    constructor() {
        this.searchQuery = "";
        this.page = 1;
    }

    async fetchApi() {
        const API_KEY = '31630114-541891e344088f225cf30f54b';
        const BASE_URL = 'https://pixabay.com/api/';

        const options = {
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
            }
        // fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}`, options)
        // .then(resp => resp.json())
        // .then(data => {
        //     console.log(data)
        //     this.page += 1;
        // })

        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}`, options);
        this.incrimentPage()
        return response.data
    }
    incrimentPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}