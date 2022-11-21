const ALERT_SHOW_TIME = 3000;


function randomIntFromInterval(min, max) {
  if (min < 0 || max < 0) {
    return NaN;
  }
  min = Math.floor(min);
  max = Math.ceil(max);
  if (min === max) {
    return min;
  }
  return min > max ? random(max, min) : random(min, max);
}

function random(min, max) {
  return (Math.round(Math.random() * (max - min)) + min);
}

function stringLength(input, line) {
  return !(input.length > line);
}

let lastGeneratedPhotoId = 0;
let lastGeneratedUrlId = 0;

function getPhotoId () {
  return ++lastGeneratedPhotoId;
}

function getPhotoUrl () {
  return ++lastGeneratedUrlId;
}

const getRandomArrayElement = (elements) => elements[randomIntFromInterval(0, elements.length - 1)];

const isEscDone = (evt) => evt.key === 'Escape' || evt.key === 'Esc';


// Блок с возможной ошибкой запроса данных с сервера
const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.bottom = '400px';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '100px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.color = 'white';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = 'Ошибка загрузки данных';

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};


export {
  getRandomArrayElement,
  randomIntFromInterval,
  getPhotoId,
  getPhotoUrl,
  stringLength,
  isEscDone,
  showAlert
};
