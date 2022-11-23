

const randomUsersImageTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesForTemplateBlock = document.querySelector('.pictures');


const photosUsersFragment = document.createDocumentFragment();


const createPhoto = (photo) => {

  photo.forEach(({url, likes, comments}) => {
    const pictureUserElement = randomUsersImageTemplate.cloneNode(true);
    pictureUserElement.querySelector('.picture__img').src = url;
    pictureUserElement.querySelector('.picture__likes').textContent = likes;
    pictureUserElement.querySelector('.picture__comments').textContent = comments;
    photosUsersFragment.appendChild(pictureUserElement);
  });

  picturesForTemplateBlock.appendChild(photosUsersFragment);
};

export {picturesForTemplateBlock, createPhoto};

