'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Manipulation,
    Pagination,
    Autoplay,
    EffectFade,
} from 'swiper';

import AOS from 'aos';
import IMask from 'imask';

// Проверка поддержки webP
baseFunction.testWebP();


// Анимация инпутов при фокусе
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


// Слайдер полноэкранный
const fullscreenSlider = new Swiper('.fullscreen-slider', {
    modules: [Pagination, EffectFade, Autoplay],
    speed: 1200,
    slidesPerView: 1,
    effect: 'fade',
    grabCursor: true,
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



const boundlessSlider = new Swiper('.boundless-slider', {
    speed: 1200,
    slidesPerView: 1,
    grabCursor: true,
    spaceBetween: 10,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    breakpoints: {
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        576: {
            slidesPerView: 2,
            spaceBetween: 20,
        }
    }
});


const materialSlider = new Swiper('.material-section__slider', {
    modules: [Manipulation],
    speed: 1200,
    slidesPerView: 'auto',
    spaceBetween: 10,
    loop: true,
    loopedSlides: 10,
    slideToClickedSlide: true,
    observeParents: true,
    breakpoints: {
        1024: {
            spaceBetween: 30,
        },
        576: {
            speed: 2000,
            spaceBetween: 20,
        }
    },
    on: {
        //обновляем слайдер для коррекного отображения 
        slideChangeTransitionStart(slider) {
            slider.updateSize();
            slider.updateProgress();
            slider.disable();
        },
        slideChangeTransitionEnd(slider) {
            slider.updateSize();
            slider.enable();
        },
        resize(slider) {
            slider.updateSize();
            slider.update();
        },
        // beforeLoopFix(slider) {
        //     slider.updateSize();
        // }
    }
});


window.addEventListener('load', (e) => {
    document.body.style.opacity = 1;
});
// Инит и опции библиотеки анимаций
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
    offset: 25, // offset (in px) from the original trigger point
    delay: 100, // values from 0 to 3000, with step 50ms
    duration: 1200, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});

//логика работы меню бургер
document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.closest('[data-burger-menu]')) {
        target.closest('[data-burger-menu]').classList.toggle('active');
        document.querySelector('[data-header-menu]').classList.toggle('active');
        document.body.classList.toggle('hidden');
    }
    if (target.closest('.fullscreen-slider__desc')) {
        target.closest('.fullscreen-slider__desc').classList.add('open');
    }
    if (target.closest('[data-material-variant]')) {
        const materialVariant = target.closest('[data-material-variant]');
        const materialVariantId = materialVariant.dataset.materialVariant;

        document.querySelector('[data-material-variant].active').classList.remove('active')
        materialVariant.classList.add('active');

        document.querySelector('[data-material-slider].show').classList.remove('show');
        document.querySelector(`[data-material-slider='${materialVariantId}']`).classList.add('show');

    }

});

// Маска на номера телефона
document.querySelectorAll('input[type="tel"]').forEach(input => {
    const mask = IMask(input, {
        mask: '+{7}(000) 000-00-00'
    });
});



