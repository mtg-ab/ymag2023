import Swiper from 'swiper/bundle';
// import styles bundle
import 'swiper/css/bundle';
document.addEventListener("DOMContentLoaded", function(event) {
    if(document.getElementsByClassName("testimonials").length > 0) {
        const swiperOptions = {
            loop: "infinite",
            effect: "fade",
            
            navigation: {
                nextEl: ".testimonials .btn-arrow-next",
                prevEl: ".testimonials .btn-arrow-prev"
            }
        };
        const testimonialsSwiper = new Swiper(".testimonials .wrapper", swiperOptions);
    }
});