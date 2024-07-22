import './pages/index.css';
import { openPopup, closePopup, } from './components/modal'
import { createCard, deleteCard, likeCard, initialCards } from './components/cards'

//Насчёт того что я залил весь проект заново, он не пушился почему-то. Я заново его склонировал и запихнул файлы из той папке где уже код был весь написан. Писало что у меня нет каких-то файлов, я делал git pull, но не помогало.


//Контейнер для карточек
const cardContainer = document.querySelector('.places__list');

// Кнопка редактирования профиля
const profileEditorBtn = document.querySelector('.profile__edit-button');
//Popup редактирования профиля 
const profilePopup = document.querySelector('.popup_type_edit');
// Кнопка добавления новой карточки
const addCardBtn = document.querySelector('.profile__add-button');
//Popup новой карточки
const newCardPopup = document.querySelector('.popup_type_new-card');
//Кнопки закрытия Popups
const closeBtns = document.querySelectorAll('.popup__close');
//Popup карточки
const cardPopup = document.querySelector('.popup_type_image');
const cardPopupCaption = cardPopup.querySelector('.popup__caption');
const cardPopupImage = cardPopup.querySelector('.popup__image');

// Находим форму редактирования профиля в DOM
const formEditorProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = formEditorProfile.querySelector('.popup__input_type_name');
const jobInput = formEditorProfile.querySelector('.popup__input_type_description');

// Находим форму добавления новой карточки профиля в DOM
const formAddCard = document.querySelector('form[name="new-place"]');
const placeInput = formAddCard.querySelector('.popup__input_type_card-name');
const urlInput = formAddCard.querySelector('.popup__input_type_url');

//Данные popup редактирования профиля(указанные на сайте)
const profileData = document.querySelector('.profile__info');
const nameData = profileData.querySelector('.profile__title');
const jobData = profileData.querySelector('.profile__description');


//Добавление анимации открытию и закрытию Popups
const allPopup = document.querySelectorAll('.popup');
allPopup.forEach((popup) => {
    popup.classList.add('popup_is-animated');
});

//Наполнение карточки данными
function getData() {
  const data =  initialCards.forEach(function(el) {
    const name = el.name;
    const link = el.link;
  cardContainer.append(createCard(name, link, deleteCard, likeCard, openPopupCard));
  });
};


//Открытие Popup карточки
function openPopupCard(evt) {
  evt.stopPropagation();
  if (evt.target.classList.contains('card__image')) {
    cardPopupCaption.textContent = evt.target.alt;
    cardPopupImage.alt = evt.target.alt;
    cardPopupImage.src = evt.target.currentSrc;
    openPopup(cardPopup);
  };
};


//Открытие Popup редактирования профиля
profileEditorBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  nameInput.value = nameData.textContent;
  jobInput.value = jobData.textContent;
  openPopup(profilePopup);
});

//Функция редактирования профиля
function handleFormSubmit(evt) {
  evt.preventDefault(); 

  nameData.textContent = nameInput.value;
  jobData.textContent = jobInput.value;

  const evtTarget = evt.target;
  if (evtTarget === formEditorProfile) {
    closePopup(evtTarget.closest('.popup'));
  }
};

//Слушатель редактирования профиля
formEditorProfile.addEventListener('submit', handleFormSubmit); 


//Открытие Popup добавления новой карточки
addCardBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  openPopup(newCardPopup);
});

//Функция добавления новой карточки
function handleFormAddCard(evt) {
  evt.preventDefault(); 
  
  cardContainer.prepend(createCard(placeInput.value, urlInput.value, deleteCard, likeCard, openPopupCard));
  
  formAddCard.reset();
  const evtTarget = evt.target;
  if (evtTarget === formAddCard) {
    closePopup(evtTarget.closest('.popup'));
  };
};

//Слушатель добавления новой карточки
formAddCard.addEventListener('submit', handleFormAddCard);


//Слушатель закрытия Popup через крестик
closeBtns.forEach((btn) => {
  btn.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    const closestPopup = evtTarget.closest('.popup');
    closePopup(closestPopup);
})});

getData();