import './pages/index.css';
import { openPopup, closePopup } from './components/modal';
import { createCard, likeCard } from './components/card';
import {enableValidation, clearValidation} from './components/validation';
import { getInfoUser, getInitialCards, editAvatar, profileEdit, addNewCard, deleteCard } from './components/api'

//Функция хранения ID
let myId 

//Переменные для удаления каточки
let cardData
let cardElementToDelete

//Настройки валидации
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',  
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',  
  inputErrorClass: 'popup__input-type-error',
  errorClass: 'popup__input-error_active',
};

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
const descriptionInput = formEditorProfile.querySelector('.popup__input_type_description');

// Находим форму добавления новой карточки профиля в DOM
const formAddCard = document.querySelector('form[name="new-place"]');
const placeInput = formAddCard.querySelector('.popup__input_type_card-name');
const urlInput = formAddCard.querySelector('.popup__input_type_url');

//Данные профиля
const profileData = document.querySelector('.profile__info');
const nameData = profileData.querySelector('.profile__title');
const jobData = profileData.querySelector('.profile__description');

//Переменные связанные с удалением карточки
const formDeleteCard = document.querySelector('form[name="delete-card"]');
const deletePopup = document.querySelector('.popup_type_delete-card');

//Переменные связанные с аватаркой
const popupEditProfileImage = document.querySelector('.popup_type_edit-avatar');
const formEditProfileImage = document.querySelector('form[name="edit-avatar"]');
const avatarInput = formEditProfileImage.querySelector('.popup__input_type_avatar');
const profileImage = document.querySelector('.profile__image');

//Добавление анимации открытию и закрытию Popups
const allPopup = document.querySelectorAll('.popup');
allPopup.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

//Функция уведомления загрузки
function loading (load, popup) {
  const submitBtn = popup.querySelector('.popup__button')
  if(popup !== deletePopup){
    if (load) {
      submitBtn.textContent = 'Сохранение...'
    } else {
      submitBtn.textContent = 'Сохранить'
    };
  }else {
    if (load) {
      submitBtn.textContent = 'Удаление...'
    } else {
      submitBtn.textContent = 'Да'
    };
  };
};

//Промисы, получаем информацию с сервера, ждём выполнения обоих запросов
Promise.all([getInfoUser(), getInitialCards()])
  .then(([userInfo, cardInfo]) => {
    myId = userInfo._id;
    renderProfile(userInfo);
    renderCards(cardInfo);
  })
  .catch((err) => {
    console.log(err);
});

//Рендерим список карточек на основе данных с сервера
function renderCards (data) {
  data.forEach(function(data) {
    if(data.name !== "Калининград"){
      cardContainer.prepend(createCard(myId, data, openPopupDeleteCard, likeCard,  openPopupCard));
    }
  })
};

//Функция загрузки аватар с сервера
function renderAvatar (data) {
  profileImage.style.backgroundImage = `url(${data})`;
};

//Рендер профиля и аватар
function renderProfile (data) {
  renderAvatar(data.avatar);
  nameData.textContent = data.name;
  jobData.textContent = data.about;
};

//Функция обновления аватар
function handleFormEditProfileImage(evt) {
  evt.preventDefault();
  loading(true, popupEditProfileImage)
  const avatarUrl = {
    avatar: avatarInput.value
  };

  editAvatar(avatarUrl)
    .then((data) => {
      renderAvatar(data.avatar);
      closePopup(popupEditProfileImage);
      formEditProfileImage.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading(false, popupEditProfileImage)
    });
};

//Слушатель открытия Popup смены аватар
profileImage.addEventListener('click', function(evt) {
  evt.stopPropagation();
  clearValidation(formEditProfileImage, validationConfig);
  formEditProfileImage.reset();
  openPopup(popupEditProfileImage);
});

//Слушатель submit смены аватар
formEditProfileImage.addEventListener('submit', function(evt) {
  handleFormEditProfileImage(evt)
});

//Функция редактирования профиля
function handleFormSubmitProfileEditor(evt) {
  evt.preventDefault();
  loading(true, profilePopup)
  const profileInfo = {
    name: nameInput.value,
    about: descriptionInput.value
  };

  profileEdit(profileInfo)
    .then((data) => {
      renderProfile(data);
      closePopup(profilePopup);
      formEditProfileImage.reset();;
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading(false, profilePopup)
    });
};

//Открытие Popup редактирования профиля
profileEditorBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  formEditorProfile.reset();
  clearValidation(formEditorProfile, validationConfig);
  nameInput.value = nameData.textContent;
  descriptionInput.value = jobData.textContent;
  openPopup(profilePopup);
});

//Слушатель submit редактирования профиля
formEditorProfile.addEventListener('submit', function(evt) {
  handleFormSubmitProfileEditor(evt);
}); 

//Функция добавления новой карточки
function handleFormAddCard(evt) {
  evt.preventDefault(); 
  loading(true, newCardPopup);
  const newCard = {
    name: placeInput.value,
    link: urlInput.value
  };
  addNewCard(newCard)
    .then((data) => {
      cardContainer.prepend(createCard(myId, data, openPopupDeleteCard, likeCard,  openPopupCard));
      closePopup(newCardPopup);
      formAddCard.reset();
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading(false, newCardPopup)
    });
};

//Открытие Popup добавления новой карточки
addCardBtn.addEventListener('click', function(evt) {
  evt.stopPropagation();
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openPopup(newCardPopup);
});

//Слушатель submit добавления новой карточки
formAddCard.addEventListener('submit', function(evt) {
  handleFormAddCard(evt);
});

//Функция удаления карточки
function handleFormDeleteCard(data, cardItem) {
  loading(true, deletePopup)
  deleteCard(data)
    .then(() => {
      cardItem.remove();
      closePopup(deletePopup);
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading(false, deletePopup)
    });
};

//Функция открытия Popup удаления карточки
function openPopupDeleteCard(data, cardItem) {
  cardData = data;
  cardElementToDelete = cardItem;
  openPopup(deletePopup);
};

//Слушатель подтверждения удаления карточки
formDeleteCard.addEventListener('submit', function(evt) {
  evt.preventDefault();
  handleFormDeleteCard(cardData, cardElementToDelete);
});

//Слушатель закрытия Popup через крестик
closeBtns.forEach((btn) => {
  btn.addEventListener('click', function(evt) {
    const evtTarget = evt.target;
    const closestPopup = evtTarget.closest('.popup');
    closePopup(closestPopup);
})});

//Открытие Popup карточки
function openPopupCard(evt) {
  if (evt.target.classList.contains('card__image')) {
    cardPopupCaption.textContent = evt.target.alt;
    cardPopupImage.alt = evt.target.alt;
    cardPopupImage.src = evt.target.currentSrc;
    openPopup(cardPopup);
  };
}; 

enableValidation(validationConfig);




