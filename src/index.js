import './styles.css';
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
    clearPicturesContainer();

    // loadMoreBtn.disable();
    // picturesApiService.fetchPictures()
    // .then(pictures =>{    
    //     picturesPageMurkup(pictures);    
    //     loadMoreBtn.enable();
    // });    
    onLoadMore()
}

function onLoadMore(){
    loadMoreBtn.disable()
    picturesApiService.fetchPictures()
    .then(pictures => {
        picturesPageMurkup(pictures);
        // window.scrollTo({
        //     top: 1000,
        //     behavior: "smooth"
        // });
        
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