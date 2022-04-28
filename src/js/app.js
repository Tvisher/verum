'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Navigation,
    Pagination,
    Autoplay,
    EffectFade,
} from 'swiper';

import AOS from 'aos';

// Проверка поддержки webP
baseFunction.testWebP();



(function getAnimationinputs() {
    const stylinginputs = document.querySelectorAll('[data-styles-field]');
    if (stylinginputs) {
        stylinginputs.forEach(input => {
            const inputpParent = input.parentNode;
            const transformtext = inputpParent.querySelector('.styles-text');
            input.addEventListener('focus', (e) => {
                inputpParent.classList.add('focus');
                transformtext && transformtext.classList.add('fixed');

                input.addEventListener('blur', (e) => {
                    const inputValue = e.target.value.trim();
                    inputpParent.classList.remove('focus');
                    if (inputValue.length === 0) {
                        transformtext.classList.remove('fixed');
                    }
                }, { once: true });
            });
            //Добавление класса к инпуту если он заполнен
            const inputValue = input.value.trim();
            if (inputValue.length === 0) {
                transformtext.classList.remove('fixed');
            } else {
                transformtext.classList.add('fixed');
            }
        });
    }
}())



const fullscreenSlider = new Swiper('.fullscreen-slider', {
    modules: [Pagination, EffectFade, Autoplay],
    speed: 1200,
    slidesPerView: 1,
    effect: 'fade',
    grabCursor: true,
    // autoHeight: true,
    loop: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 6000,
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    on: {
        resize(swiper) {
            swiper.update();
        },
    },
    breakpoints: {
        768: {
            autoHeight: false,
        }
    }
});



AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'load', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 80, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 1200, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});


document.body.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('[data-burger-menu]')) {
        target.closest('[data-burger-menu]').classList.toggle('active');
        document.querySelector('[data-header-menu]').classList.toggle('active');
        document.body.classList.toggle('hidden');
    }
});

window.addEventListener('load', (e) => {
    document.body.style.opacity = 1;
});





// // Счётчики секции с клиентами
// function outNum(num, elem, step, time) {
//     let e = elem,
//         n = 0;
//     let timerInterval = time;
//     let interval = setInterval(() => {
//         n = n + step;
//         if (n + 1 >= num) {
//             clearInterval(interval);
//             let lowTimerInterval = time * 20;
//             let lowInterval = setInterval(() => {
//                 n = n + step;
//                 if (n >= num) {
//                     clearInterval(lowInterval);
//                 }
//                 e.innerHTML = n;
//             }, lowTimerInterval);
//         }
//         e.innerHTML = n;
//     }, timerInterval);
// }

// document.querySelectorAll('[data-counter-elem]').forEach((element, index) => {
//     const iterableNum = +element.textContent;
//     console.log(iterableNum);
//     outNum(iterableNum, element, 1, 15 + index);
// });
