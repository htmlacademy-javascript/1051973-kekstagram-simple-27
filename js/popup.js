import {isEscDone} from './util.js';
import {closePopupError, closePopupSuccess, onPopupEscKeydown} from './escape.js';


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


// Показать попап об ошибке отправки данных из формы
const showPopupError = () => {
  const popupErrorElement = popupErrorContent.cloneNode(true);
  popupErrorFragment.appendChild(popupErrorElement);
  document.body.appendChild(popupErrorFragment);
  const popupErrorButtonClose = popupErrorElement.querySelector('.error__button');
  document.removeEventListener('keydown', onPopupEscKeydown);
  popupErrorButtonClose.addEventListener('click', closePopupError);
  document.addEventListener('keydown', onPopupErrorEscKeydown);
  document.addEventListener('click', onPopupErrorOverlayClick);
};

export {showPopupSuccess, showPopupError, onPopupErrorOverlayClick, onPopupErrorEscKeydown, onPopupSuccessEscKeydown, onPopupSuccessOverlayClick};
