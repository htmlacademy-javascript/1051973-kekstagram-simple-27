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

export {
  getRandomArrayElement,
  randomIntFromInterval,
  getPhotoId,
  getPhotoUrl,
  stringLength,
  isEscDone
};
