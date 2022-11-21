import './util.js';
import './data.js';
import './renderpictures.js';
import './form.js';
import './slider.js';

import './server.js';
import './popup.js';
import {getData} from './server.js';
import {createPhoto} from './renderpictures.js';
import {setUserFormSubmit, closeFormEditingImg, closeFormEditingImgError} from './form.js';

getData((photo) => {
  createPhoto(photo);
});

setUserFormSubmit(closeFormEditingImg, closeFormEditingImgError);
