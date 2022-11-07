import {createSimilarPhotoObjects} from './data.js';

const randomUsersImageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesForTemplateBlock = document.querySelector('.pictures');

const data = createSimilarPhotoObjects();


const renderTemplatePictures = () => {
  data.forEach(({url, likes, comments}) => {
    const pictureUserElement = randomUsersImageTemplate.cloneNode(true);
    pictureUserElement.querySelector('.picture__img').src = url;
    pictureUserElement.querySelector('.picture__likes').textContent = likes;
    pictureUserElement.querySelector('.picture__comments').textContent = comments;
    picturesForTemplateBlock.append(pictureUserElement);
  });
};

export {renderTemplatePictures};
