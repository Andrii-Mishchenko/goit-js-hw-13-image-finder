import './styles.css';
import "@pnotify/core/dist/BrightTheme.css";
import { error } from '@pnotify/core';
import cardTpl from './js/cardTpl.hbs'
import PicturesApiService from './js/apiService'
import LoadMoreBtn from './js/load-more-btn';

const refs = {
    searchForm: document.querySelector('.search-form'),
    pictureContainer: document.querySelector('.gallery'),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]')
}

const picturesApiService = new PicturesApiService();
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
});


refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);



function onSearch(e){
    e.preventDefault();

    loadMoreBtn.show();  

    picturesApiService.query = e.currentTarget.elements.query.value;
    picturesApiService.resetPage();
   

    loadMoreBtn.disable();
    picturesApiService.fetchPictures()
    .then(pictures =>{    
        clearPicturesContainer();
        picturesPageMurkup(pictures);    
        loadMoreBtn.enable();
    });    
    // onLoadMore()
}

let scroll = 0;
function onLoadMore(){
    scroll +=1400;
    loadMoreBtn.disable()
    picturesApiService.fetchPictures()
    .then(pictures => {
        picturesPageMurkup(pictures);
        window.scrollTo({
            top: scroll,
            behavior: "smooth"
        });
        // window.scrollTo( 0, 3000 );
        loadMoreBtn.enable();
    });
}

function picturesPageMurkup(picturesArray){
    const murkup = cardTpl(picturesArray);
    refs.pictureContainer.insertAdjacentHTML('beforeend', murkup)
}

function clearPicturesContainer(){
    refs.pictureContainer.innerHTML = '';
}