import "@pnotify/core/dist/BrightTheme.css";
import { error } from '@pnotify/core';

const API_KEY ='21204345-b994baef221a75cda7aa18f50';
const BASE_URL = 'https://pixabay.com/api'

export default class PicturesApiService {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
        
    }

    fetchPictures(){
        console.log(this);
        
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`;

        return fetch(url)
        .then(response => response.json())
        .then(pictures =>{
            console.log(pictures);
            this.incrementPage();

            const picturesArray = pictures.hits;
            return picturesArray;
        })
        .catch(error => console.log(error));

    }

    incrementPage(){
        this.page +=1;
    }

    resetPage(){
        this.page = 1;
    }

    get query(){
        return this.searchQuery;
    }

    set query(newQuery){
        this.searchQuery = newQuery;
    }
};
