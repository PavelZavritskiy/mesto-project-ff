import { like, unlike} from './api'

//Функция лайка и снятия лайка
function  likeCard(el, cardInfo, likeCount) {
    if (el.classList.contains('card__like-button_is-active')) {
      unlike(cardInfo)
      .then ((data) => {
        el.classList.remove('card__like-button_is-active')
        likeCount(data.likes.length)
      })      
      .catch((err) => {
        console.log(err)
      }) 
    }   
     else {
      like(cardInfo)
      .then ((data) => {
        el.classList.add('card__like-button_is-active')
        likeCount(data.likes.length)
      })
      .catch((err) => {
        console.log(err)
      })
    } 
};

//Создание карточки
function createCard(myId, data, openPopupDeleteCard, likeCard,  openPopupCard) {
  
  //ПСоздание необходимых переменных
  const cardTemplate = document.querySelector('#card-template').content;
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const  cardImage = cardItem.querySelector('.card__image');
  const likeBtn = cardItem.querySelector('.card__like-button');
  const likeCounter = cardItem.querySelector('.card__like-counter');

  //Наполняем карточку данными с сервера
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardItem.querySelector('.card__title').textContent = data.name;

  //Функция для отображения количества лайков
  const likeCount = (length) => {
    likeCounter.textContent = length;
  };

  //Проверяем стоит ли наш лайк, для отображения при рендере
  const likeCheck = data.likes.some(({_id}) => {
    return _id === myId
  });
  if(likeCheck) {
    likeBtn.classList.add('card__like-button_is-active');
  };

  //Проверяем наша ли это карточка, для отображения кнопки удаления
  const deleteBtn = cardItem.querySelector('.card__delete-button');
  if (data.owner._id === myId) {
   deleteBtn.addEventListener('click', () => {
      openPopupDeleteCard(data, cardItem);
   }) 
  }else {
    deleteBtn.remove();
  }
  
  //Слушатель на кнопку лайка
  likeBtn.addEventListener('click', function(evt) {
    likeCard(evt.target, data, likeCount);
  });
  //Открытие Popup изображения
  cardItem.addEventListener('click', openPopupCard);
 
  //Отображаем количество лайков при рендере
  likeCount(data.likes.length);
  return cardItem;
};


export { createCard, likeCard };


