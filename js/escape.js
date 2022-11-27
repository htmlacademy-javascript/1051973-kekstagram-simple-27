import {closeFormEditingImg, inputDescription} from './form.js';
import {onPopupErrorOverlayClick, onPopupErrorEscKeydown, onPopupSuccessEscKeydown, onPopupSuccessOverlayClick} from './popup.js';
import {isEscDone} from './util.js';
// Запрет закрытие на активном элементе
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

// Закрыть попап об ошибке отправки данных из формы
const closePopupError = () => {
  const errorPopup = document.querySelector('.error');
  document.body.removeChild(errorPopup);

  document.removeEventListener('keydown', onPopupErrorEscKeydown);
  document.removeEventListener('click', onPopupErrorOverlayClick);
};
// Закрыть попап об успешной отправке данных
const closePopupSuccess = () => {
  const successPopup = document.querySelector('.success');
  document.body.removeChild(successPopup);

  document.removeEventListener('keydown', onPopupSuccessEscKeydown);
  document.removeEventListener('click', onPopupSuccessOverlayClick);
};

export {onPopupEscKeydown, closePopupError, closePopupSuccess};
