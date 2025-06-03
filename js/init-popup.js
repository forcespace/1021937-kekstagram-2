import { photoObjects } from './mock.js';
import { isKeyDown } from './util';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const closePopupButton = bigPicture.querySelector('.big-picture__cancel');

export const closePopup = () => {
  bigPicture.classList.add('hidden');
};

const closePopupByPressCloseButton = () => {
  closePopup();

  closePopupButton.removeEventListener('click', closePopupByPressCloseButton);
};

const closePopupByKey = (event) => {
  if (event && isKeyDown(event, 'Escape')) {
    closePopup();

    document.removeEventListener('keydown', closePopupByKey);
  }
};

const closePopupByClickOutside = (event) => {
  if (event.target === bigPicture) {
    closePopup();

    bigPicture.removeEventListener('click', closePopupByClickOutside);
  }
};

const initPopup = (id) => {
  const currentPicture = photoObjects.find((item) => item.id === id);

  if (!currentPicture) {
    return;
  }

  bigPictureImage.src = currentPicture.url;
  bigPictureImage.alt = currentPicture.description;
  likesCount.textContent = currentPicture.likes;

  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', closePopupByKey);
  closePopupButton.addEventListener('click', closePopupByPressCloseButton);
  bigPicture.addEventListener('click', closePopupByClickOutside);
};

export const openPopup = () => {
  const pictures = document.querySelector('.pictures');

  pictures.addEventListener('click', (event) => {
    const element = event.target.closest('.picture');

    if (!element) {
      return;
    }

    const id = Number(element.dataset.id);
    initPopup(id);
  });
};
