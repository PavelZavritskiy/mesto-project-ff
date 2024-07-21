const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];


//Проставление лайка
function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active')
  };
};

//Удаление карточки
function deleteCard(evt) {
  if (evt.target.classList.contains('card__delete-button')) {
    const eventTarget = evt.target;
    const removeCard = eventTarget.closest('.places__item');
    removeCard.remove();
  };
};

//Создание карточки
function createCard(name, link, deleteCard, likeCard, openPopupCard) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardItem.querySelector('.card__image').src = link;
    cardItem.querySelector('.card__image').alt = name;
    cardItem.querySelector('.card__title').textContent = name;
  cardItem.addEventListener ('click', deleteCard);
  cardItem.addEventListener('click', likeCard);
  cardItem.addEventListener('click', openPopupCard);
 
  return cardItem;
};

export { createCard, deleteCard, likeCard, initialCards };