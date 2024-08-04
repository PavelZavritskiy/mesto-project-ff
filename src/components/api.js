//Настройки запроса к серверу
const config = {
  baseUrl: 'https://mesto.nomoreparties.co/wff-cohort-19',
  headers: {
    authorization: '82b84f8c-4240-4eeb-b59d-6d0035180658',
    'Content-Type': 'application/json'
  }
};

//Функция проверяющая ответ от сервера
function check(res) {
  if (res.status == 200) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

//Получение информации о пользователе
function getInfoUser() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(res => {
    return check(res)
  });
};

//Получение массива с карточками
function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(res => {
    return check(res)
  });
};

//Смена аватар
function editAvatar(data) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: data.avatar,
    }),
  })
  .then((res) => {
    return check(res)
  })
};

//Редактирование профиля
function profileEdit(data) {
    return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: data.name,
      about: data.about
    }),
  })
  .then((res) => {
    return check(res)
  })
};

//Добавление новых карточек
function addNewCard(data) {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: data.name,
      link: data.link
    }),
  })
  .then((res) => {
    return check(res)
  })  
};

//Удаление карточки
function deleteCard(data) {
  return fetch(`${config.baseUrl}/cards/${data._id}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then((res) => {
    return check(res)
  })
};

//Лайк
function like(data) {
  return fetch(`${config.baseUrl}/cards/like/${data._id}`,  
    {
    headers: config.headers,
    method: 'PUT',
  })
  .then((res) => {
    return check(res)
  })
};

//Снятие лайка
function unlike(data) {
  return fetch(`${config.baseUrl}/cards/like/${data._id}`, {
    headers: config.headers,
    method: 'DELETE',
  })
  .then((res) => {
    return check(res)
  })
};

export { getInfoUser, getInitialCards, editAvatar, profileEdit, addNewCard, deleteCard, unlike, like  }