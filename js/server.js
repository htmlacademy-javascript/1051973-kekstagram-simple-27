import {showAlert} from './util.js';


const getData = (onSuccess) => {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then((response) => response.json())
    .then((photo) => {
      onSuccess(photo);
    })
    .catch(showAlert);
};

const sendData = (onSuccess, onFail, body) => {
  fetch('https://27.javascript.pages.academy/kekstagram-simple',
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
