import { imgUploadPreview, scaleValue} from './form.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValueEffect = document.querySelector('.effect-level__value');

const effectsList = document.querySelector('.effects__list');
const elementEffectNone = document.querySelector('#effect-none');


const EFFECT_CLASSES_DICTIONARY = {
  'chrome': 'effects__preview--chrome',
  'sepia': 'effects__preview--sepia',
  'marvin': 'effects__preview--marvin',
  'phobos': 'effects__preview--phobos',
  'heat': 'effects__preview--heat',
};

const EFFECT_FILTERS_DICTIONARY = {
  'chrome': 'grayscale',
  'sepia': 'sepia',
  'marvin': 'invert',
  'phobos': 'blur',
  'heat': 'brightness',
};

const movingSlider = (filterValue) => {
  switch (filterValue) {
    case 'chrome':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'sepia':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        start: 1,
        step: 0.1
      });
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1
      });
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1
      });
      break;
  }};

const isOriginalEffect = () => {
  if (elementEffectNone.checked) {
    sliderContainer.classList.add('hidden');
    sliderValueEffect.setAttribute('value', '');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const resetFilterValues = () => {
  imgUploadPreview.removeAttribute('class');
  imgUploadPreview.style.filter = '';

};
const resetScale = () => {
  scaleValue.value = '100%';
  imgUploadPreview.style.transform = 'scale(1)';
};

const changeFilterEffect = (photo, nameFilter) => {
  sliderElement.noUiSlider.on('update', (values, handle) => {
    let valueEffect = '';
    if (nameFilter === 'marvin') {
      valueEffect = `${values[handle]}%`;
    } else if (nameFilter === 'phobos') {
      valueEffect = `${values[handle]}px`;
    } else {
      valueEffect = values[handle];
    }
    sliderValueEffect.setAttribute('value', valueEffect);
    for (const filter in EFFECT_FILTERS_DICTIONARY) {
      if (nameFilter === filter) {
        photo.style.filter = `${EFFECT_FILTERS_DICTIONARY[filter]}(${valueEffect})`;
      }
    }
  });
};

const onEffectsListClick = (evt) => {
  resetFilterValues();
  isOriginalEffect();
  if (evt.target.matches('.effects__radio')) {
    const value = evt.target.value;
    for (const effect in EFFECT_CLASSES_DICTIONARY) {
      if (value === effect) {
        movingSlider(value);
        imgUploadPreview.classList.add(EFFECT_CLASSES_DICTIONARY[effect]);
        changeFilterEffect(imgUploadPreview, value);
      }
    }
  }
};

// Обработчик на родительский контейнер всех фильтров с делегированием
effectsList.addEventListener('change', onEffectsListClick);

// Функция создания слайдера

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
    format: {
      to: (value) => (Number.isInteger(value)) ? (value.toFixed(0)) : (value.toFixed(1)),
      from: (value) => parseFloat(value),
    },
  });
};

export {resetFilterValues, isOriginalEffect, sliderElement, elementEffectNone, createSlider, effectsList, resetScale};
