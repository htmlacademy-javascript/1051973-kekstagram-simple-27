import {isEscDone} from './util.js';
import {picturesForTemplateBlock} from './renderpictures.js';
import {resetFilterValues, isOriginalEffect, sliderElement, createSlider, elementEffectNone} from './slider.js';
import {sendData} from './server.js';

import {showPopupSuccess, showPopupError} from './popup.js';
//const MAX_LENGTH_TEXT_DESCRIPTION = 140;


const SCALE_CONTROL_MAX = 100;
//const SCALE_CONTROL_MIN = 0;
const SCALE_STEP = 25;


const uploadImgInput = document.querySelector('#upload-file');
const uploadImgForm = picturesForTemplateBlock.querySelector('.img-upload__overlay');
const uploadBtnClose = uploadImgForm.querySelector('#upload-cancel');
const inputDescription = uploadImgForm.querySelector('.text__description');
const radioEffectsItems = document.querySelectorAll('.effects__radio');

const btnSmallerScale = uploadImgForm.querySelector('.scale__control--smaller');
const btnBiggerScale = uploadImgForm.querySelector('.scale__control--bigger');
const imgUploadPreview = uploadImgForm.querySelector('.img-upload__preview img');

const imgUploadForm = picturesForTemplateBlock.querySelector('.img-upload__form');


const scaleValue = document.querySelector('.scale__control--value');
const imageContainer = document.querySelector('.img-upload__preview');
const imageCore = imageContainer.querySelector('img');


const setScale = (scale) => {
  scaleValue.value = `${scale}%`;
  imageCore.style.transform = `scale(${scale / 100})`;
};

btnBiggerScale.addEventListener('click', () => {
  const scale = parseInt(scaleValue.value, 10);
  if (scale < 100 && scale >= SCALE_STEP) {
    setScale(scale + SCALE_STEP);
  }
});

btnSmallerScale.addEventListener('click', () => {
  const scale = parseInt(scaleValue.value, 10);
  if (scale <= SCALE_CONTROL_MAX && scale > SCALE_STEP) {
    setScale(scale - SCALE_STEP);
  }
});


/*const setScale = (value) => {
  if (value === SCALE_CONTROL.MIN) {
    imgUploadPreview.style.transform = 'scale(0.25)';
  } else if (value === SCALE_CONTROL.MIDDLE) {
    imgUploadPreview.style.transform = 'scale(0.50)';
  } else if (value === SCALE_CONTROL.HIGH) {
    imgUploadPreview.style.transform = 'scale(0.75)';
  } else if (value === SCALE_CONTROL.MAX){
    imgUploadPreview.style.transform = 'scale(1)';
  }
}; */
/*
const onBtnSmallerScaleClick = () => {
  const currentValue = Number(valueScaleInput.getAttribute('value').replace('%', ''));
  let valueMin = '';
  if (currentValue <= SCALE_CONTROL.MAX && currentValue > SCALE_CONTROL.MIN) {
    valueMin = currentValue - SCALE_CONTROL.STEP;
    valueScaleInput.setAttribute('value', `${valueMin}%`);
    setScale(valueMin);
  }
};
const onBtnBiggerScaleClick = () => {
  const currentValue = Number(valueScaleInput.getAttribute('value').replace('%', ''));
  let valueMax = '';
  if (currentValue >= SCALE_CONTROL.MIN && currentValue < SCALE_CONTROL.MAX) {
    valueMax = currentValue + SCALE_CONTROL.STEP;
    valueScaleInput.setAttribute('value', `${valueMax}%`);
    setScale(valueMax);
  }
};
*/

const onPopupEscKeydown = (evt) => {
  if (isEscDone(evt)) {
    evt.preventDefault();
    const inputInFocus = document.activeElement;

    if (inputInFocus === inputDescription) {
      return;
    }
    closeFormEditingImg();
  }
};

// Функция открытия формы
const openFormEditingImg = () => {
  uploadImgForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  scaleValue.value = '100%';
  elementEffectNone.checked = true;
  createSlider();
  isOriginalEffect();

  // Добавление обработчиков в момент открытия формы
  document.addEventListener('keydown', onPopupEscKeydown);
  //btnSmallerScale.addEventListener('click', onBtnSmallerScaleClick);
  //btnBiggerScale.addEventListener('click', onBtnBiggerScaleClick);
  btnSmallerScale.addEventListener('click', btnSmallerScale);
  btnBiggerScale.addEventListener('click', btnBiggerScale);


  uploadBtnClose.addEventListener('click', closeFormEditingImg);
};

// Удаление у всех фильтров атрибута checked
const removeEffect = () => {
  radioEffectsItems.forEach((effect) => {
    effect.removeAttribute('checked');
  });
};

// Функция закрытия формы
function closeFormEditingImg () {
  uploadImgForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearFormEditing();
  resetFilterValues();
  removeEffect();

  // Удаление обработчиков после закрытия формы
  document.removeEventListener('keydown', onPopupEscKeydown);
  //btnSmallerScale.removeEventListener('click', onBtnSmallerScaleClick);
  //btnBiggerScale.removeEventListener('click', onBtnBiggerScaleClick);
  btnSmallerScale.removeEventListener('click', btnSmallerScale);
  btnBiggerScale.removeEventListener('click', btnBiggerScale);


  uploadBtnClose.removeEventListener('click', closeFormEditingImg);
}

// Закрытие формы в случае ошибки загрузки данных
function closeFormEditingImgError () {
  uploadImgForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadImgInput.value = '';
}

uploadImgInput.addEventListener('change', openFormEditingImg);

// Сброс значения поля выбора файла формы редактирования после ее закрытия
function clearFormEditing () {
  uploadImgInput.value = '';
  inputDescription.value = '';
  imgUploadPreview.style.transform = 'scale(1)';
  // Уничтожить слайдер
  sliderElement.noUiSlider.destroy();
}
const pristine = new Pristine (uploadImgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
});

function validateComment (value) {
  return value.length >= 20 && value.length <= 140;
}

pristine.addValidator(
  uploadImgForm.querySelector('.text__description'),
  validateComment,
  'От 20 до 140 символов'
);


inputDescription.addEventListener('input', validateComment);
// Открытие формы редактирования снова, с сохранением всех введенных данных,
// если при отправке данных произошла ошибка запроса
const openFormEditingImgAgain = () => {
  uploadImgForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
  btnSmallerScale.addEventListener('click', btnSmallerScale);
  btnBiggerScale.addEventListener('click', btnBiggerScale);
  uploadBtnClose.addEventListener('click', closeFormEditingImg);
};

// Удаление обычного обработчика открытия формы и добавление нового
const uploadImgAgain = () => {
  uploadImgInput.removeEventListener('change', openFormEditingImg);
  uploadImgInput.addEventListener('change', openFormEditingImgAgain);
};


// Обработчик отправки данных на форму
const setUserFormSubmit = (onSuccess, onFail) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => {
        onSuccess();
        showPopupSuccess();
      },
      () => {
        onFail();
        showPopupError();
        uploadImgAgain();
      },
      new FormData(evt.target),
    );
  });
};

export {uploadImgForm, imgUploadPreview, scaleValue, uploadImgInput, SCALE_CONTROL_MAX, setUserFormSubmit, closeFormEditingImg, closeFormEditingImgError};
