const cardTemplate = document.querySelector('#card-template').content;const cardItem = cardTemplate.querySelector('.card');
const cardContainer = document.querySelector('.places__list');

const deleteCard = function (evt) {
  const eventTarget = evt.target;
  const removeCard = eventTarget.closest('.places__item');
  removeCard.remove();
};

function createCard(name, link, deleteCard) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardItem.querySelector('.card__image').src = link;
    cardItem.querySelector('.card__image').alt = name;
    cardItem.querySelector('.card__title').textContent = name;
  cardItem.querySelector('.card__delete-button').addEventListener ('click', deleteCard);
  return cardItem;
};

function getData() {
  const data =  initialCards.forEach(function(el) {
    const name = el.name;
    const link = el.link;
  cardContainer.append(createCard(name, link, deleteCard));
  });
};

getData();