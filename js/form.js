
import {isEscDone} from './util.js';
import {picturesForTemplateBlock} from './renderpictures.js';


const MAX_LENGTH_TEXT_DESCRIPTION = 140;
const uploadImgInput = document.querySelector('#upload-file');
const uploadImgForm = picturesForTemplateBlock.querySelector('.img-upload__overlay');
const uploadBtnClose = uploadImgForm.querySelector('#upload-cancel');
const inputDescription = uploadImgForm.querySelector('.text__description');

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

  document.addEventListener('keydown', onPopupEscKeydown);
};

function closeFormEditingImg () {
  uploadImgForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  clearFormEditing();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

uploadImgInput.addEventListener('change', () => {
  openFormEditingImg();
});
uploadBtnClose.addEventListener('click', () => {
  closeFormEditingImg();
});
function clearFormEditing () {
  uploadImgInput.value = '';
  inputDescription.value = '';
}
const onInputDescriptionValid = () => {
  const currentLengthComment = inputDescription.value.length;

  if (currentLengthComment > MAX_LENGTH_TEXT_DESCRIPTION) {
    inputDescription.setCustomValidity(`Длина комментария не может превышать 140 символов. Удалите лишние ${currentLengthComment - MAX_LENGTH_TEXT_DESCRIPTION} символы`);
  } else {
    inputDescription.setCustomValidity(' ');
  }

  inputDescription.reportValidity();
};

inputDescription.addEventListener('input', onInputDescriptionValid);
