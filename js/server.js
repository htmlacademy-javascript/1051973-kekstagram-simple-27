import {showAlert} from './util.js';
const URL_GET_DATA = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const URL_SEND_DATA = 'https://27.javascript.pages.academy/kekstagram-simple';

const getData = (onSuccess) => {
  fetch(URL_GET_DATA)
    .then((response) => response.json())
    .then((photo) => {
      onSuccess(photo);
    })
    .catch(showAlert);
};

const sendData = (onSuccess, onFail, body) => {
  fetch(URL_SEND_DATA,
    {
      method: 'POST',
      body
    }
  )
    .then((response) => {
      if(response.ok) {
        onSuccess();
      } else {
        throw new Error;
      }
    })
    .catch(onFail);
};

export { getData, sendData };
