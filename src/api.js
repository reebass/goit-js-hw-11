import axios from "axios";




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
        // return fetch(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}`, options)
        // .then(resp => resp.json())
        // .then(data => {
        //     this.incrimentPage()
        //     return data.hits
        try {
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=40`, options);
        this.incrimentPage()
        return response.data
    } catch(error){
        console.log(error)
    }
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