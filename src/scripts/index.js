import './pages/index.css';
import { openPopup, closePopup } from './'

// const { contains } = require("jquery");

//Поиск templates 
const cardTemplate = document.querySelector('#card-template').content;const cardItem = cardTemplate.querySelector('.card');
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
const closeButtons = document.querySelectorAll('.popup__close');
//Popup карточки
const cardPopup = document.querySelector('.popup_type_image');
const cardPopupCaption = document.querySelector('.popup__caption');
const cardPopupImage = document.querySelector('.popup__image');

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
const popups = document.querySelectorAll('.popup');
popups.forEach((popup) => {
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

//Редактирование профиля
profileEditorBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  nameInput.value = nameData.textContent;
  jobInput.value = jobData.textContent;
  openPopup(profilePopup);
});

//Добавление новой карточки
addCardBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  openPopup(newCardPopup);
});

//Открытие Popup карточки
function openPopupCard(evt) {
  cardPopup.addEventListener('click', handleOverlayClick);
  document.addEventListener('keydown', handleEsc);
  if (evt.target.classList.contains('card__image')) {
    cardPopup.classList.add('popup_is-opened');
    cardPopupCaption.textContent = evt.target.alt;
    cardPopupImage.alt = evt.target.alt;
    cardPopupImage.src = evt.target.currentSrc;
  }; 
};

//Закрытие Popups через крестик
closeButtons.forEach((button) => {
  button.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    const closestPopup = evtTarget.closest('.popup');
    closePopup(closestPopup);
})});

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



getData();