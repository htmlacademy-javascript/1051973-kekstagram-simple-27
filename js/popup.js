import {isEscDone} from './util.js';

// Шаблон попапа об успешной отправки данных
const popupSuccessTemplate = document.querySelector('#success').content;
const popupSuccessContent = popupSuccessTemplate.querySelector('section');
const popupSuccessFragment = document.createDocumentFragment();

// Шаблон попапа об ошибке запроса при отправки данных
const popupErrorTemplate = document.querySelector('#error').content;
const popupErrorContent = popupErrorTemplate.querySelector('section');
const popupErrorFragment = document.createDocumentFragment();

// Проверка по клику на оверлей и закрытие попапа успеха
const onPopupSuccessOverlayClick = (evt) => {
  const successPopup = document.querySelector('.success');
  if (evt.target === successPopup) {
    evt.preventDefault();
    closePopupSuccess();
  }
};

// Проверка на нажатую кнопку Esc и закрытие попапа успеха
const onPopupSuccessEscKeydown = (evt) => {
  if (isEscDone(evt)) {
    evt.preventDefault();
    closePopupSuccess();
  }
};

// Закрыть попап об успешной отправке данных
function closePopupSuccess () {
  const successPopup = document.querySelector('.success');
  document.body.removeChild(successPopup);

  document.removeEventListener('keydown', onPopupSuccessEscKeydown);
  document.removeEventListener('click', onPopupSuccessOverlayClick);
}

// Показать попап об успешной отправке данных из формы
const showPopupSuccess = () => {
  const popupSuccessElement = popupSuccessContent.cloneNode(true);
  popupSuccessFragment.appendChild(popupSuccessElement);
  document.body.appendChild(popupSuccessFragment);
  const popupSuccessButtonClose = popupSuccessElement.querySelector('.success__button');

  popupSuccessButtonClose.addEventListener('click', closePopupSuccess);
  document.addEventListener('keydown', onPopupSuccessEscKeydown);
  document.addEventListener('click', onPopupSuccessOverlayClick);
};

// Проверка по клику на оверлей и закрытие попапа об ошибке
const onPopupErrorOverlayClick = (evt) => {
  const errorPopup = document.querySelector('.error');
  if (evt.target === errorPopup) {
    evt.preventDefault();
    closePopupError();
  }
};

// Проверка на нажатую кнопку Esc и закрытие попапа об ошибке
const onPopupErrorEscKeydown = (evt) => {
  if (isEscDone(evt)) {
    evt.preventDefault();
    closePopupError();
  }
};

// Закрыть попап об ошибке отправки данных из формы
function closePopupError () {
  const errorPopup = document.querySelector('.error');
  document.body.removeChild(errorPopup);

  document.removeEventListener('keydown', onPopupErrorEscKeydown);
  document.removeEventListener('click', onPopupErrorOverlayClick);
}

// Показать попап об ошибке отправки данных из формы
const showPopupError = () => {
  const popupErrorElement = popupErrorContent.cloneNode(true);
  popupErrorFragment.appendChild(popupErrorElement);
  document.body.appendChild(popupErrorFragment);
  const popupErrorButtonClose = popupErrorElement.querySelector('.error__button');

  popupErrorButtonClose.addEventListener('click', closePopupError);
  document.addEventListener('keydown', onPopupErrorEscKeydown);
  document.addEventListener('click', onPopupErrorOverlayClick);
};

export {showPopupSuccess, showPopupError};
