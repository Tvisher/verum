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

//получаем ширину полоски скрола
const scrollLineWigth = baseFunction.scrollbarWidth();


const fullscreenSlider = new Swiper('.fullscreen-slider', {
    modules: [Pagination, EffectFade],
    speed: 800,
    slidesPerView: 1,
    effect: 'fade',
    grabCursor: true,
    loop: true,
    fadeEffect: {
        crossFade: true
    },
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
});


