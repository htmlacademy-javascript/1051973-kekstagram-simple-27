//import {isEscDone} from './util.js';
import {picturesForTemplateBlock} from './renderpictures.js';
import {resetFilterValues, isOriginalEffect, sliderElement, createSlider, elementEffectNone, resetScale} from './slider.js';
import {sendData} from './server.js';
import {onPopupEscKeydown} from './escape.js';
import {showPopupSuccess, showPopupError} from './popup.js';
//const MAX_LENGTH_TEXT_DESCRIPTION = 140;
const MIN_LENGTH_COMMENT = 20;
const MAX_LENGTH_COMMENT = 140;
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
const submitButton = uploadImgForm.querySelector('.img-upload__submit');

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
// Удаление у всех фильтров атрибута checked
const removeEffect = () => {
  radioEffectsItems.forEach((effect) => {
    effect.removeAttribute('checked');
  });
};
// Сброс значения поля выбора файла формы редактирования после ее закрытия
const clearFormEditing = () => {
  uploadImgInput.value = '';
  inputDescription.value = '';
  imgUploadPreview.style.transform = 'scale(1)';
  // Уничтожить слайдер
  sliderElement.noUiSlider.destroy();
};
// Функция закрытия формы
const closeFormEditingImg = () => {
  uploadImgForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearFormEditing();
  resetFilterValues();
  removeEffect();
  document.removeEventListener('keydown', onPopupEscKeydown);
  btnSmallerScale.removeEventListener('click', btnSmallerScale);
  btnBiggerScale.removeEventListener('click', btnBiggerScale);
  uploadBtnClose.removeEventListener('click', closeFormEditingImg);
};

// Функция открытия формы
const openFormEditingImg = () => {
  uploadImgForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  elementEffectNone.checked = true;
  createSlider();
  isOriginalEffect();
  resetScale();
  document.addEventListener('keydown', onPopupEscKeydown);
  btnSmallerScale.addEventListener('click', btnSmallerScale);
  btnBiggerScale.addEventListener('click', btnBiggerScale);
  uploadBtnClose.addEventListener('click', closeFormEditingImg);
};

// Закрытие формы в случае ошибки загрузки данных
const closeFormEditingImgError = () => {
  uploadImgForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadImgInput.value = '';

};

uploadImgInput.addEventListener('change', openFormEditingImg);


const pristine = new Pristine (imgUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
});

const validateComment = (value) =>
  value.length >= MIN_LENGTH_COMMENT && value.length <= MAX_LENGTH_COMMENT;


pristine.addValidator(
  uploadImgForm.querySelector('.text__description'),
  validateComment,
  `От ${MIN_LENGTH_COMMENT} до ${MAX_LENGTH_COMMENT} символов`
);
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};
inputDescription.addEventListener('input', validateComment);

const openFormEditingImgAgain = () => {
  uploadImgForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  scaleValue.value = '100%';
  elementEffectNone.checked = true;
  createSlider();
  isOriginalEffect();
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
const setUserFormSubmit = (onSuccess) => {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if(pristine.validate()){
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          showPopupSuccess();
          unblockSubmitButton();
        },
        () => {
          showPopupError();
          unblockSubmitButton();
          uploadImgAgain();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {uploadImgForm, imgUploadPreview, scaleValue, uploadImgInput, SCALE_CONTROL_MAX, setUserFormSubmit, closeFormEditingImg, closeFormEditingImgError, inputDescription};
