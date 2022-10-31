const MIN_NUMBER = 1;
const MAX_NUMBER = 25;
const MIN_PHOTO_NUMBER = 1;
const PHOTO_OBJECTS_NUMBER = 25;
// const AVATAR_NUMBER = 6;
const INPUT_TEXT = 'текст';
const INPUT_TEXT_LENGTH = 20;
const LIKES_MIN = 15;
const LIKES_MAX = 200;
// const COMMENT_ID_MIN = 1;
// const COMMENT_ID_MAX = 2000;
const DESCRIPTIONS = [
  'beach',
  'goToTheBeach',
  'sea',
  'girlwithTits',
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
/*const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];*/
/*const NAME = [
  'Арсений',
  'Ксения',
  'Владимир',
  'Артем',
  'Николай',
  'Алексей',
  'Иван',
  'Александра',
  'Роман',
  'Петр',
  'Василий',
  'Александр',
  'Елизавета',
];*/


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
getRandomIntFromInterval(MIN_NUMBER, MAX_NUMBER);

function stringLength(input, line) {
  return !(input.length > line);
}
stringLength(INPUT_TEXT, INPUT_TEXT_LENGTH);


function getPhoto(i) {
  return {
    id: i,
    url: `photos/${getRandomIntFromInterval(MIN_PHOTO_NUMBER, PHOTO_OBJECTS_NUMBER)}.jpg`,
    description: DESCRIPTIONS[getRandomIntFromInterval(0, DESCRIPTIONS.length - 1)],
    likes: getRandomIntFromInterval(LIKES_MIN, LIKES_MAX),
    comments: getRandomIntFromInterval(0, 200),
  };
}

function getPhotosObjects(photoNumber) {
  const photosArray = [];
  for (let i = 1; i <= photoNumber; i++) {
    photosArray.push(getPhoto(i));
  }
  return photosArray;
}
console.log(getPhotosObjects (PHOTO_OBJECTS_NUMBER));
