

/**
* Typical Observer's registration
*/
const callback = entries =>{
    // entries: Array of observed elements
    entries.forEach(entry => {
        if(entry.isIntersecting){
            console.log('Это колбек в for Each')
        }       
    });
};

const options = {
    rootMargin: '10%',

}

const observer = new IntersectionObserver(callback, options);
  
  // Now we should tell our Observer what to observe
const sentinel = document.querySelector('#sentinel')
observer.observe(sentinel);