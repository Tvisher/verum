'use strict';
import * as baseFunction from './modules/functions.js';
import './vendors/vendors.js';
import Swiper, {
    Navigation,
    Pagination,
    Thumbs,
    EffectFade,
    Mousewheel
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
    modules: [Pagination, EffectFade],
    speed: 800,
    slidesPerView: 1,
    effect: 'fade',
    grabCursor: true,
    autoHeight: true,
    loop: true,
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
    breakpoints: {
        768: {
            autoHeight: false,
        }
    }
});


