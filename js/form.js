import {isEscDone} from './util.js';
import {picturesForTemplateBlock} from './renderpictures.js';
import {resetFilterValues, isOriginalEffect} from './slider.js';
const MAX_LENGTH_TEXT_DESCRIPTION = 140;

const SCALE_CONTROL = {
  MIN: 25,
  MIDDLE: 50,
  HIGH: 75,
  MAX: 100,
  STEP: 25,
};

const uploadImgInput = document.querySelector('#upload-file');
const uploadImgForm = picturesForTemplateBlock.querySelector('.img-upload__overlay');
const uploadBtnClose = uploadImgForm.querySelector('#upload-cancel');
const inputDescription = uploadImgForm.querySelector('.text__description');

const btnSmallerScale = uploadImgForm.querySelector('.scale__control--smaller');
const btnBiggerScale = uploadImgForm.querySelector('.scale__control--bigger');
const valueScaleInput = uploadImgForm.querySelector('.scale__control--value');
const imgUploadPreview = uploadImgForm.querySelector('.img-upload__preview img');

const setScale = (value) => {
  if (value === SCALE_CONTROL.MIN) {
    imgUploadPreview.style.transform = 'scale(0.25)';
  } else if (value === SCALE_CONTROL.MIDDLE) {
    imgUploadPreview.style.transform = 'scale(0.50)';
  } else if (value === SCALE_CONTROL.HIGH) {
    imgUploadPreview.style.transform = 'scale(0.75)';
  } else if (value === SCALE_CONTROL.MAX){
    imgUploadPreview.style.transform = 'scale(1)';
  }
};

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

const openFormEditingImg = () => {
  uploadImgForm.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  valueScaleInput.setAttribute('value', '100%');

  isOriginalEffect();
  document.addEventListener('keydown', onPopupEscKeydown);
  btnSmallerScale.addEventListener('click', onBtnSmallerScaleClick);
  btnBiggerScale.addEventListener('click', onBtnBiggerScaleClick);
};

function closeFormEditingImg () {
  uploadImgForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearFormEditing();
  resetFilterValues();

  document.removeEventListener('keydown', onPopupEscKeydown);
  btnSmallerScale.removeEventListener('click', onBtnSmallerScaleClick);
  btnBiggerScale.removeEventListener('click', onBtnBiggerScaleClick);
}


uploadImgInput.addEventListener('change', () => {
  openFormEditingImg();
});
uploadBtnClose.addEventListener('click', () => {
  closeFormEditingImg() ;
});


function clearFormEditing () {
  uploadImgInput.value = '';
  inputDescription.value = '';
  imgUploadPreview.style.transform = 'scale(1)';
}
const onInputDescriptionValid = () => {
  const currentLengthComment = inputDescription.value.length;

  if (currentLengthComment > MAX_LENGTH_TEXT_DESCRIPTION) {
    inputDescription.setCustomValidity(`Длина комментария не может превышать 140 символов. Удалите лишние ${currentLengthComment - MAX_LENGTH_TEXT_DESCRIPTION} символы`);
  } else {

    inputDescription.setCustomValidity('');
  }

  inputDescription.reportValidity();
};

inputDescription.addEventListener('input', onInputDescriptionValid);


export {imgUploadPreview, valueScaleInput, SCALE_CONTROL};
