import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';
var Flickity = require('flickity');


document.addEventListener("DOMContentLoaded", function(event) {

    if(document.getElementsByClassName("logos").length > 0) {
          
          // Play with this value to change the speed
          let tickerSpeed = 0.9;
          let flickity = null;
          let isPaused = false;
          const slideshowElRow1 = document.querySelector('.logos .wrapper-slide');
          const update = () => {
              if (isPaused) return;
              if (flickity.slides) {
                  flickity.x = (flickity.x - tickerSpeed) % flickity.slideableWidth;
                  flickity.selectedIndex = flickity.dragEndRestingSelect();
                  flickity.updateSelectedSlide();
                  flickity.settle(flickity.x);
              }
              window.requestAnimationFrame(update);
          };
          const pause = () => {
              isPaused = true;
          };
          const play = () => {
          if (isPaused) {
              isPaused = false;
              window.requestAnimationFrame(update);
          }
          };
          //
          //   Create Flickity
          //
          //////////////////////////////////////////////////////////////////////
          flickity = new Flickity(slideshowElRow1, {
          autoPlay: false,
          prevNextButtons: false,
          pageDots: false,
          draggable: true,
          wrapAround: true,
          selectedAttraction: 0.015,
          friction: 0.25,
          imagesLoaded: true
          });
          flickity.x = 0;
          //
          //   Add Event Listeners
          //
          //////////////////////////////////////////////////////////////////////
          slideshowElRow1.addEventListener('mouseenter', pause, false);
          slideshowElRow1.addEventListener('focusin', pause, false);
          slideshowElRow1.addEventListener('mouseleave', play, false);
          slideshowElRow1.addEventListener('focusout', play, false);
          flickity.on('dragStart', () => {
              isPaused = true;
          });
          //
          //   Start Ticker
          //
          //////////////////////////////////////////////////////////////////////
          update();

    }

});