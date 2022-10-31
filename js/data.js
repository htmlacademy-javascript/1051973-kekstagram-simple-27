import {getRandomArrayElement, randomIntFromInterval, getPhotoId, getPhotoUrl, stringLength} from './util.js';

const MIN_NUMBER = 15;
const MAX_NUMBER = 200;
const INPUT_TXT = 'Строка текста';
const MAX_LENGTH = 20;

stringLength(INPUT_TXT, MAX_LENGTH);


const TRAVEL = [
  'beach',
  'goToTheBeach',
  'sea',
  'girlwithSomething',
  'soup',
  'blackCar',
  'strawberry',
  'juice',
  'airplane',
  'shoes',
  'road',
  'whiteCar',
  'salad',
  'sushiCat',
  'uggBoots',
  'sky',
  'choir',
  'redCar',
  'slippers',
  'palmTrees',
  'dinner',
  'sunset',
  'crab',
  'concert',
  'bigCar',
];

const createNewObject = () => (
  {
    id: getPhotoId(),
    url: `photos/${getPhotoUrl()}.jpg`,
    description: getRandomArrayElement(TRAVEL),
    likes: randomIntFromInterval(MIN_NUMBER,MAX_NUMBER),
    comments: randomIntFromInterval(0,MAX_NUMBER),
  }
);

const createSimilarPhotoObjects = () => Array.from({length: 25}, createNewObject);

export {createSimilarPhotoObjects};
