import {showAlert} from './util.js';

const urlGetData = ' https://27.javascript.pages.academy/kekstagram-simple/data';
const urlSendData = ' https://27.javascript.pages.academy/kekstagram-simple';

// Получить данные
const getData = (onSuccess) => {
  fetch(urlGetData)

    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((photo) => {
      onSuccess(photo);
    })
    .catch((err) => showAlert(err));
};

// Отправить данные
const sendData = (onSuccess, onFail, body) => {
  fetch(
    urlSendData,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      }
      else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз.');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз.');
    });
};

export {getData, sendData};
