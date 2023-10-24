import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';

document.addEventListener("DOMContentLoaded", function(event) {
    if(document.getElementsByClassName("carousel-cards-news").length > 0) {
        const swiperOptions = {
            //loop: "infinite",
            //effect: "fade",
            slidesPerView : 3,
            spaceBetween : 30,
            //centeredSlides: true,
            
            navigation: {
                nextEl: ".carousel-cards-news .btn-arrow-next",
                prevEl: ".carousel-cards-news .btn-arrow-prev"
            }
        };
        const testimonialsSwiper = new Swiper(".carousel-cards-news .wrapper", swiperOptions);
    }
});