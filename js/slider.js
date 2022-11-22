import { imgUploadPreview, scaleValue, SCALE_CONTROL_MAX} from './form.js';

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
  if (filterValue === 'chrome') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    });
  } else if (filterValue === 'sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1
    });
  } else if (filterValue === 'marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1
    });
  } else if (filterValue === 'phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1
    });
  } else if (filterValue === 'heat') {
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1
    });
  }
};

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
  imgUploadPreview.removeAttribute('style');
  scaleValue.setAttribute('value', SCALE_CONTROL_MAX);
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

    const digitsOnly = valueEffect.replace(/[^0-9.]/g, '');
    sliderValueEffect.setAttribute('value', digitsOnly);
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
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });
};

export {resetFilterValues, isOriginalEffect, sliderElement, elementEffectNone, createSlider, effectsList};
