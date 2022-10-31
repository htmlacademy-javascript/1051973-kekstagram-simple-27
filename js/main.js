const MIN_NUMBER = 1;
const MAX_NUMBER = 25;
const INPUT_TEXT = 'текст';
const INPUT_TEXT_LENGTH = 20;

function getRandomIntFromInterval(min, max) {
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
console.log(getRandomIntFromInterval(MIN_NUMBER, MAX_NUMBER));

function stringLength(input, line) {
  return !(input.length > line);
}
console.log(stringLength(INPUT_TEXT, INPUT_TEXT_LENGTH));
