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

  const  cardImage = cardItem.querySelector('.card__image')
  cardImage.src = link;
  cardImage.alt = name;
  cardItem.querySelector('.card__title').textContent = name;

  cardItem.addEventListener ('click', deleteCard);
  cardItem.addEventListener('click', likeCard);
  cardItem.addEventListener('click', openPopupCard);
 
  return cardItem;
};


export { createCard, deleteCard, likeCard };