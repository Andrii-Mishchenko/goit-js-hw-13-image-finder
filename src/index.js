import './styles.css';
// import './js/if.js';
// import './js/io';

import "@pnotify/core/dist/BrightTheme.css";
import { error } from '@pnotify/core';
import cardTpl from './js/cardTpl.hbs'
import PicturesApiService from './js/apiService'
// import LoadMoreBtn from './js/load-more-btn';

const refs = {
    searchForm: document.querySelector('.search-form'),
    pictureContainer: document.querySelector('.gallery'),
    // loadMoreBtn: document.querySelector('[data-action="load-more"]'),
    sentinel: document.querySelector('#sentinel')
}

const picturesApiService = new PicturesApiService();
// const loadMoreBtn = new LoadMoreBtn({
//     selector: '[data-action="load-more"]',
//     hidden: true,
// });


refs.searchForm.addEventListener('submit', onSearch);
// loadMoreBtn.refs.button.addEventListener('click', onLoadMore);



function onSearch(e){
    e.preventDefault();

    // loadMoreBtn.show();  

    picturesApiService.query = e.currentTarget.elements.query.value;
    picturesApiService.resetPage();
   

    // loadMoreBtn.disable();
    picturesApiService.fetchPictures()
    .then(pictures =>{    
        clearPicturesContainer();
        picturesPageMurkup(pictures);    
        // loadMoreBtn.enable();
    });    
    // onLoadMore()
}

// let scroll = 0;
// function onLoadMore(){
//     scroll +=1400;
//     loadMoreBtn.disable()
//     picturesApiService.fetchPictures()
//     .then(pictures => {
//         picturesPageMurkup(pictures);
//         window.scrollTo({
//             top: scroll,
//             behavior: "smooth"
//         });
//         // window.scrollTo( 0, 3000 );
//         loadMoreBtn.enable();
//     });
// }

function picturesPageMurkup(picturesArray){
    const murkup = cardTpl(picturesArray);
    refs.pictureContainer.insertAdjacentHTML('beforeend', murkup)
}

function clearPicturesContainer(){
    refs.pictureContainer.innerHTML = '';
}


// intersection observer

const onEntry = entries =>{
  
    entries.forEach(entry => {
        console.log('picturesApiService.query', picturesApiService.query);

        if(entry.isIntersecting && picturesApiService.query !== ''){
            console.log('Это колбек в for Each')
            picturesApiService.fetchPictures()
            .then(pictures =>{    
                // clearPicturesContainer();
                picturesPageMurkup(pictures);    
                // loadMoreBtn.enable();
            });    
        }       
    });
};

const options = {
    rootMargin: '300px',

}

const observer = new IntersectionObserver(onEntry, options);
observer.observe(refs.sentinel);